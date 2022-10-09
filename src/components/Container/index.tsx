import classNames from "classnames";
import React from "react";
import styles from "./index.module.css";

export type ContainerProps = React.ComponentPropsWithoutRef<"div">;

const Container = React.forwardRef<HTMLDivElement | null, ContainerProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    const containerClass = classNames(styles.roundSquare, className);
    return (
      <div className={containerClass} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
