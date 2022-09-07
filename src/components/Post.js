import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  where,
  arrayRemove,
  arrayUnion,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import getTime from "../functions/getTime";
import Comments from "./Comments";
import LikeModal from "./LikeModal";

const Post = ({
  id,
  user,
  img,
  description,
  like,
  hasLiked,
  comment,
  timestamp,
  authorUserName,
  authorUserImg,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const { currentUserName, userImg } = UserAuth();

  // console.log(currentUserName, userImg);

  // unsubscribe from updates on each function to avoid infinite loop

  // https://stackoverflow.com/questions/46642652/how-to-remove-listener-for-documentsnapshot-events-google-cloud-firestore

  const subscribeLike = async () => {
    try {
      console.log("subs");
      const postRef = collection(db, "postDB");
      const q = query(postRef, where("id", "==", `${id}`), limit(1));

      // on snapshot is used to acess query data
      let snapSub = onSnapshot(q, (snapshot) => {
        snapshot.forEach(async (doc) => {
          const docRef = doc.ref;

          if (!currentUserName || !userImg) {
            console.log("fudeu");
            return;
          }
          await updateDoc(docRef, {
            like: arrayUnion({ authorUserName: currentUserName, userImg }),
          });

          snapSub();
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unsubscribeLike = async () => {
    try {
      console.log("unsub");
      const postRef = collection(db, "postDB");
      const q = query(postRef, where("id", "==", `${id}`), limit(1));

      // on snapshot is used to acess query data
      let snapUsub = onSnapshot(q, (snapshot) => {
        snapshot.forEach(async (doc) => {
          const docRef = doc.ref;

          await updateDoc(docRef, {
            like: arrayRemove(user.displayName),
          });
          snapUsub();
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={uniqid()} className="post">
      <div className="postHeader">
        <img
          className="profilePic"
          src={authorUserImg}
          alt={`${authorUserName}'s profile`}
        />
        <p>{authorUserName}</p>
      </div>
      <img src={img} alt={`${id}'s post`} className="timelineImg" />
      <p>{description}</p>
      <p>Posted {getTime(timestamp)} ago</p>
      <div className="postMetrics">
        {hasLiked ? (
          like.length > 1 ? (
            <span onClick={unsubscribeLike} style={{ color: "red" }}>
              {like.length}
              likes
              <button onClick={() => setShowLikeModal(true)}>
                SHOW WHO LIKED!
              </button>
              <button onClick={() => setShowLikeModal(false)}>
                HIDE LIKES
              </button>
              {showLikeModal ? <LikeModal likeArray={like} /> : null}
            </span>
          ) : (
            <span onClick={unsubscribeLike}>
              {like.length}
              like
              <button onClick={() => setShowLikeModal(true)}>
                SHOW WHO LIKED!
              </button>
              <button onClick={() => setShowLikeModal(false)}>
                HIDE LIKES
              </button>
              {showLikeModal ? <LikeModal likeArray={like} /> : null}
            </span>
          )
        ) : like.length > 1 ? (
          <span onClick={subscribeLike}>
            {like.length} likes
            <button onClick={() => setShowLikeModal(true)}>
              SHOW WHO LIKED!
            </button>
            <button onClick={() => setShowLikeModal(false)}>HIDE LIKES</button>
            {showLikeModal ? <LikeModal likeArray={like} /> : null}
          </span>
        ) : (
          <span onClick={subscribeLike}>
            {like.length} like
            <button onClick={() => setShowLikeModal(true)}>
              SHOW WHO LIKED!
            </button>
            <button onClick={() => setShowLikeModal(false)}>HIDE LIKES</button>
            {showLikeModal ? <LikeModal likeArray={like} /> : null}
          </span>
        )}
        {showComments ? (
          <span>
            <span onClick={() => setShowComments(false)}>Hide</span>
            <Comments
              commentArray={comment}
              authorUserImg={authorUserImg}
              id={id}
            />
          </span>
        ) : (
          <span onClick={() => setShowComments(true)}>
            {comment.length} comments
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
