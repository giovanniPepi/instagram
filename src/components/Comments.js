import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { v4 } from "uuid";
import postCommentToFirestore from "../functions/postCommentToFirestore";

const Comments = ({ commentArray, id, showComplete }) => {
  const { userImg, currentUserName } = UserAuth();
  const [commentText, setCommentText] = useState(null);
  const [btnStyle, setbtnStyle] = useState({
    opacity: 0.3,
  });

  useEffect(() => {
    if (commentText === "" || commentText === null)
      setbtnStyle({ opacity: 0.3 });
    else setbtnStyle({ opacity: 1 });
  }, [commentText, showComplete]);

  return (
    <>
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
                <div className="commentContainer">
                  <span className="commentText">
                    <strong>{commentArray[0].userName} </strong>
                    {commentArray[0].commentText}
                  </span>
                </div>
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
                <div className="commentContainer">
                  <span className="commentText">
                    <strong>{commentArray[0].userName} </strong>
                    {commentArray[0].commentText}
                  </span>
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
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
          onClick={() =>
            postCommentToFirestore(id, commentText, currentUserName, userImg)
          }
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
