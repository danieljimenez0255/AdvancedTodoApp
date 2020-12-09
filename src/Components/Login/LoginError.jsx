import { Link } from "react-router-dom";

const LoginError = () => {
  return (
    <div className="loginError">
      <h1>Must have been error logging in, go back to login page here: </h1>
      <Link to="/">Click me to go to login page</Link>
    </div>
  );
};

export default LoginError;
