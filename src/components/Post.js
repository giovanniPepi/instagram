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
  user,
}) => {
  return (
    <div key={uniqid()} className="post">
      <p>
        Post {id} by {user}! plz likes
      </p>
      <p>{title}</p>
      <img src={img} alt={`${id}'s post`} className="timelineImg" />
      <p>{description}</p>
      <p>Posted {getTime(timestamp)} ago</p>
      <div>
        <span>{like} likes</span>
        <span>{comment.length} comments</span>
      </div>
    </div>
  );
};

export default Post;
