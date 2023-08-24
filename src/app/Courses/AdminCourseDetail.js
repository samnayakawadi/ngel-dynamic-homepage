import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, OverlayTrigger, Tooltip, TabPane, Dropdown, NavDropdown } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
//import { Styles } from '../../pages/instructor/instCourses/styles/coursedetails.js';
import { Styles } from './styles/course1.js';
import { Styles1 } from './styles/reviewForm.js';
import service from '../../services/service';
import UserService from '../../services/UserService';
import ReplyForm from '../../pages/courses/components/ReplyForm';
import UpdateReviewform from '../../pages/courses/components/UpdateReviewForm';
import { useHistory } from 'react-router-dom';
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated';
import RenderOnAnonymous from '../../pages/account/RenderOnAnonymous';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import Modal1 from "react-modal";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DataTableAssessment from '../../pages/assessment/DataTableAssessment';
import DiscussionMain from '../../pages/discussion/DiscussionMain';
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { Spinner } from 'react-bootstrap';
import CourseFeedback from '../../pages/account/CourseFeedback';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { FacebookIcon, FacebookShareButton, LinkedinShareButton, TwitterIcon, TwitterShareButton, LinkedinIcon, WhatsappIcon, WhatsappShareButton } from 'react-share';
import Timer from 'react-compound-timer';
import learnerService from '../../services/learnerService';
import instructorService from '../../services/instructorService';
import Videojs from '../../pages/instructor/instCourses/video'
import ModalVideo from 'react-modal-video';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import EnrolledAssignment from '../../pages/courses/enrolledAssignment/EnrolledAssignment';
import moment from 'moment';
import { colors } from "../../components/common/element/elements.js";
import Query from '../../pages/courses/Query/Query';
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import { UncontrolledCollapse } from "reactstrap";
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import adminServices from '../../services/adminServices';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { downloadExcel, DownloadTableExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import logo from "../../assets/images/logo.png";
import ViewPdf from "../../pages/instructor/ViewPdf";
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
            textTransform: 'uppercase',
            // paddingLeft: '0 8px',
            // marginLeft: '10px',
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

function AdminCourseDetail(props) {

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

    const decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 32))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    }


    const [courseId, setDecodedCourseId] = useState(null)
    const [tenantId, setDecodedTenantId] = useState(null)

    // let courseID = props.match.params.id;
    // let tenantID = props.match.params.tid;
    // let hashcode = tenantID.substring(0, 10);
    // const myDecipher = decipher(`${hashcode}`);
    // let CID = courseID.substring(10);
    // let TID = tenantID.substring(10);
    // let courseId = myDecipher(`${CID}`);
    // let tenantId = myDecipher(`${TID}`);
    // // let courseId = courseID.substring(10);
    // // let tenantId = tenantID.substring(10);;
    let mainurl = "http://10.244.3.218:3000/course-details/";
    let url = mainurl + courseId + '/' + tenantId;
    // //console.log("tenantId in course details file" + tenantId);
    const um_api = UserService.USER_API;
    ////console.log(courseId + " " + tenantId);
    //////console.log(um_api);
    const [isDecodeValid, setIsDecodeValid] = useState("NOTVALID")

    const decodeHandler = () => {

        // // console.log("called decodeHandler")
        // let courseID = props.match.params.id;
        // let tenantID = props.match.params.tid;

        // console.log("Recived courseID", courseID)
        // console.log("Recived tenantID", tenantID)

        // let hashcode = tenantID.substring(0, 10);
        // const myDecipher = decipher(`${hashcode}`);
        // let CID = courseID.substring(10);
        // let TID = tenantID.substring(10);
        // let courseId = myDecipher(`${CID}`);
        // let tenantId = myDecipher(`${TID}`);
        // // let courseId = courseID.substring(10);
        // // let tenantId = tenantID.substring(10);;
        

        const secretKey = "cdac@123"

        const encodedCourseId = props.match.params.id.replace(/-/g, "+").replace(/_/g, "/");
        const decodedCourseId = CryptoJS.AES.decrypt(
            encodedCourseId,
            secretKey
        ).toString(CryptoJS.enc.Utf8);

        const encodedTenantId = props.match.params.tid.replace(/-/g, "+").replace(/_/g, "/");
        const decodedTenantId = CryptoJS.AES.decrypt(
            encodedTenantId,
            secretKey
        ).toString(CryptoJS.enc.Utf8);

        const regex = /^[0-9]+$/

        const isValidCourseId = regex.test(decodedCourseId)
        const isValidTenantId = regex.test(decodedTenantId)

        if (isValidCourseId && isValidTenantId) {
            setIsDecodeValid("VALID")
            setDecodedCourseId(decodedCourseId)
            setDecodedTenantId(decodedTenantId)
        }
        else {
            setIsDecodeValid("NOTVALID")

            swal({
                title: t('something_went_wrong_try_later'),
                text: t('redirecting_to_course_list'),
                timer: 5000,
            }).then(() => {
                history.push(`${process.env.PUBLIC_URL + "/course-grid/"}`);
            })
        }

    }

    useEffect(() => {
        //console.log("Called isDecodeValid")
        if (isDecodeValid !== "VALID") {
            decodeHandler()
        }
    }, [isDecodeValid])





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

    const [getFeedbackResponse, setfeedbackResponse] = useState([]);
    const [getColorActiveId, setColorActiveId] = useState();
    const [getCourseDetails, setCourseDetails] = useState([]);
    const [getCourseStructureJson, setCourseStructureJson] = useState([]);
    const [ratingCount, setRatingCount] = useState(0);
    const [startDate, setStartDate] = useState();
    const [check, setCheck] = useState(0)
    const [courseValue, setCourseValue] = useState([]);
    const [visibility, setVisibility] = useState(true);
    const [reviewvisibility, setReviewVisibility] = useState(false);
    const [reviewvisibilitybfrlgin, setreviewvisibilitybfrlgin] = useState(false);
    const [getcourseStructure, setcourseStructure] = useState([]);
    const [getcourseStructure1, setcourseStructure1] = useState([])
    const [assessDetails, setAssessDetails] = useState([]);
    const [getCourseAnnouncement, setCourseAnnouncement] = useState([]);
    const [apiError, setApiError] = useState();
    const [msg, setmsg] = useState();
    const [msgshow, setMsgShow] = useState(true);
    const [getCertiStatus, setCertiStatus] = useState();
    const [getCertificateURl, setCertificateURL] = useState();
    const [getInstructor, setInstructor] = useState([]);
    const [getViewModalState, setViewModalState] = useState();
    const [getServerTime, setServerTime] = useState();
    const [number, setNumber] = useState();
    const [getInstCourseStatus, setInstCourseStatus] = useState();
    const [userCount, setUserCount] = useState();
    const [feeStatus, setFeesStatus] = useState(false);
    const [getUserDetails, setUserDetails] = useState(initialStateId);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [globalState, setGlobalState] = useState([]);
    const [getRating, setRating] = useState([]);
    const [isActive, setIsActive] = useState({
        folder: 0,
        file: 0
    });

    useEffect(() => {
        if(isDecodeValid === "VALID"){
            folderStructureTreeCourse()

        }
    
    }, [getColorActiveId, isActive,courseId])

    useEffect(() => {

        if (isDecodeValid === "VALID") {
            const fatchCourseData = async () => {
                try {
                    const res = await instructorService.getCourseById(courseId);
                    setCourseDetails(res.data);
                    setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                    ////console.log("setCourseStructureJson " + res.data.courseStructureJson);
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

            const fatchRatingData = async () => {
                try {
                    const res = await service.getoverallRating(courseId, tenantId);
                    setRating(res.data);
                    setRatingCount(res.data.length);
                    ////console.log(res.data);
                } catch (e) {
                    //console.log(e)
                }
            }
            const fatchServerTime = async () => {
                try {
                    const res = await instructorService.getServerTime();
                    setStartDate(new Date(res.data));
                } catch (e) {
                    //console.log(e)
                }
            }

            fatchCourseData();
            fatchRatingData();
            fatchServerTime();
            fatchUserCount();
        }


    }, [courseId])



    useEffect(() => {
        if (isDecodeValid === "VALID") {
            learnerService.getCourseMetadataById(courseId)
                .then(res => {
                    ////console.log('RESPPPPPP', res.data)
                    setCourseValue(JSON.parse(res.data));
                }).catch(err => {
                    swal({
                        title: t('service_maintainance_down_alert'),
                        text: `${t('redirect_course_list')}`,
                        timer: 5000,

                    }).then(() => {
                        history.push(`${process.env.PUBLIC_URL + "/courses/view-courses"}`);
                    })
                    //setmsg(t('service_maintainance_down_alert'));                
                })
            callCourseDelievery();

            // service.getCoursesById(courseId, tenantId)
            //     .then(res => {
            //         setCourseValue(res.data);
            //     })
            //     .catch(err => {
            //         setmsg(t('service_maintainance_down_alert'));
            //     })
            if (userId) {
                service.getUserEnrollmentStatus(courseId, userId, 1, tenantId)
                    .then(res => {
                        if (res.data.courseEnrolled === true) {
                            setVisibility(false);
                        }
                        setInstCourseStatus(res.data.instCourseStatus);
                        //setCertiStatus(res.data.certificateGenerated);
                    })
                    .catch(err => {
                        //setmsg(t('service_maintainance_down_alert'));
                        //console.log('service_maintainance_down_alert');
                    })
            }

            learnerService.getCourseStructureById(courseId)
                .then(res => {
                    if (res.data == "Course Structure is yet to publish") {
                        swal(`${t('msg')}`, `${t('plz_wait')}`, "warning");
                    }
                    else {
                        setcourseStructure(res.data);
                        setcourseStructure1(res.data.nodes);
                        ////console.log("Folder Structure => "+res.data);
                        ////console.log('JAVA_______________', res.data)
                    }

                }).catch(err => {
                    setmsg(t('service_maintainance_down_alert'));
                })

            instructorService.getServerTime()
                .then(res => {
                    let serTime = res.data;
                    setServerTime(serTime.replace(/\s/g, 'T'))
                })
            // service.getCourseStructure(courseId, tenantId)
            //     .then(res => {
            //         setcourseStructure(res.data)
            //        //console.log("course items", getcourseStructure.items);
            //     }).catch(err => {
            //         setmsg(t('service_maintainance_down_alert'));
            //     })

            service.courseAnnouncement(courseId, tenantId)
                .then(res => {
                    setCourseAnnouncement(res.data);
                }).catch(error => setmsg(t('service_maintainance_down_alert')));

            service.userCount(courseId, tenantId)
                .then(res => {
                    setUserCount(res.data.userCount);
                }).catch(error => {
                    //console.log(error)
                }

                )

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

            service.getUserById(userId)
                .then(res => {
                    setUserDetails(res.data);
                    ////console.log('UserDetail-------------'+res.data);
                })
                .catch(err => {
                    //console.log(err);
                });

            ////console.log("input data "+ userId + courseId + tenantId);

            service.getPaymentDetails(userId, courseId, 1)
                .then(res => {
                    ////console.log("inside");
                    ////console.log("payment details " + res.data.status);
                    if (res.data.status === "paid") {
                        setFeesStatus(true);
                    }
                    ////console.log(JSON.stringify(res.data));
                })
                .catch(err => {
                    //console.log("payment details error" + err);
                });

            getbyCourseIdandUserId();
        }



    }, [courseId])

    useEffect(() => {

        if (isDecodeValid === "VALID") {

            let rating = [{
                itemId: courseId,
                tenantId: 1
            }]
            ////console.log(rating);

            service.averageRating(rating)
                .then(res => {
                    setAvgRating(res.data);
                    ////console.log(res.data);
                }).catch(error => {
                    //console.log(('service_maintainance_down_alert'))
                }

                );

        }



    }, [getRating, courseId])

    const [isActiveFolderId, setIsActiveFolderId] = useState();

    useEffect(() => {
        if(isDecodeValid === "VALID"){

            folderStructureTree();
        }
    }, [isActiveFolderId, isActive,courseId])

    const [getPdate, setPdate] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const [filterText, setFilterText] = React.useState("");
    let UserId = UserService.getUserid();
    const [roleId, setRoleId] = useState("");
    let [getCourseStructureFolderId, setCourseStructureFolderId] = useState();
    const [getFolderName, setFolderName] = useState();
    const [getContentDetails, setContentDetails] = useState([]);
    const [itemsCourse, setItemsCourse] = useState([]);

    const [items, setItems] = useState([]);
    const [getModuleModalState, setModuleModalState] = useState({
        show: false
    });
    const [activeAddModule, setActiveAddModule] = useState(false);
    const [getFolderOrContentDetUpdate, setFolderOrContentDetUpdate] = useState({
        show: false
    });
    const [toggle, setToggle] = useState(false);
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const [getParentId, setParentId] = useState([]);
    const [getShareUrlData, setShareUrlData] = useState();
    const [ShareUrlModal, setShareUrlModal] = useState({
        show: false
    });

    const contentView = (contentType, url, contentName) => {
        instructorService.contentAccess(url)
            .then(res => {
                if (contentType === "pdf") {
                    // This encodes the Actual URL
                    const encrypted = CryptoJS.AES.encrypt(
                        "/" + res.data,
                        "cdac@123"
                    ).toString();
                    const safeEncodedString = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

                    const pdfDomain = "10.244.3.218:8080"
                    const finalSubDomain = pdfDomain + "/" + safeEncodedString

                    // console.log("finalSubDomain", finalSubDomain)

                    setUrl(finalSubDomain);
                } else {
                    setUrl(res.data);
                }
                setContentType(contentType);
                setContentName(contentName);
                setUrlModal({ show: true });
            }).catch(err => {
                swal(`${t('error')}`, `${t('try_sometimes')}`, "error");
            })
    }

    const handleClickAddModule = () => {
        setActiveAddModule(!activeAddModule);
    };

    const AddModuleModalShow = (id) => {
        setCourseStructureFolderId(id);
        setModuleModalState({ show: true })
    }
    const AddModuleModalHide = () => {
        setModuleModalState({ show: false })
    }

    const toDateTime = (dateFormat) => {
        var date = new Date(dateFormat);
        var str = '';
        var year, month, day, hour, min, sec;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        day = date.getDate();
        day = day < 10 ? '0' + day : day;
        hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        min = date.getMinutes();
        min = min < 10 ? '0' + min : min;
        sec = date.getSeconds();
        sec = sec < 10 ? '0' + sec : sec;

        str += year + '-' + month + '-' + day;
        str += ' ' + hour + ':' + min + ':' + sec;
        return str;
    }

    const ShareUrl = (url) => {
        instructorService.contentAccess(url)
            .then(res => {
                setShareUrlData("http://10.244.3.218:8080/" + res.data);
                setShareUrlModal({ show: true });
                let copyText = document.querySelector(".copy-text1");
                copyText.querySelector("button").addEventListener("click", function () {
                    let input = copyText.querySelector("input.text");
                    input.select();
                    document.execCommand("copy");
                    copyText.classList.add("active");
                    window.getSelection().removeAllRanges();
                    setTimeout(function () {
                        copyText.classList.remove("active");
                    }, 2500);
                });
            })
    }

    const newArr = selectedRows.map(({ contentId, lastModifiedDate, lastUpdatedBy, publishStatus, shareUrl, streamingStatus, uploadDate, userId, ...rest }) => {
        ////console.log(rest.previewUrl);
        let originalUrl = rest.previewUrl;
        let newPath = originalUrl.replace('http://10.244.3.218:8080/', '');
        rest['filepath'] = newPath;
        rest['publishDate'] = toDateTime(startDate);
        rest['cname'] = rest['contentName'];
        rest['topicDuration'] = rest['contentDuration'];
        rest['pcontentId'] = contentId;
        delete rest['contentName'];
        delete rest['contentDuration'];
        delete rest['previewUrl']
        return rest;
    });
    newArr.map((i => (i.categoryType = getCourseDetails.categoryName, i.courseId = courseId, i.userId = UserId,
        i.itemId = getCourseStructureFolderId, i.description = "Basic desc")
    ))

    const folderColorChangeHandler = (itemId) => {
        setColorActiveId(itemId);
    }

    const RemoveContentOrStructure = (contentId) => {
        if (Number.isInteger(parseInt(contentId))) {
            swal({
                title: `${t('swal_title')}`,
                text: `${t('u_want_to_delete_content')}`,
                icon: "warning",
                buttons: [
                    t('no_cancel'),
                    t('yes_delete')
                ],
                dangerMode: true,
            }).then(function (isConfirm) {
                if (isConfirm) {
                    instructorService.deleteCourseContent({ "contentId": contentId, "courseId": courseId, "userId": UserId })
                        .then(async res => {
                            if (res.data === "Content deleted successfully !!") {
                                await swal(t('deleted'), t('content_deleted'), "success");
                                instructorService.getCourseById(courseId)
                                    .then(res => {
                                        setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                                    })
                                folderStructureTreeCourse();
                            }
                        }).catch(err => {
                            //console.log(err);
                        })
                }
            });
        } else {
            swal({
                title: `${t('swal_title')}`,
                text: `${t('u_want_to_delete_folder')}`,
                icon: "warning",
                buttons: [
                    t('no_cancel'),
                    t('yes_delete')
                ],
                dangerMode: true,
            }).then(function (isConfirm) {
                if (isConfirm) {
                    instructorService.deleteCourseStructureChild({ "dirParentId": contentId, "lastModifiedBy": UserId })
                        .then(async res => {
                            if (res.data === "deleted successfully") {
                                await swal(`${t('deleted')}`, `${t('course_structure_folder_deleted')}`, "success");
                                instructorService.getCourseById(courseId)
                                    .then(res => {
                                        setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                                    })
                                folderStructureTreeCourse();
                            }
                        }).catch(err => {
                            //console.log(err);
                        })
                }
            });

        }
    }

    const columns = [
        {
            name: "Name",
            selector: "contentName",
            sortable: true,
            wrap: true,
            width: '145px',
        },
        {
            name: "Type",
            selector: "contentType",
            sortable: true,
            width: '145px',
        },
        {
            name: "Duration",
            selector: "contentDuration",
            sortable: true,
            width: '145px'
        },
        {
            name: "Preview",
            sortable: true,
            width: '145px',
            cell: (row) => <a class="link" href="#" onClick={() => contentView(row.contentType, row.previewUrl, row.contentName)}>
                {row.contentType === "zip" ? <i class="fas fa-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}></i>
                    : row.contentType === "pdf" ? <i class="fas fa-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}></i>
                        : row.contentType === "jpg" || row.contentType === "png" || row.contentType === "jpeg" ? <i class="fas fa-file-image" style={{ fontSize: "25px", color: "#b2b1ff" }}></i>
                            : row.contentType === "html" ? <i class="fab fa-html5" style={{ fontSize: "25px", color: "#e54c21" }}></i>
                                : row.contentType === "ogg" || row.contentType === "webm" || row.contentType === "mp4" ? <i class="fas fa-file-video" style={{ fontSize: "25px", color: "#8cee02" }}></i>
                                    : row.contentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}></i>
                                        : row.contentType === "doc" || row.contentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}></i>
                                            : row.contentType === "scorm" ? <i class="far fa-file-archive" style={{ fontSize: "25px", color: "green" }}></i>
                                                : row.contentType === "youtube" ? <i class="far fa-youtube" style={{ fontSize: "25px", color: "green" }}></i>
                                                    : null}
            </a>
        },
        {
            name: "Share Url",
            width: '170px',
            sortable: true,
            cell: (row) => <>{row.contentType === "zip" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('click_to_copy')}</Tooltip>}>
                <span className="d-inline-block">
                    <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
                </span>
            </OverlayTrigger>
                : row.contentType === "pdf" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('click_to_copy')}</Tooltip>}>
                    <span className="d-inline-block">
                        <CopyToClipboard text={getShareUrlData}>
                            <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
                        </CopyToClipboard>
                    </span>
                </OverlayTrigger>
                    : row.contentType === "jpg" || row.contentType === "png" || row.contentType === "jpeg" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('click_to_copy')}</Tooltip>}>
                        <span className="d-inline-block">
                            <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
                        </span>
                    </OverlayTrigger>
                        : row.contentType === "html" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('click_to_copy')}</Tooltip>}>
                            <span className="d-inline-block">
                                <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
                            </span>
                        </OverlayTrigger>
                            : row.contentType === "ogg" || row.contentType === "webm" || row.contentType === "mp4" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('click_to_copy')}</Tooltip>}>
                                <span className="d-inline-block">
                                    <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
                                </span>
                            </OverlayTrigger>
                                : row.contentType === "txt" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('click_to_copy')}</Tooltip>}>
                                    <span className="d-inline-block">
                                        <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
                                    </span>
                                </OverlayTrigger>
                                    : row.contentType === "doc" || row.contentType === "docx" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('click_to_copy')}</Tooltip>}>
                                        <span className="d-inline-block">
                                            <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
                                        </span>
                                    </OverlayTrigger>
                                        : row.contentType === "scorm" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('click_to_copy')}</Tooltip>}>
                                            <span className="d-inline-block">
                                                <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
                                            </span>
                                        </OverlayTrigger>
                                            : null}
            </>
        },

        // {
        //     name: "Action",
        //     sortable: true,
        //     cell: (row) => <div>
        //         <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
        //             <span className="d-inline-block">
        //                 <a class="link" href="#"><i class="fas fa-trash" onClick={() => contentDelete(row.contentId, getParentId)} style={{ fontSize: "20px", color: "#006dff" }}></i></a>
        //             </span>
        //         </OverlayTrigger>
        //         <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
        //             <span className="d-inline-block">
        //                 <a class="link" href="#"><i class="fas fa-edit" onClick={() => contentEdit(row.contentId, row.contentName, row.contentDuration)} style={{ fontSize: "20px", color: "#006dff", marginLeft: '20px' }}></i> </a>
        //             </span>
        //         </OverlayTrigger>
        //     </div>
        // }
    ];

    function folderStructureTree() {
        instructorService.getFolderStructure(UserId)
            .then(res => {
                let menuItems = res.data.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    return menuItem;
                });
                setItems(menuItems);
            })
        const returnMenuItem = (item, i) => {
            let menuItem;
            if (item.Child.length === 0) {
                menuItem = (
                    <div className="item" key={i}>
                        <div>
                            <span style={isActiveFolderId == item.Id ? { backgroundColor: '#11b67a', display: 'block', color: 'white', padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' } : { padding: "8px", display: 'block', border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' }}
                                onClick={() => abc1(item.Id, item.Name)}><i className="fas fa-folder" style={isActiveFolderId == item.Id ? { fontSize: "18px", color: 'white' } : { fontSize: "18px", color: 'black' }}>
                                </i><span style={{ marginLeft: "10px" }}>{item.Name} &nbsp;&nbsp;</span>
                                {/* <span style={{ position: 'relative', float: 'right' }}>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                                        <span className="d-inline-block">
                                            <a class="link" href="#"><i class="fas fa-trash" onClick={() => deleteDirectory(item.Id)} style={{ fontSize: "16px" }}></i></a>&nbsp;&nbsp;
                                        </span>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                        <span className="d-inline-block">
                                            <a class="link" href="#"><i class="fas fa-edit" onClick={() => directoryEdit(item.Id, item.Name)} style={{ fontSize: "16px" }}></i></a>
                                        </span>
                                    </OverlayTrigger>
                                </span> */}
                            </span>
                        </div>
                    </div>
                );
            } else {
                let menuItemChildren = item.Child.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    return menuItem;
                });
                menuItem = (
                    <div key={i} className="item">
                        <div className="toggler" id={`toggle-menu-item-${item.Id}`}>
                            <div>
                                <span style={isActiveFolderId == item.Id ? { backgroundColor: '#11b67a', display: 'block', color: 'white', padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' } : { padding: "8px", display: 'block', border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' }}
                                    onClick={() => abc1(item.Id, item.Name)}><i className='fas fa-folder' style={isActiveFolderId == item.Id ? { fontSize: "18px", color: 'white' } : { fontSize: "18px", color: 'black' }}>
                                    </i><span onClick={() => abc1(item.Id, item.Name)} style={{ marginLeft: "10px" }}>{item.Name} &nbsp;&nbsp;</span>
                                    {/* <span style={{ position: 'relative', float: 'right' }}>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                                            <span className="d-inline-block">
                                                <a class="link" href="#"><i class="fas fa-trash" onClick={() => deleteDirectory(item.Id)} style={{ fontSize: "16px" }}></i></a>&nbsp;&nbsp;
                                            </span>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                            <span className="d-inline-block">
                                                <a class="link" href="#"><i class="fas fa-edit" onClick={() => directoryEdit(item.Id, item.Name)} style={{ fontSize: "16px" }}></i></a>
                                            </span>
                                        </OverlayTrigger>
                                    </span> */}
                                </span>
                            </div>
                        </div>
                        <UncontrolledCollapse
                            className="children"
                            toggler={`#toggle-menu-item-${item.Id}`}
                        >
                            {menuItemChildren}
                        </UncontrolledCollapse>
                    </div>
                );
            }
            return menuItem;
        };
    }

    function folderStructureTreeCourse() {
        let menuData = [];
        instructorService.getCourseById(courseId)
            .then(res => {
                //apiData.push([JSON.parse(res.data.courseStructureJson)]);
                menuData = [JSON.parse(res.data.courseStructureJson)];
                ////console.log("menuData" + res.data.courseStructureJson);
                ////console.log(res.data.courseStructureJson);
                let menuItems = menuData.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    return menuItem;
                });
                setItemsCourse(menuItems);
            })

        const returnMenuItem = (item, i) => {
            let menuItem;
            if (item.nodes.length === 0) {
                menuItem = (
                    <div className="item" key={i}>
                        <span style={getColorActiveId == item.id ? { backgroundColor: '#11b67a', display: 'block', color: 'white', padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' } : { padding: "8px", display: 'block', border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' }}
                            onClick={() => [menuData.map((itemTopic) => {
                                if (itemTopic.id === item.id) {
                                    globalState.length = 0;
                                    globalState.push(itemTopic.label);
                                    setIsActive({ folder: itemTopic.label, file: item.id });
                                    // if(itemTopic.nodetype == "root"){
                                    //     handleClickAddModule();
                                    // }
                                }
                                itemTopic.nodes.map((itemContent) => {
                                    if (itemContent.id === item.id) {
                                        globalState.length = 0;
                                        globalState.push(itemTopic.label, itemContent.label);
                                        setIsActive({ folder: itemContent.label, file: item.id });
                                        // if(itemContent.nodetype == "root"){
                                        //     handleClickAddModule();
                                        // }
                                    }
                                    itemContent.nodes &&
                                        itemContent.nodes.map((itemtype) => {
                                            if (itemtype.id === item.id) {
                                                globalState.length = 0;
                                                globalState.push(itemTopic.label, itemContent.label, itemtype.label);
                                                setIsActive({ folder: itemContent.label, file: item.id });
                                                // if(itemtype.nodetype == "root"){
                                                //     handleClickAddModule();
                                                // }
                                            }
                                        });
                                });
                            }), folderColorChangeHandler(item.id)]}><i className={item.nodetype == "pdf" ? "fas fa-file-pdf fa-lg" :
                                item.nodetype == "png" || item.nodetype == "jpg" ? "fas fa-image fa-lg" : item.nodetype == "zip" ? "fas fa-file-archive fa-lg"
                                    : item.nodetype == "scorm" ? "fas fa-file-archive fa-lg" : item.nodetype == "html" ? "fab fa-html5 fa-lg" : item.nodetype == "youtube" ? "fab fa-youtube fa-lg"
                                        : item.nodetype == "mp4" ? "fas fa-video fa-lg" : item.nodetype == "folder" ? "fas fa-folder fa-lg"
                                            : item.nodetype == "root" ? "fas fa-house-user fa-lg" : "fas fa-folder"
                            } style={isActiveFolderId == item.id ? { fontSize: "18px", color: 'white' } : { fontSize: "18px", color: 'black' }}>
                            </i><span style={{ marginLeft: "10px" }} >{item.label} &nbsp;&nbsp;</span>
                            {item.nodetype == "root" ? <span style={{ position: 'relative', float: 'right' }} >
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('add_module_topic')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => { AddModuleModalShow(item.id); handleClickAddModule(); }} ><i className="fas fa-folder-plus" style={activeAddModule ? { color: "white" } : { color: "#015e3c" }}></i></a>
                                    {/* style={activeAddModule ? {color: "white"} : {color:"#5cb85c"} */}
                                </OverlayTrigger>
                            </span> : item.nodetype == "folder" ? <span style={{ position: 'relative', float: 'right' }}>
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Youtube Video</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => handleModal()}><i className="fa fa-youtube-play" style={{ color: '#f0ad4e', fontSize:'36px'}}></i></a>
                                </OverlayTrigger> */}
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Content Files</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => dmsUIVisible(item.id)}><i className="fa fa-file" style={{ color: '#f0ad4e', background: "rgba(2, 230, 147, 0.6)" }}></i></a>
                                </OverlayTrigger> */}
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Access Restriction</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => addAccessRestriction()}><i className="fas fa-lock" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => updateFolderOrContent(item.id, item.label, item.publishDate)}><i className="fa fa-edit" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => RemoveContentOrStructure(item.id)}><i className="fas fa-trash-alt" style={{ color: '#d9534f' }}></i></a>
                                </OverlayTrigger> */}
                            </span> : <span style={{ position: 'relative', float: 'right' }}>


                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('view_content')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => courseStructurContentView(item.nodetype, item.filePath, item.label)}><i className="fa fa-eye" style={{ color: '#94b8b8' }}></i></a>
                                </OverlayTrigger>
                                {(item.status === "C" || item.status === "U") && (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('Approve')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => AppoveCourseContent(item.id)}><i className="fa fa-check" style={{ color: 'green' }}></i></a>
                                </OverlayTrigger>)}
                                {(item.status === "C" || item.status === "P") && (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('reject')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => RejectCourseContentModal(item.id)}><i className="fa fa-ban" style={{ color: 'red' }}></i></a>
                                </OverlayTrigger>)}
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Feedback</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => handleTopicFeedback(item.id)}><i className="fas fa-comments" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Activity Completion</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => addActivityCompletion()}><i className="fas fa-clipboard-check" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => updateFolderOrContent(item.id, item.label, item.publishDate)}><i className="fa fa-edit" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => RemoveContentOrStructure(item.id)}><i className="fas fa-trash-alt" style={{ color: '#d9534f' }}></i></a>
                                </OverlayTrigger> */}
                            </span>}
                        </span>
                    </div >
                );
            } else {
                let menuItemChildren = item.nodes.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    return menuItem;
                });
                menuItem = (
                    <div key={i} className="item">
                        <div>
                            <div className="toggler" id={`toggle-menu-item-${item.id}`}>
                                <span style={getColorActiveId == item.id ? { backgroundColor: '#11b67a', display: 'block', color: 'white', padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' } : { padding: "8px", display: 'block', border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' }}
                                    onClick={() => [menuData.map((itemTopic) => {
                                        if (itemTopic.id === item.id) {
                                            globalState.length = 0;
                                            globalState.push(itemTopic.label);
                                            setIsActive({ folder: itemTopic.label, file: item.id })
                                        }
                                        itemTopic.nodes.map((itemContent) => {
                                            if (itemContent.id === item.id) {
                                                globalState.length = 0;
                                                globalState.push(itemTopic.label, itemContent.label);
                                                setIsActive({ folder: itemContent.label, file: item.id })
                                            }
                                        });
                                    }), folderColorChangeHandler(item.id)]}><i className={item.nodetype == "folder" ? "fas fa-folder fa-lg" :
                                        item.nodetype == "root" ? "fas fa-house-user fa-lg" : "fas fa-folder fa-lg"} style={isActiveFolderId == item.id ? { fontSize: "18px", color: 'black' } : { fontSize: "18px", color: 'black' }}>
                                    </i><span style={{ marginLeft: "10px" }}>{item.label} &nbsp;&nbsp;</span>
                                    {item.nodetype == "folder" ? <span style={{ position: 'relative', float: 'right' }}>
                                        {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Youtube Video</Tooltip>}>
                                        <a class="hover-fx1" onClick={() => handleModal()}><i className="fab fa-youtube" style={{ color: '#f0ad4e'}}></i></a>
                                        </OverlayTrigger> */}
                                        {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Content Files</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => dmsUIVisible(item.id)}><i className="fa fa-file" style={{ color: '#f0ad4e' }}></i></a>
                                        </OverlayTrigger> */}
                                        {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Access Restriction</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => addAccessRestriction()}><i className="fas fa-lock" style={{ color: '#f0ad4e' }}></i></a>
                                        </OverlayTrigger> */}
                                        {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => updateFolderOrContent(item.id, item.label, item.publishDate)}><i className="fa fa-edit" style={{ color: '#f0ad4e' }}></i></a>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => RemoveContentOrStructure(item.id)}><i className="fas fa-trash-alt" style={{ color: '#d9534f' }}></i></a>
                                        </OverlayTrigger> */}
                                    </span> :
                                        // item.nodetype == "root" ? <span style={{ position: 'relative', float: 'right' }}>
                                        //     <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Module/Topic</Tooltip>}>
                                        //         <a class="hover-fx1" onClick={() => { AddModuleModalShow(item.id); handleClickAddModule(); }} ><i className="fas fa-folder-plus" style={activeAddModule ? { color: "white" } : { color: "#015e3c" }}></i></a>
                                        //         {/* style={activeAddModule ? {color: "white"} : {color:"#5cb85c"} */}
                                        //     </OverlayTrigger>
                                        // </span> : 
                                        ""}
                                </span>
                            </div>
                        </div>
                        <UncontrolledCollapse
                            className="children"
                            toggler={`#toggle-menu-item-${item.id}`}
                        >
                            {menuItemChildren}
                        </UncontrolledCollapse>

                    </div >
                );
            }
            return menuItem;
        }
    }

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const dmsUIVisible = (id) => {
        setCourseStructureFolderId(id);
        setToggle(true)
    }

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

    const abc1 = (dirId, dirName) => {
        setIsActiveFolderId(dirId);
        setParentId(dirId);
        setFolderName(dirName);
        instructorService.contentDetails(dirId, UserId)
            .then(res => {
                setContentDetails(res.data);
            })
    }


    const Breadcrumb = () => {
        return (
            <>
                {globalState.map((obj) => (
                    <>
                        <a class="btn btn-default">{obj}</a>
                    </>
                ))}
            </>
        )
    };


    /* dataTable Check box Code End here  */

    const AddContentToCourseStructure = (arrayData, id) => {
        if (id === undefined) {
            swal(`${t('success')}`, `${t('select_node_in_course_structure')}`, "warning")
        } else {
            instructorService.addContentToCourseStructure(arrayData)
                .then(async res => {
                    if (res.data === "Content added successfully!!") {
                        await swal(`${t('success')}`, `${t('content_added')}`, "success");
                        setToggle(false);
                        instructorService.getCourseById(courseId)
                            .then(res => {
                                setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                            })
                        folderStructureTreeCourse();
                    }
                }).catch(err => {
                    //console.log(err);
                })
        }
    }

    const filteredItems = getContentDetails.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button className="btn btn-info" onClick={onClick} ref={ref}>
            {t('publish_date_admin')}: {value}
        </button>
    ));

    const publishCourseButton = (cId) => {
        instructorService.coursePublish(cId)
            .then(async res => {
                if (res.data === "Course Published Successfully!!") {
                    await swal(`${t('success')}`, `${t('course_published')}`, "success");
                    instructorService.getCourseById(courseId)
                        .then(res1 => {
                            ////console.log(res1.data);
                            setCourseDetails(res1.data);
                            setCourseStructureJson(JSON.parse(res1.data.courseStructureJson));
                            let courseCompletion = {
                                ccId: courseId,
                                description: res1.data.generalDetails,
                                title: res1.data.courseName
                            }
                            service.courseCompletionMaster(courseCompletion)
                                .then(resp => {
                                    ////console.log("course Completion Response" + JSON.stringify(resp));
                                })
                                .catch(err => {
                                    ////console.log("course Completion error" + err);
                                })
                        })
                } else {
                    //console.log("err");
                }
            }).catch(err => {
                //console.log(err);
            })
    }

    const unPublishCourseButton = (cId) => {
        instructorService.courseUnPublish(cId)
            .then(async res => {
                if (res.data === "Course UnPublished Successfully!!") {
                    await swal(`${t('success')}`, `${t('course_unpublished')}`, "success");
                    instructorService.getCourseById(courseId)
                        .then(res => {
                            setCourseDetails(res.data);
                            setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                        })
                } else {
                    //console.log("err");
                }
            }).catch(err => {
                //console.log(err);
            })
    }

    /* course Disable funcation */
    const disableCourseButton = (cId) => {
        instructorService.CourseDisable(cId)
            .then(async res => {
                if (res.data === "Course Disabled Successfully!!") {
                    await swal(`${t('success')}`, `${t('course_disabled')}`, "success");
                    instructorService.getCourseById(courseId)
                        .then(res => {
                            setCourseDetails(res.data);
                            setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                        })
                } else {
                    //console.log("err");
                }
            }).catch(err => {
                //console.log(err);
            })
    }

    const getbyCourseIdandUserId = () => {

        if (userId !== " ") {
            service.getRoleIdbyCourseIdandUserId(courseId, userId)
                .then((res) => {
                    ////console.log("role id " + res.data);
                    ////console.log("role status " + res.status);
                    if (res.status === 200) {
                        setRoleId(res.data);
                    }
                    else {
                        ////console.log("role id " + res.data);
                    }
                })
                .catch((err) => {
                    //console.log("role id error " + err);
                })
        }
    }


    let [certificateViewButton2, setCertificateViewButton2] = useState(true);
    let [certificateViewButton, setCertificateViewButton] = useState(false);
    let [statusCer, setStatusCer] = useState(false);

    // //console.log("Course Value"+ courseValue.courseName);
    // useEffect(() => {
    //     //console.log("State Changeddddd ", certificateViewButton2);
    // }, [certificateViewButton2])

    const getQuizzesStatus = async (userId, courseId) => {
        await learnerService.getAssignedQuizzesStatus(userId, courseId)
            .then(res => {
                res.data.assignedQuizzes.map((data) => {

                    if (data.isPassed === true) {
                        ////console.log("Inside True of getAssignedQuizzesStatus");
                        setCertificateViewButton(true);
                        setStatusCer(true);
                        ////console.log(certificateViewButton);
                        ////console.log("true................."); 
                    }
                    else {
                        ////console.log("Inside Else of getAssignedQuizzesStatus")
                        setCertificateViewButton2(false);
                        ////console.log(certificateViewButton2);
                    }
                    ////console.log(data.isPassed+'----------------------------------');
                    ////console.log(certificateViewButton + ' certificateViewButton');
                    ////console.log(certificateViewButton2 + ' certificateViewButton2');
                })

            })
            .catch(err => {
                //console.log(err)
            })
    }

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            //console.log("instr Data ")
            getQuizzesStatus(userId, courseId);
            handleContentDependOnDate();
            instructorData();
            ////console.log(certificateViewButton);
            ////console.log("OUTTTPUT ", certificateViewButton2);

        }
    }, [statusCer, courseId])

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            handleContentDependOnDate();
        }
    },[courseId])



    // const convertDate = (dateFormat) => {
    //     let timestamp = Date.parse(dateFormat);
    //     let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
    //     return d;
    // }

    const convertDate = (dateFormat) => {
        // //console.log(dateFormat);
        let timestamp = Date.parse(dateFormat);
        let date = new Date(timestamp);
        let d = date.toLocaleString('en-IN', { hour12: false, timeZone: 'IST' });
        // let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
        return d;
    }

    const fee_validator = (fees) => {
        if (fees === 0) {
            return <p>{t('free')}</p>
        }
        else {
            return <p>&#8377;{fees}</p>
        }
    }

    const [CourseEnrollment, setCourseEnrollment] = useState({
        isLoading: false
    })

    const [getModalState2, setModalState2] = useState({
        show: false,
        path: "",
        id: ""
    })
    const [getModalState5, setModalState5] = useState({
        show: false,
        path: ""
    })

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


    const paymentReceiptViewHide = () => {
        setStatusForCourse({ show: false })
    }

    const redirecrToCourse = (id, tid) => {
        var result = '';
        let length = 10;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        const myCipher = cipher(`${result}`)
        let cid = myCipher(`${id}`);
        let tId = myCipher(`${tid}`);
        let rNumber = Math.floor(Math.random() * 10000000000);
        history.push(`${process.env.PUBLIC_URL + "/admin-course-details/"}${rNumber}${cid}/${result}${tId}`);
        //window.location.href = `${process.env.PUBLIC_URL}/course-details/${courseId}/${tenantID}`;
    }

    //const [generatedOrderId, setGenratedOrderId] = useState();

    const [statusForCourse, setStatusForCourse] = useState({
        show: false
    });


    const [getModalState, setModalState] = useState({
        show: false
    })


    const [getModalState1, setModalState1] = useState({
        show: false
    })

    const [getcourseId, setCourseId] = useState(0);

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


    useEffect(() => {
        if (isDecodeValid === "VALID") {
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

            getOverAllRating()

        }

    }, [courseId]);

    function getOverAllRating() {
        service.getoverallRating(courseId, tenantId)
            .then(res => {
                ////console.log("testing-------------------------"+res.data.profilePicUrl);
                setRating(res.data.filter(function (ele) {
                    return ele.tenantId == tenantId
                }))
                _checkthis(res.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }

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



    const refreshPage = () => {
        //alert("check");
        window.location.reload();
    }


    //scrolling 
    const scrollWin = () => {
        document.getElementById('Main').scrollIntoView({ behavior: 'smooth' })
        //window.scrollTo(0, 290);
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

    const [getUrlModal, setUrlModal] = useState({
        show: false
    })
    const UrlModalHide = () => {
        setUrlModal({ show: false })
    }

    const [getCertificateView, setCertificateView] = useState({
        show: false
    });

    const [certificateUrl, setCertificateUrl] = useState("");
    // to download certificate 

    const [getFileURL, setFileURL] = useState(null);

    const certificateDownloadFunction = (userId, courseId, tenantId) => {

        setFileURL(null);

        learnerService.toGenerateCertificate(userId, courseId, tenantId)
            .then(res => {
                if (res.status == '200') {

                    ////console.log("toGenerateCertificate123", res);
                    ////console.log(res.data);
                    setCertificateUrl(res.data);


                    // var file = new File([res.data], "tempName.pdf", {
                    //     type: "application/pdf"
                    //   });
                    //   const fileURL = URL.createObjectURL(file);
                    //   //console.log("FileURL", fileURL);
                    //   setFileURL(fileURL);
                }

            }).catch(err => {
                swal(`${t('error')}`, `${t('try_sometimes')}`, "error");
            })

    }

    // Certificate Modal show and hide

    const CertificateViewHide = () => {
        setCertificateView({ show: false })
    }

    const [getRemark, setRemark] = useState();
    const [getContentName, setContentName] = useState();
    const [getUrl, setUrl] = useState();
    const [getContentType, setContentType] = useState();
    const courseStructurContentView = (contentType, fileUrl, label) => {
        if (contentType == "youtube") {
            setUrl(fileUrl);
            setContentType(contentType);
            setContentName(label);
            setUrlModal({ show: true });
        } else {
            instructorService.contentAccess("http://10.244.3.218:8080/" + fileUrl)
                .then(res => {
                    if (contentType === "pdf") {
                        // This encodes the Actual URL
                        const encrypted = CryptoJS.AES.encrypt(
                            "/" + res.data,
                            "cdac@123"
                        ).toString();
                        const safeEncodedString = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

                        const pdfDomain = "10.244.3.218:8080"
                        const finalSubDomain = pdfDomain + "/" + safeEncodedString

                        // console.log("finalSubDomain", finalSubDomain)

                        setUrl(finalSubDomain);
                    } else {
                        setUrl(res.data);
                    }
                    setContentType(contentType);
                    setContentName(label);
                    setUrlModal({ show: true });
                    //window.open("http://10.244.3.218:8080/" + res.data, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1000,height=1000");
                }).catch(err => {
                    swal(`${t('error')}`, `${t('try_sometimes')}`, "error");
                })
        }
    }

    const AppoveCourseContent = (contentId) => {
        adminServices.approveContent(contentId, courseId)
            .then(res => {
                ////console.log("approve content data" + res.data);
                if (res.status === 200) {
                    swal(`${t('success')}`, `${t('content_approve_msg')}`, "success");
                }
            })
            .catch(err => {
                ////console.log("approve content data" + err);
            })
    }
    const RejectCourseContent = (contentId) => {

        const data = {
            courseId: courseId,
            contentId: contentId,
            description: getRemark
        }

        ////console.log("getRemark " + getRemark);

        if (getRemark !== undefined) {
            adminServices.rejectContent(data)
                .then(res => {
                    ////console.log("reject content data" + res.data);
                    if (res.status === 200) {
                        swal(`${t('success')}`, `${t('content_reject_msg')}`, "success");
                        RejectModalHide();
                    }
                })
                .catch(err => {
                    //console.log("reject content error" + err);
                    RejectModalHide();
                })
        }
    }

    const tableExportExcel = () => {
        ////console.log(getLearnerData);
        var checkData = [];
        const header = ["Name", "E-mail", "Mobile"]
        getLearnerData.map((data) => {
            const name = `${data.firstName} ${data.lastName}`;
            const email = `${data.email}`;
            const mobile = `${data.mobile}`;
            const instData = [name, email, mobile]
            checkData.push(instData);
        })

        downloadExcel({
            fileName: "Learner List",
            sheet: "Learner List",
            tablePayload: {
                header,
                body: checkData,
            },
        })
    }

    const tableExportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait"
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Learner List";
        const headers = [["Name", "E-mail", "Mobile No."]];

        var checkData = getLearnerData.map((data) => [
            `${data.firstName} ${data.lastName}`
            , `${data.email}`
            , `${data.mobile}`
        ])
        let content = {
            startY: 50,
            head: headers,
            body: checkData
        };
        doc.text(title, 40, 40);
        doc.autoTable(content);
        doc.save("LearnerList.pdf")
    }


    const [getRejectModal, setRejectModal] = useState({
        show: false,
        contentId: " "
    });

    const RejectModalHide = () => {
        setRejectModal({
            show: false
        });
    }
    const RejectCourseContentModal = (contentId) => {

        setRejectModal({
            show: true,
            contentId: contentId
        });

    }

    const tableExportExcelforReview = () => {
        ////console.log(getLearnerData);
        var checkData = [];
        const header = ["Name", "Creation Time", "Rating"]
        getRating.map((data) => {
            const name = `${data.firstName} ${data.lastName}`;
            const creationTime = `${convertDate(data.creationTime)}`;
            const rating = `${data.rating}`
            const instData = [name, creationTime, rating]
            checkData.push(instData);
        })

        downloadExcel({
            fileName: "Learner Review",
            sheet: "Learner Review",
            tablePayload: {
                header,
                body: checkData,
            },
        })
    }

    const tableExportPDFforReview = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait"
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Learner Review List";
        const headers = [["Name", "Creation Time", "Rating"]];

        var checkData = getRating.map((data) => [
            `${data.firstName} ${data.lastName}`
            , `${convertDate(data.creationTime)}`
            , `${data.rating}`
        ])
        let content = {
            startY: 50,
            head: headers,
            body: checkData
        };
        doc.text(title, 40, 40);
        doc.autoTable(content);
        doc.save("LearnerReview.pdf")
    }



    const tableExportExcelforFeedback = () => {
        ////console.log(getLearnerData);
        var checkData = [];
        const header = ["Name", "Creation Time", "Rating"]
        getFeedbackResponse.map((data) => {
            const name = `${data.firstName} ${data.lastName}`;
            const creationTime = `${convertDate(data.creationTime)}`;
            const rating = `${data.rating}`
            const instData = [name, creationTime, rating]
            checkData.push(instData);
        })

        downloadExcel({
            fileName: "Learner Feedback",
            sheet: "Learner Feedback",
            tablePayload: {
                header,
                body: checkData,
            },
        })
    }

    const tableExportPDFforFeedback = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait"
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Learner Feedback";
        const headers = [["Name", "Creation Time", "Rating"]];

        var checkData = getFeedbackResponse.map((data) => [
            `${data.firstName} ${data.lastName}`
            , `${convertDate(data.creationTime)}`
            , `${data.rating}`
        ])
        let content = {
            startY: 50,
            head: headers,
            body: checkData
        };
        doc.text(title, 40, 40);
        doc.autoTable(content);
        doc.save("LearnerFeedback.pdf")
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

    const Tree = ({ data }) => (
        <Styles>
            <div className="course-content show">
                <ul class="tree1 list-unstyled">
                    {data && data.map(item => (
                        visibility === true ? <li style={{ fontSize: "16px" }}>
                            {item.nodetype == "folder" ?
                                <p style={{ borderBottom: '1px solid #dddddd' }}><span className="play-icon"><i className="las la-book-open"></i>{item.label}&nbsp;&nbsp;</span></p>
                                : null
                            }
                            {item.nodes &&
                                <ul>
                                    {<Tree data={item.nodes} />}
                                </ul>
                            }
                        </li> :
                            // <li style={{ fontSize: "16px" }}>
                            //     {item.nodetype == "folder" ?
                            //         <p style={{ borderBottom: '1px solid #dddddd' }}><span className="play-icon"><i className="las la-book-open"></i>{item.label}&nbsp;&nbsp;</span></p>
                            //         : item.nodetype == "html" ? < span className="play-icon"><i className="lab la-html5" style={{ fontSize: "25px", color: "#e54c21" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a> <span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //             : item.nodetype == "png" || item.nodetype == "jpg" ? < span className="play-icon"><i className="las la-image" style={{ fontSize: "25px", color: "#b2b1ff" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                 : item.nodetype == "pdf" ? < span className="play-icon"><i className="las la-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                     : item.nodetype == "mp4" ? < span className="play-icon"><i className="las la-video" style={{ fontSize: "25px", color: "#8cee02" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                         : item.nodetype == "zip" ? < span className="play-icon"><i className="las la-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                             : item.nodetype == "scorm" ? < span className="play-icon"><i className="las la-file-archive" style={{ fontSize: "25px", color: "green" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                                 : <span>{item.label}</span>
                            //     }
                            //     {item.nodes &&
                            //         <ul>
                            //             {<Tree data={item.nodes} />}
                            //         </ul>
                            //     }
                            // </li>
                            <li style={{ fontSize: "16px" }}>
                                {item.nodetype == "folder" ?
                                    <p style={{ borderBottom: '1px solid #dddddd' }}><span className="play-icon"><i className="las la-book-open"></i>{item.label}&nbsp;&nbsp;</span></p>
                                    : item.nodetype == "html" ? < span className="play-icon"><i className="lab la-html5" style={{ fontSize: "25px", color: "#e54c21" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a> <span className="lecture-duration">{item.duration == undefined ? null : <p>{t('duration')} {item.duration}</p>}</span></span>
                                        : item.nodetype == "png" || item.nodetype == "jpg" ? < span className="play-icon"><i className="las la-image" style={{ fontSize: "25px", color: "#b2b1ff" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>{t('duration')} {item.duration}</p>}</span></span>
                                            : item.nodetype == "pdf" ? < span className="play-icon"><i className="las la-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>{t('duration')} {item.duration}</p>}</span></span>
                                                : item.nodetype == "mp4" ? < span className="play-icon"><i className="las la-video" style={{ fontSize: "25px", color: "#8cee02" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>{t('duration')} {item.duration}</p>}</span></span>
                                                    : item.nodetype == "zip" ? < span className="play-icon"><i className="las la-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>{t('duration')} {item.duration}</p>}</span></span>
                                                        : item.nodetype == "scorm" ? < span className="play-icon"><i className="las la-file-archive" style={{ fontSize: "25px", color: "green" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>{t('duration')} {item.duration}</p>}</span></span>
                                                            : <span>{item.label}</span>
                                }
                                {item.nodes &&
                                    <ul>
                                        {<Tree data={item.nodes} />}
                                    </ul>
                                }
                            </li>
                    ))}
                </ul>

            </div>
        </Styles >
    );

    let sTime = getServerTime;
    let cTime = courseValue.closingDate;
    let d1 = new Date(sTime);
    let d2 = new Date(cTime);
    let diffTime = Math.abs(d2.getTime() - d1.getTime());
    let n = new Number(diffTime)
    let arrrr = [
        {
            time: 123132132
        }
    ]


    const toggleHandler = (key) => {
        const updatedCourseStructure = getcourseStructure1.map((singleData, index) => {
            if (singleData.key === key) {
                return { ...singleData, isActive: !(singleData.isActive) }
            }
            return singleData;
        })

        setcourseStructure1(updatedCourseStructure)
    }

    function sumOfAllContentDuration(data) {
        if (data.length === 0) {
            data = "";
        } else {
            var res = data && data.map(d => d.duration).reduce((a, b) => b + a);
            return res;
        }
    }

    function dateCompareFunction(sysDate, enrolmentSDate) {
        const x = new Date(sysDate);
        const y = new Date(enrolmentSDate);
        return (x >= y);
    }

    function getVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    const [fullscreen, setFullscreen] = useState(true);
    const [show2, setShow2] = useState(false);

    function handleShow() {
        setShow2(true);
    }

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

    const callCourseDelievery = () => {

        if (showContentDependOnDate === true && visibility !== true) {
            if (setCheck == 1) {
                history.goForward();
            }
            else {
                CourseDelivery(courseValue.courseId, 1);
            }
        }
    }
    ////console.log("course structure"+getcourseStructure1);

    const CourseDelivery = (id, tid) => {
        setCheck(1);
        var result = '';
        let length = 10;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        const myCipher = cipher(`${result}`)
        let cid = myCipher(`${id}`);
        let tId = myCipher(`${tid}`);
        let rNumber = Math.floor(Math.random() * 10000000000);
        history.push(`${process.env.PUBLIC_URL + "/ContentDelivery/"}${rNumber}${cid}/${result}${tId}`);
    }

    // data filter depend on end date
    const [showContentDependOnDate, ContentDependOnDate] = useState(false);
    const dateLimit = moment(courseValue.closingDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    const now = moment();

    const handleContentDependOnDate = () => {
        ////console.log("----------------------------------");
        const dateLimit = moment(courseValue.closingDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        const now = moment();
        ////console.log(courseValue.closingDate);
        ////console.log(now, dateLimit);
        //let dateNew = new Date();
        ////console.log(convertDate(dateNew) , convertDate(courseValue.closingDate))
        if (dateLimit.isValid() && dateLimit.isAfter(now)) { ContentDependOnDate(true); } // show content if current date is less than end date
    };


    const [downloadCertificateicon, setDownloadCertificateicon] = useState(false);


    ////console.log("CourseMeta Data-----------"+courseValue.courseFee);

    const scrollToView = () => {
        const ele = document.getElementById('Tab');
        ele.scrollIntoView({ behavior: 'smooth' })
        //ele.scrollIntoView({behavior : 'smooth'})
        ////console.log("SCROLLLLLLL")
    }

    ////console.log("new role id ----------------" + roleId);

    const learner = [
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

    const [getLearnerData, setlearnerData] = useState([]);

    const getUserEnrolledByCourse = () => {
        learnerService.getUserEnrolledByCourse(courseId, tenantId)
            .then(res => {
                setlearnerData(res.data);
            }).catch(err => {
                //console.log(err)
            })
    }

    const filteredItemsforLearner = getLearnerData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const courseFeedbackResponses = async () => {
        let result = await service.courseFeedbackResponse(1, courseId);
        setfeedbackResponse(result.data);
    }

    const feedbackResponseCheckHandler = (data) => {
        let array = data;
        let result = array.split(",").map((e) => parseInt(e));
        return result;
    }

    ////console.log("getCourseDetails ---->"+ JSON.stringify(getCourseDetails));

    return (
        <div className="main-wrapper course-details-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            < HeaderTwo />

            {/* Breadcroumb */}
            {/* < BreadcrumbBox title="Course Details" bannerUrl={`http://10.244.3.218:8082/${courseValue.banner}`} /> */}
            < BreadcrumbBox title={courseValue.categoryName} />


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
                <section className="course-details-area" id='Main'>
                    <Container>
                        <Row>
                            {/* <Col lg="8" md="7" sm="12"> */}
                            <div className="course-details-top">
                                <Col lg="8" md="7" sm="12">
                                    <div className="heading">
                                        <h4 dangerouslySetInnerHTML={{ __html: courseValue.courseName }}></h4>
                                        {/* <p dangerouslySetInnerHTML={{ __html: getCourseDetails.generalDetails }}></p> */}
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
                                                <p dangerouslySetInnerHTML={{ __html: courseValue.categoryName }}></p>
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
                                                {fee_validator(courseValue.courseFee)}
                                            </div>

                                        </div>
                                    </div>

                                    {/* <div className="course-details-banner">
                                        <img src={`http://10.244.3.218:8082/${courseValue.imageUrl}`} alt="" className="img-fluid" style={{ height: 425, width: 825 }} />
                                    </div> */}
                                    <div className="course-details-banner">
                                        {getCourseDetails.video ? (
                                            <video
                                                src={process.env.PUBLIC_URL + `http://10.244.3.218:8082/${getCourseDetails.video}`}
                                                alt="Course Video"
                                                className="img-fluid"
                                                controls
                                                controlsList="nodownload noplaybackrate"
                                                disablePictureInPicture
                                                autoPlay
                                                muted
                                            />
                                        ) : (
                                            <img
                                                src={process.env.PUBLIC_URL + `http://10.244.3.218:8082/${getCourseDetails.imageUrl}`}
                                                alt="Course Image"
                                                className="img-fluid"
                                            />
                                        )}
                                    </div>
                                </Col>

                                <Col lg="4" md="5" sm="12">
                                    <div className="single-details-sidbar-courseDetails">
                                        <Row>
                                            <Col md="12">
                                                <div className="course-details-feature">
                                                    <h5 className="title">{t('course_details')}</h5>
                                                    {/* <div className="event-sidebar-timer text-center">
                                                    <Timer initialTime={1040 * 970 * 980} direction="backward">
                                                        <p><Timer.Days /><span>Days</span></p>
                                                        <p><Timer.Hours /><span>Hours</span></p>
                                                        <p><Timer.Minutes /><span>Minutes</span></p>
                                                    </Timer>
                                                </div> */}
                                                    <ul className="list-unstyled feature-list">
                                                        <li><i className="far fa-calendar-check"></i> {t('enrollment_start_date')}: <span>{convertDate(getCourseDetails.enrollStartDate)}</span></li>
                                                        <li><i className="far fa-calendar-check"></i> {t('enrollment_end_date')}: <span>{convertDate(getCourseDetails.enrollEndDate)}</span></li>
                                                        <li><i className="far fa-calendar-check"></i> {t('course_Publish_Date')}: <span>{convertDate(getCourseDetails.publishDate)}</span></li>
                                                        <li><i className="far fa-calendar-check"></i> {t('commence_date')}: <span>{convertDate(getCourseDetails.commenceDate)}</span></li>
                                                        <li><i className="far fa-calendar-check"></i> {t('closing_date')}: <span>{convertDate(getCourseDetails.closingDate)}</span></li>
                                                        <li><i className="far fa-clock"></i> {t('duration')}: <span>{getCourseDetails.duration == 1825 ? "Unlimited" : getCourseDetails.duration} {t('days')}</span></li>
                                                        <li><i className="fas fa-globe-asia"></i> {t('language1')}: <span>{t('english')}</span></li>
                                                        <li><i className="far fa-bookmark"></i> {t('enrolled')}: <span>{userCount}</span></li>
                                                        <li><i className="fas fa-certificate"></i> {t('certification')}: <span>{t('yes')}</span></li>
                                                    </ul>
                                                    <ul className="feature-list">
                                                        {
                                                            getCourseDetails.status === "C" ?
                                                                <>
                                                                    <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">{t('Disable Course')}</button></li>
                                                                    <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">{t('request_to_publish_course')}</button></li>
                                                                </> : getCourseDetails.status === "P" ?
                                                                    <>
                                                                        {userCount == 0 ? <li><button type="button" onClick={() => unPublishCourseButton(courseId)} className="enroll-btn">{t('unpublish_course')}</button></li> : null}
                                                                        <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">{t('Disable Course')}</button></li>
                                                                        <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">{t('course_publish')}</button></li>
                                                                    </>
                                                                    : getCourseDetails.status === "U" ?
                                                                        <>
                                                                            <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">{t('Disable Course')}</button></li>
                                                                            <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">{t('request_to_publish_course')}</button></li>
                                                                        </>
                                                                        : getCourseDetails.status === "D" ?
                                                                            <>
                                                                                <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">{t('enable_course')}</button></li>
                                                                            </>
                                                                            : getCourseDetails.status === "R" ?
                                                                                <>
                                                                                    <>
                                                                                        {userCount == 0 ? <li><button type="button" onClick={() => unPublishCourseButton(courseId)} className="enroll-btn">{t('unpublish_course')}</button></li> : null}
                                                                                        <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">{t('Disable Course')}</button></li>
                                                                                        <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">{t('publish_course')}</button></li>
                                                                                    </>
                                                                                </>
                                                                                : null
                                                        }



                                                    </ul>
                                                    <ul className="list-unstyled feature-list">
                                                        {getCourseStructureJson.lastPublishedDate == undefined ? null :
                                                            <li>{t('last_published_date')}: <span>{getCourseStructureJson.lastPublishedDate}</span></li>
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div className='single-details-sidbar-announcement'>
                                        {/* <Col md="12">
                                                <PopularCourse />
                                            </Col> */}
                                        <Row>
                                            <RenderOnAuthenticated>
                                                {visibility ?
                                                    null
                                                    :
                                                    <Col md="12" >
                                                        <div>
                                                            <div className="course-details-feature">
                                                                <Dropdown autoClose='inside' >
                                                                    <h5 className="title">{t('announcement')}
                                                                        <i style={{ marginLeft: '110px' }} className="las la-bullhorn la-lg " >
                                                                        </i>{
                                                                            getCourseAnnouncement.length == 0
                                                                                ?
                                                                                null
                                                                                :
                                                                                <span className="badge">{getCourseAnnouncement.length}</span>
                                                                        }
                                                                    </h5>
                                                                    <Dropdown.Toggle className='view-announcement'>{t('show_announcement')}</Dropdown.Toggle>

                                                                    <Dropdown.Menu >
                                                                        <div className='announcement-content'>
                                                                            {
                                                                                getCourseAnnouncement.length === 0 ? <li style={{ fontWeight: 'bold', padding: '10px' }} className="noti-text-dup">{t('no_announcment')}</li> :
                                                                                    <ul className="list-unstyled feature-list" style={{ overflowY: 'auto', height: "250px" }}>
                                                                                        {getCourseAnnouncement.map((data) => {
                                                                                            return (
                                                                                                <li style={{ padding: '10px' }} className="noti-text-dup" onClick={() => AnnouncementModal(data.title, data.body, dateConverter(data.publihFrom))}>{data.title}</li>
                                                                                            )
                                                                                        })}
                                                                                    </ul>
                                                                            }
                                                                        </div>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>


                                                            </div>

                                                        </div>

                                                    </Col>
                                                }
                                            </RenderOnAuthenticated>
                                        </Row>

                                    </div>
                                </Col>
                            </div >
                            {/* </Col> */}
                        </Row>
                    </Container>
                </section>
                <section className="course-details-area" id='Tab'>
                    <Container >
                        <Row>
                            <div className="course-tab-list" >
                                <Tab.Container defaultActiveKey="overview" >
                                    <Nav className="flex-column" onClick={() => scrollToView()} >
                                        <Nav.Item>
                                            <Nav.Link eventKey="overview">{t('overview')}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="curriculum" >{t('curriculum')}</Nav.Link>
                                        </Nav.Item>
                                        {/* <RenderOnAuthenticated>
                                            {visibility ?
                                                null
                                                :
                                                <Nav.Item>
                                                    <Nav.Link eventKey="assignment">{t('assignment')}</Nav.Link>
                                                </Nav.Item>
                                            }
                                        </RenderOnAuthenticated> */}
                                        <Nav.Item>
                                            <Nav.Link eventKey="instructor">{t('instructors')}</Nav.Link>
                                        </Nav.Item>
                                        <RenderOnAuthenticated>
                                            <Nav.Item>
                                                <Nav.Link onClick={() => courseFeedbackResponses()} eventKey="feedback">{t('feedback')}</Nav.Link>
                                            </Nav.Item>
                                        </RenderOnAuthenticated>
                                        <Nav.Item>
                                            <Nav.Link eventKey="review">{t('reviews')}</Nav.Link>
                                        </Nav.Item>
                                        {/* <RenderOnAuthenticated>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="assessment">{t('assessment')}</Nav.Link>
                                                </Nav.Item>
                                        </RenderOnAuthenticated> */}

                                        {/* <RenderOnAuthenticated>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="discussion">Discussion</Nav.Link>
                                                </Nav.Item>
                                        </RenderOnAuthenticated>
                                        <RenderOnAuthenticated>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="query">Query</Nav.Link>
                                                </Nav.Item>
                                        </RenderOnAuthenticated> */}
                                        <RenderOnAuthenticated>
                                            <Nav.Item>
                                                <Nav.Link onClick={() => getUserEnrolledByCourse()} eventKey="learner">{t('learner_list')}</Nav.Link>
                                            </Nav.Item>
                                        </RenderOnAuthenticated>
                                    </Nav>

                                    <Tab.Content >
                                        <Tab.Pane eventKey="learner" className="overview-tab">

                                            <div className="col-lg-12 grid-margin stretch-card">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <br></br>
                                                        <div>
                                                            <Button onClick={tableExportExcel} style={{ marginRight: "5px", background: "#f0ad4e", border: "0px" }}>{t('export_to_excel')}</Button>
                                                            <Button onClick={tableExportPDF} style={{ background: "#f0ad4e", border: "0px" }}> {t('export_to_pdf')}</Button>
                                                            <br></br>
                                                        </div>
                                                        <br></br>
                                                        <DataTable
                                                            columns={learner}
                                                            data={filteredItemsforLearner}
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
                                        <Tab.Pane eventKey="query" className="overview-tab">
                                            {
                                                isDecodeValid === "VALID"
                                                ?
                                                <>
                                            <Query courseid={courseId} tenantid={tenantId} userid={userId} itemid={courseId} />
                                                </>
                                                :
                                                <>
                                                </>
                                            }
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="discussion" className="overview-tab">
                                            {
                                                isDecodeValid === "VALID"
                                                ?
                                                <>
                                                <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={courseId} />
                                                </>
                                                :
                                                <></>
                                            }
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="overview" className="overview-tab">
                                            <div className="course-desc">
                                                <h5>{t('course_description')}</h5>
                                                <p dangerouslySetInnerHTML={{ __html: courseValue.generalDetails }}></p>
                                            </div>
                                            <div className="course-feature">
                                                <h5>{t('course_prerequisite')}</h5>
                                                <p dangerouslySetInnerHTML={{ __html: courseValue.prerequisite }}></p>
                                            </div>
                                            <div className="course-feature">
                                                <h5>{t('course_objective')}</h5>
                                                <p dangerouslySetInnerHTML={{ __html: courseValue.objective }}></p>
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
                                            {
                                                isDecodeValid === "VALID"
                                                    ?
                                                    <>
                                                        {/* <div class="wrap shadow-lg bg-body rounded">
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Module/Topic</Tooltip>}>
                                                            <a class="hover-fx" onClick={() => AddModuleModalShow()} ><i className="fas fa-folder-plus" style={{ color: '#5cb85c' }}></i></a>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Content Files</Tooltip>}>
                                                            <a class="hover-fx" onClick={() => setToggle(!toggle)}><i className="fa fa-file" style={{ color: '#f0ad4e' }}></i></a>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                                            <a class="hover-fx" ><i className="fa fa-edit" style={{ color: '#f0ad4e' }}></i></a>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove</Tooltip>}>
                                                            <a class="hover-fx" onClick={() => RemoveContentOrStructure(getCourseStructureFolderId)}><i className="fas fa-trash-alt" style={{ color: '#d9534f' }}></i></a>
                                                        </OverlayTrigger>
                                                    </div> */}
                                                        {/* {toggle && (
                                                        <div class="lg bg-body rounded" style={{ marginLeft: '70px', marginTop: '-10px' }}>
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">HTML</Tooltip>}>
                                                                <a class="hover-fx1" ><i class="fab fa-html5" style={{ color: '#f0ad4e' }}></i></a>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Zip (HTML) Text</Tooltip>}>
                                                                <a class="hover-fx1"><i className="fas fa-file-archive" style={{ color: '#f0ad4e' }}></i></a>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">PDF</Tooltip>}>
                                                                <a class="hover-fx1" ><i className="fas fa-file-pdf" style={{ color: '#f0ad4e' }}></i></a>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Video</Tooltip>}>
                                                                <a class="hover-fx1" ><i className="fas fa-file-video" style={{ color: '#f0ad4e' }}></i></a>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Youtube</Tooltip>}>
                                                                <a class="hover-fx1" ><i className="fab fa-youtube" style={{ color: '#f0ad4e' }}></i></a>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">External Link</Tooltip>}>
                                                                <a class="hover-fx1" ><i className="fas fa-envelope" style={{ color: '#f0ad4e' }}></i></a>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SCORM (ZIP) Content</Tooltip>}>
                                                                <a class="hover-fx1" ><i className="fas fa-folder" style={{ color: '#f0ad4e' }}></i></a>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Streaming URL</Tooltip>}>
                                                                <a class="hover-fx1" ><i className="fas fa-video" style={{ color: '#f0ad4e' }}></i></a>
                                                            </OverlayTrigger>
                                                        </div>
                                                    )} */}
                                                        <br></br>
                                                        <div className="course-curriculum">
                                                            <div class="btn-group btn-breadcrumb" style={{ border: "1px solid #d3d3d3", borderRadius: "5px" }}>
                                                                <a class="btn btn-default"><i class="fas fa-house-user fa-lg"></i></a>
                                                                <Breadcrumb />
                                                            </div>
                                                            {/* <i className="fas fa-house-user" style={{ fontSize: '25px' }}></i>
                                                        <h5 style={{ textTransform: 'capitalize' }}></h5> */}
                                                            {/* <Tree1 class="tree" data={[getCourseStructureJson]} /> */}
                                                            {/* <div className="tree-wrapper">
                                                            <TreeMenuExtended />
                                                        </div> */}


                                                            {/* <li class="breadcrumb-item active"><a href="#">{}</a></li> */}

                                                            < div className="items"> {itemsCourse}</div>
                                                        </div>
                                                        {/* <div className="course-curriculum">
                                                        <h5>Course Curriculum</h5>
                                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae impedit eligendi perspiciatis animi maxime ab minus corporis omnis similique excepturi, quidem facere quisquam aperiam neque dolorem saepe. Laboriosam, quam aliquam. Optio earum accusantium quam eius dignissimos quaerat voluptatem excepturi aliquid dolor ducimus. Illo porro maiores fuga dignissimos temporibus odio nulla nobis nemo.</p>
                                                    </div> */}
                                                        {/* <div class="shadow-lg bg-body rounded">
                                                        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: "1px inset" }}>
                                                            <div class="container-fluid">
                                                                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                                                    <div class="navbar-nav">
                                                                        <a class="nav-link" href="#" onClick={() => handleModal()}><i className="fas fa-folder-plus" style={{ fontSize: "25px", marginRight: "5px" }}></i>Create</a>&nbsp;&nbsp;
                                                                        {getParentId.length == 0 ?
                                                                            <a class="nav-link" href="#" onClick={() => alertMsg()} ><i className="fa fa-file-upload" style={{ fontSize: "25px", marginRight: "5px" }}></i>Upload</a>
                                                                            : <a class="nav-link" href="#" onClick={() => FileUploadModalShow()}><i className="fa fa-file-upload" style={{ fontSize: "25px", marginRight: "5px" }}></i>Upload</a>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </nav>
                                                    </div> */}
                                                        {toggle && (
                                                            <>
                                                                {/* <div class="lg bg-body rounded" >
                                                                Add New Content <i class="fas fa-hand-point-right" style={{ fontSize: '25px' }}></i>
                                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Image</Tooltip>}>
                                                                    {getParentId.length == 0 ?
                                                                        <a class="hover-fx1" onClick={() => alertMsg()} ><i class="fas fa-image" style={{ color: '#f0ad4e' }}></i></a>
                                                                        : <a class="hover-fx1" onClick={() => FileUploadModalShow()}><i class="fas fa-image" style={{ color: '#f0ad4e' }}></i></a>
                                                                    }
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">HTML</Tooltip>}>
                                                                    {getParentId.length == 0 ?
                                                                        <a class="hover-fx1" onClick={() => alertMsg()} ><i class="fab fa-html5" style={{ color: '#f0ad4e' }}></i></a>
                                                                        : <a class="hover-fx1" onClick={() => FileUploadModalShow()}><i class="fab fa-html5" style={{ color: '#f0ad4e' }}></i></a>
                                                                    }
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Zip (HTML) Text</Tooltip>}>
                                                                    {getParentId.length == 0 ?
                                                                        <a class="hover-fx1" onClick={() => alertMsg()} ><i className="fas fa-file-archive" style={{ color: '#f0ad4e' }}></i></a>
                                                                        : <a class="hover-fx1" onClick={() => FileUploadModalShow()}><i className="fas fa-file-archive" style={{ color: '#f0ad4e' }}></i></a>
                                                                    }
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">PDF</Tooltip>}>
                                                                    {getParentId.length == 0 ?
                                                                        <a class="hover-fx1" onClick={() => alertMsg()} ><i className="fas fa-file-pdf" style={{ color: '#f0ad4e' }}></i></a>
                                                                        : <a class="hover-fx1" onClick={() => FileUploadModalShow()}><i className="fas fa-file-pdf" style={{ color: '#f0ad4e' }}></i></a>
                                                                    }
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Video</Tooltip>}>
                                                                    {getParentId.length == 0 ?
                                                                        <a class="hover-fx1" onClick={() => alertMsg()} ><i className="fas fa-file-video" style={{ color: '#f0ad4e' }}></i></a>
                                                                        : <a class="hover-fx1" onClick={() => FileUploadModalShow()}><i className="fas fa-file-video" style={{ color: '#f0ad4e' }}></i></a>
                                                                    }
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Youtube</Tooltip>}>
                                                                    <a class="hover-fx1" onClick={() => FileUploadModalShow()}><i className="fab fa-youtube" style={{ color: '#f0ad4e' }}></i></a>
                                                                </OverlayTrigger> 
                                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">External Link</Tooltip>}>
                                                                    <a class="hover-fx1" onClick={() => FileUploadModalShow()} ><i className="fas fa-envelope" style={{ color: '#f0ad4e' }}></i></a>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SCORM (ZIP) Content</Tooltip>}>
                                                                    {getParentId.length == 0 ?
                                                                        <a class="hover-fx1" onClick={() => alertMsg()} ><i className="fas fa-folder" style={{ color: '#f0ad4e' }}></i></a>
                                                                        : <a class="hover-fx1" onClick={() => FileUploadModalShow()}><i className="fas fa-folder" style={{ color: '#f0ad4e' }}></i></a>
                                                                    }
                                                                </OverlayTrigger>
                                                                 <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Streaming URL</Tooltip>}>
                                                                    <a class="hover-fx1" onClick={() => FileUploadModalShow()}><i className="fas fa-video" style={{ color: '#f0ad4e' }}></i></a>
                                                                </OverlayTrigger>
                                                            </div>
                                                             <div class="lg bg-body rounded" >
                                                                Add New Directory <i class="fas fa-hand-point-right" style={{ fontSize: '25px' }}></i>
                                                                <a class="hover-fx1" onClick={() => handleModal2()}><i className="fas fa-folder-plus" ></i></a>
                                                            </div>  */}

                                                                <div class="lg bg-body rounded" >
                                                                    {t('add_youtube_video_link')}<i class="fas fa-hand-point-right" style={{ fontSize: '25px' }}></i>
                                                                    <a class="hover-fx1" onClick={() => handleModal()}><i className="fab fa-youtube" style={{ fontSize: '20px', color: '#f0ad4e', fontWeight: '900' }} ></i></a>
                                                                </div>
                                                                {/* <div class="lg bg-body rounded" >
                                                                Add Feedback to Topic <i class="fas fa-hand-point-right" style={{ fontSize: '25px' }}></i>
                                                                <a class="hover-fx1" onClick={() => handleTopicFeedback()}><i class="fas fa-comments" style={{ fontSize: '20px', color: '#f0ad4e', fontWeight: '900' }}></i></a>
                                                            </div> */}
                                                                <br></br>
                                                                <div class="shadow-lg bg-body rounded">
                                                                    <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: "1px inset" }}>
                                                                        <div class="container-fluid">
                                                                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                                                                <div class="navbar-nav">
                                                                                    <a class="nav-link">{t('my_files')}   &nbsp;&nbsp;
                                                                                        <i className="fa fa-angle-right" ></i>
                                                                                    </a>
                                                                                    {getFolderName == null ? null :
                                                                                        <a class="nav-link" href="#" style={{ textTransform: 'capitalize' }}>
                                                                                            <i className="fa fa-folder-open" ></i> &nbsp;&nbsp;{getFolderName}
                                                                                        </a>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </nav>
                                                                </div>
                                                                {/* <Tree class="tree" data={getFolder} /> */}

                                                                <div style={{ marginLeft: '10px' }} className="items">{items}</div>

                                                                <div class="shadow-lg p-3 bg-body rounded">
                                                                    {getContentDetails.length == 0 ? <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '20px' }}>{t('no_records_to_display')}</p> :
                                                                        <Card>
                                                                            <DataTable
                                                                                title="Content List"
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
                                                                                fixedHeader
                                                                                fixedHeaderScrollHeight="300px"
                                                                                selectableRows
                                                                                onSelectedRowsChange={handleRowSelected}
                                                                            />

                                                                            <Row style={{ marginBottom: '15px' }}>
                                                                                {/* <Col>
                                                                                <DatePicker
                                                                                    selected={startDate1}
                                                                                    onChange={(date) => setStartDate1(date)}
                                                                                    customInput={<ExampleCustomInput />}
                                                                                    timeInputLabel="Time:"
                                                                                    dateFormat="MM/dd/yyyy h:mm aa"
                                                                                    showTimeInput
                                                                                    popperPlacement="top-start"
                                                                                    minDate={new Date()}
                                                                                />
                                                                            </Col> */}
                                                                                <Col style={{ textAlign: 'center' }}>
                                                                                    {
                                                                                        selectedRows.length == 0 ? <DatePicker
                                                                                            selected={startDate}
                                                                                            onChange={(date) => setStartDate(date)}
                                                                                            customInput={<ExampleCustomInput />}
                                                                                            timeInputLabel="Time:"
                                                                                            showTimeInput
                                                                                            dateFormat="MM/dd/yyyy h:mm:ss aa"
                                                                                            popperPlacement="top-start"
                                                                                            minDate={new Date()}
                                                                                            disabled
                                                                                        />
                                                                                            :
                                                                                            <DatePicker
                                                                                                value={startDate}
                                                                                                selected={startDate}
                                                                                                onChange={(date) => setStartDate(date)}
                                                                                                customInput={<ExampleCustomInput />}
                                                                                                timeInputLabel="Time:"
                                                                                                dateFormat="MM/dd/yyyy h:mm:ss aa"
                                                                                                placeholderText="MM/dd/yyyy h:mm:ss"
                                                                                                showTimeInput
                                                                                                popperPlacement="top-start"
                                                                                                minDate={new Date()}
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                            />
                                                                                    }
                                                                                </Col>
                                                                                <Col style={{ textAlign: 'center' }}>
                                                                                    {
                                                                                        selectedRows.length == 0 ? <Button disabled >{t('add')}</Button>
                                                                                            : <Button onClick={() => AddContentToCourseStructure(newArr, getCourseStructureFolderId)} >{t('add')}</Button>
                                                                                    }
                                                                                </Col>
                                                                            </Row>

                                                                            {/* <nav class="sc-euEtCV rdt_Pagination">
                                                                            {
                                                                                selectedRows.length == 0 ? <Button disabled style={{ marginLeft: '45px', marginTop: '-75px' }}>Add</Button>
                                                                                    : <Button onClick={() => AddContentToCourseStructure(newArr, getCourseStructureFolderId)} style={{ marginLeft: '45px', marginTop: '-75px' }}>Add</Button>
                                                                            }
                                                                        </nav> */}
                                                                        </Card>
                                                                    }
                                                                </div>
                                                            </>
                                                        )}
                                                        {/* <div className="course-element">
                                                        <h5>Course Content</h5>
                                                        <div className="course-item">
                                                            <button className="course-button active">Part 3: React Application Setup Project <span>04 Lectures - 59 Min</span></button>
                                                            <div className="course-content show">
                                                                <ul className="list-unstyled">
                                                                    <li>
                                                                        <span className="play-icon"><i className="las la-play"></i> Lecture: 01</span>
                                                                        <span className="lecture-title">Javascript functional components</span>
                                                                        <span className="lecture-duration">24:36</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="play-icon"><i className="las la-play"></i> Lecture: 02</span>
                                                                        <span className="lecture-title">Javascript api integration</span>
                                                                        <span className="lecture-duration">21:20</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="play-icon"><i className="las la-play"></i> Lecture: 03</span>
                                                                        <span className="lecture-title">Javscript project Setup</span>
                                                                        <span className="lecture-duration">15:1</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="assessment" className="assessment-tab">
                                            { 
                                            showContentDependOnDate && 
                                            (
                                                isDecodeValid === "VALID"
                                                ?

                                            <RenderOnAuthenticated>
                                                <DataTableAssessment tenantId={tenantId} courseId={courseId} />
                                            </RenderOnAuthenticated>
                                            :
                                            <>
                                            </>
                                            )
                                            }
                                            {!showContentDependOnDate && (<RenderOnAuthenticated>
                                                <p>{t('course_closed')}</p>
                                            </RenderOnAuthenticated>)}

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="instructor" className="instructor-tab">
                                            <h5>{t('course_instructor')}</h5>
                                            <div className='instructor-box'>
                                                <div className="instructor-item">
                                                    {
                                                        getInstructor.map((data, i) => {
                                                            // //console.log(data);
                                                            return (
                                                                <Row>
                                                                    {/* <Col md="4"> */}
                                                                    <div className="instructor-img">
                                                                        <img src={`${getInstructorImg.img}${data.learnerUsername}`} alt="" className="img-fluid" style={{ width: '110px' }} />
                                                                    </div>
                                                                    {/* </Col> */}
                                                                    <Col md="8">
                                                                        <div className="instructor-content">
                                                                            <div className="instructor-box">
                                                                                <div className="top-content " >
                                                                                    {/* d-flex justify-content-between  */}
                                                                                    <div >
                                                                                        <div className="instructor-name">
                                                                                            <h6>{data.firstName} {data.lastName
                                                                                            }</h6>
                                                                                            <p>{courseValue.inst_profile}</p>
                                                                                            <br />
                                                                                            <p>EMAIL ID - {data.email}</p>

                                                                                        </div>
                                                                                        <div className="instructor-social">
                                                                                            <ul className="social list-unstyled list-inline">
                                                                                                {data.facebookId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a target="_blank" href={"https://www.facebook.com/" + data.facebookId}><i className="fab fa-facebook-f"></i></a></li>
                                                                                                }
                                                                                                {data.twitterId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.twitter.com/" + data.twitterId} target="_blank"><i className="fab fa-twitter"></i></a></li>
                                                                                                }
                                                                                                {data.linkedinId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.linkedin.com/in/" + data.linkedinId} target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                                                                                }
                                                                                                {data.youtubeId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.youtube.com/" + data.youtubeId} target="_blank"><i className="fab fa-youtube"></i></a></li>
                                                                                                }
                                                                                                {data.skypeId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.skype.com/" + data.skypeId} target="_blank"><i className="fab fa-skype"></i></a></li>
                                                                                                }
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="instructor-desk">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="feedback" className="overview-tab">
                                            <Accordion defaultActiveKey="0">
                                                {getFeedbackResponse.length == 0 ? <p>{t('no_responses_for_course')}</p> :
                                                    <>
                                                        {/* <br></br>
                                                                            <div>
                                                                            <Button onClick={tableExportExcelforFeedback} style={{ marginRight: "5px", background:"#f0ad4e" , border:"0px" }}> Export to Excel </Button>
                                                                            <Button onClick={tableExportPDFforFeedback} style={{ background:"#f0ad4e" , border:"0px"}}> Export to PDF </Button>
                                                                            </div>
                                                                            <br></br> */}
                                                        {getFeedbackResponse.map((data, i) =>
                                                            <Accordion.Item eventKey={i}>
                                                                <Accordion.Header>{i + 1}</Accordion.Header>
                                                                <Accordion.Body style={{ marginLeft: '25px' }}>
                                                                    {data.responseMaster.map((a, j) => <div style={{ margin: '10px', padding: '10px' }}>{j + 1}.{a.questionMaster.question} {a.questionMaster.questionType == "TF" || a.questionMaster.questionType == "TA" ?
                                                                        <ul style={{ listStyleType: 'none', marginLeft: '10px' }}>
                                                                            <li>Ans. {a.feedbackResponse}</li>
                                                                        </ul> : ''}
                                                                        {a.questionMaster.optionsMasters.map((d, k) => <ul style={{ listStyleType: 'none', marginLeft: '10px' }}>
                                                                            <li>
                                                                                {k + 1}.  {d.optionText} {feedbackResponseCheckHandler(a.feedbackResponse).includes(d.optionId) ? <i class="fa fa-check" style={{ color: 'green' }} aria-hidden="true"></i>
                                                                                    : ''}</li>
                                                                        </ul>)}
                                                                    </div>)}
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        )}
                                                    </>
                                                }
                                            </Accordion>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="review" className="review-tab">
                                            <Row>
                                                <Col md="12">
                                                    <div className="review-comments">
                                                        <br></br>
                                                        <div>
                                                            <Button onClick={tableExportExcelforReview} style={{ marginRight: "5px", background: "#f0ad4e", border: "0px" }}> {t('export_to_excel')} </Button>
                                                            <Button onClick={tableExportPDFforReview} style={{ background: "#f0ad4e", border: "0px" }}> {t('export_to_pdf')} </Button>
                                                        </div>
                                                        <br></br>
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
                                        <Tab.Pane eventKey="assignment" >

                                            {/* <AssignmentMain userId={userId} courseId={courseId} tenantId={tenantId} /> */}


                                            {showContentDependOnDate && (
                                                
                                                    isDecodeValid === "VALID"
                                                    ?
                                                    <>
                                                    <RenderOnAuthenticated>
                                                        <EnrolledAssignment courseID={courseId} tenantID={tenantId} />
                                                        {/* <AssignmentMain userId={userId} courseId={courseId} tenantId={tenantId} /> */}
                                                    </RenderOnAuthenticated>
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                                
                                            )
                                            }
                                            {!showContentDependOnDate && (<RenderOnAuthenticated>
                                                <p>{t('course_closed')}</p>
                                            </RenderOnAuthenticated>)}
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="certificate" >
                                            <Button variant="outline-info" onClick={() => certificateDownload()}>{t('download')} <i class="las la-download la-lg"></i></Button>
                                            <Button variant="outline-info" onClick={() => certificateView()}>{t('view')} <i class="las la-eye la-lg"></i></Button>
                                            {/* <iframe src={getCertificateURl} width="725px" height="800px" /> */}
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>



                        </Row>
                    </Container>
                </section>
                <Modal
                    centered show={getModalState.show} onHide={() => handleModal2()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {t('provide_the_reply')}
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
                            {t('update_review')}
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

                {/* ContentView model code start here*/}
                <Modal
                    size="xl" centered show={getUrlModal.show} onHide={() => UrlModalHide()} backdrop="static">
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            {getContentType === "zip" ? <i class="fas fa-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}> {getContentName}</i>
                                : getContentType === "pdf" ? <i class="fas fa-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}> {getContentName}</i>
                                    : getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <i class="fas fa-file-image" style={{ fontSize: "25px", color: "#b2b1ff" }}> {getContentName}</i>
                                        : getContentType === "html" ? <i class="fab fa-html5" style={{ fontSize: "25px", color: "#e54c21" }}> {getContentName}</i>
                                            : getContentType === "ogg" || getContentType === "webm" || getContentType === "mp4" ? <i class="fas fa-file-video" style={{ fontSize: "25px", color: "#8cee02" }}> {getContentName}</i>
                                                : getContentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}> {getContentName}</i>
                                                    : getContentType === "doc" || getContentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}> {getContentName}</i>
                                                        : getContentType === "scorm" ? <i class="far fa-file-archive" style={{ fontSize: "25px", color: "green" }}> {getContentName}</i>
                                                            : getContentType === "youtube" ? <i class="fab fa-youtube" style={{ fontSize: "25px", color: "green" }}> {getContentName}</i>
                                                                : null}
                        </Modal.Title>
                        <Button onClick={() => UrlModalHide()} style={{ background: "green" }}> X </Button>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <img src={`http://10.244.3.218:8080/${getUrl}`} width="1100" height="800" />
                                : getContentType === "pdf" ? (
                                    <div>
                                        {" "}
                                        <ViewPdf
                                            pdfUrl={`http://meghs1.hyderabad.cdac.in/pdfViewer/${getUrl}`}
                                        />
                                    </div>
                                )
                                    : getContentType === "mp4" ? <div> <Videojs {...videoJsOptions} /></div>
                                        : getContentType === "docx" ? <iframe width="100%" height="100%" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                            : getContentType === "html" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                                : getContentType === "zip" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                                    : getContentType === "scorm" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                                        : getContentType === "youtube" ? <ReactPlayer url={getUrl} width="100%" height="800px" controls="true"
                                                            config={{
                                                                youtube: {
                                                                    playerVars: { showinfo: 1 }
                                                                }
                                                            }}
                                                        />

                                                            : <p>{t('no_content_available')}</p>
                        }
                    </Modal.Body>
                    {/* <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={123} /> */}
                </Modal>
                {/* ContentView model code end here*/}


                {/* Certificate Modal */}

                <Modal centered show={getCertificateView.show} onHide={() => CertificateViewHide()} backdrop="static" className='custom-modal-style' size="xl" >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                            {t('Course Certificate')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{}}>
                            {/* <a id="id2239" href="http://10.244.3.218:8083/certificates/246.pdf" class="act01">View Certificate</a>
                        <div class="fgh"><embed id="fgh" src="http://10.244.3.218:8083/certificates/246.pdf" type="application/pdf" width="400" height="400"/></div> */}

                            {/* <p>http://10.244.3.218:8083/{certificateUrl}</p> */}
                            <iframe src={`http://10.244.3.218:8083/${certificateUrl}`} type="application/pdf" style={{ width: '1115px', height: '800px' }}></iframe>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                        {/* <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)', border: '0px' }}
                            onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" >
                            Download
                        </Button>
                        <Button variant="secondary" onClick={() => CertificateViewHide()} style={{ border: '0px' }}>
                            Cancel
                        </Button> */}
                    </Modal.Footer>
                </Modal>

                {/* payment receipt */}

                <Modal centered show={statusForCourse.show} onHide={() => paymentReceiptViewHide()} backdrop="static" className='custom-modal-style' size="xl" >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                            {t('Course Certificate')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{}}>

                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                        {/* <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)', border: '0px' }}
                            onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" >
                            Download
                        </Button> */}
                        <Button variant="secondary" onClick={() => redirecrToCourse(courseId, tenantId)} style={{ border: '0px' }}>
                            {t('cancel')}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal centered show={getRejectModal.show} onHide={() => RejectModalHide()} backdrop="static" className='custom-modal-style' >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                            {t('content_reject_remark')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{}}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>{t('remark')}</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={(e) => setRemark(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                        <Button onClick={() => RejectCourseContent(getRejectModal.contentId)} style={{ border: '0px', background: "green" }}>
                            {t('submit')}
                        </Button>
                        <Button variant="secondary" onClick={() => RejectModalHide()} style={{ border: '0px' }}>
                            {t('cancel')}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Styles>

            {/* Footer 2 */}
            <FooterTwo />

        </div >
    )
}

export default AdminCourseDetail
