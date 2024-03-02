import { FaSearch } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { ImExit } from "react-icons/im";

import { object, string } from 'yup';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useContext } from 'react';
import {EnrolledContext} from '../context/EnrolledContext'

const Header = () => {
    const [hidden, SetHidden] = useState(true)

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
                <FaSearch className="text-white text-2xl font-bold"  onClick={() => {
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
            <header className="h-20 w-full bg-blue-900 grid grid-cols-3">
                <div className="h-full flex justify-start items-center pl-8">
                    <Link to="/" className="text-white text-2xl font-bold "> Course.io </Link>
                </div>

                <div className="h-full flex justify-center items-center pl-5">
                    <SearchBar/>
                </div>

                <div className="h-full flex justify-end items-center pr-5">
                    <ImExit className="h-8 w-auto text-white" onClick={() => {
                        document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                        document.cookie = `userid=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                        SetLogged(false);
                    }
                    }></ImExit>
                </div>
            </header>
            <Outlet/>
        </main>
    )
}
export default Header