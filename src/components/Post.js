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
import { createSearchParams } from "react-router-dom";
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
          <span onClick={unsubscribeLike} style={{ color: "red" }}>
            {like} like
          </span>
        ) : (
          <span onClick={subscribeLike}>{like} like</span>
        )}

        <span>{comment.length} comments</span>
      </div>
    </div>
  );
};

export default Post;
