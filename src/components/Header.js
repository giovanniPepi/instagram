import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      {user?.displayName ? (
        <div className="profile">
          <strong>{user?.displayName}</strong>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </header>
  );
};

export default Header;
