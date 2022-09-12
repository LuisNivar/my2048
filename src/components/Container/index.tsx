import styles from "./index.module.css";

type LayoutProps = React.ComponentPropsWithoutRef<"div">;

function Container({ className, children, ...rest }: LayoutProps) {
  return (
    <div className={`${styles.roundSquare} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Container;
