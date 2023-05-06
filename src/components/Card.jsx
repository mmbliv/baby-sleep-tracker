import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useCallback, useEffect, useState } from "react";
// import LoginModal from "./Modals/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import useTimer from "@/hooks/useTimer";
import useSleeping from "@/hooks/useSleeping";
import { GiNightSleep } from "react-icons/gi";
import ReactTimeAgo from "react-time-ago";
import dayjs from "dayjs";

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

  useEffect(() => {
    if (!props.data[0].woke_up) {
      setFellAsleep(true);
    } else {
      setFellAsleep(false);
    }
  }, [props.data]);
  console.log(props.data[0].woke_up);
  console.log(props.data[0].fell_asleep);
  return (
    <div
      className="h-56 w-full flex items-center justify-center gap-2 bg-slate-100"
      onClick={handleClick}
    >
      <div>
        <props.icon />
      </div>
      <div>{!props.data && "sleeping"}</div>
      {fellAsleep ? (
        <div>
          <p>
            Right now{" "}
            <span>
              <GiNightSleep />
            </span>
          </p>
          <p>Fell asleep</p>
        </div>
      ) : (
        <div>
          <ReactTimeAgo date={props.data[0].fell_asleep} locale="en-US">
            Right now
          </ReactTimeAgo>
          <p>
            Slept{" "}
            {dayjs(props.data[0].woke_up).diff(
              dayjs(props.data[0].fell_asleep),
              "minute"
            )}{" "}
            min
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
