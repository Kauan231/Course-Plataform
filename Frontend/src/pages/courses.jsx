
import { object, string } from 'yup';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from '../components/Header'


 
function Card ({CourseName}) {
    return (
        <>
        
        <a href='/'>
            <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
                <h1 className='text-lg font-medium text-white'>
                    {CourseName}
                </h1>
                <h1 className='text-lg font-light text-white pt-2'>
                    Current Lesson
                </h1>
            </div>
        </a>
        </>
    )
}

function EnrolledCourses ({courses})  {
    const arrayOfCourses = courses.map( (course) => {
        return <Card CourseName={course.title + ` (${course.id})`} key={course.id} />
    })

    return arrayOfCourses;
}


// <Card CourseName={JSON.stringfy(courses[i].title)} />
// <Card CourseName={course.title} key={course.id} />

const Courses = () => {
    const [Logged, SetLogged] = useState(0);
    const [courses, SetCourses] = useState([]);

    var match = document.cookie.match(new RegExp('(^| )' + "userid" + '=([^;]+)'));
    
    if(!match) {
        return (
            <>
            <h1>Not Logged</h1> 
            </>
        )
    }

    const userid = match[2];

    useEffect(() => {
        Axios.get(`http://localhost:3000/user/${userid}/courses`).then((res) => {
            let data = Object.values(res.data.data);
            SetLogged(1);
            SetCourses(data);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

   if(!Logged) {
        return (
            <>
            <h1>Not Logged</h1> 
            </>
        )
   }
   else if(courses.length < 1) {
        return (
            <>
            <h1>Loading</h1> 
            </>
        )
   }
   else {
        return (
            <>
                <Header/>
                <div className='h-screen w-auto bg-slate-200'>
                    <div className='w-full grid grid-cols-2 p-20'>
                        <div className="w-full h-auto p-5">
                            <h1 className='text-2xl font-bold text-slate-500'>
                                Enrolled Courses
                            </h1>
                            <EnrolledCourses courses={courses} />
                        </div>
                        <div className='w-full h-auto border-2 border-black/70 p-5 bg-white'>
                            <h1 className='text-2xl font-bold'> Access your lastest course: </h1>
                        </div>
                    </div>
                </div>
            </>
        )
   }
    
}

export default Courses;