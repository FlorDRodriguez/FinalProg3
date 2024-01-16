import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import TasksPage from "./pages/TasksPage.jsx"
import TaskFormPage from "./pages/TaskFormPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import Profile from "./pages/Profile.jsx"
import { ProtectedRoute } from "./ProtectedRoute.jsx"


function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/> 
          <Route path="/register" element={<RegisterPage/>}/>
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage/>}/>
            <Route path="/add-tasks" element={<TaskFormPage/>}/>
            <Route path="/tasks/:id" element={<TaskFormPage/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;