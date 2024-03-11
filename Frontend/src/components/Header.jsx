import { FaSearch } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { VscThreeBars } from "react-icons/vsc";

import { object, string } from 'yup';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useContext } from 'react';
import {EnrolledContext} from '../context/EnrolledContext'

import '../style/Header.css';

const Header = () => {
    const [hidden, SetHidden] = useState(true)
    const [ShowNav, SetShowNav] = useState(false);

    const searchSchema = object({
        course: string().required(),
    })

    const initialValues = {
        course: "",
    }

    const {SetLogged} = useContext(EnrolledContext);

    const SearchBar = () => {
        const navigate = useNavigate();

        if(hidden) { 
            return (
                <FaSearch className="text-white text-2xl font-bold hover:scale-110 transform transition duration-100"  onClick={() => {
                    SetHidden(false);
                }}> Search </FaSearch>
            )
        }

        return (
            <>
                <Formik initialValues={initialValues} 
                        validationSchema={searchSchema}
                        onSubmit={ async (values, {resetForm } ) => {
                            navigate(`search?title=${values.course}`);
                            resetForm();
                        }} >
                    <Form>
                        <Field className="w-full p-2 rounded-2xl " name="course" type="text" placeholder="Course name"></Field>
                    </Form>
                </Formik>
                <IoCloseCircle className="ml-5 h-12 w-auto color-white text-white" onClick={ () => {
                    SetHidden(true)
                } }>Fechar</IoCloseCircle>
            </>
        )
    }

    return (
        <main>
            <header>
                <nav className="Navbar">
                    <div className="h-full flex justify-start items-center pl-8">
                        <Link to="/" className="text-white text-2xl font-bold hover:scale-110 transform transition duration-100 "> Course.io </Link>
                    </div>

                    <div className="h-full flex justify-center items-center pl-5 gap-12">
                        <SearchBar/>
                        
                    </div>

                    <div className="h-full flex justify-end items-center pr-5 gap-12">
                        <Link to="/courses" className="text-white text-xl font-bold hover:scale-110 transform transition duration-100">All Courses</Link>
                        <Link to="/" className="text-white text-xl font-bold hover:scale-110 transform transition duration-100">Dashboard</Link>
                        <ImExit className="h-8 w-auto text-white" onClick={() => {
                            document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                            document.cookie = `userid=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                            SetLogged(false);
                        }
                        }></ImExit>
                    </div>
                </nav>
                
                <nav className="Navbar-Mobile">
                    <button onClick={ () => SetShowNav(!ShowNav) }>
                        <VscThreeBars className='ShowMore-Mobile-Icon'></VscThreeBars>
                    </button>
                    <ul className={`${ShowNav ?  "grid" : "hidden"} Navbar-Mobile-Links`}>
                        <li><Link to="/courses" className="Navbar-Mobile-Link">All Courses</Link></li>
                        <li><Link to="/courses" className="Navbar-Mobile-Link">Dashboard</Link></li>
                        <ImExit className="sm:h-8 h-6 mt-2 w-full text-white hover:scale-110 transform transition duration-100" onClick={() => {
                            document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                            document.cookie = `userid=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                            SetLogged(false);
                        }
                        }></ImExit>
                    </ul>
                </nav>
            </header>
            <Outlet/>
        </main>
    )
}
export default Header