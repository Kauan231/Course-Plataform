
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './index.css'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import Lessons from "./pages/lessons";
import Search from "./pages/search"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>
        <Route path="/" Component={Dashboard} exact/>
        <Route path="/courses" Component={Courses}/>
        <Route path="/courses/:courseid/lessons" Component={Lessons}/>
        <Route path="/search" Component={Search}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
