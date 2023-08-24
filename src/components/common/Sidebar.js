import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Styles } from "./styles/sidebar.js";
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated';
import UserService from '../../services/UserService';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import ProfileUpdate from '../User/ProfileUpdate'
import service from '../../services/service';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import swal from 'sweetalert';
import RenderOnRole from '../../pages/account/RenderOnRole.jsx';
import RenderOnInstructor from '../../pages/account/RenderOnInstructor.jsx';
import RenderOnLearner from '../../pages/account/RenderOnLearner.jsx';
import logo from "../../../src/assets/images/logo.png"
import resume from "../../../src/assets/images/resume.png";

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
function Sidebar(props) {

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
    const [getModalState, setModalState] = useState({
        show: false
    });
    const [stateLoading, setStateLoading] = useState();
    const [condition, setCondition] = useState()





    const um_api = UserService.USER_API;
    ////console.log(um_api);



    useEffect(() => {
        const sidebarBtn = document.getElementById("sidebar-btn");

        if (sidebarBtn) {
            const sidebarOverlay = document.getElementById("sidebar-overlay");
            const sidebarBody = document.getElementById("sidebar-body");
            const sidebarExit = document.getElementById("close-sidebar");

            sidebarBtn.addEventListener("click", function (e) {
                e.preventDefault();
                sidebarOverlay.classList.add("visible");
                sidebarBody.classList.add("opened");
            });

            sidebarOverlay.addEventListener("click", function (e) {
                e.preventDefault();
                sidebarOverlay.classList.remove("visible");
                sidebarBody.classList.remove("opened");
            });

            sidebarExit.addEventListener("click", function (e) {
                e.preventDefault();
                sidebarOverlay.classList.remove("visible");
                sidebarBody.classList.remove("opened");
            });
        }
    });
    const [headerState, setHeaderState] = useState({
        id: UserService.getUserid(),
        img: um_api + "getprofilepic/"
    });
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            if (UserService.isLoggedIn() === false) {
                history.push("/");
            } else {

            }
        }, 1800000);
        return () => clearInterval(interval);
    }, []);


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
        history.push("/getfeedback/");
    }
    const HandleProfileUpdateModal = () => {
        setProfileStatus({ show: false })
    }

    const [getUserDetails, setUserDetails] = useState({});
    const [getProfilePicPath, setProfilePicPath] = useState();
    const [getProfileStatus, setProfileStatus] = useState(
        { show: false }
    );


    let id = UserService.getUserid();
    const sidebarOpen = () => {
        service.getUserById(id)
            .then(res => {
                setUserDetails(res.data);
                setProfilePicPath(res.data.profilePicPath);
                //console.log(res.data);
                checkInstRequest();
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const addTestimonial = () => {
        history.push(`${process.env.PUBLIC_URL + "/addTestimonial"}`);
    }


    const afterLogout = () => {
        history.push("/")
    }

    function capitalizeFirstLetter(str) {
        let data = `${str}`;
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    const requestAsInstructor = () => {
        setStateLoading(true);
        service.requestForInstructor(UserService.getUserid())
            .then(async response => {
                // //console.log(response.data)
                if (response.status === 200) {
                    setStateLoading(false);
                    await swal(t('msg'), t('request_instructor_submitted_for_approval'), "success")
                } else {
                    setStateLoading(false);
                    swal(t('services_is_down_please_update_after_sometime'), "", "warning")
                }
            }).catch((err) => {
                setStateLoading(false);
                alert(t('services_is_down_please_update_after_sometime'))
            });
    }

    
    // useEffect(()=>{
    //     checkInstRequest();
    // },[]);

    useEffect(() => {
        if (id !== undefined) {
            service.getUserById(id)
                .then(res => {
                    setUserDetails(res.data);
                    //console.log(res.data);
                    if (res.data.placeOfPosting === null || res.data.gpfNumber === null || res.data.beltNumber === null) {
                        setProfileStatus({ show: true })
                    }
                })
                .catch(err => {
                    //console.log(err);
                })
        }
    }, [])

    const checkInstRequest = () => {
        service.checkInstructorRequest(UserService.getUserid())
            .then(async resp => {
                if (resp.data === "pending") {
                    // //console.log("PENDING")
                    setCondition("Pending")
                    // //console.log(resp.data)
                    // condition = true
                    // setCondition(<><h6 className='alert alert-warning' role="alert" >Already Request Submitted Please Wait for Mail or Contact Admin</h6></>)
                }
                else if (resp.data === "rejected") {
                    setCondition("Rejected")
                }
                // else {

                //     // setCondition(<><Button onClick={() => requestAsInstructor()} className="btn btn-light" >Request For Instructor</Button></>)
                // }
            }).catch(err => {
                //console.log(err)
            }
            );
    }

    return (

        <Styles>
            {/* Sidebar */}

            <a href={process.env.PUBLIC_URL + "/"} className="nav-link nav-sidebar" id="sidebar-btn">
                <i className="las la-bars" onClick={() => sidebarOpen()}></i>
            </a>
            <RenderOnAuthenticated>
                <div className="sidebar" id="sidebar-body">
                    <div className="side-logo d-flex justify-content-between">
                        {/* <div><Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" /></Link></div> */}
                        <div><Link to={process.env.PUBLIC_URL + "/"}><img style={{ width: "170px" }} src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" /></Link></div>
                        <div><a href={process.env.PUBLIC_URL + "/"} id="close-sidebar"><i className="las la-times"></i></a></div>
                    </div>


                    <div className="side-content" >

                        <div style={{ textAlign: 'center' }}>
                            <img style={{ width: 150, height: 150, backgroundColor: "white", border: "0px solid black", borderRadius: 150 / 2, overflow: "hidden", boxShadow: "rgb(242 208 208) 0px 0px 30px" }} src={`${headerState.img}${headerState.id}`} />
                            <a href="#" onClick={() => handleModal()}><i style={{ fontSize: 27, overflow: "hidden", backgroundColor: "white", border: '2px solid white', boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: 40 / 2, position: 'absolute', top: 241, left: 221, zIndex: 3, color: 'black' }} className="las la-camera"></i></a>
                            {/* <i style={{ width: 40, height: 40, borderRadius: 40 / 2, overflow: "hidden", borderWidth: 5, backgroundColor: "white", position:'absolute', top:230, left:200,zIndex:3}} className="las la-camera"></i> */}
                        </div>
                        <div style={{ textAlign: 'center', color: "black", paddingTop: 40 }}>
                            <h6> {t('welcome')} {capitalizeFirstLetter(getUserDetails.firstName)} {capitalizeFirstLetter(getUserDetails.lastName)} </h6>
                        </div>
                        <br></br>
                        <RenderOnAuthenticated>
                            {UserService.hasRole(['instructor']) ? <><Button onClick={() => requestAsInstructor()} className="btn btn-success" disabled >Instructor </Button></>
                                : UserService.hasRole(['admin']) ? <><Button onClick={() => requestAsInstructor()} className="btn btn-success" disabled >Admin </Button></>
                                    :
                                    <>
                                        {
                                            condition === "Pending" ? <><Button onClick={() => requestAsInstructor()} className="btn btn-secondary" disabled >{t('request_for_instructor')}</Button>
                                                <p className="text-danger">
                                                    {t('request_pending_at_administrator')}</p>
                                            </>
                                                :
                                                <>
                                                    {
                                                        condition === "Rejected" ?
                                                            <>
                                                                <Button onClick={() => requestAsInstructor()} className="btn btn-secondary" disabled >{t('request_for_instructor')} </Button>
                                                                <p className="text-danger">{t('request_is_rejected_contact_admin')}</p>
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
                                                                            <Button onClick={() => requestAsInstructor()} className="btn btn-secondary" >{t('request_for_instructor')}</Button>
                                                                        </>
                                                                }
                                                            </>
                                                        // <>
                                                        // </>
                                                    }

                                                </>

                                            // <Button onClick={() => requestAsInstructor()} className="btn btn-secondary" >Request For Instructor</Button>
                                        }
                                    </>
                            }


                            {/* // <Button onClick={() => requestAsInstructor()} className="btn btn-light" >Request For Instructor</Button>} */}
                        </RenderOnAuthenticated>

                        <ul className="list-unstyled" >
                            <li style={{ marginTop: 20 }}>
                                <h6> <i className="fa fa-key"></i>  < a href="#" style={{ color: 'black' }} onClick={event => window.location.href = 'http://ngel.hyderabad.cdac.in:8080/realms/ngel/account/password'}>{t('reset_password')}</a></h6>
                            </li>
                            <li style={{ marginTop: 20 }}>
                                <h6> <i className="fas fa-edit"></i>  < a href="#" style={{ color: 'black' }} onClick={() => userProfile(UserService.getUserid())}>{t('edit_profile')}</a></h6>
                            </li>
                            <li style={{ marginTop: 20 }}>
                                <h6> <i class="fas fa-comment"></i>  < a href="#" style={{ color: 'black' }} onClick={() => feedback()}>{t('feedback')}</a></h6>
                            </li>
                            <li style={{ marginTop: 20 }}>
                                <h6> <i class="fa fa-plus-square"></i>  < a href="#" style={{ color: 'black' }} onClick={() => addTestimonial()}>{t('add_testimonial')}</a></h6>
                            </li>
                            <li style={{ marginTop: 20 }}>
                                <h6> <i className="fas fa-sign-out-alt"></i>  < a href="#" style={{ color: 'black' }} onClick={() => [afterLogout(), UserService.doLogout()]}>{t('log_out')}</a></h6>
                            </li>
                        </ul>


                    </div>
                    <br></br>


                    <div className="side-contact">
                        {/* <h5>{t('contact_details')}</h5> */}
                        <ul className="list-unstyled">
                            <li><i className='las la-phone'></i>{getUserDetails.mobile}</li>
                            <li><i className='las la-envelope'></i>{getUserDetails.email}</li>
                        </ul>
                    </div>



                    {/* <div className="side-content">
                    <h5>About Us</h5>
                    <p>Lorem ipsum dolor sit amet, consecte adipisicing elit. Mollitia modi, nostru rem sapiente. Excepturi
                        molestiae soluta quisquam officiis iure sunt.</p>
                </div> */}
                    {/* <div className="side-post">
                    <h5>Recent Post</h5>
                    <div className="post-box d-flex">
                        <div className="post-img">
                            <img src={process.env.PUBLIC_URL + "/assets/images/post-01.jpg"} alt="" />
                        </div>
                        <div className="post-title">
                            <p>Lorem ipsum dolor sit amet, consecte adipisicing elit.</p>
                            <span>March 12, 2020</span>
                        </div>
                    </div>
                    <div className="post-box d-flex">
                        <div className="post-img">
                            <img src={process.env.PUBLIC_URL + "/assets/images/post-02.jpg"} alt="" />
                        </div>
                        <div className="post-title">
                            <p>Lorem ipsum dolor sit amet, consecte adipisicing elit.</p>
                            <span>March 12, 2020</span>
                        </div>
                    </div>
                    <div className="post-box d-flex">
                        <div className="post-img">
                            <img src={process.env.PUBLIC_URL + "/assets/images/post-03.jpg"} alt="" />
                        </div>
                        <div className="post-title">
                            <p>Lorem ipsum dolor sit amet, consecte adipisicing elit.</p>
                            <span>March 12, 2020</span>
                        </div>
                    </div>
                </div> */}
                    {/* <div className="side-gallery">
                    <h5>Gallery</h5>
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-01.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-02.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-03.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-04.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-05.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-06.jpg"} alt="" />
                </div> */}



                    {/* <div className="side-contact" style={{ marginTop: 60 }}>
                        <h5>{t('contact_us')}</h5>
                        <ul className="list-unstyled">
                            <li><i className="las la-map-marker" style={{ marginBottom: '35px' }}></i><p>{t('cdac_full_address')}</p></li>
                            <li><i className="las la-phone"></i>+91-01826-222061, 222062</li>
                            <li><i className="las la-envelope"></i>itcell.ppa@punjabpolice.gov.in</li>
                        </ul>
                    </div>
                    <div className="side-social">
                        <ul className="list-unstyled list-inline">
                            <li className="list-inline-item"><a href="https://www.facebook.com/PunjabPoliceIndia" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="https://twitter.com/PunjabPoliceInd" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                     <li className="list-inline-item"><a href="https://www.linkedin.com/company/cdac" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li> 
                                    <li className="list-inline-item"><a href="https://www.instagram.com/punjabpoliceind" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.youtube.com/c/PunjabPoliceIndiaOfficial" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                        </ul>
                    </div> */}
                </div>
            </RenderOnAuthenticated>
            <div className="sidebar-overlay" id="sidebar-overlay"></div>


            <div className="sidebar" id="sidebar-body">
                <div className="side-logo d-flex justify-content-between">
                    <div><Link to={process.env.PUBLIC_URL + "/"}><img style={{ width: "170px" }} src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" /></Link></div>
                    <div><a href={process.env.PUBLIC_URL + "/"} id="close-sidebar"><i className="las la-times"></i></a></div>
                </div>
                <div className="side-content" style={{ textAlign: "justify" }}>
                    <h5>{t('about_us')}</h5>
                    {/* <p>{t('title')}</p> */}
                    <p>{t('about_desc1')}</p>
                    <p>{t('about_desc2')}</p>
                </div>
                {/* <div className="side-post">
                    <h5>Recent Post</h5>
                    <div className="post-box d-flex">
                        <div className="post-img">
                            <img src={process.env.PUBLIC_URL + "/assets/images/post-01.jpg"} alt="" />
                        </div>
                        <div className="post-title">
                            <p>Lorem ipsum dolor sit amet, consecte adipisicing elit.</p>
                            <span>March 12, 2020</span>
                        </div>
                    </div>
                    <div className="post-box d-flex">
                        <div className="post-img">
                            <img src={process.env.PUBLIC_URL + "/assets/images/post-02.jpg"} alt="" />
                        </div>
                        <div className="post-title">
                            <p>Lorem ipsum dolor sit amet, consecte adipisicing elit.</p>
                            <span>March 12, 2020</span>
                        </div>
                    </div>
                    <div className="post-box d-flex">
                        <div className="post-img">
                            <img src={process.env.PUBLIC_URL + "/assets/images/post-03.jpg"} alt="" />
                        </div>
                        <div className="post-title">
                            <p>Lorem ipsum dolor sit amet, consecte adipisicing elit.</p>
                            <span>March 12, 2020</span>
                        </div>
                    </div>
                </div> */}
                {/* <div className="side-gallery">
                    <h5>Gallery</h5>
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-01.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-02.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-03.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-04.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-05.jpg"} alt="" />
                    <img src={process.env.PUBLIC_URL + "/assets/images/gallery-06.jpg"} alt="" />
                </div> */}
                <div className="side-contact">
                    <h5>{t('contact_us')}</h5>
                    <ul className="list-unstyled">
                        <li><i className="las la-map-marker" style={{ marginBottom: '35px' }}></i><p>{t('cdac_full_address')}</p></li>
                        <li><i className="las la-phone"></i>{t('call_us_phone')}</li>
                        <li><i className="las la-envelope"></i>{t('itcell_mail')}</li>
                    </ul>
                </div>
                <div className="side-social">
                    <ul className="list-unstyled list-inline">
                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-facebook-f"></i></a></li>
                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-twitter"></i></a></li>
                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-google"></i></a></li>
                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-linkedin-in"></i></a></li>
                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>


            <Modal
                centered show={getModalState.show} onHide={() => handleModal2()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('update_photograph')}
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

            <Modal
                centered show={getProfileStatus.show} onHide={() => HandleProfileUpdateModal()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('update_profile')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: "center" }}>
                        <img src={resume} style={{ margin: "15px" }}></img>
                        <h5>{t('kindly_update_profile')}</h5>
                        <br></br>
                        <Button style={{ background: 'green', border: "0px" }}>
                            <h6> <i className="fas fa-edit"></i>  < a href="#" style={{ color: 'white' }} onClick={() => userProfile(UserService.getUserid())}>{t('edit_profile')}</a></h6>
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={() => HandleProfileUpdateModal()}>
                        {t('close')}
                    </Button> */}
                </Modal.Footer>
            </Modal>



        </Styles>



    )
}

export default Sidebar
