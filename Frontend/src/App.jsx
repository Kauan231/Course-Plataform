
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
import Courses from "./pages/courses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>
        <Route path="/courses" Component={Courses}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
