import styles from "./index.module.css";

type IconButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  Icon: React.ElementType;
};

function IconButton(props: IconButtonProps) {
  const { Icon, ...rest } = props;

  return (
    <button {...rest} className={styles.button}>
      {<Icon className={styles.icon} />}
    </button>
  );
}

export default IconButton;
