import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postArray = [];
    const getPostFromFirestore = async () => {
      const colRef = collection(db, "postDB");
      const docs = await getDocs(colRef);
      docs.forEach((doc) => {
        postArray.push({ ...doc.data() });
      });
    };

    getPostFromFirestore();
    setPosts(postArray);

    console.log(postArray);
  }, []);

  console.log(posts);

  return <section className="timeline">timeline</section>;
};

export default Timeline;
