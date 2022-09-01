import { auth, provider, signInWithPopup } from "../firebase";

const Login = () => {
  return (
    <div className="login">
      <p>
        <strong>You're signed out</strong>
      </p>
      <button onClick={signInWithPopup}>Sign In</button>
    </div>
  );
};

export default Login;
