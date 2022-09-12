import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../firebase";

const postToFirestore = async (img, description, userName, userImg) => {
  const docRef = collection(db, "postDB");

  await addDoc(docRef, {
    id: `${v4()}`,
    userName,
    userImg,
    img,
    description,
    like: [],
    comment: [],
    timestamp: serverTimestamp(),
  });
  console.log("added post to firestore");
};

export default postToFirestore;
