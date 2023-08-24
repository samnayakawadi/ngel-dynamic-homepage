import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Modal, Button } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/course.js';
import { Styles1 } from './styles/reviewForm.js';
import service from '../../services/service';
import UserService from '../../services/UserService';
import ReplyForm, { Replyform } from './components/ReplyForm';
import UpdateReviewform from './components/UpdateReviewForm';
import { Styles2 } from '../courses/styles/courseAccordian.js';
import { useHistory } from 'react-router-dom';
import RenderOnAuthenticated from '../account/RenderOnAuthenticated';
import RenderOnAnonymous from '../account/RenderOnAnonymous';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import Modal1 from "react-modal";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DataTableAssessment from '../assessment/DataTableAssessment';//
import DiscussionMain from '../discussion/DiscussionMain';
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { Spinner } from 'react-bootstrap';
import CourseFeedback from '../account/CourseFeedback';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import AssignmentMain from '../assignment/AssignmentMain';
import { FacebookIcon, FacebookShareButton, LinkedinShareButton, TwitterIcon, TwitterShareButton, LinkedinIcon, WhatsappIcon, WhatsappShareButton } from 'react-share';
import DiscussionMain1 from '../discussion/DiscussionMain1';
import Timer from 'react-compound-timer';

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

function CourseDetails(props) {

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
    Modal1.setAppElement('*');
    const history = useHistory();

    let courseId = props.match.params.id;
    let tenantId = props.match.params.tid;
    let mainurl = "http://ngel1.hyderabad.cdac.in/course-details/";
    let url = mainurl + courseId + '/' + tenantId;
    let sessionId = UserService.getSessionId();
    const um_api = UserService.USER_API;
    ////console.log(um_api);

    // //console.log("tenantId in course details file" + tenantId);

    const [courseValue, setCourseValue] = useState({});
    const [visibility, setVisibility] = useState(true);
    const [reviewvisibility, setReviewVisibility] = useState(false);
    const [reviewvisibilitybfrlgin, setreviewvisibilitybfrlgin] = useState(false);
    const [getcourseStructure, setcourseStructure] = useState([]);
    const [assessDetails, setAssessDetails] = useState([]);
    const [getCourseAnnouncement, setCourseAnnouncement] = useState([]);
    const [apiError, setApiError] = useState();
    const [msg, setmsg] = useState();
    const [msgshow, setMsgShow] = useState(true);
    const [getCertiStatus, setCertiStatus] = useState();
    const [getCertificateURl, setCertificateURL] = useState();
    const [getInstructor, setInstructor] = useState([]);
    const [getViewModalState, setViewModalState] = useState();
    // //console.log("courseID:::" + courseId);
    useEffect(() => {
        service.getCoursesById(courseId, tenantId)
            .then(res => {
                setCourseValue(res.data);
            })
            .catch(err => {
                setmsg(t('service_maintainance_down_alert'));
            })
        service.getUserEnrollmentStatus(courseId, userId, 4, tenantId)
            .then(res => {
                if (res.data.courseEnrolled === true) {
                    setVisibility(false);
                }
                setCertiStatus(res.data.certificateGenerated);
            })
            .catch(err => {
                setmsg(t('service_maintainance_down_alert'));
            })
        service.getCourseStructure(courseId, tenantId)
            .then(res => {
                setcourseStructure(res.data)
                // //console.log("course items", getcourseStructure.items);
            }).catch(err => {
                setmsg(t('service_maintainance_down_alert'));
            })
        service.averageRating()
            .then(res => {
                setAvgRating(res.data);
            }).catch(error => setmsg(t('service_maintainance_down_alert')));

        service.courseAnnouncement(courseId, tenantId)
            .then(res => {
                setCourseAnnouncement(res.data);
            }).catch(error => setmsg(t('service_maintainance_down_alert')));

        const accordionButton = document.querySelectorAll(".accordion-button");
        accordionButton.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("active");
                const content = button.nextElementSibling;

                if (button.classList.contains("active")) {
                    content.className = "accordion-content show";
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.className = "accordion-content";
                    content.style.maxHeight = "0";
                }
            });
        });
    }, [])


    const convertDate = (dateFormat) => {
        let timestamp = Date.parse(dateFormat);
        let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
        return d;
    }

    const fee_validator = (fees) => {
        if (fees === 0) {
            return <p>Free</p>
        }
        else {
            return <p>&#8377;{fees}</p>
        }
    }

    const [getModalState2, setModalState2] = useState({
        show: false,

        path: "",
        id: ""
    })
    const [getModalState5, setModalState5] = useState({
        show: false,
        path: ""
    })

    const openModal1 = (path, id) => {
        setModalState2({ show: true, path, id });
        const stickyMenu = document.querySelector(".sticky-menu.sticky");
        stickyMenu.style.display = 'none';
        document.body.style.overflow = 'hidden';

    }
    function closeModal1() {
        setModalState2(false);
        const stickyMenu = document.querySelector(".sticky-menu");
        stickyMenu.style.display = 'block';
        document.body.style.overflow = 'unset';
        window.addEventListener("scroll", () => {
            const stickyMenu = document.querySelector(".sticky-menu");
            if (window.scrollY > 160) {
                stickyMenu.style.display = 'block';
                stickyMenu.classList.add("sticky");
            } else {
                stickyMenu.style.display = 'none';
                stickyMenu.classList.remove("sticky");
            }
        });
    }

    const customStyles1 = {
        content: {
            position: 'fixed',
            left: 2,
            right: 2,
            top: 2,
            bottom: 2,
            background: 'none',
            backgroundColor: 'white',
            padding: '0px',
        },
    };

    let title = '';
    const gettitle = (b) => {
        title = b
    }

    const learnningAnalyticsContentAccess = (resid, restitle, userid, courseid, sessionId, fileType) => {
        var params = new URLSearchParams();
        params.append("resId", resid)
        params.append("resTitle", restitle)
        params.append("userID", userid)
        params.append("courseID", courseid)
        params.append("sessionID", sessionId)
        params.append("fileType", fileType)
        axios({
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: params,
            url: 'http://tmis1.hyderabad.cdac.in/EventAnalytics/resources/generic/saveResourceclickdetails_BPRD',
        })
    }

    const learnningAnalyticsContentUpdate = (userid, sessionId) => {
        var params = new URLSearchParams();
        params.append("uid", userid)
        params.append("sessionID", sessionId)
        axios({
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: params,
            url: 'http://tmis1.hyderabad.cdac.in/EventAnalytics/resources/generic/UpdateResourceclickAcessdetails_MPA',
        })
    }

    const recursion = abc => Object.entries(abc).map(([a, b, c]) => {
        let id = abc.identifier;
        let titles = abc.title;
        let fileType = abc.type;
        if (a === 'title')
            return gettitle(b)
        if (a === 'duration')
            return <span className="lecture-duration">Duration {b}</span>
        if (a === 'type') {
            if (b === 'youtube') {
                return <span><i style={{ border: "0px" }} className="fab fa-youtube"></i></span>
            }
            else if (b === 'pdf') {
                return <span><i style={{ border: "0px" }} className="las la-file-pdf"></i></span>
            } else if (b === 'html') {
                return <span><i style={{ border: "0px" }} className="lab la-html5"></i></span>
            } else if (b === 'video') {
                return <span><i style={{ border: "0px" }} className="las la-video"></i></span>
            }
        }

        if (a === 'resourcePath') {
            let path = b
            return <span>
                {visibility == true ?
                    <button type="primary" className="btn btn-default" onClick={() => openModal1(path, id)} disabled={true}>{title}</button>
                    :
                    <button type="primary" className="btn btn-default" onClick={() => [openModal1(path, id), learnningAnalyticsContentAccess(id, titles, userId, courseId, sessionId, fileType)]}>{title}</button>
                }
                {/* <Modal size="lg" show={getModalState2.show} onHide={() => handleModal4}>
                    <iframe src={`http://megh3.hyderabad.cdac.in/MeghSikshak_Public/other/TenantResources/Tenant${tenantId}/published%20Courses/${courseId}/${getcourseStructure.identifier}/${getModalState2.path}`} width="800" height="800" />
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleModal4()}>
                            X
                    </Button>
                    </Modal.Footer>
                   
                </Modal> */}
                <Modal1 isOpen={getModalState2.show} style={customStyles1}>
                    <Container style={{ maxWidth: '100%' }}>
                        <Row>
                            <Col>
                                <iframe src={`http://tmis1.hyderabad.cdac.in/MeghSikshak_NGEL/other/TenantResources/Tenant${tenantId}/published%20Courses/${courseId}/${getcourseStructure.identifier}/${getModalState2.path}`} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="1875" height="600" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6}>
                                <br></br>
                                {/* <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={getModalState2.id} /> */}
                                <DiscussionMain1 courseid={courseId} tenantid={tenantId} userid={userId} itemid={getModalState2.id} useremail={userEmail} />
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                        <Row>
                            <Col sm={5}></Col>
                            <Col sm={2} style={{ textAlign: 'center' }}><a href="#"><i className="las la-window-close" onClick={() => [closeModal1(), learnningAnalyticsContentUpdate(userId, sessionId)]} style={{ fontSize: "35px", color: "green" }}></i></a></Col>
                            <Col sm={5}></Col>
                        </Row>
                    </Container>
                </Modal1>
            </span>
        }
        if (Array.isArray(b))
            return <li>
                <span className="play-icon"><i className="las la-play"></i>{b.map(recursion)}</span></li>
        return [];
    }).flat(Infinity);


    const enrollCourseHandler = (uid, cid) => {
        if (service.postUserEnrollment(uid, cid, 0, tenantId)
            .then(res => {
                // //console.log("Success" + res.status);
            })
            .catch(err => {
                //console.log(err);
            })) {
            swal(t('course_enrolled_successfully'), t('course_enrolled_successfully_alert'), "success");
            setVisibility(false);
        }
    }




    const [getModalState, setModalState] = useState({
        show: false
    })


    const [getModalState1, setModalState1] = useState({
        show: false
    })

    const [getcourseId, setCourseId] = useState(0);
    const [getRating, setRating] = useState([]);
    const [getreviewText, setReviewText] = useState(0)
    const [getreviewId, setreviewId] = useState(0)
    const [getureviewId, setureviewId] = useState(0)

    const [getstarrate, setstarrate] = useState(0)
    let userId = UserService.getUserid();
    let username = UserService.getUsername();
    let userEmail = UserService.getEmail();
    let id = 12;

    let reviewId = { getreviewId }

    const state = {
        rating: '',
        reviewText: '',
        learnerId: userId,
        itemId: courseId,
        reviewStatus: 'Done',
        reviewType: 1,
        ratingError: '',
        reviewTextError: '',
        tenantId: tenantId,

    }

    const [getRate, setRate] = useState(state);

    // useEffect(() => {
    //     const form = document.getElementById("form6");
    //     const desc = document.getElementById("desc6");
    //     function setError(input, message) {
    //         const formControl = input.parentElement;
    //         const errorMsg = formControl.querySelector(".input-msg6");
    //         formControl.className = "form-control error";
    //         errorMsg.innerText = message;
    //     }
    //     function setSuccess(input) {
    //         const formControl = input.parentElement;
    //         formControl.className = "form-control success";
    //     }
    // }, []);

    const validate = () => {
        let ratingError = '';
        let reviewTextError = '';
        if (!getRate.rating) {
            ratingError = t('rating_cannot_be_blank');
        }
        if (ratingError != '') {
            setRate({ ...getRate, ratingError });
            return false;
        }
        if (!getRate.reviewText) {
            reviewTextError = t('comment_cant_be_blank');
        }
        if (reviewTextError != '') {
            setRate({ ...getRate, reviewTextError });
            return false;
        }
        return true;
    }

    const [loading, setLoading] = useState();
    const saverating = () => {
        setLoading(true);
        if (validate()) {
            let review = { rating: getRate.rating, reviewText: getRate.reviewText, learnerId: getRate.learnerId, itemId: getRate.itemId, reviewStatus: getRate.reviewStatus, reviewType: getRate.reviewType, tenantId: getRate.tenantId, reviewId: 0 };
            service.createrating(review).then(async response => {
                setLoading(false);
                await swal(t('review_submited_succesfully'), t('review_submited_succesfully_alert'), "success");
                refreshPage();
            }).catch(err => {
                //console.log(err);
            });
        }
    }


    useEffect(() => {
        const courseButton = document.querySelectorAll(".course-button");
        courseButton.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("active");
                const content = button.nextElementSibling;

                if (button.classList.contains("active")) {
                    content.className = "course-content show";
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.className = "course-content";
                    content.style.maxHeight = "0";
                }
            });
        });

        service.getoverallRating(courseId, tenantId)
            .then(res => {
                setRating(res.data.filter(function (ele) {
                    return ele.tenantId == tenantId
                }))
                _checkthis(res.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }, []);


    function _checkthis(_thisrating) {
        {
            _thisrating.map((item) => {
                if (item.learnerId == userId) {
                    setReviewVisibility(true);
                }
                if (userId == undefined) {
                    setreviewvisibilitybfrlgin(true);
                }
            })
        }
    }
    const handleModal = (rrId) => {
        setModalState({ show: true })
        setreviewId(rrId);
        //alert("reviewID:::::" + rrId);
    }

    const handleModal2 = () => {
        setModalState({ show: false })
    }

    const handleModal3 = () => {
        setModalState1({ show: false })
    }
    const handleModal4 = () => {
        setModalState2({ show: false })
    }

    const handleModal5 = () => {
        setModalState5({ show: false })
    }



    const UpdateReview = (reviewText, starrating, urid, userId) => {
        // //console.log("starrating:", starrating);
        setModalState1({ show: true })
        setReviewText(reviewText);
        setstarrate(starrating);
        setCourseId(courseId);
        setureviewId(urid);

    }

    const refreshPage = () => {
        //alert("check");
        window.location.reload();
    }



    const DeleteReview = (reviewId) => {
        //setModalState5({ show: true })
        service.deleterating(reviewId)
            .then(async res => {
                await swal(t('review_deleted_successfully'), t('You_can_check_in_the_reviews'), "success");
                refreshPage();
            })
            .catch(err => {
                //console.log(err);
            })
        //swal("Review deleted  Successfully!", "You can check in the  Reviews!", "success");




    }
    //end of review code


    const [show, setShow] = useState(false)

    //scrolling 
    const scrollWin = () => {
        window.scrollTo(0, 290);
    }

    const [getAvgRating, setAvgRating] = useState([]);

    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }

    const [getAnnouncmentModal, setAnnouncementModal] = useState(false);
    const [announcementData, setAnnouncementData] = useState({
        title: '',
        body: '',
        date: ''
    })
    const AnnouncementModal = (title, body, date) => {
        setAnnouncementData({ title: title, body: body, date: date })
        setAnnouncementModal(true);
    }
    const openFeedback = (typeid, cid) => {
        history.push(`${process.env.PUBLIC_URL + "/feedback/"}${typeid}/${cid}`);
    }

    const certificateDownload = () => {
        axios({
            method: 'post',
            url: `http://10.244.3.218:8085/CourseCatalouge/certificate?tenantId=${tenantId}&courseId=${courseId}&emailId=${userId}&name=${username}`,
            responseType: 'blob'
        })
            .then((res) => {
                const file = new Blob(
                    [res.data],
                    { type: 'application/pdf' });
                // const fileURL = URL.createObjectURL(file);
                // fileURL.download = "certificate";
                //setCertificateURL(fileURL);
                const url = URL.createObjectURL(file);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${courseValue.courseName} Certificate.pdf`;
                a.click();
            })
    }

    const certificateView = () => {
        setViewModalState(true);
        axios({
            method: 'post',
            url: `http://10.244.3.218:8085/CourseCatalouge/certificate?tenantId=${tenantId}&courseId=${courseId}&emailId=${userId}&name=${username}`,
            responseType: 'blob'
        })
            .then((res) => {
                const file = new Blob(
                    [res.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                setCertificateURL(fileURL);
            })
    }

    const [getInstructorImg, setInstructorImg] = useState({
        img: um_api + "getprofilepic/"
    });

    const instructorData = () => {
        service.getInstructorDetails(courseId, tenantId)
            .then((res) => {
                setInstructor(res.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }
    return (
        <div className="main-wrapper course-details-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            < HeaderTwo />

            {/* Breadcroumb */}
            < BreadcrumbBox title={t('course_details')} />

            <Styles>
                {/* Course Details */}
                {msg == null ? null :
                    <Toast show={msgshow} style={{ right: 0, backgroundColor: '#17a2b8', color: 'white', width: '300px' }} className="position-absolute top-0 end-0 m-4" onClose={() => setMsgShow(false)} delay={5000} autohide>
                        <Toast.Header style={{ fontSize: '15px' }}>
                            <i class="las la-info-circle"></i>
                            <strong className="mr-auto">{t('info')}</strong>
                            <small>{t('just_now')}</small>
                        </Toast.Header>
                        <Toast.Body >
                            {msg}
                        </Toast.Body>
                    </Toast>
                }
                <section className="course-details-area">
                    <Container>
                        <Row>
                            <Col lg="8" md="7" sm="12">
                                <div className="course-details-top">
                                    <div className="heading">
                                        <h4>{courseValue.courseName}</h4>
                                    </div>
                                    <div className="course-top-overview">
                                        <div className="d-flex overviews">
                                            {/* <div className="author">
                                                <img src={process.env.PUBLIC_URL + `/assets/images/author.jpg`} alt="" />
                                                <i className="las la-chalkboard-teacher" style={{ fontSize: "32px", marginLeft: "10px" }}></i>
                                                <div className="author-name">
                                                    <h6>{t('author')}</h6>
                                                    <p>-</p>
                                                </div>
                                            </div> */}
                                            <div className="category">
                                                <h6>{t('category')}</h6>
                                                <p>{courseValue.courseCategory ? courseValue.courseCategory.categoryName : null}</p>
                                            </div>
                                            <div className="rating">
                                                <h6>{t('rating')}</h6>
                                                <ul className="list-unstyled list-inline">
                                                    {
                                                        getAvgRating.map((d) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 1 ?
                                                                            <>
                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                            </>
                                                                            : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 1.1 || d.avgScore == 1.2 || d.avgScore == 1.3 || d.avgScore == 1.4 || d.avgScore == 1.5 || d.avgScore == 1.6 || d.avgScore == 1.7 || d.avgScore == 1.8 || d.avgScore == 1.9 ?
                                                                                <>
                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                    <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                </>

                                                                                : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 2 ?
                                                                                    <>
                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                    </>

                                                                                    : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 2.1 || d.avgScore == 2.2 || d.avgScore == 2.3 || d.avgScore == 2.4 || d.avgScore == 2.5 || d.avgScore == 2.6 || d.avgScore == 2.7 || d.avgScore == 2.8 || d.avgScore == 2.9 ?
                                                                                        <>
                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                        </>
                                                                                        : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 3 ?
                                                                                            <>
                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            </>
                                                                                            : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 3.1 || d.avgScore == 3.2 || d.avgScore == 3.3 || d.avgScore == 3.4 || d.avgScore == 3.5 || d.avgScore == 3.6 || d.avgScore == 3.7 || d.avgScore == 3.8 || d.avgScore == 3.9 ?
                                                                                                <>
                                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                </>
                                                                                                : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 4 ?
                                                                                                    <>
                                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    </>
                                                                                                    : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 4.1 || d.avgScore == 4.2 || d.avgScore == 4.3 || d.avgScore == 4.4 || d.avgScore == 4.5 || d.avgScore == 4.6 || d.avgScore == 4.7 || d.avgScore == 4.8 || d.avgScore == 4.9 ?
                                                                                                        <>
                                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                        </>
                                                                                                        : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 5 ?
                                                                                                            <>
                                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            </>
                                                                                                            : null : null : null : null : null : null : null : null : null : null
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div className="price">
                                                <h6>{t('course_fee')}</h6>
                                                {fee_validator(courseValue.course_Fee)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course-details-banner">
                                        <img src={`http://tmis1.hyderabad.cdac.in/MeghSikshak_NGEL/${courseValue.courseSchedule ? courseValue.courseSchedule.imageUrl : null}`} alt="" className="img-fluid" style={{ height: 425, width: 825 }} />
                                    </div>
                                    <div className="course-tab-list">
                                        <Tab.Container defaultActiveKey="overview">
                                            <Nav className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="overview">{t('overview')}</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="curriculum">Course Structure</Nav.Link>
                                                </Nav.Item>
                                                <RenderOnAuthenticated>
                                                    {visibility ?
                                                        null
                                                        :
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="assessment">{t('assessment')}</Nav.Link>
                                                        </Nav.Item>
                                                    }
                                                </RenderOnAuthenticated>
                                                <Nav.Item>
                                                    <Nav.Link onClick={() => instructorData()} eventKey="instructor">{t('instructors')}</Nav.Link>
                                                </Nav.Item>
                                                <RenderOnAuthenticated>
                                                    {visibility ?
                                                        null
                                                        :
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="feedback">{t('feedback')}</Nav.Link>
                                                        </Nav.Item>
                                                    }
                                                </RenderOnAuthenticated>
                                                {/* <RenderOnAuthenticated>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="discussion">Discussion</Nav.Link>
                                                    </Nav.Item>
                                                </RenderOnAuthenticated> */}
                                                <Nav.Item>
                                                    <Nav.Link eventKey="review">{t('reviews')}</Nav.Link>
                                                </Nav.Item>
                                                <RenderOnAuthenticated>
                                                    {visibility ?
                                                        null
                                                        :
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="assignment">{t('assignment')}</Nav.Link>
                                                        </Nav.Item>
                                                    }
                                                </RenderOnAuthenticated>
                                                {getCertiStatus ?
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="certificate">{t('certificate')}</Nav.Link>
                                                    </Nav.Item>
                                                    : null
                                                }
                                            </Nav>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="overview" className="overview-tab">
                                                    <div className="course-desc">
                                                        <h5>{t('course_description')}</h5>
                                                        <p>{ReactHtmlParser(ReactHtmlParser(courseValue.generalDetails))}</p>
                                                    </div>
                                                    <div className="course-feature">
                                                        <h5>{t('course_prerequisite')}</h5>
                                                        <p>{ReactHtmlParser(ReactHtmlParser(courseValue.prerequisite))}</p>


                                                    </div>

                                                    <div className="course-share">
                                                        <h5>{t('share_this_course')}</h5>
                                                        <ul className="social list-unstyled list-inline">
                                                            {/* <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-facebook-f"></i></a></li>
                                                            <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-twitter"></i></a></li>
                                                            <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-linkedin-in"></i></a></li> */}
                                                            <li className="list-inline-item">
                                                                <FacebookShareButton url={url} quote={"Share this course"} >
                                                                    <FacebookIcon logoFillColor="white" round={true} size={32}></FacebookIcon>
                                                                </FacebookShareButton>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <TwitterShareButton url={url} quote={"Share this course"}>
                                                                    <TwitterIcon logoFillColor="white" round={true} size={32}></TwitterIcon>
                                                                </TwitterShareButton>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <LinkedinShareButton url={url} quote={"Share this course"}>
                                                                    <LinkedinIcon logoFillColor="white" round={true} size={32}></LinkedinIcon>
                                                                </LinkedinShareButton>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <WhatsappShareButton url={url} title="Share course">
                                                                    <WhatsappIcon logoFillColor="white" round={true} size={32}></WhatsappIcon>
                                                                </WhatsappShareButton>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="curriculum" className="curriculum-tab">
                                                    {/* <div className="course-curriculum">
                                                        <h5>Course Curriculum</h5>
                                                        <p>{ReactHtmlParser(ReactHtmlParser(courseValue.generalDetails))}</p>
                                                    </div> */}

                                                    <Styles2>

                                                    </Styles2>

                                                    <div className="course-element">
                                                        <h5>{getcourseStructure.title}</h5>
                                                        {getcourseStructure.items ? getcourseStructure.items.map((chapter) => {
                                                            return (
                                                                <div className="course-item">
                                                                    <button className="course-button active">{chapter.title}</button>
                                                                    <div className="course-content show">
                                                                        <ul className="list-unstyled">

                                                                            {chapter.items ? chapter.items.map((cont) => {
                                                                                return (
                                                                                    <div>
                                                                                        {/* {//console.log("pradeep", recursion(cont))} */}
                                                                                        <RenderOnAuthenticated>
                                                                                            <li>
                                                                                                <span className="play-icon"><i className="las la-play"></i>
                                                                                                    {recursion(cont)}
                                                                                                </span>
                                                                                            </li>
                                                                                        </RenderOnAuthenticated>
                                                                                    </div>
                                                                                )
                                                                            }) : null}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }) : null}
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="assessment" className="assessment-tab">
                                                    {/* <div className="assessment-desc">
                                                        <h5>ASSIGNED QUIZZES</h5>
                                                        <p>Hello<Button onClick={openModal}>open</Button></p>
                                                    </div> */}
                                                    <RenderOnAuthenticated>
                                                        <DataTableAssessment tenantId={tenantId} courseId={courseId} />                                                   </RenderOnAuthenticated>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="instructor" className="instructor-tab">
                                                    <h5>{t('course_instructors')}</h5>
                                                    <div className="instructor-item">
                                                        {
                                                            getInstructor.map((data, i) => {
                                                                return (
                                                                    <Row>
                                                                        <Col md="4">
                                                                            <div className="instructor-img">
                                                                                <img src={`${getInstructorImg.img}${data.learnerUsername}`} alt="" className="img-fluid" />
                                                                            </div>
                                                                        </Col>
                                                                        <Col md="8">
                                                                            <div className="instructor-content">
                                                                                <div className="instructor-box">
                                                                                    <div className="top-content d-flex justify-content-between">
                                                                                        <div className="instructor-name">
                                                                                            <h6>{data.firstName}</h6>
                                                                                            <p>{data.designation}</p>
                                                                                        </div>
                                                                                        <div className="instructor-social">
                                                                                            <ul className="social list-unstyled list-inline">
                                                                                                {data.facebookId === "" ? null :
                                                                                                    <li className="list-inline-item"><a target="_blank" href={data.facebookId}><i className="fab fa-facebook-f"></i></a></li>
                                                                                                }
                                                                                                {data.twitterId === "" ? null :
                                                                                                    <li className="list-inline-item"><a href={data.twitterId}><i className="fab fa-twitter"></i></a></li>
                                                                                                }
                                                                                                {data.linkedinId === "" ? null :
                                                                                                    <li className="list-inline-item"><a href={data.linkedinId}><i className="fab fa-linkedin-in"></i></a></li>
                                                                                                }
                                                                                                {data.youtubeId === "" ? null :
                                                                                                    <li className="list-inline-item"><a href={data.youtubeId}><i className="fab fa-youtube"></i></a></li>
                                                                                                }
                                                                                                {data.skypeId === "" ? null :
                                                                                                    <li className="list-inline-item"><a href={data.skypeId}><i className="fab fa-skype"></i></a></li>
                                                                                                }
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="instructor-desk">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="feedback">
                                                    <CourseFeedback typeid={1} cid={courseId} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="review" className="review-tab">
                                                    <Row>

                                                        <div className="review-comments">
                                                            <h5>{t('course_reviews')}</h5>
                                                            <div className="comment-box d-flex">
                                                                <div className="comment-image">

                                                                    {getRating.map((rate) => {
                                                                        // const timestamp = Date.now(
                                                                        // const date=Date()
                                                                        const timestamp = Date.parse(rate.creationTime);
                                                                        //alert("date"+(rate.creationTime)
                                                                        const starrating = (rate.rating)
                                                                        return (
                                                                            <>

                                                                                <div className="comment-content">
                                                                                    <Row>
                                                                                        <Col md="4">
                                                                                            <img title="profile pic" height="100" width="100" src={rate.profilePicUrl} />
                                                                                        </Col>
                                                                                        <Col md="8">
                                                                                            <div className="content-title d-flex justify-content-between">
                                                                                                <div className="comment-writer">
                                                                                                    <h6>{rate.firstName} {rate.lastName}</h6>
                                                                                                    <p>{new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)}</p>
                                                                                                    <ul className="list-unstyled list-inline">
                                                                                                        {rate.rating == 1 ?
                                                                                                            <>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                                            </>
                                                                                                            : rate.rating == 2 ?
                                                                                                                <>
                                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                                                </>
                                                                                                                : rate.rating == 3 ?
                                                                                                                    <>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                                                    </>
                                                                                                                    : rate.rating == 4 ?
                                                                                                                        <>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                                                        </>
                                                                                                                        : rate.rating == 5 ?
                                                                                                                            <>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                                                            </>
                                                                                                                            : null}
                                                                                                    </ul>
                                                                                                </div>

                                                                                                {rate.learnerId == userId ?
                                                                                                    <>
                                                                                                        <div className="reply-btn">
                                                                                                            <button type="button" onClick={() => UpdateReview(rate.reviewText, rate.rating, rate.reviewId, userId)}><i className="las la-edit"></i> </button>
                                                                                                        </div>
                                                                                                        &nbsp;&nbsp;&nbsp;
                                                                                                        <div className="reply-btn">
                                                                                                            <button type="button" onClick={() => {
                                                                                                                DeleteReview(rate.reviewId);
                                                                                                            }}><i className="las la-trash-alt"></i></button>
                                                                                                        </div>
                                                                                                    </>
                                                                                                    : null}
                                                                                            </div>
                                                                                            <div className="comment-desc">
                                                                                                <p>{rate.reviewText}</p>
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                                <br></br>
                                                                                <br></br>
                                                                                <br></br>
                                                                            </>
                                                                        );

                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {reviewvisibility == true || reviewvisibilitybfrlgin == true ?
                                                            <>
                                                                <section className="registration-area" id="formRegistration">
                                                                    <Container>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <div className="registration-box">
                                                                                    <div className="registration-title text-center">
                                                                                        {/* <h3>Review Already Submitted for this Course </h3> */}
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </section>
                                                            </>

                                                            : visibility == false ?
                                                                <>
                                                                    <div className="review form" >
                                                                        <h5>{t('submit_review')}</h5>
                                                                        {/* <ReviewForm  reviewId={getreviewId}/> */}
                                                                        <Styles1>
                                                                            <form id="form6" className="form review-comment-form">
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <div className="star-rating">
                                                                                            <input type="radio" name="rating" value="5" defaultValue={getRate.rating} onChange={e => setRate({ ...getRate, rating: e.target.value })} id="rate-5" />
                                                                                            <label htmlFor="rate-5" className="las la-star"></label>
                                                                                            <input type="radio" value="4" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-4" />
                                                                                            <label htmlFor="rate-4" className="las la-star"></label>
                                                                                            <input type="radio" value="3" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-3" />
                                                                                            <label htmlFor="rate-3" className="las la-star"></label>
                                                                                            <input type="radio" value="2" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-2" />
                                                                                            <label htmlFor="rate-2" className="las la-star"></label>
                                                                                            <input type="radio" value="1" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-1" />
                                                                                            <label htmlFor="rate-1" className="las la-star"></label>
                                                                                        </div>
                                                                                        <div>
                                                                                            <p style={{ fontSize: 12, color: "red" }}>
                                                                                                {getRate.ratingError}
                                                                                            </p>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col md="12">
                                                                                        <p className="form-control">
                                                                                            <textarea name="reviewText"
                                                                                                //defaultValue={getreviewText} 
                                                                                                id="desc6" onChange={e => setRate({ ...getRate, reviewText: e.target.value })} placeholder="Enter your review"></textarea>
                                                                                            <span className="input-msg6"></span>
                                                                                        </p>
                                                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                                                            {getRate.reviewTextError}
                                                                                        </p>
                                                                                    </Col>

                                                                                    <Col md="12">
                                                                                        {loading ? <button type="button" ><div class="spinner-border" role="status">
                                                                                            <span class="sr-only">Loading...</span>
                                                                                        </div>  Submitting Review</button>
                                                                                            : <button type="button" onClick={() => { saverating() }}>Submit Review</button>}
                                                                                    </Col>
                                                                                </Row>
                                                                            </form>
                                                                        </Styles1>
                                                                    </div>
                                                                </>
                                                                : null}
                                                        <br></br>
                                                        <br></br>
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="assignment" >
                                                    <AssignmentMain userId={userId} courseId={courseId} tenantId={tenantId} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="certificate" >

                                                    <Button variant="outline-info" onClick={() => certificateDownload()}>Download <i class="las la-download la-lg"></i></Button>       <Button variant="outline-info" onClick={() => certificateView()}>View <i class="las la-eye la-lg"></i></Button>
                                                    {/* <iframe src={getCertificateURl} width="725px" height="800px" /> */}
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="4" md="5" sm="12">
                                <div className="single-details-sidbar">
                                    <Row>
                                        <Col md="12">
                                            <div className="course-details-feature">
                                                <h5 className="title">{t('course_details')}</h5>
                                                <div className="event-sidebar-timer text-center">
                                                    <Timer initialTime={1040 * 970 * 980} direction="backward">
                                                        <p><Timer.Days /><span>Days</span></p>
                                                        <p><Timer.Hours /><span>Hours</span></p>
                                                        <p><Timer.Minutes /><span>Minutes</span></p>
                                                    </Timer>
                                                </div>
                                                <ul className="list-unstyled feature-list">
                                                    <li><i className="far fa-calendar-check"></i> {t('enrollment_start_date')}: <span>{courseValue.courseSchedule ? convertDate(courseValue.courseSchedule.enrollSdate) : null}</span></li>
                                                    <li><i className="far fa-calendar-check"></i> {t('enrollment_end_date')}: <span>{courseValue.courseSchedule ? convertDate(courseValue.courseSchedule.enrollEdate) : null}</span></li>
                                                    <li><i className="far fa-calendar-check"></i> {t('course_start_date')}: <span>{courseValue.courseSchedule ? convertDate(courseValue.courseSchedule.commencementDate) : null}</span></li>
                                                    <li><i className="far fa-calendar-check"></i> {t('course_end_date')}: <span>{courseValue.courseSchedule ? convertDate(courseValue.courseSchedule.courseClosingDate) : null}</span></li>
                                                    <li><i className="far fa-clock"></i> {t('duration')}: <span>{courseValue.duration} Days</span></li>
                                                    <li><i className="fas fa-globe-asia"></i> {t('language1')}: <span>{t('english')}</span></li>
                                                    {/* <li><i className="las la-sort-amount-up"></i> Skill Level: <span>Beginner</span></li> */}
                                                    {/* <li><i className="las la-graduation-cap"></i> Subject: <span>Web</span></li> */}
                                                    {/* <li><i className="las la-book"></i> Lectures: <span>51</span></li> */}
                                                    <li><i className="far fa-bookmark"></i> {t('enrolled')}: <span>{courseValue.enrolledUsers}</span></li>
                                                    <li><i className="fas fa-certificate"></i> {t('certification')}: <span>{t('yes')}</span></li>
                                                </ul>
                                                <RenderOnAnonymous>
                                                    <button type="button" className="enroll-btn" onClick={UserService.doLogin}>{t('please_login_to_enroll_this_course')}</button>
                                                </RenderOnAnonymous>
                                                <RenderOnAuthenticated>
                                                    {
                                                        visibility === true ?
                                                            <button type="button" className="enroll-btn" onClick={() => enrollCourseHandler(userId, courseId)}>{t('enroll_course')}</button> :
                                                            <button type="button" className="enroll-btn" onClick={() => enrollCourseHandler(userId, courseId)} disabled={true}>{t('already_enrolled')}</button>
                                                    }
                                                </RenderOnAuthenticated>
                                            </div>
                                        </Col>
                                        <Col md="12">
                                            {/* <PopularCourse /> */}
                                        </Col>
                                        <RenderOnAuthenticated>
                                            <Col md="12" >
                                                <div className="course-details-feature">
                                                    <h5 className="title">{t('announcement')} <i style={{ marginLeft: '110px' }} className="las la-bullhorn la-lg "></i>{getCourseAnnouncement.length == 0 ? null : <span className="badge">{getCourseAnnouncement.length}</span>}</h5>
                                                    {getCourseAnnouncement.length === 0 ? <li style={{ fontWeight: 'bold' }} className="noti-text">No Announcment</li> :
                                                        <ul className="list-unstyled feature-list" style={{ overflowY: 'auto', height: "250px" }}>
                                                            {getCourseAnnouncement.map((data) => {
                                                                return (
                                                                    <li className="noti-text" onClick={() => AnnouncementModal(data.title, data.body, dateConverter(data.publihFrom))}>{data.title}</li>
                                                                )
                                                            })}
                                                        </ul>
                                                    }
                                                </div>
                                            </Col>
                                        </RenderOnAuthenticated>
                                    </Row>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </section>
                <Modal
                    centered show={getModalState.show} onHide={() => handleModal2()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Provide the reply
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReplyForm rrId={getreviewId} />
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
                <Modal
                    centered show={getModalState1.show} onHide={() => handleModal3()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Provide the update
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateReviewform reviewdata={getreviewText} starrating={getstarrate} courseid={getcourseId} ureviewid={getureviewId} learnerId={userId} tenantId={tenantId} />
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
                <Modal
                    centered show={getModalState5.show} onHide={() => handleModal5()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {t('review_deleted_successfully')}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
                <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={getAnnouncmentModal} backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {announcementData.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {ReactHtmlParser(ReactHtmlParser(announcementData.body))}
                    </Modal.Body>
                    <Modal.Footer>
                        <span style={{ fontSize: '10px', position: 'sticky' }}>{announcementData.date}</span>
                        <Button onClick={() => setAnnouncementModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={getViewModalState}
                >
                    <Modal.Header>
                        {/* <Modal.Title id="contained-modal-title-vcenter">
                            
                        </Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <iframe src={getCertificateURl} width="765px" height="800px" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setViewModalState(false)} className="btn btn-danger">Close</Button>
                    </Modal.Footer>
                </Modal>
            </Styles>

            {/* Footer 2 */}
            <FooterTwo />

        </div >
    )
}

export default CourseDetails
