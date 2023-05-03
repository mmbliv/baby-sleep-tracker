import React from "react";

const Card = (props) => {
  return (
    <div className=" h-56 w-full flex items-center justify-center gap-2 bg-slate-100">
      <div>
        <props.icon />
      </div>
      <div>{props.template ? props.template : "sleeping"}</div>
    </div>
  );
};

export default Card;
