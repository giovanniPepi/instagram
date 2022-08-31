import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import uniqid from "uniqid";

const postToFirestore = async () => {
  const docRef = collection(db, "postDB");

  await addDoc(docRef, {
    id: `${uniqid()}`,
    img: "teste.jpg",
    like: 0,
    comment: [],
    timestamp: serverTimestamp(),
  });
  console.log("added post to firestore");
};

export default postToFirestore;
