import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

import '../styles/App.css';


function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("");

  axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";

  const navigate = useNavigate()

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await axios.post("/user/login", {
        password,
        email,
      })
      .then((response: any) => {
        const token = response.data;
        localStorage.setItem("jwt", token);
        navigate("/")
        window.location.reload()
      })
      .catch((e: any) => {
        setError(e.response.data)
      })
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Login!</h1>
        {error}
        <form>
          <input
            type="text"
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