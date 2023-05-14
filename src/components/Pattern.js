import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import useSleeping from "@/hooks/useSleeping";
import useCurrentUser from "@/hooks/useCurrentUser";
import dayjs from "dayjs";
import {
  generateWeekLabel,
  generateMonthlyLabel,
} from "../../libs/generateWeekLabel";
import { getDailyData } from "../../libs/getDailyData";
import { useState, useEffect } from "react";
// import calculateNap from "../../libs/calculateNap";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import {
  getSevenDaypatternDatasets,
  getThirtyDaypatternDatasets,
} from "../../libs/getDatasets";

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

const Pattern = (props) => {
  const { data: currentUser } = useCurrentUser();

  const { data: sleeping, mutate } = useSleeping(currentUser && currentUser.id);

  const [dailyData, setDailyData] = useState();

  const [labels, setLabels] = useState();

  const [datasets, setDatasets] = useState();

  //   const labels = generateWeekLabel(dayjs().format("ddd"));
  //   useEffect(() => {
  //     if (sleeping) {
  //       setDailyData(getDailyData(sleeping));
  //     }
  //   }, [sleeping]);

  useEffect(() => {
    if (sleeping && props.show === "sevenDay") {
      setDailyData(getDailyData(sleeping));
    }
    if (sleeping && props.show === "thirtyDay") {
      setDailyData(getDailyData(sleeping));
    }
  }, [sleeping, props]);

  useEffect(() => {
    if (props.show === "sevenDay") {
      setLabels(generateWeekLabel(dayjs().format("ddd")));
    }
    if (props.show === "thirtyDay") {
      setLabels(generateMonthlyLabel(new Date()));
    }
  }, [props]);

  useEffect(() => {
    if (props.show === "sevenDay" && labels && dailyData) {
      setDatasets(getSevenDaypatternDatasets(dailyData, labels));
    }
    if (props.show === "thirtyDay" && labels && dailyData) {
      setDatasets(getThirtyDaypatternDatasets(dailyData, labels));
    }
  }, [props, dailyData, labels]);

  const data = {
    labels,
    // datasets: calculateSleepingRange(dailyData, labels),
    datasets: datasets || [],
  };
  return (
    <>
      <Bar options={options} data={data} />
      {/* <div>chart</div> */}
    </>
  );
};

export default Pattern;
