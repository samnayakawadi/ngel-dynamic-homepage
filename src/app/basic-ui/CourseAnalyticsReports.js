import React, { useState, useEffect } from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import { useMemo } from 'react'
import DataTable from "react-data-table-component";
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'
import UserService from '../../services/UserService';
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import adminServices from '../../services/adminServices';
import learnerService from '../../services/learnerService';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';


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

function CourseAnalyticsReports() {


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


    /********************* Get ALL LEARNER LIST  **********************/

    useEffect(() => {
        getAllLearnerList();
    }, [])

    const [learnerList, setLearnerList] = useState([])
    const [getLearnerIdName, setLearnerIdName] = useState({
        id: '',
        fname: '',
        lname: '',
    })
    const getAllLearnerList = () => {
        adminServices.getAllLearners().then((resp) => {
            setLearnerList(resp.data);
            ////console.log(resp.data)
        }).catch((err) => {
            //console.log(err)
        })
    }







    /********************* END Of Get ALL LEARNER LIST  **********************/

    const [getTimeDur, setTimeDur] = useState([]);
    const [getContentTimeDur, setContentTimeDur] = useState([]);
    let userId = UserService.getUserid();


    const [moreDetailsDiv, setMoreDetailsDiv] = useState(false);
    const [transDetailsDiv, setTransDetailsDiv] = useState(false);
    const [selectedState, setSelectedState] = useState();
    const [getEmailListDiv, setEmailListDiv] = useState(false);

    const onSelectHandler = (e) => {
        setSelectedState(e.target.value);
    }

    const onEmailIdSelectHandler = () => {
        setEmailListDiv(true)
    }

    const transDetailsColumns = [
        {
            name: "User Id",
            selector: row => row.userid,
            sortable: true,
            wrap: true
        },
        {
            name: "Transection Id",
            selector: row => row.transid,
            sortable: true,
            wrap: true,
        },
        {
            name: "Transection Details",
            selector: row => row.transdetails,
            sortable: true,
            wrap: true
        },
        {
            name: "Amount",
            selector: row => row.amount,
            sortable: true,
            wrap: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            wrap: true
        }
    ];

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
            selector: (row, index) => index + 1,
            sortable: true,
            width: "80px"
        },
        {
            name: "Actitivy",
            selector: row => row.action,
            sortable: true,
            wrap: true,
        },
        {
            name: "Browser",
            selector: row => row.config_browser,
        },
        {
            name: "IP Address",
            selector: row => row.ip_address,
        },
        {
            name: "Operating System",
            selector: row => row.config_os,
            sortable: true,
            wrap: true
        },
        {
            name: "Screen Resolution",
            selector: row => row.config_resolution,
            sortable: true,
            wrap: true
        },
        {
            name: "Loging Time",
            selector: row => row.visit_last_action_time,
            sortable: true,
            wrap: true

        },
        {
            name: "Logout Time",
            selector: row => row.logout,
            sortable: true,
            wrap: true
        },
    ];

    const [getTransDetailsData, setTransDetailsData] = useState([
        {
            "userid": "pradeepn",
            "transid": "CC415Sqfe899ds8fsdf",
            "transdetails": "This transtion is confirmed",
            "amount": "3000 rs",
            "status": "Payment Completed",
        },
    ])

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

    const [activityLogTableShow, setActvityLogTableShow] = useState(false);
    const [getAccessLogData, setAccessLogData] = useState([]);
    const [activityLogDateRange, setActivityLogDateRange] = useState({
        fromDate: '',
        toDate: ''
    })

    const dateHandler = (e) => {
        setActivityLogDateRange({
            ...activityLogDateRange,
            [e.target.name]: e.target.value
        })
    }

    const [activityLogDateRangeError, setActivityLogDateRangeError] = useState({
        fromDateError: '',
        toDateError: '',
        selectError: '',
    });

    const activityLogDateRangeValidate = () => {
        let fromDateErr = ''
        let toDateErr = ''
        let selectErr = ''

        if (!getLearnerIdName.id || getLearnerIdName.id == 'Choose......') {
            selectErr = t('select_the_name')
            setAccessLogData([]);
        }

        if (!activityLogDateRange.fromDate) {
            fromDateErr = t('Date_required')
        }
        if (!activityLogDateRange.toDate) {
            toDateErr = t('Date_required')
        }

        if (activityLogDateRange.fromDate && activityLogDateRange.toDate) {
            const from = new Date(activityLogDateRange.fromDate).getTime();
            const to = new Date(activityLogDateRange.toDate).getTime();
            if (from > to) {
                fromDateErr = t('should_be_less_than_to_date')
            }
        }
        if (fromDateErr || toDateErr || selectErr) {
            setActivityLogDateRangeError({
                ...activityLogDateRangeError,
                fromDateError: fromDateErr,
                toDateError: toDateErr,
                selectError: selectErr,
            })
            return false
        }
        return true
    }

    const [submitLoading, setSubmitLoading] = useState({
        isLoading: false
    })

    const onClickSubmitActivityLog = () => {
        // //console.log(UserService.getUserid())
        ////console.log(activityLogDateRange);
        const condition = activityLogDateRangeValidate();
        if (condition) {
            setActivityLogDateRangeError({
                ...activityLogDateRangeError,
                fromDateError: '',
                toDateError: '',
                selectError: '',
            })
            setActvityLogTableShow(true);
            setSubmitLoading({ isLoading: true });
            learnerService.getLearnerActivityLog(getLearnerIdName.id, activityLogDateRange.fromDate, activityLogDateRange.toDate)
                .then((resp) => {
                    setAccessLogData(resp.data);
                    setSubmitLoading({ isLoading: false });
                }).catch((err) => {
                    //console.log(err);
                })
        }
    }
    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );

    const transDetailsfilteredItems = getTransDetailsData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

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
                                    {t('analytic_report')}
                                </h3>
                                {/* <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Analytic Report</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Course Analytic Report</li>
                                    </ol>
                                </nav> */}
                            </div>



                            {/* <Col lg="12" className='mt-4'>
                                <table class="table table-borderless text-center shadow-lg p-5 bg-body rounded">
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
                                                <button className='btn btn-outline-info ml-3' onClick={() => setTransDetailsDiv(true)}>Transection Details</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Java</td>
                                            <td>9</td>
                                            <td><div class="progress" style={{ height: '2rem' }}>
                                                <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: '50%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">50%</div>
                                            </div></td>
                                            <td><button className='btn btn-outline-success' onClick={() => setMoreDetailsDiv(true)}>More Details</button>
                                                <button className='btn btn-outline-info ml-3' onClick={() => setTransDetailsDiv(true)}>Transection Details</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Oracle</td>
                                            <td>1</td>
                                            <td><div class="progress" style={{ height: '2rem' }}>
                                                <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: '30%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">30%</div>
                                            </div></td>
                                            <td><button className='btn btn-outline-success' onClick={() => setMoreDetailsDiv(true)}>More Details</button>
                                                <button className='btn btn-outline-info ml-3' onClick={() => setTransDetailsDiv(true)}>Transection Details</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col> */}

                            <Col lg="12">
                                {moreDetailsDiv ?
                                    <>
                                        <Row className='mt-4 mb-4'>
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
                                        </Row>
                                        <Row>
                                            <div class="col-8 col-md-4">
                                                <label class="control-label" for="name">User List : </label>
                                                <select onChange={(e) => onEmailIdSelectHandler()} class="custom-select" id="gender2">
                                                    <option selected>Choose...</option>
                                                    <option>pradeepn@cdac.in</option>
                                                    <option>Ramup@cdac.in</option>
                                                    <option>Learner@cdac.in</option>
                                                    <option>samirn@cdac.in</option>
                                                    <option>pradeepnamdev415@gmail.com</option>
                                                </select>
                                            </div>
                                        </Row>
                                    </> : ''
                                }
                            </Col>
                            <Col lg="12">
                                {getEmailListDiv ?
                                    <Row className='mt-4'>
                                        <div class="col-8 col-md-4">
                                            <select onChange={(e) => onSelectHandler(e)} class="custom-select" id="gender2">
                                                <option selected>{t('choose')}</option>
                                                {/* <option value="1">Quiz Report</option>
                                                <option value="2">Assignment Report</option> */}
                                                <option value="3">{t('time_spent_report')}</option>
                                                <option value="4">{t('content_access_log')}</option>
                                                {/* <option value="5">Activity Log</option> */}
                                            </select>
                                        </div>
                                    </Row> : ''
                                }
                                <Row className='mt-4'>
                                    <Col>
                                        {selectedState == 1 ?
                                            <div className="card">
                                                {/* <div className="card-body">
                                                        <DataTable
                                                            columns={quizReportcolumns}
                                                            title="Quiz Report"
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
                                                    </div> */}
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
                                                        title="Time Spent Report"
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
                                                        title="Content Access Log"
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
                                                        title="Activity Log"
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
                            </Col>
                            <Col lg="12">
                                <Row >
                                    <Col>
                                        <Row>
                                            <div class="col-8 col-md-4">
                                                <Form.Group>
                                                    <label>{t('select_learner')}</label>
                                                    <Form.Control onChange={e => setLearnerIdName({
                                                        ...getLearnerIdName,
                                                        id: e.target.value,
                                                        // fname: e.target.value.key2,
                                                        // lname: e.target.value.key3,
                                                    })} as='select' placeholder={t('select_learner')} >
                                                        <option selected>{t('choose')}</option>
                                                        {
                                                            learnerList.map((learner, index) => {
                                                                return (
                                                                    <option value={learner.learnerUsername}>{learner.firstName} {learner.lastName}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                {
                                                    activityLogDateRangeError.selectError
                                                        ?
                                                        <>
                                                            <div className="alert alert-danger mt-2">{activityLogDateRangeError.selectError}</div>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                                {/* <p>{//console.log(getLearnerIdName)}</p> */}
                                                {/* <select >
                                                    {
                                                        learnerList.map((learner, index) =>
                                                            <option >
                                                                {learner.firstName} {learner.lastName}
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                                {
                                                    getLearnerIdName
                                                } */}

                                                {/* <label class="control-label" for="name">Actitvity Log : </label>
                                                <select class="custom-select" id="gender2">
                                                    <option selected>Choose...</option>
                                                    <option>pradeepn@cdac.in</option>
                                                    <option>Ramup@cdac.in</option>
                                                    <option>Learner@cdac.in</option>
                                                    <option>samirn@cdac.in</option>
                                                    <option>pradeepnamdev415@gmail.com</option> 
                                                </select> */}
                                            </div>
                                        </Row>
                                        <br>
                                        </br>
                                        <Row >
                                            <div class="col-8 col-md-4">
                                                <label class="control-label" for="name">{t('from_date')} : </label>
                                                <input type="date" class="form-control" step="1" id="publishDate" name="fromDate" value={activityLogDateRange.fromDate} onChange={dateHandler} />
                                                {
                                                    activityLogDateRangeError.fromDateError
                                                        ?
                                                        <div className="alert alert-danger mt-2">{activityLogDateRangeError.fromDateError}</div>
                                                        :
                                                        <></>
                                                }
                                            </div>
                                            <div class="col-8 col-md-4">
                                                <label class="control-label" for="name">{t('to_date')} : </label>
                                                <input type="date" class="form-control" title={t('select_course_publish_date')} step="1" id="enrollSdate" name="toDate" value={activityLogDateRange.toDate} onChange={dateHandler} />
                                                {
                                                    activityLogDateRangeError.toDateError
                                                        ?
                                                        <div className="alert alert-danger mt-2">{activityLogDateRangeError.toDateError}</div>
                                                        :
                                                        <></>
                                                }
                                            </div>
                                            <div style={{ marginTop: '25px' }}>
                                                <Button onClick={onClickSubmitActivityLog} disabled={submitLoading.isLoading ? "true" : ""} style={{ background: "green", border: "0px" }}> {submitLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}  </Button>
                                            </div>
                                        </Row>
                                        {/* <div className="card-body"> */}
                                        <br>
                                        </br>
                                        <div>
                                            <Card>
                                                <br></br>
                                                <h5 style={{ textAlign: 'center' }}>{t('activity_log')}</h5>
                                                <br></br>
                                                <DataTable
                                                    columns={activityLogColumns}
                                                    //title="Access Log"
                                                    data={getAccessLogData}
                                                    defaultSortField="Name"
                                                    defaultSortAsc={true}
                                                    striped
                                                    pagination
                                                    highlightOnHover
                                                    customStyles={customStyles}
                                                // subHeader
                                                // subHeaderComponent={subHeaderComponent}
                                                />
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg="12">
                                {
                                    transDetailsDiv ? <div className="card-body">
                                        <DataTable
                                            columns={transDetailsColumns}
                                            title="Course Payment Details"
                                            data={transDetailsfilteredItems}
                                            defaultSortField="Name"
                                            defaultSortAsc={true}
                                            striped
                                            pagination
                                            highlightOnHover
                                            customStyles={customStyles}
                                            subHeader
                                            subHeaderComponent={subHeaderComponent}
                                        />
                                    </div> : ''
                                }
                            </Col>
                        </div>
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div >
    );
}

export default CourseAnalyticsReports;