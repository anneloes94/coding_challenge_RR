import getDayRangeFromWeek from "../helpers/convertors";

// *** Tasks FILTER function ***

const getVisibleTasks = (tasks, driver, week) => {
  const daysRange = getDayRangeFromWeek(week);
  return tasks.filter(task => task.driver.id === driver.id && daysRange.includes(task.day))
};

export default getVisibleTasks;
