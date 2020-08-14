import { createStore, combineReducers } from 'redux';

// 1. TASKS reducer

const tasksReducerDefaultState = [
  {
    id: 1,
    title: "dropoff",
    driver: 1,
    day: 1,
    start_time: "1000",
    end_time: "1200"

  },
  {
    id: 2,
    title: "other",
    driver: 3,
    day: 5,
    start_time: "1600",
    end_time: "1800"
  },
  {
    id: 3,
    title: "pickup",
    driver: 2,
    day: 13,
    start_time: "1500",
    end_time: "1600"
  }
]

const tasksReducer = (state = tasksReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

// 2. DAYS reducer

const daysReducerDefaultState = [
  {
    id: 1,
    name: "sunday",
    tasks: [1]
  },
  {
    id: 5,
    name: "thursday",
    tasks: [2]
  },
  {
    id: 13,
    name: "friday",
    tasks: [3]
  }
]

const daysReducer = (state = daysReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// 3. WEEK reducer

const weekReducer = (state = 1, action) => {
  switch (action.type) {
    default: 
      return state
  }
}

// 4. DRIVER reducer

const driverReducer = (state = {}, action) => {
  switch (action.type) {
    default: 
      return state
  }
}

// Store creation

  // key: root state name
  // value: the reducer managing that

const store = createStore(
  combineReducers({
    tasks: tasksReducer,
    days: daysReducer,
    week: weekReducer,
    driver: driverReducer
  })
)

// ACTION GENERATORS - functions that return the action objects

const incrementWeek = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT_WEEK',
  incrementBy
})

const decrementWeek = ({ decrementBy = 1} = {}) => ({
  type: 'DECREMENT_WEEK',
  decrementBy
})

const setWeek = ({week}) => ({
  type: 'SET_WEEK',
  week
})

// REDUCERS: 
// 1. Reducers are pure functions (only depends on input)
// 2. Never change state or action!


// Only uses week state and action to give new state output
const weekReducer = (state = {week: 1}, action) => {
  switch (action.type) {
    case 'INCREMENT_WEEK':
      return {
        week: state.week + incrementBy
      };
    case 'DECREMENT_WEEK':
      return {
        week: state.week - decrementBy
      }
    case 'SET_WEEK':
      return {
        week: action.week
      }
    default:
      return state;
  }
};

const store = createStore(countReducer)

// we want:
//  SET_WEEK
//  SET_DRIVER
//  SET_TASKS
//  CHANGE_TASKS
//  DELETE_TASKS
//  SET_DAY
store.dispatch(
  {
    type: 'INCREMENT_WEEK',
    incrementBy: 5
  }
);

console.log(store.getState());