import "./App.css";
import Header from "./components/Header";
import RightSide from "./components/RightSide";
import Timeline from "./components/Timeline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./functions/Login";

const App = () => {
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <main className="app">
      {user ? (
        <div className="app">
          <h1>Hello, {user.displayName}</h1>
          <h1>You are signed in as {user.email}</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <Login />
      )}
      <Header />
      <Timeline />
      <RightSide />
    </main>
  );
};

export default App;
