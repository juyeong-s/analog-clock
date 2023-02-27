import { memo } from "react";
import "./index.css";

function Hand({ type, deg }) {
  return (
    <div
      className={`hand ${type}`}
      style={{ transform: `rotate(${deg}deg)` }}
    ></div>
  );
}

export default memo(Hand);
