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
  const domNode = useClickOutside(() => {
    console.log("dom node activated");
    setShowComments(false);
  });

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
            <div className="postSeparator"></div>
          </div>

          <div className="rightCompletePostLower">
            <div className="postHeader">
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
              domNode={domNode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCompletePage;