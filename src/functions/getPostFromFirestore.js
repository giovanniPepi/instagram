import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const getPostFromFirestore = async () => {
  const colRef = collection(db, "postDB");
  const docs = await getDocs(colRef);
  docs.forEach((doc) => {
    console.log(doc.data());
  });
};

export default getPostFromFirestore;
