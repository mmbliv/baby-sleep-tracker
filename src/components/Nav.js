import React from "react";
import { AiOutlineLineChart, AiOutlineUnorderedList } from "react-icons/ai";
const Nav = (props) => {
  return (
    <div className="h-14 bg-slate-300 w-full flex items-center justify-around gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={props.handleWeekly}
          className="border-none bg-transparent text-lg"
        >
          Weekly
        </button>
        <button
          onClick={props.handleMonthly}
          className="border-none bg-transparent text-lg"
        >
          Monthly
        </button>
        <button
          onClick={props.handleSevenDay}
          className="border-none bg-transparent text-lg"
        >
          7-day
        </button>
        <button
          onClick={props.handleThirtyDay}
          className="border-none bg-transparent text-lg"
        >
          30-day
        </button>
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
