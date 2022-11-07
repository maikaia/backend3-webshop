import { useEffect, useState } from "react"
import axios from "axios";

import '../styles/App.css';
import { UserItem } from "@webshop-app/shared";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [user, setUser] = useState<UserItem>()
  axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios.get("/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logOut = async (e: { preventDefault: () => void }) => {
    localStorage.clear()
    navigate("/")
  };

  return (
    <div className="App">
      <button onClick={(logOut)}>Log out</button>
      <header className="App-header">
        <h1>Hello {user?.fullName}</h1>
        <p>Current information we have about you:</p>
        <p>Full name: {user?.fullName}</p>
        <p>Email: {user?.email}</p>
        <p>Phone number: {user?.phoneNumber}</p>
        <p>Address: {user?.address}</p>
      </header>
    </div>
  );
}

export default Login;