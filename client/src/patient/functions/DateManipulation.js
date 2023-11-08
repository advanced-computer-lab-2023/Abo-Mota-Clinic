function getDayName(dateString) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString);
  return days[date.getDay()];
}

function getMonthName(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long" });
}

export { getDayName, getMonthName };
