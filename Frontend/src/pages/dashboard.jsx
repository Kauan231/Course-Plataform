import Loading from '../components/Loading'

import { useContext, useEffect, useState } from 'react';
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

function EnrolledCourses ({courses})  {
     return courses.map( (course) => {
        return <Card Course={course} key={course.id} />
    })
}


const Dashboard = () => {
    const { enrolledCourses} = useContext(EnrolledContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [enrolledCourses])

    var storedCourse = localStorage.getItem(`latestcourse`);
    var storedCourseId = localStorage.getItem(`latestcourseid`);
    
    
    return (
            <div className='h-screen w-auto bg-slate-200'>
                <div className='w-full h-full grid grid-cols-2 p-20'>
                    <div className="w-full h-auto p-5">
                        <h1 className='text-2xl font-bold text-slate-500'>
                            Enrolled Courses
                        </h1>
                        {isLoading ? <Loading /> : <EnrolledCourses courses={enrolledCourses} />}
                    </div>
                    <div className=' w-full h-40 border-2 border-black/70 p-5 bg-white'>
                        
                        {isLoading ? <Loading /> :
                        <div className='w-full h-full bg-white flex flex-wrap justify-center '>
                            <h1 className='text-2xl font-bold w-full'> Access your lastest course: </h1>
                            <Link to={`/courses/${storedCourseId}`} className='p-2 rounded-xl text-xl w-1/2 bg-slate-300 border-2 border-black/40 items-center justify-center flex'>
                                <h1 className='text-2xl font-semibold'>{storedCourse}</h1>
                            </Link>
                            
                        </div>
                        
                        }
                    </div>
                </div>
            </div>
    )
}

export default Dashboard;