import { v4 } from "uuid";

const LikeModal = ({ like }) => {
  console.log(like, like[0].userImg);

  return (
    <div className="likeModal">
      {/*      {likeArray.length > 0
        ? likeArray.map((like) => {
            return <span key={v4()}>{like}</span>;
          })
        : null} */}

      {like.map((obj) => {
        return (
          <div className="likeLine" key={v4()}>
            <img src={obj.userImg} alt="profile" className="profilePic" />
            <p>{obj.authorUserName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LikeModal;
