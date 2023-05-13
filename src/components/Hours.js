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
import {
  getSevenDayWeeklyHoursDatasets,
  getThirtyDayWeeklyHoursDatasets,
} from "../../libs/getDatasets";

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

  const [datasets, setDatasets] = useState();

  useEffect(() => {
    if (sleeping && props.show === "sevenDay") {
      setDailyData(getDailyData(sleeping, 7));
    }
    if (sleeping && props.show === "thirtyDay") {
      setDailyData(getDailyData(sleeping, 30));
    }
    if (sleeping && props.show === "monthly") {
      setDailyData();
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
      setDatasets(getSevenDayWeeklyHoursDatasets(labels, dailyData));
    }
    if (props.show === "thirtyDay" && labels && dailyData) {
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
