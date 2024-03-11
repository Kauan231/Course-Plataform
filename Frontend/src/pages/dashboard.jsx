import Loading from '../components/Loading'

import { useContext, useEffect, useState } from 'react';
import  Axios from 'axios';

import {EnrolledContext} from '../context/EnrolledContext'

import { Link } from "react-router-dom";

function Card ({Course}) {
    return (
        <Link to={`/courses/${Course.id}`}>
            <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
                <h1 className='text-lg font-medium text-white'>
                    {Course.title}
                </h1>
                <h1 className='text-lg font-light text-white pt-2'>
                    Current Lesson
                </h1>
            </div>
        </Link>
    )
}

function AllCoursesCard({Course}) {
    return (
        <Link to={`/courses/${Course.id}`}>
            <div className='bg-blue-600 w-12 h-12 rounded-2xl'>
                <h1 className='text-lg font-medium text-white'>
                    {Course.title}
                </h1>
            </div>
        </Link>
    )
} 

function EnrolledCourses ({courses})  {
    return courses.map( (course) => {
       return <Card Course={course} key={course.id} />
   })
}

function AllCourses ({courses})  {
     const coursesCards = courses.map( (course) => {
        return <Card Course={course} key={course.id} />
    })

    return (
        <>
        <div className='w-full grid justify-center'>
            <h1 className='text-2xl font-semibold'>All Courses</h1>
        </div>
        
        <div className='h-auto w-full grid grid-cols-3 p-10 gap-12 bg-slate-200'>
            {coursesCards}
        </div>
        </>
    )
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
            <div className='h-screen w-auto bg-slate-200'>
                <div className='w-full h-auto grid grid-cols-2 p-20'>
                    <div className="w-full h-auto p-5">
                        <h1 className='text-2xl font-bold text-slate-500'>
                            Enrolled Courses
                        </h1>
                        {isLoading ? <Loading /> : <EnrolledCourses courses={enrolledCourses} />}
                    </div>
                    <div className=' w-full h-fit border-2 border-black/70 p-5 bg-white'>
                        
                        {isLoading ? <Loading /> :
                        <div className='w-full h-full bg-white flex flex-wrap justify-center '>
                            <h1 className='text-2xl font-bold w-full'> Access your lastest course: </h1>
                            <Link to={`/courses/${storedCourseId}`} className='p-2 rounded-xl text-xl w-auto mt-12 bg-slate-300 border-2 border-black/40 items-center justify-center flex'>
                                <h1 className='text-2xl font-semibold'>{storedCourse}</h1>
                            </Link>
                            
                        </div>
                        
                        }
                    </div>
                </div>
                <AllCourses courses={allCourses}/>
            </div>
    )
}

export default Dashboard;