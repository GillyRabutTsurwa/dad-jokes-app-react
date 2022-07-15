import logo from "./logo.svg";
import Jokes from "./Jokes";
import SideBar from "./SideBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <SideBar />
        <Jokes />
      </div>
    </div>
  );
}

export default App;
