import { Route, Routes } from "react-router-dom"

import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import AccountPage from './pages/Account';
import HomePage from './pages/Home';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
    </>
  );
}

export default App;