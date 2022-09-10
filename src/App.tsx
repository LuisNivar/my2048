import "./App.css";
import Grid from "./components/Grid";
import GridCell from "./components/GridCell";

function App() {
  const rows = 4;
  const columns = 4;

  const testValues = [...Array(rows * columns).keys()];

  return (
    <div className="app">
      {/* TODO Add game components */}
      <Grid rows={rows} columns={columns}>
        {testValues.map((val) => (
          <GridCell key={val} />
        ))}
      </Grid>
      <h1>Game placeholder</h1>
    </div>
  );
}

export default App;
