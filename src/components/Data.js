import React from "react";
import Nav from "./Nav";
import Lists from "./Lists";

const Data = (props) => {
  if (!props.isOpen)
    return (
      <div className="w-2/3">
        <Nav />
        <Lists />
      </div>
    );
};

export default Data;
