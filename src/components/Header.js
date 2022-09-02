import { Link } from "react-router-dom";
import { getProfilePicUrl, UserAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const profilePicUrl = getProfilePicUrl();

  return (
    <header>
      {user?.displayName ? (
        <div className="profile">
          <strong>{user?.displayName}</strong>
          <img src={profilePicUrl} alt="profile" className="profilePic" />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </header>
  );
};

export default Header;
