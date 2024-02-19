
import { object, string } from 'yup';
import { useState } from 'react';
import Header from '../components/Header'

const Card = () => {
    return (
        <>
            <div className='bg-slate-600 w-full mt-5 p-2 rounded-2xl'>
                <h1 className='text-lg font-medium text-white'>
                    Course Name
                </h1>
                <h1 className='text-lg font-light text-white pt-2'>
                    Current Lesson
                </h1>
            </div>
        </>
    )
}

const Courses = () => {
    return (
        <>
            <Header/>
            <div className='h-screen w-auto bg-slate-200'>
                <div className='w-full grid grid-cols-2 p-20'>
                    <div className="w-full h-20 p-5">
                        <h1 className='text-2xl font-bold text-slate-500'>
                            Enrolled Courses
                        </h1>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Courses;