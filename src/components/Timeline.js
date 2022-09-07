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
import { UserAuth } from "../context/AuthContext";

const Timeline = () => {
  const { user } = UserAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const colRef = collection(db, "postDB");
      const q = query(colRef);
      // https://stackoverflow.com/questions/69184182/react-firestore-listen-to-changes-in-firebase-collection-in-a-react-componen
      const snap = onSnapshot(q, (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );
        // remove the function call to get realtime listeners
        snap();
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
              user={user}
              id={post.id}
              img={post.img}
              like={post.like}
              hasLiked={post.like.includes(user.displayName)}
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
