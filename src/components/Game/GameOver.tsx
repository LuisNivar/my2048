import cn from "classnames";
import { ReactComponent as ReloadIcon } from "../../assets/reload.svg";
import Container from "../Container";
import { Action as GameAction } from "./state";
import IconButton from "../IconButton";
import styles from "./GameOver.module.css";
import { useSpring, animated } from "@react-spring/web";

type RetryGameProps = {
  show?: boolean;
  className?: string;
  gameDispatch: React.Dispatch<GameAction>;
};

function GameOver({ className, gameDispatch, show }: RetryGameProps) {
  const animatedStyles = useTranslateDownAnimation(show);

  const handleReset = () => {
    gameDispatch({ type: "reset" });
  };

  if (!show) return null;

  return (
    <Container className={cn(className, styles.container)}>
      <animated.div className={styles.content} style={animatedStyles}>
        <h3 className={cn(styles.title, "text-4xl")}>GAME OVER</h3>
        <IconButton
          className={styles.reload}
          Icon={ReloadIcon}
          title="Reload"
          onClick={handleReset}
        />
      </animated.div>
    </Container>
  );
}

function useTranslateDownAnimation(show?: boolean) {
  const springs = useSpring({
    from: { transform: "translateY(-100%)", opacity: 0 },
    to: {
      transform: show ? "translateY(0)" : "translateY(-100%)",
      opacity: show ? 1 : 0,
    },
  });

  return springs;
}

export default GameOver;
