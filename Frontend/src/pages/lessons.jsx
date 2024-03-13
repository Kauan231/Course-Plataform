import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Loading from '../components/Loading';
import style from '../style/lessons.module.css';

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
                <div className={`${currentVideo == lesson ? "bg-slate-400" : "bg-slate-600"} ${style.Card}`}>
                    <h1 className={style.Card_Title}>
                        {lesson.title}
                    </h1>
                </div>
            </button>
        )
    }
    
    function ShowLessons ({lessons})  {
        return (
            <div className="p-5">
                <h1 className={style.Lessons_Header}>
                    Lessons
                </h1>
                { lessons.map( (lesson) => { return <Card lesson={lesson} key={lesson.id} /> } ) }
            </div> 
        )
    }
    
    localStorage.setItem(`latestcourse`,`${CourseName}`);
    localStorage.setItem(`latestcourseid`,`${courseid}`);
    
    return (
        <div className={style.Lessons_Grid}>
            <div className={style.Card_List}>
                <h1 className={style.Course_Title}>
                    { (isLoading || lessons.length < 1)  ? <Loading />  : CourseName}
                </h1>
                <div>
                    { (isLoading || lessons.length < 1)  ? <Loading /> : <ShowLessons lessons={lessons} courseid={courseid}/>}
                </div>
                
            </div>
            <div className={style.Video_Background}>
                { (isLoading || lessons.length < 1)  ? <Loading /> : <ReactPlayer url={currentVideo.video}  width='100%' height='100%' controls/> }
            </div>
        </div>
    )
}

export default Lessons;