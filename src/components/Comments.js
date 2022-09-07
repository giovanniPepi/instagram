import {
  arrayUnion,
  collection,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
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
  const { user, userImg } = UserAuth();
  const [commentText, setCommentText] = useState(null);
  const userName = user.displayName;

  const postCommentToFirestore = async () => {
    const postRef = collection(db, "postDB");
    const q = query(postRef, where("id", "==", `${id}`), limit(1));

    let subscribeComment = onSnapshot(q, (snapshot) => {
      snapshot.forEach(async (doc) => {
        //reference to the received data
        const docRef = doc.ref;

        if (!commentText || !userName || !userImg) return;
        await updateDoc(docRef, {
          comment: arrayUnion({
            commentText,
            userName,
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
      <div>
        {commentArray.map((comment) => {
          return (
            <div className="comment" key={v4()}>
              {comment.userImg &&
              comment.userName &&
              comment.commentText &&
              comment.timestamp ? (
                <>
                  <img
                    src={comment.userImg}
                    alt="avatar"
                    className="profilePicMini"
                  />
                  <p>
                    <strong> {comment.userName}</strong> {comment.commentText}
                  </p>
                  <p>{getTime(comment.timestamp.seconds)} ago</p>
                </>
              ) : (
                <Alert />
              )}
            </div>
          );
        })}
      </div>
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
