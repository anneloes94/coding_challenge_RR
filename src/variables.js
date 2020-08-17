const drivers = [
  {
    id: 1,
    name: "Michael Schumacher"
  },
  {
    id: 2,
    name: "Lewis Hamilton"
  },
  {
    id: 3,
    name: "Max Verstappen"
  }
]

const dayPeriods = [2, 4, 7, 14, 28]

const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

const tasks = ["pickup", "dropoff", "other"]

// Returns time array: [0000, ..., 2300]
let times = [];
[...Array(25)].map((e,i) => {
  let time;
  if (i < 10) {
    time = "0" + i;
  } else {
    time = i;
  }
  time += "00"
  times.push(time);
})


export {drivers, dayPeriods, dayNames, tasks, times};