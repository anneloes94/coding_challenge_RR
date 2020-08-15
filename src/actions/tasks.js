import uuid from "uuid";

//      - tasks actions -

const addTask = ({
  title = "",
  driver = 1,
  day = 1,
  startTime = "1000",
  endTime = "1200",
} = {}) => ({
  type: "ADD_TASK",
  task: {
    id: uuid(),
    title,
    driver,
    day,
    startTime,
    endTime,
  },
});

const deleteTask = ({ id } = {}) => {
  type: "DELETE_TASK", id;
};

const editTask = (id, updates) => {
  type: "EDIT_TASK";
  id, updates;
};

export { addTask, deleteTask, editTask };
