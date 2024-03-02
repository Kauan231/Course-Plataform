import { createContext, useState } from "react";

export const EnrolledContext = createContext();
EnrolledContext.displayName = "Enrolled";

export const EnrolledProvider = ({ children }) => {
  const [isLogged, SetLogged] = useState(false);
  const [ enrolledCourses, setEnrolledCourses] = useState([]);

  return (
    <EnrolledContext.Provider value={{ isLogged, SetLogged, enrolledCourses, setEnrolledCourses }}>
      {children}
    </EnrolledContext.Provider>
  );
};