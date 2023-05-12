import calculateNap from "./calculateNap";

export const getSevenDayWeeklyHoursDatasets = (labels, dailyData) => {
  return [
    {
      label: "day",
      data: labels?.map((l) => {
        let data = 0;
        if (dailyData)
          for (let j of dailyData) {
            if (j[0].split(",")[0] === l) {
              data = calculateNap(j[1])[1] / 60;
            }
          }
        return data;
      }),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "night",
      data: labels?.map((l) => {
        let data = 0;
        if (dailyData)
          for (let j of dailyData) {
            if (j[0].split(",")[0] === l) {
              data = calculateNap(j[1])[3] / 60;
            }
          }
        return data;
      }),
      backgroundColor: "rgb(75, 192, 192)",
    },
  ];
};

export const getThirtyDayWeeklyHoursDatasets = (labels, dailyData) => {
  return [
    {
      label: "day",
      data: labels?.map((l) => {
        let data = 0;
        if (dailyData)
          for (let j of dailyData) {
            if (j[0].split(",")[1] === l) {
              data = calculateNap(j[1])[1] / 60;
            }
          }
        return data;
      }),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "night",
      data: labels?.map((l) => {
        let data = 0;
        if (dailyData)
          for (let j of dailyData) {
            if (j[0].split(",")[1] === l) {
              data = calculateNap(j[1])[3] / 60;
            }
          }
        return data;
      }),
      backgroundColor: "rgb(75, 192, 192)",
    },
  ];
};
