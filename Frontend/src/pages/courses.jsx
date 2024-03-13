import { useState, useEffect } from 'react';
import Axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import style from '../style/courses.module.css';

function Card ({course}) {
    return (
        <Link to={`/courses/${course.id}/lessons`}>
            <div className={style.Card}>
                <h1 className={style.Card_Title}>
                    {course.title}
                </h1>
                <h1 className={style.Card_Subtitle}>
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
        <div className='h-screen bg-slate-200'>
            <div className={style.Card_Grid}>
                    <h1 className={style.Title}>
                        All Courses
                    </h1>
                    { isLoading ? <Loading />  : <AllCourses courses={courses} />}
            </div>
        </div>
    )   
}

export default Courses;