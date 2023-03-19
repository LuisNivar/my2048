import { ReactComponent as SpeakerMute } from "../../assets/speaker-mute.svg";
import { ReactComponent as Speaker } from "../../assets/speaker.svg";
import useToggle from "../../hooks/useToggle";
import Container from "../Container";
import IconButton from "../IconButton";
import styles from "./Instructions.module.css";
import { ReactComponent as ArrowKey } from "../../assets/key-arrow.svg";
import cn from "classnames";

type instructionProps = {
  className?: string;
};

function Instruction(props: instructionProps) {
  const [sound, toggleSound] = useToggle(true);

  return (
    <Container className={`${styles.container} ${props.className}`}>
      <div className={styles.leftSec}>
        <div className={styles.controls} aria-label="Game controls">
          <ArrowKey className={cn(styles.up)} aria-label="arrow up key" />
          <ArrowKey className={cn(styles.down)} aria-label="arrow down key" />
          <ArrowKey className={cn(styles.left)} aria-label="arrow left key" />
          <ArrowKey className={cn(styles.right)} aria-label="arrow right key" />
        </div>
        <h2 className={cn(styles.title, "text-2xl")}>Controls</h2>
      </div>

      <IconButton
        onClick={toggleSound}
        className={styles.speaker}
        Icon={sound ? Speaker : SpeakerMute}
        aria-label="Toggle sound"
      />
    </Container>
  );
}

export default Instruction;
