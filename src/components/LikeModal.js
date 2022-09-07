import { v4 } from "uuid";

const LikeModal = ({ likeArray }) => {
  console.log(likeArray);
  return (
    <div className="likeModal">
      {likeArray.length > 0
        ? likeArray.map((like) => {
            return <span key={v4()}>{like}</span>;
          })
        : null}
    </div>
  );
};

export default LikeModal;
