import React from "react";
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
import Loading from '../components/Loading';
import style from '../style/search.module.css';

function Card ({course}) {
    return (
        <Link to={`/courses/${course.id}`}>
            <div className={style.Card}>
                <h1 className={style.Card_Title}>
                    {course.title}
                </h1>
            </div>
        </Link>
    )
}

function AllCourses ({courses})  {
    const Cards = courses.map( (course) => { return <Card course={course} key={course.id}/> })
    return (
        <>
        <h1 className={style.Courses_Found}> Courses found: </h1>
        {Cards}
        </>
    )
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
        Axios.get(`${import.meta.env.VITE_API_ADDRESS}/courses/search?title=${title}`).then((res) => {
            SetFoundCourses(Object.values(res.data.data));
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
        Axios.get(`${import.meta.env.VITE_API_ADDRESS}/courses/search?title=${title}`).then((res) => {
            SetFoundCourses(Object.values(res.data.data));
        }).catch((err) => {
            console.log(err);
            SetFoundCourses([]);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [useLocation().search])
    
    const NotFound = () => {
        return (
            <div className={style.NotFound}>    
                <h1 className={style.Courses_Found}> Course not found </h1>
                <Link to="/"> 
                    <h1 className={style.NotFound_Button}>Return</h1>
                </Link>
            </div>
        )
    }

    return (
        <div className='h-screen bg-slate-200'>
            <div className={style.Card_Grid}>  
                {isLoading ? <Loading/> : 
                (
                    foundCourses.length > 0 ? <AllCourses courses={foundCourses}/> : <NotFound/> 
                )}
            </div>
        </div>
    )
}

export default Search;