import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/stickyMenu.js";
import RenderOnAnonymous from '../../pages/account/RenderOnAnonymous';
import UserService from '../../services/UserService';
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated.jsx';
import Search from './Search';
import Sidebar from './Sidebar'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import CourseStructureDrive from '../../pages/instructor/instCourses/CourseStructureDrive.js';
import RenderOnRole from '../../pages/account/RenderOnRole.jsx';
import logo from "../../../src/assets/images/logo.png";



const languages = [

    {
        code: 'en',
        name: 'English',
        country_code: 'gb',
    },

    {
        code: 'hi',
        name: 'Hindi',
        country_code: 'in'
    },
    // {
    //     code: 'te',
    //     name: 'Telugu',
    //     country_code: 'in'
    // },
    {
        code: 'pu',
        name: 'Punjabi',
        country_code: 'in'
    },
    // {
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
]
function StickyMenu() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const stickyMenu = document.querySelector(".sticky-menu");
            if (window.scrollY > 160) {
                stickyMenu.classList.add("sticky");
            } else {
                stickyMenu.classList.remove("sticky");
            }
        });
    });
    const history = useHistory()
    useEffect(() => {
        const interval = setInterval(() => {
            if (UserService.isLoggedIn() === false) {
                history.push("/");
            } else {

            }
        }, 1800000);
        return () => clearInterval(interval);
    }, []);
    return (
        <Styles>
            {/* Sticky Menu */}
            <section className="sticky-menu">
                <Container>
                    <Row>
                        <Col md="3">
                            <div className="logo">
                                {/* <Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" /></Link> */}
                                <Link to={process.env.PUBLIC_URL + "/"}><img src={logo} style={{ width: "170px" }} alt="" /></Link>
                            </div>
                        </Col>
                        <Col md="9">
                            <div className="menu-box d-flex justify-content-end">
                                <ul className="nav menu-nav">
                                    {/* <li className="nav-item dropdown active">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Home <i className="las la-angle-down"></i></Link>
                                        <ul className="dropdown list-unstyled">
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>Home Style 1</Link></li>
                                            <li className="nav-item active"><Link className="nav-link" to={process.env.PUBLIC_URL + "/home-two"}>Home Style 2</Link></li>
                                        </ul>
                                    </li> */}
                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>{t('home')}</Link></li>
                                    {/* <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Pages <i className="las la-angle-down"></i></Link>
                                        <ul className="dropdown list-unstyled">
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/about"}>About Us</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/gallery"}>Gallery</Link></li>
                                            <RenderOnAnonymous>
                                                <li className="nav-item"><Link className="nav-link" onClick={UserService.doLogin} >Log In</Link></li>
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/registration"}>Registration</Link></li>
                                            </RenderOnAnonymous>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/contact"}>Contact</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/faq"}>Faq</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/404"}>404</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/coming-soon"}>Coming Soon</Link></li>
                                        </ul>
                                    </li> */}
                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/about"}>{t('about_us')}</Link></li>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" data-toggle="dropdown">{t('courses')} <i className="las la-angle-down"></i></Link>

                                        <ul className="dropdown list-unstyled">
                                            <RenderOnAuthenticated>
                                                <RenderOnRole roles={['instructor']}>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/CourseStructureDrive"}>{t('course_Content_Drive')}</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/add-course-category"}>{t('course_Category')}</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/CreateCourse"}>{t('create_course')}</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/ViewCourses"}>{t('authored_Courses')}</Link></li>
                                                </RenderOnRole>
                                                <RenderOnRole roles={['learner']}>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/user-grid/:id"}>{t('my_courses')}</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/course-grid"}>{t('all_courses')}</Link></li>
                                                </RenderOnRole>
                                            </RenderOnAuthenticated>
                                            <RenderOnAnonymous>
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/course-grid"}>{t('all_courses')}</Link></li>
                                            </RenderOnAnonymous>
                                            {/* <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/course-details"}>Course Details</Link></li> */}
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" data-toggle="dropdown">{t('e-library')}<i className="las la-angle-down"></i></Link>
                                        <ul className="dropdown list-unstyled">

                                            <RenderOnAuthenticated>
                                                <RenderOnRole roles={['instructor']}>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/view-library"}>{t('upload_content')}</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/create-library"}>{t('create_catagory')}</Link></li>
                                                </RenderOnRole>
                                            </RenderOnAuthenticated>
                                            <RenderOnAuthenticated>
                                                <RenderOnRole roles={['learner']}>
                                                    {/* <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>My Books</Link></li> */}
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/library-content"}>{t('all_book')}</Link></li>
                                                </RenderOnRole>
                                            </RenderOnAuthenticated>
                                            <RenderOnAnonymous>
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/library-content"}>{t('all_book')}</Link></li>
                                            </RenderOnAnonymous>

                                            {/* <RenderOnAuthenticated>
                                                <RenderOnRole roles={['instructor']}>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>Published Books</Link></li>
                                                </RenderOnRole>
                                            </RenderOnAuthenticated>
                                            <RenderOnAuthenticated>
                                                <RenderOnRole roles={['learner']}>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>My Books</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/library-content"}>All Books</Link></li>
                                                </RenderOnRole>
                                            </RenderOnAuthenticated>
                                            <RenderOnAnonymous>
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/library-content"}>All Books</Link></li>
                                            </RenderOnAnonymous> */}
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        {/* <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/instructor"} data-toggle="dropdown">{t('instructor')} </Link> */}
                                        {/* <ul className="dropdown list-unstyled">
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/instructor"}>Instructors</Link></li>
                                        </ul> */}
                                    </li>
                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/contact"}>{t('contact')}</Link></li>
                                    {/* <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/faq"}>{t('faq')}</Link></li> */}

                                    {/* <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Event <i className="las la-angle-down"></i></Link>
                                        <ul className="dropdown list-unstyled">
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/events"}>Events</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/event-details"}>Event Details</Link></li>
                                        </ul>
                                    </li> */}
                                    {/* <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Blog <i className="las la-angle-down"></i></Link>
                                        <ul className="dropdown list-unstyled">
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/blog-classic"}>Blog Classic</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/blog-grid"}>Blog Grid</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/blog-details"}>Blog Details</Link></li>
                                        </ul>
                                    </li> */}
                                    {/* <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Shop <i className="las la-angle-down"></i></Link>
                                        <ul className="dropdown list-unstyled">
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/products"}>Products</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/product-details"}>Product Details</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/cart"}>Cart</Link></li>
                                        </ul>
                                    </li> */}
                                </ul>
                                <div className="apply-btn">
                                    <RenderOnAnonymous>
                                        <Link onClick={() => { UserService.doLogin() }} style={{ marginRight: '50px', width: '80px' }} ><i className="las la-user"></i>{t('log_in')}</Link>
                                        <Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-clipboard-list"></i>{t('register')}</Link>
                                    </RenderOnAnonymous>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    )
}
export default StickyMenu