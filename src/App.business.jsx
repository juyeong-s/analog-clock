import { useCallback, useRef, useState } from "react";
import AppView from "./App.view";

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

    if (tooptipRef.current) {
      const { offsetTop, offsetLeft } = tooptipRef.current;
      const x = clientX + 5 - offsetLeft;
      const y = clientY - 30 - offsetTop;

      tooptipRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, []);

  return (
    <AppView
      {...{
        isMouseOver,
        tooptipRef,
        handleMouseEnterOnClock,
        handleMouseLeaveOnClock,
        handleMouseMoveOnClock,
      }}
    />
  );
}

export default App;
