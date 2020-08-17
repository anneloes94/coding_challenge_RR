//      - driver action -

const setDriver = ({id, name} = {}) => ({
  type: "SET_DRIVER",
  id,
  name
});

export default setDriver;
