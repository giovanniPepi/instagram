import { Route, Routes } from "react-router-dom";
import "./App.css";
import AccountPage from "./components/AccountPage";
import Header from "./components/Header";
import Protected from "./components/Protected";
import SigninPage from "./components/SigninPage";
import Timeline from "./components/Timeline";
import UploadPage from "./components/UploadPage";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <main className="app">
              <Header />
              <Timeline />
            </main>
          }
        />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
