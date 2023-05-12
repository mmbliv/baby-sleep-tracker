import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useSleeping from "@/hooks/useSleeping";
import useCurrentUser from "@/hooks/useCurrentUser";
import dayjs from "dayjs";
import { generateWeekLabel } from "../../libs/generateWeekLabel";
import { getDailyData } from "../../libs/getDailyData";
import { useState, useEffect } from "react";
import calculateNap from "../../libs/calculateNap";
// import { options } from "./Hours";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Times",
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

const Times = () => {
  const { data: currentUser } = useCurrentUser();

  const { data: sleeping, mutate } = useSleeping(currentUser && currentUser.id);

  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    if (sleeping) {
      setDailyData(getDailyData(sleeping));
    }
  }, [sleeping]);
  //   console.log(sleeping);
  //   console.log(dailyData[0][0].split(",")[0]);

  const labels = generateWeekLabel(dayjs().format("ddd"));
  const data = {
    labels,
    datasets: [
      {
        label: "day",
        data: labels.map((l) => {
          let data = 0;
          if (dailyData)
            for (let j of dailyData) {
              if (j[0].split(",")[0] === l) {
                data = calculateNap(j[1])[0];
              }
            }
          return data;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "night",
        data: labels.map((l) => {
          let data = 0;
          if (dailyData)
            for (let j of dailyData) {
              if (j[0].split(",")[0] === l) {
                data = calculateNap(j[1])[2];
              }
            }
          return data;
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

export default Times;