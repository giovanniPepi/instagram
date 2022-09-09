import { v4 } from "uuid";

const LikeModal = ({ like }) => {
  return (
    <div className="likeModal">
      <div className="likeModalHeader">
        <p className="primary">LIKES</p>
      </div>
      <div className="postSeparator"></div>

      {like.map((obj) => {
        return (
          <div className="likeLineParent" key={v4()}>
            <div className="likeLine">
              <img src={obj.userImg} alt="profile" className="profilePic" />
              <p className="primary">{obj.authorUserName}</p>
            </div>
            <button className="follow">
              <div className="followInside">Follow</div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default LikeModal;
