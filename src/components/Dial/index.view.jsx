import CenterCircle from "../CenterCircle";
import Hand from "../Hand";
import Index from "../Index";
import "./index.css";

function DialView({
  hDeg,
  mDeg,
  sDeg,
  index,
  handleMouseEnterOnClock,
  handleMouseMoveOnClock,
  handleMouseLeaveOnClock,
}) {
  return (
    <div
      className="dial"
      onMouseEnter={handleMouseEnterOnClock}
      onMouseMove={handleMouseMoveOnClock}
      onMouseLeave={handleMouseLeaveOnClock}
    >
      {index.map((num, idx) => (
        <Index key={idx} num={num} />
      ))}
      <CenterCircle />
      <Hand type="hour" deg={hDeg} />
      <Hand type="minute" deg={mDeg} />
      <Hand type="second" deg={sDeg} />
    </div>
  );
}

export default DialView;
