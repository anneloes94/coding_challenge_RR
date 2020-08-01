// in APP, we have access to:
  // "drivers"
  // "driver" (current driver)
  // "week" (selected)
  // "days" (with tasks per day)
  // "tasks" (task details, including driver)


// STEPS

// 1a. Get current week as a range of days
//    IN: week  - OUT: firstDay, lastDay

// 1b. Filter days for currentWeekDays
//    IN: days, firstDay, lastDay   - OUT: days

// 2a. Get current driver id (driver -> id --> filter for tasks )
//    IN: driver, drivers   - OUT: driver_id

// 2b. Filter tasks for driver
//    IN: tasks, driver_id  - OUT: tasks


// 3. pass days and tasks to child component
