import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../firebase";

const UploadPage = () => {
  // stores image in state
  const [imageUpload, setImageUpload] = useState(null);
  //display uploaded IMG
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "posts/");

  const uploadImage = () => {
    // checks if there's a img in state before proceeding
    if (imageUpload === null) return;

    const imageRef = ref(storage, `posts/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
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
      {imageList.map((url) => {
        return <img src={url} alt="postimg" width="40" key={v4()} />;
      })}
    </>
  );
};

export default UploadPage;
