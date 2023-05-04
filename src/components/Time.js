import * as React from "react";
import { useState } from "react";
import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
export default function Timer() {
  const [fellasleepValue, setFellAsleepValue] = useState(
    dayjs(Date().toLocaleString())
  );
  const [wokeUpValue, setWokeUpValue] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=" flex flex-col w-full items-center gap-2 h-[calc(100vh_-_157px)] pt-10">
        <DateTimePicker
          label="Fell asleep"
          value={fellasleepValue}
          onChange={(newValue) => setFellAsleepValue(newValue)}
          className="w-2/3"
        />
        <DateTimePicker
          label="Woke up"
          value={wokeUpValue}
          onChange={(newValue) => setWokeUpValue(newValue)}
          className="w-2/3"
        />
        <TextField
          id="outlined-multiline-static"
          label="Note"
          multiline
          rows={4}
          defaultValue=""
          className="w-2/3"
        />
        <div className=" flex justify-between w-2/3 pt-10">
          <button className="border-none bg-transparent text-6xl ">
            <AiFillCloseCircle className=" text-slate-500" />
          </button>
          <button className="border-none bg-transparent text-6xl">
            <AiFillCheckCircle className=" text-slate-500" />
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
}
