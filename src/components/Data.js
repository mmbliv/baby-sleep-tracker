import React, { useState } from "react";
import Nav from "./Nav";
import Lists from "./Lists";
import useCurrentUser from "@/hooks/useCurrentUser";
import Charts from "./Charts";

const Data = (props) => {
  const { data: currentUser } = useCurrentUser();
  const [showChart, setShowChart] = useState(false);
  const [showLists, setShowLists] = useState(true);
  const handleChart = () => {
    setShowChart(true);
    setShowLists(false);
  };
  const handleLists = () => {
    setShowLists(true);
    setShowChart(false);
  };
  if (!props.isOpen && currentUser)
    return (
      <div className="w-2/3">
        <Nav handleChart={handleChart} handleLists={handleLists} />
        <Lists show={showLists} />
        <Charts show={showChart} />
      </div>
    );
};

export default Data;
