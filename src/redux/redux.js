import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

// *** ACTIONS ***

  // functions that return the action objects

  //      - tasks actions -     

const addTask = (
  {
    title = "",
    driver = 1,
    day = 1,
    startTime = "1000",
    endTime = "1200" 
  } = {}
) => ({
  type: 'ADD_TASK',
  task: {
    id: uuid(),
    title,
    driver,
    day,
    startTime,
    endTime
  }
});

const deleteTask = ({id} = {}) => {
  type: 'DELETE_TASK',
  id
}

const editTask = (id, updates) => {
  type: 'EDIT_TASK'
  id,
  updates
}

  //      - week actions -      

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

  //      - driver action -      

const setDriver = ({driver}) => ({
  type: 'SET_DRIVER',
  driver
})


// *** REDUCERS ***

  // 1. Reducers are pure functions (only depends on input)
  // 2. Never change state or action!

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
    case 'ADD_TASK':
      return [
        ...state, 
        action.task
      ]
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.id)
    case 'EDIT_TASK':
      return state.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            ...action.updates
          }
        } else return task;
      })
    default:
      return state;
  }
}


// 2. WEEK reducer

// Only uses week state and action to give new state output
const weekReducer = (state = 1, action) => {
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

// 3. DRIVER reducer

const driverReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DRIVER':
      return {
        driver: action.driver;
      }
    default: 
      return state
  }
}

// *** STORE CREATION

  // key: root state name
  // value: the reducer managing that

const store = createStore(
  combineReducers({
    tasks: tasksReducer,
    week: weekReducer,
    driver: driverReducer
  })
)

// *** IMPLEMENTATION ***

store.subscribe(() => {
  console.log(store.getState())
})

const taskOne = store.dispatch(addTask({ title: "pickup", driver: 3, day: 4, startTime: "0400", endTime: "0600"}))
const taskTwo = store.dispatch(addTask({ title: "dropoff", driver: 2, day: 14, startTime: "0600", endTime: "0700"}))

store.dispatch(deleteTask({id: 1}))
store.dispatch(editTask(taskTwo.task.id, {
  title: "other"
}))