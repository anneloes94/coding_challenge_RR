import { createStore, combineReducers } from 'redux';

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