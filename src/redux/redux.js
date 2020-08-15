import { createStore, combineReducers } from 'redux';


// *** ACTIONS ***

  // functions that return the action objects





  //      - days filter action -      

const setDaysfilter = (week) => ({
  type: 'SET_DAYS_FILTER',
  week
})

// *** REDUCERS ***

  // 1. Reducers are pure functions (only depends on input)
  // 2. Never change state or action!







// *** IMPLEMENTATION ***

store.subscribe(() => {
  const state = console.log(store.getState())
  const visibleTasks = getVisibleTasks(state.tasks, state.driver, state.week)
  console.log(visibleTasks)
})

const taskOne = store.dispatch(addTask({ title: "pickup", driver: 3, day: 4, startTime: "0400", endTime: "0600"}))
const taskTwo = store.dispatch(addTask({ title: "dropoff", driver: 2, day: 14, startTime: "0600", endTime: "0700"}))

store.dispatch(deleteTask({id: 1}))
store.dispatch(editTask(taskTwo.task.id, {
  title: "other"
}))