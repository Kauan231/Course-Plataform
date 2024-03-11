
import { object, string } from 'yup';
import  Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import {EnrolledContext} from '../context/EnrolledContext'

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

    const renderError = (message) => <p className="text-gray-300 pt-2 font-semibold">{message}</p>

    async function ValidateData(values) {
        Axios.post(`${import.meta.env.VITE_API_ADDRESS}/login`, {
            "email" : values.email,
            "password": values.password
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
            <div className="bg-slate-900 w-full min-h-screen grid-cols-2 grid">
                <Formik initialValues={initialValues} 
                        validationSchema={loginSchema}
                        onSubmit={ async (values, {resetForm } ) => {
                            await ValidateData(values);
                            resetForm();
                        }}         
                >
                    <Form>
                        <div className="p-20 w-full flex justify-center items-center">
                            <div className="p-20 w-full h-auto rounded-md bg-gradient-to-t from-slate-900 to-blue-400 grid">
                                <p className="text-2xl font-semibold flex justify-center items-center text-white">Already Registered?</p>
                                
                                <div className="mt-5">
                                    <label className="text-xl flex justify-start text-white">Email:</label>
                                    <Field name="email" type="email" className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" placeholder="email"/>
                                    <ErrorMessage name="email" render={renderError} />
                                </div>
                                
                                <div className="mt-5">
                                    <label className="text-xl flex justify-start text-white">Password:</label>
                                    <Field name="password" type="password" className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" placeholder="password"/>
                                    <ErrorMessage name="password" render={renderError} />
                                </div>

                                <button className="w-full mt-10 p-3 rounded-3xl bg-white text-lg font-bold  hover:border-blue-900/50 border-4" type="submit">
                                    Login
                                </button >
                                <a className="text-white flex mt-5 justify-center items-center">Forgot your password?</a>
                                <Link to='/register' className="text-white flex mt-2 justify-center items-center">Don't have an account? - Sign up</Link>
                            </div>
                        </div>
                    </Form>
                </Formik>

                <div className="w-full pt-20">
                        <h1 className=" text-white text-3xl w-full justify-center items-center">Check our courses:</h1> 
                        
                        <div className="flex w-full gap-3 pt-5 pb-5 ">
                            <div className="bg-slate-800 w-52 mb-auto h-52 border-2 border-slate-700">
                                <h1 className="text-white flex pt-2 justify-center items-center text-lg"> Course Name</h1>
                            </div>
                        </div>
                </div>
            </div>
    )
}

export default Login;