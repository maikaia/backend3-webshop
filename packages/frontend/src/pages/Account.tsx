import { useEffect, useState } from "react"
import axios from "axios";

import '../styles/App.css';
import { UserItem } from "@webshop-app/shared";
import { useNavigate } from 'react-router-dom';


function Account() {
  const [user, setUser] = useState<UserItem>()
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";

  const navigate = useNavigate()

  const token = localStorage.getItem("jwt");

  useEffect(() => {
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

  function checkTextInput() {
    let payload: any = {
      fullName,
      email,
      phoneNumber,
      address,
    };
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !address.trim()) {
      alert("Please fill in all fields!")
      return 
    } 
    return payload
  };

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const payload = checkTextInput();

    await axios
      .put("/user/update", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: any) => {
        const token = res.data;
        localStorage.setItem("jwt", token);
        window.location.reload();
      })
      .catch((e: any) => {
        setError(e.response.data);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello {user?.fullName}</h1>
        <p>Current information we have about you:</p>
        <p>Full name: {user?.fullName}</p>
        <p>Email: {user?.email}</p>
        <p>Phone number: {user?.phoneNumber}</p>
        <p>Address: {user?.address}</p>
        <p>Update your information?</p>
        {error}
        <form>
          <input
            placeholder="Full name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          ></input>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
          <input
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <button onClick={handleOnSubmit}>Update!</button>
        </form>
      </header>
    </div>
  );
}

export default Account;