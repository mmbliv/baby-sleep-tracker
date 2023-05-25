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
    let latsIndex;
    if (sleepling) {
      latsIndex = sleepling.length - 1;
    }
    if (sleepling && sleepling[latsIndex] && !sleepling[latsIndex].woke_up) {
      const localTime = new Date(sleepling[latsIndex].fell_asleep);
      setFellAsleepValue(dayjs(localTime));
      setNote(sleepling[latsIndex].note);
    } else {
      setFellAsleepValue(dayjs());
      setWokeUpValue();
      setNote("");
    }
  }, [sleepling]);

  const handleCheck = useCallback(async () => {
    if (
      sleepling &&
      sleepling[0] &&
      !sleepling[0].woke_up &&
      wokeUpValue &&
      dayjs(fellasleepValue).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") ===
        dayjs(new Date(sleepling[0].fell_asleep)).format(
          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
        )
    ) {
      if (
        dayjs(wokeUpValue).date() !== dayjs(sleepling[0].fell_asleep).date()
      ) {
        try {
          const year = dayjs(sleepling[0].fell_asleep).year();
          const month = dayjs(sleepling[0].fell_asleep).month() + 1;
          const day = dayjs(sleepling[0].fell_asleep).date();
          const hour = dayjs(wokeUpValue).hour();
          const min = dayjs(wokeUpValue).minute();
          const url = "/api/sleeping";
          const bodyA = {
            note: note,
            id: sleepling[0].id,
            woke_up: dayjs(`${year}-${month}-${day} 23:59:59`),
          };
          const bodyB = {
            fell_asleep: dayjs(`${year}-${month}-${day} 24:00:00`),
            woke_up: dayjs(`${year}-${month}-${day + 1} ${hour}:${min}:00`),
          };
          await axios.post(url, { body: bodyB });
          await axios.patch(url, { body: bodyA });
          toast.success("data overnight");
        } catch (err) {
          console.log(err);
        }
      } else {
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
      }
    } else {
      if (dayjs(wokeUpValue).date() !== dayjs(fellasleepValue).date()) {
        try {
          const year = dayjs(fellasleepValue).year();
          const month = dayjs(fellasleepValue).month() + 1;
          const day = dayjs(fellasleepValue).date();
          const hour = dayjs(wokeUpValue).hour();
          const min = dayjs(wokeUpValue).minute();
          const url = "/api/sleeping";
          const bodyA = {
            note: note,
            fell_asleep: fellasleepValue,
            woke_up: dayjs(`${year}-${month}-${day} 23:59:59`),
          };
          const bodyB = {
            note: note,
            fell_asleep: dayjs(`${year}-${month}-${day} 24:00:00`),
            woke_up: dayjs(`${year}-${month}-${day + 1} ${hour}:${min}:00`),
          };
          console.log(bodyA);
          await axios.post(url, { body: bodyB });
          await axios.post(url, { body: bodyA });
          toast.success("data overnight");
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
          await axios.post(url, { body });

          toast.success("data uploaded");
        } catch (err) {
          toast.error("something went wrong");
          console.log(err);
        }
      }
    }

    mutate();
  }, [note, fellasleepValue, wokeUpValue, sleepling, mutate]);

  if (!isOpen) {
    return null;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col w-2/3 items-center gap-2 h-[calc(100vh_-_157px)] pt-10">
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
