import React from "react";
import Nav from "./Nav";
import Lists from "./Lists";
import useCurrentUser from "@/hooks/useCurrentUser";

const Data = (props) => {
  const { data: currentUser } = useCurrentUser();
  if (!props.isOpen && currentUser)
    return (
      <div className="w-2/3">
        <Nav />
        <Lists />
      </div>
    );
};

export default Data;
