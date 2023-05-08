const changeMinToHour = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursString = hours > 0 ? `${hours} hr${hours > 1 ? "" : ""}` : "";
  const minutesString =
    remainingMinutes > 0
      ? `${remainingMinutes} min${remainingMinutes > 1 ? "" : ""}`
      : "";
  const separator = hoursString && minutesString ? " and " : "";
  return hoursString + separator + minutesString;
};
export default changeMinToHour;
