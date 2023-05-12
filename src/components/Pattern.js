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
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import {
  getTheLengthOfDataset,
  calculateSleepingRange,
} from "../../libs/calculateSleepingRange";

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
      //   stacked: true,
      //   type: "time",
      //   time: {
      //     displayFormats: {
      //       hour: "hA",
      //     },
      //     unit: "hour",
      //   },
      //   ticks: {
      //     min: "01:00:00",
      //     max: "24:00:00",
      //     stepSize: 60 * 60 * 1000,
      //   },
    },
  },
};

const Pattern = () => {
  const { data: currentUser } = useCurrentUser();

  const { data: sleeping, mutate } = useSleeping(currentUser && currentUser.id);

  const [dailyData, setDailyData] = useState();

  const [dateSetsArr, setDataSets] = useState([]);

  const labels = generateWeekLabel(dayjs().format("ddd"));
  useEffect(() => {
    if (sleeping) {
      setDailyData(getDailyData(sleeping));
    }
  }, [sleeping]);

  const data = {
    labels,
    datasets: calculateSleepingRange(dailyData, labels),
  };
  return (
    <>
      <Bar options={options} data={data} />
      {/* <div>chart</div> */}
    </>
  );
};

export default Pattern;
