import "./App.css";
import Game from "./components/Game";
import Instruction from "./components/Instruction";

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
