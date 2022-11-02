import { Route, Routes } from "react-router-dom"

import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    </>
  );
}

export default App;