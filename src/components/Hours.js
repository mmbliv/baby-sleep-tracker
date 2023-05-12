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
import { faker } from "@faker-js/faker";
import useSleeping from "@/hooks/useSleeping";
import useCurrentUser from "@/hooks/useCurrentUser";
import dayjs from "dayjs";
import { CiCloudMoon } from "react-icons/ci";
import {
  generateWeekLabel,
  generateMonthlyLabel,
} from "../../libs/generateWeekLabel";
import { getDailyData } from "../../libs/getDailyData";
import { useState, useEffect } from "react";
import calculateNap from "../../libs/calculateNap";
import { day } from "javascript-time-ago/gradation";

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
      //   reverse: true,
    },
    title: {
      display: true,
      text: "Hours",
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

const Hours = (props) => {
  const { data: currentUser } = useCurrentUser();

  const [labels, setLabels] = useState();

  const { data: sleeping, mutate } = useSleeping(currentUser && currentUser.id);

  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    if (sleeping) {
      setDailyData(getDailyData(sleeping));
    }
  }, [sleeping]);

  useEffect(() => {
    if (props.show === "sevenDay") {
      setLabels(generateWeekLabel(dayjs().format("ddd")));
    }
    if (props.show === "thirtyDay") {
      setLabels(generateMonthlyLabel(dayjs()));
    }
  }, [props]);
  console.log(props);
  console.log(labels);

  //   const labels = generateWeekLabel(dayjs().format("ddd"));
  const data = {
    labels,
    datasets: [
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
    ],
  };
  //   if (props.showSevenDay)
  return (
    <>
      <Bar options={options} data={data} />
      {/* <div>chart</div> */}
    </>
  );
};

export default Hours;
