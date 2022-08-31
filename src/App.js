import "./App.css";
import Header from "./components/Header";
import RightSide from "./components/RightSide";
import Timeline from "./components/Timeline";
import postToFirestore from "./functions/postToFirestore";

const App = () => {
  postToFirestore();
  return (
    <main className="app">
      <Header />
      <Timeline />
      <RightSide />
    </main>
  );
};

export default App;
