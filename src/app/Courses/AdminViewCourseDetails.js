import React from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import instructorService from '../../services/instructorService';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
// import { Styles } from './styles/course.js'
import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { Col } from 'react-bootstrap';
import { useEffect, useMemo } from 'react';
import learnerService from '../../services/learnerService';
import { useState } from 'react';
import { Container, Row, Tab, Nav, Card, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Styles } from '../../pages/instructor/instCourses/styles/coursedetails.js';
import service from '../../services/service';
import Accordion from 'react-bootstrap/Accordion';
import DataTable from "react-data-table-component";
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import UserService from '../../services/UserService';






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
function AdminViewCourseDetails(props) {

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

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
    useEffect(() => {
        getCourseDetails();
        fatchRatingData();
        courseFeedbackResponses();
        fatchUserCount();
        getUserEnrolledByCourse();
        getCourseInstructors();
    }, [])

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

    const fatchUserCount = async () => {
        try {
            const res = await service.userCount(courseId, tenantId);
            setUserCount(res.data.userCount);
        } catch (error) {
            //console.log(error)
        }
    }

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
                                    {t('courses')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"> <a href="#" onClick={event => event.preventDefault()}>{t('courses')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('course_details')}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <Styles>
                            <section className="course-details-area" style={{ padding: '0px' }}>
                                <Container style={{ "maxWidth": "100%" }}>
                                    <Row>
                                        <Col lg="3" md="5" sm="12">
                                            <div className="course-details-banner">

                                                <img src={process.env.PUBLIC_URL + `http://10.244.3.218:8082/${courseDetails.imageUrl}`} style={{ borderRadius: '5px', width: "400px" }} alt="Course Image" className="img-fluid" />

                                                {/* <img src={process.env.PUBLIC_URL + `http://10.244.3.218:8082/${courseDetails.imageUrl}`} style={{ height: 300, width: 825 }} alt="Course Image" className="img-fluid" /> */}



                                            </div>
                                            <br></br>
                                            <div className='admin-course-view'>
                                                <div className="single-details-sidbar">
                                                    <Row>
                                                        <Col md="12">
                                                            <div className="course-details-feature">
                                                                <h5 className="title">{t('course_details')}</h5>
                                                                <ul className="list-unstyled feature-list">
                                                                    <li><i className="far fa-calendar-check"></i> {t('enrollment_start_date')}: <span>{convertDate(courseDetails.enrollmentStartDate)}</span></li>
                                                                    <li><i className="far fa-calendar-check"></i> {t('enrollment_end_date')}: <span>{convertDate(courseDetails.enrollmentEndDate)}</span></li>
                                                                    <li><i className="far fa-calendar-check"></i>{t('course_start_date')}: <span>{convertDate(courseDetails.commencementDate)}</span></li>
                                                                    <li><i className="far fa-calendar-check"></i> {t('course_end_date')}: <span>{convertDate(courseDetails.closingDate)}</span></li>
                                                                    <li><i className="far fa-clock"></i> {t('duration')}: <span>{courseDetails.duration == 1825 ? "Unlimited" : courseDetails.duration} {t('days')}</span></li>
                                                                    <li><i className="fas fa-globe-asia"></i> {t('language1')}: <span>{t('english')}</span></li>
                                                                    <li><i className="far fa-bookmark"></i> {t('enrolled_')}: <span>{userCount}</span></li>
                                                                    <li><i className="fas fa-certificate"></i> {t('certification')}: <span>{('yes')}</span></li>
                                                                </ul>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>

                                        </Col>
                                        <Col lg="9" md="7" sm="12">
                                            <div className="course-details-top">
                                                <div className="course-tab-list">
                                                    <Tab.Container defaultActiveKey="review">
                                                        <Nav className="flex-column">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="instructor">{t('instructor_details')}</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="userList">{t('user_list')}</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="feedback">{t('view_feedback')}</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="review">{t('rating_review')}</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="review" className="review-tab">
                                                                <Row>
                                                                    <Col md="12">
                                                                        <div className="review-comments">
                                                                            <h5>{t('course_reviews_2')}</h5>
                                                                            {getRating.map((data) => {
                                                                                return (
                                                                                    <div className="comment-box d-flex">
                                                                                        <div className="comment-image">
                                                                                            <img src={data.profilePicUrl} alt="" />
                                                                                        </div>
                                                                                        <div className="comment-content" style={{ width: "100%" }}>
                                                                                            <div className="content-title d-flex justify-content-between">
                                                                                                <div className="comment-writer">
                                                                                                    <h6>{data.firstName} {data.lastName}</h6>
                                                                                                    <p>{convertDate(data.creationTime)}</p>
                                                                                                    <ul className="list-unstyled list-inline">
                                                                                                        {data.rating == 1 ? //get all the rating and review, no post, no put
                                                                                                            <>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({data.rating})</li>
                                                                                                            </>
                                                                                                            : data.rating == 2 ?
                                                                                                                <>
                                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({data.rating})</li>
                                                                                                                </>
                                                                                                                : data.rating == 3 ?
                                                                                                                    <>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({data.rating})</li>
                                                                                                                    </>
                                                                                                                    : data.rating == 4 ?
                                                                                                                        <>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({data.rating})</li>
                                                                                                                        </>
                                                                                                                        : data.rating == 5 ?
                                                                                                                            <>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({data.rating})</li>
                                                                                                                            </>
                                                                                                                            : null}
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="comment-desc">
                                                                                                <p>{data.reviewText}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="feedback" className="overview-tab">
                                                                <Accordion defaultActiveKey="0">
                                                                    {getFeedbackResponse.length == 0 ? <p>{t('no_responses_for_course')}</p> :
                                                                        <>
                                                                            {getFeedbackResponse.map((data, i) =>
                                                                                <Accordion.Item eventKey={i}>
                                                                                    <Accordion.Header>{i + 1}</Accordion.Header>
                                                                                    <Accordion.Body style={{ marginLeft: '25px' }}>
                                                                                        {data.responseMaster.map((a, j) => <div style={{ margin: '10px', padding: '10px' }}>{j + 1}.{a.questionMaster.question} {a.questionMaster.questionType == "TF" || a.questionMaster.questionType == "TA" ? <ul style={{ listStyleType: 'none', marginLeft: '10px' }}><li>
                                                                                            Ans. {a.feedbackResponse} </li></ul> : ''}
                                                                                            {a.questionMaster.optionsMasters.map((d, k) => <ul style={{ listStyleType: 'none', marginLeft: '10px' }}><li>
                                                                                                {k + 1}.  {d.optionText} {feedbackResponseCheckHandler(a.feedbackResponse).includes(d.optionId) ? <i class="fa fa-check" style={{ color: 'green' }} aria-hidden="true"></i>
                                                                                                    : ''}</li></ul>)}
                                                                                        </div>)}
                                                                                    </Accordion.Body>
                                                                                </Accordion.Item>
                                                                            )}
                                                                        </>
                                                                    }
                                                                </Accordion>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="userList" className="overview-tab">
                                                                <div className="col-lg-12 grid-margin stretch-card">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <DataTable
                                                                                columns={columns}
                                                                                data={filteredItems}
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
                                                                </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="instructor" className="overview-tab">
                                                                <div className="col-lg-12 grid-margin stretch-card">
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
                                                                </div>
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
            </div>
        </div >
    );
}

export default AdminViewCourseDetails;