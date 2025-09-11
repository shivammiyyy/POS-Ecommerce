
import { Route, Routes } from 'react-router-dom'
import { Button } from './components/ui/button'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import DashboardPage from './pages/dashboard/DashboardPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
    </>
  )
}

export default App
