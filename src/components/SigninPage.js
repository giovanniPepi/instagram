import { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SigninPage = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [navigate, user]);

  return (
    <div className="googleBtn">
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
};

export default SigninPage;
