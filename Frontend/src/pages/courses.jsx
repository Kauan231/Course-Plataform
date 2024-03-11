
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

function Card ({course}) {
    return (
        <Link to={`/courses/${course.id}/lessons`}>
            <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
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

function AllCourses ({courses})  {
    return courses.map( (course) => { return <Card course={course} key={course.id}/> })
}

const Courses = () => {
    const [courses, SetCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get(`${import.meta.env.VITE_API_ADDRESS}/courses`).then((res) => {
            SetCourses(Object.values(res.data.data));
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [])

    return (
        <div className='h-screen w-auto bg-slate-200'>
            <div className='w-full grid grid-cols-1 lg:p-20 p-5'>
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