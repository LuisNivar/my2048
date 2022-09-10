import "./index.css";

type LayoutProps = {
  children: React.ReactNode;
};

function Container(props: LayoutProps) {
  return <div className="round-square">{props.children}</div>;
}

export default Container;
