import { Route, Routes } from "react-router-dom";
import "./App.css";
import AccountPage from "./components/AccountPage";
import Header from "./components/Header";
import Protected from "./components/Protected";
import RightSide from "./components/RightSide";
import SigninPage from "./components/SigninPage";
import Timeline from "./components/Timeline";
import UploadPage from "./components/UploadPage";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";

const App = () => {
  const user = UserAuth();

  return (
    <AuthContextProvider>
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
        <Route
          path="/account"
          element={
            <Protected>
              <AccountPage />
            </Protected>
          }
        />
        <Route
          path="/upload"
          element={
            <Protected>
              <UploadPage />
            </Protected>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
