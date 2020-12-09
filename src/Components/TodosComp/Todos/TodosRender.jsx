import Todo from "../Todo/Todo";

const TodosRender = ({ todayDate, todos, updateDate, deleteFunc }) => {
  return (
    <div className="app__homeTodos">
      <h1>Here are your Todos for {todayDate}:</h1>
      {todos?.length > 0 ? (
        <div className="app__homeTodos">
          {todos.map((todo, i) => {
            return (
              <Todo
                todo={todo}
                key={i * Math.random() * 100}
                deleteTodo={() => deleteFunc(todo.id)}
                updateTodo={[todo.id, updateDate]}
                allTodos={todos}
              />
            );
          })}{" "}
        </div>
      ) : (
        <h3>
          Once you add todos, they will appear here and will always be here
          until you delete them .
        </h3>
      )}
    </div>
  );
};

export default TodosRender;
