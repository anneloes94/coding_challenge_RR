// 3. DRIVER reducer

const driverReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_DRIVER":
      return {
        driver: action.driver,
      };
    default:
      return state;
  }
};

export default driverReducer;
