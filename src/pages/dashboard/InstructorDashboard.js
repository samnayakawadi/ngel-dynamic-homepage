import React, { useState, useMemo, useEffect } from 'react';
import { Styles } from './styles/dashborad.js'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import HeaderTwo from '../../components/HeaderTwo'
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import UserService from '../../services/UserService.js';
import service from '../../services/service.js';
import learnerService from '../../services/learnerService';
import { ConsoleView } from 'react-device-detect';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import moment from 'moment';


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

function InstructorDashboard(props) {
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

    let tenantId = 1;
    const [moreDetailsDiv, setMoreDetailsDiv] = useState(false);
    const [getEmailListDiv, setEmailListDiv] = useState(false);
    const [selectedState, setSelectedState] = useState();
    const [getLearnerData, setlearnerData] = useState([]);
    const [getCurrentUserId, setCurrentUserId] = useState();
    const [getQuizModal, setQuizModal] = useState({
        show: false
    });

    const [getQuizReportCard, setQuizReportCard] = useState([]);
    const [getSelectedAttempt, setSelectedAttempt] = useState();
    ////console.log("getSelectedAttempt=>"+getSelectedAttempt);

    const setQuizModalHide = () => {
        setQuizModal({
            show: false
        });
    }

    const onEmailIdSelectHandler = () => {
        setEmailListDiv(true)
    }
    const onSelectHandler = (e) => {
        setSelectedState(e.target.value);
    }

    const quizReportInfo = (currentUserId, quizId) => {

        const data = {
            userId: currentUserId,
            quizId: quizId,
            attemptNumber: 0,
            courseId: getCourseId
        }
        ////console.log(data);
        service.getQuizCompleteResult(data)
            .then(res => {
                ////console.log(res.data);
                setQuizReportCard(res.data);
            })
            .catch(err => {

            })
    }

    const courseOutlineReportcolumns = [
        {
            name: "S.No",
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: "Email ID",
            selector: row => row.emailid,
            sortable: true,
            wrap: true,
        },
        {
            name: "First Name",
            selector: row => row.firstName,
            sortable: true,
            wrap: true,
        },
        {
            name: "Last Name",
            selector: row => row.lastName,
            sortable: true,
            wrap: true,
        },
        {
            name: "Progress",
            selector: row => row.progress,
            sortable: true,
            wrap: true,
        },
        {
            name: "Quiz Status",
            selector: row => row.quizStatus,
            sortable: true,
            wrap: true
        },
        {
            name: "Assign Status",
            selector: row => row.assignStatus,
            sortable: true,
            wrap: true,
        },
        {
            name: "Certificate",
            selector: row => row.certificate,
            sortable: true,
            wrap: true
        },
        {
            name: "Course Status",
            selector: row => row.courseStatus,
            sortable: true,
            wrap: true
        },
        {
            name: "Total Time Spent",
            selector: row => row.totalTimeSpent,
            sortable: true,
            wrap: true
        }
    ];

    const assignmentReportColumns = [
        {
            name: "S.No",
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: "Assign ID",
            selector: row => row.assignid,
            sortable: true,
            wrap: true,
        },
        {
            name: "Submission Date",
            selector: row => row.submissiondate,
            sortable: true,
            wrap: true
        },
        {
            name: "Marks",
            selector: row => row.marks,
            sortable: true,
            wrap: true
        },
        {
            name: "Remarks",
            selector: row => row.remarks,
            sortable: true,
            wrap: true
        }
    ];

    const quizReportcolumns = [
        // {
        //     name: "S.No",
        //     selector: row => row.id,
        //     sortable: true,
        //     width: "80px"
        // },
        {
            name: "Quiz ID",
            selector: row => row.quizId,
            sortable: true,
            wrap: true,
        },
        {
            name: "Quiz Title",
            selector: row => row.quizTitle,
            sortable: true,
            wrap: true
        },
        {
            name: "Valid From",
            // selector: row => row.validFrom,
            selector: row => moment(row.validFrom).format('MM-DD-YYYY HH:mm'),

            sortable: true,
            wrap: true
        },
        {
            name: "Valid To",
            // selector: row => row.validTo,
            selector: row => moment(row.validTo).format('MM-DD-YYYY HH:mm'),
            sortable: true,
            wrap: true
        },
        {
            name: "Attempts",
            selector: row => row.attempts,
            sortable: true,
            wrap: true
        },
        {
            name: 'Action',
            cell: row => <>
                <Button onClick={() => { setQuizModal({ show: true }); quizReportInfo(getCurrentUserId.userId, row.quizId); }} disabled={moreDetailsLoading.isLoading ? "true" : ""} style={{ background: "green", border: "0px" }}> {moreDetailsLoading.isLoading ? (<> {t('loading')}</>) : <>{t('more_details')}</>} </Button>
            </>
        }
    ];

    const timeSpentColumns = [
        {
            name: "S.No",
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: "Content Name",
            selector: row => row.contentname,
            sortable: true,
            wrap: true,
        },
        {
            name: "Time Spent (HH:MM:SS)",
            selector: row => row.timespent,
            sortable: true,
            wrap: true
        },
    ];

    const contentAccessColumns = [
        {
            name: "S.No",
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: "Content Name",
            selector: row => row.contentname,
            sortable: true,
            wrap: true,
        },
        {
            name: "Start Time",
            selector: row => row.starttime,
            sortable: true,
            wrap: true
        },
        {
            name: "End Time",
            selector: row => row.endtime,
            sortable: true,
            wrap: true
        }
    ];

    const activityLogColumns = [
        {
            name: "S.No",
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: "Actitivy",
            selector: row => row.activity,
            sortable: true,
            wrap: true,
        },
        {
            name: "In Time",
            selector: row => row.intime,
            sortable: true,
            wrap: true
        },
        {
            name: "Out Time",
            selector: row => row.outtime,
            sortable: true,
            wrap: true
        }
    ];


    /****************************LIST OF AUTHORED COURSE***************************/


    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    useEffect(() => {
        getAuthoredCourseList();
    }, []);

    const [moreDetailsLoading, setMoreDetailsLoading] = useState({
        isLoading: false
    })

    const [authoredCourseList, setAuthoredCourseList] = useState([]);
    const [getCourseId, setCourseId] = useState();
    const userId = UserService.getUserid();
    const getAuthoredCourseList = () => {
        service.getUserEnrolledCourses(userId, 2).then((resp) => {
            setAuthoredCourseList(resp.data);
            ////console.log(resp.data);
        }).catch((err) => {
            //console.log(err);
        })
    }

    const [quizReportList, setQuizReportList] = useState([]);


    const getQuizReport = (courseId, userId) => {
        ////console.log("userId -> "+userId+" CourseID -> "+courseId);
        service.quizReport(userId, courseId)
            .then((resp) => {
                ////console.log(resp.data);
                setCurrentUserId(resp.data);
                setQuizReportList(resp.data.assignedQuizzes);
            }).catch((err) => {
                //console.log(err);
            })
    }

    const quizfilteredItems = quizReportList.filter(
        item =>
            item.quizTitle
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const authoredCourseListItems = authoredCourseList.filter(
        item =>
            item.courseDetails.courseName
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const authoredListSubHeaderComponent = useMemo(() => {
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

    const onClickMoreDetails = (id, courseName) => {
        setMoreDetailsLoading({ isLoading: true });
        setMoreDetailsDiv({
            ...moreDetailsDiv,
            condition: true,
            setID: id,
            courseName: courseName,
        })
        setMoreDetailsLoading({ isLoading: false });
        if (selectedState) {
            setMoreDetailsLoading({ isLoading: false });
            document.getElementById('select').value = 'Choose'
            setSelectedState('');

            setMoreDetailsLoading({ isLoading: false });
        }
        //resetError();
    }


    const authoredCourseListColumn = [
        {
            name: 'S No.',
            selector: (row, index) => index + 1,
            width: '100px'
        },
        {
            name: 'Course Name',
            selector: row => row.courseDetails.courseName,
        },
        {
            name: 'Course Type',
            selector: row => row.courseDetails.course_Type,
        },
        {
            name: 'Starting Date',
            selector: row => <>
                <div>{new Date(row.courseStartDate).getDate()}-{(new Date(row.courseStartDate).getMonth()) + 1}-{new Date(row.courseStartDate).getFullYear()}</div>
                <div>{new Date(row.courseStartDate).getHours()}:{new Date(row.courseStartDate).getMinutes()}:{new Date(row.courseStartDate).getSeconds()}</div>
            </>,
        },
        {
            // row.courseDetails.courseClosingDate
            name: 'Closing Date',
            selector: row => <>
                <div>{new Date(row.courseDetails.courseClosingDate).getDate()}-{(new Date(row.courseDetails.courseClosingDate)).getMonth() + 1}-{new Date(row.courseDetails.courseClosingDate).getFullYear()}</div>
                <div>{new Date(row.courseDetails.courseClosingDate).getHours()}:{new Date(row.courseDetails.courseClosingDate).getMinutes()}:{new Date(row.courseDetails.courseClosingDate).getSeconds()}</div>
            </>,
        },
        {
            name: 'Action',
            cell: row => <>
                <Button onClick={() => { onClickMoreDetails(row.id.courseId, row.courseDetails.courseName); getUserEnrolledByCourse(row.id.courseId); }}
                    disabled={moreDetailsLoading.isLoading ? "true" : ""} style={{ background: "green", border: "0px" }}> {moreDetailsLoading.isLoading ? (<> {t('loading')}</>) : <>{t('more_details')}</>} </Button>
            </>
        }

    ]




    /****************************END LIST OF AUTHORED COURSE***************************/



    const [getCourseOutlineReportData, setCourseOutlineReportData] = useState([
        {
            "id": 1,
            "emailid": "pradeepn@cdac.in",
            "firstName": "Pradeep",
            "lastName": "Namdev",
            "progress": "20 %",
            "quizStatus": "Completed",
            "assignStatus": "Completed",
            "certificate": "Completed",
            "courseStatus": "Completed",
            "totalTimeSpent": "5 Hr",

        },
    ])
    const [getAssignmentReportData, setAssignmentReportData] = useState([
        {
            "id": 1,
            "assignid": 123,
            "submissiondate": "2022-10-12T09:46:00.000+05:30",
            "marks": "20",
            "remarks": "Do Better",
        },
    ])

    const [getTimeSpentReportData, setTimeSpentReportData] = useState([
        {
            "id": 1,
            "contentname": "PDF",
            "timespent": "2022-10-12T09:46:00.000+05:30",
        },
    ])

    const [getContentAccessLogData, setContentAccessLogData] = useState([
        {
            "id": 1,
            "contentname": "PDF",
            "starttime": "2022-10-12T09:46:00.000+05:30",
            "endtime": "2022-10-12T09:46:00.000+05:30",
        },
    ])

    const [getAccessLogData, setAccessLogData] = useState([
        {
            "id": 1,
            "activity": "PDF",
            "intime": "2022-10-12T09:46:00.000+05:30",
            "outtime": "2022-10-12T09:46:00.000+05:30",
        },
    ])


    /* Table content Filter and Search */



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

    const courseOutlinefilteredItems = getCourseOutlineReportData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );
    const assignmentfilteredItems = getAssignmentReportData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );
    const timespentfilteredItems = getTimeSpentReportData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );
    const contentAccessfilteredItems = getContentAccessLogData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );
    const accesslogfilteredItems = getAccessLogData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const getUserEnrolledByCourse = (courseId) => {
        setQuizReportList([]);
        setCourseId(courseId);
        ////console.log(courseId);
        learnerService.getUserEnrolledByCourse(courseId, tenantId)
            .then(res => {
                setlearnerData(res.data);
                setMoreDetailsLoading({ isLoading: false });
                ////console.log(res.data);
            }).catch(err => {
                //console.log(err);
                setMoreDetailsLoading({ isLoading: false });
            })
    }


    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper dashboard-page">

                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('instructor_Dashborad')} />

                <section className="dashboard-page-area">
                    <Container>
                        <Row>
                            <Col lg="12" className='mt-4'>
                                <div className="card-body">
                                    <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>{t('authored_course_list')}</h4>
                                    <br></br>
                                    <DataTable
                                        columns={authoredCourseListColumn}
                                        data={authoredCourseListItems}
                                        defaultSortAsc={true}
                                        striped
                                        pagination
                                        highlightOnHover
                                        customStyles={customStyles}
                                        subHeader
                                        subHeaderComponent={authoredListSubHeaderComponent}
                                    />
                                </div>


                                {/* <Col>
                                <table class="table table-borderless text-center shadow-lg p-5 bg-body rounded" >
                                <thead>
                                <tr>
                                <th>Course Name</th>
                                <th>Users</th>
                                <th>Progress</th>
                                <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                            <td>Reactjs</td>
                                            <td>30</td>
                                            <td><div class="progress" style={{ height: '2rem' }}>
                                                <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: '10%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">10%</div>
                                                </div></td>
                                            <td><button className='btn btn-outline-success' onClick={() => setMoreDetailsDiv(true)}>More Details</button>
                                            </td>
                                            </tr>
                                        <tr>
                                            <td>Java</td>
                                            <td>9</td>
                                            <td><div class="progress" style={{ height: '2rem' }}>
                                            <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: '50%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">50%</div>
                                            </div></td>
                                            <td><button className='btn btn-outline-success' onClick={() => setMoreDetailsDiv(true)}>More Details</button>
                                            </td>
                                            </tr>
                                            <tr>
                                            <td>Oracle</td>
                                            <td>1</td>
                                            <td><div class="progress" style={{ height: '2rem' }}>
                                            <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: '30%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">30%</div>
                                            </div></td>
                                            <td><button className='btn btn-outline-success' onClick={() => setMoreDetailsDiv(true)}>More Details</button>
                                            </td>
                                            </tr>
                                            </tbody>
                                            </table>
                                        </Col> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {moreDetailsDiv ?
                                    <>
                                        {/* <Row className='mt-4 mb-4'>
                                            <Col>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <DataTable
                                                            columns={courseOutlineReportcolumns}
                                                            title="Course Outline Report"
                                                            data={courseOutlinefilteredItems}
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
                                            </Col>
                                        </Row> */}
                                        <Row>
                                            <div class="col-8 col-md-4">
                                                <h4 style={{ fontWeight: "bold" }}>{moreDetailsDiv.courseName}</h4>
                                                <br></br>
                                                <label class="control-label" for="name">{t('user_list')} : </label>
                                                <select onChange={(e) => { onEmailIdSelectHandler(); getQuizReport(getCourseId, e.target.value); }} class="custom-select" id="gender2">
                                                    <option selected>{t('choose')}</option>
                                                    {
                                                        getLearnerData.map((learner, index) => {
                                                            return (
                                                                <option value={
                                                                    learner.learnerUsername
                                                                }>
                                                                    {learner.firstName} {learner.lastName}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </Row>
                                    </> : ''
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {getEmailListDiv ?
                                    <Row className='mt-4'>
                                        <div class="col-8 col-md-4">
                                            <select onChange={(e) => onSelectHandler(e)} class="custom-select" id="gender2">
                                                <option selected>{t('choose')}</option>
                                                <option value="1">{t('quiz_report')}</option>
                                                {/* <option value="2">Assignment Report</option>
                                                <option value="3">Time Spent Report</option>
                                                <option value="4">Content Access Log</option> */}
                                                {/* <option value="5">Activity Log</option> */}
                                            </select>
                                        </div>
                                    </Row> : ''
                                }
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col>
                                {selectedState == 1 ?
                                    <div className="card">
                                        <div className="card-body">
                                            <DataTable
                                                columns={quizReportcolumns}
                                                title={t('quiz_report')}
                                                data={quizfilteredItems}
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
                                    : selectedState == 2 ? <div className="card">
                                        <div className="card-body">
                                            <DataTable
                                                columns={assignmentReportColumns}
                                                title="Assignment Report"
                                                data={assignmentfilteredItems}
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
                                    </div> : selectedState == 3 ? <div className="card">
                                        <div className="card-body">
                                            <DataTable
                                                columns={timeSpentColumns}
                                                title={t('time_spent_report')}
                                                data={timespentfilteredItems}
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
                                    </div> : selectedState == 4 ? <div className="card">
                                        <div className="card-body">
                                            <DataTable
                                                columns={contentAccessColumns}
                                                title={t('content_access_log')}
                                                data={contentAccessfilteredItems}
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
                                    </div> : selectedState == 5 ? <div className="card">
                                        <div className="card-body">
                                            <DataTable
                                                columns={activityLogColumns}
                                                title={t('activity_log')}
                                                data={accesslogfilteredItems}
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
                                    </div> : ''}
                            </Col>
                        </Row>
                    </Container>

                </section>
                {/* Footer 2 */}
                <FooterTwo />
                <Modal centered show={getQuizModal.show} onHide={() => setQuizModalHide()} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                            {t('quiz_details')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label>{t('attempt_number')}</label>
                            <select
                                onChange={(e) => setSelectedAttempt(e.target.value)}

                                class="custom-select" id="QuizReport">
                                <option selected>{t('choose')}</option>
                                {getQuizReportCard.map((data, index) => {
                                    return (
                                        <option value={data.attemptNumber}>{data.attemptNumber}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {getQuizReportCard.map((data, index) => {
                            return (
                                <div>
                                    {(getSelectedAttempt == data.attemptNumber) ? (<Card style={{ border: "0px", borderRadius: "5px", boxShadow: "3px 3px 5px #d6d6d6", margin: "10px" }}>
                                        <div style={{ marginLeft: "15px", marginRight: "15px" }}>
                                            <Row
                                                style={data.quizResult === 'fail' ? { backgroundColor: "#cf2121", color: "white", borderRadius: "5px 5px 0px 0px", border: "0px", padding: "5px" }
                                                    : data.quizResult === 'pass' ? { backgroundColor: "green", color: "white", borderRadius: "5px 5px 0px 0px", border: "0px", padding: "5px" }
                                                        : { backgroundColor: "#182B49", color: "white", borderRadius: "5px 5px 0px 0px", border: "0px", padding: "5px" }}
                                            >{t('attempt_number')} {data.attemptNumber} : {(data.quizResult === 'fail') ? (<>{t('fail')}</>) : ((data.quizResult === 'pass') ? <>{t('pass')}</> : <>{t('pending')}</>)}
                                            </Row>
                                            {(data.quizStatus !== 'attempted') && (<Row style={{ padding: "3px" }}>
                                                <Col>{t('questions_count')}: </Col>
                                                <Col>{data.quizTotalQuestionsCount}</Col>
                                            </Row>)}
                                            {(data.quizStatus !== 'attempted') && (<Row style={{ padding: "3px" }}>
                                                <Col>{t('questions_attempted')}: </Col>
                                                <Col>{data.quizTotalAttempted}</Col>
                                            </Row>)}
                                            {(data.quizStatus !== 'attempted') && (<Row style={{ padding: "3px" }}>
                                                <Col>{t('questions_not_attempted')} : </Col>
                                                <Col>{data.quizTotalNotAttempted}</Col>
                                            </Row>)}
                                            {(data.quizStatus !== 'attempted') && (<Row style={{ padding: "3px" }}>
                                                <Col>{t('achieved_total_core')} : </Col>
                                                <Col>{data.quizAchievedScore} / {data.quizTotalScore}</Col>
                                            </Row>)}
                                            <Row style={{ padding: "3px" }}>
                                                <Col>{t('result')} : </Col>
                                                <Col>{(data.quizResult === 'fail') ? (<>{t('fail')}</>) : ((data.quizResult === 'pass') ? <>{t('pass')}</> : <>{t('pending')}</>)}</Col>
                                            </Row>
                                            <Row style={{ padding: "3px" }}>
                                                <Col>{t('quiz_status')} : </Col>
                                                <Col>{(data.quizStatus === 'completed') ? (<>{t('completed')}</>) : (<>{t('attempted')}</>)}</Col>
                                            </Row>
                                        </div>
                                    </Card>) : null}
                                </div>
                            )
                        })

                        }

                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "right" }}>
                        <Button variant="secondary" onClick={() => setQuizModalHide()}>
                            {t('cancel')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Styles>

    );
}

export default InstructorDashboard;