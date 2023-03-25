import styles from "./App.module.css";
import Game from "./components/Game";
import Instruction from "./components/Layout/Instructions";
import TextStrokeFilter from "./components/TextStroke/TextStrokeFilter";

function App() {
  const rows = 4;
  const columns = 4;
  return (
    <div className={styles.app}>
      <div className={styles.layout}>
        <Game className={styles.game} rows={rows} cols={columns} />
        <Instruction className="instruction" />
      </div>
      <TextStrokeFilter />
    </div>
  );
}

export default App;
