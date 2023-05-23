import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useCallback, useEffect, useState } from "react";
// import LoginModal from "./Modals/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import useTimer from "@/hooks/useTimer";
import { GiNightSleep } from "react-icons/gi";
import dayjs from "dayjs";
import changeMinIntoHour from "../../libs/changeMinIntoHour";
import { formatDistanceToNow, format } from "date-fns";

const Card = (props) => {
  const { data: currentUser } = useCurrentUser();
  const [fellAsleep, setFellAsleep] = useState();

  const loginModal = useLoginModal();
  const timerModal = useTimer();
  const handleClick = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }
    if (timerModal.isOpen) {
      timerModal.onClose();
    } else {
      timerModal.onOpen();
    }
    // mutate();
  }, [currentUser, loginModal, timerModal]);

  // console.log(props.data, "))))))");
  useEffect(() => {
    let latsIndex;
    if (props.data) {
      latsIndex = props.data.length - 1;
    }
    if (props.data && props.data[latsIndex] && !props.data[latsIndex].woke_up) {
      setFellAsleep(true);
    } else {
      setFellAsleep(false);
    }
  }, [props.data]);
  // console.log(currentUser);

  // console.log(props.data[0].fell_asleep);
  function helper() {
    const wokeUpTimestamp =
      props.data && props.data[props.data.length - 1]
        ? props.data[props.data.length - 1].woke_up
        : 0;
    const wokeUpDate = new Date(wokeUpTimestamp);
    const currentTime = new Date();

    const diffInMinutes = Math.round((currentTime - wokeUpDate) / (1000 * 60));
    let hours = Math.floor(diffInMinutes / 60);
    let minutes = diffInMinutes % 60;
    let h = "h";
    let m = "min";
    if (hours === 0) {
      hours = "";
      h = "";
    }
    if (minutes === 0) {
      m = "";
      minutes = "";
    }

    // const timeAgo = format(
    //   wokeUpDate,
    //   `${hours} "${h}" ${minutes} "${m}" ago`,
    //   {
    //     useAdditionalWeekYearTokens: false,
    //   }
    // );

    if (fellAsleep && currentUser) {
      return (
        <div>
          <p>
            Right now{" "}
            <span>
              <GiNightSleep />
            </span>
          </p>
          <p>Fell asleep</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            {" "}
            {hours} {h} {minutes} {m} ago
          </p>
          {/* <ReactTimeAgo
            date={
              props.data && props.data[props.data.length - 1]
                ? new Date(props.data[props.data.length - 1].woke_up)
                : 0
            }
            minPeriod={60}
          ></ReactTimeAgo> */}
          <p>
            Slept{" "}
            {props.data &&
              props.data[props.data.length - 1] &&
              changeMinIntoHour(
                dayjs(props.data[props.data.length - 1].woke_up).diff(
                  dayjs(props.data[props.data.length - 1].fell_asleep),
                  "minute"
                )
              )}
          </p>
        </div>
      );
    }
  }

  // console.log(props.data);
  return (
    <div
      className="h-56 w-full flex items-center justify-center gap-4 bg-slate-100"
      onClick={handleClick}
    >
      <div>
        <props.icon />
      </div>
      {!props.data?.length ? <div>sleeping</div> : helper()}
    </div>
  );
};

export default Card;
