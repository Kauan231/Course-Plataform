import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Loading from '../components/Loading';

import {EnrolledContext} from '../context/EnrolledContext'

const Course = () => {
    const { courseid } = useParams();
    const [lessons, SetLessons] = useState([]);
    const [CourseName, SetCourseName] = useState("");
    const [CourseDescription, SetCourseDescription] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {enrolledCourses, setEnrolledCourses} = useContext(EnrolledContext);
    
    useEffect(() => {
        Axios.get(`http://localhost:3000/courses/${courseid}/lessons`).then((res) => {
            SetLessons(Object.values(res.data.data));
            SetCourseName(res.data.coursename);
            SetCourseDescription(res.data.description)
        }).catch((err) => { 
            console.log(err);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false); // Debug
            }, 2000);
        })
    }, [])

    function Card ({lesson}) {
        return (
            <button onClick={() => {
                localStorage.setItem(`course:${courseid}`,`${lesson.id}`);
                //return window.location.replace(`http://localhost:5173/courses/${courseid}/lessons`);
                navigate(`${courseid}/lessons`);
            }}>
                <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
                    <h1 className='text-lg font-medium text-white'>
                        {lesson.title}
                    </h1>
                </div>
            </button>
        )
    }
    
    function ShowLessons ({lessons})  {
        return (
            <div className="w-full h-auto grid justify-items-center pt-12">
                <div className='w-1/2 h-auto grid'>
                    <h1 className='text-2xl font-bold text-slate-500'>
                        Lessons
                    </h1>
                    { lessons.map( (lesson,index) => { return <Card lesson={lesson} key={lesson.id} iterator={index}/> } ) }
                </div>
            </div> 
        )
    }

    function Unenroll(){
        return (
        <button className="w-1/6 mt-2 ml-24 mb-2 p-2 rounded-xl bg-white text-lg font-bold" type="submit">
                Unenroll
        </button >
        )
    }
    function Enroll(){
        return (
        <button className="w-1/6 mt-2 ml-24 mb-2 p-2 rounded-xl bg-white text-lg font-bold" type="submit">
                Enroll
        </button >
        )
    }

    function CourseButton(){
        if(isLoading) return;
        console.log(enrolledCourses);
        if(enrolledCourses.find((element) => element.id == courseid)) {
            return <Unenroll/>
        }
        return <Enroll />
    }

   if(lessons.length < 1) {
        return (
            <div className='h-screen w-auto bg-slate-200'>
                <div className="w-full h-auto p-5 grid justify-center items-center">    
                    <h1 className="text-3xl font-bold text-slate-500 "> This course doesn't have any lessons yet </h1>
                </div>
            </div>
        )
    }

    return (
        <div className='h-screen w-auto bg-slate-200'>
            <div className='w-full grid'>
                <div className="bg-slate-800 h-screen">
                    <div className='bg-slate-700 h-auto w-full'>
                        <div>
                            { isLoading ? <Loading />  : <h1 className='text-5xl font-bold text-white pt-12  pl-24'> { CourseName } </h1>}
                        </div>
                        <h2>
                            { isLoading ? <Loading />  : <h1 className='text-2xl font-bold text-white pt-12  pl-24 pb-6'> { CourseDescription } </h1>}
                        </h2>
                        
                        <CourseButton/>
                        
                    </div>
                    
                    <div>
                        { isLoading ? <Loading /> : <ShowLessons lessons={lessons} courseid={courseid}/>}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Course;