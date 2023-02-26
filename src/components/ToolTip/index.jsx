import { useAtom } from "jotai";
import { forwardRef } from "react";
import { hourAtom, minuteAtom, secondAtom } from "../../state";
import "./index.css";

const ToolTip = forwardRef((props, ref) => {
  const [hour] = useAtom(hourAtom);
  const [minute] = useAtom(minuteAtom);
  const [second] = useAtom(secondAtom);

  const text = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}:${String(second).padStart(2, "0")}`;
  const ampm = hour >= 12 ? "오후" : "오전";

  return (
    <div className="tooltip" ref={ref}>
      <span>
        {ampm}
        &nbsp;
        {text}
      </span>
    </div>
  );
});
export default ToolTip;
