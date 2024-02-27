import { FaSearch } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { ImExit } from "react-icons/im";

import { object, string } from 'yup';
import { useState } from 'react';
import  Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";

const Header = () => {
    const [hidden, SetHidden] = useState(true)

    const searchSchema = object({
        course: string().required(),
    })

    const initialValues = {
        course: "",
    }

    const renderError = (message) => <p className="text-gray-300 pt-2 font-semibold">{message}</p>

    const SearchBar = () => {
        if(hidden) { 
            return (
                <FaSearch className="text-white text-2xl font-bold"  onClick={() => {
                    SetHidden(false);
                }}> Search </FaSearch>
            )
        }
        else { 
            return (
                <>
                    <Formik initialValues={initialValues} 
                            validationSchema={searchSchema}
                            onSubmit={ async (values, {resetForm } ) => {
                                window.location.replace(`http://localhost:5173/search?title=` + values.course);
                                resetForm();
                            }} >
                        <Form>
                            <Field className="w-full p-2 rounded-2xl " name="course" type="text" placeholder="Course name"></Field>
                            <ErrorMessage name="course" render={renderError} />
                        </Form>
                    </Formik>
                    <IoCloseCircle className="ml-5 h-12 w-auto color-white text-white" onClick={ () => {
                        SetHidden(true)
                    } }>Fechar</IoCloseCircle>
                </>
                
            )
        }
    }

    return (
    <>
    <div className="h-20 w-full bg-blue-900 grid grid-cols-3">
        <div className="h-full flex justify-start items-center pl-8">
            <a href="/" className="text-white text-2xl font-bold "> Course.io </a>
        </div>

        <div className="h-full flex justify-center items-center pl-5">
            <SearchBar></SearchBar>
        </div>

        <div className="h-full flex justify-end items-center pr-5">
            <ImExit className="h-8 w-auto text-white"></ImExit>
        </div>
        
        
    </div>
    </>
    )
}
export default Header