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
import generateWeekLabel from "../../libs/generateWeekLabel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
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

const Hours = () => {
  const { data: currentUser } = useCurrentUser();

  const { data: sleepling, mutate } = useSleeping(
    currentUser && currentUser.id
  );
  const labels = generateWeekLabel(dayjs(sleepling[0].woke_up).format("ddd"));
  const data = {
    labels,
    datasets: [
      {
        label: "day",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "night",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
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

export default Hours;
