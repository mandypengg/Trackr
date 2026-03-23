import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./LandingPage"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App