import GoogleButton from "react-google-button";
import { signInWithRedirect, getRedirectResult } from "../firebase";

const Login = () => {
  return (
    <div className="login">
      <p>
        <strong>You're signed out</strong>
        <GoogleButton />
      </p>
    </div>
  );
};

export default Login;
