import { Fragment } from "react";
import { Button } from "@material-ui/core";

const TodoUpdateText = ({ classesSty, updateFuncT, updateS, updateFuncM }) => {
  return (
    <Fragment>
      <h2 className={classesSty.updateTodoHeader}>Update Todo</h2>
      <input
        type="text"
        value={updateS}
        className={classesSty.paperInput}
        onChange={(e) => updateFuncT(e)}
      />
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={updateFuncM}
      >
        Modify
      </Button>
    </Fragment>
  );
};

export default TodoUpdateText;
