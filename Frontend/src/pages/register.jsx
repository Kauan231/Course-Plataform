import { object, string } from 'yup';
import  Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import {EnrolledContext} from '../context/EnrolledContext'
import style from '../style/register.module.css';

const Register = () => {
    const navigate = useNavigate();
    const {isLogged, SetLogged} = useContext(EnrolledContext);

    const registerSchema = object({
        email: string().email().required(),
        password: string().required(),
        firstname: string().required(),
        lastname: string().required(),
        username: string().required(),
    })

    const initialValues = {
        email: "",
        password: ""
    }

    const renderError = (message) => <p className={style.Error}>{message}</p>

    async function ValidateData(values) {
        Axios.post(`${import.meta.env.VITE_API_ADDRESS}/register`, {
            "email" : values.email,
            "password": values.password,
            "firstname": values.firstname,
            "lastname": values.lastname,
            "username": values.username,
        }).then(
            (res) => {
                console.log(res);
                if(res.status == "201") {
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
        <>
            <div className={style.Form}>
                    <Formik initialValues={initialValues} 
                                validationSchema={registerSchema}
                                onSubmit={ async (values, {resetForm } ) => {
                                    await ValidateData(values);
                                    resetForm();
                                }}         
                    >
                        <Form>
                            <div className={style.InputContainer }>
                                <div className={style.FormBackground }>
                                    <p className={style.GetStarted}>Get started : </p>

                                    <div className={style.FormGrid}>
                                        <div>
                                            <label className={style.Label}>First name:</label>
                                            <Field name="firstname" type="text" className={style.Input} placeholder="First name"/>
                                            <ErrorMessage name="firstname" render={renderError} />
                                        </div>
                                        <div>
                                            <label className={style.Label}>Last name:</label>
                                            <Field name="lastname" type="text" className={style.Input} placeholder="Last name"/>
                                            <ErrorMessage name="lastname" render={renderError} />
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <label className={style.Label}>Username:</label>
                                        <Field name="username" type="text" className={style.Input} placeholder="Username"/>
                                        <ErrorMessage name="username" render={renderError} />
                                    </div>

                                    <div className="mt-5">
                                        <label className={style.Label}>Email:</label>
                                        <Field name="email" type="email" className={style.Input} placeholder="E-mail"/>
                                        <ErrorMessage name="email" render={renderError} />
                                    </div>
                                    
                                    <div className="mt-5">
                                        <label className={style.Label}>Password:</label>
                                        <Field name="password" type="password" className={style.Input} placeholder="Password"/>
                                        <ErrorMessage name="password" render={renderError} /> 
                                    </div>

                                    <button className={style.Submit} type="submit">
                                    Register
                                    </button >
                                    <Link to='/login' className={style.BottomButton}>Already signed? - Sign In</Link>
                                </div>
                            </div>
                        </Form>
                </Formik>
            </div>
        </>
    )
}

export default Register;