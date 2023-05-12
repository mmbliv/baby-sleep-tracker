import React, { useState } from "react";
import Nav from "./Nav";
import Lists from "./Lists";
import useCurrentUser from "@/hooks/useCurrentUser";
import Charts from "./Charts";

const Data = (props) => {
  const { data: currentUser } = useCurrentUser();
  const [showChart, setShowChart] = useState(false);
  const [showLists, setShowLists] = useState(true);
  const [showSevenDay, setShowSevenDay] = useState(true);
  const [showThirtyDay, setShowThirtyDay] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);
  const [showMonthly, setShowMonthly] = useState(false);
  const handleChart = () => {
    setShowChart(true);
    setShowLists(false);
  };
  const handleLists = () => {
    setShowLists(true);
    setShowChart(false);
  };
  const handleSevenDay = () => {
    setShowSevenDay(true);
    setShowChart(true);
    setShowMonthly(false);
    setShowThirtyDay(false);
    setShowWeekly(false);
    setShowLists(false);
  };
  const handleWeekly = () => {
    setShowSevenDay(false);
    setShowChart(true);
    setShowMonthly(false);
    setShowThirtyDay(false);
    setShowWeekly(true);
    setShowLists(false);
  };
  const handleThirtyDay = () => {
    setShowSevenDay(false);
    setShowChart(true);
    setShowMonthly(false);
    setShowThirtyDay(true);
    setShowWeekly(false);
    setShowLists(false);
  };
  const handleMonthly = () => {
    setShowSevenDay(false);
    setShowChart(true);
    setShowLists(false);
    setShowMonthly(true);
    setShowThirtyDay(false);
    setShowWeekly(false);
  };
  if (!props.isOpen && currentUser)
    return (
      <div className="w-2/3">
        <Nav
          handleChart={handleChart}
          handleLists={handleLists}
          handleMonthly={handleMonthly}
          handleWeekly={handleWeekly}
          handleSevenDay={handleSevenDay}
          handleThirtyDay={handleThirtyDay}
        />
        <Lists show={showLists} />
        <Charts
          show={showChart}
          showMonthly={showMonthly}
          showSevenDay={showSevenDay}
          showThirtyDay={showThirtyDay}
          showWeekly={showWeekly}
        />
      </div>
    );
};

export default Data;
