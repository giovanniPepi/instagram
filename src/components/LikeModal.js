import { useEffect, useRef } from "react";
import { v4 } from "uuid";

const LikeModal = ({ like, setShowLikeModal }) => {
  // custom hook to remove modal when clicking outside
  // https://www.youtube.com/watch?v=eWO1b6EoCnQ
  let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
      let maybeHandler = (event) => {
        if (!domNode.current.contains(event.target)) {
          handler();
        }
      };

      document.addEventListener("mousedown", maybeHandler);

      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    });

    return domNode;
  };

  let domNode = useClickOutside(() => {
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
