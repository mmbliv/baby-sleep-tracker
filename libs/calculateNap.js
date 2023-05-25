import dayjs from "dayjs";
import changeMinToHour from "./changeMinIntoHour";

const calculateNap = (dataArr) => {
  let napTimes = 0;
  let napTime = 0;
  let nightSleepTimes = 0;
  let nightSleepTime = 0;
  for (let i of dataArr) {
    if (
      dayjs(i.fell_asleep).format("HH") >= 8 &&
      dayjs(i.fell_asleep).format("HH") < 20
    ) {
      napTimes += 1;
      if (i.woke_up) {
        napTime =
          napTime + dayjs(i.woke_up).diff(dayjs(i.fell_asleep), "minute") + 1;
      }
    } else {
      nightSleepTimes += 1;
      if (i.woke_up) {
        nightSleepTime =
          nightSleepTime +
          dayjs(i.woke_up).diff(dayjs(i.fell_asleep), "minute") +
          1;
      }
    }
  }
  return [napTimes, napTime, nightSleepTimes, nightSleepTime];
};
export default calculateNap;
