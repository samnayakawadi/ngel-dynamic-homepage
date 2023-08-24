import React, { Component, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Search from './common/Search';
import Sidebar from './common/Sidebar';
import StickyMenu from './common/StickyMenu';
import MobileMenu from './common/MobileMenu';
import { Styles } from "./styles/headerTwo.js";
import RenderOnAnonymous from '../pages/account/RenderOnAnonymous';
import UserService from '../services/UserService';
import RenderOnAuthenticated from '../pages/account/RenderOnAuthenticated';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'
import CourseStructureDrive from '../pages/instructor/instCourses/CourseStructureDrive';
import RenderOnRole from '../pages/account/RenderOnRole';
import { useHistory } from 'react-router-dom';
import service from '../services/service';
// import logo from '../assets/images/logo.png'
import { DynamicContext } from '../context/DynamicContext';
import { GlobalContext } from '../context/GlobalContext';
import FileTypeHandlers from '../dynamicHomePage/handlers/FileTypeHandlers';
import GlobalHandlers from '../dynamicHomePage/handlers/GlobalHandlers';
import ValidationHandlers from '../dynamicHomePage/handlers/ValidationHandlers';

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

function HeaderTwo(props) {
    const dynamicContextState = props.dynamicContextState
    const  globalContextState  = props.globalContextState
    const fileTypeHandlers = props.fileTypeHandlers;
    var lang = props.lang


    
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

    const history = useHistory();
    const afterLogout = () => {
        let userId = UserService.getUserid();
        let sessionId = UserService.getSessionId();
        service.updateUserActionDetails(userId, sessionId);
        history.push("/")
    }

    return (
        <Styles>
            {/* Topbar 2 */}
            <section className="top-bar2">
                <Container>
                    <Row>
                        <Col lg="7" md="9">
                            <div className="bar-left">
                                <ul className="list-unstyled list-inline">
                                    <li className="list-inline-item"><i className="las la-phone"></i><a href="tel:01826-222061, 222062" style={{ fontSize: "14px", color: "#666666" }} >{t("call_us_phone")}</a></li>
                                    <li className="list-inline-item"><i className="las la-envelope"></i><a href="mailto: itcell.ppa@punjabpolice.gov.in" style={{ fontSize: "14px", color: "#666666" }}>{t("enquiry_us_id")}</a></li>
                                    {/* <li className="list-inline-item"><i className="las la-map-marker"></i>{t('cdac_add')}</li> */}
                                </ul>
                            </div>
                        </Col>
                        <Col lg="5" md="3">
                            <div className="bar-right d-flex justify-content-end">
                                <ul className="list-unstyled list-inline bar-lang">
                                    <li className="list-inline-item">
                                        <Dropdown>
                                            <Dropdown.Toggle as="a"><img src={process.env.PUBLIC_URL + "/assets/images/us.png"} alt="" /> {t('language')}<i className="las la-angle-down"></i></Dropdown.Toggle>
                                            <Dropdown.Menu as="ul">
                                                {languages.map(({ code, name, country_code }) => (
                                                    <Dropdown.Item as="li" key={country_code}>
                                                        <a
                                                            href="#"
                                                            className={classNames('dropdown-item', {
                                                                disabled: currentLanguageCode === code,
                                                            })}
                                                            onClick={() => {
                                                                i18next.changeLanguage(code)
                                                            }}
                                                        >
                                                            {name}
                                                        </a>
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {/* <Dropdown>
                                            <Dropdown.Toggle as="a"><img src={process.env.PUBLIC_URL + "/assets/images/us.png"} alt="" />English<i className="las la-angle-down"></i></Dropdown.Toggle>
                                            <Dropdown.Menu as="ul">
                                                <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/us.png"} alt="" /> English</Dropdown.Item>
                                                <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/fra.png"} alt="" /> French</Dropdown.Item>
                                                    <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/ger.png"} alt="" /> German</Dropdown.Item>
                                                    <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/spa.png"} alt="" /> Spanish</Dropdown.Item>
                                                    <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/bra.png"} alt="" /> Brazilian</Dropdown.Item> 
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                    </li>
                                </ul>
                                <ul className="list-unstyled list-inline bar-social">
                                <li className="list-inline-item"><a href="https://www.facebook.com/PunjabPoliceIndia" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="https://twitter.com/PunjabPoliceInd" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                    {/* <li className="list-inline-item"><a href="https://www.linkedin.com/company/cdac" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li> */}
                                    <li className="list-inline-item"><a href="https://www.instagram.com/punjabpoliceind" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.youtube.com/c/PunjabPoliceIndiaOfficial" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                                {/* <ul className="list-unstyled list-inline">
                                        <RenderOnAnonymous>
                                            <li className="list-inline-item"><Link onClick={UserService.doLogin}><i className="las la-user"></i>Log In</Link></li>
                                        </RenderOnAnonymous>
                                        <RenderOnAuthenticated>
                                            <li className="list-inline-item"><Link onClick={UserService.doLogout}><i className="las la-sign-out-alt"></i>Log out</Link></li>
                                        </RenderOnAuthenticated>
                                        <RenderOnAnonymous>
                                            <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-user-edit"></i>Register</Link></li>
                                        </RenderOnAnonymous>
                                    </ul> */}
                                <div className="bar-left" style={{ marginTop: "3px" }}>
                                    <ul className="list-unstyled list-inline">
                                        <RenderOnAnonymous>
                                            <li className="list-inline-item" ><Link onClick={UserService.doLogin} style={{ color: '#666666' }}><i className="las la-user"></i>{t('log_in')}</Link></li>
                                        </RenderOnAnonymous>
                                        <RenderOnAuthenticated>
                                            <li className="list-inline-item"><Link onClick={() => [afterLogout(), UserService.doLogout()]} style={{ color: '#666666' }}><i className="las la-sign-out-alt"></i>{t('log_out')}</Link></li>
                                        </RenderOnAuthenticated>
                                    </ul>
                                </div>
                                <ul className="list-unstyled list-inline sidebar-button">
                                    <li className="list-inline-item nav-item side-box">
                                        <Sidebar />
                                    </li>
                                </ul>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>

            {/* Logo Area 2 */}
            <section className="logo-area2">
                <Container>
                    <Row>
                    <Col md="3" style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <Link to={process.env.PUBLIC_URL + "/"}><img src={logoNew} style={{ width: "240px", padding: '0px', margin: "0px" }} alt="" /></Link>
                                 */}
                            {/* dynamic logo code */}
                            <div className="logo d-flex align-items-center">
                              
                                <img src={`${globalContextState.server.imageDownload}/${dynamicContextState[lang].megh_Logo.link}`} style={{ width: "240px", height:"55px", margin: "0px" }} alt="" />
                               
                                {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                    onClick={() => { fileTypeHandlers.fileTypeModalUpdateHandler("megh_Logo") }}>
                                    <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                </button>}
                            </div>
                        </Col>
                        <Col md="9">
                            <div className="menu-box d-flex justify-content-end">
                                <ul className="nav menu-nav">
                                    {/* <li className="nav-item dropdown active">
                                            <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Home <i className="las la-angle-down"></i></Link>
                                            <ul className="dropdown list-unstyled">
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>Home Style 1</Link></li>
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/home-two"}>Home Style 2</Link></li>
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
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/user-grid"}>{t('my_courses')}</Link></li>
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
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/create-library"}>{t('create_library')}</Link></li>
                                                </RenderOnRole>
                                            </RenderOnAuthenticated>
                                            <RenderOnAuthenticated>
                                                <RenderOnRole roles={['learner']}>
                                                    {/* <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>My Books</Link></li> */}
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/library-content"}> {t('all_book')}</Link></li>
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
                                <div className="search-box">
                                    <Search />
                                </div>
                                <div className="apply-btn">
                                    <RenderOnAnonymous>
                                        <Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-clipboard-list"></i>{t('register')}</Link>
                                    </RenderOnAnonymous>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Sticky Menu */}
            <StickyMenu />

            {/* Mobile Menu */}
            <MobileMenu />
        </Styles>
    )
}


export default HeaderTwo