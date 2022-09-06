import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import uniqid from "uniqid";

const postToFirestore = async (img, description, userName, userImg) => {
  const docRef = collection(db, "postDB");

  await addDoc(docRef, {
    id: `${uniqid()}`,
    userName,
    userImg,
    img,
    description,
    like: 0,
    comment: [],
    timestamp: serverTimestamp(),
  });
  console.log("added post to firestore");
};

export default postToFirestore;
