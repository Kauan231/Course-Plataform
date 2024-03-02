import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './index.css'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import Lessons from "./pages/lessons";
import Search from "./pages/search"
import Header from "./components/Header";
import { EnrolledProvider } from "./context/EnrolledContext";
import Course from "./pages/course";

function App() {
  return (
    <BrowserRouter>
      <EnrolledProvider>
        <Routes>
          <Route path="/login" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/" element={<Header/>}>
            <Route index element={<Dashboard/>} exact/>
            <Route path="courses">
              <Route index element={<Courses/>}/>
              <Route path=":courseid" exact element = { <Course/> }/>
              <Route path=":courseid/lessons" element={<Lessons/>}/>
            </Route>
            <Route path="search" element={<Search/>}/>
          </Route>
        </Routes>
      </EnrolledProvider>
    </BrowserRouter>
    
  )
}

export default App