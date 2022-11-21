import { Route, Routes } from "react-router-dom"

import HomePage from './pages/Home';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';
import DetailPage from './pages/Detail';
import SignUpPage from './pages/SignUp';
import AccountPage from './pages/Account';

import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<DetailPage />} />
        <Route path="/cart/active" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;