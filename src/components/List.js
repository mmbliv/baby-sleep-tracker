import React, { useEffect } from "react";
import { useState } from "react";

const List = (props) => {
  // console.log(props);
  const [dateArr, setDateArr] = useState();
  useEffect(() => {
    function makeDateIntoArr(dateString) {
      const dateArray = dateString.split(",").map((str) => str.trim());
      const monthAndDay = dateArray[1].split(" ");
      dateArray.splice(1, 1, ...monthAndDay);
      return dateArray;
    }
    setDateArr(makeDateIntoArr(props.data[0]));
  }, [props.data]);
  console.log(dateArr);
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center justify-center">
        <p>{dateArr[0]}</p>
        <p>{dateArr[2]}</p>
        <p>{dateArr[1]}</p>
      </div>
      <div>|</div>
    </div>
  );
};

export default List;
