import "./index.css";

function Index(props) {
  const { num } = props;
  return <div className={"index_" + num}></div>;
}
export default Index;
