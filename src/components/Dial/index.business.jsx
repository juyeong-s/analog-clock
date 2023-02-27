import { useAtom } from "jotai";
import { memo, useEffect } from "react";
import { hourAtom, minuteAtom, secondAtom } from "../../state";
import DialView from "./index.view";

function Dial({
  handleMouseEnterOnClock,
  handleMouseLeaveOnClock,
  handleMouseMoveOnClock,
}) {
  const index = ["twelve", "three", "six", "nine"];

  const [hour, setHour] = useAtom(hourAtom);
  const [minute, setMinute] = useAtom(minuteAtom);
  const [second, setSecond] = useAtom(secondAtom);

  useEffect(() => {
    const clock = () => {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      setHour(() => hour);
      setMinute(() => minute);
      setSecond(() => second);
    };

    const timer = setInterval(clock, 1000);
    return () => clearInterval(timer);
  }, [setHour, setMinute, setSecond]);

  const hDeg = hour * 30 + (minute * 6) / 12; // 30도씩 회전 -> 12시간*30 = 360
  const mDeg = minute * 6; // 6도씩 회전 -> 60분*6 = 360
  const sDeg = second * 6; // 6도씩 회전 -> 60초*6 = 360

  const props = {
    hDeg,
    mDeg,
    sDeg,
    index,
    handleMouseEnterOnClock,
    handleMouseMoveOnClock,
    handleMouseLeaveOnClock,
  };

  return <DialView {...props} />;
}

export default memo(Dial);
