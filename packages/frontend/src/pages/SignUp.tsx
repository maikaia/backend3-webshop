import React, { useState } from 'react';
import '../App.css';
import axios from "axios";
// import {Link} from "react-router-dom"

function SignUp() {
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [error, setError] = useState<string>("");

    axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";

    const handleOnSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("")
        await axios
            .post("/user/create", {
                fullName,
                password,
                email,
                phoneNumber,
                address,
            })
            .catch((e: any) => {
                setError(e.response.data)
            })
    };

    return (
        <div className="App">
            <header className="App-header">
                <form>
                    <input
                        placeholder='Full name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
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
                    <input
                        placeholder='Phone number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button onClick={handleOnSubmit}>Create Account!</button>
                </form>
                {error && (
                    <p>{error}</p>
                )}
            </header>
        </div>
    );
}

export default SignUp;
