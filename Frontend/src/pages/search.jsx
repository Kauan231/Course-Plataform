import React from "react";
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
import Loading from '../components/Loading'

function Card ({course}) {
    return (
        <Link to={`/courses/${course.id}`}>
            <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
                <h1 className='text-lg font-medium text-white'>
                    {course.title}
                </h1>
                <h1 className='text-lg font-light text-white pt-2'>
                    Current Lesson
                </h1>
            </div>
        </Link>
    )
}
 
function ShowCards ({courses})  {
    return (
        <div className="w-full h-auto p-5">    
            <h1 className='text-2xl font-bold text-slate-500'>
                    Courses Found
            </h1>
            {courses.map( (course) => { return <Card course={course} key={course.id}/> })}
        </div>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    const navigate = useNavigate();

    const query = useQuery();
    if (!query) navigate('/');
    const title = query.get("title");
    if (!title) navigate('/');

    const [foundCourses, SetFoundCourses] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get(`http://localhost:3000/courses/search?title=${title}`).then((res) => {
            SetFoundCourses(Object.values(res.data.data));
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        })
    }, [])
    
    const NotFound = () => {
        return (
            <div className="w-full h-auto p-5 grid justify-center">    
                <h1 className="text-3xl font-bold text-slate-500 mb-6"> Course not found </h1>
                <Link to="/"> 
                    <h1 className="w-full h-full bg-black rounded-lg p-2 text-xl font-bold text-white text-center">Return</h1>
                </Link>
            </div>
        )
    }

    return (
        <div className='h-screen w-auto bg-slate-200'>
            <div className='w-full grid grid-cols-1 p-20'>  
                {isLoading ? <Loading/> : 
                (
                    foundCourses.length > 0 ? <ShowCards courses={foundCourses}/> : <NotFound/> 
                )}
            </div>
        </div>
    )
}

export default Search;