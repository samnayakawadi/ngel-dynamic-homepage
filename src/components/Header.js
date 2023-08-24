import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Modal, Button, Form } from 'react-bootstrap';
import Search from './common/Search';
import Sidebar from './common/Sidebar';
import StickyMenu from './common/StickyMenu';
import MobileMenu from './common/MobileMenu';
import { Styles } from "./styles/header.js";
import RenderOnAnonymous from '../pages/account/RenderOnAnonymous';
import UserService from '../services/UserService';
import RenderOnAuthenticated from '../pages/account/RenderOnAuthenticated';
import $ from 'jquery';
import service from '../services/service';
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import classNames from 'classnames';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import RenderOnRole from '../pages/account/RenderOnRole';
import { useHistory } from 'react-router-dom';
import RenderOnAdmin from '../pages/account/RenderOnAdmin';
import UserActionLogin from '../pages/account/UserActionLogin';
import logoNew from "../assets/images/logo.png"
import { HashLoader } from "react-spinners";
import logoImage from '../assets/images/logo.png'
// import Toggle from 'react-bootstrap-toggle';
// import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css';

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

function Header({ dynamicContextState, textTypeHandlers, setGlobalContextState, linkTypeHandlers, globalContextState, globalHandlers, fileTypeHandlers, lang, loading, setLoading }) {


    // here API call to submit all data to json in backend
    const saveEditData = () => {

        setLoading(true);
        const updatedDD = { ...dynamicContextState[lang] };

        for (const key in updatedDD) {
            if (Object.prototype.hasOwnProperty.call(updatedDD, key)) {
                const property = updatedDD[key];
                if (property.hasOwnProperty("regex")) {
                    property.type = "String";
                }
            }
        }
        axios.put(`${globalContextState.server.jsonUpload}/${lang}`, updatedDD)
            .then(response => {
                if (response.status === 200) {
                    setTimeout(() => {
                        setLoading(false)
                        toast.success('Data saved successfully');
                    }, 3000);
                } else {
                    toast.error('Error saving data');
                }
            })
            .catch(error => {
                toast.error('Error saving data');
                console.log(error);
            });
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    }

    const [showLoader, setShowLoader] = useState(false);

    const handleLanguageChange = async (code) => {
        setLoading(true);
        setShowLoader(true);
        await i18next.changeLanguage(code);
        setTimeout(() => {
            setLoading(false);
            setShowLoader(false);
        }, 4000);
    };

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {

        // alert("Languahe Change Detected : ", currentLanguage)
        // console.log("Lang : ", currentLanguage)

        setGlobalContextState(prevState => { return { ...prevState, lang: currentLanguage.code === "en" ? "eng" : currentLanguage.code === "hi" ? "hnd" : "eng" } })


        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
        // console.log("CHECKIGN    ======     ", document.title)
    }, [currentLanguage, t])

    // //console.log("instRole", UserService.instRole, "learnerRole", UserService.learnerRole);

    const [announcementData, setAnnouncementData] = useState([]);
    const [msg, setmsg] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true)
        service.AnnouncementByCurrentDataToPublishUpTo()
            .then((res) => {
                setAnnouncementData(res.data);
            }).catch(err => setmsg(t("server_error")))
    }, [])

    useEffect(() => {
        var self = this;
        var notiTabOpened = false;
        var notiCount = window.localStorage.getItem('notiCount');
        if (parseInt(notiCount, 10) > 0) {
            var nodeItems = window.localStorage.getItem('nodeItems');
            $('.noti-count').html(notiCount);
            $('#nav-noti-count').css('display', 'inline-block');
        }

        $('#noti-tab').click(function () {
            notiTabOpened = true;
            if (notiCount) {
                $('#nav-noti-count').fadeOut('slow');
                $('.noti-title').css('display', 'inline-block');
            }
            $('.noti-container').toggle(300);
            return false;
        });

        $('#box-container').click(function () {
            $('.noti-container').hide();
            notiTabOpened = false;
        });

        $('.noti-container').click(function (evt) {
            evt.stopPropagation();
            return false;
        });

        // $('.noti-text').on('click', function (evt) {
        //     addClickListener(evt);
        // });


        // var addClickListener = function (evt) {
        //     evt.stopPropagation();
        //     if (!$(evt.currentTarget).hasClass('has-read')) {
        //         notiCount--;
        //         window.localStorage.setItem('notiCount', notiCount);
        //         $('.noti-count').html(notiCount);
        //         if (notiCount == 0) {
        //             $('.noti-title').hide();
        //         }
        //         $(evt.currentTarget).addClass('has-read');
        //     }
        // }

        $('.noti-footer').click(function () {
            notiCount = 0;
            window.localStorage.setItem('notiCount', notiCount);
            $('.noti-title').hide();
            $('.noti-text').addClass('has-read');
        });

        // window.setInterval(function () {
        //     var randomStr = Date();
        //     var childItem = $('<li>').attr('class', 'noti-text').append("Shekhar Kumar commented on " + randomStr);
        //     childItem = Array.prototype.slice.call(childItem);

        //     $('.noti-body').prepend(childItem);
        //     $('.noti-body .noti-text').on('click', function (evt) {
        //         addClickListener(evt);
        //     });

        //     notiCount++;
        //     $('.noti-count').html(notiCount);

        //     if (notiTabOpened) {
        //         $('.noti-title').css('display', 'inline-block');
        //     } else {
        //         $('#nav-noti-count').css('display', 'inline-block');
        //     }

        //     window.localStorage.setItem('notiCount', notiCount);
        //     if (window.localStorage.getItem('nodeItems')) {
        //         childItem.concat(window.localStorage.getItem('nodeItems'));
        //     }
        //     window.localStorage.setItem('nodeItems', childItem);
        // }, 10000);

    }, [])

    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }


    const [getAnnouncmentModal, setAnnouncementModal] = useState(false);
    const [announcementData1, setAnnouncementData1] = useState({
        title: '',
        body: '',
        date: ''
    })
    const AnnouncementModal = (title, body, date) => {
        setAnnouncementData1({ title: title, body: body, date: date })
        setAnnouncementModal(true);
    }
    const history = useHistory();
    const afterLogout = () => {
        // alert("Logout")
        let userId = UserService.getUserid();
        let sessionId = UserService.getSessionId();
        ////console.log(userId, sessionId);
        ////console.log("logout here");
        service.updateUserActionDetails(userId, sessionId);
        history.push("/")

    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (UserService.isLoggedIn() === false) {
                history.push("/");
            } else {

            }
        }, 1800000);
        return () => clearInterval(interval);
    }, []);
    // console.log('fileTypeHandlers:', fileTypeHandlers.fileTypeModalUpdateHandler);

    // UserService.UserAction();
    return (
        <Styles>
            {loading ? ( // Show loading spinner when `loading` is true
                <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={logoImage} alt="Logo" style={{ width: '200px', marginBottom: '10px' }} />
                    <HashLoader color="#36d7b7" loading={loading} size={50} />
                </div>
            ) :
                (msg == null ? null :
                    <Toast show={show} style={{ right: 0, backgroundColor: '#17a2b8', color: 'white', width: '300px' }} className="position-absolute top-0 end-0 m-4" onClose={() => setShow(false)} delay={5000} autohide>
                        <Toast.Header style={{ fontSize: '15px' }}>
                            <i class="las la-info-circle"></i>
                            <strong className="mr-auto">{t('info')}</strong>
                            <small>{t('just_now')}</small>
                        </Toast.Header>
                        <Toast.Body >
                            {msg}
                        </Toast.Body>
                    </Toast>
                )}

            <section className="top-bar">
                <Container>
                    <Row>
                        <Col lg="6" md="5">
                            <div className="bar-left">
                                <ul className="list-unstyled list-inline">
                                    <li className="list-inline-item" ><i className="las la-map-marker"></i>
                                        {dynamicContextState[lang].cdac_address.value}
                                        {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                            onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("cdac_address") }}>
                                            <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                        </button>}
                                    </li>
                                    <li className="list-inline-item" ><i className="las la-question"></i><Link to={process.env.PUBLIC_URL + "/faq"}>{dynamicContextState[lang].have_questions.value}</Link>
                                        {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                            onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("have_questions") }}>
                                            <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                        </button>}</li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="6" md="7">
                            <div className="bar-right d-flex justify-content-end">
                                <ul className="list-unstyled list-inline bar-social">
                                    <li className="list-inline-item"><a href="https://www.facebook.com/PunjabPoliceIndia" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="https://twitter.com/PunjabPoliceInd" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                    {/* <li className="list-inline-item"><a href="https://www.linkedin.com/company/cdac" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li> */}
                                    <li className="list-inline-item"><a href="https://www.instagram.com/punjabpoliceind" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.youtube.com/c/PunjabPoliceIndiaOfficial" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                                <div>
                                    <ul className="list-unstyled list-inline bar-lang">
                                        <li className="list-inline-item">
                                            <Dropdown>
                                                <Dropdown.Toggle as="a"><img src={process.env.PUBLIC_URL + "/assets/images/us.png"} alt="" />{t('language')}<i className="las la-angle-down"></i></Dropdown.Toggle>
                                                <Dropdown.Menu as="ul">
                                                    {languages.map(({ code, name, country_code }) => (
                                                        <Dropdown.Item as="li" key={country_code}>
                                                            <a
                                                                href="#"
                                                                className={classNames('dropdown-item', {
                                                                    disabled: currentLanguageCode === code,
                                                                })}
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    handleLanguageChange(code);
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
                                    {showLoader && (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                            <img src={logoImage} alt="Logo" style={{ width: '200px', marginBottom: '10px' }} />
                                            <HashLoader color="#36d7b7" loading={loading} size={50} />
                                        </div>
                                    )}</div>
                                <ul className="list-unstyled list-inline bar-login">
                                    <RenderOnAnonymous>
                                        <li className="list-inline-item"><Link onClick={() => { UserService.doLogin() }}><i className="las la-user"></i>{t('log_in')}</Link></li>
                                    </RenderOnAnonymous>
                                    <RenderOnAuthenticated>
                                        <UserActionLogin />
                                        <li className="list-inline-item"><Link onClick={() => [afterLogout(), UserService.doLogout()]}><i className="las la-sign-out-alt"></i>{t('log_out')}</Link></li>
                                    </RenderOnAuthenticated>
                                    <RenderOnAnonymous>
                                        <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-user-edit"></i>{t('register')}</Link></li>
                                    </RenderOnAnonymous>
                                </ul>
                                {/*<----------- Toggle button to enable edit options ---------> */}
                                {/* {console.log("UserService.hasRole()", UserService.hasRole())} */}
                                {UserService.isLoggedIn() && UserService.hasRole(['admin']) && (
                                    <div style={{ position: "fixed", top: "50%", right: "0", zIndex: '9999', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <div style={{
                                            background: 'linear-gradient(to left, #4A90E2, #63C0F2)', padding: '10px', borderRadius: '8px 0 0 8px', boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center'
                                        }}>
                                            <button className={`btn ${globalContextState.editMode ? 'btn-danger' : 'btn-primary'}`}
                                                onClick={globalHandlers.editModeChangeHandler} style={{
                                                    fontSize: '12px',
                                                    padding: '6px 10px',
                                                    marginRight: '10px',
                                                    marginLeft: '10px',
                                                    borderRadius: '4px',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {globalContextState.editMode ? 'Cancel' : 'Enable Editing'}
                                            </button>
                                            {globalContextState.editMode && (
                                                <button className="btn btn-success" onClick={saveEditData} style={{ fontSize: '14px', padding: '6px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Save</button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >

            {/* Logo Area */}
            < section className="logo-area" >
                <Container>
                    <Row>
                        <Col md="3" style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <Link to={process.env.PUBLIC_URL + "/"}><img src={logoNew} style={{ width: "240px", padding: '0px', margin: "0px" }} alt="" /></Link>
                                {globalContextState.editMode && <button className="button mt-4 ml-2 is-small is-dark" onClick={() => { fileTypeHandlers.fileTypeModalUpdateHandler("megh_Logo") }}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>}</div> */}
                            {/* dynamic logo code */}
                            <div className="logo d-flex align-items-center">
                                <img src={`${globalContextState.server.imageDownload}/${dynamicContextState[lang].megh_Logo.link}`} style={{ width: "240px", height: "55px", margin: "0px" }} alt="" />
                                {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                    onClick={() => { fileTypeHandlers.fileTypeModalUpdateHandler("megh_Logo") }}>
                                    <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                </button>}
                            </div>
                        </Col>
                        <Col md="9">
                            <div className="logo-contact-box d-flex justify-content-end">
                                <div className="emcontact-box d-flex">
                                    <div className="box-icon">
                                        <i class="las la-phone-volume" style={{ fontSize: '30px' }}></i>
                                    </div>
                                    <div className="box-content">
                                        <p>{dynamicContextState[lang].call_us_now.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("call_us_now") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</p>
                                        <span><a href={dynamicContextState[lang].call_us_phone.link.value} style={{ color: "#182B49", fontSize: '17px' }}>{dynamicContextState[lang].call_us_phone.title.value}</a>
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { linkTypeHandlers.linkTypeModalUpdateHandler("call_us_phone") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</span>
                                    </div>
                                </div>
                                <div className="emcontact-box d-flex">
                                    <div className="box-icon">
                                        <i class="las la-envelope-open-text" style={{ fontSize: '30px' }}></i>
                                    </div>
                                    <div className="box-content">

                                        <p>{dynamicContextState[lang].enquiry_us.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("enquiry_us") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</p>
                                        <span><a href={dynamicContextState[lang].enquiry_us_id.link.value} style={{ color: "#182B49", fontSize: '17px' }}>{dynamicContextState[lang].enquiry_us_id.title.value}</a>
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { linkTypeHandlers.linkTypeModalUpdateHandler("enquiry_us_id") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</span>
                                    </div>
                                </div>
                                {/* <div className="apply-btn">
                                    <RenderOnAnonymous>
                                        <Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-clipboard-list"></i>Apply Now</Link>
                                    </RenderOnAnonymous>
                                </div> */}

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >

            {/* Navbar */}
            < section className="main-menu" >
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="main-menu-box">
                                <div className="menu-box d-flex justify-content-between">
                                    <ul className="nav menu-nav">
                                        <li className="nav-item dropdown active">
                                            <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">{t('home')} </Link>
                                            {/* <ul className="dropdown list-unstyled">
                                                <li className="nav-item active"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>Home Style 1</Link></li>
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/home-two"}>Home Style 2</Link></li>
                                            </ul> */}
                                        </li>
                                        {/* <li className="nav-item active"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>{t('home')}</Link></li> */}
                                        {/* <li className="nav-item">
                                                <Link className="nav-link" to={process.env.PUBLIC_URL + "/about"}>About Us</Link>
                                                <ul className="dropdown list-unstyled">
                                                    <li className="nav-item"><Link className="nav-link" >About Us</Link></li>
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
                                                </RenderOnAuthenticated>
                                                <RenderOnAuthenticated>
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
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/view-library"}>{t('published_book')}</Link></li>
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/create-library"}>{t('create_library')}</Link></li>
                                                    </RenderOnRole>
                                                </RenderOnAuthenticated>
                                                <RenderOnAuthenticated>
                                                    <RenderOnRole roles={['learner']}>
                                                        {/* <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>{t("my_book")}</Link></li> */}
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/library-content"}>{t("all_book")}</Link></li>
                                                    </RenderOnRole>
                                                </RenderOnAuthenticated>
                                                <RenderOnAnonymous>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/library-content"}>{t("all_book")}</Link></li>
                                                </RenderOnAnonymous>
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

                                        <RenderOnAuthenticated>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" data-toggle="dropdown">{t('dashboard')} <i className="las la-angle-down"></i></Link>
                                                <ul className="dropdown list-unstyled">
                                                    {UserService.hasRole(['instructor']) ?
                                                        <><li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/instructor-dashboard"}>{t('instructor_Dashborad')}</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/dashboard"}>{t('learner_Dashboard')}</Link></li>
                                                        </>
                                                        : UserService.hasRole(['admin']) ? <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/AdminDashBoard"}>{t('admin_Dashborad')}</Link></li>
                                                            : <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/dashboard"}>{t('learner_Dashboard')}</Link></li>}
                                                </ul>
                                            </li>
                                        </RenderOnAuthenticated>

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
                                    </ul>
                                    <ul className="nav search-cart-bar">
                                        <li className="nav-item cart-box">
                                            <Link className="nav-link nav-cart dropdown" data-toggle="dropdown">
                                                <i className="las la-bell"></i>
                                                {announcementData.length == 0 ? null : <span class="badge1 badge-danger1">{announcementData.length}</span>}
                                            </Link>

                                            <div className=".noti-container">
                                                <ul className="dropdown list-unstyled">
                                                    {/* <li onClick={() => CreateModal("PRadeep")} className="nav-item"><Link className="nav-link" >Products</Link></li> */}
                                                    {
                                                        announcementData.map((data, i) => {
                                                            return (
                                                                <li onClick={() => AnnouncementModal(data.title, data.body, dateConverter(data.publihFrom))} className="nav-item">
                                                                    <Link className="nav-link" >{data.title} <span style={{ fontSize: '10px', float: 'right' }}>({dateConverter(data.publihFrom)})</span></Link></li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>

                                        </li>
                                    </ul>
                                    {/* <li className="nav-item cart-box">
                                            <a href="#" className="nav-link nav-cart">
                                                <i onClick={() => AnnouncementService()} id="noti-tab" className="nav-items las la-bell">
                                                    <span className="noti-count noti-count-extend" id="nav-noti-count"></span>
                                                    <div className="noti-container">
                                                        <div className="noti-title">
                                                            <span className="new-noti-title">Notifications </span>
                                                            <span className="noti-count-title" id="nav-noti-count"></span>
                                                        </div>
                                                        <ul class="noti-body">
                                                            {
                                                                announcementData.map((data, i) => {
                                                                    return (
                                                                        <li id="abc" className="noti-text">{data.title}<span style={{ fontSize: '10px', float: 'right' }}>({dateConverter(data.publihFrom)})</span></li>
                                                                    )
                                                                })
                                                            }

                                                        </ul>
                                                        <div className="noti-footer">Mark all as read</div>
                                                    </div>
                                                </i>
                                            </a>
                                        </li> */}
                                    <ul className="nav search-cart-bar">
                                        {/* <li className="nav-item search-box">
                                            <Search />
                                        </li> */}
                                        <li className="nav-item side-box">
                                            <Sidebar />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >

            {/* Sticky Menu */}
            < StickyMenu />

            {/* Mobile Menu */}
            < MobileMenu />


            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={getAnnouncmentModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {announcementData1.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ReactHtmlParser(ReactHtmlParser(announcementData1.body))}
                </Modal.Body>
                <Modal.Footer>
                    <span style={{ fontSize: '10px', position: 'sticky' }}>{announcementData1.date}</span>
                    <Button onClick={() => setAnnouncementModal(false)}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>
        </Styles >
    )
}

export default Header