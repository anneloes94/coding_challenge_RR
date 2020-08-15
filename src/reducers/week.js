// 2. WEEK reducer

// Only uses week state and action to give new state output
const weekReducer = (state = 1, action) => {
  switch (action.type) {
    case "INCREMENT_WEEK":
      return {
        week: state.week + incrementBy,
      };
    case "DECREMENT_WEEK":
      return {
        week: state.week - decrementBy,
      };
    case "SET_WEEK":
      return {
        week: action.week,
      };
    default:
      return state;
  }
};

export default weekReducer;
