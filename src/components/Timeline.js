import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import uniqid from "uniqid";

const Timeline = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostFromFirestore = async () => {
      const colRef = collection(db, "postDB");
      const docs = await getDocs(colRef);
      docs.forEach((doc) => {
        // https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
        setPosts((posts) => [...posts, doc.data()]);
      });
    };

    getPostFromFirestore();
  }, []);

  console.log(posts);

  return (
    <section className="timeline">
      <div>
        {posts.map((post) => {
          return <div key={uniqid()}>{post.id}</div>;
        })}
      </div>
    </section>
  );
};

export default Timeline;
