import { Route, Routes } from "react-router-dom"

import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/Account';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
    </>
  );
}

export default App;