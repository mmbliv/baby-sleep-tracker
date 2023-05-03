import React from "react";
import Card from "./Card";
import { FaBabyCarriage } from "react-icons/fa";
const Cards = () => {
  return (
    <div className={`w-1/3`}>
      <Card icon={FaBabyCarriage} />
      {/* <Card icon={FaBabyCarriage} /> */}
    </div>
  );
};

export default Cards;
