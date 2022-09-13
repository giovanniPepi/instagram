import {
  arrayUnion,
  collection,
  limit,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const postCommentToFirestore = async (
  id,
  commentText,
  currentUserName,
  userImg
) => {
  const postRef = collection(db, "postDB");
  const q = query(postRef, where("id", "==", `${id}`), limit(1));

  let subscribeComment = onSnapshot(q, (snapshot) => {
    snapshot.forEach(async (doc) => {
      //reference to the received data
      const docRef = doc.ref;

      if (!commentText || !currentUserName || !userImg) return;
      await updateDoc(docRef, {
        comment: arrayUnion({
          commentText,
          userName: currentUserName,
          userImg,
          timestamp: Timestamp.now(),
        }),
      });
    });
    // stop realtime updates
    subscribeComment();
  });
};

export default postCommentToFirestore;
