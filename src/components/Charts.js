import React, { useState } from "react";
import Hours from "./Hours";
import Times from "./Times";
import Pattern from "./Pattern";
import { useEffect } from "react";
// import StackedRangeChart from "./Test";

const Charts = (props) => {
  const [chart, setChart] = useState();
  console.log(props);
  useEffect(() => {
    if (props.showMonthly) {
      setChart("monthly");
    }
    if (props.showSevenDay) {
      setChart("sevenDay");
    }
    if (props.showWeekly) {
      setChart("weekly");
    }
    if (props.showThirtyDay) {
      setChart("thirtyDay");
    }
  }, [props]);
  console.log(chart);
  if (props.show)
    return (
      <div>
        <Hours show={chart} />
        <Times show={chart} />
        <Pattern show={chart} />
        {/* <StackedRangeChart /> */}
      </div>
    );
};

export default Charts;
