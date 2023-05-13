import React, { useState } from "react";
import Hours from "./Hours";
import Times from "./Times";
import Pattern from "./Pattern";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
// import StackedRangeChart from "./Test";

const Charts = (props) => {
  const [chart, setChart] = useState();
  const [date, setDate] = useState();
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
  if (props.show)
    return (
      <div>
        {(props.showMonthly || props.showWeekly) && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-row items-center gap-5 pt-5 justify-center">
              <DatePicker
                label="choose date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                className="w-1/3 "
              />
            </div>
          </LocalizationProvider>
        )}
        <Hours show={chart} date={date} />
        <Times show={chart} date={date} />
        <Pattern show={chart} date={date} />
        {/* <StackedRangeChart /> */}
      </div>
    );
};

export default Charts;
