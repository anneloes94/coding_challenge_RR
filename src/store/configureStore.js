import { createStore, combineReducers } from 'redux';
import tasksReducer from "../reducers/tasks";
import weekReducer from "../reducers/week"
import driverReducer from "../reducers/driver"

// *** STORE CREATION

  // key: root state name
  // value: the reducer managing that

export default () => {
  const store = createStore(
    combineReducers({
      tasks: tasksReducer,
      week: weekReducer,
      driver: driverReducer,
    })
  );
  return store;
};

