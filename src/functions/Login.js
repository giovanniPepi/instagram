import GoogleButton from "react-google-button";

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
