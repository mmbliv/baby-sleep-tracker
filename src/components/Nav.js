import React from "react";
import { AiOutlineLineChart, AiOutlineUnorderedList } from "react-icons/ai";
const Nav = (props) => {
  return (
    <div className=" h-14 bg-slate-300 w-full flex items-center justify-end gap-4">
      <button className=" border-none bg-transparent">
        <AiOutlineLineChart className=" text-3xl" />
      </button>
      <button className=" border-none bg-transparent">
        <AiOutlineUnorderedList className=" text-3xl" />
      </button>
    </div>
  );
};

export default Nav;
