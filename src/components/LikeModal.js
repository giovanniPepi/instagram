import { v4 } from "uuid";
import useClickOutside from "../functions/useClickOutside";

const LikeModal = ({ like, setShowLikeModal }) => {
  const domNode = useClickOutside(() => {
    setShowLikeModal(false);
  });

  return (
    <div className="likeModalParent">
      <div className="likeModal" ref={domNode}>
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
              <button
                className="follow"
                onClick={() => {
                  setShowLikeModal(false);
                }}
              >
                <div className="followInside">Follow</div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LikeModal;
