import { ReactComponent as SpeakerMute } from "../../assets/speaker-mute.svg";
import { ReactComponent as Speaker } from "../../assets/speaker.svg";
import useToggle from "../../hooks/useToggle";
import Container from "../Container";
import IconButton from "../IconButton";
import styles from "./index.module.css";
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
        <div className={styles.controls}>
          <ArrowKey className={cn(styles.up)} />
          <ArrowKey className={cn(styles.down)} />
          <ArrowKey className={cn(styles.left)} />
          <ArrowKey className={cn(styles.right)} />
        </div>
        <h2 className={styles.title}>Controls</h2>
      </div>

      <IconButton
        onClick={toggleSound}
        className={styles.speaker}
        title="Speaker Button"
        Icon={sound ? Speaker : SpeakerMute}
      />
    </Container>
  );
}

export default Instruction;
