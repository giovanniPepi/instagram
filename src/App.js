import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SigninPage from "./components/SigninPage";
import Timeline from "./components/Timeline";
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
