import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logOut, userImg } = UserAuth();

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
          <img src={userImg} alt="profile" className="profilePic" />
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
