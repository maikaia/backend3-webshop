import React from 'react';
import '../App.css';
import {Link} from "react-router-dom"

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <form>
            <input placeholder='Email'></input>
            <input placeholder='Password'></input>
            <button>Login</button>
        </form>
        <Link to="/signup">Sign up here!</Link>
      </header>
    </div>
  );
}

export default Login;
