import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import blank from "../img/blank.png";

const Header = () => {
  const { user, logOut } = UserAuth();
  const [profileImage, setProfileImg] = useState(blank);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      const getprofilePicUrl = async () => {
        const profilePicUrl = await getAuth().currentUser.photoURL;
        const currentUser = getAuth().currentUser;
        console.log(profilePicUrl, currentUser.displayName);
        setProfileImg(profilePicUrl);
      };
      getprofilePicUrl();
    }
  }, [user]);

  return (
    <header>
      {user?.displayName ? (
        <div className="profile">
          <strong>{user?.displayName}</strong>
          <img src={profileImage} alt="profile" className="profilePic" />
          <Link to="/upload">
            <button>Upload post</button>
          </Link>
          <button onClick={handleSignOut}>Sign Out</button>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </header>
  );
};

export default Header;
