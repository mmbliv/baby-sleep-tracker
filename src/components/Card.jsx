import React from "react";

const Card = (props) => {
  return (
    <div
      className={`border-2 py-16 px-16 flex items-center justify-center gap-2 `}
    >
      <div>
        <props.icon />
      </div>
      <div>{props.template ? props.template : "sleeping"}</div>
    </div>
  );
};

export default Card;
