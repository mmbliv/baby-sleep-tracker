const generateWeekLabel = (today) => {
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
