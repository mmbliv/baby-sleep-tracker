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
      dayjs(i.woke_up).format("HH") < 20
    ) {
      // console.log(dayjs(i.fell_asleep).format("HH"));
      napTimes += 1;
      napTime =
        napTime + dayjs(i.woke_up).diff(dayjs(i.fell_asleep), "minute") + 1;
    } else {
      // console.log(dayjs(i.fell_asleep).format("HH"));
      nightSleepTimes += 1;
      nightSleepTime =
        nightSleepTime +
        dayjs(i.woke_up).diff(dayjs(i.fell_asleep), "minute") +
        1;
    }
  }
  return [napTimes, napTime, nightSleepTimes, nightSleepTime];
};
export default calculateNap;
