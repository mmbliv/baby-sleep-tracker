import dayjs from "dayjs";

export const getTheLengthOfDataset = (sleepingData) => {
  const copy = [...sleepingData];
  copy[0][1].splice(1, 1);
  //   let long = 0;
  //   for (let i of sleepingData) {
  //     if (i[1].length > long) {
  //       long = i[1].length;
  //     }
  //   }
  console.log(copy);
};

export const calculateSleepingRange = (sleepingData, labels) => {
  //   const datasetLength = getTheLengthOfDataset(sleepingData);
  let copy = [];
  if (sleepingData) {
    copy = [...sleepingData];
  }
  const datasets = [];
  for (let i = 0; i < 48; i++) {
    let backgroundColor = "";
    let data = undefined;
    let lable = undefined;
    let dataset = {};
    if (i <= 23) {
      backgroundColor = "rgba(255, 99, 132, 0.5)";
      data = labels.map((l) => {
        let d = [];
        if (copy.length)
          for (let j of copy) {
            if (
              j[0]?.split(",")[0] === l &&
              j[1].length &&
              dayjs(j[1][0].fell_asleep).format("HH") >= 8 &&
              dayjs(j[1][0].fell_asleep).format("HH") < 20
            ) {
              const hourF = dayjs(j[1][0].fell_asleep).hour();
              const minF = dayjs(j[1][0].fell_asleep).minute();
              const hourW = dayjs(j[1][0].woke_up).hour();
              const minW = dayjs(j[1][0].woke_up).minute();
              d = [
                (hourF + minF / 60).toFixed(2),
                (hourW + minW / 60).toFixed(2),
              ];
              j[1].splice(0, 1);
            }
          }
        return d;
      });
      if (i === 0) {
        lable = "day";
      }
      dataset = { backgroundColor, data, lable };
      datasets.push(dataset);
    } else {
      backgroundColor = "rgb(75, 192, 192)";
      data = labels.map((l) => {
        let d = [];
        if (copy)
          for (let j of copy) {
            if (
              (j[0]?.split(",")[0] === l &&
                j[1].length &&
                dayjs(j[1][0]?.fell_asleep).format("HH") < 8) ||
              dayjs(j[1][0]?.fell_asleep).format("HH") > 20
            ) {
              const hourF = dayjs(j[1][0].fell_asleep).hour();
              const minF = dayjs(j[1][0].fell_asleep).minute();
              const hourW = dayjs(j[1][0].woke_up).hour();
              const minW = dayjs(j[1][0].woke_up).minute();
              d = [
                (hourF + minF / 60).toFixed(2),
                (hourW + minW / 60).toFixed(2),
              ];
              console.log(d);
              j[1].splice(0, 1);
            }
          }
        return d;
      });
      if (i === 47) {
        lable = "night";
      }
      dataset = { backgroundColor, data, lable };
      datasets.push(dataset);
    }
  }
  datasets[0].lable = "day";
  datasets[datasets.length - 1].lable = "night";
  //   console.log(datasets);
  return datasets;
};
