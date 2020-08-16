import { getDayRangeByWeek } from "../helpers/convertors";

// *** Tasks FILTER function ***

const getVisibleTasks = (tasks, driver, week) => {
  const daysRange = getDayRangeByWeek(week);
  return tasks.filter(
    (task) => task.driver === driver.id && daysRange.includes(task.day)
  );
};

export { getVisibleTasks };
