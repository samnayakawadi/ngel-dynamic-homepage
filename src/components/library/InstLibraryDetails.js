import React, { useEffect, useState, useMemo } from "react";
import {
    Container,
    Row,
    Col,
    Tab,
    Nav,
    Button,
    Card,
    Modal,
    OverlayTrigger,
    Tooltip,
    TabPane,
} from "react-bootstrap";
//import { Styles } from '../../pages/instructor/instCourses/styles/coursedetails';
import { Styles } from "./styles/coursedetails.js";
import FooterTwo from "../FooterTwo";
import HeaderTwo from "../HeaderTwo";
import swal from "sweetalert";
import "./styles/styles.scss";
import Videojs from "../../pages/instructor/instCourses/video.js";
import DataTable from "react-data-table-component";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import PopularCourse from '../../courses/components/PopularCourse'
// import CourseTag from '../../courses/components/CourseTag'
import TreeMenu from "react-simple-tree-menu";
// import '../../../../node_modules/react-simple-tree-menu/dist/main.css';
import { Alert, Form, ListGroup, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Timer from "react-compound-timer";
import { UncontrolledCollapse } from "reactstrap";
import "../../pages/instructor/styles.css";
import "../../pages/instructor/instCourses/styles/tree.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import { Bar, Pie } from "react-chartjs-2";
import Query from "../../pages/courses/Query/Query";
import DiscussionMain from "../../pages/discussion/DiscussionMain";
import FilterDataTable from "../../pages/instructor/FilterDataTable";
import TopicFeedback from "../../pages/instructor/instCourses/TopicFeedback";
import { BreadcrumbBox } from "../common/Breadcrumb";
import UserService from "../../services/UserService";
import instructorService from "../../services/instructorService";
import service from "../../services/service";
import md5 from "md5";
import ViewPdf from "../../pages/instructor/ViewPdf.js";
import CryptoJS from "crypto-js";

const customStyles = {
    title: {
        style: {
            fontColor: "red",
            fontWeight: "900",
        },
    },
    headCells: {
        style: {
            fontSize: "17px",
            fontWeight: "500",
            textTransform: "uppercase",
            // paddingLeft: '0 8px',
            // marginLeft: '10px',
        },
    },
    cells: {
        style: {
            fontSize: "15px",
            // paddingLeft: '0 8px',
            // marginLeft: '10px'
        },
    },
};

const languages = [
    {
        code: "en",
        name: "English",
        country_code: "gb",
    },

    {
        code: "hi",
        name: "Hindi",
        country_code: "in",
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
];

function InstLibraryDetails(props) {
    useEffect(() => {
        UserService.generateToken();
    }, []);

    const um_api = UserService.USER_API;
    ////console.log(um_api);

    const [ratingCount, setRatingCount] = useState(0);
    let tenantId = 1;
    // var courseID = props.match.params.cId;

    let UserId = UserService.getUserid();

    // for different languages
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t } = useTranslation();
    useEffect(() => {
        document.body.dir = currentLanguage.dir || "ltr";
        document.title = t("app_title");
    }, [currentLanguage, t]);

    const decipher = (salt) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) =>
            textToChars(salt).reduce((a, b) => a ^ b, code);
        return (encoded) =>
            encoded
                .match(/.{1,2}/g)
                .map((hex) => parseInt(hex, 32))
                .map(applySaltToChar)
                .map((charCode) => String.fromCharCode(charCode))
                .join("");
    };

    // let courseid = props.match.params.cId;
    // // let tenantID = props.match.params.tid;
    // let hashcode = courseid.substring(0, 10);
    // const myDecipher = decipher(`${hashcode}`);
    // courseid = courseid.substring(10);
    // let courseId = myDecipher(`${courseid}`);
    // let tenantId = myDecipher(`${tenantID}`);
    const [courseId, setDecodedCourseId] = useState(null)
    const [isDecodeValid, setIsDecodeValid] = useState("NOTVALID")

    // const [tenantId, setDecodedTenantId] = useState(null)

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

        if (isValidCourseId ) {
            setIsDecodeValid("VALID")
            setDecodedCourseId(decodedCourseId)
            // setDecodedTenantId(decodedTenantId)
        }
        else {
            setIsDecodeValid("NOTVALID")

            swal({
                title: t('something_went_wrong_try_later'),
                text: t('redirecting_to_course_list'),
                timer: 5000,
            }).then(() => {
                // history.push(`${process.env.PUBLIC_URL + "/course-grid/"}`);
            })
        }

    }

    useEffect(() => {

        //console.log("Called isDecodeValid")

        if (isDecodeValid !== "VALID") {
            decodeHandler()
        }

    }, [isDecodeValid])

    const [getCourseDetails, setCourseDetails] = useState([]);
    const [startDate, setStartDate] = useState();
    const [getRating, setRating] = useState([]);
    const [getServerTime, setServerTime] = useState();
    const [isActiveFolderId, setIsActiveFolderId] = useState();
    const [getColorActiveId, setColorActiveId] = useState();
    const [getYouTubeUrl, setYouTubeUrl] = useState();
    const [completionType, setCompletionType] = useState("None");
    const [restriction, setRestriction] = useState(" ");
    const [getLibraryOwnUserId, setLibraryOwnUserId] = useState();

    const publishedDate = (date) => {
        const p_date = new Date(date).getDate();
        const p_month = new Date(date).getMonth();
        const p_year = new Date(date).getFullYear();

        const pub_date = `${p_date}/${p_month}/${p_year}`;

        return pub_date;
    };

    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button className="btn btn-info" onClick={onClick} ref={ref}>
            {t('publish_date_s')}: {value}
        </button>
    ));

    useEffect(() => {
        const courseButton = document.querySelectorAll(".course-button");
        courseButton.forEach((button) => {
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

    const scrollToView = () => {
        const ref = document.getElementById("Tab");
        ref.scrollIntoView({
            behavior: "smooth",
            inline: "start",
        });
    };

    const initialStateId = {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        gender: "",
        dob: "",
        instituteName: "",
        eduQualification: "",
        address: "",
        city: "",
        pincode: "",
        countryId: "",
        stateId: "",
        districtId: "",
        updateBy: props.match.params.updateBy,
        learnerUsername: props.match.params.learnerUsername,
        firstNameError: "",
        lastNameError: "",
        genderError: "",
        dobError: "",
        mobileError: "",
        eduQualificationError: "",
        instituteNameError: "",
        addressError: "",
        cityError: "",
        pincodeError: "",
        countryIdError: "",
        stateIdError: "",
        districtIdError: "",
        facebookId: "",
        twitterId: "",
        linkedinId: "",
        youtubeId: "",
        skypeId: "",
        facebookIdError: "",
        twitterIdError: "",
        linkedinIdError: "",
        youtubeIdError: "",
        skypeIdError: "",
    };

    const [getUserDetails, setUserDetails] = useState(initialStateId);

    useEffect(() => {
        if (isDecodeValid === "VALID") {
        
            service
                .getUserById(UserId)
                .then((res) => {
                    setUserDetails(res.data);
                    ////console.log('UserDetail-------------'+JSON.stringify(res.data));
                })
                .catch((err) => {
                    //console.log(err);
                });
        }
    }, [courseId]);

    const [getCourseStructureJson, setCourseStructureJson] = useState([]);
    const [userCount, setUserCount] = useState();
    const [announcementDetails, setAnnouncementDetails] = useState([]);
    const [getNoOfContents, setNoOfContents] = useState(0);

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            fatchCourseData();
            fatchRatingData();
            fatchServerTime();
            fatchUserCount();
            fatchAnnouncementData();
        }
    }, [courseId]);

    const fatchCourseData = async () => {
        try {
            const res = await instructorService.getLibraryById(courseId);
            setCourseDetails(res.data);
            setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
            ////console.log("courseStructureJson=======>",JSON.parse(res.data.courseStructureJson));
            JSON.parse(res.data.courseStructureJson).nodes.map((data) => {
                ////console.log("data ",data.nodes.length);
                setNoOfContents(data.nodes.length);
            });
        } catch (e) {
            //console.log(e)
        }
    };
    const fatchUserCount = async () => {
        try {
            const res = await service.userCount(courseId, tenantId);
            setUserCount(res.data.userCount);
        } catch (error) {
            //console.log(error)
        }
    };

    const fatchRatingData = async () => {
        try {
            const res = await service.getoverallRating(courseId, tenantId);
            setRating(res.data);
            setRatingCount(res.data.length);
            ////console.log(res.data);
        } catch (e) {
            //console.log(e)
        }
    };
    const fatchServerTime = async () => {
        try {
            const res = await instructorService.getServerTime();
            setStartDate(new Date(res.data));
        } catch (e) {
            //console.log(e)
        }
    };

    const [ratingView, setRatingView] = useState(false);

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            checkRatingBody();
        }
    }, [ratingCount,courseId]);

    const checkRatingBody = () => {
        if (ratingCount !== 0) {
            setRatingView(true);
        }
    };

    const fatchAnnouncementData = async () => {
        try {
            const res = await service.getAllCourseAnnouncementListByAuthor(
                UserId,
                courseId
            );
            setAnnouncementDetails(res.data);
        } catch (error) { }
    };

    const [isActive, setIsActive] = useState({
        folder: 0,
        file: 0,
    });

    useEffect(() => {
        folderStructureTreeCourse();
    }, [getColorActiveId, isActive,courseId]);

    useEffect(() => {
        if (isDecodeValid === "VALID") {

            folderStructureTree();
        }
    }, [isActiveFolderId, isActive,courseId]);

    const scrollWin = () => {
        document.getElementById("Main").scrollIntoView({ behavior: "smooth" });
        //window.scrollTo(0, 290);
    };

    const fee_validator = (fees) => {
        if (fees === 0) {
            return <p>{t('free')}</p>;
        } else {
            return <p>&#8377;{fees}</p>;
        }
    };

    const convertDate = (dateFormat) => {
        let timestamp = Date.parse(dateFormat);
        let date = new Date(timestamp);
        let d = date.toLocaleString("en-IN", { hour12: false, timeZone: "IST" });

        // let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
        return d;
    };

    /* Course Structure Create Code Start */

    const [getFolder, setFolder] = useState([]);
    const [getFolderName, setFolderName] = useState();
    const [getLoading, setLoading] = useState();
    const [errorMsg, setErrorMsg] = useState();
    useEffect(() => {
        instructorService
            .getFolderStructure(UserId)
            .then((res) => {
                setFolder(res.data);
            })
            .catch((err) => {
                swal(t("error"), t("try_sometimes"), "error");
            });
    }, [courseId]);

    const abc1 = (dirId, dirName) => {
        setIsActiveFolderId(dirId);
        setParentId(dirId);
        setFolderName(dirName);
        instructorService.contentDetails(dirId, UserId).then((res) => {
            //console.log("setContentDetails",res.data);
            setContentDetails(res.data);
        });
    };

    const [showRestriction, setShowRestriction] = useState(false);

    const handleOpenRestriction = (e) => {
        setRestriction(e.target.value);
        ////console.log(restriction);
        if (e.target.value == "Yes") {
            setShowRestriction(true);
        } // to show restriction modal portion
        else {
            setShowRestriction(false);
        }
    };

    const [getParentId, setParentId] = useState([]);
    const [getUploadModalState, setUploadModalState] = useState({
        show: false,
    });
    const [getModalState, setModalState] = useState({
        show: false,
    });
    const [getTopicFeedback, setTopicFeedback] = useState({
        show: false,
    });

    const handleModal2 = () => {
        setModalState({ show: false });
    };

    const handleModal = () => {
        setModalState({ show: true });
    };

    const FileUploadModalShow = () => {
        setUploadModalState({ show: true });
    };

    const FileUploadModalHide = () => {
        setUploadModalState({ show: false });
    };

    // feedback Modal show and hide

    const [itemIdForFeedback, setItemIdForFeedback] = useState();

    const handleTopicFeedback = (id) => {
        setTopicFeedback({ show: true });
        setItemIdForFeedback(id);
        ////console.log(id);
    };

    const TopicFeedbackModalHide = () => {
        setTopicFeedback({ show: false });
    };

    const UrlModalHide = () => {
        setUrlModal({ show: false });
    };

    const [getUrlModal, setUrlModal] = useState({
        show: false,
    });

    const alertMsg = () => {
        swal(t("select"), t("node"), "warning");
    };

    const [getContentDetails, setContentDetails] = useState([]);
    const dirClick = (dirId, dirName) => {
        var togglers = document.querySelectorAll(".caret");
        togglers.forEach((toggler) => {
            toggler.onclick = function () {
                toggler.parentElement
                    .querySelector(".nested")
                    .classList.toggle("active");
                toggler.classList.toggle("caret-down");
            };
        });
    };

    const deleteDirectory = (id) => {
        swal({
            title: t("swal_title"),
            text: t("delete_folder_structure"),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: t('yes_delete'),
            closeOnConfirm: false,
        }).then((isConfirmed) => {
            if (isConfirmed) {
                let data = { lastModifiedBy: UserId, dirParentId: id };
                instructorService.deleteDirectory(data).then(async (res) => {
                    if (res.data === "deleted successfully") {
                        await swal(t("deleted"), t("your_folder_deleted"), "success");
                        instructorService.getFolderStructure(UserId).then((res) => {
                            setFolder(res.data);
                        });
                    }
                });
            }
        });
    };

    const [items, setItems] = useState([]);
    function folderStructureTree() {
        instructorService.getFolderStructure(UserId).then((res) => {
            ////console.log("getFolderStructure ========> ", res.data);
            let menuItems = res.data.map((item, i) => {
                let menuItem = returnMenuItem(item, i);
                return menuItem;
            });
            setItems(menuItems);
        });
        const returnMenuItem = (item, i) => {
            let menuItem;
            if (item.Child.length === 0) {
                menuItem = (
                    <div className="item" key={i}>
                        <div>
                            <span
                                style={
                                    isActiveFolderId == item.Id
                                        ? {
                                            backgroundColor: "#11b67a",
                                            display: "block",
                                            color: "white",
                                            padding: "8px",
                                            border: "1px solid #d3d3d3",
                                            borderRadius: "5px",
                                            marginTop: "8px",
                                            verticalAlign: "middle",
                                            marginRight: "10px",
                                        }
                                        : {
                                            padding: "8px",
                                            display: "block",
                                            border: "1px solid #d3d3d3",
                                            borderRadius: "5px",
                                            marginTop: "8px",
                                            verticalAlign: "middle",
                                            marginRight: "10px",
                                        }
                                }
                                onClick={() => abc1(item.Id, item.Name)}
                            >
                                <i
                                    className="fas fa-folder"
                                    style={
                                        isActiveFolderId == item.Id
                                            ? { fontSize: "18px", color: "white" }
                                            : { fontSize: "18px", color: "black" }
                                    }
                                ></i>
                                <span style={{ marginLeft: "10px" }}>
                                    {item.Name} &nbsp;&nbsp;
                                </span>
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
                                <span
                                    style={
                                        isActiveFolderId == item.Id
                                            ? {
                                                backgroundColor: "#11b67a",
                                                display: "block",
                                                color: "white",
                                                padding: "8px",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                marginRight: "10px",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                marginRight: "10px",
                                            }
                                    }
                                    onClick={() => abc1(item.Id, item.Name)}
                                >
                                    <i
                                        className="fas fa-folder"
                                        style={
                                            isActiveFolderId == item.Id
                                                ? { fontSize: "18px", color: "white" }
                                                : { fontSize: "18px", color: "black" }
                                        }
                                    ></i>
                                    <span
                                        onClick={() => abc1(item.Id, item.Name)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        {item.Name} &nbsp;&nbsp;
                                    </span>
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
    };

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
        );
    };
    const [activeAddModule, setActiveAddModule] = useState(false);
    const handleClickAddModule = () => {
        setActiveAddModule(!activeAddModule);
    };

    const [apiData] = useState([]);
    const [itemsCourse, setItemsCourse] = useState([]);
    function folderStructureTreeCourse() {
        let menuData = [];
        instructorService.getLibraryById(courseId).then((res) => {
            setLibraryOwnUserId(res.data.userId);
            ////console.log("==================>", res.data.courseStructureJson);
            //apiData.push([JSON.parse(res.data.courseStructureJson)]);
            menuData = [JSON.parse(res.data.courseStructureJson)];
            let menuItems = menuData.map((item, i) => {
                let menuItem = returnMenuItem(item, i);
                return menuItem;
            });
            setItemsCourse(menuItems);
        });

        const returnMenuItem = (item, i) => {
            let menuItem;
            if (item.nodes.length === 0) {
                menuItem = (
                    <div className="item" key={i}>
                        <span
                            style={
                                getColorActiveId == item.id
                                    ? {
                                        backgroundColor: "#11b67a",
                                        display: "block",
                                        color: "white",
                                        padding: "8px",
                                        border: "1px solid #d3d3d3",
                                        borderRadius: "5px",
                                        marginTop: "8px",
                                        verticalAlign: "middle",
                                        marginRight: "10px",
                                    }
                                    : {
                                        padding: "8px",
                                        display: "block",
                                        border: "1px solid #d3d3d3",
                                        borderRadius: "5px",
                                        marginTop: "8px",
                                        verticalAlign: "middle",
                                        marginRight: "10px",
                                    }
                            }
                            onClick={() => [
                                menuData.map((itemTopic) => {
                                    // if (itemTopic.id === item.id) {
                                    //     globalState.length = 0;
                                    //     globalState.push(itemTopic.label);
                                    //     setIsActive({ folder: itemTopic.label, file: item.id });
                                    //     // if(itemTopic.nodetype == "root"){
                                    //     //     handleClickAddModule();
                                    //     // }
                                    // }
                                    itemTopic.nodes.map((itemContent) => {
                                        if (itemContent.id === item.id) {
                                            globalState.length = 0;
                                            globalState.push(itemTopic.label, itemContent.label);
                                            setIsActive({ folder: itemContent.label, file: item.id });
                                            // if(itemContent.nodetype == "root"){
                                            //     handleClickAddModule();
                                            // }
                                        }
                                        // itemContent.nodes &&
                                        //     itemContent.nodes.map((itemtype) => {
                                        //         if (itemtype.id === item.id) {
                                        //             globalState.length = 0;
                                        //             globalState.push(itemTopic.label, itemContent.label, itemtype.label);
                                        //             setIsActive({ folder: itemContent.label, file: item.id });
                                        //             // if(itemtype.nodetype == "root"){
                                        //             //     handleClickAddModule();
                                        //             // }
                                        //         }
                                        //     });
                                    });
                                }),
                                folderColorChangeHandler(item.id),
                            ]}
                        >
                            <i
                                className={
                                    item.nodetype == "pdf"
                                        ? "fas fa-file-pdf fa-lg"
                                        : item.nodetype == "png" || item.nodetype == "jpg"
                                            ? "fas fa-image fa-lg"
                                            : item.nodetype == "zip"
                                                ? "fas fa-file-archive fa-lg"
                                                : item.nodetype == "scorm"
                                                    ? "fas fa-file-archive fa-lg"
                                                    : item.nodetype == "html"
                                                        ? "fab fa-html5 fa-lg"
                                                        : item.nodetype == "youtube"
                                                            ? "fab fa-youtube fa-lg"
                                                            : item.nodetype == "mp4"
                                                                ? "fas fa-video fa-lg"
                                                                : item.nodetype == "folder"
                                                                    ? "fas fa-folder fa-lg"
                                                                    : item.nodetype == "root"
                                                                        ? "fas fa-house-user fa-lg"
                                                                        : "fas fa-folder"
                                }
                                style={
                                    isActiveFolderId == item.id
                                        ? { fontSize: "18px", color: "white" }
                                        : { fontSize: "18px", color: "black" }
                                }
                            ></i>
                            <span style={{ marginLeft: "10px" }}>
                                {item.label} &nbsp;&nbsp;
                            </span>
                            {item.nodetype == "root" ? (
                                <span style={{ position: "relative", float: "right" }}>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id="tooltip-disabled">
                                                {t("add_content_files")}
                                            </Tooltip>
                                        }
                                    >
                                        <a class="hover-fx1" onClick={() => dmsUIVisible(item.id)}>
                                            <i
                                                className="fa fa-file"
                                                style={{
                                                    color: "#f0ad4e",
                                                    background: "rgba(2, 230, 147, 0.6)",
                                                }}
                                            ></i>
                                        </a>
                                    </OverlayTrigger>

                                    {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Module/Topic</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => { AddModuleModalShow(item.id); handleClickAddModule(); }} ><i className="fas fa-folder-plus" style={activeAddModule ? { color: "white" } : { color: "#015e3c" }}></i></a>
                                    style={activeAddModule ? {color: "white"} : {color:"#5cb85c"}
                                </OverlayTrigger> */}
                                </span>
                            ) : item.nodetype == "folder" ? (
                                <span style={{ position: "relative", float: "right" }}>
                                    {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Youtube Video</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => handleModal()}><i className="fa fa-youtube-play" style={{ color: '#f0ad4e', fontSize:'36px'}}></i></a>
                                </OverlayTrigger> */}
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id="tooltip-disabled">
                                                {t("add_content_files")}
                                            </Tooltip>
                                        }
                                    >
                                        <a class="hover-fx1" onClick={() => dmsUIVisible(item.id)}>
                                            <i
                                                className="fa fa-file"
                                                style={{
                                                    color: "#f0ad4e",
                                                    background: "rgba(2, 230, 147, 0.6)",
                                                }}
                                            ></i>
                                        </a>
                                    </OverlayTrigger>
                                    {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Access Restriction</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => addAccessRestriction()}><i className="fas fa-lock" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                    {item.userId === UserId && (
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id="tooltip-disabled">{t("edit")}</Tooltip>
                                            }
                                        >
                                            <a
                                                class="hover-fx1"
                                                onClick={() =>
                                                    updateFolderOrContent(
                                                        item.id,
                                                        item.label,
                                                        item.publishDate
                                                    )
                                                }
                                            >
                                                <i
                                                    className="fa fa-edit"
                                                    style={{ color: "#f0ad4e" }}
                                                ></i>
                                            </a>
                                        </OverlayTrigger>
                                    )}
                                    {item.userId === UserId && (
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id="tooltip-disabled">{t("remove")}</Tooltip>
                                            }
                                        >
                                            <a
                                                class="hover-fx1"
                                                onClick={() => RemoveContentOrStructure(item.id)}
                                            >
                                                <i
                                                    className="fas fa-trash-alt"
                                                    style={{ color: "#d9534f" }}
                                                ></i>
                                            </a>
                                        </OverlayTrigger>
                                    )}
                                </span>
                            ) : (
                                <span style={{ position: "relative", float: "right" }}>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id="tooltip-disabled">
                                                {t("view_content")}
                                            </Tooltip>
                                        }
                                    >
                                        <a
                                            class="hover-fx1"
                                            onClick={() =>
                                                courseStructurContentView(item.nodetype, item.filePath)
                                            }
                                        >
                                            <i className="fa fa-eye" style={{ color: "#94b8b8" }}></i>
                                        </a>
                                    </OverlayTrigger>
                                    {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Feedback</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => handleTopicFeedback(item.id)}><i className="fas fa-comments" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                    {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Activity Completion</Tooltip>}>
                                    <a class="hover-fx1" onClick={() => addActivityCompletion()}><i className="fas fa-clipboard-check" style={{ color: '#f0ad4e' }}></i></a>
                                </OverlayTrigger> */}
                                    {item.userId === UserId && (
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id="tooltip-disabled">{t("edit")}</Tooltip>
                                            }
                                        >
                                            <a
                                                class="hover-fx1"
                                                onClick={() =>
                                                    updateFolderOrContent(
                                                        item.id,
                                                        item.label,
                                                        item.publishDate
                                                    )
                                                }
                                            >
                                                <i
                                                    className="fa fa-edit"
                                                    style={{ color: "#f0ad4e" }}
                                                ></i>
                                            </a>
                                        </OverlayTrigger>
                                    )}
                                    {item.userId === UserId && (
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id="tooltip-disabled">{t("remove")}</Tooltip>
                                            }
                                        >
                                            <a
                                                class="hover-fx1"
                                                onClick={() => RemoveContentOrStructure(item.id)}
                                            >
                                                <i
                                                    className="fas fa-trash-alt"
                                                    style={{ color: "#d9534f" }}
                                                ></i>
                                            </a>
                                        </OverlayTrigger>
                                    )}
                                </span>
                            )}
                        </span>
                    </div>
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
                                <span
                                    style={
                                        getColorActiveId == item.id
                                            ? {
                                                backgroundColor: "#11b67a",
                                                display: "block",
                                                color: "white",
                                                padding: "8px",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                marginRight: "10px",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                marginRight: "10px",
                                            }
                                    }
                                    onClick={() => [
                                        menuData.map((itemTopic) => {
                                            if (itemTopic.id === item.id) {
                                                globalState.length = 0;
                                                globalState.push(itemTopic.label);
                                                setIsActive({ folder: itemTopic.label, file: item.id });
                                            }
                                            itemTopic.nodes.map((itemContent) => {
                                                if (itemContent.id === item.id) {
                                                    globalState.length = 0;
                                                    globalState.push(itemTopic.label, itemContent.label);
                                                    setIsActive({
                                                        folder: itemContent.label,
                                                        file: item.id,
                                                    });
                                                }
                                            });
                                        }),
                                        folderColorChangeHandler(item.id),
                                    ]}
                                >
                                    <i
                                        className={
                                            item.nodetype == "folder"
                                                ? "fas fa-folder fa-lg"
                                                : item.nodetype == "root"
                                                    ? "fas fa-house-user fa-lg"
                                                    : "fas fa-folder fa-lg"
                                        }
                                        style={
                                            isActiveFolderId == item.id
                                                ? { fontSize: "18px", color: "black" }
                                                : { fontSize: "18px", color: "black" }
                                        }
                                    ></i>
                                    <span style={{ marginLeft: "10px" }}>
                                        {item.label} &nbsp;&nbsp;
                                    </span>
                                    {item.nodetype == "folder" ? (
                                        <span style={{ position: "relative", float: "right" }}>
                                            {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Youtube Video</Tooltip>}>
                                        <a class="hover-fx1" onClick={() => handleModal()}><i className="fab fa-youtube" style={{ color: '#f0ad4e'}}></i></a>
                                        </OverlayTrigger> */}
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-disabled">
                                                        {t("add_content_file")}
                                                    </Tooltip>
                                                }
                                            >
                                                <a
                                                    class="hover-fx1"
                                                    onClick={() => dmsUIVisible(item.id)}
                                                >
                                                    <i
                                                        className="fa fa-file"
                                                        style={{ color: "#f0ad4e" }}
                                                    ></i>
                                                </a>
                                            </OverlayTrigger>
                                            {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Access Restriction</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => addAccessRestriction()}><i className="fas fa-lock" style={{ color: '#f0ad4e' }}></i></a>
                                        </OverlayTrigger> */}
                                            {item.userId === UserId && (
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip id="tooltip-disabled">{t("edit")}</Tooltip>
                                                    }
                                                >
                                                    <a
                                                        class="hover-fx1"
                                                        onClick={() =>
                                                            updateFolderOrContent(
                                                                item.id,
                                                                item.label,
                                                                item.publishDate
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className="fa fa-edit"
                                                            style={{ color: "#f0ad4e" }}
                                                        ></i>
                                                    </a>
                                                </OverlayTrigger>
                                            )}
                                            {item.userId === UserId && (
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip id="tooltip-disabled">
                                                            {t("remove")}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <a
                                                        class="hover-fx1"
                                                        onClick={() => RemoveContentOrStructure(item.id)}
                                                    >
                                                        <i
                                                            className="fas fa-trash-alt"
                                                            style={{ color: "#d9534f" }}
                                                        ></i>
                                                    </a>
                                                </OverlayTrigger>
                                            )}
                                        </span>
                                    ) : item.nodetype == "root" ? (
                                        <span style={{ position: "relative", float: "right" }}>
                                            {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Module/Topic</Tooltip>}>
                                            <a class="hover-fx1" onClick={() => { AddModuleModalShow(item.id); handleClickAddModule(); }} ><i className="fas fa-folder-plus" style={activeAddModule ? { color: "white" } : { color: "#015e3c" }}></i></a>
                                            style={activeAddModule ? {color: "white"} : {color:"#5cb85c"}
                                        </OverlayTrigger> */}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </span>
                            </div>
                        </div>
                        <UncontrolledCollapse
                            className="children"
                            toggler={`#toggle-menu-item-${item.id}`}
                        >
                            {menuItemChildren}
                        </UncontrolledCollapse>
                    </div>
                );
            }
            return menuItem;
        };
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
            <ul class="tree" style={{ marginLeft: "12px" }}>
                {data &&
                    data.map((item) => (
                        <li>
                            <span class="caret" onClick={() => dirClick(item.Id, item.Name)}>
                                <span
                                    style={{ textTransform: "capitalize" }}
                                    onClick={() => abc1(item.Id, item.Name)}
                                >
                                    {item.Name}&nbsp;&nbsp;
                                </span>
                            </span>
                            <OverlayTrigger
                                overlay={<Tooltip id="tooltip-disabled">{t("delete")}</Tooltip>}
                            >
                                <span className="d-inline-block">
                                    <a class="link" href="#">
                                        <i
                                            class="fas fa-trash"
                                            onClick={() => deleteDirectory(item.Id)}
                                            style={{ fontSize: "16px" }}
                                        ></i>
                                    </a>
                                    &nbsp;&nbsp;
                                </span>
                            </OverlayTrigger>
                            <OverlayTrigger
                                overlay={<Tooltip id="tooltip-disabled">{t("edit")}</Tooltip>}
                            >
                                <span className="d-inline-block">
                                    <a class="link" href="#">
                                        <i
                                            class="fas fa-edit"
                                            onClick={() => directoryEdit(item.Id, item.Name)}
                                            style={{ fontSize: "16px" }}
                                        ></i>
                                    </a>
                                </span>
                            </OverlayTrigger>
                            {item.Child && (
                                <ul class="nested">{<Tree1 data={item.Child} />}</ul>
                            )}
                        </li>
                    ))}
            </ul>
        </>
    );

    const Tree = ({ data }) => (
        <ul class="tree">
            {data &&
                data.map((item) => (
                    <li style={{ marginTop: "5px" }}>
                        <span class="caret" onClick={() => dirClick(item.Id, item.Name)}>
                            <span
                                style={{ textTransform: "capitalize" }}
                                onClick={() => abc1(item.Id, item.Name)}
                            >
                                {item.Name}&nbsp;&nbsp;
                            </span>
                        </span>
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
                        {item.Child && <ul class="nested">{<Tree data={item.Child} />}</ul>}
                    </li>
                ))}
        </ul>
    );

    /* Edit Dirctory Code Start Here*/
    const [getDirNameUpdateModal, setDirNameUpdateModal] = useState({
        show: false,
        dirName: "",
        dirParentId: "",
    });
    const FolderNameUpdateModalHide = () => {
        setDirNameUpdateModal({ show: false });
    };
    const directoryEdit = (Id, Name) => {
        setErrorMsg();
        setDirNameUpdateModal({ show: true, dirParentId: Id, dirName: Name });
    };
    const UpdateFolderName = (dirId) => {
        const fname = document.getElementById("folder_name");
        if (fname.value === "") {
            return setErrorMsg(t("enter_folder_name"));
        }
        let dirname = fname.value;
        let data = { dirName: dirname, lastModifiedBy: UserId, dirParentId: dirId };
        instructorService.folderNameUpdate(data).then(async (res) => {
            if (res.status == 200) {
                await swal(t("Updates"), t("folder_updated"), "success");
                instructorService.getFolderStructure(UserId).then((res) => {
                    setFolder(res.data);
                });
                setDirNameUpdateModal({ show: false });
            } else {
                alert("some error");
            }
        });
    };

    /* Edit Dirctory Code End Here*/

    function changeBackgroundOver(e) {
        e.target.style.background =
            "linear-gradient(90deg, #009444 0%, #11B67A 100%)";
    }

    function changeBackgroundOut(e) {
        e.target.style.background =
            "linear-gradient(90deg, #11B67A 0%, #009444 100%)";
    }

    function save(getParentId) {
        const folder_name = document.getElementById("folderName");
        if (folder_name.value === "") {
            return setErrorMsg(t("enter_folder_name"));
        }
        let dirname = folder_name.value;
        if (getParentId.length == 0) {
            let register = { dirName: dirname, lastModifiedBy: UserId };
            instructorService
                .createDirectory(register)
                .then(async (response) => {
                    if (response.status == 201) {
                        await swal(t("created"), t("root_folder_created"), "success");
                        instructorService.getFolderStructure(UserId).then((res) => {
                            setFolder(res.data);
                        });
                        folderStructureTree();
                        setModalState(false);
                        setParentId([]);
                    } else {
                        alert("some error");
                    }
                })
                .catch((err) => {
                    swal(t("error"), t("try_sometimes"), "error");
                });
        } else {
            let register = {
                dirName: dirname,
                lastModifiedBy: UserId,
                dirParentId: getParentId,
            };
            instructorService
                .createChildDirectory(register)
                .then(async (response) => {
                    if (response.status == 200) {
                        await swal(t('created'), t('child_folder_created'), "success");
                        instructorService.getFolderStructure(UserId).then((res) => {
                            setFolder(res.data);
                        });
                        folderStructureTree();
                        setModalState(false);
                        setParentId([]);
                    } else {
                        alert("some error");
                    }
                })
                .catch((err) => {
                    swal(t('error_mesg'), t('try_sometimes'), "error");
                });
        }
    }

    /* File Upload Code */

    const [getabc, setabc] = useState({
        selectedFiles: undefined,
        currentFile: undefined,
        file: "",
    });
    const [checkBox, setCheckBox] = useState(false);
    const [show, setShow] = useState();
    const selectFile = (event) => {
        let fi = document.getElementById("file");
        var files = fi.files;
        for (var i = 0; i < files.length; i++) {
            ////console.log("file type", files[i].type)
            if (
                files[i].type == "application/x-zip-compressed" ||
                files[i].type == "application/zip"
            ) {
                setShow(true);
            } else {
                setShow(false);
            }
            if (
                files[i].type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                files[i].type === "text/plain" ||
                files[i].type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
                swal(t('warning'), t('doc_excel_test_not_support'), "warning");
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
    };
    // const [errorMsg, setErrorMsg] = useState();
    const upload = () => {
        const duration = document.getElementById("duration");
        const file_name = document.getElementById("file_name");
        if (file_name.value === "") {
            return setErrorMsg(t('pls_enter_file_name'));
        }
        if (duration.value === "") {
            return setErrorMsg(t('pls_enter_file_duration'));
        }

        let fileName = file_name.value;
        let durationMin = duration.value;
        let fi = document.getElementById("file");
        if (fi.files.length > 0) {
            for (let i = 0; i <= fi.files.length - 1; i++) {
                const fsize = fi.files.item(i).size;
                const file = Math.round(fsize / 102400);
                // The size of the file.
                if (file >= 102400) {
                    swal(t('warning'), t('file_size_exceeded'), "warning");
                }
            }
        }
        let currentFile = getabc.selectedFiles[0];
        let sig = md5(getabc.selectedFiles[0].size.toString());
        setabc({
            currentFile: currentFile,
        });
        setLoading(true);
        instructorService
            .fileUpload(
                currentFile,
                sig,
                UserId,
                getParentId,
                durationMin,
                fileName,
                checkBox,
                (event) => { }
            )
            .then(async (res) => {
                if (res.status === 200) {
                    setLoading(false);
                    if (res.data === "double-extension-file") {
                        swal(t("error"), t("double-ext-file"), "error");
                    } else if (res.data === "file-sig-error") {
                        swal(t("error"), "Invalid File Error", "error");
                    } else if (res.data === "Uploaded Successfully") {
                        await swal(t("uploaded"), res.data, "success");
                    } else {
                        await swal(t("msg"), res.data, "info");
                    }
                    setUploadModalState({ show: false });
                    instructorService.contentDetails(getParentId, UserId).then((res) => {
                        ////console.log("setContentDetails",res.data);
                        setContentDetails(res.data);
                    });
                    folderStructureTree();
                }
            })
            .catch((err) => {
                setabc({
                    currentFile: undefined,
                });
            });

        setabc({
            selectedFiles: undefined,
        });
    };

    /* File Content Update Code Start */
    const [getFileContentUpdateModalState, setFileContentUpdateModalState] =
        useState({
            show: false,
        });
    const FileContentUpdateModalHide = () => {
        setFileContentUpdateModalState({ show: false });
    };
    const [getFileContentDetails, setFileContentDetails] = useState({
        contentId: "",
        contentName: "",
        contentDuration: "",
    });
    const contentEdit = (contentId, contentName, contentDuration) => {
        setErrorMsg();
        setFileContentDetails({
            contentId: contentId,
            contentName: contentName,
            contentDuration: contentDuration,
        });
        setFileContentUpdateModalState({ show: true });
    };
    const UpdateFileDatails = (contentId, folder_id) => {
        const duration = document.getElementById("duration");
        const file_name = document.getElementById("file_name");
        if (duration.value === "" || file_name === "") {
            return setErrorMsg(t("content_detail"));
        }
        let fileName = file_name.value;
        let durationMin = duration.value;
        let data = {
            contentId: contentId,
            contentName: fileName,
            contentDuration: durationMin,
        };
        instructorService.fileCotentDetailsUpdate(data).then(async (res) => {
            if (res.status == 200) {
                await swal(t("Updates"), t("details_updated"), "success");
                setFileContentUpdateModalState({ show: false });
                instructorService.contentDetails(folder_id, UserId).then((res) => {
                    ////console.log("setContentDetails",res.data);
                    setContentDetails(res.data);
                });
            }
        });
    };
    /* File Content Update Code End */

    /* share url code here start */
    const [getShareUrlData, setShareUrlData] = useState();
    const [ShareUrlModal, setShareUrlModal] = useState({
        show: false,
    });
    const shareUrlModalHide = () => {
        setShareUrlModal({ show: false });
    };
    const ShareUrl = (url) => {
        instructorService.contentAccess(url).then((res) => {
            ////console.log("contentAccess" + res.data);
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
        });
    };
    /* share url code here start */

    const [getUrl, setUrl] = useState();
    const [getContentType, setContentType] = useState();
    const contentView = (contentType, url) => {
        instructorService
            .contentAccess(url)
            .then((res) => {
                setContentType(contentType);
                if (contentType === "pdf") {
                    // This encodes the Actual URL
                    const encrypted = CryptoJS.AES.encrypt(
                        "/" + res.data,
                        "cdac@123"
                    ).toString();
                    const safeEncodedString = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

                    const pdfDomain = "10.244.3.218:8080"
                    const finalSubDomain = pdfDomain + "/" + safeEncodedString

                    //console.log("finalSubDomain", finalSubDomain)

                    setUrl(finalSubDomain);
                } else {
                    setUrl(res.data);
                }
                setContentType(contentType);
                setUrlModal({ show: true });
            })
            .catch((err) => {
                swal(t("error"), t("try_sometimes"), "error");
            });
    };

    const videoJsOptions = {
        autoplay: false,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        width: 1100,
        height: 800,
        controls: true,
        sources: [
            {
                src: `http://10.244.3.218:8080/${getUrl}`,
                type: "video/mp4",
            },
        ],
    };

    const contentDelete = (contentId, folder_id) => {
        swal({
            title: t("swal_title"),
            text: t("u_want_to_delete_content"),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: t('yes_delete'),
            closeOnConfirm: false,
        }).then((isConfirmed) => {
            if (isConfirmed) {
                instructorService.contentDelete(contentId).then(async (res) => {
                    if (res.status == 200) {
                        await swal(t("deleted"), t("your_content_deleted"), "success");
                        instructorService.contentDetails(folder_id, UserId).then((res) => {
                            ////console.log("setContentDetails",res.data);
                            setContentDetails(res.data);
                        });
                    }
                });
            }
        });
    };

    const columns = [
        {
            name: "Name",
            selector: "contentName",
            sortable: true,
            wrap: true,
            width: "145px",
        },
        {
            name: "Type",
            selector: "contentType",
            sortable: true,
            width: "145px",
        },
        {
            name: "Duration",
            selector: "contentDuration",
            sortable: true,
            width: "145px",
        },
        {
            name: "Preview",
            sortable: true,
            width: "145px",
            cell: (row) => (
                <a
                    class="link"
                    href="#"
                    onClick={() => contentView(row.contentType, row.previewUrl)}
                >
                    {row.contentType === "zip" ? (
                        <i
                            class="fas fa-file-archive"
                            style={{ fontSize: "25px", color: "#fdbf00" }}
                        ></i>
                    ) : row.contentType === "pdf" ? (
                        <i
                            class="fas fa-file-pdf"
                            style={{ fontSize: "25px", color: "#b30b00" }}
                        ></i>
                    ) : row.contentType === "jpg" ||
                        row.contentType === "png" ||
                        row.contentType === "jpeg" ? (
                        <i
                            class="fas fa-file-image"
                            style={{ fontSize: "25px", color: "#b2b1ff" }}
                        ></i>
                    ) : row.contentType === "html" ? (
                        <i
                            class="fab fa-html5"
                            style={{ fontSize: "25px", color: "#e54c21" }}
                        ></i>
                    ) : row.contentType === "ogg" ||
                        row.contentType === "webm" ||
                        row.contentType === "mp4" ? (
                        <i
                            class="fas fa-file-video"
                            style={{ fontSize: "25px", color: "#8cee02" }}
                        ></i>
                    ) : row.contentType === "txt" ? (
                        <i
                            class="fas fa-file-alt"
                            style={{ fontSize: "25px", color: "#2766a0" }}
                        ></i>
                    ) : row.contentType === "doc" || row.contentType === "docx" ? (
                        <i
                            class="fas fa-file-word"
                            style={{ fontSize: "25px", color: "#1e62b4" }}
                        ></i>
                    ) : row.contentType === "scorm" ? (
                        <i
                            class="far fa-file-archive"
                            style={{ fontSize: "25px", color: "green" }}
                        ></i>
                    ) : row.contentType === "youtube" ? (
                        <i
                            class="far fa-youtube"
                            style={{ fontSize: "25px", color: "green" }}
                        ></i>
                    ) : null}
                </a>
            ),
        },
        {
            name: "Share Url",
            width: "170px",
            sortable: true,
            cell: (row) => (
                <>
                    {row.contentType === "zip" ? (
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-disabled">{t("click_to_copy")}</Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <a
                                    class="link"
                                    onClick={() => ShareUrl(row.previewUrl)}
                                    href="#"
                                >
                                    <i class="fas fa-link"></i>
                                </a>
                            </span>
                        </OverlayTrigger>
                    ) : row.contentType === "pdf" ? (
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-disabled">{t("click_to_copy")}</Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <CopyToClipboard text={getShareUrlData}>
                                    <a
                                        class="link"
                                        onClick={() => ShareUrl(row.previewUrl)}
                                        href="#"
                                    >
                                        <i class="fas fa-link"></i>
                                    </a>
                                </CopyToClipboard>
                            </span>
                        </OverlayTrigger>
                    ) : row.contentType === "jpg" ||
                        row.contentType === "png" ||
                        row.contentType === "jpeg" ? (
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-disabled">{t("click_to_copy")}</Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <a
                                    class="link"
                                    onClick={() => ShareUrl(row.previewUrl)}
                                    href="#"
                                >
                                    <i class="fas fa-link"></i>
                                </a>
                            </span>
                        </OverlayTrigger>
                    ) : row.contentType === "html" ? (
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-disabled">{t("click_to_copy")}</Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <a
                                    class="link"
                                    onClick={() => ShareUrl(row.previewUrl)}
                                    href="#"
                                >
                                    <i class="fas fa-link"></i>
                                </a>
                            </span>
                        </OverlayTrigger>
                    ) : row.contentType === "ogg" ||
                        row.contentType === "webm" ||
                        row.contentType === "mp4" ? (
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-disabled">{t("click_to_copy")}</Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <a
                                    class="link"
                                    onClick={() => ShareUrl(row.previewUrl)}
                                    href="#"
                                >
                                    <i class="fas fa-link"></i>
                                </a>
                            </span>
                        </OverlayTrigger>
                    ) : row.contentType === "txt" ? (
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-disabled">{t("click_to_copy")}</Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <a
                                    class="link"
                                    onClick={() => ShareUrl(row.previewUrl)}
                                    href="#"
                                >
                                    <i class="fas fa-link"></i>
                                </a>
                            </span>
                        </OverlayTrigger>
                    ) : row.contentType === "doc" || row.contentType === "docx" ? (
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-disabled">{t("click_to_copy")}</Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <a
                                    class="link"
                                    onClick={() => ShareUrl(row.previewUrl)}
                                    href="#"
                                >
                                    <i class="fas fa-link"></i>
                                </a>
                            </span>
                        </OverlayTrigger>
                    ) : row.contentType === "scorm" ? (
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-disabled">{t("click_to_copy")}</Tooltip>
                            }
                        >
                            <span className="d-inline-block">
                                <a
                                    class="link"
                                    onClick={() => ShareUrl(row.previewUrl)}
                                    href="#"
                                >
                                    <i class="fas fa-link"></i>
                                </a>
                            </span>
                        </OverlayTrigger>
                    ) : null}
                </>
            ),
        },
    ];

    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] =
        React.useState(false);
    const filteredItems = getContentDetails.filter(
        (item) =>
            JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
            -1
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
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    /* Course Structure Create Code End */

    const courseStructurContentView = (contentType, fileUrl) => {
        if (contentType == "youtube") {
            setYouTubeUrl(fileUrl);
            setContentType(contentType);
            setUrlModal({ show: true });
        } else {
            instructorService
                .contentAccess("http://10.244.3.218:8080/" + fileUrl)
                .then((res) => {
                    if (contentType === "pdf") {
                        // This encodes the Actual URL
                        const encrypted = CryptoJS.AES.encrypt(
                            "/" + res.data,
                            "cdac@123"
                        ).toString();
                        const safeEncodedString = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

                        const pdfDomain = "10.244.3.218:8080"
                        const finalSubDomain = pdfDomain + "/" + safeEncodedString

                        //console.log("finalSubDomain", finalSubDomain)

                        setUrl(finalSubDomain);
                    } else {
                        setUrl(res.data);
                    }
                    setContentType(contentType);
                    setUrlModal({ show: true });
                    //window.open("http://10.244.3.218:8080/" + res.data, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1000,height=1000");
                })
                .catch((err) => {
                    swal(t('error_mesg'),t('try_sometimes'), "error");
                });
        }
    };

    const dmsUIVisible = (id) => {
        setCourseStructureFolderId(id);
        setToggle(true);
    };

    const [toggle, setToggle] = useState(false);
    let [getCourseStructureFolderId, setCourseStructureFolderId] = useState();

    /* dataTable Check box Code  */

    const toDateTime = (dateFormat) => {
        var date = new Date(dateFormat);
        var str = "";
        var year, month, day, hour, min, sec;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        day = date.getDate();
        day = day < 10 ? "0" + day : day;
        hour = date.getHours();
        hour = hour < 10 ? "0" + hour : hour;
        min = date.getMinutes();
        min = min < 10 ? "0" + min : min;
        sec = date.getSeconds();
        sec = sec < 10 ? "0" + sec : sec;

        str += year + "-" + month + "-" + day;
        str += " " + hour + ":" + min + ":" + sec;
        return str;
    };

    const [selectedRows, setSelectedRows] = React.useState([]);
    const handleRowSelected = React.useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const newArr = selectedRows.map(
        ({
            contentId,
            lastModifiedDate,
            lastUpdatedBy,
            publishStatus,
            shareUrl,
            streamingStatus,
            uploadDate,
            userId,
            ...rest
        }) => {
            ////console.log(rest.previewUrl);
            let originalUrl = rest.previewUrl;
            let newPath = originalUrl.replace("http://10.244.3.218:8080/", "");
            rest["filepath"] = newPath;
            rest["publishDate"] = toDateTime(startDate);
            rest["cname"] = rest["contentName"];
            rest["topicDuration"] = rest["contentDuration"];
            rest["pcontentId"] = contentId;
            delete rest["contentName"];
            delete rest["contentDuration"];
            delete rest["previewUrl"];
            return rest;
        }
    );
    newArr.map(
        (i) => (
            (i.categoryType = getCourseDetails.categoryName),
            (i.courseId = courseId),
            (i.userId = UserId),
            (i.itemId = getCourseStructureFolderId),
            (i.description = "Basic desc")
        )
    );

    /* dataTable Check box Code End here  */

    const AddContentToCourseStructure = (arrayData, id) => {
        if (id === undefined) {
            swal(t("select"), t("select_node_in_course_structure"), "warning");
        } else {
            setLoading(true);
            instructorService
                .addContentToCourseStructure(arrayData)
                .then(async (res) => {
                    if (res.data === "Content added successfully!!") {
                        await swal(t("success"), t("content_added"), "success");
                        setLoading(false);
                        setToggle(false);
                        instructorService.getLibraryById(courseId).then((res) => {
                            setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                        });
                        folderStructureTreeCourse();
                    }
                })
                .catch((err) => {
                    //console.log(err);
                });
        }
    };

    // feedback content link

    /* Add Module or topic code start here */
    let a = new Date().toISOString().split(".")[0];

    const [getModuleModalState, setModuleModalState] = useState({
        show: false,
    });

    const AddModuleModalShow = (id) => {
        setCourseStructureFolderId(id);
        setModuleModalState({ show: true });
    };
    const AddModuleModalHide = () => {
        setModuleModalState({ show: false });
    };

    const AddModule = (id) => {
        setErrorMsg();
        const module_name = document.getElementById("module_name");
        if (startDate === null) {
            return setErrorMsg(t("pls_publish_date"));
        }
        if (module_name.value === "") {
            return setErrorMsg(t("enter_folder_name"));
        } else {
            let data = {
                dirParentId: id,
                dirName: module_name.value,
                publishDate: toDateTime(startDate),
                lastModifiedBy: UserId,
            };
            instructorService
                .addModuleOrTopic(data)
                .then(async (res) => {
                    if (res.status == 200) {
                        await swal(t("success"), t("fold_add"), "success");
                        setModuleModalState({ show: false });
                        setCourseStructureJson(res.data);
                        folderStructureTreeCourse();
                    }
                })
                .catch((err) => {
                    //console.log(err);
                });
        }
    };
    /* Add Module or topic code end here */

    /* Update Module or topic or content details code start here */
    const [getFolderOrContentDetUpdate, setFolderOrContentDetUpdate] = useState({
        show: false,
    });
    const [getPdate, setPdate] = useState();
    const updateFolderOrContent = (id, name, pDate) => {
        setErrorMsg("");
        setPdate(pDate);
        setFolderOrContentDetUpdate({
            show: true,
            id: id,
            name: name,
        });
    };
    const UpdateContentOrFolderModalHide = () => {
        setFolderOrContentDetUpdate({ show: false });
    };

    const updateContentOrModule = (id) => {
        const module_name = document.getElementById("module_name");
        const publishDate = getPdate;
        if (module_name.value === "") {
            return setErrorMsg(t('pls_publish_folder'));
        }
        if (publishDate === "") {
            return setErrorMsg(t('pls_publish_date'));
        } else {
            if (Number.isInteger(parseInt(id))) {
                let data = {
                    contentId: id,
                    courseId: courseId,
                    cname: module_name.value,
                    description: "For frontend development",
                    publishDate: toDateTime(publishDate),
                    userId: UserId,
                };
                instructorService.updateContentDetails(data).then(async (res) => {
                    if (res.status == 200) {
                        await swal(
                            t('success_swal'),
                            t('content_updated'),
                            "success"
                        );
                        setFolderOrContentDetUpdate({ show: false });
                        setCourseStructureJson(res.data);
                        folderStructureTreeCourse();
                    }
                });
            } else {
                let data = {
                    dirParentId: id,
                    dirName: module_name.value,
                    lastModifiedBy: UserId,
                    publishDate: toDateTime(publishDate),
                };
                instructorService.updateFolderDetails(data).then(async (res) => {
                    if (res.status == 200) {
                        await swal( t('success_swal'), t('folder_updated'), "success");
                        setFolderOrContentDetUpdate({ show: false });
                        setCourseStructureJson(res.data);
                        folderStructureTreeCourse();
                    }
                });
            }
        }
    };

    /* Update Module or topic or content details code end here */

    /* delete course content or remove structure */

    const RemoveContentOrStructure = (contentId) => {
        if (Number.isInteger(parseInt(contentId))) {
            swal({
                title: t("swal_title"),
                text: t("u_want_to_delete_content"),
                icon: "warning",
                buttons: [t('no_cancel'), t('yes_delete')],
                dangerMode: true,
            }).then(function (isConfirm) {
                if (isConfirm) {
                    instructorService
                        .deleteCourseContent({
                            contentId: contentId,
                            courseId: courseId,
                            userId: UserId,
                        })
                        .then(async (res) => {
                            if (res.data === "Content deleted successfully !!") {
                                await swal(t("deleted"), t("content_deleted"), "success");
                                instructorService.getLibraryById(courseId).then((res) => {
                                    setCourseStructureJson(
                                        JSON.parse(res.data.courseStructureJson)
                                    );
                                });
                                folderStructureTreeCourse();
                            }
                        })
                        .catch((err) => {
                            //console.log(err);
                        });
                }
            });
        } else {
            swal({
                title: t("swal_title"),
                text: t("u_want_to_delete_folder"),
                icon: "warning",
                buttons: [t('no_cancel'), t('yes_delete')],
                dangerMode: true,
            }).then(function (isConfirm) {
                if (isConfirm) {
                    instructorService
                        .deleteCourseStructureChild({
                            dirParentId: contentId,
                            lastModifiedBy: UserId,
                        })
                        .then(async (res) => {
                            if (res.data === "deleted successfully") {
                                await swal(
                                    t('deleted'),
                                    t('course_structure_folder_deleted'),
                                    "success"
                                );
                                instructorService.getLibraryById(courseId).then((res) => {
                                    setCourseStructureJson(
                                        JSON.parse(res.data.courseStructureJson)
                                    );
                                });
                                folderStructureTreeCourse();
                            }
                        })
                        .catch((err) => {
                            //console.log(err);
                        });
                }
            });
        }
    };

    /* Course Publish Function */
    const publishCourseButton = (cId) => {
        instructorService
            .LibraryPublish(cId)
            .then(async (res) => {
                // if (res.data === "Course Published Successfully!!") {
                if (res.status === 200) {
                    await swal(t('success'), t('request_send'), "success").then(
                        () => {
                            window.location.reload();
                        }
                    );
                    instructorService.getLibraryById(courseId).then((res) => {
                        setCourseDetails(res.data);
                        setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                    });
                } else {
                    //console.log("err");
                }
            })
            .catch((err) => {
                //console.log(err);
            });
    };

    const requestforpublishLibraryButton = (cId) => {
        setLoading(true);
        instructorService
            .libraryPublishAdminRequest(cId)
            .then(async (res) => {
                // if (res.data === "Course Published Successfully!!") {
                if (res.status === 200) {
                    await swal(t("success"), t("request_send"), "success");
                    setLoading(false);
                    fatchCourseData();
                    instructorService.getLibraryById(courseId).then((res) => {
                        setCourseDetails(res.data);
                        setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                    });
                } else {
                    setLoading(false);
                    //console.log("err");
                }
            })
            .catch((err) => {
                //console.log(err);
            });
    };

    const requestforpublishContentButton = (cId) => {
        setLoading(true);
        instructorService
            .ContentPublishAdminRequest(cId)
            .then(async (res) => {
                // if (res.data === "Course Published Successfully!!") {
                if (res.status === 200) {
                    await swal(t("success"), t("request_send"), "success");
                    setLoading(false);
                    fatchCourseData();
                    instructorService.getLibraryById(courseId).then((res) => {
                        setCourseDetails(res.data);
                        setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                    });
                } else {
                    setLoading(false);
                    //console.log("err");
                }
            })
            .catch((err) => {
                //console.log(err);
            });
    };

    const requestforDisableLibraryButton = (cid) => {
        instructorService
            .LibraryDisableStatus(cid)
            .then(async (res) => {
                await swal(t("success"), t('library_disable_msg'), "success");
            })
            .catch((err) => {
                //console.log("err");
            });
    };

    /* course unpublish funcation */
    const unPublishCourseButton = (cId) => {
        instructorService
            .libraryUnPublish(cId)
            .then(async (res) => {
                if (res.data === "Course UnPublished Successfully!!") {
                    await swal(
                        t("success"),
                        t('course_unpublished'),
                        "success"
                    ).then(() => {
                        window.location.reload();
                    });
                    instructorService.getLibraryById(courseId).then((res) => {
                        setCourseDetails(res.data);
                        setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                    });
                } else {
                    //console.log("err");
                }
            })
            .catch((err) => {
                //console.log(err);
            });
    };

    /* course Disable funcation */
    const disableCourseButton = (cId) => {
        instructorService
            .LibraryDisable(cId)
            .then(async (res) => {
                if (res.data === "Course Disabled Successfully!!") {
                    await swal(
                        t("success"),
                        t('course_disabled'),
                        "success"
                    ).then(() => {
                        window.location.reload();
                    });
                    instructorService.getLibraryById(courseId).then((res) => {
                        setCourseDetails(res.data);
                        setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                    });
                } else {
                    //console.log("err");
                }
            })
            .catch((err) => {
                //console.log(err);
            });
    };

    const [headerState, setHeaderState] = useState({
        id: UserService.getUserid(),
        img: um_api + "getprofilepic/",
    });

    /* this code is for  announcement creation and view */

    /* this code end announcement creation and view */

    /* this code is for  feedback handle submit */

    /* this code is for  feedback handle submit */

    /* this code is for  feedback question handle submit */

    return (
        <div
            className="main-wrapper course-details-page"
            onLoad={() => scrollWin()}
        >
            {/* Header 2 */}
            <HeaderTwo />
            {/* Breadcroumb */}
            <BreadcrumbBox
                title={getCourseDetails.courseName}
                bannerUrl={`http://10.244.3.218:8082/${getCourseDetails.banner}`}
            />

            <Styles>
                {/* Course Details */}
                <section className="course-details-area" id="Main">
                    <Container>
                        <div className="course-details-top">
                            {/* <Col lg="8" md="7" sm="12"> */}

                            <div className="child1">
                                <div className="heading">
                                    <h4 style={{ textTransform: "capitalize" }}>
                                        {getCourseDetails.courseName}
                                    </h4>
                                </div>
                                <div className="course-top-overview">
                                    <div className=" overviews">
                                        <Row>
                                            {/* <Col sm='12' xs='12' lg='4' xl='4'>
                                                <div className='d-flex'>
                                                    <div className="author">
                                                        <Row>

                                                            <img src={`${headerState.img}${headerState.id}`} alt="" />
                                                            <div className="author-name">
                                                                <h6>{t('author')}</h6>
                                                                <p>{UserService.getUsername()}</p>
                                                            </div>
                                                        </Row>
                                                    </div>
                                                    <div className="category">
                                                        <h6>{t('cat')}</h6>
                                                        <p>{getCourseDetails.categoryName}</p>
                                                    </div>
                                                </div>
                                            </Col> */}
                                            <Col sm="12" xs="12" lg="8" xl="8">
                                                <div className="course-details-banner">
                                                    <img
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            `http://10.244.3.218:8082/${getCourseDetails.imageUrl}`
                                                        }
                                                        alt="Course Image"
                                                        style={{ height: "300px", width: "800px" }}
                                                        className="img-fluid"
                                                    />
                                                </div>
                                            </Col>
                                            {/* <div className="rating">
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
                                            </div> */}
                                            {/* <div className="price">
                                            <h6>Price</h6>
                                            <p>{fee_validator(getCourseDetails.courseFee)}</p>
                                        </div> */}

                                            <Col sm="12" xs="12" lg="4" xl="4">
                                                <div className="single-details-sidbar">
                                                    <Row>
                                                        <Col md="12">
                                                            <div className="course-details-feature">
                                                                <h5 className="title">
                                                                    {t("instructor_action")}
                                                                </h5>
                                                                {/* <div className="event-sidebar-timer text-center">
                                                    <Timer initialTime={1040 * 970 * 980} direction="backward">
                                                        <p><Timer.Days /><span>Days</span></p>
                                                        <p><Timer.Hours /><span>Hours</span></p>
                                                        <p><Timer.Minutes /><span>Minutes</span></p>
                                                    </Timer>
                                                </div> */}
                                                                {/* <ul className="list-unstyled feature-list">
                                                    <li><i className="far fa-calendar-check"></i> {t('enrollment_start_date')}: <span>{convertDate(getCourseDetails.enrollStartDate)}</span></li>
                                                    <li><i className="far fa-calendar-check"></i> {t('enrollment_end_date')}: <span>{convertDate(getCourseDetails.enrollEndDate)}</span></li>
                                                    <li><i className="far fa-calendar-check"></i> {t('course_Publish_Date')}: <span>{convertDate(getCourseDetails.publishDate)}</span></li>
                                                    <li><i className="far fa-calendar-check"></i> Commence Date: <span>{convertDate(getCourseDetails.commenceDate)}</span></li>
                                                    <li><i className="far fa-calendar-check"></i> Closing Date: <span>{convertDate(getCourseDetails.closingDate)}</span></li>
                                                    <li><i className="far fa-clock"></i> {t('duration')}: <span>{getCourseDetails.duration == 1825 ? "Unlimited" : getCourseDetails.duration} Days</span></li>
                                                    <li><i className="fas fa-globe-asia"></i> {t('language1')}: <span>{t('english')}</span></li>
                                                    <li><i className="far fa-bookmark"></i> {t('enrolled')}: <span>{userCount}</span></li>
                                                    <li><i className="fas fa-certificate"></i> {t('certification')}: <span>{t('yes')}</span></li>
                                                </ul> */}
                                                                <ul className="feature-list">
                                                                    {getCourseDetails.status === "C" ? (
                                                                        <>
                                                                            {/* <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Library</button></li> */}
                                                                            {getLoading !== true ? (
                                                                                <>
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                requestforpublishLibraryButton(
                                                                                                    courseId
                                                                                                )
                                                                                            }
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            {t("request_publish_library")}
                                                                                        </button>
                                                                                    </li>
                                                                                    <div className="alert alert-danger mt-2">
                                                                                        {t("library_not_published")}
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            <div
                                                                                                class="spinner-border"
                                                                                                role="status"
                                                                                            >
                                                                                                <span class="sr-only">
                                                                                                    {t("loading")}
                                                                                                </span>
                                                                                            </div>
                                                                                        </button>
                                                                                    </li>
                                                                                </>
                                                                            )}

                                                                            {getLibraryOwnUserId === UserId &&
                                                                                getNoOfContents === 0 && (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                requestforDisableLibraryButton(
                                                                                                    courseId
                                                                                                )
                                                                                            }
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            {t('disable_library')}
                                                                                        </button>
                                                                                    </li>
                                                                                )}
                                                                        </>
                                                                    ) : getCourseDetails.status === "P" ? (
                                                                        <>
                                                                            {/* {getLibraryOwnUserId === UserId &&
                                                                                (userCount == 0 ? (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                unPublishCourseButton(courseId)
                                                                                            }
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            UnPublish Library
                                                                                        </button>
                                                                                    </li>
                                                                                ) : null)} */}
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        requestforpublishContentButton(
                                                                                            courseId
                                                                                        )
                                                                                    }
                                                                                    className="enroll-btn"
                                                                                >
                                                                                   {t('req_to_publish')}
                                                                                </button>
                                                                            </li>

                                                                            {getLibraryOwnUserId === UserId &&
                                                                                getNoOfContents === 0 && (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                requestforDisableLibraryButton(
                                                                                                    courseId
                                                                                                )
                                                                                            }
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            {t('disable_library')}
                                                                                        </button>
                                                                                    </li>
                                                                                )}

                                                                            <h6 style={{ textAlign: "center" }}>
                                                                                {t("library_published_on")}{" "}
                                                                                {publishedDate(
                                                                                    getCourseDetails.publishDate
                                                                                )}
                                                                            </h6>
                                                                            {/* <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Library</button></li>
                                                                                    <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">Request to Publish Library</button></li> */}
                                                                        </>
                                                                    ) : getCourseDetails.status === "U" ? (
                                                                        <>
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        requestforpublishLibraryButton(
                                                                                            courseId
                                                                                        )
                                                                                    }
                                                                                    className="enroll-btn"
                                                                                >
                                                                                    {t('request_publish_library')}
                                                                                </button>
                                                                            </li>
                                                                            {/* <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Library</button></li>
                                                                        <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">Request to Publish Library</button></li> */}
                                                                            {getLibraryOwnUserId === UserId &&
                                                                                getNoOfContents === 0 && (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                requestforDisableLibraryButton(
                                                                                                    courseId
                                                                                                )
                                                                                            }
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            {t('disable_library')}
                                                                                        </button>
                                                                                    </li>
                                                                                )}
                                                                        </>
                                                                    ) : getCourseDetails.status === "D" ? (
                                                                        <>
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        requestforpublishLibraryButton(
                                                                                            courseId
                                                                                        )
                                                                                    }
                                                                                    className="enroll-btn"
                                                                                >
                                                                                    {t('request_publish_library')}
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        requestforpublishLibraryButton(
                                                                                            courseId
                                                                                        )
                                                                                    }
                                                                                    className="enroll-btn"
                                                                                >
                                                                                    {t('enable_library')}
                                                                                </button>
                                                                            </li>
                                                                        </>
                                                                    ) : getCourseDetails.status === "R" ? (
                                                                        <>
                                                                            {/* {userCount == 0 ? <li><button type="button" onClick={() => unPublishCourseButton(courseId)} className="enroll-btn">UnPublish Library</button></li> : null} */}
                                                                            {/* <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Library</button></li> */}
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    disabled
                                                                                    className="enroll-btn"
                                                                                    style={{
                                                                                        width: "100%",
                                                                                        height: "100%",
                                                                                    }}
                                                                                >
                                                                                    {t("request_yet_to_approve_by_admin")}
                                                                                </button>
                                                                            </li>
                                                                            {getLibraryOwnUserId === UserId &&
                                                                                getNoOfContents === 0 && (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                requestforDisableLibraryButton(
                                                                                                    courseId
                                                                                                )
                                                                                            }
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            {t('disable_library')}
                                                                                        </button>
                                                                                    </li>
                                                                                )}
                                                                        </>
                                                                    ) : getCourseDetails.status === "N" ? (
                                                                        <>
                                                                            {/* {getLibraryOwnUserId === UserId &&
                                                                                (userCount == 0 ? (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                unPublishCourseButton(courseId)
                                                                                            }
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            UnPublish Library
                                                                                        </button>
                                                                                    </li>
                                                                                ) : null)} */}
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        requestforpublishContentButton(
                                                                                            courseId
                                                                                        )
                                                                                    }
                                                                                    className="enroll-btn"
                                                                                >
                                                                                    {t('req_to_publish')}
                                                                                </button>
                                                                            </li>

                                                                            {getLibraryOwnUserId === UserId &&
                                                                                getNoOfContents === 0 && (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                requestforDisableLibraryButton(
                                                                                                    courseId
                                                                                                )
                                                                                            }
                                                                                            className="enroll-btn"
                                                                                        >
                                                                                            {t('disable_library')}
                                                                                        </button>
                                                                                    </li>
                                                                                )}

                                                                            <h6 style={{ textAlign: "center" }}>
                                                                                {t("library_published_on")}{" "}
                                                                                {publishedDate(
                                                                                    getCourseDetails.publishDate
                                                                                )}
                                                                            </h6>
                                                                            {/* <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Library</button></li>
                                                                                    <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">Request to Publish Library</button></li> */}
                                                                        </>
                                                                    ) : null}
                                                                </ul>
                                                                {/* <ul className="list-unstyled feature-list">
                                                    {getCourseStructureJson.lastPublishedDate == undefined ? null :
                                                        <li>Last Published Date: <span>{getCourseStructureJson.lastPublishedDate}</span></li>
                                                    }
                                                </ul> */}
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
                                            </Col>
                                        </Row>

                                        {/* <div className="author">
                                            <img src={`${headerState.img}${headerState.id}`} alt="" />
                                            <div className="author-name">
                                                <h6>Author</h6>
                                                <p>{UserService.getUsername()}</p>
                                            </div>
                                        </div>
                                        <div className="category">
                                            <h6>Category</h6>
                                            <p>{getCourseDetails.categoryName}</p>
                                        </div> */}
                                        {/* <div className="rating">
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
                                            </div> */}
                                        {/* <div className="price">
                                            <h6>Price</h6>
                                            <p>{fee_validator(getCourseDetails.courseFee)}</p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            {/* <Col lg="4" md="5" sm="12"></Col> */}
                            <div className="child2"></div>
                        </div>
                    </Container>
                </section>
                <section className="course-details-area" id="Tab">
                    <Container>
                        <div className="course-tab-list">
                            <Tab.Container defaultActiveKey="curriculum">
                                <Nav className="flex-column" onClick={scrollToView}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="curriculum">
                                            {t("add_content")}
                                        </Nav.Link>
                                    </Nav.Item>
                                    {/* <Nav.Item>
                                        <Nav.Link eventKey="instructor">Instructor</Nav.Link>
                                    </Nav.Item> */}
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="curriculum" className="curriculum-tab">
                                        <br></br>
                                        <div className="course-curriculum">
                                            <div
                                                class="btn-group btn-breadcrumb"
                                                style={{
                                                    border: "1px solid #d3d3d3",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <a class="btn btn-default">
                                                    <i class="fas fa-house-user fa-lg"></i>
                                                </a>
                                                <Breadcrumb />
                                            </div>
                                            <div className="items"> {itemsCourse}</div>
                                        </div>
                                        {toggle && (
                                            <>
                                                <br></br>
                                                <div class="shadow-lg bg-body rounded">
                                                    <nav
                                                        class="navbar navbar-expand-lg navbar-light bg-light"
                                                        style={{ borderBottom: "1px inset" }}
                                                    >
                                                        <div class="container-fluid">
                                                            <div
                                                                class="collapse navbar-collapse"
                                                                id="navbarNavAltMarkup"
                                                            >
                                                                <div class="navbar-nav">
                                                                    <a class="nav-link">
                                                                        {t("my_files")} &nbsp;&nbsp;
                                                                        <i className="fa fa-angle-right"></i>
                                                                    </a>
                                                                    {getFolderName == null ? null : (
                                                                        <a
                                                                            class="nav-link"
                                                                            href="#"
                                                                            style={{ textTransform: "capitalize" }}
                                                                        >
                                                                            <i className="fa fa-folder-open"></i>{" "}
                                                                            &nbsp;&nbsp;{getFolderName}
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </nav>
                                                </div>

                                                <div style={{ marginLeft: "10px" }} className="items">
                                                    {items}
                                                </div>

                                                <div class="shadow-lg p-3 bg-body rounded">
                                                    {getContentDetails.length == 0 ? (
                                                        <p
                                                            style={{
                                                                textAlign: "center",
                                                                marginTop: "15px",
                                                                fontSize: "20px",
                                                            }}
                                                        >
                                                            {t("no_records_to_display")}
                                                        </p>
                                                    ) : (
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

                                                            <Row style={{ marginBottom: "15px" }}>
                                                                <Col style={{ textAlign: "center" }}>
                                                                    {selectedRows.length == 0 ? (
                                                                        <DatePicker
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
                                                                    ) : (
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
                                                                    )}
                                                                </Col>
                                                                <Col style={{ textAlign: "center" }}>
                                                                    {selectedRows.length == 0 ? (
                                                                        <Button disabled>{t("add")}</Button>
                                                                    ) : (
                                                                        <>
                                                                            {getLoading !== true ? (
                                                                                <>
                                                                                    <Button
                                                                                        onClick={() =>
                                                                                            AddContentToCourseStructure(
                                                                                                newArr,
                                                                                                getCourseStructureFolderId
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {t("add")}
                                                                                    </Button>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <Button>
                                                                                        <div
                                                                                            class="spinner-border"
                                                                                            role="status"
                                                                                        >
                                                                                            <span class="sr-only">
                                                                                                {t("loading")}
                                                                                            </span>
                                                                                        </div>
                                                                                    </Button>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="instructor" className="instructor-tab">
                                        <h5>{t("course_instructor")}</h5>
                                        <div className="instructor-box">
                                            <div className="instructor-item">
                                                <Row>
                                                    {/* <Col md='4'> */}
                                                    <div className="instructor-img">
                                                        <img
                                                            src={`${headerState.img}${headerState.id}`}
                                                            alt=""
                                                            className="img-fluid"
                                                            style={{ width: "110px" }}
                                                        />
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
                                                                            <li
                                                                                className="list-inline-item"
                                                                                style={{ margin: 5, marginTop: 10 }}
                                                                            >
                                                                                <a
                                                                                    href={
                                                                                        "https://www.facebook.com/" +
                                                                                        getUserDetails.facebookId
                                                                                    }
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className="fab fa-facebook-f"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li
                                                                                className="list-inline-item"
                                                                                style={{ margin: 5, marginTop: 10 }}
                                                                            >
                                                                                <a
                                                                                    href={
                                                                                        "https://www.twitter.com/" +
                                                                                        getUserDetails.twitterId
                                                                                    }
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className="fab fa-twitter"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li
                                                                                className="list-inline-item"
                                                                                style={{ margin: 5, marginTop: 10 }}
                                                                            >
                                                                                <a
                                                                                    href={
                                                                                        "https://www.linkedin.com/in/" +
                                                                                        getUserDetails.linkedinId
                                                                                    }
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className="fab fa-linkedin-in"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li
                                                                                className="list-inline-item"
                                                                                style={{ margin: 5, marginTop: 10 }}
                                                                            >
                                                                                <a
                                                                                    href={
                                                                                        "https://www.youtube.com/" +
                                                                                        getUserDetails.youtubeId
                                                                                    }
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className="fab fa-youtube"></i>
                                                                                </a>
                                                                            </li>
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

            {/* Folder Creation model code end here*/}

            {/* File upload model code start here*/}
            <Modal
                centered
                show={getUploadModalState.show}
                onHide={() => FileUploadModalHide()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t("upload_documents_files")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div style={{ marginLeft: 10, color: "red" }}>
                            <span>{t("upload_files")}</span>
                        </div>
                        <div style={{ marginLeft: 10, color: "red" }}>
                            <span>{t("required_Files")}</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="name">{t("file_name")} </label>
                            <input
                                type="text"
                                minLength={3}
                                maxLength={50}
                                className="form-control"
                                id="file_name"
                                placeholder={t('pls_enter_file_name')}
                                name="file_name"
                            />
                            <span style={{ color: "red" }}>{errorMsg}</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="name">{t("duration_minutes")} : </label>
                            <input
                                type="number"
                                className="form-control"
                                min="0"
                                max="60"
                                id="duration"
                                placeholder={t('duration_minutes')}
                                name="duration"
                            />
                            <span style={{ color: "red" }}>{errorMsg}</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <input
                                type="file"
                                className="form-control"
                                style={{ height: "37px" }}
                                onChange={selectFile}
                                accept="*"
                                id="file"
                            />
                        </div>
                        {show == true ? (
                            <div class="mb-3 mt-3">
                                <label for="name">{t("scorm_zip")} &nbsp; </label>
                                <input
                                    type="checkbox"
                                    className="form-control"
                                    id="ScormCheckbox"
                                    onClick={() => setCheckBox(true)}
                                    data-toggle="toggle"
                                    data-onstyle="primary"
                                ></input>
                            </div>
                        ) : null}
                        {getLoading ? (
                            <button class="btn btn-success" disabled>
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="sr-only">{t("loading")}</span>
                                </div>{" "}
                                {t("upload")}
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                                disabled={!getabc.selectedFiles}
                                onClick={() => upload()}
                            >
                                {t("upload")}
                            </button>
                        )}
                    </div>
                    {/* <FileUpload userId={props.userId} courseId={props.courseId} tenantId={props.tenantId} assignId={getAssignId} /> */}
                    {/* <FileUpload user_id={UserId} dir_name={getParentId} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setUploadModalState(false)}
                        className="btn btn-danger"
                    >
                        {t('close')}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* File upload model code end here*/}

            {/* ContentView model code start here*/}
            <Modal
                size="xl"
                centered
                show={getUrlModal.show}
                onHide={() => UrlModalHide()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {getContentType === "zip" ? (
                            <i
                                class="fas fa-file-archive"
                                style={{ fontSize: "25px", color: "#fdbf00" }}
                            >
                                {" "}
                                Zip
                            </i>
                        ) : getContentType === "pdf" ? (
                            <i
                                class="fas fa-file-pdf"
                                style={{ fontSize: "25px", color: "#b30b00" }}
                            >
                                {" "}
                                PDF
                            </i>
                        ) : getContentType === "jpg" ||
                            getContentType === "png" ||
                            getContentType === "jpeg" ? (
                            <i
                                class="fas fa-file-image"
                                style={{ fontSize: "25px", color: "#b2b1ff" }}
                            >
                                {" "}
                                Image
                            </i>
                        ) : getContentType === "html" ? (
                            <i
                                class="fab fa-html5"
                                style={{ fontSize: "25px", color: "#e54c21" }}
                            >
                                {" "}
                                Html
                            </i>
                        ) : getContentType === "ogg" ||
                            getContentType === "webm" ||
                            getContentType === "mp4" ? (
                            <i
                                class="fas fa-file-video"
                                style={{ fontSize: "25px", color: "#8cee02" }}
                            >
                                {" "}
                                Video
                            </i>
                        ) : getContentType === "txt" ? (
                            <i
                                class="fas fa-file-alt"
                                style={{ fontSize: "25px", color: "#2766a0" }}
                            >
                                {" "}
                                Text
                            </i>
                        ) : getContentType === "doc" || getContentType === "docx" ? (
                            <i
                                class="fas fa-file-word"
                                style={{ fontSize: "25px", color: "#1e62b4" }}
                            >
                                {" "}
                                Doc
                            </i>
                        ) : getContentType === "scorm" ? (
                            <i
                                class="far fa-file-archive"
                                style={{ fontSize: "25px", color: "green" }}
                            >
                                {" "}
                                Scorm
                            </i>
                        ) : getContentType === "youtube" ? (
                            <i
                                class="far fa-youtube"
                                style={{ fontSize: "25px", color: "green" }}
                            >
                                {" "}
                                YouTube
                            </i>
                        ) : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {getContentType === "jpg" ||
                        getContentType === "png" ||
                        getContentType === "jpeg" ? (
                        <img
                            src={`http://10.244.3.218:8080/${getUrl}`}
                            width="1100"
                            height="800"
                        />
                    ) : getContentType === "pdf" ? (
                        <div>
                            {" "}
                            <ViewPdf
                                pdfUrl={`http://meghs1.hyderabad.cdac.in/pdfViewer/${getUrl}`}
                            />
                        </div>
                    ) : getContentType === "mp4" ? (
                        <div>
                            {" "}
                            <Videojs {...videoJsOptions} />
                        </div>
                    ) : getContentType === "docx" ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`http://10.244.3.218:8080/${getUrl}`}
                        ></iframe>
                    ) : getContentType === "html" ? (
                        <iframe
                            width="1100"
                            height="800"
                            src={`http://10.244.3.218:8080/${getUrl}`}
                        ></iframe>
                    ) : getContentType === "zip" ? (
                        <iframe
                            width="1100"
                            height="800"
                            src={`http://10.244.3.218:8080/${getUrl}`}
                        ></iframe>
                    ) : getContentType === "scorm" ? (
                        <iframe
                            width="1100"
                            height="800"
                            src={`http://10.244.3.218:8080/${getUrl}`}
                        ></iframe>
                    ) : getContentType === "youtube" ? (
                        <ReactPlayer
                            url={getYouTubeUrl}
                            width="100%"
                            height="800px"
                            controls="true"
                            config={{
                                youtube: {
                                    playerVars: { showinfo: 1 },
                                },
                            }}
                        />
                    ) : (
                        <p>{t("no_content_available")}</p>
                    )}
                </Modal.Body>
            </Modal>
            {/* ContentView model code end here*/}

            {/* Content details update model code start here*/}
            <Modal
                centered
                show={getFileContentUpdateModalState.show}
                onHide={() => FileContentUpdateModalHide()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t("update_file_details")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3 mt-3">
                        <label for="name">{t("file_name")} : </label>
                        <input
                            type="text"
                            minLength={3}
                            maxLength={50}
                            class="form-control"
                            defaultValue={getFileContentDetails.contentName}
                            id="file_name"
                            placeholder="Enter File Name"
                            name="file_name"
                        />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="name">{t('duration')} : </label>
                        <input
                            type="number"
                            class="form-control"
                            defaultValue={getFileContentDetails.contentDuration}
                            min="0"
                            max="60"
                            id="duration"
                            placeholder="Enter Duration"
                            name="duration"
                        />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() =>
                            UpdateFileDatails(getFileContentDetails.contentId, getParentId)
                        }
                        className="btn btn-primary"
                    >
                        {t("update")}
                    </Button>
                    <Button
                        onClick={() => FileContentUpdateModalHide(false)}
                        className="btn btn-danger"
                    >
                        {t("close")}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Content details update model code end here*/}

            {/* Dirctory Name details update model code start here*/}

            {/* Dirctory Name details update model code end here*/}

            {/* ShareUrl model code start here*/}
            <Modal
                centered
                show={ShareUrlModal.show}
                onHide={() => shareUrlModalHide()}
            >
                <Modal.Body style={{ padding: "0px" }}>
                    <div class="container" style={{ width: "75%" }}>
                        <div class="copy-text1">
                            <input
                                type="text"
                                class="text"
                                value={getShareUrlData}
                                readonly
                            />
                            <button>
                                <i class="fa fa-clone"></i>
                            </button>
                            <div style={{ marginLeft: "35px", marginTop: "12px" }}>
                                <a href="#">
                                    <i
                                        class="fas fa-times fa-2x"
                                        onClick={() => shareUrlModalHide()}
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* Share Url model code end here*/}

            <Modal
                centered
                show={getModuleModalState.show}
                onHide={() => AddModuleModalHide()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{ alignContent: "center" }}
                    >
                        {t("create_module_topic")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t("required_fields")} *
                    <div class="mb-3 mt-3">
                        <label for="name">{t("name")} : *</label>
                        <input
                            type="text"
                            minLength={3}
                            maxLength={50}
                            class="form-control"
                            id="module_name"
                            placeholder={t('enter_folder_name')}
                            name="module_name"
                        />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                        <span className="registration_input-msg"></span>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="publish_date">{t("publish_date")} : *</label>
                        <br></br>
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
                        <span style={{ color: "red" }}>{errorMsg}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button
                        variant="primary"
                        style={{
                            background: "linear-gradient(90deg, #11B67A 0%, #009444 100%)",
                        }}
                        onMouseOut={changeBackgroundOut}
                        onMouseOver={changeBackgroundOver}
                        id="register"
                        onClick={() => AddModule(getCourseStructureFolderId)}
                    >
                        {t("submit")}
                    </Button>
                    <Button variant="secondary" onClick={() => AddModuleModalHide()}>
                        {t("cancel")}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Folder Creation model code end here*/}

            {/* update folder or Content details model code start here*/}
            <Modal
                centered
                show={getFolderOrContentDetUpdate.show}
                onHide={() => UpdateContentOrFolderModalHide()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{ alignContent: "center" }}
                    >
                        {t("update_folder_or_content_details")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t('required_fields')} *
                    <div class="mb-3 mt-3">
                        <label for="name">{t('name')} : *</label>
                        <input
                            type="text"
                            minLength={3}
                            maxLength={50}
                            class="form-control"
                            id="module_name"
                            defaultValue={getFolderOrContentDetUpdate.name}
                            placeholder="Enter Folder Name"
                            name="module_name"
                        />
                        <span style={{ color: "red" }}>{errorMsg}</span>
                        <span className="registration_input-msg"></span>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="publish_date">{t('publish_date_s')} : *</label>
                        <br></br>

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
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button
                        variant="primary"
                        style={{
                            background: "linear-gradient(90deg, #11B67A 0%, #009444 100%)",
                        }}
                        onMouseOut={changeBackgroundOut}
                        onMouseOver={changeBackgroundOver}
                        id="register"
                        onClick={() =>
                            updateContentOrModule(getFolderOrContentDetUpdate.id)
                        }
                    >
                        {t("submit")}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => UpdateContentOrFolderModalHide()}
                    >
                        {t("cancel")}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* update folder or Content details model code end here */}

            {/* Add youtube link in Course Structure code start here */}
        </div>
    );
}

export default InstLibraryDetails;
