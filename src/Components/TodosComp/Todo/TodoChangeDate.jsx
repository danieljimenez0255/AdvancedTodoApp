import { Button } from "@material-ui/core";

const TodoChangeDate = ({
  classesSty,
  changeDate,
  updateTodo,
  newDateStateM,
}) => {
  return (
    <div style={{ borderBottom: "2px solid gray", paddingBottom: "10px" }}>
      <h2 style={{ margin: "15px 0 10px 0" }}>Change the date for the Todo</h2>
      {newDateStateM === 0 ? (
        <p
          style={{ margin: "5px 0" }}
        >{`(Choose Date then click button to the right to confirm)`}</p>
      ) : (
        <p style={{ margin: "5px 0" }}>Now you can confirm your date change!</p>
      )}
      <input
        type="date"
        name="changeTodoDate"
        id="changeTodoDate"
        className={classesSty.changeTodoDateInput}
        onChange={(event) => changeDate(event)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={updateTodo}
        className={classesSty.changeTodoDateButton}
        disabled={newDateStateM === 0}
      >
        Change Date
      </Button>
    </div>
  );
};

export default TodoChangeDate;
