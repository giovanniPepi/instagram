import {
  collection,
  getDocs,
  onSnapshot,
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
      const colRef = collection(db, "postDB");
      /*         const docs = await getDocs(colRef);
        docs.forEach((doc) => {
          // https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
          setPosts((posts) => [...posts, doc.data()]);
        }); */
      const q = query(colRef);
      const snap = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPosts((posts) => [...posts, doc.data()]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(posts);

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
              title={post.title}
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
