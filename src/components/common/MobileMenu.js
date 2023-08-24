import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Styles } from "./styles/mobileMenu.js";
import RenderOnRole from '../../pages/account/RenderOnRole';
import RenderOnAnonymous from '../../pages/account/RenderOnAnonymous';
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated'
import UserService from '../../services/UserService'
import service from '../../services/service'
import { useHistory } from 'react-router-dom';
import ProfileUpdate from '../User/ProfileUpdate'
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
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
    //     code : 'te',
    //        name : 'Telugu',
    //        country_code : 'in'
    //    },
    // {
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
]

function MobileMenu() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const um_api = UserService.USER_API;
    ////console.log(um_api);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    const [stateLoading, setStateLoading] = useState();
    const [condition, setCondition] = useState()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])
    useEffect(() => {
        // Mobile Menu
        const hmBtn = document.getElementById("mb-sidebar-btn");

        if (hmBtn) {
            const mdSidebarOverlay = document.getElementById("mb-sidebar-overlay");
            const mdSidebarBody = document.getElementById("mb-sidebar-body");
            const mdSidebarExit = document.getElementById("close-mb-sidebar");
            const mdSidebarExit2 = document.getElementById("close-mb-sidebar2");

            hmBtn.addEventListener("click", function (e) {
                e.preventDefault();
                mdSidebarOverlay.classList.toggle("visible");
                mdSidebarBody.classList.toggle("opened");
            });

            mdSidebarOverlay.addEventListener("click", function (e) {
                e.preventDefault();
                mdSidebarOverlay.classList.remove("visible");
                mdSidebarBody.classList.remove("opened");
            });

            mdSidebarExit.addEventListener("click", function (e) {
                e.preventDefault();
                mdSidebarOverlay.classList.remove("visible");
                mdSidebarBody.classList.remove("opened");
            });

            if (mdSidebarExit2) {
                mdSidebarExit2.addEventListener("click", function (e) {
                    e.preventDefault();
                    mdSidebarOverlay.classList.remove("visible");
                    mdSidebarBody.classList.remove("opened");
                });
            }
        }

        // Menu Accordion -----------------
        const menuButton = document.querySelectorAll(".mb-menu-button");
        menuButton.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("active");
                const content = button.nextElementSibling;

                if (button.classList.contains("active")) {
                    content.className = "mb-menu-content show";
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.className = "mb-menu-content";
                    content.style.maxHeight = "0";
                }
            });
        });
    });

    const requestAsInstructor = () => {
        setStateLoading(true);
        service.requestForInstructor(UserService.getUserid())
            .then(async response => {
                // //console.log(response.data)
                if (response.status === 200) {
                    setStateLoading(false);
                    // await swal("Message", "Your request for the Instructor role has been submitted for approval. You will be intimated through email once it is approved", "success")
                } else {
                    setStateLoading(false);
                    // swal(t('services_is_down_please_update_after_sometime'), "", "warning")
                }
            }).catch((err) => {
                setStateLoading(false);
                alert(t('services_is_down_please_update_after_sometime'))
            });
    }

    const checkInstRequest = () => {
        service.checkInstructorRequest(UserService.getUserid())
            .then(async resp => {
                if (resp.data === "pending") {
                    // //console.log("PENDING")
                    setCondition("Pending")
                    // //console.log(resp.data)
                }
                else if (resp.data === "rejected") {
                    setCondition("Rejected")
                }
            }).catch(err => {
                //console.log(err)
            }
            );
    }

    const addTestimonial = () => {
        history.push(`${process.env.PUBLIC_URL + "/addTestimonial"}`);
    }

    const afterLogout = () => {
        let userId = UserService.getUserid();
        let sessionId = UserService.getSessionId();
        service.updateUserActionDetails(userId, sessionId);
        history.push("/")
    }


    const [getModalState, setModalState] = useState({
        show: false
    });
    const [headerState, setHeaderState] = useState({
        id: UserService.getUserid(),
        img: um_api + "getprofilepic/"
    });
    const history = useHistory();

    const userProfile = (learnerUsername) => {
        history.push(`/userProfile/${learnerUsername}`)
    }

    const handleModal = () => {
        setModalState({ show: true })
    }
    const handleModal2 = () => {
        setModalState({ show: false })
    }
    const feedback = () => {
        history.push(`/feedback`);
    }
    const [getUserDetails, setUserDetails] = useState({});
    let id = UserService.getUserid();
    const sidebarOpen = () => {
        service.getUserById(id)
            .then(res => {
                setUserDetails(res.data);
                checkInstRequest();
            })
            .catch(err => {
                //console.log(err);
            })
    }

    return (
        <Styles>
            {/* Mobile Menu */}
            <section className="mobile-menu-area">
                <Container>
                    <Row>
                        <Col md="0" sm="12">
                            <div className="mb-topbar d-flex justify-content-between">
                                <div className="topbar-item">
                                    <p><i className="las la-phone"></i>{t('call_us_phone')}</p>
                                </div>
                                <div className="topbar-item">
                                    <ul className="list-unstyled list-inline">
                                        <RenderOnAnonymous>
                                            <li className="list-inline-item"><Link onClick={UserService.doLogin}><i className="las la-user"></i>{t('log_in')}</Link></li>
                                        </RenderOnAnonymous>
                                        <RenderOnAuthenticated>
                                            <li className="list-inline-item"><Link onClick={UserService.doLogout}><i className="las la-sign-out-alt"></i>{t('log_out')}</Link></li>
                                        </RenderOnAuthenticated>
                                        <RenderOnAnonymous>
                                            <li className="list-inline-item">/</li>
                                            <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-user-edit"></i>{t('register')}</Link></li>
                                        </RenderOnAnonymous>

                                    </ul>
                                </div>
                            </div>
                            <div className="mb-logo-area d-flex justify-content-between">
                                <div className="mb-logo-box d-flex">
                                    <div className="hm-button">
                                        <a href={process.env.PUBLIC_URL + "/"} id="mb-sidebar-btn">
                                            <i className="las la-bars" onClick={() => sidebarOpen()}></i>
                                        </a>
                                    </div>
                                    <div className="mb-logo">
                                        {/* <Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/logo1.png"} style={{backgroundColor:"rgb(207 207 207)",borderRadius:"5px"}} alt="" /></Link> */}
                                        <Link to={process.env.PUBLIC_URL + "/"}> <img src={process.env.PUBLIC_URL + "/assets/images/logo1.png"} style={{ width: "50px", borderRadius: "5px" }} alt="" /></Link>
                                    </div>
                                </div>
                                <div className="mb-search-box">
                                    <form action="#">
                                        <input type="text" name="search" placeholder="Search Here" />
                                        <button type="submit"><i className="las la-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mobile Menu Sidebar */}
            <section className="mb-sidebar" id="mb-sidebar-body">
                <div className="mb-sidebar-heading d-flex justify-content-between">
                    <div><h5>{t('menu')}</h5></div>
                    <div><a href={process.env.PUBLIC_URL + "/"} id="close-mb-sidebar"><i className="las la-times"></i></a></div>
                </div>
                <div className="mb-sidebar-menu">
                    <div className="mb-menu-item">
                        {/* <button className="mb-menu-button active">
                            <p>Home <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content show">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/"}>Home Style 1</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/home-two"}>Home Style 2</Link></li>
                            </ul>
                        </div> */}
                        <RenderOnAuthenticated>
                            <div className='mt-2' style={{ textAlign: 'center' }}>
                                <img style={{ width: 100, height: 100, backgroundColor: "white", borderRadius: 150 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} src={`${headerState.img}${headerState.id}`} />
                                <a id="close-mb-sidebar2" href="#" onClick={() => handleModal()}><i style={{ fontSize: 25, overflow: "hidden", backgroundColor: "white", border: '2px solid white', boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: 40 / 2, position: 'absolute', top: 200, left: 170, zIndex: 3 }} className="las la-camera"></i></a>
                                {/* <i style={{ width: 40, height: 40, borderRadius: 40 / 2, overflow: "hidden", borderWidth: 5, backgroundColor: "white", position:'absolute', top:230, left:200,zIndex:3}} className="las la-camera"></i> */}
                            </div>
                            <div style={{ textAlign: 'center', color: "black", paddingTop: 40 }}>
                                <h6> {t('welcome')} {getUserDetails.firstName} {getUserDetails.lastName} </h6>
                            </div>
                            <br></br>

                            <RenderOnAuthenticated>
                                {UserService.hasRole(['instructor']) ? <><Button onClick={() => requestAsInstructor()} className="btn btn-success" disabled >Instructor </Button></>
                                    : UserService.hasRole(['admin']) ? <><Button onClick={() => requestAsInstructor()} className="btn btn-success" disabled >Admin </Button></>
                                        :
                                        <>
                                            {
                                                condition === "Pending" ? <><Button onClick={() => requestAsInstructor()} className="btn btn-secondary" disabled >Request For Instructor </Button>
                                                    <p className="text-danger">
                                                        Your Request is Pending at Administrator Please Wait or Contact Administrator</p>
                                                </>
                                                    :
                                                    <>
                                                        {
                                                            condition === "Rejected" ?
                                                                <>
                                                                    <Button onClick={() => requestAsInstructor()} className="btn btn-secondary" disabled >Request For Instructor </Button>
                                                                    <p className="text-danger">Your Request is REJECTED Contact ADMIN</p>
                                                                </> :
                                                                <>
                                                                    {
                                                                        stateLoading === true ?
                                                                            <>
                                                                                <button className="btn btn-secondary" type="button" disabled>
                                                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                                    <span className='ml-2'>{t('loading')}</span>
                                                                                </button>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <Button onClick={() => requestAsInstructor()} className="btn btn-secondary" >Request For Instructor</Button>
                                                                            </>
                                                                    }
                                                                </>
                                                            // <>
                                                            // </>
                                                        }
                                                    </>
                                            }
                                        </>
                                }
                            </RenderOnAuthenticated>
                            <br></br>
                            <div className="mb-menu-content show">
                                <ul className="list-unstyled" >
                                    <li style={{ marginTop: 20 }}>
                                        <h6>    < a href="#" style={{ color: 'black' }} onClick={event => window.location.href = 'http://ngel.hyderabad.cdac.in:8080/auth/realms/ngel/account/password'}>{t('reset_password')}</a></h6>
                                    </li>
                                    <li style={{ marginTop: 20 }}>
                                        <h6> < a href="#" style={{ color: 'black' }} onClick={() => userProfile(UserService.getUserid())}>{t('edit_profile')}</a></h6>
                                    </li>
                                    <li style={{ marginTop: 20 }}>
                                        <h6> < a href="#" style={{ color: 'black' }} onClick={() => feedback(2, 0)}>{t('feedback')}</a></h6>
                                    </li>
                                    <li style={{ marginTop: 20 }}>
                                        <h6> < a href="#" style={{ color: 'black' }} onClick={() => addTestimonial()}>{t('add_testimonial')}</a></h6>
                                    </li>
                                    {/* <li style={{ marginTop: 20 }}>
                                        <h6> < a href="#" style={{ color: 'black' }} onClick={() => [UserService.doLogout(), afterLogout()]}>{t('log_out')}</a></h6>
                                    </li> */}
                                </ul>
                            </div>

                        </RenderOnAuthenticated>



                    </div>
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button active">
                            <p>Pages <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content show">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/about"}>About Us</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/gallery"}>Gallery</Link></li>
                                <RenderOnAnonymous>
                                    <li><Link onClick={UserService.doLogin}>Log In</Link></li>
                                    <li><Link to={process.env.PUBLIC_URL + "/registration"}>Registration</Link></li>
                                </RenderOnAnonymous>
                                <li><Link to={process.env.PUBLIC_URL + "/contact"}>Contact</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/faq"}>Faq</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/404"}>404</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/coming-soon"}>Coming Soon</Link></li>
                            </ul>
                        </div>
                    </div> */}
                    <RenderOnAuthenticated>
                        <div className="mb-menu-item">
                            <button className="mb-menu-button active">
                                <p>{t('basic_details')}<i className="las la-plus"></i></p>
                            </button>
                            <div className="mb-menu-content">
                                <ul className="list-unstyled">
                                    <li>{getUserDetails.email}</li>

                                    <li>{getUserDetails.mobile}</li>
                                </ul>
                            </div>
                        </div>
                    </RenderOnAuthenticated>

                    <div className="mb-menu-item">
                        <button className="mb-menu-button active">
                            <p>{t('courses')} <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
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
                            </ul>
                        </div>

                    </div>
                    <div className="mb-menu-item">
                        <button className="mb-menu-button active">
                            <p>{t('e-library')}<i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
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
                        </div>
                        
                        
                    </div>

                    <RenderOnAuthenticated>
                        <div className="mb-menu-item">
                            <button className="mb-menu-button active">
                                <p>{t('dashboard')}<i className="las la-plus"></i></p>
                            </button>
                            <div className="mb-menu-content">
                                <ul className="list-unstyled">
                                    {UserService.hasRole(['instructor']) ?
                                        <><li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/instructor-dashboard"}>{t('instructor_Dashborad')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/dashboard"}>{t('learner_Dashboard')}</Link></li>
                                        </>
                                        : UserService.hasRole(['admin']) ? <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/AdminDashBoard"}>{t('admin_Dashborad')}</Link></li>
                                            : <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/dashboard"}>{t('learner_Dashboard')}</Link></li>}

                                </ul>
                            </div>


                        </div>
                    </RenderOnAuthenticated>

                    

                    <div className="mt-3 mb-3">
                        <ul className="list-unstyled">
                            <Link className="text-decoration-none text-dark" to={process.env.PUBLIC_URL + "/about"}>ABOUT US</Link>
                        </ul>
                    </div>



                    <div className="mb-3">
                        <ul className="list-unstyled">
                            <Link className="text-decoration-none text-dark" to={process.env.PUBLIC_URL + "/contact"}>{t('contact_us').toUpperCase()}</Link>
                        </ul>
                    </div>


                    {/* <div className="mb-menu-item side-contact">
                        <br />
                        <h5>{t('contact_us')}</h5>
                        <br />
                        <ul className="list-unstyled">
                            <li><i className="las la-map-marker"></i><p>{t('cdac_full_address')}</p></li>
                            <li><i className="las la-phone"></i>{t('phone')}</li>
                            <li><i className="las la-envelope"></i>{t("itcell_mail")}</li>
                        </ul>
                    </div> */}

                    <RenderOnAuthenticated>
                        <div className='mt-3 mb-2'>
                            <button
                                className="btn btn-warning"
                                onClick={() => [UserService.doLogout(), afterLogout()]}
                            >
                                {t('log_out')}
                            </button>
                        </div>
                    </RenderOnAuthenticated>
                    <div className="mb-menu-item side-social">
                        <br></br>
                        <ul className="list-unstyled list-inline">
                            <li className="list-inline-item"><a href="https://www.facebook.com/PunjabPoliceIndia" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                            <li className="list-inline-item"><a href="https://twitter.com/PunjabPoliceInd" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                            {/* <li className="list-inline-item"><a href="https://www.linkedin.com/company/cdac" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li> */}
                            <li className="list-inline-item"><a href="https://www.instagram.com/punjabpoliceind" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.youtube.com/c/PunjabPoliceIndiaOfficial" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                        </ul>
                    </div>
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button">
                            <p>Instructor <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/instructor"}>Instructors</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/instructor-details"}>Instructor Details</Link></li>
                            </ul>
                        </div>
                    </div> */}
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button">
                            <p>Event <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/events"}>Events</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/event-details"}>Event Details</Link></li>
                            </ul>
                        </div>
                    </div> */}
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button">
                            <p>Blog <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/blog-classic"}>Blog Classic</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/blog-grid"}>Blog Grid</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/blog-details"}>Blog Details</Link></li>
                            </ul>
                        </div>
                    </div> */}
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button">
                            <p>Shop <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/products"}>Products</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/product-details"}>Product Details</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/cart"}>Cart</Link></li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </section>
            <div className="mb-sidebar-overlay" id="mb-sidebar-overlay"></div>
            <Modal
                centered show={getModalState.show} onHide={() => handleModal2()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('update_profile')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileUpdate />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleModal2()}>
                        {t('close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    )
}

export default MobileMenu