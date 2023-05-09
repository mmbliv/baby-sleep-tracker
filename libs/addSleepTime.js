import dayjs from "dayjs";

export default function addSleepTime(dataArr) {
  let result = 0;
  for (let i of dataArr) {
    if (i.fell_asleep && i.woke_up) {
      result += dayjs(i.woke_up).diff(dayjs(i.fell_asleep), "minute");
    }
  }
  return result;
}
