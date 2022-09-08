import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { UserAuth } from "../context/AuthContext";
import { storage } from "../firebase";
import postToFirestore from "../functions/postToFirestore";

const UploadPage = () => {
  //display uploaded IMG
  const [imgFile, setimgFile] = useState(null);
  const [description, setDescription] = useState(null);
  const [userImg, setUserImg] = useState(null);

  // auth context
  const { user } = UserAuth();

  const uploadImage = (file) => {
    const imageRef = ref(
      storage,
      `${user.displayName}/posts/${file.name + v4()}`
    );

    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setimgFile(url);
      });
    });
  };

  useEffect(() => {
    const getUserProfilePic = async () => {
      const profilePicUrl = await getAuth().currentUser.photoURL;
      setUserImg(profilePicUrl);
    };
    getUserProfilePic();
    console.log(userImg);
  }, [userImg]);

  const uploadPost = () => {
    const userName = user.displayName;
    if (!imgFile || !description || !userName || !userImg) {
      console.log("invalid data");
      return;
    }
    postToFirestore(imgFile, description, userName, userImg);
  };

  return (
    <>
      <div className="postPreview">
        <label htmlFor="postDescription">Description</label>
        <input
          id="postDescription"
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="file"
          /*Changes the state when a file is uploaded*/
          onChange={(event) => {
            uploadImage(event.target.files[0]);
          }}
        />
        {imgFile !== null ? (
          <>
            <img
              src={imgFile}
              alt="postimg"
              className="timelineImg"
              key={v4()}
            />
          </>
        ) : null}
      </div>
      <button onClick={uploadPost}> Upload post</button>
    </>
  );
};

export default UploadPage;
