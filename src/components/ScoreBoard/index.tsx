import React from "react";
import Container from "../Container";
import "./index.css";

type ScoreType = {
  score: number;
  bestScore: number;
};

function ScoreBoard(props: ScoreType) {
  /**
   * Add leading Zeros
   * @see {@link https://stackoverflow.com/questions/1267283/how-can-i-pad-a-value-with-leading-zeros}
   */
  const score = ("0000000" + props.score).slice(-7);
  const bestScore = ("0000000" + props.bestScore).slice(-7);

  return (
    <div className="score-board">
      <Container>
        <p className="title">Score:</p> <p>{score}</p>
      </Container>

      <Container>
        <p className="title">Best:</p> <p>{bestScore} </p>
      </Container>
    </div>
  );
}

export default ScoreBoard;
