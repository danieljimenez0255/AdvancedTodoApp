import React, {
  useState,
  useReducer,
  useEffect,
  memo,
  useCallback,
} from "react";
import { authM, db } from "../../../firebase";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import TodosInput from "./TodosInput";
import TodosRender from "./TodosRender";

export const TodosLayout = memo(() => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_TODOS":
        return { todosArr: [...action.todos] };
      default:
        throw new Error();
    }
  };

  const dateReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_DATES":
        return { ...state, updatedDates: [...action.newDates] };
      default:
        throw new Error();
    }
  };

  const [input, setInput] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);
  const [dates, dateDispatch] = useReducer(dateReducer, {
    updatedDates: [
      moment().format("L"),
      moment().format("MM-DD-YYYY"),
      moment().format("YYYY-MM-DD"),
      moment().format("YYYY/MM/DD"),
    ],
  });

  const [clockTime, setClockTime] = useState("00:00");

  let history = useHistory();

  const todosLayoutMakeStyles = makeStyles({
    addButton: {
      marginLeft: "10px !important",
    },
    dateTodo: {
      marginLeft: "20px",
      transition: "all .5s",
      outline: "none",
      borderRadius: "10px",
      "&:focus": {
        border: "2px solid red",
      },
      "&:hover": {
        border: "2px solid red",
      },
    },
  });

  const todosLayoutStylesM = todosLayoutMakeStyles();

  useEffect(() => {
    let sub = true;
    if (sub) {
      authM.onAuthStateChanged((user) => {
        if (user) {
          db.collection("allTodos")
            .doc(user.uid)
            .collection(dates.updatedDates[1])
            .onSnapshot((snap) => {
              let todos = [];
              snap.docs.forEach((doc) => {
                todos.push({
                  todo: doc.data().todo,
                  id: doc.data().id,
                  timeM: doc.data().time,
                });
              });
              let sortedTodos = [...todos];
              sortedTodos.sort((a, b) => {
                if (
                  parseInt(a.timeM.split(":")[0]) -
                    parseInt(b.timeM.split(":")[0]) ===
                  0
                ) {
                  return (
                    parseInt(a.timeM.split(":")[1]) -
                    parseInt(b.timeM.split(":")[1])
                  );
                } else {
                  return (
                    parseInt(a.timeM.split(":")[0]) -
                    parseInt(b.timeM.split(":")[0])
                  );
                }
              });
              dispatch({ type: "FETCH_TODOS", todos: sortedTodos });
            });
        }
      });
    }
    return (_) => {
      sub = false;
    };
  }, [dates.updatedDates]);

  const changeDateFormats = (date) => {
    // set date state to correct date
    const allNewDates = [
      moment(date).format("L"),
      moment(date).format("MM-DD-YYYY"),
      date,
    ];
    dateDispatch({ type: "FETCH_DATES", newDates: allNewDates });
  };

  const createInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const addTodo = () => {
    const todoID = uuidv4();

    db.collection("allTodos")
      .doc(authM.currentUser.uid)
      .collection(dates.updatedDates[1])
      .doc(todoID)
      .set({
        todo: input,
        id: todoID,
        time: clockTime,
      });
    setInput("");
  };

  const deleteTodo = useCallback(
    (id) => {
      db.collection("allTodos")
        .doc(authM.currentUser.uid)
        .collection(dates.updatedDates[1])
        .doc(id)
        .delete();
    },
    [dates.updatedDates]
  );

  const signOut = () => {
    history.push("/");
    authM.signOut();
  };

  return (
    <div className="app__home">
      <Button
        variant="contained"
        color="secondary"
        style={{
          width: "10vw",
          alignSelf: "flex-end",
          marginRight: "20px",
        }}
        onClick={signOut}
      >
        Sign Out
      </Button>
      <TodosInput
        docDate={dates.updatedDates[2]}
        todosLayoutStyles={todosLayoutStylesM}
        changeDateFormat={(event) => {
          changeDateFormats(event.target.value);
        }}
        createText={(event) => createInput(event)}
        inputState={input}
        addTodos={addTodo}
        clockState={clockTime}
        clockStateChange={setClockTime}
      />
      <TodosRender
        todayDate={dates.updatedDates[0]}
        todos={todos.todosArr}
        updateDate={dates.updatedDates[1]}
        deleteFunc={deleteTodo}
      />
    </div>
  );
});
