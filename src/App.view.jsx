import "./App.css";
import Dial from "./components/Dial/index.business";
import ToolTip from "./components/ToolTip";
import "./styles/color.css";
import "./styles/reset.css";

function AppView({
  isMouseOver,
  tooptipRef,
  handleMouseEnterOnClock,
  handleMouseLeaveOnClock,
  handleMouseMoveOnClock,
}) {
  return (
    <div className="App">
      {isMouseOver && <ToolTip ref={tooptipRef} />}
      <Dial
        {...{
          handleMouseEnterOnClock,
          handleMouseLeaveOnClock,
          handleMouseMoveOnClock,
        }}
      />
    </div>
  );
}

export default AppView;
