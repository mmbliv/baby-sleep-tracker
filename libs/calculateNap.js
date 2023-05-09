import dayjs from "dayjs";
import changeMinToHour from "./changeMinIntoHour";

const calculateNap = (dataArr) => {
  let napTimes = 0;
  let napTime = 0;
  for (let i of dataArr) {
    if (
      dayjs(i.fell_asleep).format("HH") > 8 &&
      dayjs(i.woke_up).format("HH") < 20
    ) {
      napTimes += 1;
      napTime += dayjs(i.woke_up).diff(dayjs(i.fell_asleep), "minute");
    }
  }
  return [napTimes, changeMinToHour(napTime)];
};
export default calculateNap;
