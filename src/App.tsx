import "./App.css";
import Game from "./components/Game";
import Instruction from "./components/Instruction";
import TextStrokeFilter from "./components/Tile/TextStroke/TextStrokeFilter";

function App() {
  const rows = 4;
  const columns = 4;
  let score = 0;
  let bestScore = 0;

  return (
    <div className="app">
      <div className="layout">
        <Game
          className="game"
          score={score}
          bestScore={bestScore}
          rows={rows}
          cols={columns}
        />
        <Instruction className="instruction" />
      </div>
      <TextStrokeFilter />
    </div>
  );
}

export default App;
