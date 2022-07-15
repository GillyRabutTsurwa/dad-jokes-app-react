import Jokes from "./Jokes";
import SideBar from "./SideBar";
import Button from "./Button";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <SideBar>
          <Button />
        </SideBar>
        <Jokes />
      </div>
    </div>
  );
}

export default App;
