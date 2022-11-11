import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import '../styles/App.css';

function SignUp() {
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [error, setError] = useState<string>("");

    axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:4000";

    const navigate = useNavigate()

    const handleOnSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("")
        await axios.post("/user/create", {
                fullName,
                password,
                email,
                phoneNumber,
                address,
            })
            .then(() => {
                navigate("/login")
              })
            .catch((e: any) => {
                setError(e.response.data)
            })
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sign Up!</h1>
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
