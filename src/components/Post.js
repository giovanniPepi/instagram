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
import { useState } from "react";
import uniqid from "uniqid";
import { db } from "../firebase";
import getTime from "../functions/getTime";
import Comments from "./Comments";

const Post = ({
  id,
  user,
  img,
  description,
  like,
  hasLiked,
  comment,
  timestamp,
  userName,
  userImg,
}) => {
  const [showComments, setShowComments] = useState(false);

  // unsubscribe from updates on each function to avoid infinite loop

  // https://stackoverflow.com/questions/46642652/how-to-remove-listener-for-documentsnapshot-events-google-cloud-firestore

  const subscribeLike = async () => {
    try {
      const postRef = collection(db, "postDB");
      const q = query(postRef, where("id", "==", `${id}`), limit(1));

      // on snapshot is used to acess query data
      let unsubscribeLiked = onSnapshot(q, (snapshot) => {
        snapshot.forEach(async (doc) => {
          const docRef = doc.ref;

          await updateDoc(docRef, {
            like: arrayUnion(user.displayName),
          });

          unsubscribeLiked();
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unsubscribeLike = async () => {
    try {
      const postRef = collection(db, "postDB");
      const q = query(postRef, where("id", "==", `${id}`), limit(1));

      // on snapshot is used to acess query data
      let unsubscribeDisliked = onSnapshot(q, (snapshot) => {
        snapshot.forEach(async (doc) => {
          const docRef = doc.ref;

          await updateDoc(docRef, {
            like: arrayRemove(user.displayName),
          });
          unsubscribeDisliked();
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
          src={userImg}
          alt={`${userName}'s profile`}
        />
        <p>{userName}</p>
      </div>
      <img src={img} alt={`${id}'s post`} className="timelineImg" />
      <p>{description}</p>
      <p>Posted {getTime(timestamp)} ago</p>
      <div className="postMetrics">
        {hasLiked ? (
          like.length > 1 ? (
            <span onClick={unsubscribeLike} style={{ color: "red" }}>
              {like.length} likes
            </span>
          ) : (
            <span onClick={unsubscribeLike} style={{ color: "red" }}>
              {like.length} like
            </span>
          )
        ) : like.length > 1 ? (
          <span onClick={subscribeLike}>{like.length} likes</span>
        ) : (
          <span onClick={subscribeLike}>{like.length} like</span>
        )}
        {showComments ? (
          <span>
            <span onClick={() => setShowComments(false)}>Hide</span>
            <Comments commentArray={comment} userImg={userImg} id={id} />
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
