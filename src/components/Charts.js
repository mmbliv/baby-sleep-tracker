import React from "react";
import Hours from "./Hours";

const Charts = (props) => {
  if (props.show)
    return (
      <div>
        <Hours />
      </div>
    );
};

export default Charts;
