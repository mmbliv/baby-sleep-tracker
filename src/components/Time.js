import * as React from "react";
import { useState, useCallback } from "react";
import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import useTimer from "@/hooks/useTimer";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSleeping from "@/hooks/useSleeping";
import { useEffect } from "react";

export default function Timer({ isOpen }) {
  const { data: currentUser } = useCurrentUser();

  const { data: sleepling, mutate } = useSleeping(
    currentUser && currentUser.id
  );

  const timeModal = useTimer();
  const [fellasleepValue, setFellAsleepValue] = useState(
    dayjs(Date().toLocaleString())
  );
  const [wokeUpValue, setWokeUpValue] = useState();
  const [note, setNote] = useState("");

  const handleClose = () => {
    timeModal.onClose();
  };

  useEffect(() => {
    if (sleepling && !sleepling[0].woke_up) {
      setFellAsleepValue(dayjs(sleepling[0].fell_asleep));
      setNote(sleepling[0].note);
    } else {
      setFellAsleepValue(dayjs(Date().toLocaleString()));
      setWokeUpValue();
      setNote("");
    }
  }, [sleepling]);
  // console.log(dayjs(fellasleepValue).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"));
  // console.log(
  //   dayjs(sleepling[0].fell_asleep).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
  // );

  const handleCheck = useCallback(async () => {
    if (
      sleepling &&
      !sleepling[0].woke_up &&
      wokeUpValue &&
      dayjs(fellasleepValue).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") ===
        dayjs(sleepling[0].fell_asleep).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    ) {
      try {
        const url = "/api/sleeping";
        const body = {
          note: note,
          id: sleepling[0].id,
          woke_up: wokeUpValue,
        };
        await axios.patch(url, { body });
        toast.success("data updated");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const url = "/api/sleeping";
        const body = {
          note: note,
          fell_asleep: fellasleepValue,
          woke_up: wokeUpValue,
        };
        // console.log(fellasleepValue);
        await axios.post(url, { body });

        toast.success("data uploaded");
      } catch (err) {
        toast.error("something went wrong");
        console.log(err);
      }
    }
    mutate();
  }, [note, fellasleepValue, wokeUpValue, sleepling, mutate]);

  if (!isOpen) {
    return null;
  }
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
          className="w-2/3"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className=" flex justify-between w-2/3 pt-10">
          <button
            className="border-none bg-transparent text-6xl"
            onClick={handleClose}
          >
            <AiFillCloseCircle className=" text-slate-500" />
          </button>
          <button
            className="border-none bg-transparent text-6xl"
            onClick={handleCheck}
          >
            <AiFillCheckCircle className=" text-slate-500" />
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
}
