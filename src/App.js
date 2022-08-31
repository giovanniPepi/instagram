import "./App.css";
import Header from "./components/Header";
import RightSide from "./components/RightSide";
import Timeline from "./components/Timeline";
import getPostFromFirestore from "./functions/getPostFromFirestore";
import postToFirestore from "./functions/postToFirestore";

const App = () => {
  // postToFirestore();
  // getPostFromFirestore();
  return (
    <main className="app">
      <Header />
      <Timeline />
      <RightSide />
    </main>
  );
};

export default App;
