import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Loading from '../components/Loading';
import {EnrolledContext} from '../context/EnrolledContext'
import style from '../style/course.module.css';

const Course = () => {
    const { courseid } = useParams();
    const [lessons, SetLessons] = useState([]);
    const [CourseName, SetCourseName] = useState("");
    const [CourseDescription, SetCourseDescription] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const {enrolledCourses, setEnrolledCourses} = useContext(EnrolledContext);
    
    var matchid = document.cookie.match(new RegExp('(^| )' + "userid" + '=([^;]+)'));
    var matchtoken = document.cookie.match(new RegExp('(^| )' + "token" + '=([^;]+)'));
    if(!matchid || !matchtoken) return navigate("/login");
    const userId = matchid[2]; 
    const userToken = matchtoken[2];
    
    useEffect(() => {
        Axios.get(`${import.meta.env.VITE_API_ADDRESS}/courses/${courseid}/lessons`).then((res) => {
            SetLessons(Object.values(res.data.data));
            SetCourseName(res.data.coursename);
            SetCourseDescription(res.data.description)
        }).catch((err) => { 
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])

    function Card ({lesson}) {
        return (
            <button onClick={() => {
                localStorage.setItem(`course:${courseid}`,`${lesson.id}`);
                localStorage.setItem(`courseprogress:${courseid}`,`${lesson.title}`);
                navigate(`lessons`);
            }}>
                <div className={`${localStorage.getItem(`course:${courseid}`) == lesson.id ? "bg-slate-400" : "bg-slate-600"} ${style.Card}`}>
                    <h1 className={style.Card_Title}>
                        {lesson.title}
                    </h1>
                </div>
            </button>
        )
    }
    
    function ShowLessons ({lessons})  {
        return (
            <div className={style.Lessons}>
                <h1 className={style.LessonsTitle}>
                    Lessons
                </h1>
                { lessons.map( (lesson,index) => { return <Card lesson={lesson} key={lesson.id} iterator={index}/> } ) }
            </div> 
        )
    }

    function UpdateCourses() {
        Axios.get(`${import.meta.env.VITE_API_ADDRESS}/user/${userId}/courses`, {
            headers: {
                'authorization' : userToken
            }
        }).then((res) => {
            setEnrolledCourses(Object.values(res.data.data));
        }).catch((err) => {
            console.log(err);
        })
    }

    function UnenrollReq() {
        Axios.delete(`${import.meta.env.VITE_API_ADDRESS}/user/${userId}/enroll/${courseid}`, {
            headers: {
                'authorization' : userToken
            }
        }).then((res) => {
            UpdateCourses();
        }).catch((err) => { 
            console.log(err);
        })
    }

    function EnrollReq() {
        console.log(userToken);
        Axios.post(`${import.meta.env.VITE_API_ADDRESS}/user/enroll`, {
            "userid": userId,
            "courseid": courseid,
        },
        {
            headers: {
                'authorization' : userToken
            },
        }).then((res) => {
            UpdateCourses();
        }).catch((err) => { 
            console.log(err);
        })
    }

    function Unenroll(){
        return (
        <button className={style.EnrollButton} onClick={UnenrollReq}>
                Unenroll
        </button >
        )
    }
    function Enroll(){
        return (
        <button className={style.EnrollButton} onClick={EnrollReq}>
                Enroll
        </button >
        )
    }

    function CourseButton(){
        if(isLoading) return;
        if(enrolledCourses.find((element) => element.id == courseid)) {
            return <Unenroll/>
        }
        return <Enroll />
    }
    
    localStorage.setItem(`latestcourse`,`${CourseName}`);
    localStorage.setItem(`latestcourseid`,`${courseid}`);

    return (
        <div className="bg-slate-800">
            <div className={style.TopSection}>
                <div>
                    { (isLoading || lessons.length < 1) ? <Loading />  : <h1 className={style.TopSection_Title }> { CourseName } </h1>}
                </div>
                <h2>
                    { (isLoading || lessons.length < 1) ? <Loading />  : <h1 className={style.TopSection_Subtitle }> { CourseDescription } </h1>}
                </h2>
                <CourseButton/>
            </div>
            
            <div>
                { (isLoading || lessons.length < 1) ? <Loading /> : <ShowLessons lessons={lessons} courseid={courseid}/>}
            </div>
        </div>
)
}

export default Course;