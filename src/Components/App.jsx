import { useState, useEffect } from "react";
import "../CSS/App.css";
import { Login } from "./Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TodosLayout } from "./TodosComp/Todos/TodosLayout";
import { authM } from "../firebase";
import LoginError from "./Login/LoginError";

function App() {
  const [logError, setLogError] = useState("");

  useEffect(() => {
    let sub = true;
    if (sub) {
      authM.onAuthStateChanged((user) => {
        if (user) {
          setLogError(true);
        } else {
          setLogError(false);
        }
      });
    }

    return () => {
      sub = false;
    };
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/home">
          {logError ? <TodosLayout /> : <LoginError />}
        </Route>
        <Route path="/">
          <div className="app">
            <Login />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
