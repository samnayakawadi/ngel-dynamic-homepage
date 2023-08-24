import React, { Fragment, useEffect, useMemo } from 'react';
// import {  } from 'react';
// import {  } from 'react';

import Navbar from '../../app/shared/Navbar';
import Sidebar from '../../app/shared/Sidebar';
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import learnerService from '../../services/learnerService';
import service from '../../services/service';
import UserService from '../../services/UserService';
import StickyMenu from '../common/StickyMenu';
import { Styles } from '../library/styles/coursedetails.js';
//import { Styles } from '../../pages/instructor/instCourses/styles/coursedetails.js';
//import { Styles } from '../../app/Courses/styles/course.js'
import { Accordion, Button, Card, Col, Container, Modal, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import SettingsPanel from '../../app/shared/SettingsPanel';
import Footer from '../../app/shared/Footer';
import instructorService from '../../services/instructorService';
import { colors } from '../common/element/elements';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./styles/pagination.css"

import swal from 'sweetalert';
import Videojs from '../../pages/instructor/instCourses/video.js';
import ReactPlayer from 'react-player';
import adminServices from '../../services/adminServices';
import { useState } from 'react';
import CryptoJS from "crypto-js";



const customStyles = {
    title: {
        style: {
            fontColor: 'red',
            fontWeight: '900',
        }
    },
    headCells: {
        style: {
            fontSize: '17px',
            fontWeight: '500',
            paddingLeft: '0 8px',
            marginLeft: '10px',
        },
    },
    cells: {
        style: {
            fontSize: '15px',
            // paddingLeft: '0 8px',
            // marginLeft: '10px'
        },
    },
};



function AdminViewLibraryContent(props) {

    useEffect(() => {
        UserService.generateToken();
       }, []);
       
    const um_api = UserService.USER_API;
    ////console.log(um_api);

    let courseId = props.match.params.id;
    let tenantId = 1;
    const [courseDetails, setCourseDetails] = useState([]);
    const [getRating, setRating] = useState([]);
    const [getFeedbackResponse, setfeedbackResponse] = useState([])
    const [userCount, setUserCount] = useState();
    const [getLearnerData, setlearnerData] = useState([]);
    const [getInstructorData, setInstructorData] = useState([]);
    const [getYouTubeUrl, setYouTubeUrl] = useState();
    const [contentData, setContentData] = useState([])

    const [getUrl, setUrl] = useState('')
    const [getContentType, setContentType] = useState('');
    const [getContentLabel,setContentLabel] = useState("");
    const [urlModal, setUrlModal] = useState(false);
    useEffect(() => {
        getContentList();
        // getCourseDetails();
        // fatchRatingData();
        // courseFeedbackResponses();
        // fetchPosts();
        // getUserEnrolledByCourse();
        getCourseInstructors();
    }, [])

    useEffect(() => {
        ////console.log("geturl value---", getUrl);
        ////console.log("getContentType===", getContentType);
    }, [urlModal])

    // const usersPerPage = 8;
    // const pagesVisited = pageNumber * usersPerPage;
    // const pageCount = Math.ceil(currentCourseState.length / usersPerPage);



    const getContentList = () => {
        ////console.log(courseId);
        instructorService.getLibraryContent(courseId).then((resp) => {
            ////console.log(resp.data)
            setContentData(resp.data.nodes[0].nodes)
        }).catch((err) => {
            //console.log(err)
        })
    }






    const onClickViewContent = (fileUrl, contentType,contentLabel) => {
        // setUrl();
        setContentType();
        setUrlModal(false);
        instructorService.getContentAccess(fileUrl).then((resp) => {
            ////console.log('resp.data----', resp.data);
            setUrl(resp.data);
            setContentType(contentType);
            setContentLabel(contentLabel);
            setUrlModal(true)
        }).catch((err) => {
            //console.log(err);
        })


        ////console.log(getUrl + "FILE PATH   ")




    }


    const onClickApproveButton = (id) => {
        ////console.log(id);
        adminServices.approveContent(id, courseId).then((resp) => {
            if(resp.status === 200){
                swal(`${t('success')}`, `${t('content_approve_msg')}`, "success")
                getContentList();
            }
            ////console.log(resp.data);
        }).catch((err) => {
            //console.log(err);
        })

    }

    const [contentId, setContentId] = useState()

    const [rejectError, setRejectError] = useState();

    const validateError = () => {
        let remarkErr = ''
        if (!desp) {
            remarkErr = t('field_required')
        }

        if (remarkErr) {
            setRejectError(remarkErr);
            return false;
        }
        return true;
    }

    const rejectSubmitButton = () => {
        

        const data = {
            courseId: courseId,
            contentId: contentId,
            description: desp,
        }

        ////console.log(data);

        const check = validateError();
        if (check) {
            adminServices.rejectContent(data).then((resp) => {
                if (resp.status === 200) {
                    setModalShow(false);
                    setDesp();
                    swal(`${t('success')}`, `${t('content_reject_msg')}`, "success")
                    getContentList();
                }
            }).catch((err) => {
                //console.log(err);
            })
        }

    }

    const [modalShow, setModalShow] = useState(false);
    const [desp, setDesp] = useState();
    const despHandler = (e) => {
        setDesp(e.target.value);
    }

    const onClickRejectButton = (id) => {

        setModalShow(true);
        setContentId(id);



    }
    const videoJsOptions = {
        autoplay: false,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        width: 1100,
        height: 800,
        controls: true,
        sources: [
            {
                src: `http://10.244.3.218:8080/${getUrl}`,
                type: 'video/mp4',
            },
        ]
    };



    const getCourseDetails = () => {
        learnerService.getCourseMetadataById(courseId)
            .then(res => {
                setCourseDetails(JSON.parse(res.data));
            }).catch(err => {
                //console.log(err)
            })
    }

    const getUserEnrolledByCourse = () => {
        learnerService.getUserEnrolledByCourse(courseId, tenantId)
            .then(res => {
                setlearnerData(res.data);
            }).catch(err => {
                //console.log(err)
            })
    }

    const getCourseInstructors = () => {
        learnerService.getCourseInstructors(courseId, tenantId)
            .then(res => {
                setInstructorData(res.data);
            }).catch(err => {
                //console.log(err)
            })
    }

    const fatchRatingData = async () => {
        try {
            const res = await service.getoverallRating(courseId, tenantId);
            setRating(res.data);
        } catch (e) {
            //console.log(e)
        }
    }
    const [courseState, setCourseState] = useState([]);
    const fetchPosts = async () => {



        setLoading(true);
        ////console.log(courseId + "++++++++++++++++++");
        const res = await instructorService.getLibraryContent(courseId);
        ////console.log(res.data.nodes[0].duration + "+++++++++++++++================");
        setCourseState(res.data);

        setPaidJsonState(res.data.filter(function (ele) {
            return ele.fees > 0;
        }));
        setFreeJsonState(res.data.filter(function (ele) {
            return ele.fees == 0;
        }));
        setLoading(false);
    };



    const courseFeedbackResponses = async () => {
        let result = await service.courseFeedbackResponse(1, courseId);
        setfeedbackResponse(result.data);
    }

    const convertDate = (dateFormat) => {
        let timestamp = Date.parse(dateFormat);
        let date = new Date(timestamp);
        let d = date.toLocaleString('en-IN', { hour12: false, timeZone: 'IST' });
        // let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
        return d;
    }

    const feedbackResponseCheckHandler = (data) => {
        let array = data;
        let result = array.split(",").map((e) => parseInt(e));
        return result;
    }


    const columns = [
        {
            name: "Learner",
            cell: (row) => <img src={um_api + `getprofilepic/${row.learnerUsername}`} style={{ width: '42px', height: '42px', borderRadius: '100%', boxShadow: "5px 10px 20px 1px rgba(0, 0, 0, 0.253)" }} />,
            sortable: true,
            width: "150px"
        },
        {
            name: "Name",
            selector: row => `${row.firstName} ${row.lastName}`,
            sortable: true,
            wrap: true,
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            wrap: true
        },
        {
            name: "Mobile",
            selector: row => row.mobile,
            sortable: true,
            wrap: true
        },
    ];

    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const filteredItems = getLearnerData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const filteredItems1 = getInstructorData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterDataTable
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const CourseDetails = (id, tid) => {
        // var result = '';
        // let length = 10;
        // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // var charactersLength = characters.length;
        // for (var i = 0; i < length; i++) {
        //     result += characters.charAt(Math.floor(Math.random() *
        //         charactersLength));
        // }
        // const myCipher = myCipher(`${result}`)
        // let cid = myCipher(`${id}`);
        // let tId = myCipher(`${tid}`);
        // let rNumber = Math.floor(Math.random() * 10000000000);

        // //history.push(`${process.env.PUBLIC_URL + "/instLibraryDetails/"}${rNumber}${cid}/${result}${tId}`);
        // history.push(`${process.env.PUBLIC_URL + "/course-details/"}${rNumber}${cid}/${result}${tId}`);

        const secretKey = "cdac@123"

        const encodedCourseId = CryptoJS.AES.encrypt(
            `${id}`,
            secretKey
        ).toString();
        const safeEncodedCourseId = encodedCourseId
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        const encodedTenantId = CryptoJS.AES.encrypt(
            `${tid}`,
            secretKey
        ).toString();
        const safeEncodedTenantId = encodedTenantId
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        history.push(`${process.env.PUBLIC_URL + "/course-details/"}${safeEncodedCourseId}/${safeEncodedTenantId}`);


    }

    const { t } = useTranslation()

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [getAvgRating, setAvgRating] = useState([]);
    const [postsPerPage] = useState(10);
    const [paidJsonState, setPaidJsonState] = useState();
    const [freeJsonState, setFreeJsonState] = useState();

    const [filteredCourse, setFilteredCourse] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [hovered, setHovered] = useState(false);
    const history = useHistory();
    let categoryValue = useSelector(state => state.categoryValue);
    let value = useSelector(state => state.inputValue);
    let paidStat = useSelector(state => state.paidCourse);
    let freeStat = useSelector(state => state.freeCourse);


    let currentCourseState;
    if (value) {
        let data = contentData.filter((course) =>
            course.courseDetails.courseName.toLowerCase().includes(value)
        )
        currentCourseState = data.slice(0, 1000);
    } else {
        currentCourseState = contentData.slice(0, 1000);
    }

    // const usersPerPage = 6;
    // const pagesVisited = pageNumber * usersPerPage;
    // const pageCount = Math.ceil(currentCourseState.length / usersPerPage);

    // let currentCourseState;
    // if (value) {
    //     let data = courseState.filter((course) =>
    //         course.courseName.toLowerCase().includes(value)
    //     )
    //     currentCourseState = data.slice(0, 1000);
    // }

    // else if (freeStat) {
    //     if (freeJsonState == undefined) {
    //         currentCourseState = courseState.slice(0, 1000);
    //     } else {
    //         currentCourseState = freeJsonState.slice(0, 1000);
    //     }
    // }
    // else if (categoryValue) {
    //     currentCourseState = dummyCategory.slice(0, 1000);
    // }

    // else {
    //     currentCourseState = courseState.slice(0, 1000);
    // }
    // let dummyCategory = [];
    // if (categoryValue) {
    //     dummyCategory = courseState.filter(function (ele) {
    //         return ele.catName == categoryValue;
    //     })

    // }




    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(currentCourseState.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const [searchEngineData, setsearchEngineData] = useState([]);
    const [getCourseIdsData, setCourseIdsData] = useState([]);
    const toggleHover = () => {
        setHovered(true);
    }

    const toggleHover1 = () => {
        setHovered(false);
    }
    const imageUrls = (url) => {
        if (url == null) {
            return '';
        } else {
            let imagepath = url.replace(/\\/g, "\\\\");
            let imageurl = `http://10.244.3.218:8082/${imagepath}`;
            return imageurl;
        }

    }



    function renderModal() {
        ////console.log("getContentType and getUrl in renderModal===", getContentType, getUrl);
        return (
            <Modal
                size="xl" centered show={urlModal} onHide={() => setUrlModal(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {getContentType === "zip" ? <i class="fas fa-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                            : getContentType == "pdf" ? <i class="fas fa-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                : getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <i class="fas fa-file-image" style={{ fontSize: "25px", color: "#b2b1ff" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                    : getContentType === "html" ? <i class="fab fa-html5" style={{ fontSize: "25px", color: "#e54c21" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                        : getContentType === "ogg" || getContentType === "webm" || getContentType === "mp4" ? <i class="fas fa-file-video" style={{ fontSize: "25px", color: "#8cee02" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                            : getContentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                                : getContentType === "doc" || getContentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                                    : getContentType === "scorm" ? <i class="far fa-file-archive" style={{ fontSize: "25px", color: "green" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                                        : getContentType === "youtube" ? <i class="far fa-youtube" style={{ fontSize: "25px", color: "green" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                                            : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <img src={`http://10.244.3.218:8080/${getUrl}`} width="1100" height="800" />
                            : getContentType == "pdf" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} type="application/pdf" ></iframe>
                                : getContentType === "mp4" ? <div> <Videojs {...videoJsOptions} /></div>
                                    : getContentType === "docx" ? <iframe width="100%" height="100%" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                        : getContentType === "html" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                            : getContentType === "zip" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                                : getContentType === "scorm" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                                    : getContentType === "youtube" ? <ReactPlayer url={getYouTubeUrl} width="100%" height="800px" controls="true"
                                                        config={{
                                                            youtube: {
                                                                playerVars: { showinfo: 1 }
                                                            }
                                                        }}
                                                    />
                                                        : <p>{t('no_content_available')}</p>
                    }
                </Modal.Body>
            </Modal>
        )

    }

    return (
        <div className="container-scroller">
            <Navbar />
            <StickyMenu />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div>
                            <div className="page-header">
                                <h3 className="page-title">
                                    {t('course')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"> <a href="#" onClick={event => event.preventDefault()}>{t('course')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('course_details')}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <Styles>
                            <section className="course-details-area" style={{ padding: '0px' }}>
                                <Container style={{ "maxWidth": "100%" }}>
                                    <Row>
                                        {/* <Col lg="3" md="5" sm="12"> */}
                                        {/* <div className="course-details-banner">
                                                <img src={process.env.PUBLIC_URL + `http://10.244.3.218:8082/${courseDetails.imageUrl}`} style={{ borderRadius: '5px', width: "400px" }} alt="Course Image" className="img-fluid" />
                                                
                                            </div> */}
                                        <br></br>
                                        <div className='admin-course-view'>
                                            <div className="single-details-sidbar">
                                                <Row>
                                                    <Col md="12">
                                                        {/* <div className="course-details-feature">
                                                                <h5 className="title">Course Details</h5>
                                                                <ul className="list-unstyled feature-list">
                                                                    <li><i className="far fa-calendar-check"></i> Enrollment Start Date: <span>{convertDate(courseDetails.enrollmentStartDate)}</span></li>
                                                                    <li><i className="far fa-calendar-check"></i> Enrollment End Date: <span>{convertDate(courseDetails.enrollmentEndDate)}</span></li>
                                                                    <li><i className="far fa-calendar-check"></i> Course Start Date: <span>{convertDate(courseDetails.commencementDate)}</span></li>
                                                                    <li><i className="far fa-calendar-check"></i> Course End Date: <span>{convertDate(courseDetails.closingDate)}</span></li>
                                                                    <li><i className="far fa-clock"></i> Duration: <span>{courseDetails.duration == 1825 ? "Unlimited" : courseDetails.duration} Days</span></li>
                                                                    <li><i className="fas fa-globe-asia"></i> Language: <span>{('english')}</span></li>
                                                                    <li><i className="far fa-bookmark"></i> Enrolled: <span>{userCount}</span></li>
                                                                    <li><i className="fas fa-certificate"></i> Certification: <span>{('yes')}</span></li>
                                                                </ul>
                                                            </div> */}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>

                                        {/* </Col> */}
                                        <Col>
                                            <div className="course-details-top">
                                                <div className="course-tab-list">
                                                    <Tab.Container defaultActiveKey="libraryContent">
                                                        <Nav className="flex-column">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="libraryContent">{t('library_content')}</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="instructor">{t('inst_details')}</Nav.Link>
                                                            </Nav.Item>
                                                            {/* <Nav.Item>
                                                                <Nav.Link eventKey="userList">User List</Nav.Link>
                                                            </Nav.Item> */}
                                                            {/* <Nav.Item>
                                                                <Nav.Link eventKey="feedback">View Feedback</Nav.Link>
                                                            </Nav.Item> */}

                                                        </Nav>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="libraryContent" className="library-tab">
                                                                <div className="row">
                                                                    {
                                                                        currentCourseState.length == 0
                                                                            ?
                                                                            <>
                                                                                {/* <h1>There is No Content Right Now</h1> */}
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <div className="col-lg-12 grid-margin stretch-card">
                                                                                    <div className='card'>
                                                                                        <div className="row">
                                                                                            {
                                                                                                currentCourseState.slice(pagesVisited, pagesVisited + usersPerPage).map((content, i) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            {/* <Col lg="4" md="12" key={i}> */}
                                                                                                            <Row>
                                                                                                                <div className='container-fluid d-flex justify-content-center'>
                                                                                                                    <div className='row'>
                                                                                                                        <div className='col-12'>
                                                                                                                            <div className='card text-center shadow'>
                                                                                                                                <div className='overflow'>
                                                                                                                                    {
                                                                                                                                        content.nodetype === "pdf"
                                                                                                                                            ?
                                                                                                                                            <>
                                                                                                                                                <img src={process.env.PUBLIC_URL + "/assets/images/pdf.png"} alt="" className='card-img-top' style={{ width: "50%", height: "100%", padding: "5px" }} />
                                                                                                                                            </>
                                                                                                                                            :
                                                                                                                                            content.nodetype === "jpg" || content.nodetype === "jpeg"
                                                                                                                                                ?
                                                                                                                                                <img src={process.env.PUBLIC_URL + "/assets/images/JPEGImage.png"} alt="" className='card-img-top' style={{ width: "50%", height: "100%", padding: "5px" }} />
                                                                                                                                                :
                                                                                                                                                content.nodetype === "mp4"
                                                                                                                                                    ?
                                                                                                                                                    <img src={process.env.PUBLIC_URL + "/assets/images/VideoFileImage.png"} alt="" className='card-img-top' style={{ width: "50%", height: "100%", padding: "5px" }} />
                                                                                                                                                    :
                                                                                                                                                    content.nodetype === "zip"
                                                                                                                                                        ?
                                                                                                                                                        <img src={process.env.PUBLIC_URL + "/assets/images/zipFileImage.png"} alt="" className='card-img-top' style={{ width: "50%", height: "100%", padding: "5px" }} />
                                                                                                                                                        :
                                                                                                                                                        <img src={process.env.PUBLIC_URL + "/assets/images/FileImage.png"} alt="" className='card-img-top' style={{ width: "50%", height: "100%", padding: "5px" }} />

                                                                                                                                    }


                                                                                                                                </div>
                                                                                                                                <div className='card-body text-dark'>
                                                                                                                                    <h4 className='card-title'>{content.label}</h4>
                                                                                                                                    <p className='card-text text-secondary'>
                                                                                                                                        {/* <a href='#' className='btn btn-outline-success'>View Learner</a> */}
                                                                                                                                        <Button variant="success" onClick={() => { onClickViewContent(content.filePath, content.nodetype, content.label) }} >{t('view')}</Button>
                                                                                                                                        {
                                                                                                                                            content.status === "C"
                                                                                                                                                ?
                                                                                                                                                <div className='row justify-content-center'>
                                                                                                                                                    <Button className="mr-2" onClick={() => { onClickApproveButton(content.id) }}>{t('approve')}</Button>
                                                                                                                                                    <Button onClick={() => { onClickRejectButton(content.id) }}> {t('reject')}</Button>
                                                                                                                                                </div>
                                                                                                                                                :
                                                                                                                                                <div className='row justify-content-center'>
                                                                                                                                                    {
                                                                                                                                                        content.status === "P"
                                                                                                                                                            ?
                                                                                                                                                            <>
                                                                                                                                                                <Button onClick={() => { onClickRejectButton(content.id) }}> {t('reject')}</Button>
                                                                                                                                                            </>
                                                                                                                                                            :
                                                                                                                                                            <>
                                                                                                                                                                <Button onClick={() => { onClickApproveButton(content.id) }}>{t('approve')}</Button>
                                                                                                                                                            </>
                                                                                                                                                    }
                                                                                                                                                </div>
                                                                                                                                        }
                                                                                                                                    </p>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Row>
                                                                                                        </>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                    }



                                                                    {currentCourseState.length == 0 ? null :
                                                                        <Col md="12" className="text-center">
                                                                            <ReactPaginate
                                                                                previousLabel={t('previous')}
                                                                                nextLabel={t('next')}
                                                                                pageCount={pageCount}
                                                                                onPageChange={changePage}
                                                                                containerClassName={"paginationBttns"}
                                                                                previousLinkClassName={"previousBttn"}
                                                                                nextLinkClassName={"nextBttn"}
                                                                                disabledClassName={"paginationDisabled"}
                                                                                activeClassName={"paginationActive"}
                                                                            />
                                                                        </Col>
                                                                    }


                                                                    {/* </Fragment> */}


                                                                    {/* <Fragment>
                                                                        {
                                                                            currentCourseState.slice(pagesVisited, pagesVisited + usersPerPage).map((content, i) => {
                                                                                return (
                                                                                    <>
                                                                                        <Col lg="4" md="12" key={i}>
                                                                                            <div className="course-item">
                                                                                                {
                                                                                                    content.nodetype === "pdf"
                                                                                                        ?
                                                                                                        <>
                                                                                                            <div className="course-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pdf.png` }}>
                                                                                                                    <div className="layer-box"></div>
                                                                                                                     {content.courseDetails.userCount == 0 ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete Course</Tooltip>}>
                                                                                                                        <Link className="add_cart" ><i className="fas fa-trash-alt" style={{ fontSize: "17px" }}></i></Link>
                                                                                                                    </OverlayTrigger> : null} 
                                                                                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Update Course Meta Data</Tooltip>}>
                                                                                                                        <Link className="item_view" to={process.env.PUBLIC_URL + `/UpdateCourse/${content.id.courseId}`}><i className="fa fa-edit" style={{ fontSize: "17px" }}></i></Link>
                                                                                                                    </OverlayTrigger>
                                                                                                                    
                                                                                                                </div>

                                                                                                            <div>
                                                                                                                <div className="course-image">
                                                                                                                    <img src={process.env.PUBLIC_URL + "/assets/images/pdf.png"} alt="" style={{ width: "260px" }} />

                                                                                                                    <div style={{ margin: "5px 30px" }}>
                                                                                                                        <Row>
                                                                                                                            <Button variant="success" onClick={() => { onClickViewContent(content.filePath, content.nodetype) }} >View</Button>
                                                                                                                            <Button onClick={() => { onClickApproveButton(content.id) }}>Approve</Button>
                                                                                                                            <Button onClick={() => { onClickRejectButton(content.id) }}> Reject</Button>

                                                                                                                        </Row>

                                                                                                                    </div>

                                                                                                                </div>
                                                                                                                <br />
                                                                                                                <div className="course-content">

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </>
                                                                                                        :
                                                                                                        <></>
                                                                                                }
                                                                                            </div>
                                                                                        </Col>
                                                                                    </>

                                                                                )
                                                                            })
                                                                        }


                                                                    </Fragment> */}
                                                                </div>
                                                                {/* {currentCourseState.length == 0 ? null :
                                                                    <Col md="12" className="text-center">
                                                                        <ReactPaginate
                                                                            previousLabel={t('previous')}
                                                                            nextLabel={t('next')}
                                                                            pageCount={pageCount}
                                                                            onPageChange={changePage}
                                                                            containerClassName={"paginationBttns"}
                                                                            previousLinkClassName={"previousBttn"}
                                                                            nextLinkClassName={"nextBttn"}
                                                                            disabledClassName={"paginationDisabled"}
                                                                            activeClassName={"paginationActive"}
                                                                        />
                                                                    </Col>
                                                                } */}



                                                                {/* <Fragment>
                                                                    {
                                                                        currentCourseState.slice(pagesVisited, pagesVisited + usersPerPage).map((content, i) => {
                                                                            return (
                                                                                <>
                                                                                    <Col lg="4" md="12" key={i}>
                                                                                        <div className="course-item">
                                                                                            <Card >
                                                                                                <div>
                                                                                                    {
                                                                                                        content.nodetype === "pdf"
                                                                                                            ?
                                                                                                            <>
                                                                                                                <div>
                                                                                                                    <div>
                                                                                                                        <img src={process.env.PUBLIC_URL + "/assets/images/pdf.png"} alt="" style={{ width: "260px" }} />
                                                                                                                    </div>
                                                                                                                    <Row>
                                                                                                                        <Button onClick={() => { onClickViewContent(content.filePath, content.nodetype) }} >View</Button>
                                                                                                                        <Button onClick={() => { onClickApproveButton(content.id) }}>Approve</Button>
                                                                                                                        <Button onClick={() => { onClickRejectButton(content.id) }}> Reject</Button>

                                                                                                                    </Row>
                                                                                                                </div>

                                                                                                            </>
                                                                                                            :
                                                                                                            <></>
                                                                                                    }

                                                                                                </div>

                                                                                            </Card>

                                                                                        </div>
                                                                                    </Col>
                                                                                </>

                                                                            )
                                                                        })
                                                                    }


                                                                </Fragment> */}





                                                                {/* {currentCourseState.length == 0
                                                                    ?
                                                                    <div style={{ marginLeft: '30px' }}>No Publish Courses</div>
                                                                    :
                                                                    <Fragment>
                                                                        
                                                                        {currentCourseState.slice(pagesVisited, pagesVisited + usersPerPage).map((data, i) => (

                                                                            <Col lg="6" md="12" key={i}>
                                                                                <div className="course-item">
                                                                                    <Link onClick={() => CourseDetails(data.courseId, 1)}>
                                                                                        <div className="course-image" onMouseOver={toggleHover} onMouseOut={toggleHover1} style={{ backgroundImage: `url(${imageUrls(data.courseImage)})` }}>
                                                                                            {data.instructor.map((d) => (
                                                                                                <div className="author-img d-flex">
                                                                                                    <div className="img">
                                                                                                        <img src={um_api + `getprofilepic/${d.learnerUsername}`} alt="" />
                                                                                                    </div>
                                                                                                    <div className="title">
                                                                                                        <p>{d.firstName}</p>
                                                                                                        <p>{d.lastName}</p>
                                                                                                        
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                            
                                                                                            
                                                                                        </div>
                                                                                    </Link>
                                                                                    <div className="course-content">
                                                                                        <div>
                                                                                            <Row>
                                                                                                <Col sm={9}>
                                                                                                    <h6 className="heading"><Link onClick={() => CourseDetails(data.courseId, data.tenantId)}>{data.courseName}</Link></h6>
                                                                                                </Col>
                                                                                                <Col sm={3}>
                                                                                                    <Button variant="success" style={{ position: "absolute", right: 10, background: `${colors.gr_bg}` }} onClick={() => CourseDetails(data.courseId, data.tenantId)}>View</Button>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </div>
                                                                                        <h6><p>{t('category')} : {data.catName}</p></h6>
                                                                                        <p className="desc" style={{ textAlign: "justify", textOverflow: "ellipsis", width: "300px", whiteSpace: "nowrap", overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: data.courseDescription }}></p>
                                                                                        <div className="course-face d-flex justify-content-between">
                                                                                            <div className="duration">
                                                                                                <p><i className="fas fa-clock"></i>{data.duration == 1825 ? "Unlimited" : data.duration} {t('days')}</p>
                                                                                            </div>
                                                                                            <div className="student">
                                                                                                <p><i className="fas fa-users"></i>{data.userCount == 0 ? null : data.userCount}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        ))
                                                                        }
                                                                    </Fragment>
                                                                }
                                                                {currentCourseState.length == 0 ? null :
                                                                    <Col md="12" className="text-center">
                                                                        <ReactPaginate
                                                                            previousLabel={t('previous')}
                                                                            nextLabel={t('next')}
                                                                            pageCount={pageCount}
                                                                            onPageChange={changePage}
                                                                            containerClassName={"paginationBttns"}
                                                                            previousLinkClassName={"previousBttn"}
                                                                            nextLinkClassName={"nextBttn"}
                                                                            disabledClassName={"paginationDisabled"}
                                                                            activeClassName={"paginationActive"}
                                                                        />
                                                                    </Col>
                                                                } */}


                                                            </Tab.Pane>


                                                            <Tab.Pane eventKey="instructor" className="library-tab">
                                                                {/* <div className="col-lg-12 grid-margin stretch-card"> */}
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <DataTable
                                                                                columns={columns}
                                                                                data={filteredItems1}
                                                                                defaultSortField="Name"
                                                                                defaultSortAsc={true}
                                                                                striped
                                                                                pagination
                                                                                highlightOnHover
                                                                                customStyles={customStyles}
                                                                                subHeader
                                                                                subHeaderComponent={subHeaderComponent}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                {/* </div> */}
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Tab.Container>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </section>
                        </Styles>
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
                {
                    getContentType != '' && getUrl != '' ?
                        renderModal()
                        // <Modal
                        //     size="xl" centered show={urlModal} onHide={() => setUrlModal(false)} backdrop="static">
                        //     <Modal.Header closeButton>
                        //         <Modal.Title id="contained-modal-title-vcenter">
                        //             {getContentType === "zip" ? <i class="fas fa-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}> Zip</i>
                        //                 : getContentType === "pdf" ? <i class="fas fa-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}> PDF</i>
                        //                     : getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <i class="fas fa-file-image" style={{ fontSize: "25px", color: "#b2b1ff" }}> Image</i>
                        //                         : getContentType === "html" ? <i class="fab fa-html5" style={{ fontSize: "25px", color: "#e54c21" }}> Html</i>
                        //                             : getContentType === "ogg" || getContentType === "webm" || getContentType === "mp4" ? <i class="fas fa-file-video" style={{ fontSize: "25px", color: "#8cee02" }}> Video</i>
                        //                                 : getContentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}> Text</i>
                        //                                     : getContentType === "doc" || getContentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}> Doc</i>
                        //                                         : getContentType === "scorm" ? <i class="far fa-file-archive" style={{ fontSize: "25px", color: "green" }}> Scorm</i>
                        //                                             : getContentType === "youtube" ? <i class="far fa-youtube" style={{ fontSize: "25px", color: "green" }}> YouTube</i>
                        //                                                 : null}
                        //         </Modal.Title>
                        //     </Modal.Header>
                        //     <Modal.Body>
                        //         {
                        //             getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <img src={`http://10.244.3.218:8080/${getUrl}`} width="1100" height="800" />
                        //                 : getContentType === "pdf" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} type="application/pdf" ></iframe>
                        //                     : getContentType === "mp4" ? <div> <Videojs {...videoJsOptions} /></div>
                        //                         : getContentType === "docx" ? <iframe width="100%" height="100%" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                        //                             : getContentType === "html" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                        //                                 : getContentType === "zip" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                        //                                     : getContentType === "scorm" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                        //                                         : getContentType === "youtube" ? <ReactPlayer url={getYouTubeUrl} width="100%" height="800px" controls="true"
                        //                                             config={{
                        //                                                 youtube: {
                        //                                                     playerVars: { showinfo: 1 }
                        //                                                 }
                        //                                             }}
                        //                                         />
                        //                                             : <p>No Content Available</p>
                        //         }
                        //     </Modal.Body>
                        // </Modal>
                        : ''
                }
                <Modal centered show={modalShow} onHide={() => setModalShow(false)} backdrop="static" className='custom-modal-style' >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                            Remark
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label className="mb-0">Remark <span className="text-danger">*</span></label>
                            <br />
                            <input name="feedback_title" type="text" minLength={3} maxLength={50} value={desp} className="form-control" placeholder="Enter Feedback Title" onChange={despHandler}
                            />
                            {
                                rejectError
                                    ?
                                    <>
                                        <div className="alert alert-danger mt-2">
                                            {rejectError}
                                        </div>
                                    </>
                                    :
                                    <>
                                        {null}
                                    </>
                            }


                            {/* {questionData.questionError
                                                ? <div className="alert alert-danger mt-2">{questionData.questionError}</div>
                                                : ''
                                            } */}
                        </div>

                    </Modal.Body>
                    <Modal.Footer >
                        <Button onClick={rejectSubmitButton}> Submit </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        </div >
    );
}

export default AdminViewLibraryContent;