import { useEffect, useState } from "react"
import axios from "axios";

import '../styles/App.css';
import { UserItem } from "@webshop-app/shared";
import { useNavigate } from 'react-router-dom';


function Account() {
  const [user, setUser] = useState<UserItem>()
  axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios.get("/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/login")
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
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

export default Account;