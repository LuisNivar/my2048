import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as ReloadIcon } from "../../assets/reload.svg";
import Container from "../Container";
import IconButton from "../IconButton";
import styles from "./index.module.css";

type MenuSection = {
  className?: string;
};

function MenuSection(props: MenuSection) {
  return (
    <Container className={styles.container}>
      <h3 className={styles.title}> Elegant 2048 </h3>
      <IconButton className={styles.menu} Icon={MenuIcon} title="Menu" />
      <IconButton className={styles.reload} Icon={ReloadIcon} title="Reload" />
    </Container>
  );
}

export default MenuSection;
