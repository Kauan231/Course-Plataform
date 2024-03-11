import { object, string } from 'yup';
import  Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import {EnrolledContext} from '../context/EnrolledContext'

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

    const renderError = (message) => <p className="text-gray-300 pt-2 font-semibold">{message}</p>

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
            <div className="bg-slate-900 w-full min-h-screen grid">
                    <Formik initialValues={initialValues} 
                                validationSchema={registerSchema}
                                onSubmit={ async (values, {resetForm } ) => {
                                    await ValidateData(values);
                                    resetForm();
                                }}         
                    >
                        <Form>
                            <div className="p-20 w-full flex  justify-center items-center">
                                <div className="p-20 w-full h-auto rounded-md bg-gradient-to-t from-slate-900 to-blue-400 grid">
                                    <p className="text-3xl font-semibold flex justify-center items-center text-white">Get started : </p>

                                    <div className="mt-5 grid grid-cols-2 gap-12">
                                        <div>
                                            <label className="text-xl flex justify-start text-white">First name:</label>
                                            <Field name="firstname" type="text" className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" placeholder="First name"/>
                                            <ErrorMessage name="firstname" render={renderError} />
                                        </div>
                                        <div>
                                            <label className="text-xl flex justify-start text-white">Last name:</label>
                                            <Field name="lastname" type="text" className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" placeholder="Last name"/>
                                            <ErrorMessage name="lastname" render={renderError} />
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <label className="text-xl flex justify-start text-white">Username:</label>
                                        <Field name="username" type="text" className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" placeholder="Username"/>
                                        <ErrorMessage name="username" render={renderError} />
                                    </div>

                                    <div className="mt-5">
                                        <label className="text-xl flex justify-start text-white">Email:</label>
                                        <Field name="email" type="email" className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" placeholder="E-mail"/>
                                        <ErrorMessage name="email" render={renderError} />
                                    </div>
                                    
                                    <div className="mt-5">
                                        <label className="text-xl flex justify-start text-white">Password:</label>
                                        <Field name="password" type="password" className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" placeholder="Password"/>
                                        <ErrorMessage name="password" render={renderError} /> 
                                    </div>

                                    <button className="w-full mt-10 p-3 rounded-3xl bg-white text-lg font-bold  hover:border-blue-900/50 border-4" type="submit">
                                    Register
                                    </button >
                                    <Link to='/login' className="text-white flex mt-5 justify-center items-center">Already signed? - Sign In</Link>
                                </div>
                            </div>
                        </Form>
                </Formik>
            </div>
        </>
    )
}

export default Register;