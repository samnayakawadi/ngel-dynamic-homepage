
import React, { useState, useEffect } from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import DataTable from "react-data-table-component";
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import services from '../../services/service.js';
import moment from 'moment';
import adminServices from '../../services/adminServices';
import UserService from '../../services/UserService';

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
    //   },
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
            paddingLeft: '0 8px',
            marginLeft: '10px'
        },
    },
};



function CoursePaymentDetails() {

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

    const [courseDetailsShow, setCourseDetailsShow] = useState(false);
    const [getCoursePaymentDetails, setCoursePaymentDetails] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [userName, setUserName] = useState([

    ]);
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [getFormattedDate, setFormattedDate] = useState([]);

    useEffect(() => {
        getAllCourseList();
    }, [])

    useEffect(() => {
        ////console.log("paymentDetails12345", paymentDetails);
    }, [paymentDetails])

    useEffect(() => {
        ////console.log("userName123", userName);
        ////console.log("getCoursePaymentDetails123", getCoursePaymentDetails);

        const updatedPaymentDetails = []
        for (let i = 0; i < getCoursePaymentDetails.length; i++) {
            ////console.log(userName[i]);
            ////console.log({ ...getCoursePaymentDetails[i], userName: userName[i], formattedDate:getFormattedDate[i]});
            updatedPaymentDetails.push({ ...getCoursePaymentDetails[i], userName: userName[i] })
            //setPaymentDetails(updatedPaymentDetails)    
        }

    }, [userName])

    useEffect(() => {
        setPaymentDetails([])
    }, [getCoursePaymentDetails])

    const getAllCourseList = () => {
        services.getAllCourses().then((resp) => {
            //setLearnerList(resp.data);
            ////console.log(resp.data)
            setCourseList(resp.data);
        }).catch((err) => {
            //console.log(err)
        })
    }

    const [getCourseIdName, setCourseIdName] = useState({
        id: ''
    })

    const [coursePayment, setCoursePayment] = useState({
        fromDate: '',
        toDate: ''
    })

    const dateHandler = (e) => {
        setCoursePayment({
            ...coursePayment,
            [e.target.name]: e.target.value
        })
    }

    const [coursePaymentRangeError, setCoursePaymentRangeError] = useState({
        fromDateError: '',
        toDateError: '',
        selectError: '',
    });

    const coursePaymentRangeValidate = () => {
        let fromDateErr = ''
        let toDateErr = ''
        let selectErr = ''

        if (!getCourseIdName.id || getCourseIdName.id == 'Choose......') {
            selectErr = `${t('select_the_name')}`
            setCoursePaymentDetails([]);
        }

        if (!coursePayment.fromDate) {
            fromDateErr = `${t('Date_required')}`
        }
        if (!coursePayment.toDate) {
            toDateErr = `${t('Date_required')}`
        }

        if (coursePayment.fromDate && coursePayment.toDate) {
            const from = new Date(coursePayment.fromDate).getTime();
            const to = new Date(coursePayment.toDate).getTime();
            if (from > to) {
                fromDateErr = `${t('should_be_less_than_to_date')}`
            }
        }
        if (fromDateErr || toDateErr || selectErr) {
            setCoursePaymentRangeError({
                ...coursePaymentRangeError,
                fromDateError: fromDateErr,
                toDateError: toDateErr,
                selectError: selectErr,
            })
            return false
        }
        return true
    }

    const activityLogColumns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            width: '150px',
            sortable: true,
        },
        {
            name: "Name",
            selector: row => row.userName,
            //selector: row => moment.unix(row.userId).utc(),
            sortable: true,
            width: '250px',
            wrap: true,
        },
        {
            name: "Order Id",
            selector: row => row.orderId,
            sortable: true,
            width: '250px',
            wrap: true,
        },
        {
            name: "Amount",
            selector: row => row.fees,
            width: '250px',
            wrap: true,
        },
        {
            name: "Razor Order Id",
            selector: row => row.razorOrderId,
            width: '250px',
            wrap: true,
        },
        {
            name: "Payment Id",
            selector: row => row.paymentId,
            width: '250px',
            sortable: true,
            wrap: true,
        },
        {
            name: "Transaction Date",
            selector: row => row.formattedDate,
            sortable: true,
            width: '250px',
            wrap: true,
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            width: '250px',
            wrap: true,
        }
    ];


    const [submitLoading, setSubmitLoading] = useState({
        isLoading: false
    })

    const onClickSubmitCourseDetails = async () => {
        // setUpdateCoursePayments(false)
        // setPaymentDetails([])
        // //console.log(UserService.getUserid())
        ////console.log(coursePayment);
        const condition = coursePaymentRangeValidate();
        if (condition) {
            setCoursePaymentRangeError({
                ...coursePaymentRangeError,
                fromDateError: '',
                toDateError: '',
                selectError: '',
            })
            setCourseDetailsShow(true);
            setSubmitLoading({ isLoading: true });
            services.getCoursePaymentDetailsByDate(getCourseIdName.id, coursePayment.fromDate, coursePayment.toDate)
                .then((resp) => {
                    const newPaymentEntry = [];
                    // //console.log(resp.data);
                    if (resp.data.length === 0) {
                        setSubmitLoading({ isLoading: false });
                    }

                    setCoursePaymentDetails(resp.data);
                    {
                        resp.data.forEach(async (data1) => {

                            var t = new Date(data1.transactionDate);
                            var formatted = moment(t).format('lll');
                            ////console.log(data1);
                            ////console.log(formatted);
                            //setFormattedDate(prevState => { return [...prevState, formatted] })

                            adminServices.getLearnerByid(data1.userId)
                                .then(res => {
                                    //setUserName(prevState => { return [...prevState, res.data.firstName] })
                                    newPaymentEntry.push({ ...data1, userName: res.data.firstName, formattedDate: formatted })
                                    ////console.log(newPaymentEntry);
                                    //setPaymentDetails(prevState => { return [...prevState, newPaymentEntry] })
                                    setPaymentDetails([...newPaymentEntry]);
                                    setSubmitLoading({ isLoading: false });
                                })
                                .catch(err => {
                                    ////console.log("Username By Id " + err)
                                })

                        })

                    }
                })
                .catch((err) => {
                    //console.log(err);
                })
        }
    }

    ////console.log(paymentDetails);

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
                                    {t('payment_details_course')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('payment_details')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('payment_details_course')}</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <Col lg="12">
                                        <Row >
                                            <Col>
                                                <Row>
                                                    <div class="col-8 col-md-4">
                                                        <Form.Group>
                                                            <label>{t('select_the_course')}</label>
                                                            <Form.Control
                                                                onChange={e => setCourseIdName({
                                                                    ...getCourseIdName,
                                                                    id: e.target.value
                                                                })}
                                                                as='select' placeholder='Select Course' >
                                                                <option selected>{t('choose')}</option>
                                                                {
                                                                    courseList.map((course, index) => {
                                                                        return (
                                                                            <option value={
                                                                                course.courseId
                                                                            }>
                                                                                {course.courseName}
                                                                            </option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                </Row>
                                                <br>
                                                </br>
                                                <Row >
                                                    <div className="col-8 col-md-4 mb-3 mb-md-0">
                                                        <label class="control-label" for="name">{t('from_date')} : </label>
                                                        <input type="date" class="form-control" step="1" id="publishDate" name="fromDate" value={coursePayment.fromDate} onChange={dateHandler} />
                                                        {
                                                            coursePaymentRangeError.fromDateError
                                                                ?
                                                                <div className="alert alert-danger mt-2">{coursePaymentRangeError.fromDateError}</div>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-8 col-md-4 mb-3 mb-md-0">
                                                        <label class="control-label" for="name">{t('to_date')}</label>
                                                        <input type="date" class="form-control" title="Select Course Publish Date" step="1" id="enrollSdate" name="toDate" value={coursePayment.toDate} onChange={dateHandler} />
                                                        {
                                                            coursePaymentRangeError.toDateError
                                                                ?
                                                                <div className="alert alert-danger mt-2">{coursePaymentRangeError.toDateError}</div>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-8 col-md-4" style={{ marginTop: "25px" }}>
                                                        <Button onClick={onClickSubmitCourseDetails} disabled={submitLoading.isLoading ? "true" : ""} style={{ background: "green", border: "0px" }}>{submitLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</Button>
                                                    </div>
                                                </Row>
                                                {/* <div className="card-body"> */}
                                                <br>
                                                </br>
                                                <div>
                                                    <Card>
                                                        <br></br>
                                                        <h5 style={{ textAlign: 'center' }}>{t('payment_details')}</h5>
                                                        <br></br>
                                                        <DataTable
                                                            columns={activityLogColumns}
                                                            //title="Access Log"
                                                            data={paymentDetails}
                                                            defaultSortField="Order Id"
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
                                </div>
                            </div>
                        </div>
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div >
    );
}

export default CoursePaymentDetails;