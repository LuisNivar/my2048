import cn from "classnames";
import { ReactComponent as ReloadIcon } from "../../assets/reload.svg";
import Container from "../Container";
import { Action as GameAction } from "../Game/state";
import IconButton from "../IconButton";
import styles from "./index.module.css";

type retryGame = {
  className?: string;
  gameDispatch: React.Dispatch<GameAction>;
};

function RetryGame(props: retryGame) {
  const { className, gameDispatch } = props;
  const containerClass = cn(className, styles.container);

  const handleReset = () => {
    gameDispatch({ type: "reset" });
  };

  return (
    <Container className={containerClass}>
      <h3 className={styles.title}> GAME OVER </h3>
      <IconButton
        className={styles.reload}
        Icon={ReloadIcon}
        title="Reload"
        onClick={handleReset}
      />
    </Container>
  );
}

export default RetryGame;
