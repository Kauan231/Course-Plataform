import { object, string } from 'yup';
import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { VscLoading } from "react-icons/vsc";
import Loading from '../components/Loading';
import Header from '../components/Header';



const Lessons = () => {
    const { courseid } = useParams();
    const [lessons, SetLessons] = useState([]);
    const [CourseName, SetCourseName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentVideo, SetCurrentVideo] = useState("");
    
    useEffect(() => {
        Axios.get(`http://localhost:3000/courses/${courseid}/lessons`).then((res) => {
            SetLessons(Object.values(res.data.data));
            SetCourseName(Object.values(res.data.coursename));
        }).catch((err) => { 
            console.log(err);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
                //SetCurrentVideo(lessons[0].video);
            }, 2000);
        })
    }, [])

    function Card ({lesson, courseid}) {
        return (
            <>
            <button onClick={ () => {
                SetCurrentVideo(lesson.video);
            }}>
                <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
                    <h1 className='text-lg font-medium text-white'>
                        {lesson.title}
                    </h1>
                </div>
            </button>
            </>
        )
    }
    
    function ShowLessons ({lessons, courseid})  {
        const arrayOfLessons = lessons.map( (lesson) => {
            return <Card lesson={lesson} key={lesson.id} courseid={courseid}/>
        })
    
        return (
            <>
                <div className="w-full h-auto p-5 grid">
                    <h1 className='text-2xl font-bold text-slate-500'>
                        Lessons
                    </h1>
                    {arrayOfLessons}
                </div> 
            </>
        )
    }

    function Video ({currentvideo}){
        if(!currentVideo) {
             SetCurrentVideo(lessons[0].video);
        }
        return (
            <ReactPlayer url={currentvideo} className="w-1/2 h-full" width='100%'height='100%' />
        )
    }


    if(isLoading) {  
        return (
        <>
            <Header/>
            <div className='h-screen w-auto bg-slate-200'>
                <div className='w-full grid grid-cols-4 '>
                    <div className="bg-slate-800 h-screen  col-span-1">
                        <h1 className='text-4xl font-bold text-slate-500 bg-slate-900 text-white p-2 text-center'>
                            <Loading />
                        </h1>
                        <div>
                        <Loading />
                        </div>
                        
                    </div>
                    <div className="w-full h-full col-span-3 grid justify-center items-center"> 
                        <Loading />
                    </div>
                    
                    
                </div>
            </div>
            
        </>
        )
    } 

   if(lessons.length < 1) {
        return (
        <>
            <Header/>
            <div className='h-screen w-auto bg-slate-200'>
                <div className="w-full h-auto p-5 grid justify-center items-center">    
                    <h1 className="text-3xl font-bold text-slate-500 "> This course doesn't have any lessons yet </h1>
                </div>
            </div>
        </>
        )
    }

    return (
    <>
        <Header/>
        <div className='h-screen w-auto bg-slate-200'>
            <div className='w-full grid grid-cols-4 '>
                <div className="bg-slate-800 h-screen  col-span-1">
                    <h1 className='text-4xl font-bold text-slate-500 bg-slate-900 text-white p-2 text-center'>
                        {CourseName}
                    </h1>
                    <div>
                        <ShowLessons lessons={lessons} courseid={courseid}/>
                    </div>
                    
                </div>
                <div className="w-full h-full col-span-3 p-5 bg-black">
                    <Video currentvideo={currentVideo} />
                </div>
                
                
            </div>
        </div>
    </>
    )
}

//

export default Lessons;