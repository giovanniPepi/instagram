import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { UserAuth } from "../context/AuthContext";
import { storage } from "../firebase";
import postToFirestore from "../functions/postToFirestore";

const UploadPage = ({ setShowUploadModal }) => {
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
  }, [userImg]);

  const uploadPost = () => {
    const userName = user.displayName;
    if (!imgFile || !description || !userName || !userImg) {
      console.log("invalid data");
      return;
    }
    postToFirestore(imgFile, description, userName, userImg);
    setShowUploadModal(false);
  };

  return (
    <>
      <div className="postPreview">
        <h1>Upload photo</h1>

        <div className="uploadContainer">
          <input
            className="inptFile"
            type="file"
            /*Changes the state when a file is uploaded*/
            onChange={(event) => {
              uploadImage(event.target.files[0]);
            }}
          />
          <label htmlFor="postDescription" className="primary">
            Description
          </label>
          <textarea
            id="postDescription"
            type="text"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          {imgFile !== null ? (
            <div className="uploadImgBorderDiv">
              <img
                src={imgFile}
                alt="postimg"
                className="imagePreview"
                key={v4()}
              />
            </div>
          ) : null}
        </div>
        <button
          onClick={() => {
            uploadPost();
          }}
          className="follow"
        >
          <div className="followInside">Upload</div>
        </button>
      </div>
    </>
  );
};

export default UploadPage;
