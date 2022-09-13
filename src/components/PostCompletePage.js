import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { UserAuth } from "../context/AuthContext";
import postCommentToFirestore from "../functions/postCommentToFirestore";
import useClickOutside from "../functions/useClickOutside";
import BackIcon from "../icons/Back";

const PostCompletePage = ({
  id,
  img,
  description,
  like,
  comment,
  timestamp,
  authorUserName,
  authorUserImg,
  setShowComments,
}) => {
  const domNode = useClickOutside(() => {
    setShowComments(false);
  });

  const [commentText, setCommentText] = useState(null);
  const { userImg, currentUserName } = UserAuth();
  const [btnStyle, setbtnStyle] = useState({
    opacity: 0.3,
  });

  useEffect(() => {
    if (commentText === "" || commentText === null)
      setbtnStyle({ opacity: 0.3 });
    else setbtnStyle({ opacity: 1 });
  }, [commentText]);

  return (
    <div className="postOverlayParent">
      <div className="postOverlay" ref={domNode}>
        <div className="leftCompletePost">
          <img
            src={img}
            alt={`${id}'s post`}
            className="timelineImg complete"
          />
        </div>
        <div className="rightCompletePost">
          <div className="postHeaderContainer">
            <div className="postHeader">
              <img
                className="profilePicMini"
                src={authorUserImg}
                alt={`${authorUserName}'s profile`}
              />
              <p className="primary">{authorUserName}</p>
            </div>
          </div>
          <div className="postSeparator gridSeparate"></div>

          <div className="rightCompletePostLower">
            <div className="comment mobile">
              <img
                className="profilePicMini mobilePic"
                src={authorUserImg}
                alt={`${authorUserName}'s profile`}
              />
              <p className="primary titleDesc">{authorUserName}</p>
              <p className="postDescription ">{description}</p>
            </div>

            {comment.map((item) => {
              return (
                <div className="comment" key={v4()}>
                  {/* Checks if all info are valid before rendering */}
                  {item.userImg &&
                  item.userName &&
                  item.commentText &&
                  item.timestamp ? (
                    <>
                      <img
                        src={item.userImg}
                        alt="avatar"
                        className="profilePicMini mobile"
                      />

                      <div className="commentContainer">
                        <p className="primary">{item.userName}</p>
                        <span className="commentText">{item.commentText}</span>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="answeringContainer">
            <div className="postSeparator"></div>
            <div className="answeringSection">
              <Link to="/">
                <button className="backMobile">
                  <BackIcon />
                </button>
              </Link>
              <input
                type="text"
                className="commentAnswerInput"
                placeholder="Add a comment..."
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
              />
              <button
                className="postBtn"
                style={btnStyle}
                onClick={() =>
                  postCommentToFirestore(
                    id,
                    commentText,
                    currentUserName,
                    userImg
                  )
                }
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCompletePage;
