import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Loading from '../components/Loading';

const Lessons = () => {
    const { courseid } = useParams();
    const [lessons, SetLessons] = useState([]);
    const [CourseName, SetCourseName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentVideo, SetCurrentVideo] = useState({
        "title": null,
        "video": null,
        "description": null,
        "courseid": null,
        "createdAt": null,
        "updatedAt": null,
    });

    const navigate = useNavigate();

    
    useEffect(() => {
        Axios.get(`${import.meta.env.VITE_API_ADDRESS}/courses/${courseid}/lessons`).then((res) => {
            SetLessons(Object.values(res.data.data));
            SetCourseName(res.data.coursename);
        }).catch((err) => { 
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
        var storedArray = localStorage.getItem(`course:${courseid}`);
        console.log(storedArray);
        if(lessons.length > 0) {
            if(storedArray) {
                SetCurrentVideo(lessons.find((element) => element.id == storedArray) );
            }
            else{
                
                SetCurrentVideo(lessons[0]);
            }
        }
    }, [lessons])


    function Card ({lesson}) {
        return (
            <button onClick={ () => {
                SetCurrentVideo(lesson.video);
                localStorage.setItem(`course:${courseid}`,`${lesson.id}`);
                localStorage.setItem(`courseprogress:${courseid}`,`${lesson.title}`);
                navigate(0); 
                }}>
                <div className={`${currentVideo == lesson ? "bg-slate-400" : "bg-slate-600"} w-full mt-5 p-2 rounded-2xl`}>
                    <h1 className='text-lg font-medium text-white'>
                        {lesson.title}
                    </h1>
                </div>
            </button>
        )
    }
    
    function ShowLessons ({lessons})  {
        return (
            <div className="w-full h-auto p-5 grid">
                <h1 className='text-2xl font-bold text-slate-500'>
                    Lessons
                </h1>
                { lessons.map( (lesson) => { return <Card lesson={lesson} key={lesson.id} /> } ) }
            </div> 
        )
    }
    
   if(lessons.length < 1) {
        return (
            <div className='h-screen w-auto bg-slate-200'>
            <div className='w-full grid grid-cols-4 '>
                <div className="bg-slate-800 h-[100vh] overflow-scroll overflow-x-hidden col-span-1">
                    <h1 className='text-4xl font-bold bg-slate-900 text-white p-2 text-center'>
                        <Loading /> 
                    </h1>
                    <div>
                       <Loading />
                    </div>
                    
                </div>
                <div className="w-full h-full col-span-3 p-5 bg-black">
                    <Loading />
                </div>
            </div>
        </div>
        )
    }
    
    localStorage.setItem(`latestcourse`,`${CourseName}`);
    localStorage.setItem(`latestcourseid`,`${courseid}`);
    
    return (
        <div className='h-screen w-auto bg-slate-200'>
            <div className='w-full grid grid-cols-4 '>
                <div className="bg-slate-800 h-[100vh] overflow-scroll overflow-x-hidden col-span-1">
                    <h1 className='text-4xl font-bold bg-slate-900 text-white p-2 text-center'>
                        { isLoading ? <Loading />  : CourseName}
                    </h1>
                    <div>
                        { isLoading ? <Loading /> : <ShowLessons lessons={lessons} courseid={courseid}/>}
                    </div>
                    
                </div>
                <div className="w-full h-full col-span-3 p-5 bg-black">
                    { isLoading ? <Loading /> : <ReactPlayer url={currentVideo.video} className="w-1/2 h-full" width='100%'height='100%' /> }
                </div>
            </div>
        </div>
    )
}

export default Lessons;