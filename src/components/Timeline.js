import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import uniqid from "uniqid";
import Post from "./Post";

const Timeline = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      let colRef = collection(db, "postDB");
      // ordering by time: https://www.youtube.com/watch?v=Fa_e2-H_40k
      const q = query(colRef, orderBy("timestamp", "desc"));
      // https://stackoverflow.com/questions/69184182/react-firestore-listen-to-changes-in-firebase-collection-in-a-react-componen
      const snap = onSnapshot(q, (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );
        return snap;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="timeline">
      <div>
        {posts.map((post) => {
          return (
            <Post
              key={uniqid()}
              id={post.id}
              img={post.img}
              like={post.like}
              comment={post.comment}
              timestamp={post.timestamp.seconds}
              description={post.description}
              userName={post.userName}
              userImg={post.userImg}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
