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
import { getDailyData } from "../../libs/getDailyData";
import { useState, useEffect } from "react";
import {
  generateWeekLabel,
  generateMonthlyLabel,
  generateSpecificMonthlyLabel,
} from "../../libs/generateWeekLabel";
import {
  getSevenDayTimesDatasets,
  getThirtyDayTimesDataset,
} from "../../libs/getDatasets";
import useSleepingWithDate from "@/hooks/useSleepingWithDate";
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

const Times = (props) => {
  const { data: currentUser } = useCurrentUser();

  const { data: sleeping, mutate } = useSleeping(currentUser && currentUser.id);

  const [dailyData, setDailyData] = useState();

  const [labels, setLabels] = useState();

  const [datasets, setDatasets] = useState();

  const { data: sleepingWithDate } = useSleepingWithDate(
    currentUser && currentUser.id,
    props.show && props.show,
    props.date && props.date
  );
  useEffect(() => {
    if (sleeping && props.show === "sevenDay") {
      setDailyData(getDailyData(sleeping));
    }
    if (sleeping && props.show === "thirtyDay") {
      setDailyData(getDailyData(sleeping));
    }
    if (sleeping && (props.show === "monthly" || props.show === "weekly")) {
      setDailyData(getDailyData(sleepingWithDate));
    }
  }, [sleeping, props, sleepingWithDate]);

  useEffect(() => {
    if (props.show === "sevenDay") {
      setLabels(generateWeekLabel(dayjs().format("ddd")));
    }
    if (props.show === "thirtyDay") {
      setLabels(generateMonthlyLabel(new Date()));
    }
    if (props.show === "monthly" && props.date) {
      setLabels(generateSpecificMonthlyLabel(props.date));
    }
    if (props.show === "weekly" && props.date) {
      setLabels(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    }
  }, [props]);

  useEffect(() => {
    if (
      (props.show === "sevenDay" || props.show === "weekly") &&
      labels &&
      dailyData
    ) {
      setDatasets(getSevenDayTimesDatasets(labels, dailyData));
    }
    if (
      (props.show === "thirtyDay" || props.show === "monthly") &&
      labels &&
      dailyData
    ) {
      setDatasets(getThirtyDayTimesDataset(labels, dailyData));
    }
  }, [props, dailyData, labels]);

  //   const labels = generateWeekLabel(dayjs().format("ddd"));
  const data = {
    labels,
    datasets: datasets || [],
    // datasets: [
    //   {
    //     label: "day",
    //     data: labels.map((l) => {
    //       let data = 0;
    //       if (dailyData)
    //         for (let j of dailyData) {
    //           if (j[0].split(",")[0] === l) {
    //             data = calculateNap(j[1])[0];
    //           }
    //         }
    //       return data;
    //     }),
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //   },
    //   {
    //     label: "night",
    //     data: labels.map((l) => {
    //       let data = 0;
    //       if (dailyData)
    //         for (let j of dailyData) {
    //           if (j[0].split(",")[0] === l) {
    //             data = calculateNap(j[1])[2];
    //           }
    //         }
    //       return data;
    //     }),
    //     backgroundColor: "rgb(75, 192, 192)",
    //   },
    // ],
  };
  return (
    <>
      <Bar options={options} data={data} />
      {/* <div>chart</div> */}
    </>
  );
};

export default Times;
