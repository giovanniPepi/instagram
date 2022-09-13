import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import HomeIcon from "../icons/Home";
import InstagramIcon from "../icons/Instagram";
import PlusIcon from "../icons/Plus";

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
    <>
      <header>
        <div className="headerContainer">
          {user?.displayName ? (
            <>
              <div className="logo">
                Not
                <InstagramIcon />
              </div>
              <div className="fakeSearchHolder">
                <input
                  className="fakeSearch"
                  placeholder="Not a search..."
                ></input>
              </div>
              <div className="profile">
                <Link to="/">
                  <HomeIcon />
                </Link>
                <Link to="/upload">
                  <PlusIcon />
                </Link>
                <p className="primary">{user?.displayName}</p>
                <img src={userImg} alt="profile" className="profilePic" />
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
            </>
          )}
        </div>
        <div className="postSeparator"></div>
      </header>
    </>
  );
};

export default Header;
