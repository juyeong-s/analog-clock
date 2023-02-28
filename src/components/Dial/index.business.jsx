import { useAtomValue, useSetAtom } from "jotai";
import { memo, useEffect } from "react";
import { dateAtom, hourAtom, minuteAtom, secondAtom } from "../../state";
import DialView from "./index.view";

function Dial({
  handleMouseEnterOnClock,
  handleMouseLeaveOnClock,
  handleMouseMoveOnClock,
}) {
  const index = ["twelve", "three", "six", "nine"];

  const hour = useAtomValue(hourAtom);
  const minute = useAtomValue(minuteAtom);
  const second = useAtomValue(secondAtom);

  const setDate = useSetAtom(dateAtom);

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

  useEffect(() => {
    const clock = () => {
      const date = new Date();
      setDate(date);
    };

    const timer = setInterval(clock, 1000);
    return () => clearInterval(timer);
  }, [setDate]);

  return <DialView {...props} />;
}

export default memo(Dial);
