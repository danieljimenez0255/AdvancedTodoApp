import React from "react";
import {
  CheckOutlined as CheckOutlinedIcon,
  UpdateOutlined,
  Adjust,
} from "@material-ui/icons";
import { Button } from "@material-ui/core";

const TodoText = ({ todo, deleteTodoFunc, updateTodoModalM }) => {
  return (
    <div className="todo">
      <div>
        <h2>
          <Adjust
            style={{
              color: "red",
              marginRight: "10px",
              position: "relative",
              top: "2px",
            }}
          />
          {todo.todo}
          {`(${
            parseInt(todo.timeM.split(":")[0]) > 12
              ? parseInt(todo.timeM.split(":")[0]) -
                12 +
                ":" +
                todo.timeM.split(":")[1] +
                " PM"
              : parseInt(todo.timeM.split(":")[0]) === 0
              ? parseInt(todo.timeM.split(":")[0]) +
                12 +
                ":" +
                todo.timeM.split(":")[1] +
                " AM"
              : parseInt(todo.timeM.split(":")[0]) > 0 &&
                parseInt(todo.timeM.split(":")[0]) < 12
              ? parseInt(todo.timeM.split(":")[0]) +
                ":" +
                todo.timeM.split(":")[1] +
                " AM"
              : parseInt(todo.timeM.split(":")[0]) +
                ":" +
                todo.timeM.split(":")[1] +
                " PM"
          })`}
        </h2>
      </div>
      <div>
        <Button variant="contained" color="secondary" onClick={deleteTodoFunc}>
          <CheckOutlinedIcon />
        </Button>
        <Button variant="contained" color="primary" onClick={updateTodoModalM}>
          <UpdateOutlined />
        </Button>
      </div>
    </div>
  );
};

export default TodoText;
