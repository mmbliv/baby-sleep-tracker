import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useCallback } from "react";
// import LoginModal from "./Modals/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";

const Card = (props) => {
  const { data: currentUser } = useCurrentUser();
  const loginModel = useLoginModal();
  const handleClick = useCallback(() => {
    if (!currentUser) {
      loginModel.onOpen();
    }
  }, [currentUser, loginModel]);
  return (
    <div
      className="h-56 w-full flex items-center justify-center gap-2 bg-slate-100"
      onClick={handleClick}
    >
      <div>
        <props.icon />
      </div>
      <div>{props.template ? props.template : "sleeping"}</div>
    </div>
  );
};

export default Card;
