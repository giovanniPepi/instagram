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
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { v4 } from "uuid";

const Comments = ({ commentArray, id, showComplete }) => {
  const { userImg, currentUserName } = UserAuth();
  const [commentText, setCommentText] = useState(null);
  const [btnStyle, setbtnStyle] = useState({
    opacity: 0.3,
  });

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

  useEffect(() => {
    if (commentText === "" || commentText === null)
      setbtnStyle({ opacity: 0.3 });
    else setbtnStyle({ opacity: 1 });
  }, [commentText, showComplete]);

  return (
    <>
      {showComplete ? (
        commentArray.map((comment) => {
          return (
            <div className="comment" key={v4()}>
              {/* Checks if all info are valid before rendering */}
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
                  <p className="primary">{comment.userName}</p>
                  <span>{comment.commentText}</span>
                </>
              ) : null}
            </div>
          );
        })
      ) : (
        <div className="commentSectionHigher">
          {/* only first and second comment if it exists */}
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
                  <span className="commentText">
                    {commentArray[0].commentText}
                  </span>
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
                  <span className="commentText">
                    {commentArray[1].commentText}
                  </span>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      )}

      {/* Post separator and answer section */}
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
        <button
          onClick={postCommentToFirestore}
          className="postBtn"
          style={btnStyle}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default Comments;
