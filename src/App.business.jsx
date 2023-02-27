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

    requestAnimationFrame(() => {
      if (tooptipRef.current) {
        tooptipRef.current.style.left = `${clientX + 5}px`;
        tooptipRef.current.style.top = `${clientY - 30}px`;
      }
    });
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
