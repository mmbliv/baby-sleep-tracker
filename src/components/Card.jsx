import React from "react";

const Card = (props) => {
  return (
    <div
      className={`border-2 pt-16 pb-16 pr-5 pl-5 flex items-center justify-center gap-4 `}
    >
      <div>
        <props.icon />
      </div>
      <div>{props.template ? props.template : "sleeping"}</div>
    </div>
  );
};

export default Card;
