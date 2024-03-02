
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Loading from '../components/Loading'

import { useContext } from 'react';
import {EnrolledContext} from '../context/EnrolledContext'

import { Link, useNavigate } from "react-router-dom";

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
    const [isLoading, setIsLoading] = useState(true);
    const {isLogged, SetLogged, enrolledCourses, setEnrolledCourses} = useContext(EnrolledContext);
    const navigate = useNavigate();

    var matchid = document.cookie.match(new RegExp('(^| )' + "userid" + '=([^;]+)'));
    var matchtoken = document.cookie.match(new RegExp('(^| )' + "token" + '=([^;]+)'));
    if(!matchid || !matchtoken) return navigate("/login");
    const userid = matchid[2]; 
    const usertoken = matchtoken[2];

    useEffect(() => {
        Axios.get(`http://localhost:3000/user/${userid}/courses`, {
            headers: {
                'authorization' : usertoken
            }
        }).then((res) => {
            SetLogged(true);
            setEnrolledCourses(Object.values(res.data.data));
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false); // Debug
            }, 2000);
        })
    }, [])
    
    useEffect(() => {
        if(!isLogged && !isLoading) navigate("/login")
    }, [isLoading, isLogged])
    
    return (
        <>
            <div className='h-screen w-auto bg-slate-200'>
                <div className='w-full grid grid-cols-2 p-20'>
                    <div className="w-full h-auto p-5">
                        <h1 className='text-2xl font-bold text-slate-500'>
                            Enrolled Courses
                        </h1>
                        {isLoading ? <Loading /> : <EnrolledCourses courses={enrolledCourses} />}
                    </div>
                    <div className='w-full h-auto border-2 border-black/70 p-5 bg-white'>
                        <h1 className='text-2xl font-bold'> Access your lastest course: </h1>
                        {isLoading && <Loading /> }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;