// 3. DRIVER reducer

const driverReducer = (state = {id: undefined, name: undefined}, action) => {
  switch (action.type) {
    case 'SET_DRIVER':
      return {
        id: action.id,
        name: action.name
      }
    default: 
      return state
  }
};

export default driverReducer;