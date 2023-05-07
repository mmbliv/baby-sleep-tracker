import React from "react";
import Card from "./Card";
import { FaBabyCarriage } from "react-icons/fa";
import useSleeping from "@/hooks/useSleeping";
import useCurrentUser from "@/hooks/useCurrentUser";

const Cards = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: sleeping } = useSleeping(currentUser && currentUser.id);
  // console.log(sleeping);
  return (
    <div className="w-1/3">
      <Card icon={FaBabyCarriage} data={sleeping && sleeping} />
    </div>
  );
};

export default Cards;
