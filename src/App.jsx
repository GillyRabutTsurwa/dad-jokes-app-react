import Jokes from "./Jokes";
import SideBar from "./SideBar";
/**
 * NOTE:
 * removing the button component until i figure out how to update state with redux
 * will deploy without the component but will not delete it from the App
 */
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
