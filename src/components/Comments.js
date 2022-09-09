import {
  arrayUnion,
  collection,
  limit,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { v4 } from "uuid";
import getTime from "../functions/getTime";
import Alert from "../icons/Alert";

const Comments = ({ commentArray, id }) => {
  const { user, userImg, currentUserName } = UserAuth();
  const [commentText, setCommentText] = useState(null);

  const postCommentToFirestore = async () => {
    const postRef = collection(db, "postDB");
    const q = query(postRef, where("id", "==", `${id}`), limit(1));

    let subscribeComment = onSnapshot(q, (snapshot) => {
      snapshot.forEach(async (doc) => {
        //reference to the received data
        const docRef = doc.ref;

        if (!commentText || !currentUserName || !userImg) return;
        await updateDoc(docRef, {
          comment: arrayUnion({
            commentText,
            userName: currentUserName,
            userImg,
            timestamp: Timestamp.now(),
          }),
        });
      });
      // stop realtime updates
      subscribeComment();
    });
  };

  return (
    <div className="commentSection">
      {/* only firstsecond comment if it exists */}
      {commentArray[0] ? (
        <div className="comment" key={v4()}>
          {commentArray[0].userImg &&
          commentArray[0].userName &&
          commentArray[0].commentText &&
          commentArray[0].timestamp ? (
            <>
              <img
                src={commentArray[0].userImg}
                alt="avatar"
                className="profilePicMini"
              />
              <p className="primary">{commentArray[0].userName}</p>
              <p>{commentArray[0].commentText}</p>
            </>
          ) : null}
        </div>
      ) : null}

      {/* only display second comment if it exists */}
      {commentArray[1] ? (
        <div className="comment" key={v4()}>
          {commentArray[1].userImg &&
          commentArray[1].userName &&
          commentArray[1].commentText &&
          commentArray[1].timestamp ? (
            <>
              <img
                src={commentArray[1].userImg}
                alt="avatar"
                className="profilePicMini"
              />
              <p className="primary">{commentArray[1].userName}</p>
              <p>{commentArray[1].commentText}</p>
            </>
          ) : null}
        </div>
      ) : null}
      <div className="postSeparator"></div>
      <div className="answeringSection">
        <input
          type="text"
          className="commentAnswerInput"
          placeholder="Add a comment..."
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        />
        <button onClick={postCommentToFirestore} className="postBtn">
          Post
        </button>
      </div>
    </div>
  );
};

export default Comments;
