import uniqid from "uniqid";

const Post = ({ id, img, like, comment, timestamp }) => {
  return (
    <div key={uniqid()} className="post">
      <p>This is a post! plz likes</p>
      <p>{id}</p>
      <p>{img}</p>
      <p>{like}</p>
      <p>{comment}</p>
      <p>{timestamp}</p>
    </div>
  );
};

export default Post;
