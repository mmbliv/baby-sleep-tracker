import * as React from "react";
import { useState } from "react";
import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

export default function Timer() {
  const [value, setValue] = useState(dayjs(Date().toLocaleString()));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=" flex flex-col w-full items-center gap-2 h-[calc(100vh_-_157px)] pt-10">
        <DateTimePicker
          label="Fell asleep"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          className="w-1/3"
        />
        <DateTimePicker
          label="Woke up"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          className="w-1/3"
        />
        <TextField
          id="outlined-multiline-static"
          label="Note"
          multiline
          rows={4}
          defaultValue=""
          className="w-1/3"
        />
      </div>
    </LocalizationProvider>
  );
}
