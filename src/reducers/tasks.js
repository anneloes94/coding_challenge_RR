// 1. TASKS reducer

const tasksReducerDefaultState = [
  {
    id: 1,
    title: "dropoff",
    driver: 1,
    day: 1,
    startTime: "1000",
    endTime: "1200",
  },
  {
    id: 2,
    title: "other",
    driver: 3,
    day: 5,
    startTime: "1600",
    endTime: "1800",
  },
  {
    id: 3,
    title: "pickup",
    driver: 2,
    day: 13,
    startTime: "1500",
    endTime: "1600",
  },
];

const tasksReducer = (state = tasksReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.task];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.id);
    case "EDIT_TASK":
      return state.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            ...action.updates,
          };
        } else return task;
      });
    default:
      return state;
  }
};

export default tasksReducer;
