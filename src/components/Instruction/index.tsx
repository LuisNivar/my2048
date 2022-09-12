import React, { useState } from "react";
import styles from "./index.module.css";
import Container from "../Container";
import IconButton from "../IconButton";
import { ReactComponent as Speaker } from "../../assets/speaker.svg";
import { ReactComponent as SpeakerMute } from "../../assets/speaker-mute.svg";
import ArrowKeys from "./ArrowKeys";

type instructionProps = {
  className?: string;
};

function Instruction(props: instructionProps) {
  const [sound, setSound] = useState(true);

  const handleClick = () => {
    setSound(!sound);
  };

  return (
    <Container className={`${styles.container} ${props.className}`}>
      <div className={styles.leftSec}>
        <ArrowKeys />
        <h2 className={styles.title}>Controls</h2>
      </div>

      <IconButton
        onClick={handleClick}
        className={styles.speaker}
        title="Speaker Button"
        Icon={sound ? Speaker : SpeakerMute}
      />
    </Container>
  );
}

export default Instruction;
