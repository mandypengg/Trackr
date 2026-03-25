import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./AuthContext"
import LandingPage from "./LandingPage"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"
import Dashboard from "./Dashboard"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App