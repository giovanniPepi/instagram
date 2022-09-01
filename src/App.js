import { Route, Routes } from "react-router-dom";
import "./App.css";
import AccountPage from "./components/AccountPage";
import Header from "./components/Header";
import RightSide from "./components/RightSide";
import SigninPage from "./components/SigninPage";
import Timeline from "./components/Timeline";

import { auth } from "./firebase";

const App = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="app">
            <Header />
            <Timeline />
            <RightSide />
          </main>
        }
      />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
};

export default App;
