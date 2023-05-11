import React from "react";
import Hours from "./Hours";
import Times from "./Times";
import Pattern from "./Pattern";
// import StackedRangeChart from "./Test";

const Charts = (props) => {
  if (props.show)
    return (
      <div>
        <Hours />
        <Times />
        <Pattern />
        {/* <StackedRangeChart /> */}
      </div>
    );
};

export default Charts;
