//      - driver action -

const setDriver = ({ id, name } = {}) => ({
  type: "SET_DRIVER",
  driver: {
    id,
    name
  }
});

export default setDriver;
