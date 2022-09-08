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
import CommentIcon from "../icons/CommentIcon";
import EmptyHeart from "../icons/EmptyHeart";
import Heart from "../icons/Heart";
import Comments from "./Comments";
import LikeModal from "./LikeModal";

const Post = ({
  id,
  user,
  img,
  description,
  like,
  comment,
  timestamp,
  authorUserName,
  authorUserImg,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const { currentUserName, userImg } = UserAuth();
  const [likeIndexToRemove, setLikeIndexToRemove] = useState(null);

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

          // doesn't write to firestore if findIndex returns -1
          if (likeIndexToRemove === -1) return;
          await updateDoc(docRef, {
            like: arrayRemove(like[likeIndexToRemove]),
          });
          snapUsub();
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // function that searches the liked array for the user
    const indexCriteria = (e) => {
      if (e.authorUserName === currentUserName) {
        return true;
      }
    };

    // finds the index of obj inside arary
    const index = like.findIndex(indexCriteria);
    setLikeIndexToRemove(index);

    // checkLiked();
  }, [currentUserName, like]);

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
        {likeIndexToRemove !== -1 ? (
          <div className="likeSection">
            <button className="heart" onClick={unsubscribeLike}>
              <Heart />
            </button>
            <p>{like.length} likes</p>
            <button
              onClick={() => {
                setShowLikeModal(true);
              }}
            >
              LIKELIST
            </button>
            <button onClick={() => setShowLikeModal(false)}>
              HIDE LIKELIST
            </button>
            {showLikeModal ? <LikeModal like={like} /> : null}
          </div>
        ) : (
          <div className="likeSection">
            <button className="heart" onClick={subscribeLike}>
              <EmptyHeart />
            </button>
            <p>{like.length} likes</p>
            <button
              onClick={() => {
                setShowLikeModal(true);
              }}
            >
              LIKELIST
            </button>
            <button onClick={() => setShowLikeModal(false)}>
              HIDE LIKELIST
            </button>
          </div>
        )}

        {showComments ? (
          <div className="commentSection">
            <span onClick={() => setShowComments(false)}>
              <CommentIcon />
            </span>
            <Comments
              commentArray={comment}
              authorUserImg={authorUserImg}
              id={id}
            />
          </div>
        ) : (
          <div
            className="commentSection  collapsed"
            onClick={() => setShowComments(true)}
          >
            <p>{comment.length} comments</p>
            <CommentIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
