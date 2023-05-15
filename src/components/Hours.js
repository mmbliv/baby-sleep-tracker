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
import {
  generateWeekLabel,
  generateMonthlyLabel,
  generateSpecificMonthlyLabel,
} from "../../libs/generateWeekLabel";
import { getDailyData } from "../../libs/getDailyData";
import { useState, useEffect } from "react";
import {
  getSevenDayWeeklyHoursDatasets,
  getThirtyDayWeeklyHoursDatasets,
} from "../../libs/getDatasets";
import useSleepingWithDate from "@/hooks/useSleepingWithDate";
import { fetchData } from "../../libs/fetchdataWithDate";

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

  const { data: sleepingWithDate } = useSleepingWithDate(
    currentUser && currentUser.id,
    props.show && props.show,
    props.date && props.date
  );

  const [dailyData, setDailyData] = useState();

  const [datasets, setDatasets] = useState();

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
      setDatasets(getSevenDayWeeklyHoursDatasets(labels, dailyData));
    }
    if (
      (props.show === "thirtyDay" || props.show === "monthly") &&
      labels &&
      dailyData
    ) {
      setDatasets(getThirtyDayWeeklyHoursDatasets(labels, dailyData));
    }
  }, [props, dailyData, labels]);

  //   console.log(dailyData);
  //   console.log(labels);
  //   console.log(datasets);
  const data = {
    labels,
    datasets: datasets || [],
  };
  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};

export default Hours;
