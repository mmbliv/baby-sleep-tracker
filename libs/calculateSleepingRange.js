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
    let label = undefined;
    let dataset = {};
    if (i <= 23) {
      backgroundColor = "rgba(255, 99, 132, 0.5)";
      data = labels.map((l) => {
        let d = [];
        if (copy.length)
          for (let j of copy) {
            if (
              j[0]?.split(",")[0] === l &&
              j[1].length
              //   dayjs(j[1][0].fell_asleep).format("HH") >= 8 &&
              //   dayjs(j[1][0].fell_asleep).format("HH") < 20
            ) {
              for (let m of j[1]) {
                if (
                  dayjs(m.fell_asleep).format("HH") >= 8 &&
                  dayjs(m.fell_asleep).format("HH") < 20
                ) {
                  const hourF = dayjs(m.fell_asleep).hour();
                  const minF = dayjs(m.fell_asleep).minute();
                  const hourW = dayjs(m.woke_up).hour();
                  const minW = dayjs(m.woke_up).minute();
                  d = [
                    (hourF + minF / 60).toFixed(2),
                    (hourW + minW / 60).toFixed(2),
                  ];
                  const index = j[1].indexOf(m);
                  //   console.log(dayjs(m.fell_asleep).format("HH"));
                  //   console.log(minF);
                  j[1].splice(index, 1);
                  //   console.log(d, "day");
                  return d;
                }
              }
            }
          }
      });
      dataset = { backgroundColor, data, label };
      datasets.push(dataset);
    } else {
      backgroundColor = "rgb(75, 192, 192)";
      data = labels.map((l) => {
        let d = [];
        if (copy)
          for (let j of copy) {
            if (j[0]?.split(",")[0] === l && j[1].length) {
              for (let m of j[1]) {
                if (
                  dayjs(m.fell_asleep).format("HH") < 8 ||
                  dayjs(m.fell_asleep).format("HH") >= 20
                ) {
                  const hourF = dayjs(m.fell_asleep).hour();
                  const minF = dayjs(m.fell_asleep).minute();
                  const hourW = dayjs(m.woke_up).hour();
                  const minW = dayjs(m.woke_up).minute();
                  d = [
                    (hourF + minF / 60).toFixed(2),
                    (hourW + minW / 60).toFixed(2),
                  ];
                  //   console.log(dayjs(m.fell_asleep).format("HH"), "night");
                  const index = j[1].indexOf(m);
                  j[1].splice(index, 1);
                  //   console.log(d, "night");
                  return d;
                }
              }
              //   const hourF = dayjs(j[1][0].fell_asleep).hour();
              //   const minF = dayjs(j[1][0].fell_asleep).minute();
              //   const hourW = dayjs(j[1][0].woke_up).hour();
              //   const minW = dayjs(j[1][0].woke_up).minute();
              //   d = [
              //     (hourF + minF / 60).toFixed(2),
              //     (hourW + minW / 60).toFixed(2),
              //   ];
              //   console.log(d, "night");
              //   j[1].splice(0, 1);
            }
          }
        // return d;
      });
      dataset = { backgroundColor, data, label };
      datasets.push(dataset);
    }
  }
  datasets[0].label = "day";
  datasets[datasets.length - 1].label = "night";
  return datasets;
};

