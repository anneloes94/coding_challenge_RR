//      - week actions -

const incrementWeek = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT_WEEK",
  incrementBy,
});

const decrementWeek = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT_WEEK",
  decrementBy,
});

const setWeek = ({ week }) => ({
  type: "SET_WEEK",
  week,
});

export { incrementWeek, decrementWeek, setWeek };
