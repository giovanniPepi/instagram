import uniqid from "uniqid";
import getTime from "../functions/getTime";

const Post = ({ id, img, like, comment, timestamp }) => {
  return (
    <div key={uniqid()} className="post">
      <p>This is a post {id}! plz likes</p>
      <img src={img} alt={`${id}'s post`} />
      <p>Posted {getTime(timestamp)} ago</p>
      <div>
        <span>{like} likes</span>
        <span>{comment.length} comments</span>
      </div>
    </div>
  );
};

export default Post;
