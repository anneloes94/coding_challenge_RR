import { getDayRangeByWeek } from "../helpers/convertors";

// *** Tasks FILTER function ***

const getVisibleTasks = (tasks, driver, week) => {
  console.log(driver.id)
  const daysRange = getDayRangeByWeek(week);
  return tasks.filter(task => task.driver.id === driver.id && daysRange.includes(task.day))
};

export default getVisibleTasks;
