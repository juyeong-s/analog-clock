import { forwardRef } from "react";
import "./index.css";

const Hand = forwardRef((props, ref) => {
  const { type } = props;
  return <div className={`hand ${type}`} ref={ref}></div>;
});
export default Hand;
