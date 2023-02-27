import { useCallback, useRef, useState } from "react";
import "./App.css";
import Dial from "./components/Dial/index.business";
import ToolTip from "./components/ToolTip";
import "./styles/color.css";
import "./styles/reset.css";

function App() {
  const tooptipRef = useRef();
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnterOnClock = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseLeaveOnClock = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const handleMouseMoveOnClock = useCallback((e) => {
    const { clientX, clientY } = e;

    requestAnimationFrame(() => {
      if (tooptipRef.current) {
        tooptipRef.current.style.left = `${clientX + 5}px`;
        tooptipRef.current.style.top = `${clientY - 30}px`;
      }
    });
  }, []);

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

export default App;
