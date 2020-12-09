import React from "react";
import { Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TodoChangeDate from "./TodoChangeDate";
import TodoUpdateText from "./TodoUpdateText";
import { ClockM } from "../../Clock/Clock";

// props for open state
const TodoModal = ({
  openState,
  onCloseFunc,
  changeDateFunc,
  updateTodoFunc,
  newDateState,
  updateState,
  updateFunc,
  updateFuncText,
  closeStateFunc,
  clockState,
  clockCloseFunc,
  confirmClockTime,
}) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "relative",
      margin: "250px auto",
      width: 400,
      height: 350,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    paperInput: {
      height: "4vh",
      borderRadius: "12px",
      marginRight: "10px",
      outline: "none",
      transition: "all .5s",
      "&:hover": {
        border: "2px solid red",
      },
      "&:focus": {
        border: "2px solid red",
      },
    },
    paperClose: {
      position: "absolute",
      right: 10,
      bottom: 20,
    },
    paperChangeDate: {
      position: "relative",
      bottom: "20px",
    },
    updateTodoHeader: {
      marginTop: "0",
    },
    changeTodoDateInput: {
      height: "30px",
      borderRadius: "10px",
      outline: "none",
      transition: "all .5s",
      "&:hover": {
        border: "2px solid red",
      },
      "&:focus": {
        border: "2px solid red",
      },
    },
    changeTodoDateButton: {
      marginLeft: "10px",
    },
  }));

  const classes = useStyles();

  return (
    <Modal open={openState} onClose={onCloseFunc}>
      <div className={classes.paper}>
        <div>
          <ClockM
            modalTitle
            timeState={clockState}
            handleTimeStateChange={clockCloseFunc}
            confirmTime={confirmClockTime}
          />

          <div className={classes.paperChangeDate}>
            <TodoChangeDate
              classesSty={classes}
              changeDate={changeDateFunc}
              updateTodo={updateTodoFunc}
              newDateStateM={newDateState}
            />
          </div>

          <TodoUpdateText
            classesSty={classes}
            updateFuncT={updateFuncText}
            updateS={updateState}
            updateFuncM={updateFunc}
          />
        </div>
        <div className={classes.paperClose}>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={closeStateFunc}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoModal;
