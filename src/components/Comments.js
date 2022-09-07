import {
  arrayUnion,
  collection,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Comments = ({ commentArray, id }) => {
  const { user, userImg } = UserAuth();
  const [commentText, setCommentText] = useState(null);
  const userName = user.displayName;

  console.log(commentArray, id);

  const postCommentToFirestore = async () => {
    const postRef = collection(db, "postDB");
    const q = query(postRef, where("id", "==", `${id}`), limit(1));

    let subscribeComment = onSnapshot(q, (snapshot) => {
      snapshot.forEach(async (doc) => {
        //reference to the received data
        const docRef = doc.ref;

        await updateDoc(docRef, {
          comment: arrayUnion({
            commentText,
            userName,
            userImg,
          }),
        });

        // stop realtime updates
        subscribeComment();
      });
    });
  };

  return (
    <div className="commentSection">
      <div>comments will go here</div>
      <div className="answeringSection">
        <img
          className="profilePic"
          src={userImg}
          alt={`${user.displayName}'s profile`}
        />
        <input
          type="text"
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        />
        <button onClick={postCommentToFirestore}>Send</button>
      </div>
    </div>
  );
};

export default Comments;
