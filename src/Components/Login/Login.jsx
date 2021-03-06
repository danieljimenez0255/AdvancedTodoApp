import React, { useState } from "react";
import { authM } from "../../firebase";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export const Login = () => {
  // will contain the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   used to redirect to main page if account creation or sign in successful
  const history = useHistory();

  const createSignIn = () => {
    authM
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          history.push("/home");
        }
      })
      .catch((err) => console.log("y"));
  };

  const loginTodo = (e) => {
    e.preventDefault();
    authM
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          history.push("/home");
        }
      })
      .catch((err) =>
        console.log("There was an error signing in", err.message)
      );
  };

  return (
    //   jsx that creates the Login UI
    <div className="login">
      <h1>Login Page</h1>
      <h3>Set Your Todos with Ease.</h3>
      <form id="loginForm">
        <input
          id="emailID"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="passwordID"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      <Button
        variant="contained"
        type="submit"
        form="loginForm"
        id="submitLoginForm"
        color="primary"
        className="login__button"
        onClick={(event) => loginTodo(event)}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        type="button"
        id="signInLoginForm"
        className="login__button"
        onClick={createSignIn}
      >
        Create Account
      </Button>
    </div>
  );
};
