import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import useSleeping from "@/hooks/useSleeping";
import useCurrentUser from "@/hooks/useCurrentUser";
import dayjs from "dayjs";
import generateWeekLabel from "../../libs/generateWeekLabel";
import { getDailyData } from "../../libs/getDailyData";
import { useState, useEffect } from "react";
import calculateNap from "../../libs/calculateNap";
// import { options } from "./Hours";
import { Random } from "random-js";
import { getTheLengthOfDataset } from "../../libs/calculateSleepingRange";
const random = new Random();

ChartJS.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      //   position: "top",
      display: true,
      labels: {
        filter: function (item, chart) {
          return item.text !== undefined;
        },
      },
    },
    title: {
      display: true,
      text: "Pattern",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const Pattern = () => {
  const { data: currentUser } = useCurrentUser();

  const { data: sleeping, mutate } = useSleeping(currentUser && currentUser.id);

  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    if (sleeping) {
      setDailyData(getDailyData(sleeping));
    }
  }, [sleeping]);
  console.log(dailyData);
  //   console.log(dailyData[0][0].split(",")[0]);
  console.log(getTheLengthOfDataset(dailyData));
  const labels = generateWeekLabel(dayjs().format("ddd"));
  const data = {
    labels,
    datasets: [
      {
        label: "day",
        data: labels.map(() => {
          return [random.real(-100, 100), random.real(-100, 100)];
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        // label: "day",
        data: labels.map(() => {
          return [random.real(-100, 100), random.real(-100, 100)];
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        // label: "night",
        data: labels.map(() => {
          return [random.real(-100, 100), random.real(-100, 100)];
        }),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "night",
        data: labels.map(() => {
          return [random.real(-100, 100), random.real(-100, 100)];
        }),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
      {/* <div>chart</div> */}
    </>
  );
};

export default Pattern;
