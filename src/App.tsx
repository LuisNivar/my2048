import "./App.css";
import Board from "./components/Board";
import MenuSection from "./components/MenuSection";
import ScoreBoard from "./components/ScoreBoard";
import Instruction from "./components/Instruction";

function App() {
  const rows = 4;
  const columns = 4;
  let score = 15;
  let bestScore = 352;

  return (
    <div className="app">
      {/* TODO Add game components */}
      <div className="game">
        <MenuSection className="menu" />
        <ScoreBoard
          className="scoreboard"
          score={score}
          bestScore={bestScore}
        />
        <Board className="board" rows={rows} columns={columns} />
        <Instruction className="instruction" />
      </div>
    </div>
  );
}

export default App;
