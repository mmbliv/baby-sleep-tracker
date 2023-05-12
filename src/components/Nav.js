import React from "react";
import { AiOutlineLineChart, AiOutlineUnorderedList } from "react-icons/ai";
const Nav = (props) => {
  return (
    <div className="h-14 bg-slate-300 w-full flex items-center justify-around gap-4">
      <div className="flex items-center gap-4">
        <p onClick={props.handleWeekly}>Weekly</p>
        <p onClick={props.handleMonthly}>Monthly</p>
        <p onClick={props.handleSevenDay}>7-day</p>
        <p onClick={props.handleThirtyDay}>30-day</p>
      </div>
      <div className="flex gap-3">
        <button
          className=" border-none bg-transparent"
          onClick={props.handleChart}
        >
          <AiOutlineLineChart className=" text-3xl" />
        </button>
        <button
          className=" border-none bg-transparent"
          onClick={props.handleLists}
        >
          <AiOutlineUnorderedList className=" text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Nav;
