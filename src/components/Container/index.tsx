import styles from "./index.module.css";

export type ContainerProps = React.ComponentPropsWithoutRef<"div">;

function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div className={`${styles.roundSquare} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Container;
