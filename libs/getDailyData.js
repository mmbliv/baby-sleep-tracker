import dayjs from "dayjs";

export function getDailyData(sleepingData, days) {
  //   console.log(dayjs("2023-05-05T18:26:59.000Z").format("ddd,MMM D"));
  const result = [];
  for (let i of sleepingData) {
    const date = dayjs(i.fell_asleep).format("ddd,MMM D");
    // result.push(i);
    // console.log(date);
    if (!result[date]) {
      result[date] = [i];
    } else {
      result[date].push(i);
    }
  }
  let arr = Object.entries(result);
  if (arr.length > days) {
    arr = arr.slice(0, days);
  }
  // console.log(arr);
  return arr;
}

export function getMonthlyData(sleepingData, yearAndMonth) {}
