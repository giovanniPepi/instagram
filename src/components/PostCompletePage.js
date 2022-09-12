import useClickOutside from "../functions/useClickOutside";
import Comments from "./Comments";

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
  return (
    <div className="postOverlayParent">
      <div className="postOverlay">
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
          <div className="postSeparator"></div>

          <div className="rightCompletePostLower">
            <div className="comment">
              <img
                className="profilePicMini"
                src={authorUserImg}
                alt={`${authorUserName}'s profile`}
              />
              <div className="postDescriptionDiv">
                <p className="primary">{authorUserName}</p>
                <p className="postDescription">{description}</p>
              </div>
            </div>
            <Comments
              commentArray={comment}
              authorUserImg={authorUserImg}
              id={id}
              showComplete={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCompletePage;
