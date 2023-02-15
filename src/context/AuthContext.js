import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import blank from "../img/blank.png";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentUserName, setCurrentUserName] = useState(null);
  const [userImg, setUserImg] = useState(blank);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const getUserProfilePic = async () => {
    const profilePicUrl = await getAuth().currentUser.photoURL;
    if (profilePicUrl !== null) {
      setUserImg(!profilePicUrl);
    } else setUserImg(blank);
  };

  getUserProfilePic();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCurrentUserName(currentUser.displayName);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, userImg, currentUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
