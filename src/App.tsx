import "./App.css";
import { ReactComponent as MenuIcon } from "./assets/menu.svg";
import Board from "./components/Board";
import Container from "./components/Container";
import IconButton from "./components/IconButton";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const rows = 4;
  const columns = 4;
  let score = 15;
  let bestScore = 352;

  return (
    <div className="app">
      {/* TODO Add game components */}
      <h1>Game placeholder</h1>

      <Container>
        <Board rows={rows} columns={columns} />
      </Container>

      <ScoreBoard score={score} bestScore={bestScore} />

      <IconButton Icon={MenuIcon} />
    </div>
  );
}

export default App;
