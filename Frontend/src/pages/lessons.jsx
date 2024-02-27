
import { object, string } from 'yup';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';

function Card ({lesson, courseid}) {
    return (
        <>
        <a href={`/courses/${courseid}/lessons/${lesson.id}`}>
            <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
                <h1 className='text-lg font-medium text-white'>
                    {lesson.title}
                </h1>
                <h1 className='text-lg font-light text-white pt-2'>
                    Current Lesson
                </h1>
            </div>
        </a>
        </>
    )
}

function ShowLessons ({lessons, courseid})  {
    const arrayOfLessons = lessons.map( (lesson) => {
        return <Card lesson={lesson} key={lesson.id} courseid={courseid}/>
    })

    return (
        <>
            <div className="w-full h-auto p-5">
                <h1 className='text-2xl font-bold text-slate-500'>
                    Lessons
                </h1>
                {arrayOfLessons}
            </div> 
        </>
    )
}

const Lessons = () => {
    const { courseid } = useParams();
    const [Lessons, SetLessons] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3000/courses/${courseid}/lessons`).then((res) => {
            SetLessons(Object.values(res.data.data));
        }).catch((err) => { 
            console.log(err);
        });
    }, [])
    
   if(Lessons.length < 1) {
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
   else {
        return (
            <>
                <Header/>
                <div className='h-screen w-auto bg-slate-200'>
                    <div className='w-full grid grid-cols-1 p-20'>
                        <ShowLessons lessons={Lessons} courseid={courseid}/>
                    </div>
                </div>
            </>
        )
   }
    
}

export default Lessons;