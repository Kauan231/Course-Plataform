import React from "react";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Axios from 'axios';
import Header from '../components/Header'

function Card ({Course, id}) {
    return (
        <>
        <a href={`/courses/${Course.id}/lessons`}>
            <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
                <h1 className='text-lg font-medium text-white'>
                    {Course.title}
                </h1>
                <h1 className='text-lg font-light text-white pt-2'>
                    Current Lesson
                </h1>
            </div>
        </a>
        </>
    )
}
 
function ShowCards ({courses})  {
    const arrayOfCourses = courses.map( (course) => {
        return <Card Course={course} key={course.id}/>
    })

    return (
        <>
        <div className="w-full h-auto p-5">    
            <h1 className='text-2xl font-bold text-slate-500'>
                    Courses Found
            </h1>
            {arrayOfCourses}
        </div>
            
        </>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    const query = useQuery();
    if (!query) return window.location.replace("http://localhost:5173/");
    const title = query.get("title");
    if (!title) return window.location.replace("http://localhost:5173/");

    const [foundCourses, SetFoundCourses] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:3000/courses/search?title=${title}`).then((res) => {
            SetFoundCourses(Object.values(res.data.data));
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    if(courses.length < 1 ) {
        return (
            <>
            <div className="w-full h-auto p-5 grid justify-center items-center">    
                <h1 className="text-3xl font-bold text-slate-500 "> Course not found </h1>
            </div>
            </>
        )
    } else {
        return (
            <>
                <Header/>
                
                <div className='h-screen w-auto bg-slate-200'>
                    <div className='w-full grid grid-cols-1 p-20'>
                        <ShowCards courses={foundCourses}/>
                    </div>
                </div>
            </>
        )
    }
}

export default Search;