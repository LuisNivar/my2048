import "./App.css";
import Board from "./components/Board";
import MenuSection from "./components/MenuSection";
import ScoreBoard from "./components/ScoreBoard";
import Instruction from "./components/Instruction";
import Game from "./components/Game";

function App() {
  const rows = 4;
  const columns = 4;
  let score = 15;
  let bestScore = 352;

  return (
    <div className="app">
      <div className="layout">
        <Game
          className="game"
          score={score}
          bestScore={bestScore}
          row={rows}
          col={columns}
        />
        <Instruction className="instruction" />
      </div>
    </div>
  );
}

export default App;
