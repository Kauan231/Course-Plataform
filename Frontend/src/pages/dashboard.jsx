import Loading from '../components/Loading'

import { useContext, useEffect, useState } from 'react';
import  Axios from 'axios';

import {EnrolledContext} from '../context/EnrolledContext'

import { Link } from "react-router-dom";

function Card ({course}) {
    return (
        <Link to={`/courses/${course.id}`}>
            <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl hover:scale-[102%] transform transition duration-100'>
                <h1 className='text-lg font-medium text-white'>
                    {course.title}
                </h1>
                <h1 className='text-lg font-light text-white pt-2'>
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
            <div className='h-screen w-auto bg-slate-200'>
                <div className='w-full h-auto md:grid md:grid-cols-2 md:p-20 flex flex-wrap p-10'>
                    <div className="w-full h-auto p-5">
                        <h1 className='text-2xl font-bold text-slate-500'>
                            Enrolled Courses
                        </h1>
                        {isLoading ? <Loading /> : <EnrolledCourses courses={enrolledCourses} />}
                    </div>
                    <div className=' w-full h-fit border-2 border-black/70 p-5 bg-white'>
                        
                        {isLoading ? <Loading /> :
                        <div className='w-auto h-full bg-white flex flex-wrap justify-center '>
                            <h1 className='text-2xl font-bold w-full'> Access your lastest course: </h1>
                            {
                                storedCourse && 
                                <Link to={`/courses/${storedCourseId}`} className='hover:scale-[102%] transform transition duration-100 p-2 rounded-xl text-xl w-auto mt-6 bg-slate-300 border-2 border-black/40 items-center justify-center flex flex-wrap flex-1'>
                                    <h1 className='text-xl font-bold w-full'>{storedCourse}</h1>
                                    <h2 className='text-xl font-semibold w-full'>{localStorage.getItem(`courseprogress:${storedCourseId}`)}</h2>
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