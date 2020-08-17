//      - week actions -

const incrementWeek = () => ({
  type: "INCREMENT_WEEK",
});

const decrementWeek = () => ({
  type: "DECREMENT_WEEK",
});

const setWeek = (week) => ({
  type: "SET_WEEK",
  week,
});

export { incrementWeek, decrementWeek, setWeek };
