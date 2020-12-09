import React, { useState, useEffect } from "react";
import { db, authM } from "../../../firebase";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import TodoModal from "./TodoModal";
import TodoText from "./TodoText";

const Todo = ({ todo, deleteTodo, updateTodo, allTodos }) => {
  const [update, setUpdate] = useState("");
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [time, setTime] = useState(todo.timeM);

  useEffect(() => {
    // console.log(allTodos);
    let sTodo = allTodos.find((obj) => obj.id === updateTodo[0]);
    setUpdate(`${sTodo.todo}`);
  }, [allTodos, updateTodo]);

  const updateTodoModal = () => {
    setOpen(true);
  };

  const updateTodoText = () => {
    db.collection("allTodos")
      .doc(authM.currentUser.uid)
      .collection(updateTodo[1])
      .doc(updateTodo[0])
      .set(
        {
          todo: update,
        },
        { merge: true }
      );
  };

  const updateTodoDate = () => {
    // first set todo in new Date area
    const todoID = uuidv4();
    db.collection("allTodos")
      .doc(authM.currentUser.uid)
      .collection(newDate)
      .doc(todoID)
      .set({
        todo: update,
        id: todoID,
        time: time,
      });

    // then delete original todo
    db.collection("allTodos")
      .doc(authM.currentUser.uid)
      .collection(updateTodo[1])
      .doc(updateTodo[0])
      .delete();

    // reset newDate state
    setNewDate("");
  };

  const updateTodoTime = () => {
    db.collection("allTodos")
      .doc(authM.currentUser.uid)
      .collection(updateTodo[1])
      .doc(updateTodo[0])
      .set(
        {
          time: time,
        },
        { merge: true }
      );
  };

  return (
    <div className="todo__container">
      {/* Renders main todo onto Page and allows for access to individual modal for each todo */}
      <TodoText
        todo={todo}
        deleteTodoFunc={deleteTodo}
        updateTodoModalM={updateTodoModal}
      />

      {/* For updating a todo */}
      <TodoModal
        openState={open}
        onCloseFunc={() => {
          setOpen(false);
          setNewDate("");
        }}
        changeDateFunc={(e) =>
          setNewDate(moment(e.target.value).format("MM-DD-YYYY"))
        }
        updateTodoFunc={updateTodoDate}
        newDateState={newDate.length}
        updateState={update}
        updateFuncText={(event) => setUpdate(event.target.value)}
        updateFunc={updateTodoText}
        closeStateFunc={() => setOpen(false)}
        clockState={time}
        clockCloseFunc={setTime}
        confirmClockTime={updateTodoTime}
      />
    </div>
  );
};

export default Todo;
