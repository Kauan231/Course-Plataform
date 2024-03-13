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

import style from '../style/header.module.css';

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
                <FaSearch className={style.SearchIcon}  onClick={() => {
                    SetHidden(false);
                }}> Search </FaSearch>
            )
        }

        return (
            <>
            <div className={style.SearchBar}>
                <Formik initialValues={initialValues} 
                        validationSchema={searchSchema}
                        onSubmit={ async (values, {resetForm } ) => {
                            navigate(`/search?title=${values.course}`);
                            resetForm();
                            SetHidden(true);
                        }} >
                    <Form>
                        <Field className={style.SearchInput} name="course" type="text" placeholder="Course name"></Field>
                    </Form>
                </Formik>
                <IoCloseCircle className={style.SearchClose} onClick={ () => {
                    SetHidden(true)
                } }>Fechar</IoCloseCircle>
            </div>
            </>
        )
    }

    return (
        <main>
            <header>
                <nav className={style.Navbar}>
                    <div className={style.NavbarLogo}>
                        <Link to="/" className={style.NavbarLogoText }> Course.io </Link>
                    </div>

                    <div className={style.SearchBarContainer}>
                        <SearchBar/>
                        
                    </div>

                    <div className={style.NavbarGrid}>
                        <Link to="/courses" className={style.NavbarLink}>All Courses</Link>
                        <Link to="/" className={style.NavbarLink}>Dashboard</Link>
                        <ImExit className={style.Exit} onClick={() => {
                            document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                            document.cookie = `userid=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                            SetLogged(false);
                        }
                        }></ImExit>
                    </div>
                </nav>
                
                <nav className={style.NavbarMobile}>
                    <button onClick={ () => SetShowNav(!ShowNav) }>
                        <VscThreeBars className={style.ShowMoreMobileIcon}></VscThreeBars>
                    </button>
                    <ul className={`${ShowNav ?  "flex flex-wrap" : "hidden"} ${style.NavbarMobileLinks}`}>
                        <li><Link to="/courses" className={style.NavbarMobileLink}>All Courses</Link></li>
                        <li><Link to="/" className={style.NavbarMobileLink}>Dashboard</Link></li>
                        <SearchBar/>
                        <ImExit className={style.ExitMobile} onClick={() => {
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