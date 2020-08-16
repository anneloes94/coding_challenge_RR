import { dayNames } from "../variables"

export function convertToClockTime(time) {
  // converts "0800" to "8:00am"
  let newTime = Number(time);
  let periodString = "am";
  let numberString;

  if (time === "0000") {
    return "0:00am";
  }

  // If the time is between 12:00 - 24:00, periodString becomes "pm"
  if (newTime > 1100 && newTime < 2400) {
    periodString = "pm";
  }

  // If the time is past 12:00PM, 1200 is removed (1300 => 100)
  if (newTime > 1200) {
    newTime -= 1200;
  }

  // Add ":" to time string, with its location depending on length (1200 => 12:00, 100 => 1:00)
  if (newTime.toString().length === 3) {
    numberString =
      newTime.toString().substring(0, 1) +
      ":" +
      newTime.toString().substring(1);
  } else if (newTime.toString().length === 4) {
    numberString =
      newTime.toString().substring(0, 2) +
      ":" +
      newTime.toString().substring(2);
  }

  return numberString + periodString;
}

export function getDayRangeByWeek(week) {
  // 1a. Get current week as a range of days
  //    IN: week  - OUT: firstDay, lastDay
  const firstDay = week * 7 - 6;
  const lastDay = week * 7;

  // 1b. Filter days for this range of days
  //    IN: days, firstDay, lastDay   - OUT: days
  let daysRange = [];
  for (let dayNumber = firstDay; dayNumber < lastDay + 1; dayNumber++) {
    daysRange.push(dayNumber);
  }
  return daysRange;
}

export function convertDayNumberToName(dayNumber) {
  // day 1: sunday (dayNames[0])
  // day 5: thursday (dayNames[4])
  // day 13: friday (dayNames[6])
  const numberInArray = (dayNumber % 7) - 1 
  return dayNames[numberInArray]
}

export default { convertToClockTime, getDayRangeByWeek, convertDayNumberToName };
