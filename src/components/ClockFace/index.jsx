import { useSetAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { hourAtom, minuteAtom, secondAtom } from "../../state";
import ClockCenterCircle from "../ClockCenterCircle";
import Hand from "../Hand";
import Index from "../Index";
import ToolTip from "../ToolTip";
import "./index.css";

const index = [
  "twelve",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
];

function ClockFace() {
  const tooptipRef = useRef();

  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();

  const setHour = useSetAtom(hourAtom);
  const setMinute = useSetAtom(minuteAtom);
  const setSecond = useSetAtom(secondAtom);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const clock = useCallback(() => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    setHour(() => hour);
    setMinute(() => minute);
    setSecond(() => second);

    const hDeg = hour * 30; // 30도씩 회전 -> 12시간*30 = 360
    const mDeg = minute * 6; // 6도씩 회전 -> 60분*6 = 360
    const sDeg = second * 6; // 6도씩 회전 -> 60초*6 = 360

    hourRef.current.style.transform = `rotate(${hDeg + mDeg / 12}deg)`;
    minuteRef.current.style.transform = `rotate(${mDeg}deg)`;
    secondRef.current.style.transform = `rotate(${sDeg}deg)`;
  }, [setHour, setMinute, setSecond]);

  const handleMouseEnterOnClock = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeaveOnClock = () => {
    setIsMouseOver(false);
  };

  const handleMouseMoveOnClock = (e) => {
    const { clientX, clientY } = e;

    if (tooptipRef.current) {
      tooptipRef.current.style.left = `${clientX + 5}px`;
      tooptipRef.current.style.top = `${clientY - 30}px`;
    }
  };

  useEffect(() => {
    const timer = setInterval(clock, 1000);
    return () => clearInterval(timer);
  }, [clock]);

  return (
    <div
      className="clock-face"
      onMouseEnter={handleMouseEnterOnClock}
      onMouseMove={handleMouseMoveOnClock}
      onMouseLeave={handleMouseLeaveOnClock}
    >
      {isMouseOver && <ToolTip ref={tooptipRef} />}
      {index.map((num, idx) => (
        <Index key={idx} num={num} />
      ))}

      <ClockCenterCircle position="center" />
      <Hand type="hour" ref={hourRef} />
      <Hand type="minute" ref={minuteRef} />
      <Hand type="second" ref={secondRef} />
    </div>
  );
}
export default ClockFace;
