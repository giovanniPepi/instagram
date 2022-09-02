import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import { storage } from "../firebase";

const UploadPage = () => {
  // stores image in state
  const [imageUpload, setImageUpload] = useState(null);

  // checks if there's a img in state before proceeding
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `posts/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("img uploaded");
    });
  };

  return (
    <>
      <input
        type="file"
        /*Changes the state when a file is uploaded*/
        onChange={(event) => {
          setImageUpload(event.target.file);
        }}
      />
      <button onClick={uploadImage}> Upload IMG</button>
    </>
  );
};

export default UploadPage;
