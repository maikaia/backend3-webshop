import React, { useState } from 'react';
import '../styles/App.css';
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("");

  axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";

  const navigate = useNavigate()

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await axios
      .post("/user/login", {
        password,
        email,
      })
      .then((response: any) => {
        const token = response.data;
        localStorage.setItem("jwt", token);
        navigate("/")
      })
      .catch((e: any) => {
        setError(e.response.data)
      })
  };

  return (
    <div className="App">
      <header className="App-header">
        {error}
        <form>
          <input
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleOnSubmit}>Login!</button>
        </form>
        <Link to="/signup">Sign up here!</Link>
      </header>
    </div>
  );
}

export default Login;