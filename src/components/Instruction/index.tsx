import { ReactComponent as SpeakerMute } from "../../assets/speaker-mute.svg";
import { ReactComponent as Speaker } from "../../assets/speaker.svg";
import useToggle from "../../hooks/useToggle";
import Container from "../Container";
import IconButton from "../IconButton";
import ArrowKeys from "./ArrowKeys";
import styles from "./index.module.css";

type instructionProps = {
  className?: string;
};

function Instruction(props: instructionProps) {
  const [sound, toggleSound] = useToggle(true);

  return (
    <Container className={`${styles.container} ${props.className}`}>
      <div className={styles.leftSec}>
        <ArrowKeys />
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
