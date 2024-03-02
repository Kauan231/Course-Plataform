
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

function Card ({Course}) {
    return (
        <Link to={`/courses/${Course.id}/lessons`}>
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

function AllCourses ({courses})  {
    return courses.map( (course) => { return <Card Course={course} key={course.id} /> })
}

const Courses = () => {
    const [courses, SetCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get(`http://localhost:3000/courses`).then((res) => {
            SetCourses(Object.values(res.data.data));
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false); // Debug
            }, 2000);
        });
    }, [])

    return (
        <div className='h-screen w-auto bg-slate-200'>
            <div className='w-full grid grid-cols-1 p-20'>
                <div className="w-full h-auto p-5">
                    <h1 className='text-2xl font-bold text-slate-500'>
                        All Courses
                    </h1>
                    { isLoading ? <Loading />  : <AllCourses courses={courses} />}
                </div>
            </div>
        </div>
    )   
}

export default Courses;