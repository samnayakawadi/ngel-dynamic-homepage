import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, OverlayTrigger, Tooltip, TabPane } from 'react-bootstrap';
import { Styles } from './styles/coursedetails.js';
import FooterTwo from '../../../components/FooterTwo';
import HeaderTwo from '../../../components/HeaderTwo';
import { BreadcrumbBox } from '../../../components/common/Breadcrumb';
import ReviewForm from '../../courses/components/ReviewForm';
import instructorService from '../../../services/instructorService.js';
import swal from 'sweetalert';
import './styles/styles.scss';
import Videojs from './video.js';
import DataTable from "react-data-table-component";
import FilterDataTable from '../FilterDataTable.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import PopularCourse from '../../courses/components/PopularCourse'
// import CourseTag from '../../courses/components/CourseTag'
import TreeMenu from 'react-simple-tree-menu'
import '../../../../node_modules/react-simple-tree-menu/dist/main.css';
import { Alert, Form, ListGroup, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/tree.css';
import Timer from 'react-compound-timer';
import service from '../../../services/service.js';
import UserService from '../../../services/UserService.js';
import { UncontrolledCollapse } from "reactstrap";
import '../styles.css';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import DiscussionMain from '../../discussion/DiscussionMain.js';
import Accordion from 'react-bootstrap/Accordion';
import Query from '../../courses/Query/Query.js';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import TopicFeedback from '../instCourses/TopicFeedback.js';
import FrontAssignment from './assignment/FrontAssignment.js';
import CompletionCriteria from './CompletionCriteria.js';
import { Bar, Pie } from 'react-chartjs-2';
import { ConsoleView } from 'react-device-detect';
import axios from 'axios';
import md5 from 'md5';
import moment from 'moment';
import ViewPdf from "../../../pages/instructor/ViewPdf.js";
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

function InstCourseDetails(props) {

    useEffect(() => {
        UserService.generateToken();
    }, []);


    const um_api = UserService.USER_API;
    //////console.log(um_api);

    const [ratingCount, setRatingCount] = useState(0);
    let tenantId = 1;
    // var courseID = props.match.params.cId;

    let UserId = UserService.getUserid();

    // for different languages
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    const decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 32))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    }

    let courseid = props.match.params.cId;
    const [courseId, setDecodedCourseId] = useState(null)
    const [isDecodeValid, setIsDecodeValid] = useState("NOTVALID")
    //const [tenantId, setDecodedTenantId] = useState(null)
    // let tenantID = props.match.params.tid;
    // let hashcode = courseid.substring(0, 10);
    // const myDecipher = decipher(`${hashcode}`);
    // courseid = courseid.substring(10);
    // let courseId = myDecipher(`${courseid}`);
    // let tenantId = myDecipher(`${tenantID}`);


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
        // let mainurl = "http://tmis1.hyderabad.cdac.in:3000/course-details/";
        // let url = mainurl + courseID + '/' + tenantID;

        const secretKey = "cdac@123"



        const encodedCourseId = props.match.params.cId.replace(/-/g, "+").replace(/_/g, "/");
        const decodedCourseId = CryptoJS.AES.decrypt(
            encodedCourseId,
            secretKey
        ).toString(CryptoJS.enc.Utf8);

        // const encodedTenantId = props.match.params.tid.replace(/-/g, "+").replace(/_/g, "/");
        // const decodedTenantId = CryptoJS.AES.decrypt(
        //     encodedTenantId,
        //     secretKey
        // ).toString(CryptoJS.enc.Utf8);

        const regex = /^[0-9]+$/

        const isValidCourseId = regex.test(decodedCourseId)
        // const isValidTenantId = regex.test(decodedTenantId)

        if (isValidCourseId) {
            setIsDecodeValid("VALID")
            setDecodedCourseId(decodedCourseId)

        }
        else {
            setIsDecodeValid("NOTVALID")

            swal({
                title: t('something_went_wrong_try_later'),
                text: t('redirecting_to_course_list'),
                timer: 5000,
            }).then(() => {
                // history.push(`${process.env.PUBLIC_URL + "/ViewCourses"}`);
            })
        }

    }









    const [getCourseDetails, setCourseDetails] = useState([]);
    const [startDate, setStartDate] = useState();
    const [getRating, setRating] = useState([]);
    const [getServerTime, setServerTime] = useState();
    const [isActiveFolderId, setIsActiveFolderId] = useState();
    const [getColorActiveId, setColorActiveId] = useState();
    const [getYouTubeUrl, setYouTubeUrl] = useState();
    const [completionType, setCompletionType] = useState('None');
    const [restriction, setRestriction] = useState(' ');


    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button className="btn btn-info" onClick={onClick} ref={ref}>
            {t('publish_date')}: {value}
        </button>
    ));

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
    });

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

    const [getUserDetails, setUserDetails] = useState(initialStateId);

    useEffect(() => {
        service.getUserById(UserId)
            .then(res => {
                setUserDetails(res.data);
                ////console.log('UserDetail-------------'+res.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    const [getCourseStructureJson, setCourseStructureJson] = useState([]);
    const [userCount, setUserCount] = useState();
    const [announcementDetails, setAnnouncementDetails] = useState([]);

    useEffect(() => {

        //console.log("Called isDecodeValid")

        if (isDecodeValid !== "VALID") {
            decodeHandler()
        }

    }, [isDecodeValid, courseId])


    useEffect(() => {

        if (isDecodeValid === "VALID") {

            const fatchCourseData = async () => {
                try {
                    const res = await instructorService.getCourseById(courseId);
                    setCourseDetails(res.data);
                    setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                    //console.log((res.data.courseStructureJson));
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
            fatchAnnouncementData();
        }



    }, [courseId])

    const [ratingView, setRatingView] = useState(false)

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            checkRatingBody();

        }

    }, [ratingCount, courseId])

    const checkRatingBody = () => {
        if (ratingCount !== 0) {
            setRatingView(true);
        }
    }


    const fatchAnnouncementData = async () => {
        try {
            const res = await service.getAllCourseAnnouncementListByAuthor(UserId, courseId)
            setAnnouncementDetails(res.data);
        } catch (error) {

        }
    }

    const [isActive, setIsActive] = useState({
        folder: 0,
        file: 0
    });

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            folderStructureTreeCourse()
        }
    }, [getColorActiveId, isActive, courseId])

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            folderStructureTree();
        }
    }, [isActiveFolderId, isActive, courseId])

    const scrollWin = () => {
        document.getElementById('Main').scrollIntoView({ behavior: 'smooth' })
        //window.scrollTo(0, 290);
    }

    const fee_validator = (fees) => {
        if (fees === 0) {
            return <p>Free</p>
        }
        else {
            return <p>&#8377;{fees}</p>
        }
    }

    const convertDate = (dateFormat) => {
        let timestamp = Date.parse(dateFormat);
        let date = new Date(timestamp);
        let d = date.toLocaleString('en-IN', { hour12: false, timeZone: 'IST' });

        // let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
        return d;
    }

    /* Course Structure Create Code Start */

    const [getFolder, setFolder] = useState([]);
    const [getFolderName, setFolderName] = useState();
    const [getLoading, setLoading] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const [errorMsg2, setErrorMsg2] = useState();
    useEffect(() => {
        instructorService.getFolderStructure(UserId)
            .then(res => {
                setFolder(res.data);
            }).catch(err => {
                swal(`${t('error')}`, `${err} ${t('try_sometimes')}`, "error");
            })
    }, [])


    const abc1 = (dirId, dirName) => {
        setIsActiveFolderId(dirId);
        setParentId(dirId);
        setFolderName(dirName);
        instructorService.contentDetails(dirId, UserId)
            .then(res => {
                setContentDetails(res.data);
            })
    }

    const [showRestriction, setShowRestriction] = useState(false);

    const handleOpenRestriction = (e) => {
        setRestriction(e.target.value);
        ////console.log(restriction);
        if (e.target.value == 'Yes') { setShowRestriction(true); } // to show restriction modal portion
        else {
            setShowRestriction(false);
        }
    };


    const [getParentId, setParentId] = useState([]);
    const [getUploadModalState, setUploadModalState] = useState({
        show: false
    });
    const [getModalState, setModalState] = useState({
        show: false
    });
    const [getTopicFeedback, setTopicFeedback] = useState({
        show: false
    });

    const handleModal2 = () => {
        setModalState({ show: false })
    }

    const handleModal = () => {
        setModalState({ show: true })
    }

    const FileUploadModalShow = () => {
        setUploadModalState({ show: true })
    }

    const FileUploadModalHide = () => {
        setUploadModalState({ show: false })
    }

    // feedback Modal show and hide

    const [itemIdForFeedback, setItemIdForFeedback] = useState();

    const handleTopicFeedback = (id) => {
        setTopicFeedback({ show: true })
        setItemIdForFeedback(id);
        ////console.log(id);
    }

    const TopicFeedbackModalHide = () => {
        setTopicFeedback({ show: false })
    }

    const UrlModalHide = () => {
        setUrlModal({ show: false })
    }


    const [getUrlModal, setUrlModal] = useState({
        show: false
    })

    const alertMsg = () => {
        swal(`${t('select')}`, `${t('node')}`, "warning");
    }

    const [getContentDetails, setContentDetails] = useState([]);
    const dirClick = (dirId, dirName) => {
        var togglers = document.querySelectorAll(".caret");
        togglers.forEach((toggler) => {
            toggler.onclick = function () {
                toggler.parentElement.querySelector(".nested").classList.toggle("active");
                toggler.classList.toggle("caret-down");
            };
        });
    }

    const deleteDirectory = (id) => {
        swal({
            title: `${t('swal_title')}`,
            text: `${t('del_folder')}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: t('yes_delete'),
            closeOnConfirm: false
        }).then(isConfirmed => {
            if (isConfirmed) {
                let data = { lastModifiedBy: UserId, dirParentId: id };
                instructorService.deleteDirectory(data)
                    .then(async res => {
                        if (res.data === "deleted successfully") {
                            await swal(`${t('swal_delete')}`, `${t('del_msg')}`, "success");
                            instructorService.getFolderStructure(UserId)
                                .then(res => {
                                    setFolder(res.data);
                                })
                        }
                    })
            }
        });
    }


    const [items, setItems] = useState([]);
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

    const folderColorChangeHandler = (itemId) => {
        setColorActiveId(itemId);
    }



    const [globalState, setGlobalState] = useState([]);

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
    const [activeAddModule, setActiveAddModule] = useState(false);
    const handleClickAddModule = () => {
        setActiveAddModule(!activeAddModule);
    };

    const [apiData] = useState([]);
    const [itemsCourse, setItemsCourse] = useState([]);
    function folderStructureTreeCourse() {
        let menuData = [];
        instructorService.getCourseById(courseId)
            .then(res => {
                //apiData.push([JSON.parse(res.data.courseStructureJson)]);
                menuData = [JSON.parse(res.data.courseStructureJson)];
                ////console.log(res.data.courseStructureJson);
                let menuItems = menuData.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    return menuItem;
                });
                setItemsCourse(menuItems);
            })

        const returnMenuItem = (item, i) => {
            ////console.log("item" + item.label);
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
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('add_module')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => { AddModuleModalShow(item.id); handleClickAddModule(); }} ><i className="fas fa-folder-plus" style={activeAddModule ? { color: "white" } : { color: "#015e3c" }}></i></a>
                                    {/* style={activeAddModule ? {color: "white"} : {color:"#5cb85c"} */}
                                </OverlayTrigger>
                            </span> : item.nodetype == "folder" ? <span style={{ position: 'relative', float: 'right' }}>
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Youtube Video</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => handleModal()}><i className="fa fa-youtube-play" style={{ color: '#f0ad4e', fontSize:'36px'}}></i></a>
                                </OverlayTrigger> */}
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('add_content_files')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => dmsUIVisible(item.id)}><i className="fa fa-file" style={{ color: '#f0ad4e', background: "rgba(2, 230, 147, 0.6)" }}></i></a>
                                </OverlayTrigger>
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Access Restriction</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => addAccessRestriction()}><i className="fas fa-lock" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('edit')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => updateFolderOrContent(item.id, item.label, item.publishDate)}><i className="fa fa-edit" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('remove')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => RemoveContentOrStructure(item.id)}><i className="fas fa-trash-alt" style={{ color: '#d9534f' }}></i></a>
                                </OverlayTrigger>
                            </span> : <span style={{ position: 'relative', float: 'right' }}>


                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('view_content')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => courseStructurContentView(item.nodetype, item.filePath, item.label)}><i className="fa fa-eye" style={{ color: '#94b8b8' }}></i></a>
                                </OverlayTrigger>
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Feedback</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => handleTopicFeedback(item.id)}><i className="fas fa-comments" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Activity Completion</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => addActivityCompletion()}><i className="fas fa-clipboard-check" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('edit')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => updateFolderOrContent(item.id, item.label, item.publishDate)}><i className="fa fa-edit" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('remove')}</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => RemoveContentOrStructure(item.id)}><i className="fas fa-trash-alt" style={{ color: '#d9534f' }}></i></a>
                                </OverlayTrigger>
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
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('add_content_file')}</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => dmsUIVisible(item.id)}><i className="fa fa-file" style={{ color: '#f0ad4e' }}></i></a>
                                        </OverlayTrigger>
                                        {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Access Restriction</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => addAccessRestriction()}><i className="fas fa-lock" style={{ color: '#f0ad4e' }}></i></a>
                                        </OverlayTrigger> */}
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('edit')}</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => updateFolderOrContent(item.id, item.label, item.publishDate)}><i className="fa fa-edit" style={{ color: '#f0ad4e' }}></i></a>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('remove')}</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => RemoveContentOrStructure(item.id)}><i className="fas fa-trash-alt" style={{ color: '#d9534f' }}></i></a>
                                        </OverlayTrigger>
                                    </span> : item.nodetype == "root" ? <span style={{ position: 'relative', float: 'right' }}>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('add_module')}</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => { AddModuleModalShow(item.id); handleClickAddModule(); }} ><i className="fas fa-folder-plus" style={activeAddModule ? { color: "white" } : { color: "#015e3c" }}></i></a>
                                            {/* style={activeAddModule ? {color: "white"} : {color:"#5cb85c"} */}
                                        </OverlayTrigger>
                                    </span> : ""}
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


    const Tree1 = ({ data }) => (
        <>
            {/* <ul class="tree">
                {data.map(i => (
                    <>
                        <li>
                            {i.Name}
                            {i.Child && <ul>
                                {<Tree1 data={i.Child} />}
                            </ul>}
                        </li>
                    </>
                ))}
            </ul> */}
            <ul class="tree" style={{ marginLeft: '12px' }}>
                {data && data.map(item => (
                    <li>
                        <span class='caret' onClick={() => dirClick(item.Id, item.Name)}><span style={{ textTransform: 'capitalize' }} onClick={() => abc1(item.Id, item.Name)}>{item.Name}&nbsp;&nbsp;</span></span>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('delete')}</Tooltip>}>
                            <span className="d-inline-block">
                                <a class="link" href="#"><i class="fas fa-trash" onClick={() => deleteDirectory(item.Id)} style={{ fontSize: "16px" }}></i></a>&nbsp;&nbsp;
                            </span>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('edit')}</Tooltip>}>
                            <span className="d-inline-block">
                                <a class="link" href="#"><i class="fas fa-edit" onClick={() => directoryEdit(item.Id, item.Name)} style={{ fontSize: "16px" }}></i></a>
                            </span>
                        </OverlayTrigger>
                        {item.Child &&
                            <ul class="nested">
                                {<Tree1 data={item.Child} />}
                            </ul>
                        }
                    </li>
                ))}
            </ul>
        </>
    );

    const Tree = ({ data }) => (
        <ul class="tree">
            {data && data.map(item => (
                <li style={{ marginTop: "5px" }}>
                    <span class="caret" onClick={() => dirClick(item.Id, item.Name)}><span style={{ textTransform: 'capitalize' }} onClick={() => abc1(item.Id, item.Name)}>{item.Name}&nbsp;&nbsp;</span></span>
                    {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                        <span className="d-inline-block">
                            <a class="link" href="#"><i class="fas fa-trash" onClick={() => deleteDirectory(item.Id)} style={{ fontSize: "16px" }}></i></a>&nbsp;&nbsp;
                        </span>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                        <span className="d-inline-block">
                            <a class="link" href="#"><i class="fas fa-edit" onClick={() => directoryEdit(item.Id, item.Name)} style={{ fontSize: "16px" }}></i></a>
                        </span>
                    </OverlayTrigger> */}
                    {item.Child &&
                        <ul class="nested">
                            {<Tree data={item.Child} />}
                        </ul>
                    }
                </li>
            ))}
        </ul>
    );


    /* Edit Dirctory Code Start Here*/
    const [getDirNameUpdateModal, setDirNameUpdateModal] = useState({
        show: false,
        dirName: '',
        dirParentId: ''
    });
    const FolderNameUpdateModalHide = () => {
        setDirNameUpdateModal({ show: false });
    }
    const directoryEdit = (Id, Name) => {
        setErrorMsg();
        setDirNameUpdateModal({ show: true, dirParentId: Id, dirName: Name });
    }
    const UpdateFolderName = (dirId) => {
        const fname = document.getElementById("folder_name");
        if (fname.value === "") {
            return setErrorMsg(t('enter_folder_name'));
        }
        let dirname = fname.value;
        let data = { dirName: dirname, lastModifiedBy: UserId, dirParentId: dirId };
        instructorService.folderNameUpdate(data)
            .then(async res => {
                if (res.status == 200) {
                    await swal(t('update'), t('folder_updated'), "success");
                    instructorService.getFolderStructure(UserId)
                        .then(res => {
                            setFolder(res.data);
                        })
                    setDirNameUpdateModal({ show: false });
                } else {
                    alert("some error");
                }

            })
    }

    /* Edit Dirctory Code End Here*/

    function changeBackgroundOver(e) {
        e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
    }

    function changeBackgroundOut(e) {
        e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
    }


    function save(getParentId) {
        const folder_name = document.getElementById("folderName");
        if (folder_name.value === "") {
            return setErrorMsg(t('enter_folder_name'))
        }
        let dirname = folder_name.value;
        if (getParentId.length == 0) {
            let register = { dirName: dirname, lastModifiedBy: UserId };
            instructorService.createDirectory(register)
                .then(async response => {
                    if (response.status == 201) {
                        await swal(t('created'), t('root_folder_created'), "success");
                        instructorService.getFolderStructure(UserId)
                            .then(res => {
                                setFolder(res.data);
                            })
                        folderStructureTree();
                        setModalState(false);
                        setParentId([]);
                    } else {
                        alert("some error");
                    }

                }).catch(err => {
                    swal(t('error'), t('try_sometimes'), "error");
                })
        } else {
            let register = { dirName: dirname, lastModifiedBy: UserId, dirParentId: getParentId };
            instructorService.createChildDirectory(register)
                .then(async response => {
                    if (response.status == 200) {
                        await swal(t('created'), t('child_folder_created'), "success");
                        instructorService.getFolderStructure(UserId)
                            .then(res => {
                                setFolder(res.data);
                            })
                        folderStructureTree()
                        setModalState(false);
                        setParentId([]);
                    } else {
                        alert("some error");
                    }
                }).catch(err => {
                    swal(t('error'), t('try_sometimes'), "error");
                })
        }
    }

    /* File Upload Code */

    const [getabc, setabc] = useState(
        {
            selectedFiles: undefined,
            currentFile: undefined,
            file: '',
        }
    )
    const [checkBox, setCheckBox] = useState(false);
    const [show, setShow] = useState();
    const selectFile = (event) => {
        let fi = document.getElementById('file');
        var files = fi.files;
        for (var i = 0; i < files.length; i++) {
            ////console.log("file type", files[i].type)
            if (files[i].type == "application/x-zip-compressed" || files[i].type == "application/zip") {
                setShow(true);
            } else {
                setShow(false);
            }
            if (files[i].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || files[i].type === "text/plain"
                || files[i].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                swal("Warning!", "doc, excel, text files are not supported", "warning");
            } else {
                //swal("Warning!", "Please select a valid image", "warning");
            }
            // //console.log("Filename: " + files[i].name);
            // //console.log("Type: " + files[i].type);
            // //console.log("Size: " + files[i].size + " bytes");
        }
        setabc({
            selectedFiles: event.target.files,
        });
    }
    // const [errorMsg, setErrorMsg] = useState();
    const upload = () => {
        const duration = document.getElementById("duration");
        const file_name = document.getElementById("file_name");
        if (file_name.value === "") {
            return setErrorMsg(t('pls_enter_file_name'))
        }
        if (duration.value === "") {
            return setErrorMsg(t('pls_enter_file_duration'))
        }

        let fileName = file_name.value;
        let durationMin = duration.value;
        let fi = document.getElementById('file');
        if (fi.files.length > 0) {
            for (let i = 0; i <= fi.files.length - 1; i++) {

                const fsize = fi.files.item(i).size;
                const file = Math.round((fsize / 102400));
                // The size of the file.
                if (file >= 102400) {
                    swal(t('warning'), t('file_size_exceeded'), "warning");
                }
            }
        }
        let currentFile = getabc.selectedFiles[0];
        let sig = md5((getabc.selectedFiles[0].size).toString())
        setabc({
            currentFile: currentFile,
        });

        setLoading(true);
        instructorService.fileUpload(currentFile, sig, UserId, getParentId, durationMin, fileName, checkBox, (event) => {
        }).then(async res => {
            if (res.status === 200) {
                setLoading(false);
                if (res.data === "double-extension-file") {
                    swal(t('error'), t('double-ext-file'), "error");
                }
                else if (res.data === "file-sig-error") {
                    swal(t('error'), "Invalid File Error", "error");
                }
                else if (res.data === "Uploaded Successfully") {
                    await swal(t('uploaded'), res.data, "success");
                } else {
                    await swal(t('msg'), res.data, "info");
                }
                setUploadModalState({ show: false });
                instructorService.contentDetails(getParentId, UserId)
                    .then(res => {
                        setContentDetails(res.data);
                    })
                folderStructureTree();
            }
        })
            .catch(err => {
                setabc({
                    currentFile: undefined,
                });
            });

        setabc({
            selectedFiles: undefined,
        });
    }

    /* File Content Update Code Start */
    const [getFileContentUpdateModalState, setFileContentUpdateModalState] = useState({
        show: false
    });
    const FileContentUpdateModalHide = () => {
        setFileContentUpdateModalState({ show: false })
    }
    const [getFileContentDetails, setFileContentDetails] = useState({
        contentId: '',
        contentName: '',
        contentDuration: ''
    })
    const contentEdit = (contentId, contentName, contentDuration) => {
        setErrorMsg();
        setFileContentDetails({ contentId: contentId, contentName: contentName, contentDuration: contentDuration })
        setFileContentUpdateModalState({ show: true });

    }
    const UpdateFileDatails = (contentId, folder_id) => {
        const duration = document.getElementById("duration");
        const file_name = document.getElementById("file_name");
        if (duration.value === "" || file_name === "") {
            return setErrorMsg(`"* ${t('content_detail')}"`);
        }
        let fileName = file_name.value;
        let durationMin = duration.value;
        let data = { contentId: contentId, contentName: fileName, contentDuration: durationMin };
        instructorService.fileCotentDetailsUpdate(data)
            .then(async res => {
                if (res.status == 200) {
                    await swal(`${t('update')}`, `${t('update_msg')}`, "success");
                    setFileContentUpdateModalState({ show: false });
                    instructorService.contentDetails(folder_id, UserId)
                        .then(res => {
                            setContentDetails(res.data);
                        })
                }
            })
    }
    /* File Content Update Code End */

    /* share url code here start */
    const [getShareUrlData, setShareUrlData] = useState();
    const [ShareUrlModal, setShareUrlModal] = useState({
        show: false
    });
    const shareUrlModalHide = () => {
        setShareUrlModal({ show: false });
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
    /* share url code here start */
    const [getContentName, setContentName] = useState();
    const [getUrl, setUrl] = useState();
    const [getContentType, setContentType] = useState();
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
                ////console.log(res.data);
                setContentName(contentName);
                setUrlModal({ show: true });
            }).catch(err => {
                swal(`${t('error')}`, `${err} ${t('try_sometimes')}`, "error");
            })
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

    const youtubeVideoJs = {
        autoplay: false,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        width: 1100,
        height: 800,
        controls: true,
        sources: [
            {
                src: getYouTubeUrl,

            },
        ]
    };

    const contentDelete = (contentId, folder_id) => {
        swal({
            title: `${t('swal_title')}`,
            text: `${t('u_want_to_delete_content')}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: t('yes_delete'),
            closeOnConfirm: false
        }).then(isConfirmed => {
            if (isConfirmed) {
                instructorService.contentDelete(contentId)
                    .then(async res => {
                        if (res.status == 200) {
                            await swal(`${t('deleted')}`, `${t('your_content_deleted')}`, "success");
                            instructorService.contentDetails(folder_id, UserId)
                                .then(res => {
                                    setContentDetails(res.data);
                                })
                        }
                    })
            }
        });
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


    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const filteredItems = getContentDetails.filter(
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


    /* Course Structure Create Code End */


    const courseStructurContentView = (contentType, fileUrl, label) => {
        if (contentType == "youtube") {
            setYouTubeUrl(fileUrl)
            setContentType(contentType);
            setContentName(label);
            ////console.log(label);
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
                    ////console.log(res.data);
                    setUrlModal({ show: true });
                    //window.open("http://10.244.3.218:8080/" + res.data, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1000,height=1000");
                }).catch(err => {
                    swal("Error!", `${err} Try after sometime.`, "error");
                })
        }
    }


    const dmsUIVisible = (id) => {
        setCourseStructureFolderId(id);
        setToggle(true)
    }

    const [toggle, setToggle] = useState(false)
    let [getCourseStructureFolderId, setCourseStructureFolderId] = useState();

    /* dataTable Check box Code  */

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

    const [selectedRows, setSelectedRows] = React.useState([]);
    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

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

    /* dataTable Check box Code End here  */

    const AddContentToCourseStructure = (arrayData, id) => {
        if (id === undefined) {
            swal(`${t('select')}`, `${t('node_select')}`, "warning")
        } else {
            //console.log(arrayData);
            instructorService.addContentToCourseStructure(arrayData)
                .then(async res => {
                    if (res.data === "Content added successfully!!") {
                        await swal(`${t("success")}`, `${t("content_added")}`, "success");
                        setToggle(false);
                        instructorService.getCourseById(courseId)
                            .then(res => {
                                //console.log("updated code----" + JSON.parse(res.data.courseStructureJson));
                                setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                            })
                        folderStructureTreeCourse();
                    }
                }).catch(err => {
                    //console.log(err);
                })
        }
    }

    const YoutubeAddContentToCourseStructure = (id) => {
        const youtube_link = document.getElementById("youtube_link");
        const duration = document.getElementById("duration");
        const youtubeLinkData = [
            {
                "categoryType": getCourseDetails.categoryName,
                "cname": "YouTube",
                "contentId": 0,
                "contentType": "youtube",
                "courseId": courseId,
                "description": "Basic desc",
                "filepath": youtube_link.value,
                "itemId": getCourseStructureFolderId,
                "pcontentId": 0,
                "publishDate": toDateTime(startDate),
                "topicDuration": duration.value,
                "userId": UserId
            }
        ]
        if (id === undefined) {
            swal(`${t("select")}`, `${t('node_select')}`, "warning")
        } else {
            instructorService.addContentToCourseStructure(youtubeLinkData)
                .then(async res => {
                    if (res.data === "Content added successfully!!") {
                        await swal(`${t('success')}`, `${t("content_added")}`, "success");
                        setModalState({ show: false })
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

    // feedback content link
    const FeedbackAddContentToCourseStructure = (id) => {
        const youtube_link = document.getElementById("youtube_link");
        const duration = document.getElementById("duration");
        const youtubeLinkData = [
            {
                "categoryType": getCourseDetails.categoryName,
                "cname": "Feedback",
                "contentId": 0,
                "contentType": "Feedback",
                "courseId": courseId,
                "description": "Basic desc",
                "filepath": youtube_link.value,
                "itemId": getCourseStructureFolderId,
                "pcontentId": 0,
                "publishDate": toDateTime(startDate),
                "topicDuration": duration.value,
                "userId": UserId
            }
        ]
        if (id === undefined) {
            swal(t('select'), t('select_any_node_course_structure'), "warning")
        } else {
            instructorService.addContentToCourseStructure(youtubeLinkData)
                .then(async res => {
                    if (res.data === "Content added successfully!!") {
                        await swal(`${t('success')}`, `${t("content_added")}`, "success");
                        setModalState({ show: false })
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




    /* Add Module or topic code start here */
    let a = new Date().toISOString().split('.')[0];

    const [getModuleModalState, setModuleModalState] = useState({
        show: false
    });

    const AddModuleModalShow = (id) => {
        setCourseStructureFolderId(id);
        setModuleModalState({ show: true })
    }
    const AddModuleModalHide = () => {
        setModuleModalState({ show: false })
    }



    const AddModule = (id) => {
        setErrorMsg();
        const module_name = document.getElementById("module_name");

        if (startDate === null) {
            return setErrorMsg2(`* ${t("pls_publish_date")}`);
        } if (module_name.value === "") {
            return setErrorMsg(`* ${t("pls_publish_folder")}`);
        }
        if (!module_name.value.match(/^[A-Za-z0-9 ]{5,50}$/)) {
            return setErrorMsg(t('apha_digit_range_2_50'));
        }
        else {
            let data = { "dirParentId": id, "dirName": module_name.value, "publishDate": toDateTime(startDate), "lastModifiedBy": UserId }
            instructorService.addModuleOrTopic(data)
                .then(async res => {
                    if (res.status == 200) {
                        await swal(`${t("success")}`, `${t("fold_add")}`, "success");
                        setModuleModalState({ show: false });
                        setCourseStructureJson(res.data)
                        folderStructureTreeCourse();
                    }
                }).catch(err => {
                    //console.log(err);
                })
        }
    }
    /* Add Module or topic code end here */

    /* Update Module or topic or content details code start here */
    const [getFolderOrContentDetUpdate, setFolderOrContentDetUpdate] = useState({
        show: false
    });
    const [getPdate, setPdate] = useState();
    const updateFolderOrContent = (id, name, pDate) => {
        setErrorMsg("");
        setPdate(pDate);
        setFolderOrContentDetUpdate({
            show: true,
            id: id,
            name: name
        });
    }
    const UpdateContentOrFolderModalHide = () => {
        setFolderOrContentDetUpdate({ show: false })
    }

    const [getAddActivityCompletion, setAddActivityCompletion] = useState({ show: false });
    const addActivityCompletion = () => {

        setAddActivityCompletion({ show: true });
    }
    const addActivityCompletionHide = () => {
        setAddActivityCompletion({ show: false })
    }

    const [getAddAccessRestriction, setAddAccessRestriction] = useState({ show: false });
    const addAccessRestriction = () => {

        setAddAccessRestriction({ show: true });
    }
    const addAccessRestrictionHide = () => {
        setAddAccessRestriction({ show: false });
    }

    const updateContentOrModule = (id) => {
        const module_name = document.getElementById("module_name");
        const publishDate = getPdate;
        if (module_name.value === "") {
            return setErrorMsg(t('pls_publish_folder'));
        } if (publishDate === "") {
            return setErrorMsg(t('pls_publish_date'));
        }
        if (!module_name.value.match(/^[A-Za-z0-9 ]{5,50}$/)) {
            return setErrorMsg(t('apha_digit_range_2_50'));
        } else {
            if (Number.isInteger(parseInt(id))) {
                let data = {

                    "contentId": id,
                    "courseId": courseId,
                    "cname": module_name.value,
                    "description": "For frontend development",
                    "publishDate": toDateTime(publishDate),
                    "userId": UserId
                }
                instructorService.updateContentDetails(data)
                    .then(async res => {
                        if (res.status == 200) {
                            await swal(t('success_swal'), t('content_updated'), "success");
                            setFolderOrContentDetUpdate({ show: false })
                            setCourseStructureJson(res.data)
                            folderStructureTreeCourse();
                        }
                    })
            } else {
                let data = {
                    "dirParentId": id,
                    "dirName": module_name.value,
                    "lastModifiedBy": UserId,
                    "publishDate": toDateTime(publishDate)
                }
                instructorService.updateFolderDetails(data)
                    .then(async res => {
                        if (res.status == 200) {
                            await swal(t('success_swal'), t('folder_updated'), "success");
                            setFolderOrContentDetUpdate({ show: false })
                            setCourseStructureJson(res.data)
                            folderStructureTreeCourse();
                        }
                    })
            }
        }

    }

    /* Update Module or topic or content details code end here */

    /* delete course content or remove structure */

    const RemoveContentOrStructure = (contentId) => {
        if (Number.isInteger(parseInt(contentId))) {
            swal({
                title: `${t('r_u_sure')}`,
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
                                await swal(`${t('delete')}`, `${t('content_deleted')}`, "success");
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
                title: `${t('r_u_sure')}`,
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
                                await swal(`${t('delete')}`, `${t('course_structure_folder_deleted')}`, "success");
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


    /* Course Publish Function */
    const publishCourseButton = (cId) => {
        instructorService.coursePublishAdminRequest(cId)
            .then(async res => {
                if (res.data === "Course Published Successfully!!") {
                    await swal(`${t('success')}`, `${t('request_send')}`, "success");
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

    /* course unpublish funcation */
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

    const [headerState, setHeaderState] = useState({
        id: UserService.getUserid(),
        img: um_api + "getprofilepic/"
    });

    /* this code is for  announcement creation and view */


    const deleteAnnouncement = (id) => {
        swal({
            title: `${t('swal_title')}`,
            text: `${t('swal_text')}`,
            icon: "warning",
            buttons: [
                t('no_cancel'),
                t('yes_delete')
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                service.deleteAnnouncement(id)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('delete')}`, `${t('course_announcment_msg')}`, "success");
                            fatchAnnouncementData();
                            reset();
                            setAddAnnouncementDiv(false);
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        });
    }

    const dateConvertToTformate = (value) => {
        var date = new Date(value);
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
        str += 'T' + hour + ':' + min + ':' + sec;
        return str;
    }

    const editAnnouncement = (id, title, titledesc, publishFrom, publishUpto) => {
        setAddAnnouncementDiv(true)
        let data = {
            id: id,
            title: title,
            titledesc: titledesc,
            publishfrom: dateConvertToTformate(publishFrom),
            publishupto: dateConvertToTformate(publishUpto),
        }
        setAnnouncementData(data)
    }

    const columnsAnnouncement = [
        {
            name: "Title",
            selector: row => row.title,
            sortable: true,
            wrap: true
        },
        {
            name: "Title Description",
            selector: row => row.body,
            sortable: true,
            wrap: true
        },
        {
            name: "Publish From",
            selector: row => convertDate(row.publihFrom),
            sortable: true,
            wrap: true
        },
        {
            name: "Publish Upto",
            selector: row => convertDate(row.publishUpto),
            sortable: true,
            wrap: true
        },
        {
            name: "Action",
            sortable: true,
            wrap: true,
            cell: (row) => <div>
                <button className='btn btn-primary m-3' onClick={() => editAnnouncement(row.id, row.title, row.body, row.publihFrom, row.publishUpto)}><i class="fas fa-edit"></i> </button>
                <button className='btn btn-danger' onClick={() => deleteAnnouncement(row.id)}><i class="fas fa-trash"></i> </button>
            </div>
        }

    ]

    const filteredItemsAnnouncement = announcementDetails.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const initialState = {
        title: '',
        titleError: '',
        titledesc: '',
        titledescError: '',
        publishfrom: '',
        publishfromError: '',
        publishupto: '',
        publishuptoError: '',
    }
    const [announcementData, setAnnouncementData] = useState(initialState)
    const [announcementDiv, setAddAnnouncementDiv] = useState(false);
    const formValidate = () => {
        let titleError = '';
        let titledescError = '';
        let publishfromError = '';
        let publishuptoError = '';

        if (!announcementData.title) {
            titleError = t('title_is_required_field');
            // } else if (announcementData.title.match(/^(?=.*[a-zA-Z ])(?=.*[0-9 ])[A-Za-z0-9 ]+$/)) {
            //     titleError = '';
            // } else if (announcementData.title.match(/\w+/g).length > 20) {
            //     titleError = t('title_greater_then_twenty');
            // } else {
        } else if (announcementData.title.match(/^[A-Za-z0-9 ]{5,50}$/)) {
            titleError = '';
        } else if (announcementData.title.length > 50) {
            titleError = t('title_max_50');
        } else {
            titleError = t('alpha_digit_space_allowed');
        }

        if (!announcementData.titledesc) {
            titledescError = t('title_description_required_field');
            // } else if (announcementData.titledesc.match(/^(?=.*[a-zA-Z.& ])(?=.*[0-9 ])[A-Za-z0-9.& ]+$/)) {
            //     titledescError = '';
            // } else if (announcementData.titledesc.match(/\w+/g).length > 50) {
            //     titledescError = t('title_description_word_greater_than_fifty');
            // } else {
        } else if (announcementData.titledesc.match(/^[A-Za-z0-9&., ]{5,500}$/)) {
            titledescError = '';
        } else if (announcementData.titledesc.length > 500) {
            titledescError = t('max_500_character');
        } else {
            titledescError = t('alpha_digit_special_char');
        }

        if (!announcementData.publishfrom) {
            publishfromError = t('this_is_required_field');
        }
        if (!announcementData.publishupto) {
            publishuptoError = t('this_is_required_field');
        }
        if (titleError || titledescError || publishfromError || publishuptoError) {
            setAnnouncementData({ ...announcementData, titleError, titledescError, publishfromError, publishuptoError });
            return false;
        }
        return true;
    }

    const reset = () => {
        setAnnouncementData({
            title: "",
            titledesc: "",
            publishfrom: "",
            publishupto: ''
        })
    }


    function handleSubmit(e) {
        e.preventDefault();
        const isValidate = formValidate();
        if (announcementData.id) {
            if (isValidate) {
                let data = {
                    "title": announcementData.title, "body": announcementData.titledesc, "publihFrom": announcementData.publishfrom,
                    "publishUpto": announcementData.publishupto, "courseId": courseId, "createdAt": new Date().toISOString(), "createdBy": UserId,
                    "readStatus": "string", "type": 2, "id": announcementData.id
                };
                ////console.log(data);
                service.updateAnnouncement(announcementData.id, data)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('updated')}`, `${t('announcement_update_msg')}`, "success");
                            fatchAnnouncementData();
                            setAddAnnouncementDiv(false);
                        } else {
                            //console.log("something is wrong")
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        } else {
            if (isValidate) {
                let data = {
                    "title": announcementData.title, "body": announcementData.titledesc, "publihFrom": announcementData.publishfrom,
                    "publishUpto": announcementData.publishupto, "courseId": courseId, "createdAt": new Date().toISOString(), "createdBy": UserId,
                    "readStatus": "string", "type": 2
                };
                // //console.log(data)
                service.createAnnouncement(data)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('created')}`, `${t('announcement_create_msg')}`, "success");
                            fatchAnnouncementData();
                            setAddAnnouncementDiv(false);
                        } else {
                            //console.log("something is wrong")
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        }
    }

    /* this code end announcement creation and view */

    /* this code is for  feedback handle submit */

    const feedbackInitialState = {
        feedback_title: '',
        feedbacktitleError: '',
        feedbacktitledesc: '',
        feedbacktitledescError: '',
    }
    const [feedbackData, setfeedbackData] = useState(feedbackInitialState)

    const feedbackformVlaidate = () => {

        let feedbacktitleError = '';
        let feedbacktitledescError = '';

        if (!feedbackData.feedback_title) {
            feedbacktitleError = t('title_is_required_field');
        } else if (feedbackData.feedback_title.length > 50) {
            feedbacktitleError = t('length_exceed');
        }
        else if (feedbackData.feedback_title.length < 3) {
            feedbacktitleError = t('length_greater_than_3');
        }
        else if (feedbackData.feedback_title.match(/[A-Za-z0-9&., ]+$/)) {
            feedbacktitleError = "";
        }
        else {
            feedbacktitleError = t('do_not_use_special_charater');
        }

        if (!feedbackData.feedbacktitledesc) {
            feedbacktitledescError = t('title_description_required_field');
        } else if (feedbackData.feedbacktitledesc.length > 500) {
            feedbacktitledescError = t('length_exceed');
        }
        else if (feedbackData.feedbacktitledesc.length < 3) {
            feedbacktitledescError = t('length_greater_than_3');
        }
        else if (feedbackData.feedbacktitledesc.match(/[A-Za-z0-9&., ]+$/)) {
            feedbacktitledescError = "";
        }
        else {
            feedbacktitledescError = t('do_not_use_special_charater');
        }

        if (feedbacktitleError || feedbacktitledescError) {
            setfeedbackData({ ...feedbackData, feedbacktitleError, feedbacktitledescError, });
            return false;
        }
        return true;
    }

    const feedbackReset = () => {
        setfeedbackData({
            feedback_title: "",
            feedbacktitledesc: "",
        })
    }

    const feedbackhandleSubmit = (e) => {
        e.preventDefault();
        const isValidate1 = feedbackformVlaidate();
        if (isValidate1) {
            let data = {
                "description": feedbackData.feedbacktitledesc,
                "feedbackId": 0,
                "feedbackTitle": feedbackData.feedback_title,
                "id": courseId,
                "typeMasterId": 1,
                "updatedBy": UserId
            }
            ////console.log(data);
            service.feedbackMasterPost(data)
                .then(async res => {
                    if (res.status === 201) {
                        await swal(`${t('success')}`, `${t('feedback_add_msg')}`, "success");
                        feedbackReset();
                        setShowAddFeedback(false);
                        getFeedbackList();
                        let data = {
                            "feedbackId": res.data.feedbackId,
                            "questionId": questionIds
                        }
                        service.addQuestionsMapWithIds(data)
                            .then(async res => {
                                if (res.status === 201) {
                                    await swal(`${t('success')}`, `${t('feedback_que_add_msg')}`, "success");
                                    getAllFeedbackQuestionList();
                                }
                            })
                    } else {
                        //console.log("something is wrong")
                    }
                }).catch(err => {
                    //console.log(err);
                })
        }
    }

    /* this code is for  feedback handle submit */

    /* this code is for  feedback question handle submit */

    const [serviceList, setServiceList] = useState([{ service: "" }]);

    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };

    const feedbackQuestionReset = () => {
        setquestionData({
            question: '',
            mandatory: '',
            questionType: '',
        })
    }

    const questionInitialState = {
        question: '',
        mandatory: '',
        questionType: '',

        questionError: '',
        mandatoryError: '',
        questionTypeError: '',
        questionOptionError: '',

    }
    const [questionData, setquestionData] = useState(questionInitialState)

    const questionformVlaidate = () => {
        let questionError = '';
        let mandatoryError = '';
        let questionTypeError = '';
        let questionOptionError = '';

        if (!questionData.question) {
            questionError = t('question_is_required_field');
            //console.log("testing flow");
        } else if (questionData.question.length > 50) {
            questionError = t('text_max_50_error');
            //console.log("testing flow");
        }
        else if (questionData.question.length < 3) {
            questionError = t('text_min_3_char');
            //console.log("testing flow");
        }
        else if (questionData.question.match(/[A-Za-z0-9&.,? ]+$/)) {
            questionError = "";
            //console.log("testing flow");
        }
        else {
            questionError = t('special_symbol_not_allowed');
            //console.log("testing flow");
        }
        if (!questionData.mandatory) {
            mandatoryError = t('question_mandatory_is_required_field');
        }
        if (!questionData.questionType) {
            questionTypeError = t('quest_Type_required');
        }
        // if (serviceList.length == 0) {
        //     questionOptionError = "Option is required field"
        // }

        if (!questionData.questionType || questionData.questionType == "Select Option") {
            questionTypeError = t('quest_Type_required');
        }
        if (questionData.questionType === "MC" || questionData.questionType === "SC") {
            if (serviceList.length >= 1 && serviceList.length <= 4) {
                if (serviceList.length == 1) {
                    if (serviceList[0].service === '') {
                        questionOptionError = t('option_required_field')
                    }
                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&')) {
                            questionOptionError = t('must_have_atleast_one_alphabet_not_include_special_charater')
                        }
                    }
                }
                if (serviceList.length === 2) {
                    if (serviceList[0].service == '' || serviceList[1].service == '') {
                        questionOptionError = t('option_required_field')
                    }
                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&')) {
                            questionOptionError = t('must_have_atleast_one_alphabet_not_include_special_charater')
                        }
                    }

                }
                if (serviceList.length == 3) {
                    if (serviceList[0].service == '' || serviceList[1].service == '' || serviceList[2].service == '') {
                        questionOptionError = t('option_required_field')
                    }

                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&') || !serviceList[2].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[2].service.includes('>') || serviceList[2].service.includes('<') || serviceList[2].service.includes('%') || serviceList[2].service.includes('&')) {
                            questionOptionError = t('must_have_atleast_one_alphabet_not_include_special_charater')
                        }
                    }

                }
                if (serviceList.length == 4) {
                    if (serviceList[0].service == '' || serviceList[1].service == '' || serviceList[2].service == '' || serviceList[3].service == '') {
                        questionOptionError = t('option_required_field')
                    }

                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&') || !serviceList[2].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[2].service.includes('>') || serviceList[2].service.includes('<') || serviceList[2].service.includes('%') || serviceList[2].service.includes('&') || !serviceList[3].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[3].service.includes('>') || serviceList[3].service.includes('<') || serviceList[3].service.includes('%') || serviceList[3].service.includes('&')) {
                            questionOptionError = t('must_have_atleast_one_alphabet_not_include_special_charater')
                        }
                    }

                }
            }
        }

        if (questionError || mandatoryError || questionTypeError || questionOptionError) {
            setquestionData({ ...questionData, questionError, mandatoryError, questionTypeError, questionOptionError });
            return false;
        }
        return true;
    }

    const questionhandleSubmit = (e) => {
        e.preventDefault();
        const qValidate = questionformVlaidate();
        if (questionData.questionId) {
            let data = {
                "courseId": 0,
                "mandatory": questionData.mandatory,
                "options": (questionData.questionType == "SC" || questionData.questionType == "MC") ? serviceList.map((d) => d.service) : ["NA"],
                "question": questionData.question,
                "questionId": 0,
                "questionType": questionData.questionType,
                "tenantId": 0,
                "updatedBy": UserId,
                "typeId": 1,
                "questionId": questionData.questionId
            }

            if (qValidate) {
                service.feedbackQuestionUpdateForCourse(data)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('success')}`, `${t('question_update')}`, "success");
                            setShowCreateQuestion(false);
                            getAllFeedbackQuestionList();
                            feedbackQuestionReset();
                            setServiceList([{ service: "" }]);
                        } else {
                            swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
                            //console.log("something is wrong")

                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        }
        else {
            let data = {
                "courseId": 0,
                "mandatory": questionData.mandatory,
                "options": (questionData.questionType == "SC" || questionData.questionType == "MC") ? serviceList.map((d) => d.service) : ["NA"],
                "question": questionData.question,
                "questionId": 0,
                "questionType": questionData.questionType,
                "tenantId": 0,
                "updatedBy": UserId,
                "typeId": 1,
            }

            if (qValidate) {
                service.feedbackQuestionCreationForCourse(data)
                    .then(async res => {
                        if (res.status === 201) {
                            await swal(`${t('success')}`, `${t('question_created_successfully')}`, "success");
                            setShowCreateQuestion(false);
                            getAllFeedbackQuestionList();
                            feedbackQuestionReset();
                            setServiceList([{ service: "" }]);
                        } else {
                            swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
                            //console.log("something is wrong")
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        }
    }

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            getAllFeedbackQuestionList();
            courseFeedbackResponses();
        }

    }, [courseId])
    const [getFeedbackQuestion, setfeedbackQuestion] = useState([])
    const [getFeedbackResponse, setfeedbackResponse] = useState([])
    const getAllFeedbackQuestionList = async () => {
        let result = await service.getAllQuestionByTypeAndUpdatedBy(1, UserId);
        setfeedbackQuestion(result.data);
    }

    const courseFeedbackResponses = async () => {
        let result = await service.courseFeedbackResponse(1, courseId);
        setfeedbackResponse(result.data);
    }

    const updateQuestion = (questionId, question, questionType, mandatory, optionsMasters) => {
        setShowCreateQuestion(true);
        let array = []
        let data = {
            questionId: questionId,
            question: question,
            mandatory: mandatory,
            questionType: questionType,

            questionError: '',
            mandatoryError: '',
            questionTypeError: '',
            questionOptionError: '',
        }
        // if (mandatory === "true") {
        //     //console.log("mandatory true")
        //     document.getElementById('flexRadioDefault1').checked = true;
        //     document.getElementById('flexRadioDefault2').checked = false;
        // }
        // if (mandatory === "false") {
        //     //console.log("mandatory false")
        //     document.getElementById('flexRadioDefault2').checked = true;
        //     document.getElementById('flexRadioDefault1').checked = false;
        // }

        if (questionType === "TF") {
            // document.getElementById('option').value = "TF";
            setquestionData(data);
            setServiceList([{ service: "" }]);
        }
        if (questionType === "TA") {
            // document.getElementById('option').value = "TA";
            setquestionData(data);
            setServiceList([{ service: "" }]);

        }
        if (questionType === "SC") {
            // document.getElementById('option').value = "SC";
            setquestionData(data);
            optionsMasters.map((d) =>
                array.push({ service: d.optionText })
            )
            setServiceList(array);
        }
        if (questionType === "MC") {
            // document.getElementById('option').value = "MC";
            setquestionData(data);
            optionsMasters.map((d) =>
                array.push({ service: d.optionText })
            )
            setServiceList(array);
        }


        // setquestionData(data);
        // optionsMasters.map((d) =>
        //     array.push({ service: d.optionText })
        // )
        // setServiceList(array);
    }

    const deleteQuestion = (id) => {
        swal({
            title: `${t('swal_title')}`,
            text: `${t('swal_text')}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: t('yes_delete'),
            closeOnConfirm: false
        }).then(isConfirmed => {
            if (isConfirmed) {
                service.deleteFeedbackQuestion(id)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('delete')}`, `${t('your_question_delete')}`, "success");
                            getAllFeedbackQuestionList();
                            feedbackQuestionReset();
                        }
                    }).catch((err) => {
                        //console.log(err);
                        swal(`${t('error')}`, `${t('something_went_wrong_try_later')}`, "error");
                    })
            }
        });
    }

    const [showCreateQuestion, setShowCreateQuestion] = useState(false);

    const onClickCreateQuestion = () => {
        setServiceList([{ service: "" }]);
        feedbackQuestionReset();
        setShowCreateQuestion(true);
    }
    const onClickCloseButton = () => {
        setServiceList([{ service: "" }]);
        feedbackQuestionReset();
        setShowCreateQuestion(false);
    }


    const coloumnfeedbackQuestion = [
        {
            name: "Question",
            selector: row => row.question,
            sortable: true,
            wrap: true,
            width: '200px'
        },
        {
            name: "Question Type",
            selector: row => row.questionType == "SC" ? "Single Choice" : row.questionType == "MC" ? "Multiple Choice" : row.questionType == "TF" ? "True or False" :
                row.questionType == "TA" ? "Descriptive" : '',
            sortable: true,
            wrap: true,
            width: '200px'
        },
        {
            name: "Question Mandatory",
            selector: row => row.mandatory,
            sortable: true,
            wrap: true,
            width: '270px'
        },
        {
            name: "Options",
            selector: row => row.questionType == "SC" || row.questionType == "MC" ? row.optionsMasters.map((d, i) => <ol>
                <li>{i + 1}.{d.optionText}</li>
            </ol>) : '',
            sortable: true,
            wrap: true,
            width: '200px'
        },
        {
            name: "Action",
            sortable: true,
            width: '200px',
            wrap: true,
            cell: (row) => <div>
                {UserId === row.updatedBy ?
                    <>
                        {/* {//console.log(row.updatedBy)} */}
                        <button className='btn btn-danger m-3' onClick={() => deleteQuestion(row.questionId)}><i class="fas fa-trash"></i> </button>
                        <button className='btn btn-primary' onClick={() => updateQuestion(row.questionId, row.question, row.questionType, row.mandatory, row.optionsMasters)}><i class="fas fa-edit"></i> </button></>
                    : ''}
                {/* {UserId === row.updatedBy ?
                    <>
                        <button className='btn btn-primary' onClick={() => updateQuestion(row.questionId, row.question, row.questionType, row.mandatory, row.optionsMasters)}><i class="fas fa-edit"></i></button>
                    </>
                    :
                    <>
                    </>

                } */}
            </div>

        }

    ]


    const coloumnfeedbackQuestion1 = [
        {
            name: "Question",
            selector: row => row.question,
            sortable: true,
            wrap: true,
            width: '200px'
        },
        {
            name: "Question Type",
            selector: row => row.questionType == "SC" ? "Single Choice" : row.questionType == "MC" ? "Multiple Choice" : row.questionType == "TF" ? "True or False" :
                row.questionType == "TA" ? "Descriptive" : '',
            sortable: true,
            wrap: true,
            width: '200px'
        },
        {
            name: `Question Mandatory`,
            selector: row => row.mandatory,
            sortable: true,
            wrap: true,
            width: '270px'
        },
        {
            name: "Options",
            selector: row => row.questionType == "SC" || row.questionType == "MC" ? row.optionsMasters.map((d, i) => <ol>
                <li>{i + 1}.{d.optionText}</li>
            </ol>) : '',
            sortable: true,
            wrap: true,
            width: '200px'
        }

    ]

    const filteredItemsFeedbackQuestion = getFeedbackQuestion.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );
    const [questionselectedRows, setQuestionSelectedRows] = React.useState([]);
    const questionRowSelected = React.useCallback(state => {
        setQuestionSelectedRows(state.selectedRows);
    }, []);

    let questionIds = questionselectedRows.map((d) => d.questionId);

    // const AddQuestionInCourse = () => {
    //     let data = {
    //         "feedbackId": feedbackId,
    //         "questionId": questionIds
    //     }
    //     service.addQuestionsMapWithIds(data)
    //         .then(async res => {
    //             if (res.status === 201) {
    //                 await swal("Success!", "Your Feedback Question Successfully Add in Course.", "success");
    //                 getAllFeedbackQuestionList();
    //             }
    //         })
    // }

    const feedbackResponseCheckHandler = (data) => {
        let array = data;
        let result = array.split(",").map((e) => parseInt(e));
        return result;
    }

    /* this code is for  feedback question handle submit */

    useEffect(() => { }, [filteredItemsFeedbackQuestion]);

    ////console.log(getUserDetails.facebookId);

    const scrollToView = () => {
        const ref = document.getElementById('Tab');
        ref.scrollIntoView({
            behavior: 'smooth',
            inline: 'start'
        })
    }

    // Activity Completion


    const [getNewCriteriaModal, setNewCriteriaModal] = useState({
        show: false
    });

    function AddNewCriteriaModalShow() {
        setNewCriteriaModal({ show: true });
    }

    function AddNewCriteriaModalHide() {
        setNewCriteriaModal({ show: false });
    }

    const [assementLoader, setAssementLoader] = useState({
        isLoading: false
    })

    const assementLoaderFunction = () => {
        setAssementLoader({ isLoading: true });
    }


    ///////////////////////  FEEDBACK LIST START  ///////////////////////////////////////

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            getFeedbackList();
        }

    }, [courseId])

    const [feedbackListData, setFeedbackListData] = useState();
    const getFeedbackList = () => {
        service.getFeedbackListByCourseId(courseId).then((resp) => {
            setFeedbackListData(resp.data);
        }).catch(err => {
            //console.log(err)
        })
    }

    const [showAddFeedback, setShowAddFeedback] = useState(false)

    const closeCreateFeedback = () => {

        setfeedbackData({
            ...feedbackData,
            feedback_title: "",
            feedbacktitledesc: "",
            feedbacktitledescError: "",
            feedbacktitleError: "",
        })

        setShowAddFeedback(false)
    }

    const setActiveInactive = (id) => {
        service.setActiveInactive(id).then((resp) => {
            if (resp.data === "active") {
                swal(t('success'), "", "success");
                getFeedbackList();
            }
            else if (resp.data === "inactive") {
                swal(t('success'), "", "success");
                getFeedbackList();
            }
        })
    }


    const FeedbackList = [
        {
            name: "S No.",
            selector: (row, index) => index + 1,
        },
        {
            name: "Title",
            selector: (row) => row.feedbackTitle,
        },
        {
            name: "Description",
            selector: (row) => row.description,
        },
        {
            name: "Status",
            selector: (row) => row.status,

        },
        {
            name: "Action",
            selector: row =>
                <>
                    {
                        row.status === 'active' ?
                            <>
                                <Button onClick={() => { setActiveInactive(row.feedbackId) }} className="btn btn-danger pull-left m-2 w-10">{t('deactivate_feedback')}</Button>
                            </>
                            :
                            <>
                                <Button onClick={() => { setActiveInactive(row.feedbackId) }} className="btn btn-success pull-left m-2 w-10">{t('activate_feedback')}</Button>
                            </>
                    }
                </>

        },
    ];






    ///////////////////////  FEEDBACK LIST End  ///////////////////////////////////////


    /*************** FEEDBACK CHART ***********************/

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            getResponseCount();
        }
    }, [courseId]);
    const [listFeedbackData, setListFeedbackData] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    // const [option, setOption] = useState([]);
    const getResponseCount = () => {
        service.getResponseCount(1, courseId).then((resp) => {
            ////console.log(resp.data);
            //console.log(resp.data)
            setFeedbackList(resp.data);
            // setListFeedbackData(resp.data.responseCount);
        }).catch((err) => {
            //console.log(err);
        })
    }

    const onClickAccodian = (index) => {
        setListFeedbackData([]);
        setListFeedbackData(feedbackList[index].responseCount);
    }

    const listFeedbackColumn = [
        {
            name: "S No.",
            selector: (row, index) =>
                <>
                    {
                        row.questionType !== "TA"
                            ?
                            index + 1
                            :
                            <></>
                    }
                </>
            ,
        },
        {
            name: "Question",
            selector: (row) =>
                <>
                    {
                        row.questionType !== "TA"
                            ?
                            row.question
                            :
                            <>
                            </>

                    }
                </>
        },
        {
            name: "Total Response",
            selector: row =>
                <>
                    {
                        row.questionType !== "TA"
                            ?
                            <>
                                {
                                    row.questionType === "TF" ?
                                        <>
                                            {
                                                (row.optionCount !== undefined) ? (
                                                    row.optionCount[0].countTrue + row.optionCount[0].countFalse
                                                ) : null
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                (row.optionCount !== undefined) ? (
                                                    row.optionCount.map(e => e.count).reduce((a, b) => a + b, 0)
                                                ) : null
                                            }
                                        </>
                                }
                            </>
                            :
                            <>
                            </>
                    }
                </>
        },
        {
            name: "Options",
            selector: row =>
                <>
                    {
                        row.questionType !== "TA"
                            ?
                            <>
                                {
                                    (row.optionCount !== undefined)
                                        ?
                                        (
                                            row.questionType === "TF"
                                                ?
                                                row.optionCount.map(e => {
                                                    return (
                                                        <>
                                                            <p>True  : {e.countTrue}</p>
                                                            <p>False : {e.countFalse}</p>
                                                        </>
                                                    )
                                                })
                                                :
                                                <>
                                                    {
                                                        row.optionCount.map(e => {
                                                            return (
                                                                <>
                                                                    <p>{e.option_text} : {e.count}</p>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </>
                                        ) :
                                        null
                                }
                            </>
                            :
                            <>
                            </>
                    }

                </>,
        },
        {
            name: "Visually",
            cell: (row) => <>
                <div>
                    {
                        row.questionType !== "TA"
                            ?
                            <>
                                {
                                    row.questionType === "TF"
                                        ?
                                        <>
                                            <Button onClick={() => { onClickMoreDetails(row.question_id, row.questionType) }} >{t('more_details')}</Button>
                                        </>
                                        :
                                        row.questionType === "MC" ?
                                            <>
                                                <Button onClick={() => { onClickMoreDetails(row.question_id, row.questionType) }} >{t('more_details')}</Button>
                                            </>
                                            :
                                            <>
                                                <Button onClick={() => { onClickMoreDetails(row.question_id, row.questionType) }} >{t('more_details')}</Button>
                                            </>

                                }
                            </>
                            :
                            <>
                            </>
                    }
                </div>
            </>,
        },
    ];



    const [modelShow, setModelShow] = useState(false);
    const [graphLabel, setGraphLebel] = useState([])
    const [graphCount, setGraphCount] = useState([]);
    const [checkPieChart, setCheckPieChart] = useState(false);
    const [total, setTotal] = useState();

    //const [graph,setGraph] =useState([]);

    // let graphBackgroundColor = [];
    // let graphboderColor = [];





    const onClickMoreDetails = (questionid) => {
        const graphCounts = [];
        const graphLables = [];
        var total = 0;

        listFeedbackData.every((singleQuestion) => {
            if (singleQuestion.question_id === questionid && singleQuestion.questionType === "TF") {
                setCheckPieChart(true);

                graphLables.push("True");
                //console.log("singleQuestion.optionCount.countTrue     -- ", singleQuestion.optionCount[0].countTrue)
                const totaltrue = singleQuestion.optionCount[0].countTrue
                graphCounts.push(totaltrue);
                graphLables.push("False");
                const totalfalse = singleQuestion.optionCount[0].countFalse
                graphCounts.push(totalfalse);
                total = totaltrue + totalfalse;

                // singleQuestion.optionCount.forEach(x => {
                //     graphLables.push(x.option_text)

                //     graphCounts.push(x.count);
                //     total = total + x.count;
                // })
                setGraphLebel(graphLables)
                setGraphCount(graphCounts)
                setTotal(total);
                //console.log(total);
                return false
            }
            if (singleQuestion.question_id === questionid && singleQuestion.questionType === "SC") {
                setCheckPieChart(false);
                singleQuestion.optionCount.forEach(x => {
                    graphLables.push(x.option_text)
                    graphCounts.push(x.count);
                    total = total + x.count;
                })
                setGraphLebel(graphLables)
                setGraphCount(graphCounts)
                setTotal(total);
                //console.log(total);
                return false
            }
            if (singleQuestion.question_id === questionid && singleQuestion.questionType === "MC") {
                setCheckPieChart(false);
                singleQuestion.optionCount.forEach(x => {
                    graphLables.push(x.option_text)
                    graphCounts.push(x.count);
                    total = total + x.count;
                })
                setGraphLebel(graphLables)
                setGraphCount(graphCounts)
                setTotal(total);
                //console.log(total);
                return false
            }
            return true
        })
        setModelShow(true);
    }


    const dataBar = {
        labels: graphLabel,
        datasets: [
            {
                label: "Feedback Analysis",
                // data: [12, 19, 3, 5, 2, 3],
                data: graphCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const optionBar = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    // var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                    // var total = meta.total;

                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
                    return currentValue + ' (' + percentage + '%)';
                },
                title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        },
        // plugins: {
        //   datalabels: {
        //     formatter: (value, ctx) => {
        //       let sum = 0;
        //       let dataArr = ctx.chart.dataBar.datasets[0].data;
        //       dataArr.map(data => {
        //         sum += data;
        //       });
        //       let percentage = (value * 100 / sum).toFixed(2) + "%";
        //       return percentage;
        //     },
        //     color: '#fff',
        //   }
        // },
        // formatter: function(value, context) {
        //   return context.dataIndex + ': ' + Math.round(value*100) + '%';
        // },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    const dataPie = {
        labels: graphLabel,
        datasets: [
            {
                label: "Feedback Analysis",
                // data: [12, 19, 3, 5, 2, 3],
                data: graphCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                //hoverOffset: 4,       
            },
        ],
    };

    const optionPie = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    // var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                    // var total = meta.total;

                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
                    return currentValue + ' (' + percentage + '%)';
                },
                title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        },
    }
    /*************** END FEEDBACK CHART ***********************/

    const [activeKey, setActiveKey] = useState(null)

    const handleAccordianSelect = (eventKey) => {
        setActiveKey(eventKey === activeKey ? null : eventKey)
    }




    return (
        <div className="main-wrapper course-details-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            <HeaderTwo />
            {/* Breadcroumb */}
            < BreadcrumbBox title={getCourseDetails.courseName} bannerUrl={`http://10.244.3.218:8082/${getCourseDetails.banner}`} />

            <Styles>
                {/* Course Details */}
                <section className="course-details-area" id='Main'>
                    <Container>
                        <div className="course-details-top">

                            {/* <Col lg="8" md="7" sm="12"> */}

                            <div className='child1'>
                                <div className="heading">
                                    <h4 style={{ textTransform: 'capitalize' }}>{getCourseDetails.courseName}</h4>
                                </div>
                                <div className="course-top-overview" >
                                    <div className="d-flex overviews">
                                        {/* <div className="author">
                                            <img src={`${headerState.img}${headerState.id}`} alt="" />
                                            <div className="author-name">
                                                <h6>{t('author')}</h6>
                                                <p>{UserService.getUsername()}</p>
                                            </div>
                                        </div> */}
                                        <div className="category">
                                            <h6>{t('category')}</h6>
                                            <p>{getCourseDetails.categoryName}</p>
                                        </div>
                                        <div className="rating">
                                            <h6>Rating</h6>
                                            <ul className="list-unstyled list-inline">
                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                <li className="list-inline-item"><i className="las la-star-half-alt"></i>
                                                </li>
                                                <li className="list-inline-item">(4.5)</li>
                                            </ul>
                                        </div>
                                        <div className="price">
                                            <h6>{t('price')}</h6>
                                            <p>{fee_validator(getCourseDetails.courseFee)}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="course-details-banner">
                                    <img src={process.env.PUBLIC_URL + `http://10.244.3.218:8082/${getCourseDetails.imageUrl}`} alt="Course Image" style={{ height: '470px', width: '740px' }} className="img-fluid" />
                                </div> */}
                                <div className="course-details-banner" style={{ height: '470px', width: '740px' }}>
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
                            </div>
                            {/* <Col lg="4" md="5" sm="12"></Col> */}
                            <div className='child2' >
                                <div className="single-details-sidbar">
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
                                                    <li><i className="far fa-calendar-check"></i> {t('commence_date')} <span>{convertDate(getCourseDetails.commenceDate)}</span></li>
                                                    <li><i className="far fa-calendar-check"></i> {t('closing_date')} <span>{convertDate(getCourseDetails.closingDate)}</span></li>
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
                                                                    {userCount == 0 ?
                                                                        <li><button type="button" onClick={() => unPublishCourseButton(courseId)} className="enroll-btn">{t('unpublish_course')}</button></li>
                                                                        : null
                                                                    }
                                                                    <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">{t('Disable Course')}</button></li>
                                                                    <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">{t('request_to_publish_course')}</button></li>
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
                                                                                {userCount == 0 ? <li><button type="button" onClick={() => unPublishCourseButton(courseId)} className="enroll-btn">{t('unpublish_course')}</button></li> : null}
                                                                                <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">{t('Disable Course')}</button></li>
                                                                                <li><button type="button" onClick={() => publishCourseButton(courseId)} disabled className="enroll-btn" style={{ background: '#182B49' }}>{t('waiting_for_approval')}</button></li>
                                                                            </>
                                                                            : null
                                                    }



                                                </ul>
                                                <ul className="list-unstyled feature-list">
                                                    {getCourseStructureJson.lastPublishedDate == undefined ? null :
                                                        <li>{t('last_published_date')}: <span>{moment(getCourseStructureJson.lastPublishedDate).format('DD-MM-yyyy HH:mm')}</span></li>
                                                    }
                                                </ul>
                                            </div>
                                        </Col>
                                        {/* <Col md="12">
                                            <PopularCourse />
                                        </Col>
                                        <Col md="12">
                                            <CourseTag />
                                        </Col> */}
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
                <section className="course-details-area" id='Tab' >
                    <Container>
                        <div className="course-tab-list" >
                            <Tab.Container defaultActiveKey="overview">
                                <Nav className="flex-column" onClick={scrollToView}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="overview">{t('overview')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="curriculum">{t('curriculum')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="instructor">{t('instructors')}</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="announcement">{t('announcement')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="review">{t('reviews')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="discussion">{t('discussion')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="feedback">{t('course_feedback')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="query">{t('query')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="assignment">{t('assignment')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="assessment">{t('assessment')}</Nav.Link>
                                    </Nav.Item>
                                    {/* <Nav.Item>
                                        <Nav.Link eventKey="criteria">Course Completion Criteria</Nav.Link>
                                    </Nav.Item> */}
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="overview" className="overview-tab">
                                        <div className="course-desc">
                                            <h5>{t('course_description')}</h5>
                                            <p dangerouslySetInnerHTML={{ __html: getCourseDetails.generalDetails }}></p>
                                        </div>
                                        <div className="course-feature">
                                            <h5>{t('course_prerequisite')}</h5>
                                            <p dangerouslySetInnerHTML={{ __html: getCourseDetails.prerequisite }}></p>
                                        </div>
                                        <div className="course-feature">
                                            <h5>{t('course_objective')}</h5>
                                            <p dangerouslySetInnerHTML={{ __html: getCourseDetails.objective }}></p>
                                        </div>
                                        <div className="course-share">
                                            <h5>{t('share_this_course')}</h5>
                                            <ul className="social list-unstyled list-inline">
                                                <li className="list-inline-item"><a href={"https://www.facebook.com/" + getUserDetails.facebookId} target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                                <li className="list-inline-item"><a href={"https://www.twitter.com/" + getUserDetails.twitterId} target="_blank"><i className="fab fa-twitter"></i></a></li>
                                                <li className="list-inline-item"><a href={"https://www.linkedin.com/" + getUserDetails.linkedinId} target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                                <li className="list-inline-item"><a href={"https://www.youtube.com/" + getUserDetails.youtubeId} target="_blank"><i className="fab fa-youtube"></i></a></li>
                                                <li className="list-inline-item"><a href={"https://www.skype.com/" + getUserDetails.skypeId} target="_blank"><i className="fab fa-dribbble"></i></a></li>
                                            </ul>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="curriculum" className="curriculum-tab">
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
                                                    {getContentDetails.length == 0 ? <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '20px' }}>There are no records to display</p> :
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
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="instructor" className="instructor-tab">
                                        <h5>{t('course_instructor')}</h5>
                                        <div className='instructor-box'>
                                            <div className="instructor-item">
                                                <Row>

                                                    {/* <Col md='4'> */}
                                                    <div className="instructor-img">
                                                        <img src={`${headerState.img}${headerState.id}`} alt="" className="img-fluid" style={{ width: '110px' }} />
                                                    </div>
                                                    {/* </Col> */}
                                                    <Col md="8">
                                                        <div className="instructor-content">
                                                            <div className="instructor-box">
                                                                <div className="top-content ">
                                                                    {/* d-flex justify-content-between */}
                                                                    <div className="instructor-name">
                                                                        <h6>{UserService.getUsername()}</h6>
                                                                        <p>{getCourseDetails.inst_profile}</p>
                                                                    </div>
                                                                    <div className="instructor-social">
                                                                        <ul className="social list-unstyled list-inline">
                                                                            <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.facebook.com/" + getUserDetails.facebookId} target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                                                            <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.twitter.com/" + getUserDetails.twitterId} target="_blank"><i className="fab fa-twitter"></i></a></li>
                                                                            <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.linkedin.com/in/" + getUserDetails.linkedinId} target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                                                            <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.youtube.com/" + getUserDetails.youtubeId} target="_blank"><i className="fab fa-youtube"></i></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="instructor-desk">
                                                                    {/* <p>A Software Engineer is an IT professional who designs, develops and maintains computer software at a company. They use their creativity and technical skills and apply the principles of software engineering to help solve new and ongoing problems for an organization.</p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>

                                        {/* <div className="instructor-item">
                                                        <Row>
                                                            <Col md="4">
                                                                <div className="instructor-img">
                                                                    <img src={process.env.PUBLIC_URL + `/assets/images/instructor-2.jpg`} alt="" className="img-fluid" />
                                                                </div>
                                                            </Col>
                                                            <Col md="8">
                                                                <div className="instructor-content">
                                                                    <div className="instructor-box">
                                                                        <div className="top-content d-flex justify-content-between">
                                                                            <div className="instructor-name">
                                                                                <h6>Katrin Kay</h6>
                                                                                <p>Senior Lecturer</p>
                                                                            </div>
                                                                            <div className="instructor-social">
                                                                                <ul className="social list-unstyled list-inline">
                                                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-facebook-f"></i></a></li>
                                                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-twitter"></i></a></li>
                                                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-linkedin-in"></i></a></li>
                                                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-youtube"></i></a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="instructor-desk">
                                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae perferendis delectus voluptate reiciendis animi nisi nemo tenetur sequi cum laudantium sit totam libero quasi ducimus accusantium numquam eaque.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div> */}
                                        {/* <div className="instructor-item">
                                                        <Row>
                                                            <Col md="4">
                                                                <div className="instructor-img">
                                                                    <img src={process.env.PUBLIC_URL + `/assets/images/instructor-3.jpg`} alt="" className="img-fluid" />
                                                                </div>
                                                            </Col>
                                                            <Col md="8">
                                                                <div className="instructor-content">
                                                                    <div className="instructor-box">
                                                                        <div className="top-content d-flex justify-content-between">
                                                                            <div className="instructor-name">
                                                                                <h6>David Show</h6>
                                                                                <p>Senior Lecturer</p>
                                                                            </div>
                                                                            <div className="instructor-social">
                                                                                <ul className="social list-unstyled list-inline">
                                                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-facebook-f"></i></a></li>
                                                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-twitter"></i></a></li>
                                                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-linkedin-in"></i></a></li>
                                                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-youtube"></i></a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="instructor-desk">
                                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae perferendis delectus voluptate reiciendis animi nisi nemo tenetur sequi cum laudantium sit totam libero quasi ducimus accusantium numquam eaque.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div> */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="review" className="review-tab">
                                        <Row>
                                            <Col md="12">
                                                <div className="review-comments">
                                                    <h5>{t('course_reviews_2')}</h5>
                                                    {ratingView && (<div>
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
                                                                                    {data.rating == 1 ?
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
                                                                            {/* <div className="reply-btn">
                                                                                        <button type="button"><i className="las la-reply-all"></i> Reply</button>
                                                                                    </div> */}
                                                                        </div>
                                                                        <div className="comment-desc">
                                                                            <p>{data.reviewText}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>)}
                                                    {!ratingView && (
                                                        <div>
                                                            <p>{t('no_review')}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* <div className="review-form">
                                                                <h5>Submit Review</h5>
                                                                <ReviewForm />
                                                            </div> */}
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="announcement" className="announcement-tab">
                                        <div class="shadow-lg p-3 bg-body rounded">
                                            <Card>
                                                <div>
                                                    <DataTable
                                                        columns={columnsAnnouncement}
                                                        data={filteredItemsAnnouncement}
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
                                                    />
                                                </div>
                                                <div style={{ width: "300px" }}>
                                                    <Row style={{ marginBottom: '15px', marginLeft: '18px', marginTop: '-45px' }}>
                                                        <Col>
                                                            <Button onClick={() => [reset(), setAddAnnouncementDiv(true)]}>{t('add_announcement')}</Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>
                                        </div>
                                        {announcementDiv ?
                                            <div className="card shadow-sm border-0  ">
                                                <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>{announcementData.id ? <>{t('update_announcement')}</> : <>{t('add_announcement')}</>}</h3></div>
                                                <div className="card-body">
                                                    <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                                                        <div className="form-group">
                                                            <label className="mb-0">{t('tittle')}<span className="text-danger">*</span></label>
                                                            <input name="title" type="text" value={announcementData.title} className="form-control" minLength={5} maxLength={50} placeholder={t('enter_title')} onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                                                            />
                                                            {announcementData.titleError
                                                                ? <div className="alert alert-danger mt-2">{announcementData.titleError}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="mb-0">{t('description')}<span className="text-danger">*</span></label>
                                                            <textarea name="titledesc" type="text" value={announcementData.titledesc} className="form-control" minLength={5} maxLength={500} placeholder={t('enter_title_desc')} onChange={(e) => setAnnouncementData({ ...announcementData, titledesc: e.target.value })}
                                                            />
                                                            {announcementData.titledescError
                                                                ? <div className="alert alert-danger mt-2">{announcementData.titledescError}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="mb-0">{t('publish_from')}<span className="text-danger">*</span></label>
                                                            <input name="publishfrom" value={announcementData.publishfrom} type="datetime-local" className="form-control" placeholder={t('enter_date')} onChange={(e) => setAnnouncementData({ ...announcementData, publishfrom: e.target.value })}
                                                            />
                                                            {announcementData.publishfromError
                                                                ? <div className="alert alert-danger mt-2">{t('date_required_field')}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="mb-0">{t('publish_upto')}<span className="text-danger">*</span></label>
                                                            <input name="publishupto" min={announcementData.publishfrom} value={announcementData.publishupto} type="datetime-local" className="form-control" placeholder={t('enter_date')} onChange={(e) => setAnnouncementData({ ...announcementData, publishupto: e.target.value })}
                                                            />
                                                            {announcementData.publishuptoError
                                                                ? <div className="alert alert-danger mt-2">{t('date_required_field')}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                        <Button type="submit" className="btn btn-primary pull-left m-2 w-10">{announcementData.id ? t('update') : t('add')}</Button>
                                                        {announcementData.id ? '' :
                                                            <Button type="reset" onClick={() => reset()} className="btn btn-primary w-10">{t('reset')}</Button>}
                                                    </form>

                                                </div>
                                            </div>
                                            : ''}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="discussion" className="overview-tab">
                                        {
                                            isDecodeValid === "VALID"
                                                ?
                                                <>
                                                    <DiscussionMain courseid={courseId} tenantid={tenantId} userid={UserId} itemid={courseId} />
                                                </>
                                                :
                                                <>
                                                </>
                                        }
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="feedback" className="overview-tab">


                                        <>
                                            <Tab.Container defaultActiveKey="AddQuestion">
                                                <Nav className="flex-column">
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="AddQuestion">{t('add_question')}</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="AddMaster">{t('manage_feedBack')}</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="ViewFeedback">{t('view_feedback')}</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="FeedbackGraph">{t('feedback_analysis')}</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                                <Tab.Content>
                                                    <Tab.Pane eventKey="AddMaster" className="overview-tab">
                                                        <Card>
                                                            <DataTable
                                                                columns={FeedbackList}
                                                                data={feedbackListData}
                                                                // defaultSortField="Name"
                                                                // defaultSortAsc={true}
                                                                striped
                                                                highlightOnHover
                                                                customStyles={customStyles}
                                                                subHeader
                                                                subHeaderComponent={subHeaderComponent}
                                                                fixedHeader
                                                                fixedHeaderScrollHeight="300px"
                                                                // selectableRows
                                                                // onSelectedRowsChange={questionRowSelected}
                                                                pagination
                                                            />
                                                            <Row style={{ marginBottom: '15px', marginLeft: '2px', marginTop: '-40px' }}>
                                                                <Col>
                                                                    <Button onClick={() => setShowAddFeedback(true)} className="btn btn-primary pull-left m-2 w-10">{t('create_new_feedback')}</Button>
                                                                </Col>
                                                            </Row>
                                                        </Card>

                                                        <br />
                                                        <br />

                                                        {
                                                            showAddFeedback ?
                                                                <>
                                                                    <Card>
                                                                        <form onSubmit={(e) => feedbackhandleSubmit(e)} autoComplete="off">
                                                                            <div class="shadow-lg p-3 bg-body rounded">
                                                                                <div className="form-group">
                                                                                    <label className="mb-0">{t('feedback_title')}<span className="text-danger">*</span></label>
                                                                                    <input name="feedback_title" type="text" value={feedbackData.feedback_title} className="form-control" placeholder={t('enter_feedback_title')} onChange={(e) => setfeedbackData({ ...feedbackData, feedback_title: e.target.value })}
                                                                                    />
                                                                                    {feedbackData.feedbacktitleError
                                                                                        ? <div className="alert alert-danger mt-2">{feedbackData.feedbacktitleError}</div>
                                                                                        : ''
                                                                                    }
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <label className="mb-0">{t('feedback_description')}<span className="text-danger">*</span></label>
                                                                                    <textarea name="feedback_desc" type="text" minLength={5} maxLength={1500} value={feedbackData.feedbacktitledesc} className="form-control" placeholder={t('enter_feedback_description')} onChange={(e) => setfeedbackData({ ...feedbackData, feedbacktitledesc: e.target.value })}
                                                                                    />
                                                                                    {feedbackData.feedbacktitledescError
                                                                                        ? <div className="alert alert-danger mt-2">{feedbackData.feedbacktitledescError}</div>
                                                                                        : ''
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div class="shadow-lg p-3 bg-body rounded">
                                                                                <Card>
                                                                                    <div>
                                                                                        <DataTable
                                                                                            columns={coloumnfeedbackQuestion1}
                                                                                            data={filteredItemsFeedbackQuestion}
                                                                                            defaultSortField="Name"
                                                                                            defaultSortAsc={true}
                                                                                            striped
                                                                                            highlightOnHover
                                                                                            customStyles={customStyles}
                                                                                            subHeader
                                                                                            subHeaderComponent={subHeaderComponent}
                                                                                            fixedHeader
                                                                                            fixedHeaderScrollHeight="300px"
                                                                                            selectableRows
                                                                                            onSelectedRowsChange={questionRowSelected}
                                                                                            pagination
                                                                                        />
                                                                                    </div>
                                                                                    <div style={{ width: "300px" }}>
                                                                                        <Row style={{ marginBottom: '15px', marginLeft: '2px', marginTop: '-40px' }}>
                                                                                            <Col>
                                                                                                {
                                                                                                    questionIds.length == 0 ?
                                                                                                        <>
                                                                                                            <Button disabled className="btn btn-primary pull-left m-2 w-10">{t('add_feedback_question')}</Button>
                                                                                                            <Button onClick={() => { closeCreateFeedback() }} className="btn btn-danger pull-left m-2 w-10">{t('cancel')}</Button>
                                                                                                        </>
                                                                                                        :
                                                                                                        <>
                                                                                                            <Button type="submit" className="btn btn-primary pull-left m-2 w-10">{t('add_feedback_question')}</Button>
                                                                                                            <Button onClick={() => { closeCreateFeedback() }} className="btn btn-danger pull-left m-2 w-10">{t('cancel')}</Button>
                                                                                                        </>
                                                                                                }
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </div>
                                                                                </Card>
                                                                            </div>
                                                                        </form>
                                                                    </Card>

                                                                </>
                                                                :
                                                                <>
                                                                </>

                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="AddQuestion" className="overview-tab">
                                                        <div class="shadow-lg p-3 bg-body rounded">
                                                            <Card>
                                                                <DataTable
                                                                    columns={coloumnfeedbackQuestion}
                                                                    data={filteredItemsFeedbackQuestion}
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
                                                                />
                                                                {/* <Row style={{ marginBottom: '15px', marginLeft: '2px', marginTop: '-40px' }}>
                                                                            <Col>
                                                                                <Button onClick={() => [reset(), setAddAnnouncementDiv(true)]}>Add Announcement</Button>
                                                                            </Col>
                                                                        </Row> */}
                                                            </Card>
                                                            <br />
                                                            <Button onClick={() => { onClickCreateQuestion() }}>{t('create_question')}</Button>
                                                        </div>
                                                        <br />

                                                        {
                                                            showCreateQuestion === true ?
                                                                <>
                                                                    <form onSubmit={(e) => questionhandleSubmit(e)} autoComplete="off">
                                                                        <div className="form-group">
                                                                            <label className="mb-0">{t('question')}<span className="text-danger">*</span></label>
                                                                            <input name="feedback_title" type="text" minLength={2} maxLength={50} value={questionData.question} className="form-control" placeholder={t('enter_question')} onChange={(e) => setquestionData({ ...questionData, question: e.target.value })}
                                                                            />
                                                                            {
                                                                                questionData.question == '' || questionData.question == undefined || questionData.questionError !== ''
                                                                                    ?
                                                                                    <>
                                                                                        {
                                                                                            questionData.questionError
                                                                                                ?
                                                                                                <div className="alert alert-danger mt-2">
                                                                                                    {questionData.questionError}
                                                                                                </div>
                                                                                                : ''
                                                                                        }
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
                                                                        <div className="form-group">
                                                                            <label className="mb-0">{t('question_mandatory')}<span className="text-danger">*</span></label>
                                                                            <div class="form-check">
                                                                                <input class="form-check-input" checked={questionData.mandatory == 'true' ? 'true' : ''} type="radio" value="true" name="flexRadioDefault" id="flexRadioDefault1"
                                                                                    onChange={(e) => setquestionData({ ...questionData, mandatory: e.target.value })} />
                                                                                <label class="form-check-label" for="flexRadioDefault1">
                                                                                    {t('yes')}
                                                                                </label>
                                                                            </div>
                                                                            <div class="form-check">
                                                                                <input class="form-check-input" checked={questionData.mandatory == 'false' ? 'false' : ''} type="radio" value="false" name="flexRadioDefault" id="flexRadioDefault2"
                                                                                    onChange={(e) => setquestionData({ ...questionData, mandatory: e.target.value })} />
                                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                                    {t('no')}
                                                                                </label>
                                                                            </div>
                                                                            {
                                                                                questionData.mandatory == '' || questionData.mandatory == undefined
                                                                                    ?
                                                                                    <>
                                                                                        {questionData.mandatoryError
                                                                                            ? <div className="alert alert-danger mt-2">{questionData.mandatoryError}</div>
                                                                                            : ''
                                                                                        }
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        {null}
                                                                                    </>
                                                                            }


                                                                            {/* {questionData.mandatoryError
                                                                            ? <div className="alert alert-danger mt-2">{questionData.mandatoryError}</div>
                                                                            : ''
                                                                        } */}
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <label className="mb-0">{t('question_type')}<span className="text-danger">*</span></label>
                                                                            <select className="form-control" value={questionData.questionType} onChange={(e) => setquestionData({ ...questionData, questionType: e.target.value })} aria-label="Default select example">
                                                                                <option selected>{t('select_question')}</option>
                                                                                <option value="SC">{t('single_choice')}</option>
                                                                                <option value="MC">{t('multiple_choice')}</option>
                                                                                <option value="TF">{t('true_and_false')}</option>
                                                                                <option value="TA">{t('descriptive')}</option>
                                                                            </select>
                                                                            {
                                                                                questionData.questionType == '' || questionData.questionType == undefined || questionData.questionType == "Select Option"
                                                                                    ?
                                                                                    <>
                                                                                        {questionData.questionTypeError
                                                                                            ?
                                                                                            <div className="alert alert-danger mt-2">{questionData.questionTypeError}</div>
                                                                                            : ''
                                                                                        }
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        {null}
                                                                                    </>
                                                                            }


                                                                            {/* {questionData.questionTypeError
                                                                            ? <div className="alert alert-danger mt-2">{questionData.questionTypeError}</div>
                                                                            : ''
                                                                        } */}
                                                                        </div>
                                                                        {questionData.questionType === "SC" || questionData.questionType === "MC" ?
                                                                            <div className="form-group">
                                                                                <label className="mb-0">{t('options')}<span className="text-danger">*</span></label>
                                                                                {serviceList.map((singleService, index) => (
                                                                                    <div key={index} className="services">
                                                                                        <div className="first-division">
                                                                                            <input className="form-control"
                                                                                                name="service"
                                                                                                type="text"
                                                                                                id="service"
                                                                                                value={singleService.service}
                                                                                                onChange={(e) => handleServiceChange(e, index)}
                                                                                            />
                                                                                            {serviceList.length - 1 === index && serviceList.length < 4 && (
                                                                                                <i class="fa fa-plus-circle pull-right fa-2x" onClick={handleServiceAdd} style={{ "color": "green" }} aria-hidden="true"></i>
                                                                                            )}
                                                                                        </div>
                                                                                        <br></br>
                                                                                        <div className="second-division">
                                                                                            {serviceList.length !== 1 && (
                                                                                                <i class="fa fa-times-circle pull-right fa-2x" onClick={() => handleServiceRemove(index)} style={{ "background": "radial-gradient(white 50%, transparent 50%)", "color": "red" }} aria-hidden="true"></i>

                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                                {questionData.questionOptionError
                                                                                    ? <div className="alert alert-danger mt-2">{questionData.questionOptionError}</div>
                                                                                    : ''
                                                                                }
                                                                            </div>
                                                                            : ''}
                                                                        <Button type="submit" className="btn btn-primary pull-left m-2 w-10">{questionData.questionId ? <>{t('Update')}</> : <>{t('add')}</>}</Button>
                                                                        {questionData.questionId ? '' :
                                                                            < Button type="reset" onClick={() => feedbackQuestionReset()} className="btn btn-primary pull-left m-2 w-10">{t('reset')}</Button>}
                                                                        <Button className='btn btn-danger' onClick={() => { onClickCloseButton() }} >{t('close')}</Button>
                                                                    </form>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }


                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="ViewFeedback" className="overview-tab">
                                                        <Accordion defaultActiveKey="0">
                                                            {getFeedbackResponse.length == 0 ? <p>{t('response_condition')}</p> :
                                                                <>
                                                                    {getFeedbackResponse.map((data, i) =>
                                                                        <Accordion.Item eventKey={i}>
                                                                            <Accordion.Header>{i + 1} {data.feedbackTitle}</Accordion.Header>
                                                                            <Accordion.Body style={{ marginLeft: '25px' }}>
                                                                                {
                                                                                    data.responseMaster.map((a, j) =>
                                                                                        <div style={{ margin: '10px', padding: '10px' }}>{j + 1}.{a.questionMaster.question}
                                                                                            {
                                                                                                a.questionMaster.questionType == "TF" || a.questionMaster.questionType == "TA" ?
                                                                                                    <ul style={{ listStyleType: 'none', marginLeft: '10px' }}>
                                                                                                        <li>Ans. {a.feedbackResponse} </li>
                                                                                                    </ul> : ''
                                                                                            }
                                                                                            {
                                                                                                a.questionMaster.optionsMasters.map((d, k) =>
                                                                                                    <ul style={{ listStyleType: 'none', marginLeft: '10px' }}>
                                                                                                        <li>{k + 1}.  {d.optionText} {feedbackResponseCheckHandler(a.feedbackResponse).includes(d.optionId) ? <i class="fa fa-check" style={{ color: 'green' }} aria-hidden="true"></i> : ''}</li>
                                                                                                    </ul>)
                                                                                            }
                                                                                        </div>)
                                                                                }
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    )}
                                                                </>
                                                            }
                                                        </Accordion>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="FeedbackGraph" className="overview-tab">
                                                        {
                                                            feedbackList.map((data, index) => {
                                                                return (
                                                                    <>
                                                                        <Accordion activeKey={activeKey} onSelect={handleAccordianSelect}>
                                                                            <Accordion.Item eventKey={index}>
                                                                                <Accordion.Header onClick={() => { onClickAccodian(index) }} >{data.feedbackTitle}</Accordion.Header>
                                                                                <Accordion.Body style={{ marginLeft: '25px' }}>
                                                                                    <Card>
                                                                                        <DataTable
                                                                                            columns={listFeedbackColumn}
                                                                                            data={listFeedbackData}
                                                                                        />
                                                                                    </Card>
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>
                                                                        </Accordion>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                        {/* <div>
                                                        <DataTable
                                                            columns={listFeedbackColumn}
                                                            data={listFeedbackData}
                                                        />
                                                    </div> */}
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Tab.Container>
                                        </>

                                    </Tab.Pane>

                                    <Tab.Pane eventKey="query" className="overview-tab">
                                        {
                                            isDecodeValid === "VALID"
                                                ?
                                                <>
                                                    <Query courseid={courseId} tenantid={tenantId} userid={UserId} itemid={courseId} instructor="instructor" />
                                                </>
                                                :
                                                <>
                                                </>
                                        }
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="assignment" className="overview-tab">
                                        {
                                            isDecodeValid === "VALID"
                                                ?
                                                <>
                                                    <FrontAssignment
                                                        courseID={courseId}
                                                        tenantID={tenantId}
                                                        userID={UserId}
                                                    />
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                        {/* <Tab.Container defaultActiveKey="ViewAssignment" >
                                                        <Nav className="flex-column">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="ViewAssignment">View Assignment</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="CreateAssignment">Create Assignment</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="Evaluation">Evaluation</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey='ViewAssignment' className="overview-tab">
                                                                <h4>View Assignment</h4>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey='CreateAssignment' className="overview-tab">
                                                                <h4>Create Assignment</h4>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey='Evaluation' className="overview-tab">
                                                                <h4>Evaluation</h4>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Tab.Container> */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="assessment" className="overview-tab">
                                        <>
                                            {/* `${process.env.PUBLIC_URL + "/dashboard/courseId/:cId"}` */}
                                            {
                                                isDecodeValid === "VALID"
                                                    ?
                                                    <>
                                                        <a className="btn btn-success btn-lg btn-block" href={`http://samnayakawadi.hyderabad.cdac.in:3001/assessment/authoring/dashboard/courseId/${courseId}`} onClick={() => assementLoaderFunction()} disabled={assementLoader.isLoading ? "true" : ""}>
                                                            {assementLoader.isLoading ? (<> {t('loading')}</>) : <>{t('manage_que_quize')}</>}


                                                        </a>
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                            }

                                        </>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="criteria" className="overview-tab">
                                        <button className='btn btn-success' style={{ float: "right", borderRadius: "5px" }} onClick={() => { AddNewCriteriaModalShow() }}>
                                            <i className='fa fa-plus' style={{ margin: "10px", marginTop: "7px", marginBottom: "7px" }}></i>{t('new_criteria')}
                                        </button>
                                        <ul>
                                            <li>CC1</li>
                                            <li>CC2</li>
                                            <li>CC3</li>
                                        </ul>
                                        <>
                                            {/* <CompletionCriteria  courseID={courseId} tenantID={tenantId} userID={UserId} /> */}
                                        </>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </Container>
                </section>
            </Styles>

            {/* Footer 2 */}
            <FooterTwo />

            {/* Folder Creation model code start here*/}
            <Modal
                centered show={getModalState.show} onHide={() => handleModal2()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('new_folder')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span style={{ fontSize: "20px" }}>{t('new_folder_details')}</span><br />
                    {t('required_fields')}*
                    <div class="mb-3 mt-3">
                        <label for="name">{t('name')} : *</label>
                        <input type="text" minLength={2} maxLength={50} class="form-control" id="folderName" placeholder={t('enter_folder_name')} name="folder" />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                        {/* {getParentId} */}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}
                        onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" onClick={() => save(getParentId)}>
                        {t('submit')}
                    </Button>
                    <Button variant="secondary" onClick={() => handleModal2()}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Folder Creation model code end here*/}

            {/* File upload model code start here*/}
            <Modal
                centered show={getUploadModalState.show} onHide={() => FileUploadModalHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('Upload Documents & Files')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <div style={{ marginLeft: 10, color: 'red' }}>
                            <span>{t('upload_files')}</span>
                        </div>
                        <div style={{ marginLeft: 10, color: 'red' }}>
                            <span>{t('required_Files')}</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="name">{t('file_name')} : </label>
                            <input type="text" minLength={2} maxLength={50} className="form-control" id="file_name" placeholder={t('pls_enter_file_name')} name="file_name" />
                            <span style={{ color: "red" }}>{errorMsg}</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="name">{t('duration_minutes')}: </label>
                            <input type="number" className="form-control" min="0" max="60" id="duration" placeholder={t('duration_minutes')} name="duration" />
                            <span style={{ color: "red" }}>{errorMsg}</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <input type="file" className="form-control" style={{ height: '37px' }} onChange={selectFile} accept="*" id="file" />
                        </div>
                        {show == true ? <div class="mb-3 mt-3">
                            <label for="name">{t('scorm_zip')} &nbsp; </label>
                            <input type="checkbox" className='form-control' id="ScormCheckbox" onClick={() => setCheckBox(true)} data-toggle="toggle" data-onstyle="primary"></input>
                        </div> : null}
                        {getLoading ?
                            <button class="btn btn-success" disabled>
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="sr-only">{t('loading')}</span>
                                </div>   {t('upload')}
                            </button> :
                            <button className="btn btn-success" disabled={!getabc.selectedFiles} onClick={() => upload()}>
                                {t('upload')}
                            </button>
                        }
                    </div>
                    {/* <FileUpload userId={props.userId} courseId={props.courseId} tenantId={props.tenantId} assignId={getAssignId} /> */}
                    {/* <FileUpload user_id={UserId} dir_name={getParentId} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setUploadModalState(false)} className="btn btn-danger">{t('close')}</Button>
                </Modal.Footer>
            </Modal>
            {/* File upload model code end here*/}

            {/* ContentView model code start here*/}
            <Modal
                size="xl" centered show={getUrlModal.show} onHide={() => UrlModalHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {getContentType === "zip" ? <i class="fas fa-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}> {getContentName}</i>
                            : getContentType === "pdf" ? <i class="fas fa-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}> {getContentName}</i>
                                : getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <i class="fas fa-file-image" style={{ fontSize: "25px", color: "#b2b1ff" }}> {getContentName}</i>
                                    : getContentType === "html" ? <i class="fab fa-html5" style={{ fontSize: "25px", color: "#e54c21" }}> {getContentName}</i>
                                        : getContentType === "ogg" || getContentType === "webm" || getContentType === "mp4" ? <i class="fas fa-file-video" style={{ fontSize: "25px", color: "#8cee02" }}> {getContentName}</i>
                                            : getContentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}> {getContentName}</i>
                                                : getContentType === "doc" || getContentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}> {getContentName}</i>
                                                    : getContentType === "scorm" ? <i class="far fa-file-archive" style={{ fontSize: "25px", color: "green" }}> {getContentName}</i>
                                                        : getContentType === "youtube" ? <i class="far fa-youtube" style={{ fontSize: "25px", color: "green" }}> {getContentName}</i>
                                                            : null}
                    </Modal.Title>
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
            {/* ContentView model code end here*/}

            {/* Content details update model code start here*/}
            <Modal
                centered show={getFileContentUpdateModalState.show} onHide={() => FileContentUpdateModalHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('Update File Details')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3 mt-3">
                        <label for="name">{t('file_name')} : </label>
                        <input type="text" class="form-control" defaultValue={getFileContentDetails.contentName} id="file_name" placeholder={t('pls_enter_file_name')} name="file_name" />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="name">{t('duration')} : </label>
                        <input type="number" class="form-control" minLength={2} maxLength={50} defaultValue={getFileContentDetails.contentDuration} min="0" max="60" id="duration" placeholder={t('enter_duration')} name="duration" />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => UpdateFileDatails(getFileContentDetails.contentId, getParentId)} className="btn btn-primary">{t('Updates')}</Button>
                    <Button onClick={() => FileContentUpdateModalHide(false)} className="btn btn-danger">{t('close')}</Button>
                </Modal.Footer>
            </Modal>
            {/* Content details update model code end here*/}

            {/* Dirctory Name details update model code start here*/}
            <Modal
                centered show={getDirNameUpdateModal.show} onHide={() => FolderNameUpdateModalHide()} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('update_folder_name')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3 mt-3">
                        <label for="name">{t('folder_name')} : </label>
                        <input type="text" minLength={2} maxLength={50} class="form-control" defaultValue={getDirNameUpdateModal.dirName} id="folder_name" placeholder={t('enter_folder_name')} name="folder_name" />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => UpdateFolderName(getDirNameUpdateModal.dirParentId)} className="btn btn-primary">{t('update')}</Button>
                    <Button onClick={() => FolderNameUpdateModalHide(false)} className="btn btn-danger">{t('close')}</Button>
                </Modal.Footer>
            </Modal>
            {/* Dirctory Name details update model code end here*/}


            {/* ShareUrl model code start here*/}
            <Modal centered show={ShareUrlModal.show} onHide={() => shareUrlModalHide()} >
                <Modal.Body style={{ padding: "0px" }}>
                    <div class="container" style={{ width: "75%" }}>
                        <div class="copy-text1">
                            <input type="text" class="text" value={getShareUrlData} readonly />
                            <button>
                                <i class="fa fa-clone"></i>
                            </button>
                            <div style={{ marginLeft: "35px", marginTop: "12px" }}><a href="#"><i class="fas fa-times fa-2x" onClick={() => shareUrlModalHide()}></i></a></div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* Share Url model code end here*/}

            <Modal centered show={getModuleModalState.show} onHide={() => AddModuleModalHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('create_module_topic')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t('required_fields')} *
                    <div class="mb-3 mt-3">
                        <label for="name">{t('name')} : *</label>
                        <input type="text" minLength={2} maxLength={50} class="form-control" id="module_name" placeholder={t('enter_folder_name')} name="module_name" />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                        <span className="registration_input-msg"></span>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="publish_date">{t('publish_date_s')} : *</label><br></br>
                        {/* <DateTimePicker calendarIcon={<i class="fas fa-calendar" aria-hidden="true"></i>} onChange={setdatePicker} value={getdatePicker} minDate={new Date()} /> */}
                        <DatePicker
                            value={startDate}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm:ss aa"
                            showMonthDropdown
                            showYearDropdown
                            showTimeInput
                            minDate={new Date()}
                            placeholderText="Click to show date"
                        />

                        {/* <input type="datetime-local" min={a} class="form-control" id="publish_date" placeholder="Enter Publish Date" name="publish_date" /> */}
                        {/* <span style={{ color: "red" }}>{errorMsg2}</span> */}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}
                        onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" onClick={() => AddModule(getCourseStructureFolderId)}>
                        {t('submit')}
                    </Button>
                    <Button variant="secondary" onClick={() => AddModuleModalHide()}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Folder Creation model code end here*/}

            {/* update folder or Content details model code start here*/}
            <Modal centered show={getFolderOrContentDetUpdate.show} onHide={() => UpdateContentOrFolderModalHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('update_folder_or_content_details')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t('required_fields')} *
                    <div class="mb-3 mt-3">
                        <label for="name">{t('name')} : *</label>
                        <input type="text" minLength={2} maxLength={50} class="form-control" id="module_name" defaultValue={getFolderOrContentDetUpdate.name} placeholder={t('enter_folder_name')} name="module_name" />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                        <span className="registration_input-msg"></span>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="publish_date">{t('publish_date_s')} : *</label><br></br>
                        {/* <DateTimePicker calendarIcon={<i class="fas fa-calendar" aria-hidden="true"></i>} onChange={setdatePicker} value={getdatePicker} minDate={new Date()} /> */}
                        <DatePicker
                            value={new Date(getPdate)}
                            selected={new Date(getPdate)}
                            onChange={(date) => setPdate(date)}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm:ss aa"
                            showMonthDropdown
                            showYearDropdown
                            showTimeInput
                            // minDate={new Date()}
                            placeholderText="Click to show date"
                        />

                        {/* <input type="datetime-local" min={a} class="form-control" id="publish_date" placeholder="Enter Publish Date" name="publish_date" /> */}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}
                        onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" onClick={() => updateContentOrModule(getFolderOrContentDetUpdate.id)}>
                        {t('submit')}
                    </Button>
                    <Button variant="secondary" onClick={() => UpdateContentOrFolderModalHide()}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* update folder or Content details model code end here */}

            {/* Add youtube link in Course Structure code start here */}
            <Modal centered show={getModalState.show} onHide={() => handleModal2()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('add_youtube_video_link')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t('required_fields')} *
                    <div class="mb-3 mt-3">
                        <label for="name">{t('youtube_link')} : *</label>
                        <input type="text" class="form-control" id="youtube_link" placeholder={t('enter_youtube_link')} name="youtube_link" />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                        <span className="registration_input-msg"></span>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="name">{t('duration')} : </label>
                        <input type="number" class="form-control" defaultValue={getFileContentDetails.contentDuration} min="0" max="60" id="duration" placeholder={t('enter_duration')} name="duration" />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                        <span className="registration_input-msg"></span>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="publish_date">{t('publish_date')} : *</label><br></br>
                        <DatePicker
                            value={startDate}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm:ss aa"
                            showMonthDropdown
                            showYearDropdown
                            showTimeInput
                            minDate={new Date()}
                            placeholderText="Click to show date"
                        />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}
                        onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register"
                        onClick={() => YoutubeAddContentToCourseStructure(getCourseStructureFolderId)}>
                        {t('add')}
                    </Button>
                    <Button variant="secondary" onClick={() => handleModal2()}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Add youtube link in Course Structur end here */}


            {/* Activity Completion */}


            <Modal centered show={getAddActivityCompletion.show} onHide={() => addActivityCompletionHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('act_completion')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>{t('act_completion_desc')}</p>
                        <br></br>
                        <Row>
                            <Col md={4} style={{ paddingRight: 0 }}>
                                <h6>{t('stud_must_match')}</h6>
                            </Col>
                            <Col md={3}>
                                <select className="form-control" value={completionType} aria-label="Default select example" onChange={(e) => setCompletionType(e.target.value)}>
                                    <option selected>{t('none')}</option>
                                    <option value="Any">{t('any')}</option>
                                    <option value="All">{t('all')}</option>
                                </select>
                            </Col>
                            <Col md={4} style={{ paddingLeft: 0 }}>
                                <h6>{t('of_following')}:</h6>
                            </Col>

                        </Row>
                        <br></br>
                        <Row>
                            <Col style={{ paddingLeft: 40 }}>
                                <h6><label htmlFor="condition1"><input type="checkbox" id="condition1" className="check-box" />  {t('student_must_complete_topic')}</label></h6>
                            </Col>
                        </Row>
                        {/* <Row>
                        <Col style={{paddingLeft:40}}>
                        <h6><label htmlFor="condition2"><input type="checkbox" id="condition2" className="check-box"/>  Students must complete all quizzes</label></h6>
                        </Col>        
                    </Row> */}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}
                        onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" >
                        {t('apply')}
                    </Button>
                    <Button variant="secondary" onClick={() => addActivityCompletionHide()}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal centered show={getAddAccessRestriction.show} onHide={() => addAccessRestrictionHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('access_restriction')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col md={3} style={{ paddingRight: 0 }}>
                                <h6>{t('restrict_topic')} </h6>
                            </Col>
                            <Col md={3}>
                                <select className="form-control" value={restriction} aria-label="Default select example" onChange={handleOpenRestriction}>
                                    <option value="No" selected >{t('no')}</option>
                                    <option value="Yes" >{t('yes')}</option>
                                </select>
                            </Col>
                            <Col md={5} style={{ paddingLeft: 0 }}>
                            </Col>
                        </Row>
                        <br></br>
                    </div>
                    {showRestriction && (<div>

                        <Row>
                            <Col md={4} style={{ paddingRight: 0 }}>
                                <h6>{t('stud_must_match')}</h6>
                            </Col>
                            <Col md={3}>
                                <select className="form-control" value={completionType} aria-label="Default select example" onChange={(e) => setCompletionType(e.target.value)}>
                                    <option selected>{t('none')}</option>
                                    <option value="Any">{t('any')}</option>
                                    <option value="All">{t('all')}</option>
                                </select>
                            </Col>
                            <Col md={4} style={{ paddingLeft: 0 }}>
                                <h6> {t('of_following')}:</h6>
                            </Col>

                        </Row>
                        <br></br>
                        <Row>
                            <Col style={{ paddingLeft: 40 }}>
                                <h6><label htmlFor="condition1"><input type="checkbox" id="condition1" className="check-box" /> {t('activity_msg_1')}</label></h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ paddingLeft: 40 }}>
                                <h6><label htmlFor="condition2"><input type="checkbox" id="condition2" className="check-box" />  {t('activity_msg_2')}</label></h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ paddingLeft: 40, paddingRight: 0 }}>
                                <h6><label htmlFor="condition3" ><input type="checkbox" id="condition3" className="check-box" />  {t('activity_msg_3')} : </label></h6>
                            </Col>
                            <Col style={{ paddingLeft: 0 }}>
                                <DatePicker
                                    value={startDate}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm:ss aa"
                                    showMonthDropdown
                                    showYearDropdown
                                    showTimeInput
                                    minDate={new Date()}
                                    placeholderText="Click to show date"
                                />
                            </Col>
                        </Row>
                    </div>)}
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}
                        onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" >
                        {t('apply')}
                    </Button>
                    <Button variant="secondary" onClick={() => addAccessRestrictionHide()}>
                        {t("cancel")}
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* here is topic feedback modal */}

            <Modal centered show={getTopicFeedback.show} onHide={() => TopicFeedbackModalHide()} backdrop="static" className='custom-modal-style' size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('topic_feedback')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <TopicFeedback courseId={courseId} itemIdForFeedback={itemIdForFeedback} />

                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    {/* <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}
                        onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" >
                        Add
                    </Button> */}
                    <Button variant="secondary" onClick={() => TopicFeedbackModalHide()}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* here is Activity completion modal*/}

            <Modal centered show={getNewCriteriaModal.show} onHide={() => AddNewCriteriaModalHide()} backdrop="static" className='custom-modal-style' >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('completion_criteria')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Row>
                                    <Col sm={3} style={{ paddingLeft: "50px", paddingTop: "10px" }}>
                                        <Form.Label>{t('tittle')}</Form.Label>
                                    </Col>
                                    <Col sm={9}>
                                        <Form.Control type="text" minLength={2} maxLength={50} placeholder={t('enter_title')} />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)', border: "0px" }}
                        onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" >
                        {t('add')}
                    </Button>
                    <Button variant="secondary" onClick={() => AddNewCriteriaModalHide()} style={{ border: "0px" }}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal centered show={modelShow} onHide={() => { setModelShow(false) }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title style={{ alignContent: "center" }}>{t('feedback_analysis')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {//console.log(graphData)} */}
                    {
                        checkPieChart
                            ?
                            <>
                                <Pie
                                    data={dataPie}
                                    options={optionPie}

                                />
                            </>
                            :
                            <>
                                <Bar
                                    data={dataBar}
                                    options={optionBar}

                                />
                            </>
                    }
                </Modal.Body>
            </Modal>

        </div >
    )
}

export default InstCourseDetails