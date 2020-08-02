function filterDaysByWeek(week, days) {
  // 1a. Get current week as a range of days
  //    IN: week  - OUT: firstDay, lastDay
  const firstDay = week * 7 - 6
  const lastDay = week * 7

  // 1b. Filter days for this range of days
  //    IN: days, firstDay, lastDay   - OUT: days
  const filteredDays = days.filter(day => day.id >= firstDay && day.id <= lastDay)
  console.log("DA^S", filteredDays)
  return filteredDays
}

function filterTasksByDriver(driver, tasks) {
  // 2. Filter tasks for driver
  //    IN: tasks, driver_id  - OUT: tasks
  const filteredTasks = tasks.filter(task => task.driver === driver.id)
  return filteredTasks
}

export {filterDaysByWeek, filterTasksByDriver}