
import { object, string } from 'yup';
import  Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import {EnrolledContext} from '../context/EnrolledContext';
import style from '../style/login.module.css';

const Login = () => {
    const {isLogged, SetLogged} = useContext(EnrolledContext);
    const navigate = useNavigate();

    const loginSchema = object({
        email: string().email().required(),
        password: string().required()
    })

    const initialValues = {
        email: "",
        password: ""
    }

    const renderError = (message) => <p className={style.Error}>{message}</p>

    async function ValidateData(values) {
        Axios.post(`${import.meta.env.VITE_API_ADDRESS}/login`, {
            "email" : values.email,
            "password": values.password
        }).then(
            (res) => {
                console.log(res);
                if(res.status == "200") {
                    console.log("sucess");
                    document.cookie = "token=" + res.data.token;
                    document.cookie = "userid=" + res.data.data.id;
                    SetLogged(true);
                }  
            }
        ).catch((err) => {
            console.log(err);              
        });
    }

    useEffect(() => {
        if(isLogged) navigate("/");
    }, [isLogged])

    return (
            <div className={style.Form}>
                <Formik initialValues={initialValues} 
                        validationSchema={loginSchema}
                        onSubmit={ async (values, {resetForm } ) => {
                            await ValidateData(values);
                            resetForm();
                        }}         
                >
                    <Form>
                        <div className={style.InputContainer}>
                            <div className={style.FormBackground}>
                                <p className={style.AlreadyRegistered}>Already Registered?</p>
                                
                                <div className="mt-5">
                                    <label className={style.Label}>Email:</label>
                                    <Field name="email" type="email" className={style.Input} placeholder="email"/>
                                    <ErrorMessage name="email" render={renderError} />
                                </div>
                                
                                <div className="mt-5">
                                    <label className={style.Label}>Password:</label>
                                    <Field name="password" type="password" className={style.Input} placeholder="password"/>
                                    <ErrorMessage name="password" render={renderError} />
                                </div>

                                <button className={style.Submit} type="submit">
                                    Login
                                </button >
                                <a className={style.BottomButton}>Forgot your password?</a>
                                <Link to='/register' className={style.BottomButton}>Don't have an account? - Sign up</Link>
                            </div>
                        </div>
                    </Form>
                </Formik>

                <div className="w-full pt-20">
                        <h1 className={style.CheckOurCourses}>Check our courses:</h1> 
                        
                        <div className={style.CardGrid} >
                            <div className={style.CardBackground}>
                                <h1 className={style.CardText}> Course Name</h1>
                            </div>
                        </div>
                </div>
            </div>
    )
}

export default Login;