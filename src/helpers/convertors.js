function convertToClockTime(time) {
  // converts "0800" to "8:00am"
  let newTime = Number(time)
  let periodString = "am";
  let numberString;

  if (time === "0000") {
    return "0:00am"
  }

  // If the time is between 12:00 - 24:00, periodString becomes "pm"
  if (newTime > 1100 && newTime < 2400) {
    periodString = "pm"
  }

  // If the time is past 12:00PM, 1200 is removed (1300 => 100)
  if (newTime > 1200) {
    newTime -= 1200;
  }

  // Add ":" to time string, with its location depending on length (1200 => 12:00, 100 => 1:00)
  if (newTime.toString().length === 3) {
    numberString = newTime.toString().substring(0, 1) + ":" + newTime.toString().substring(1)
  } else if (newTime.toString().length === 4) {
    numberString = newTime.toString().substring(0, 2) + ":" + newTime.toString().substring(2)
  }

  return numberString + periodString;
}

export { convertToClockTime }