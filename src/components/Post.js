import uniqid from "uniqid";
import getTime from "../functions/getTime";

const Post = ({
  id,
  img,
  title,
  description,
  like,
  comment,
  timestamp,
  userName,
  userImg,
}) => {
  return (
    <div key={uniqid()} className="post">
      <div className="postHeader">
        <img
          className="profilePic"
          src={userImg}
          alt={`${userName}'s profile`}
        />
        <p>{userName}</p>
      </div>
      <h3>{title}</h3>
      <img src={img} alt={`${id}'s post`} className="timelineImg" />
      <p>{description}</p>
      <p>Posted {getTime(timestamp)} ago</p>
      <div className="postMetrics">
        <span>{like} likes</span>
        <span>{comment.length} comments</span>
      </div>
    </div>
  );
};

export default Post;
