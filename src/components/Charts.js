import React from "react";
import Hours from "./Hours";
import Times from "./Times";

const Charts = (props) => {
  if (props.show)
    return (
      <div>
        <Hours />
        <Times />
      </div>
    );
};

export default Charts;
