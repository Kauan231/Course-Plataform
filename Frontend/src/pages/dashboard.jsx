import { useContext, useEffect, useState } from 'react';
import  Axios from 'axios';
import { Link } from "react-router-dom";
import {EnrolledContext} from '../context/EnrolledContext';
import Loading from '../components/Loading';
import style from '../style/dashboard.module.css';

function Card ({course}) {
    return (
        <Link to={`/courses/${course.id}`}>
            <div className={style.Card}>
                <h1 className={style.Card_Title}>
                    {course.title}
                </h1>
                <h1 className={style.Card_Subtitle}>
                    Current Lesson: {localStorage.getItem(`courseprogress:${course.id}`)}
                </h1>
            </div>
        </Link>
    )
}

function EnrolledCourses ({courses})  {
    return courses.map( (course) => {
       return <Card course={course} key={course.id}/>
   })
}


const Dashboard = () => {
    const { enrolledCourses} = useContext(EnrolledContext);
    const [isLoading, setIsLoading] = useState(true);
    const [allCourses, SetAllCourses] = useState([]);

    useEffect(() => {
        setIsLoading(false);
    }, [enrolledCourses])

    useEffect(() => {

    Axios.get(`${import.meta.env.VITE_API_ADDRESS}/courses`)
    .then((res) => {
        SetAllCourses(Object.values(res.data.data));
    }).catch((err) => {
        console.log(err);
    })
    }, []);

    var storedCourse = localStorage.getItem(`latestcourse`);
    var storedCourseId = localStorage.getItem(`latestcourseid`);

    return (
            <div className={style.Background}>
                <div className={style.Dashboard_Container}>
                    <div className={style.EnrolledCourses}>
                        <h1 className={style.EnrolledCourses_Title}>
                            Enrolled Courses
                        </h1>
                        {isLoading ? <Loading /> : <EnrolledCourses courses={enrolledCourses} />}
                    </div>
                    <div className={style.LatestCourse}>
                        {isLoading ? <Loading /> :
                        <div>
                            <h1 className={style.LatestCourse_Header}> Access your lastest course: </h1>
                            {
                                storedCourse && 
                                <Link to={`/courses/${storedCourseId}`} className={style.LatestCourse_Button}>
                                    <h1 className={style.LatestCourse_Title}>{storedCourse}</h1>
                                    <h2 className={style.LatestCourse_Subtitle}>{localStorage.getItem(`courseprogress:${storedCourseId}`)}</h2>
                                </Link>
                            }
                            
                        </div>
                        
                        }
                    </div>
                </div>
            </div>
    )
}

export default Dashboard;