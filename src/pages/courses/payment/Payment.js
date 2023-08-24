import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, OverlayTrigger, Tooltip, TabPane, Table } from 'react-bootstrap';
import HeaderTwo from '../../../components/HeaderTwo';
import { BreadcrumbBox } from '../../../components/common/Breadcrumb';
import FooterTwo from '../../../components/FooterTwo';
import { Styles } from './../styles/course.js';
import { Styles1 } from './../styles/reviewForm.js';
import service from '../../../services/service';
import UserService from '../../../services/UserService';
import { Styles2 } from '../../courses/styles/courseAccordian.js';
import { useHistory } from 'react-router-dom';
import RenderOnAuthenticated from '../../account/RenderOnAuthenticated';
import RenderOnAnonymous from '../../account/RenderOnAnonymous';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import Modal1 from "react-modal";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DataTableAssessment from '../../assessment/DataTableAssessment';
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import Timer from 'react-compound-timer';
import learnerService from '../../../services/learnerService';
import instructorService from '../../../services/instructorService';
import Videojs from '../../../pages/instructor/instCourses/video'
import ModalVideo from 'react-modal-video';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { colors } from "../../../components/common/element/elements.js";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import CryptoJS from "crypto-js";

//import {html2canvas, jsPDF} from 'app/ext';

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

function Payment(props) {

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

    ////console.log(props.match.params);
    let courseId = props.match.params.courseId;
    let tenantId = props.match.params.tenantId;
    let orderId = props.match.params.orderId;
    let username = UserService.getUsername();
    let userId = UserService.getUserid();
    const [courseValue, setCourseValue] = useState([]);
    const [msg, setmsg] = useState();
    const [msgshow, setMsgShow] = useState(true);

    useEffect(() => {
        learnerService.getCourseMetadataById(courseId)
            .then(async res => {
                await setCourseValue(JSON.parse(res.data));
            }).catch(err => {
                setmsg(t('service_maintainance_down_alert'));
                //history.push(`${process.env.PUBLIC_URL + "/course-grid/"}`);
            })

    }, [])

    const initialStateId = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        instituteName: '',
        eduQualification: '',
        address: '',
        city: '',
        pincode: '',
        countryId: '',
        stateId: '',
        districtId: '',
        updateBy: props.match.params.updateBy,
        learnerUsername: props.match.params.learnerUsername,
        firstNameError: '',
        lastNameError: '',
        genderError: '',
        dobError: '',
        mobileError: '',
        eduQualificationError: '',
        instituteNameError: '',
        addressError: '',
        cityError: '',
        pincodeError: '',
        countryIdError: '',
        stateIdError: '',
        districtIdError: '',
        facebookId: '',
        twitterId: '',
        linkedinId: '',
        youtubeId: '',
        skypeId: '',
        facebookIdError: '',
        twitterIdError: '',
        linkedinIdError: '',
        youtubeIdError: '',
        skypeIdError: ''
    };

    const [statusForCourse, setStatusForCourse] = useState({
        show: false
    });
    const [getUserDetails, setUserDetails] = useState(initialStateId);

    const [paymentDetails, setPaymentDetails] = useState({
        courseId: " ",
        fees: " ",
        orderId: " ",
        paymentId: " ",
        paymentSignature: " ",
        razorOrderId: " ",
        status: " ",
        transactionDate: " ",
        userId: " "
    })

    useEffect(() => {
        service.getUserById(userId)
            .then(res => {
                setUserDetails(res.data);
                ////console.log('UserDetail-------------'+res.data);
            })
            .catch(err => {
                //console.log(err);
            })

        service.getPaymentDetails(userId, courseId, tenantId)
            .then(res => {
                ////console.log(res.data);
                var formatDate = res.data.transactionDate;
                var responseDate = moment(formatDate).format('DD/MM/YYYY');
                ////console.log(responseDate);
                setPaymentDetails(paymentDetails => ({
                    ...paymentDetails,
                    paymentId: res.data.paymentId,
                    orderId: res.data.orderId,
                    razorOrderId: res.data.razorOrderId,
                    status: res.data.status,
                    fees: res.data.fees,
                    transactionDate: responseDate
                }));
            }).catch(err => {
                //console.log(err);
            })

    }, [])

    const cipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(32)).substr(-2);
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return text => text.split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('');
    }

    function redirectToCourse(id, tid) {
        // var result = '';
        // let length = 10;
        // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // var charactersLength = characters.length;
        // for (var i = 0; i < length; i++) {
        //     result += characters.charAt(Math.floor(Math.random() *
        //         charactersLength));
        // }
        // const myCipher = cipher(`${result}`)
        // let cid = myCipher(`${id}`);
        // let tId = myCipher(`${tid}`);
        // let rNumber = Math.floor(Math.random() * 10000000000);
        // //history.push(`${process.env.PUBLIC_URL + "/course-details/"}${rNumber}${cid}/${result}${tId}`);
        // window.location.href = `${process.env.PUBLIC_URL + "/course-details/"}${rNumber}${cid}/${result}${tId}`;

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

    const styleReciptTable = {
        background: "#f6f6f6",
        padding: "10px",
        fontSize: "14px",
        fontWeight: 'bold'
    }
    const styleReciptTableEven = {
        background: "#ffffff",
        padding: "10px",
        fontSize: "14px",
        fontWeight: 'bold'
    }

    function printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                // pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save("Payment Receipt.pdf");
            })
            ;
    }

    return (
        <div className="main-wrapper course-details-page" style={{ background: "rgba(24, 43, 73, 1)" }}>

            {/* Header 2 */}
            <div style={{ background: "white" }}>
                < HeaderTwo />
            </div>
            <Styles>
                <section className="course-details-area">
                    <Container >
                        <div>
                            <Card style={{ borderRadius: "10px", padding: "20px", boxShadow: "3px 4px 3px 3px #0f1e36", marginBottom: "30px", marginTop: "10px" }}>
                                <div>
                                    <div style={{ textAlign: "center" }}>
                                        <i class="fa fa-check fa-4x" aria-hidden="true"
                                            style={{ color: "white", background: `${colors.gr_bg}`, borderRadius: "60px", padding: "20px", margin: "20px", marginBottom: "0px", boxShadow: "1px 2px 1px #808080" }}></i>
                                    </div>
                                    <div style={{ textAlign: "center", paddingTop: "20px" }} id="divToPrint">
                                        <div>
                                            <h4 style={{ color: "green", fontWeight: 'bold' }}>MeghSikshak Payment Receipt</h4>
                                        </div>
                                        <div style={{ display: 'inline-block', textAlign: "left", width: "80%" }}>
                                            <div style={{ margin: "40px" }}>
                                                <Row >
                                                    <Col sm={6} style={styleReciptTable}>Order Number :</Col>
                                                    <Col sm={6} style={styleReciptTable}>{paymentDetails.orderId}</Col>
                                                </Row>
                                                <Row >
                                                    <Col sm={6} style={styleReciptTableEven}>User Name :</Col>
                                                    <Col sm={6} style={styleReciptTableEven}>{username}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={6} style={styleReciptTable}>Contact Number :</Col>
                                                    <Col sm={6} style={styleReciptTable}>{getUserDetails.mobile}</Col>
                                                </Row>
                                                <Row >
                                                    <Col sm={6} style={styleReciptTableEven}>Course Name :</Col>
                                                    <Col sm={6} style={styleReciptTableEven}>{courseValue.courseName}</Col>
                                                </Row>
                                                <Row >
                                                    <Col sm={6} style={styleReciptTable}>Course Fees :</Col>
                                                    <Col sm={6} style={styleReciptTable}>{courseValue.courseFee}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={6} style={styleReciptTableEven}>Payment Order ID :</Col>
                                                    <Col sm={6} style={styleReciptTableEven}>{paymentDetails.razorOrderId}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={6} style={styleReciptTable}>Payment ID :</Col>
                                                    <Col sm={6} style={styleReciptTable}>{paymentDetails.paymentId}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={6} style={styleReciptTableEven}>Status :</Col>
                                                    <Col sm={6} style={styleReciptTableEven}>{paymentDetails.status}</Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={6} style={styleReciptTable}>Transaction Date :</Col>
                                                    <Col sm={6} style={styleReciptTable}>{paymentDetails.transactionDate}</Col>
                                                </Row>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={printDocument} style={{ color: "white", background: `${colors.gr_bg}`, padding: "10px", margin: "5px", borderRadius: "5px", border: "0px" }}>Download</button>
                                    <button onClick={() => { redirectToCourse(courseId, tenantId) }} style={{ color: "white", background: "#808080", padding: "10px", margin: "5px", borderRadius: "5px", border: "0px" }}>Cancel</button>
                                </div>

                            </Card>
                        </div>
                    </Container>
                </section>
            </Styles>
        </div>
    )
}

export default Payment
