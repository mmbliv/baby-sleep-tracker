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
export const generateMonthlyLabel = (today, weekOrMonth) => {
  const options = { month: "short", day: "numeric" };
  const dates = [];

  // Add previous days

  let numPreviousDays;
  if (weekOrMonth === "month") {
    numPreviousDays = 29;
  }
  if (weekOrMonth === "week") {
    numPreviousDays = 7;
  }

  let previousDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - numPreviousDays
  );
  for (let i = 0; i < numPreviousDays; i++) {
    const dateStr = previousDate.toLocaleDateString(undefined, options);
    dates.push(dateStr);
    previousDate.setDate(previousDate.getDate() + 1);
  }

  // Add current day
  const todayStr = today.toLocaleDateString(undefined, options);
  dates.push(todayStr);

  return dates;
};

export const generateSpecificMonthlyLabel = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
    month: "short",
  });
  const daysArray = [];

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(`${monthName} ${i}`);
  }

  return daysArray;
};

export const generateSpecificWeeklyLabel = (dateString) => {
  const startDate = new Date(dateString);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const formattedDate = currentDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });
    weekDates.push(formattedDate);
  }

  return weekDates;
};
