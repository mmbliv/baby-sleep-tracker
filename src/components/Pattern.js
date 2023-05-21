import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import useSleeping from "@/hooks/useSleeping";
import useCurrentUser from "@/hooks/useCurrentUser";
import dayjs from "dayjs";
import {
  generateMonthlyLabel,
  generateSpecificMonthlyLabel,
  generateSpecificWeeklyLabel,
} from "../../libs/generateWeekLabel";
import { getDailyData } from "../../libs/getDailyData";
import { useState, useEffect } from "react";
// import calculateNap from "../../libs/calculateNap";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import {
  getSevenDaypatternDatasets,
  getThirtyDaypatternDatasets,
} from "../../libs/getDatasets";
import useSleepingWithDate from "@/hooks/useSleepingWithDate";

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
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          // console.log(value);
          const formatedData = value.map((d, i) => {
            let h = "";
            if (i === 0) {
              h = "-";
            }
            if ((d % 1) * 60 === 0) {
              return Math.floor(d) + ":" + (d % 1) * 60 + "0" + h;
            } else {
              if (Math.floor((d % 1) * 60) < 10) {
                return Math.floor(d) + ":" + "0" + Math.floor((d % 1) * 60) + h;
              } else {
                return Math.floor(d) + ":" + Math.floor((d % 1) * 60) + h;
              }
            }
          });
          return formatedData;

          // Custom formatting logic
          // return '$' + value.toFixed(2);
        },
      },
    },
  },

  scales: {
    x: {
      stacked: true,
    },
    y: {
      // type: "time",
      // time: {
      //   displayFormats: {
      //     hour: "hA",
      //   },
      //   unit: "hour",
      // },
      ticks: {
        callback: function (value, index, ticks) {
          if (value < 10) {
            return "0" + value + ":" + "00" + ":" + "00";
          } else {
            return value + ":" + "00" + ":" + "00";
          }
        },
      },
    },
  },
};

const Pattern = (props) => {
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
      setLabels(generateMonthlyLabel(new Date(), "week"));
    }
    if (props.show === "thirtyDay") {
      setLabels(generateMonthlyLabel(new Date(), "month"));
    }
    if (props.show === "monthly" && props.date) {
      setLabels(generateSpecificMonthlyLabel(props.date));
    }
    if (props.show === "weekly" && props.date) {
      setLabels(generateSpecificWeeklyLabel(props.date));
    }
  }, [props]);

  useEffect(() => {
    if (
      (props.show === "sevenDay" || props.show === "weekly") &&
      labels &&
      dailyData
    ) {
      setDatasets(getSevenDaypatternDatasets(dailyData, labels));
    }
    if (
      (props.show === "thirtyDay" || props.show === "monthly") &&
      labels &&
      dailyData
    ) {
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
