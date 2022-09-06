import { async } from "@firebase/util";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  update,
  getDoc,
  arrayRemove,
  arrayUnion,
  limit,
} from "firebase/firestore";
import { useState } from "react";
import uniqid from "uniqid";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import getTime from "../functions/getTime";

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
  console.log(hasLiked);

  const subscribeLike = async () => {
    try {
      const postRef = collection(db, "postDB");
      const q = query(postRef, where("id", "==", `${id}`), limit(1));

      // on snapshot is used to acess query data
      onSnapshot(q, (snapshot) => {
        snapshot.forEach(async (doc) => {
          const docRef = doc.ref;
          const like = doc.data().like;

          await updateDoc(docRef, {
            like: arrayUnion(user.displayName),
          });
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
          <span onClick={subscribeLike} style={{ color: "red" }}>
            {like} like
          </span>
        ) : (
          <span onClick={subscribeLike}>{like} likes</span>
        )}

        <span>{comment.length} comments</span>
      </div>
    </div>
  );
};

export default Post;
