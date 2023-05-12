export const generateWeekLabel = (today) => {
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const index = week.indexOf(today);
  const result = [];
  for (let i = index + 1; i < week.length; i++) {
    result.push(week[i]);
  }
  for (let i = 0; i <= index; i++) {
    result.push(week[i]);
  }
  return result;
};

// generateWeekLabel("Sun");
// export default generateWeekLabel;
export const generateMonthlyLabel = (today) => {
  const dates = [];

  // Add previous days
  const numPreviousDays = 29;
  let previousDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - numPreviousDays
  );
  for (let i = 0; i < numPreviousDays; i++) {
    dates.push(previousDate.getDate());
    previousDate.setDate(previousDate.getDate() + 1);
  }

  // Add current day
  dates.push(today.getDate());

  return dates;
};
