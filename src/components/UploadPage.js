import { getAuth } from "firebase/auth";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { UserAuth } from "../context/AuthContext";
import { storage } from "../firebase";

const UploadPage = () => {
  //display uploaded IMG
  const [imageList, setImageList] = useState(null);

  // auth context
  const { user } = UserAuth();

  const uploadImage = (file) => {
    // if (imageUpload === null) return;
    console.log("upload img acesses 2");

    const imageRef = ref(
      storage,
      `${user.displayName}/posts/${file.name + v4()}`
    );

    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList(url);
      });
    });
  };

  return (
    <>
      <input
        type="file"
        /*Changes the state when a file is uploaded*/
        onChange={(event) => {
          uploadImage(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload IMG</button>
      {imageList !== null ? (
        <img src={imageList} alt="postimg" width="140" key={v4()} />
      ) : null}
    </>
  );
};

export default UploadPage;
