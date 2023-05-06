import React from "react";
import List from "./List";
import useSleeping from "@/hooks/useSleeping";
import useCurrentUser from "@/hooks/useCurrentUser";

const Lists = () => {
  const { data: currentUser } = useCurrentUser();

  const { data: sleepling, mutate } = useSleeping(
    currentUser && currentUser.id
  );

  return <div>Lists</div>;
};

export default Lists;
