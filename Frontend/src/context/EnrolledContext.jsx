import { createContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import  Axios from 'axios';

export const EnrolledContext = createContext();
EnrolledContext.displayName = "Enrolled";

export const EnrolledProvider = ({ children }) => {
  const [isLogged, SetLogged] = useState(false);
  const [ enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogged) {
      var matchid = document.cookie.match(new RegExp('(^| )' + "userid" + '=([^;]+)'));
      var matchtoken = document.cookie.match(new RegExp('(^| )' + "token" + '=([^;]+)'));
      if(!matchid || !matchtoken) return navigate("/login");
      const userId = matchid[2]; 
      const userToken = matchtoken[2];
      Axios.get(`${import.meta.env.VITE_API_ADDRESS}/user/${userId}/courses`, {
            headers: {
                'authorization' : userToken
            }
      }).then((res) => {
          SetLogged(true);
          setEnrolledCourses(Object.values(res.data.data));
      }).catch((err) => {
          console.log(err);
          if(!isLogged) {
            document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            document.cookie = `userid=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            SetLogged(false);
            navigate("/login");
          }
      })
    }
  }, [])

  useEffect(() => {
    if(!isLogged) {
      var matchid = document.cookie.match(new RegExp('(^| )' + "userid" + '=([^;]+)'));
      var matchtoken = document.cookie.match(new RegExp('(^| )' + "token" + '=([^;]+)'));
      if(!matchid || !matchtoken) return navigate("/login");
      const userId = matchid[2]; 
      const userToken = matchtoken[2];
      Axios.get(`${import.meta.env.VITE_API_ADDRESS}/user/${userId}/courses`, {
            headers: {
                'authorization' : userToken
            }
      }).then((res) => {
          SetLogged(true);
          setEnrolledCourses(Object.values(res.data.data));
      }).catch((err) => {
          console.log(err);
          if(!isLogged) {
            document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            document.cookie = `userid=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            SetLogged(false);
            navigate("/login");
          }
      })
    }
  }, [isLogged])

  return (
    <EnrolledContext.Provider value={{ isLogged, SetLogged, enrolledCourses, setEnrolledCourses}}>
      {children}
    </EnrolledContext.Provider>
  );
};