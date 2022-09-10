import "./App.css";
import { ReactComponent as MenuIcon } from "./assets/menu.svg";
import Board from "./components/Board";
import IconButton from "./components/IconButton";
import Tile from "./components/Tile";

function App() {
  const rows = 4;
  const columns = 4;

  return (
    <div className="app">
      {/* TODO Add game components */}
      <Board rows={rows} columns={columns} />
      <IconButton Icon={MenuIcon} />
      <Tile value={1234567} />
      <h1>Game placeholder</h1>
    </div>
  );
}

export default App;
