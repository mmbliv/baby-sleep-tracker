import { da } from "date-fns/locale";
import dayjs from "dayjs";

export function getDailyData(sleepingData) {
  const result = {};

  if (sleepingData)
    for (let i of sleepingData) {
      const DateFellAsleep = new Date(i.fell_asleep);
      const date = dayjs(DateFellAsleep).format("ddd,MMM D");
      let DateWokeUp;
      if (i.woke_up) {
        DateWokeUp = new Date(i.woke_up);
      }

      i = {
        ...i,
        fell_asleep: DateFellAsleep,
        woke_up: DateWokeUp,
      };

      if (!result[date]) {
        result[date] = [i];
      } else {
        result[date].push(i);
      }
    }
  let arr = Object.entries(result);
  return arr;
}

export function getMonthlyData(sleepingData, yearAndMonth) {}
