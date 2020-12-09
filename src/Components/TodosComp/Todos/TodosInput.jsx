import { Button } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { ClockM } from "../../Clock/Clock";

const TodosInput = ({
  docDate,
  todosLayoutStyles,
  changeDateFormat,
  createText,
  inputState,
  addTodos,
  clockState,
  clockStateChange,
}) => {
  return (
    <div className="app__homeTodoInputs">
      <h1>Set the Time, Date, and the Todo Here:</h1>
      <div>
        <ClockM
          timeState={clockState}
          handleTimeStateChange={clockStateChange}
        />

        <input
          type="date"
          name="todosDate"
          id="todosDate"
          value={docDate}
          onChange={changeDateFormat}
          className={todosLayoutStyles.dateTodo}
        />

        <div>
          <input
            type="text"
            name="newTodo"
            id="newTodo"
            placeholder="input new todo here"
            value={inputState}
            onChange={(event) => createText(event)}
            className={todosLayoutStyles.dateTodo}
          />
          <Button
            type="button"
            variant="contained"
            color="secondary"
            id="addTodo"
            disabled={!inputState}
            onClick={addTodos}
            className={todosLayoutStyles.addButton}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodosInput;
