import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";
import { UserAuth } from "../context/AuthContext";
import { v4 } from "uuid";

const Timeline = () => {
  const { user } = UserAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const colRef = collection(db, "postDB");
      const q = query(colRef, orderBy("timestamp", "desc"));
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
          // avoids loading null posts
          // avoids error right after uploading
          if (
            !post.timestamp ||
            !post.description ||
            !post.userName ||
            !post.userImg ||
            !post.comment ||
            !post.like ||
            !post.img ||
            !post.id
          )
            return null;
          return (
            <Post
              key={v4()}
              user={user}
              id={post.id}
              img={post.img}
              like={post.like}
              comment={post.comment}
              timestamp={post.timestamp.seconds}
              description={post.description}
              authorUserName={post.userName}
              authorUserImg={post.userImg}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
