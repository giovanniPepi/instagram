import { async } from "@firebase/util";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  update,
} from "firebase/firestore";
import { useState } from "react";
import uniqid from "uniqid";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import getTime from "../functions/getTime";

const Post = ({
  id,
  img,
  description,
  like,
  comment,
  timestamp,
  userName,
  userImg,
}) => {
  const { user } = UserAuth();

  const removeUserFromArray = (user) => {
    return user !== userName;
  };

  const subscribeLike = async () => {
    console.log(user.displayName, "clicked", id);

    try {
      const postRef = collection(db, "postDB");
      const q = query(postRef, where("id", "==", `${id}`));

      // on snapshot is used to acess query data
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          const docRef = doc.ref;

          let currentLikes = doc.data().like;

          if (currentLikes.includes(userName)) {
            console.log("already liked");
            const newLikes = currentLikes.filter(removeUserFromArray);
            updateDoc(docRef, {
              like: newLikes,
            });
          } else {
            currentLikes.push(userName);
            updateDoc(docRef, {
              like: currentLikes,
            });
          }
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
        <span onClick={subscribeLike}>{like} likes</span>
        <span>{comment.length} comments</span>
      </div>
    </div>
  );
};

export default Post;
