import uniqid from "uniqid";
import { UserAuth } from "../context/AuthContext";
import getTime from "../functions/getTime";

const Post = ({
  id,
  img,
  description,
  like,
  comment,
  timestamp,
  userName,
  userImg,
}) => {
  const { user } = UserAuth();

  const subscribeLike = () => {
    console.log(user.displayName, "clicked", id);
  };

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
      <img src={img} alt={`${id}'s post`} className="timelineImg" />
      <p>{description}</p>
      <p>Posted {getTime(timestamp)} ago</p>
      <div className="postMetrics">
        <span onClick={subscribeLike}>{like} likes</span>
        <span>{comment.length} comments</span>
      </div>
    </div>
  );
};

export default Post;
