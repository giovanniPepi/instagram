import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import HomeIcon from "../icons/Home";
import InstagramIcon from "../icons/Instagram";
import PlusIcon from "../icons/Plus";
import UploadModal from "./UploadModal";

const Header = () => {
  const { user, logOut, userImg } = UserAuth();
  const [screenWidth, setScreenWIdth] = useState();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const size = window.screen.availWidth;
    setScreenWIdth(size);
  }, [screenWidth, showUploadModal]);

  return (
    <>
      <header>
        <div className="headerContainer">
          {user?.displayName ? (
            <>
              <div
                className="logo"
                onClick={() => window.location.reload(false)}
              >
                Not
                <InstagramIcon />
              </div>
              <div className="fakeSearchHolder">
                {screenWidth < 600 ? (
                  <input
                    className="fakeSearch"
                    placeholder="Not a search"
                  ></input>
                ) : (
                  <input
                    className="fakeSearch"
                    placeholder="Not a search..."
                  ></input>
                )}
              </div>
              <div className="profileContainer">
                <Link to="/">
                  <HomeIcon />
                </Link>
                <div
                  className="uploadBtnDiv"
                  onClick={() => setShowUploadModal(true)}
                >
                  <PlusIcon />
                </div>
                <img
                  src={userImg}
                  alt="profile"
                  className="profilePic"
                  style={{ width: "2.1rem", height: "2.1rem" }}
                />
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
      {showUploadModal ? (
        <UploadModal setShowUploadModal={setShowUploadModal} />
      ) : null}
    </>
  );
};

export default Header;
