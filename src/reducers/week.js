// 2. WEEK reducer

// Only uses week state and action to give new state output
const weekReducer = (state = 1, action) => {
  switch (action.type) {
    case "INCREMENT_WEEK":
      return state + 1;
    case "DECREMENT_WEEK":
      return state - 1;
    case "SET_WEEK":
      return action.week;
    default:
      return state;
  }
};

export default weekReducer;
