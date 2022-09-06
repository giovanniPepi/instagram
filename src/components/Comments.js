import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import blank from "../img/blank.png";

const Comments = ({ commentArray }) => {
  const { user } = UserAuth();

  const [userImg, setUserImg] = useState(blank);

  console.log(commentArray);

  useEffect(() => {
    const getUserProfilePic = async () => {
      const profilePicUrl = await getAuth().currentUser.photoURL;
      setUserImg(profilePicUrl);
    };

    getUserProfilePic();
  }, []);

  return (
    <div className="commentSection">
      <div>comments will go here</div>
      <div className="answeringSection">
        <img
          className="profilePic"
          src={userImg}
          alt={`${user.displayName}'s profile`}
        />
        <input type="text" />
      </div>
    </div>
  );
};

export default Comments;
