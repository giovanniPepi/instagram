import { getAuth } from "firebase/auth";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { UserAuth } from "../context/AuthContext";
import { storage } from "../firebase";

const UploadPage = () => {
  // stores image in state
  const [imageUpload, setImageUpload] = useState(null);
  //display uploaded IMG
  const [imageList, setImageList] = useState(null);

  const { user } = UserAuth();

  const imageListRef = ref(storage, `${user.displayName}/posts/`);

  const uploadImage = () => {
    // checks if there's a img in state before proceeding
    if (imageUpload === null) return;

    const imageRef = ref(
      storage,
      `${user.displayName}/posts/${imageUpload.name + v4()}`
    );

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList(url);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      //avoid crashing when receiving an empty response from firebase
      if (response.items.length <= 0) return;
      const recentImg = response.items[0];
      getDownloadURL(recentImg).then((response) => {
        setImageList(response);
      });
    });
    console.log(imageList);
  }, []);

  return (
    <>
      <input
        type="file"
        /*Changes the state when a file is uploaded*/
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload IMG</button>
      {imageList !== null ? (
        <img src={imageList} alt="postimg" width="40" key={v4()} />
      ) : null}
    </>
  );
};

export default UploadPage;
