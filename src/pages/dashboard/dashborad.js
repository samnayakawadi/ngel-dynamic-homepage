import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import HeaderTwo from '../../components/HeaderTwo'
import { Styles } from './styles/dashborad.js'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import UserService from '../../services/UserService'
import service from '../../services/service'
import { useMemo } from 'react'
import FilterDataTable from '../instructor/FilterDataTable'
import DataTable from "react-data-table-component";
import Table from 'react-bootstrap/Table';
import learnerService from '../../services/learnerService'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

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




function Dashborad() {



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

    const [getTimeDur, setTimeDur] = useState([]);
    const [getContentTimeDur, setContentTimeDur] = useState([]);
    let userId = UserService.getUserid();
    useEffect(() => {
        service.userLoginDuration(userId)
            .then(res => {
                setTimeDur(res.data);
            })
        service.userContentAccessDur(userId)
            .then(res => {
                setContentTimeDur(res.data);
            })
    }, [])

    let data1 = getTimeDur.map((d) => {
        return d.time + "," + d.month + "," + d.year
    })

    var arr1 = [];
    var month = [];
    var myStringArray = data1;
    var arrayLength = myStringArray.length;
    for (var i = 0; i < arrayLength; i++) {
        var minutes = [];
        var hms = myStringArray[i];
        var b = hms.split(',');
        b.shift();
        var lastItem = b.pop();
        var a = hms.split(':');
        if (b == "1") {
            b = `Jan, ${lastItem}`
        } else if (b == "2") {
            b = `Feb, ${lastItem}`
        } else if (b == "3") {
            b = `Mar, ${lastItem}`
        } else if (b == "4") {
            b = `Apr, ${lastItem}`
        } else if (b == "5") {
            b = `May, ${lastItem}`
        } else if (b == "6") {
            b = `Jun, ${lastItem}`
        } else if (b == "7") {
            b = `Jul, ${lastItem}`
        } else if (b == "8") {
            b = `Aug, ${lastItem}`
        } else if (b == "9") {
            b = `Sep, ${lastItem}`
        } else if (b == "10") {
            b = `Oct, ${lastItem}`
        } else if (b == "11") {
            b = `Nov, ${lastItem}`
        } else if (b == "12") {
            b = `Dec, ${lastItem}`
        }
        month.push(b);
        minutes.push((+a[0]) * 60 + (+a[1]), b.toString())
        arr1.push(minutes)
    }

    let value = 10
    const courseProgress = [
        [value, 'Completed'],
        [100 - value, 'Not Completed'],

    ]

    const [moreDetailsDiv, setMoreDetailsDiv] = useState({
        condition: false,
        setID: '',
        courseName: '',
    });
    const [selectedState, setSelectedState] = useState();

    const onSelectHandler = (e) => {
        setSelectedState(e.target.value);
        setMoreDetailsLoading({ isLoading: false });
    }

    const chartOptions1 = {
        chart: {
            backgroundColor: '#e1f2ef',
            type: 'pie',
            height: (9 / 16 * 100) + '%',// 16:9 ratio
        },
        title: {
            text: t('course_progress')
        },
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: true,
            buttons: {
                customButton: {
                    x: -0,
                    y: +110,
                    onclick: function () {
                        setMoreDetailsDiv(true)
                    },
                    text: t('more_details'),
                }
            }, theme: {
                'stroke-width': 1,
                stroke: 'silver',
                r: 0,
                states: {
                    hover: {
                        fill: '#a4edba'
                    },
                    select: {
                        stroke: '#039',
                        fill: '#a4edba'
                    }
                }
            }
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [
            {
                innerSize: '60%',
                data: courseProgress,
                showInLegend: true,
                keys: ["y", "name", 'selected', 'sliced'],
                allowPointSelect: true,
            }
        ]
    };




    /*********************** GET LIST OF ENROLLED COURSE ********************/

    useEffect(() => {
        getEnrolledCourseList();
    }, [])

    const [enrolledCourseList, setEnrolledCourseList] = useState([]);
    const getEnrolledCourseList = () => {
        service.getUserEnrolledCourses(UserService.getUserid(), 1).then((resp) => {
            setEnrolledCourseList(resp.data);
            ////console.log(resp.data);
        }).catch((err) => {
            //console.log(err);
        })
    }

    const enrolledCourseListColumn = [
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
                {moment(row.courseStartDate).format('MM-DD-YYYY HH:mm')}
                {/* <div>{new Date(row.courseStartDate).getDate()}-{new Date(row.courseStartDate).getMonth()}-{new Date(row.courseStartDate).getFullYear()}</div>
                <div>{new Date(row.courseStartDate).getHours()}:{new Date(row.courseStartDate).getMinutes()}:{new Date(row.courseStartDate).getSeconds()}</div> */}
            </>,
        },
        {
            // row.courseDetails.courseClosingDate
            name: 'Closing Date',
            selector: row => <>
                {moment(row.courseDetails.courseClosingDate).format('MM-DD-YYYY HH:mm')}
                {/* <div>{new Date(row.courseDetails.courseClosingDate).getDate()}-{new Date(row.courseDetails.courseClosingDate).getMonth()}-{new Date(row.courseDetails.courseClosingDate).getFullYear()}</div>
                <div>{new Date(row.courseDetails.courseClosingDate).getHours()}:{new Date(row.courseDetails.courseClosingDate).getMinutes()}:{new Date(row.courseDetails.courseClosingDate).getSeconds()}</div> */}
            </>,
        },
        {
            name: 'Action',
            cell: row => <>
                <Button onClick={() => { onClickMoreDetails(row.id.courseId, row.courseDetails.courseName) }} disabled={moreDetailsLoading.isLoading ? "true" : ""} style={{ background: "green", border: "0px" }}> {moreDetailsLoading.isLoading ? (<> {t}</>) : "More Details"} </Button>
            </>
        }

    ]

    const [moreDetailsLoading, setMoreDetailsLoading] = useState({
        isLoading: false
    })

    const onClickMoreDetails = (id, courseName) => {
        setMoreDetailsDiv({
            ...moreDetailsDiv,
            condition: true,
            setID: id,
            courseName: courseName,
        })
        setMoreDetailsLoading({ isLoading: true });
        setTimeSpendReportShow(false);
        setContentAccessLogShow(false);
        if (selectedState) {
            setMoreDetailsLoading({ isLoading: false });
            document.getElementById('select').value = 'Choose'
            setSelectedState('');
            setTimeSpendDateRange({
                ...timeSpendDateRange,
                fromTimeSpendDate: '',
                toTimeSpendDate: '',
            })
            setContentDateRange({
                ...contentDateRange,
                fromContentDateRange: '',
                toContentDateRange: '',
            })
            setTimeSpentReportData([]);
            setContentAccessLogData([]);
            setMoreDetailsLoading({ isLoading: false });
        }
        resetError();
    }



    /************************END OF GET LIST OF ENROLLED COURSE**************/

    const quizReportcolumns = [
        {
            name: "S.No",
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: "Exam Name",
            selector: row => row.examname,
            sortable: true,
            wrap: true,
        },
        {
            name: "Start Date",
            selector: row => row.startdate,
            sortable: true,
            wrap: true
        },
        {
            name: "End Date",
            selector: row => row.enddate,
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
            name: "Status",
            selector: row => row.status,
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
            selector: (row, index) => index + 1,
            sortable: true,
            width: "80px"
        },
        {
            name: "Content Type",
            selector: row => row.resTitle,

        },
        {
            name: "Time Spent (HH:MM:SS)",
            selector: row => row.spentTime,
            sortable: true,
            wrap: true
        },
    ];

    const contentAccessColumns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "80px"
        },
        {
            name: "Content Type",
            selector: row => row.resTitle,
            sortable: true,
            wrap: true,
        },
        {
            name: "Start Time",
            selector: row => row.inTime,
            sortable: true,
            wrap: true
        },
        {
            name: "End Time",
            selector: row => row.outTime,
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

    const [getQuizReportData, setQuizReportData] = useState([
        {
            "id": 1,
            "examname": "Java Quiz",
            "startdate": "2022-10-12T09:46:00.000+05:30",
            "enddate": "2022-10-12T09:46:00.000+05:30",
            "marks": "20",
            "status": "Completed",

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

    const [getTimeSpentReportData, setTimeSpentReportData] = useState([]);
    const [timeSpendReportShow, setTimeSpendReportShow] = useState(false);
    const [timeSpendDateRange, setTimeSpendDateRange] = useState({
        fromTimeSpendDate: '',
        toTimeSpendDate: '',
    });
    const timeSpendHandler = (e) => {
        setTimeSpendDateRange({
            ...timeSpendDateRange,
            [e.target.name]: e.target.value
        })
    }
    const [timeSpendDateRangeError, setTimeSpendDateRangeError] = useState({
        fromDateError: '',
        toDateError: '',
    });

    const timeSpendDateRangeValidate = () => {
        let fromDateErr = ''
        let toDateErr = ''

        if (!timeSpendDateRange.fromTimeSpendDate) {
            fromDateErr = t('date_required')
        }
        if (!timeSpendDateRange.toTimeSpendDate) {
            toDateErr = t('date_required')
        }

        if (timeSpendDateRange.fromTimeSpendDate && timeSpendDateRange.toTimeSpendDate) {
            const from = new Date(timeSpendDateRange.fromTimeSpendDate).getTime();
            const to = new Date(timeSpendDateRange.toTimeSpendDate).getTime();
            if (from > to) {
                fromDateErr = t('should_be_less_than_todate')
            }
        }
        if (fromDateErr || toDateErr) {
            setTimeSpendDateRangeError({
                ...timeSpendDateRangeError,
                fromDateError: fromDateErr,
                toDateError: toDateErr,
            })
            return false
        }
        return true
    }

    const resetError = () => {
        setTimeSpendDateRangeError({
            ...timeSpendDateRangeError,
            fromDateError: '',
            toDateError: '',
        })

        setContentDateRangeError({
            ...contentDateRangeError,
            fromDateError: '',
            toDateError: '',
        })

        setActivityLogDateRangeError({
            ...activityLogDateRangeError,
            fromDateError: '',
            toDateError: '',
        })
    }


    const [onClickSubmit, setOnClickSubmit] = useState({
        isLoading: false
    })

    const onClickTimeSpend = () => {

        setMoreDetailsLoading({ isLoading: false });
        ////console.log(timeSpendDateRange);
        const condition = timeSpendDateRangeValidate();
        if (condition) {
            setOnClickSubmit({ isLoading: true });
            learnerService.getLearnerTimeSpend(userId, moreDetailsDiv.setID, timeSpendDateRange.fromTimeSpendDate, timeSpendDateRange.toTimeSpendDate).then((resp) => {
                setTimeSpendReportShow(true);
                setTimeSpentReportData(resp.data);
                resetError();
                ////console.log(resp.data);
                setOnClickSubmit({ isLoading: false });
            }).catch((err) => {
                //console.log(err);
            })
        }
    }


    const [getContentAccessLogData, setContentAccessLogData] = useState([]);
    const [contentAccessLogShow, setContentAccessLogShow] = useState(false);
    const [contentDateRange, setContentDateRange] = useState({
        fromContentDateRange: '',
        toContentDateRange: '',
    })

    const contentDateRangeHandler = (e) => {
        setContentDateRange({
            ...contentDateRange,
            [e.target.name]: e.target.value,
        })
    }

    const [contentDateRangeError, setContentDateRangeError] = useState({
        fromDateError: '',
        toDateError: '',
    });

    const contentDateRangeValidate = () => {
        let fromDateErr = ''
        let toDateErr = ''

        if (!contentDateRange.fromContentDateRange) {
            fromDateErr = t('Date_required')
        }
        if (!contentDateRange.toContentDateRange) {
            toDateErr = t('should_be_less_than_todate')
        }

        if (contentDateRange.fromContentDateRange && contentDateRange.toContentDateRange) {
            const from = new Date(contentDateRange.fromContentDateRange).getTime();
            const to = new Date(contentDateRange.toContentDateRange).getTime();
            if (from > to) {
                fromDateErr = t('')
            }
        }
        if (fromDateErr || toDateErr) {
            setContentDateRangeError({
                ...contentDateRangeError,
                fromDateError: fromDateErr,
                toDateError: toDateErr,
            })
            return false
        }
        return true
    }


    const [onClickContentSubmit, setOnClickContentSubmit] = useState({
        isLoading: false
    })

    const onClickContentRange = () => {
        setOnClickContentSubmit({ isLoading: true });
        ////console.log(contentDateRange);
        const condition = contentDateRangeValidate();
        if (condition) {
            setContentAccessLogShow(true);
            learnerService.getLearnerContentAccessLog(userId, moreDetailsDiv.setID, contentDateRange.fromContentDateRange, contentDateRange.toContentDateRange).then((resp) => {
                setContentAccessLogShow(true);
                setContentAccessLogData(resp.data);
                resetError();
                setOnClickContentSubmit({ isLoading: false });
                ////console.log(resp.data)
            }).catch((err) => {
                //console.log(err);
            })
        }

    }


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
    });

    const activityLogDateRangeValidate = () => {
        let fromDateErr = ''
        let toDateErr = ''

        if (!activityLogDateRange.fromDate) {
            fromDateErr = t('date_required')
        }
        if (!activityLogDateRange.toDate) {
            toDateErr = t('date_required')
        }

        if (activityLogDateRange.fromDate && activityLogDateRange.toDate) {
            const from = new Date(activityLogDateRange.fromDate).getTime();
            const to = new Date(activityLogDateRange.toDate).getTime();
            if (from > to) {
                fromDateErr = t('should_be_less_than_todate')
            }
        }
        if (fromDateErr || toDateErr) {
            setActivityLogDateRangeError({
                ...activityLogDateRangeError,
                fromDateError: fromDateErr,
                toDateError: toDateErr,
            })
            return false
        }
        return true
    }


    const [onClickSubmitActivity, setOnClickSubmitActivity] = useState({
        isLoading: false
    })

    const onClickSubmitActivityLog = () => {

        ////console.log(UserService.getUserid())
        ////console.log(activityLogDateRange);
        const condition = activityLogDateRangeValidate();
        if (condition) {
            setOnClickSubmitActivity({ isLoading: true });
            setActvityLogTableShow(true);
            const userId = UserService.getUserid();
            learnerService.getLearnerActivityLog(userId, activityLogDateRange.fromDate, activityLogDateRange.toDate)
                .then((resp) => {
                    setAccessLogData(resp.data);
                    resetError();
                    setOnClickSubmitActivity({ isLoading: false });
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
    const quizfilteredItems = getQuizReportData.filter(
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

        <Styles>

            {/* Main Wrapper */}
            <div className="main-wrapper dashboard-page">

                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('learner_dashboard')} />

                <section className="dashboard-page-area">
                    <Container>
                        <Row>
                            {/* <Col lg="4" className='mt-4'>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={""}
                                    options={chartOptions1}
                                />
                            </Col> */}
                            <Col lg="12" className='mt-4'>
                                <div className="card-body">
                                    <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>{t('enrolled_course_list')}</h4>
                                    <br></br>
                                    <DataTable
                                        columns={enrolledCourseListColumn}
                                        data={enrolledCourseList}
                                        defaultSortAsc={true}
                                        striped
                                        pagination
                                        highlightOnHover
                                        customStyles={customStyles}
                                    // subHeader
                                    // subHeaderComponent={subHeaderComponent}
                                    />
                                </div>




                                {/* <table class="table table-borderless text-center shadow-lg p-5 bg-body rounded">
                                    <thead>
                                        <tr>
                                            <th>Course Name</th>
                                            <th>Progress</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Reactjs</td>
                                            <td><div class="progress" style={{ height: '2rem' }}>
                                                <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: '10%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">10%</div>
                                            </div></td>
                                            <td><Button onClick={() => setMoreDetailsDiv(true)}>More Details</Button></td>
                                        </tr>
                                        <tr>
                                            <td>Java</td>
                                            <td><div class="progress" style={{ height: '2rem' }}>
                                                <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: '50%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">50%</div>
                                            </div></td>
                                            <td><Button onClick={() => setMoreDetailsDiv(true)}>More Details</Button></td>
                                        </tr>
                                        <tr>
                                            <td>Oracle</td>
                                            <td><div class="progress" style={{ height: '2rem' }}>
                                                <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: '30%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">30%</div>
                                            </div></td>
                                            <td><Button onClick={() => {
                                                setMoreDetailsDiv(true)
                                                setSelectedState('none')
                                            }
                                            }>More Details</Button></td>
                                        </tr>
                                    </tbody>
                                </table> */}
                            </Col>


                            <Col lg="12">
                                {moreDetailsDiv.condition ?
                                    <>
                                        <div>
                                            <h3>{moreDetailsDiv.courseName}</h3>
                                        </div>
                                        <Row className='mt-4'>
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-8 col-md-4">
                                                        <select onChange={(e) => onSelectHandler(e)} class="custom-select" id="select">
                                                            <option selected value='Choose'>{t('choose')}</option>
                                                            {/* <option value="1">Quiz Report</option>
                                                        <option value="2">Assignment Report</option> */}
                                                            <option value="3">{t('time_spent_report')}</option>
                                                            <option value="4">{t('content_access_log')}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row></> : ''
                                }
                                <Row className='mt-4'>
                                    <Col>
                                        {selectedState == 1 ?
                                            <div className="card">

                                                <div className="card-body">
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
                                            </div> : selectedState == 3
                                                ?
                                                <>

                                                    <div className="card">
                                                        <br></br>
                                                        <h5 style={{ textAlign: 'center' }}>{t('time_spend_report')}</h5>
                                                        <br></br>
                                                        <Row style={{ justifyContent: 'space-around' }}>
                                                            <div class="col-8 col-md-4">
                                                                <label class="control-label" for="name">{t('from_date')} :</label>
                                                                <input type="date" class="form-control" step="1" id="publishDate" name="fromTimeSpendDate" value={timeSpendDateRange.fromTimeSpendDate} onChange={timeSpendHandler} />
                                                                {
                                                                    timeSpendDateRangeError.fromDateError
                                                                        ?
                                                                        <div className="alert alert-danger mt-2">{timeSpendDateRangeError.fromDateError}</div>
                                                                        :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="col-8 col-md-4">
                                                                <label class="control-label" for="name">{t('to_date')} : </label>
                                                                <input type="date" class="form-control" title={t('select_course_publish_date')} step="1" id="enrollSdate" name="toTimeSpendDate" value={timeSpendDateRange.toTimeSpendDate} onChange={timeSpendHandler} />
                                                                {
                                                                    timeSpendDateRangeError.toDateError
                                                                        ?
                                                                        <div className="alert alert-danger mt-2">{timeSpendDateRangeError.toDateError}</div>
                                                                        :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div>
                                                                <Button style={{ marginTop: '25px', background: "green", border: "0px" }} onClick={onClickTimeSpend} disabled={onClickSubmit.isLoading ? "true" : ""}> {onClickSubmit.isLoading ? (<>{t('loading')}</>) : <>{t('submit')}</>} </Button>
                                                            </div>
                                                        </Row>
                                                        <br></br>
                                                        {
                                                            timeSpendReportShow
                                                                ?
                                                                <>
                                                                    <div className="card-body">
                                                                        <DataTable
                                                                            columns={timeSpentColumns}
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
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }

                                                    </div>
                                                </>

                                                : selectedState == 4
                                                    ?
                                                    <>
                                                        <div className="card">
                                                            <br></br>
                                                            <h5 style={{ textAlign: 'center' }}>{t('content_access_log')}</h5>
                                                            <br></br>
                                                            <Row style={{ justifyContent: 'space-around' }}>
                                                                <div class="col-8 col-md-4">
                                                                    <label class="control-label" for="name">{t('from_date')} : </label>
                                                                    <input type="date" class="form-control" step="1" id="publishDate" name="fromContentDateRange" value={contentDateRange.fromContentDateRange} onChange={contentDateRangeHandler} />
                                                                    {
                                                                        contentDateRangeError.fromDateError
                                                                            ?
                                                                            <div className="alert alert-danger mt-2">{contentDateRangeError.fromDateError}</div>
                                                                            :
                                                                            <></>
                                                                    }
                                                                </div>
                                                                <div class="col-8 col-md-4">
                                                                    <label class="control-label" for="name">{t('to_date')} : </label>
                                                                    <input type="date" class="form-control" title={t('select_course_publish_date')} step="1" id="enrollSdate" name="toContentDateRange" value={contentDateRange.toContentDateRange} onChange={contentDateRangeHandler} />
                                                                    {
                                                                        contentDateRangeError.toDateError
                                                                            ?
                                                                            <div className="alert alert-danger mt-2">{contentDateRangeError.toDateError}</div>
                                                                            :
                                                                            <></>
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <Button style={{ marginTop: '25px', background: "green" }} onClick={onClickContentRange} disabled={onClickContentSubmit.isLoading ? "true" : ""} >  {onClickContentSubmit.isLoading ? (<> {t('loading')}</>) : <>{t('submit')}</>} </Button>
                                                                </div>
                                                            </Row>
                                                            <br></br>
                                                            {
                                                                contentAccessLogShow
                                                                    ?
                                                                    <>
                                                                        <div className="card-body">
                                                                            <DataTable
                                                                                columns={contentAccessColumns}
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
                                                                    </>
                                                                    :
                                                                    <>
                                                                    </>
                                                            }
                                                        </div>
                                                    </>
                                                    : selectedState == 5 ? <div className="card">
                                                        <div className="card-body">
                                                            <DataTable
                                                                columns={activityLogColumns}
                                                                //title="Activity Log"
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
                                <br></br>
                            </Col>
                            <br></br>
                            <Col lg="12">
                                <Row >
                                    <Col>
                                        <div className="card ">
                                            <br></br>
                                            <h5 style={{ textAlign: 'center' }}>{t('activity_log')}</h5>
                                            <br></br>
                                            <Row className="justify-content-center">
                                                <Col xs={8} md={4}>
                                                        <div className='col W-100'>
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
                                                </Col>
                                                <Col xs={8} md={4}>
                                                    <div className='col W-100'>
                                                        <label class="control-label" for="name">{t('to_date')} : </label>
                                                        <input type="date" class="form-control" title="Select Course Publish Date" step="1" id="enrollSdate" name="toDate" value={activityLogDateRange.toDate} onChange={dateHandler} />
                                                        {
                                                            activityLogDateRangeError.toDateError
                                                                ?
                                                                <div className="alert alert-danger mt-2">{activityLogDateRangeError.toDateError}</div>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col xs={8} md={4}>
                                                    <div className='col W-100'>
                                                        <Button style={{ marginTop: '25px', background: "green", border: "0px" }} onClick={onClickSubmitActivityLog} disabled={onClickSubmitActivity.isLoading ? "true" : ""}>  {onClickSubmitActivity.isLoading ? (<>{t('loading')}</>) : <>{t('submit')}</>} </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <br></br>
                                            {/* table table-borderless text-center shadow-lg p-5 bg-body rounded */}
                                            {
                                                activityLogTableShow
                                                    ?
                                                    <>
                                                        <div className="card-body">
                                                            <DataTable
                                                                columns={activityLogColumns}
                                                                // title="Access Log"
                                                                data={accesslogfilteredItems}
                                                                defaultSortField="Name"
                                                                defaultSortAsc={true}
                                                                noDataComponent={true}
                                                                striped
                                                                pagination
                                                                highlightOnHover
                                                                customStyles={customStyles}
                                                                subHeader
                                                                subHeaderComponent={subHeaderComponent}
                                                            />
                                                        </div>

                                                    </>
                                                    :
                                                    <>
                                                    </>
                                            }

                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Footer 2 */}
                <FooterTwo />
            </div>
        </Styles>

    )
}
export default Dashborad