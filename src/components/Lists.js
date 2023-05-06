import React from "react";
import List from "./List";
import useSleeping from "@/hooks/useSleeping";
import useCurrentUser from "@/hooks/useCurrentUser";
import dayjs from "dayjs";
import { getDailyData } from "../../libs/getDailyData";

const Lists = () => {
  const { data: currentUser } = useCurrentUser();

  const { data: sleepling } = useSleeping(currentUser && currentUser.id);
  //   console.log(dayjs(sleepling[0].fell_aseep).format("ddd,MMM D"));
  console.log(getDailyData(sleepling));
  return <div>Lists</div>;
};

export default Lists;
