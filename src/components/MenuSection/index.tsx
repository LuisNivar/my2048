import cn from "classnames";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as ReloadIcon } from "../../assets/reload.svg";
import Container from "../Container";
import { Action as GameAction } from "../Game/state";
import IconButton from "../IconButton";
import styles from "./index.module.css";

type menuSection = {
  className?: string;
  gameDispatch: React.Dispatch<GameAction>;
};

function MenuSection(props: menuSection) {
  const { className, gameDispatch } = props;
  const containerClass = cn(className, styles.container);

  const handleReset = () => {
    gameDispatch({ type: "reset" });
  };

  return (
    <Container className={containerClass}>
      <h3 className={styles.title}> Elegant 2048 </h3>
      <div className={styles.buttonGroup}>
        <IconButton className={styles.menu} Icon={MenuIcon} title="Menu" />
        <IconButton
          className={styles.reload}
          Icon={ReloadIcon}
          title="Reload"
          onClick={handleReset}
        />
      </div>
    </Container>
  );
}

export default MenuSection;
