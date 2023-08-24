import React from 'react';
import { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import GlobalState from "../states/GlobalState";
import { Collapse } from 'reactstrap';
import { UncontrolledCollapse } from "reactstrap";
import DiscussionMain from '../../../discussion/DiscussionMain';
import '../styles/accordion.scss'
import ReactPlayer from 'react-player';
import Accordion1 from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router';
import StickyMenu from '../../../../components/common/StickyMenu';
import UserService from '../../../../services/UserService';
import CourseFeedback from '../../../account/CourseFeedback';
import Query from '../../Query/Query';
import service from '../../../../services/service';
import TopicFeedbackResponseByLearner from '../../../account/TopicFeedbackResponseByLearner';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';

import ViewPdf from "../../../instructor/ViewPdf";
import CryptoJS from "crypto-js";
import swal from 'sweetalert';
import { Col, Container, Row } from 'react-bootstrap';
import { GlobalContext } from '../../../../context/GlobalContext';


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




const ContentDelivery = (props) => {


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

    let sessionId = UserService.getSessionId();
    ////console.log(sessionId);
    let userId = UserService.getUserid();
    ////console.log(userId);
    const [state, setState] = useState({
        collapse: false,
    });

    const decipher = (salt) => {
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
    // const [url, setDecodedUrl] = useState(null)

    const [isDecodeValid, setIsDecodeValid] = useState("NOTVALID")
    // let courseID = props.match.params.id;
    // let tenantID = props.match.params.tid;
    // let hashcode = tenantID.substring(0, 10);
    // const myDecipher = decipher(`${hashcode}`);
    // let CID = courseID.substring(10);
    // let TID = tenantID.substring(10);
    // let courseId = myDecipher(`${CID}`);
    // let tenantId = myDecipher(`${TID}`);

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
        // const isValidTenantId = regex.test(decodedTenantId)

        if (isValidCourseId) {
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
                // history.push(`${process.env.PUBLIC_URL + "/course-grid/"}`);
            })
        }

    }

    useEffect(() => {

       // console.log("Called isDecodeValid")

        decodeHandler();

        // if (isDecodeValid !== "VALID") {
        //     decodeHandler()
        // }

    }, [isDecodeValid])

    const [getActvivty, setActivity] = useState();


    const [open, setOpen] = useState('1');
    const toggle1 = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (UserService.isLoggedIn() === false) {
                history.push("/");
            } else {

            }
        }, 1800000);
        return () => clearInterval(interval);
    }, []);

    const initial = {
        activityId: "",
        activityProgress: 0,
        activityProgressforDependency: 0,
        dependency: 0,
        status: "Not Completed"
    };
    const [getActivitiesStatus, setActivitiesStatus] = useState(initial);

    useEffect(() => {
        ////console.log("getActivitiesStatus-------------------->", getActivitiesStatus);
    }, [getActivitiesStatus])

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            service.courseActivitiesStatus(userId, courseId)
                .then(res => {
                    //console.log("This is Activity Course Status", res.data);
                    setActivitiesStatus({ ...res.data });
                })
                .catch(err => {
                    //console.log(err);
                })
        }

    }, [courseId]);


    const toggle = (event) => {
        event.preventDefault();
        setState({ collapse: !state.collapse });
    };


    function sumOfAllContentDuration(data) {
        if (data.length === 0) {
            data = "";
        }
        else if (data.nodes.length === 0) {
            data = "";
        }
        else {
            ////console.log(data);
            var res = data && data.nodes.map(d => d.duration).reduce((a, b) => b + a);
            return res;
        }
    }

    const { globalContextState, setGlobalContextState } =
        useContext(GlobalContext);

    // const { globalContextState, setGlobalContextState } = useState(GlobalContext);
    const { globalState, setGlobalState } = GlobalState();
    const menuData = [];
    const [apiData1, setApiData1] = useState([]);
    const [isActiveFile, setIsActive] = useState({
        folder: 0,
        file: 0
    });
    const [url, setUrl] = useState("");
    const [items, setItems] = useState([]);


    useEffect(() => {
        if (isDecodeValid === "VALID") {
            axios.get(`http://10.244.3.218:8082/courseOrganizer/getPubCourseStructure/${courseId}`)
                .then((res) => {
                    setApiData1(res.data);
                })
                .catch((error) => console.error(error));
        }
    }, [courseId]);
    menuData.push(apiData1);

    /* this code is storing the data in localstroge */
    const myArray = localStorage.getItem("uniqueArray")
        ? JSON.parse(localStorage.getItem("uniqueArray"))
        : [{ ind: "", path: "", nodetype: '' }];

    const [array, setArray] = useState([]);
    const uniqueArray = [];

    useEffect(() => {
        if (isDecodeValid === "VALID") {
            array.map((item) => {
                var findItem = uniqueArray.find((x) => x.ind === item.ind);
                if (!findItem) uniqueArray.push(item);
            });
            const json = JSON.stringify(uniqueArray);
            window.localStorage.setItem("uniqueArray", json);
        }
    }, [uniqueArray, array, courseId]);

    array.map((item) => {
        var findItem = uniqueArray.find((x) => x.ind === item.ind);
        if (!findItem) uniqueArray.push(item);
    });


    const setCurrentPathHandler = (ind, path, label, ind1, nodeType, activityProgress, DependencyActivityProgress) => {

        if (DependencyActivityProgress === 100) {

            setGlobalContextState((prev) => {
                return {
                    ...prev,
                    currentId: ind,
                    currentPath: path,
                    currentLabel: label,
                    selectedIndex: ind1,
                    currentNodeType: nodeType,
                    activityProgress: activityProgress,
                    DependencyActivityProgress: DependencyActivityProgress
                };
            });

        }
        else {
            setGlobalContextState((prev) => {
                return {
                    ...prev,
                    currentId: ind,
                    currentPath: " ",
                    currentLabel: label,
                    selectedIndex: ind1,
                    currentNodeType: nodeType,
                    activityProgress: activityProgress,
                    DependencyActivityProgress: DependencyActivityProgress
                };
            });
        }

    };

    const [prevId, setPrevId] = useState('');

    const handleContentVisit = (userId, courseId, id, label, sessionId, nodetype, activityProgress, DependencyActivityProgress) => {
        if (DependencyActivityProgress === 100) {
            if (prevId !== id) {
                if (prevId !== '') {
                    ////console.log(prevId, userId, sessionId);
                    service.updateContentVisitOutTime(userId, sessionId);
                }
                ////console.log(userId, courseId, id, label, sessionId, nodetype);
                service.saveContentVisit(userId, courseId, id, label, sessionId, nodetype);
            }
            setPrevId(id);
        }
        else{
            if (prevId !== id) {
                if (prevId !== '') {
                    ////console.log(prevId, userId, sessionId);
                    service.updateContentVisitOutTime(userId, sessionId);
                }
                ////console.log(userId, courseId, id, label, sessionId, nodetype);
            }
            setPrevId('');
        }
    };


    const Next = () => {
        if (globalContextState.selectedIndex == array.length - 1) {
            return;
        }
        setGlobalContextState((prev) => {
            return {
                ...prev,
                currentPath: array[globalContextState.selectedIndex + 1].path,
                selectedIndex: globalContextState.selectedIndex + 1,
                currentNodeType: array[globalContextState.selectedIndex + 1].nodetype,
                activityProgress: getActivitiesStatus[array[globalContextState.selectedIndex + 1].ind].activityProgress,
                DependencyActivityProgress: getActivitiesStatus[array[globalContextState.selectedIndex + 1].ind].DependencyActivityProgress
            };
        });
        menuData.map((itemTopic) => {
            itemTopic.nodes.map((itemContent) => {
                itemContent.nodes &&
                    itemContent.nodes.map((itemtype) => {
                        if (
                            itemtype.id === array[globalContextState.selectedIndex + 1].ind
                        ) {
                            globalState.length = 0;
                            globalState.push(itemContent.label, itemtype.label);
                            setIsActive({ folder: itemContent.label, file: array[globalContextState.selectedIndex + 1].ind });
                            ////console.log("array[globalContextState.selectedIndex + 1].ind  ", array[globalContextState.selectedIndex + 1].ind);
                            ////console.log(userId, courseId, itemtype.id, itemtype.label, sessionId, itemtype.nodetype);
                            handleContentVisit(userId, courseId, itemtype.id, itemtype.label, sessionId, itemtype.nodetype, getActivitiesStatus[array[globalContextState.selectedIndex + 1].ind].activityProgress,
                                getActivitiesStatus[array[globalContextState.selectedIndex + 1].ind].DependencyActivityProgress);
                        }
                    });
            });
        });
    };
    const Prev = () => {
        if (globalContextState.selectedIndex == 0) {
            return;
        }
        setGlobalContextState((prev) => {
            return {
                ...prev,
                currentPath: array[globalContextState.selectedIndex - 1].path,
                selectedIndex: globalContextState.selectedIndex - 1,
                currentNodeType: array[globalContextState.selectedIndex - 1].nodetype,
                activityProgress: getActivitiesStatus[array[globalContextState.selectedIndex - 1].ind].activityProgress,
                DependencyActivityProgress: getActivitiesStatus[array[globalContextState.selectedIndex - 1].ind].DependencyActivityProgress
            };
        });
        menuData.map((itemTopic) => {
            itemTopic.nodes.map((itemContent) => {
                itemContent.nodes &&
                    itemContent.nodes.map((itemtype) => {
                        if (
                            itemtype.id === array[globalContextState.selectedIndex - 1].ind
                        ) {
                            globalState.length = 0;
                            globalState.push(itemContent.label, itemtype.label);
                            setIsActive({ folder: itemContent.label, file: array[globalContextState.selectedIndex - 1].ind })
                            ////console.log(userId, courseId, itemtype.id, itemtype.label, sessionId, itemtype.nodetype);
                            handleContentVisit(userId, courseId, itemtype.id, itemtype.label, sessionId, itemtype.nodetype, getActivitiesStatus[array[globalContextState.selectedIndex - 1].ind].activityProgress,
                                getActivitiesStatus[array[globalContextState.selectedIndex - 1].ind].DependencyActivityProgress);
                        }
                    });
            });
        });
    };




    function folderStructureTree() {
        let menuData = [];
        axios.get(`http://10.244.3.218:8082/courseOrganizer/getPubCourseStructure/${courseId}`)
            .then((res) => {
                menuData = [res.data];
                ////console.log(res.data)
                // setApiData(menuData)
                let menuItems = menuData.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    return menuItem;
                });
                setItems(menuItems);
            });

        const returnMenuItem = (item, i) => {
            let menuItem;
            //console.log("inside returnMenuItem--------------------->", getActivitiesStatus[item.id])
            if (item.nodes.length === 0) {
                let progress;
                let act = 0
                let depAct = 0
                if (getActivitiesStatus[item.id] !== undefined) {
                    act = getActivitiesStatus[item.id].activityProgress;
                    depAct = getActivitiesStatus[item.id].activityProgressforDependency;
                }
                menuItem = (
                    <div key={item.id}
                    //disabled={getActivitiesStatus[item.id.activityProgressforDependency] === 100 ? "true" : "false"}
                    >
                        {/* {//console.log("item.id--------------------->", item.id)} */}
                        {/* {//console.log("getActivitiesStatus--------------------->", getActivitiesStatus[item.id])}  */}
                        {item.nodetype == "pdf" ? (
                            <div
                                onClick={() => {
                                    var ind1 = array.findIndex(
                                        (arrayItem) => arrayItem.ind === item.id
                                    );
                                    menuData.map((itemTopic) => {
                                        itemTopic.nodes.map((itemContent) => {
                                            itemContent.nodes &&
                                                itemContent.nodes.map((itemtype) => {
                                                    if (itemtype.id === item.id) {
                                                        globalState.length = 0;

                                                        globalState.push(itemContent.label, itemtype.label);
                                                        setIsActive({ folder: itemContent.label, file: item.id })
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype, act, depAct);



                                                    }
                                                });
                                        });
                                    });
                                    //progress=getActivitiesStatus[item.id].activityProgress
                                    setCurrentPathHandler(
                                        item.id,
                                        item.filePath,
                                        item.label,
                                        ind1,
                                        item.nodetype,
                                        act,
                                        depAct
                                    );

                                }}
                                style={{
                                    marginTop: "8px",
                                    verticalAlign: "middle",
                                }}
                            >
                                <span
                                    style={
                                        isActiveFile.file === item.id
                                            ? {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "white",
                                                color: "black",
                                            }
                                    }
                                >
                                    
                                    <span>
                                        <i className="fas fa-file-pdf"></i>
                                    </span>
                                    <span style={{ float: 'right', width: "24px", margin: "5px", marginTop: "-2px" }}>
                                        <CircularProgressbar value={act} strokeWidth={50}
                                            styles={buildStyles({
                                                strokeLinecap: "butt", pathColor: "#f0ad4e",
                                            })} />
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>

                                    {/* <span>
                                     <CircularProgressbar value={progress}/>
                                    </span> */}

                                </span>

                            </div>
                        ) : item.nodetype == "png" || item.nodetype == "jpg" ? (
                            <div
                                onClick={() => {
                                    var ind1 = array.findIndex(
                                        (arrayItem) => arrayItem.ind === item.id
                                    );
                                    menuData.map((itemTopic) => {
                                        itemTopic.nodes.map((itemContent) => {
                                            itemContent.nodes &&
                                                itemContent.nodes.map((itemtype) => {
                                                    // //console.log(itemtype.id, item.id)
                                                    if (itemtype.id === item.id) {
                                                        globalState.length = 0;

                                                        globalState.push(itemContent.label, itemtype.label);
                                                        setIsActive({ folder: itemContent.label, file: item.id })
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype, act, depAct);
                                                        ////console.log(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
                                                    }
                                                });
                                        });
                                    });
                                    setCurrentPathHandler(
                                        item.id,
                                        item.filePath,
                                        item.label,
                                        ind1,
                                        item.nodetype,
                                        act,
                                        depAct
                                    );
                                }}
                                style={{
                                    marginTop: "8px",
                                    verticalAlign: "middle",
                                }}
                            >
                                <span
                                    style={
                                        isActiveFile.file === item.id
                                            ? {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "white",
                                                color: "black",
                                            }
                                    }
                                >
                                    <span>
                                        <i className="fas fa-image"></i>
                                    </span>
                                    <span style={{ float: 'right', width: "24px", margin: "5px", marginTop: "-2px" }}>
                                        <CircularProgressbar value={act} strokeWidth={50}
                                            styles={buildStyles({
                                                strokeLinecap: "butt", pathColor: "#f0ad4e",
                                            })} />
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>
                                </span>
                            </div>
                        ) : item.nodetype == "zip" ? (
                            <div
                                onClick={() => {
                                    var ind1 = array.findIndex(
                                        (arrayItem) => arrayItem.ind === item.id
                                    );
                                    menuData.map((itemTopic) => {
                                        itemTopic.nodes.map((itemContent) => {
                                            itemContent.nodes &&
                                                itemContent.nodes.map((itemtype) => {
                                                    if (itemtype.id === item.id) {
                                                        globalState.length = 0;

                                                        globalState.push(itemContent.label, itemtype.label);
                                                        setIsActive({ folder: itemContent.label, file: item.id })
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype, act, depAct);
                                                        ////console.log(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
                                                    }
                                                });
                                        });
                                    });
                                    setCurrentPathHandler(
                                        item.id,
                                        item.filePath,
                                        item.label,
                                        ind1,
                                        item.nodetype,
                                        act,
                                        depAct
                                    );
                                }}
                                style={{
                                    marginTop: "8px",
                                    verticalAlign: "middle",
                                }}
                            >
                                <span
                                    style={
                                        isActiveFile.file === item.id
                                            ? {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "white",
                                                color: "black",
                                            }
                                    }
                                >
                                    <span>
                                        <i className="fas fa-file-archive"></i>
                                    </span>
                                    <span style={{ float: 'right', width: "24px", margin: "5px", marginTop: "-2px" }}>
                                        <CircularProgressbar value={act} strokeWidth={50}
                                            styles={buildStyles({
                                                strokeLinecap: "butt", pathColor: "#f0ad4e",
                                            })} />
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>
                                </span>
                            </div>
                        ) : item.nodetype == "scorm" ? (
                            <div
                                onClick={() => {
                                    var ind1 = array.findIndex(
                                        (arrayItem) => arrayItem.ind === item.id
                                    );
                                    menuData.map((itemTopic) => {
                                        itemTopic.nodes.map((itemContent) => {
                                            itemContent.nodes &&
                                                itemContent.nodes.map((itemtype) => {
                                                    if (itemtype.id === item.id) {
                                                        globalState.length = 0;

                                                        globalState.push(itemContent.label, itemtype.label);
                                                        setIsActive({ folder: itemContent.label, file: item.id })
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype, act, depAct);
                                                        ////console.log(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
                                                    }
                                                });
                                        });
                                    });
                                    setCurrentPathHandler(
                                        item.id,
                                        item.filePath,
                                        item.label,
                                        ind1,
                                        item.nodetype,
                                        act,
                                        depAct
                                    );
                                }}
                                style={{
                                    marginTop: "8px",
                                    verticalAlign: "middle",
                                }}
                            >
                                <span
                                    style={
                                        isActiveFile.file === item.id
                                            ? {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "white",
                                                color: "black",
                                            }
                                    }
                                >
                                    <span>
                                        <i className="fas fa-file-archive"></i>
                                    </span>
                                    <span style={{ float: 'right', width: "24px", margin: "5px", marginTop: "-2px" }}>
                                        <CircularProgressbar value={act} strokeWidth={50}
                                            styles={buildStyles({
                                                strokeLinecap: "butt", pathColor: "#f0ad4e",
                                            })} />
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>
                                </span>
                            </div>
                        ) : item.nodetype == "folder" ? (
                            <div
                                style={{
                                    marginTop: "8px",
                                    verticalAlign: "middle",
                                }}
                            >
                                <span
                                    onClick={(e) => {
                                        menuData.map((itemTopic) => {
                                            itemTopic.nodes.map((itemContent) => {
                                                // itemContent.nodes &&
                                                if (itemContent.id === item.id) {
                                                    // setBreadcrumbFolder(itemContent.label);
                                                    globalState.length = 0;

                                                    globalState.push(itemContent.label);
                                                    setIsActive({ folder: itemContent.label, file: item.id })
                                                }
                                            });
                                        });
                                    }}
                                    style={
                                        isActiveFile.folder === item.label ?
                                            {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            } : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "white",
                                                color: "black",
                                            }}
                                >
                                    <span>
                                        <i className="fas fa-folder"></i>
                                    </span>
                                    <span style={{ float: 'right', width: "24px", margin: "5px", marginTop: "-2px" }}>
                                        {/* <CircularProgressbar value={act} strokeWidth={50}
                                            styles={buildStyles({
                                                strokeLinecap: "butt",pathColor: "#f0ad4e",
                                    })} />       */}
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ marginLeft: "10px" }}>{sumOfAllContentDuration(item)}</span>
                                </span>
                            </div>
                        ) : item.nodetype == "html" ? (
                            <div
                                onClick={() => {
                                    var ind1 = array.findIndex(
                                        (arrayItem) => arrayItem.ind === item.id
                                    );
                                    menuData.map((itemTopic) => {
                                        itemTopic.nodes.map((itemContent) => {
                                            itemContent.nodes &&
                                                itemContent.nodes.map((itemtype) => {
                                                    if (itemtype.id === item.id) {
                                                        globalState.length = 0;

                                                        globalState.push(itemContent.label, itemtype.label);
                                                        setIsActive({ folder: itemContent.label, file: item.id })
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype, act, depAct);
                                                        ////console.log(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);

                                                    }
                                                });
                                        });
                                    });
                                    setCurrentPathHandler(
                                        item.id,
                                        item.filePath,
                                        item.label,
                                        ind1,
                                        item.nodetype,
                                        act,
                                        depAct
                                    );
                                }}
                                style={{
                                    marginTop: "8px",
                                    verticalAlign: "middle",
                                }}
                            >
                                <span
                                    style={
                                        isActiveFile.file === item.id
                                            ? {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "white",
                                                color: "black",
                                            }
                                    }
                                >
                                    <span>
                                        <i className="fab fa-html5"></i>
                                    </span>
                                    <span style={{ float: 'right', width: "24px", margin: "5px", marginTop: "-2px" }}>
                                        <CircularProgressbar value={act} strokeWidth={50}
                                            styles={buildStyles({
                                                strokeLinecap: "butt", pathColor: "#f0ad4e",
                                            })} />
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>
                                </span>
                            </div>
                        ) : item.nodetype == "youtube" ? (
                            <div
                                onClick={() => {
                                    var ind1 = array.findIndex(
                                        (arrayItem) => arrayItem.ind === item.id
                                    );
                                    menuData.map((itemTopic) => {
                                        itemTopic.nodes.map((itemContent) => {
                                            itemContent.nodes &&
                                                itemContent.nodes.map((itemtype) => {
                                                    if (itemtype.id === item.id) {
                                                        globalState.length = 0;

                                                        globalState.push(itemContent.label, itemtype.label);
                                                        setIsActive({ folder: itemContent.label, file: item.id })
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype, act, depAct);
                                                        ////console.log(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);

                                                    }
                                                });
                                        });
                                    });
                                    setCurrentPathHandler(
                                        item.id,
                                        item.filePath,
                                        item.label,
                                        ind1,
                                        item.nodetype,
                                        act,
                                        depAct
                                    );
                                }}
                                style={{
                                    marginTop: "8px",
                                    verticalAlign: "middle",
                                }}
                            >
                                <span
                                    style={
                                        isActiveFile.file === item.id
                                            ? {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "white",
                                                color: "black",
                                            }
                                    }
                                >
                                    <span>
                                        <i className="fab fa-youtube"></i>
                                    </span>
                                    <span style={{ float: 'right', width: "24px", margin: "5px", marginTop: "-2px" }}>
                                        <CircularProgressbar value={act} strokeWidth={50}
                                            styles={buildStyles({
                                                strokeLinecap: "butt", pathColor: "#f0ad4e",
                                            })} />
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>
                                </span>
                            </div>
                        ) : item.nodetype == "mp4" ? (
                            <div
                                onClick={() => {
                                    var ind1 = array.findIndex(
                                        (arrayItem) => arrayItem.ind === item.id
                                    );
                                    menuData.map((itemTopic) => {
                                        itemTopic.nodes.map((itemContent) => {
                                            itemContent.nodes &&
                                                itemContent.nodes.map((itemtype) => {
                                                    if (itemtype.id === item.id) {
                                                        globalState.length = 0;

                                                        globalState.push(itemContent.label, itemtype.label);
                                                        setIsActive({ folder: itemContent.label, file: item.id })
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype, act, depAct);
                                                        ////console.log(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
                                                    }
                                                });
                                        });
                                    });
                                    setCurrentPathHandler(
                                        item.id,
                                        item.filePath,
                                        item.label,
                                        ind1,
                                        item.nodetype,
                                        act,
                                        depAct
                                    );
                                }}
                                style={{
                                    marginTop: "8px",
                                    verticalAlign: "middle",
                                }}
                            >
                                <span
                                    style={
                                        isActiveFile.file === item.id
                                            ? {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            }
                                            : {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "white",
                                                color: "black",
                                            }
                                    }
                                >
                                    <span>
                                        <i className="fas fa-video"></i>
                                    </span>
                                    <span style={{ float: 'right', width: "24px", margin: "5px", marginTop: "-2px" }}>
                                        <CircularProgressbar value={act} strokeWidth={50}
                                            styles={buildStyles({
                                                strokeLinecap: "butt", pathColor: "#f0ad4e",
                                            })} />
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>
                                </span>
                            </div>
                        ) : (
                            <span>
                                {/* {item.label} */}
                            </span>
                        )}
                    </div>
                );
            }
            else {
                let act = 0
                let depAct = 0
                if (getActivitiesStatus[item.id] !== undefined) {
                    act = getActivitiesStatus[item.id].activityProgress;
                    depAct = getActivitiesStatus[item.id].activityProgressforDependency;
                }
                let menuItemChildren = item.nodes.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    {
                        item.filePath && setArray((prev) => [...prev, { ind: item.id, path: item.filePath, nodetype: item.nodetype }]);
                        // const found = array.some(obj => obj.ind === item.id);
                        // if(!found) setArray(prev => prev.filter(obj => {return obj.ind !== item.id}))
                    }
                    return menuItem;
                });
                menuItem = (
                    <div key={item.id} className="item">
                        <div className="toggler" id={`toggle-menu-item-${item.id}`}>
                            {item.nodetype == "folder" ? (
                                <div
                                    style={{
                                        marginTop: "8px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    <span
                                        onClick={() => {
                                            menuData.map((itemTopic) => {
                                                itemTopic.nodes.map((itemContent) => {
                                                    if (itemContent.id === item.id) {
                                                        globalState.length = 0;

                                                        globalState.push(itemContent.label);
                                                        setIsActive({ folder: itemContent.label, file: item.id })
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemContent.nodetype, act, depAct);

                                                    }
                                                });
                                            });
                                        }}
                                        style={
                                            isActiveFile.folder === item.label ?
                                                {
                                                    padding: "8px",
                                                    display: "block",
                                                    border: "1px solid #d3d3d3",
                                                    borderRadius: "5px",
                                                    marginTop: "8px",
                                                    verticalAlign: "middle",
                                                    cursor: "pointer",
                                                    backgroundColor: "#11B67A",
                                                    color: "rgb(255, 255, 255)",
                                                } : {
                                                    padding: "8px",
                                                    display: "block",
                                                    border: "1px solid #d3d3d3",
                                                    borderRadius: "5px",
                                                    marginTop: "8px",
                                                    verticalAlign: "middle",
                                                    cursor: "pointer",
                                                    backgroundColor: "white",
                                                    color: "black",
                                                }}
                                    >
                                        <i className="fas fa-folder"></i>
                                        <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                        <span style={{ float: 'right' }}>Min {sumOfAllContentDuration(item)}:00</span>

                                    </span>
                                </div>
                            ) : item.nodetype == "root" ? (
                                <div
                                    style={{
                                        marginTop: "8px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    <span
                                        onClick={() => {
                                            menuData.map((itemTopic) => {
                                                if (itemTopic.id === item.id) {
                                                    globalState.length = 0;
                                                    // setLabelState()
                                                    setIsActive({ folder: itemTopic.label, file: item.id })
                                                }
                                            });
                                        }}
                                        style={
                                            {
                                                padding: "8px",
                                                display: "block",
                                                border: "1px solid #d3d3d3",
                                                borderRadius: "5px",
                                                marginTop: "8px",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                backgroundColor: "#11B67A",
                                                color: "rgb(255, 255, 255)",
                                            }}
                                    >
                                        <i className="fas fa-house-user"></i>
                                        <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    </span>
                                </div>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </div>
                        <UncontrolledCollapse
                            className="children"
                            toggler={`#toggle-menu-item-${item.id}`}
                            defaultOpen
                        >
                            {menuItemChildren}
                        </UncontrolledCollapse>
                    </div>
                );
            }
            return menuItem;
        };
    }
    // //console.log(isActiveFile.file);
    ////console.log("globalContextState", globalContextState)




    useEffect(() => {
        if (isDecodeValid === "VALID") {
            folderStructureTree();
        }
    }, [isActiveFile, globalState, apiData1, courseId]);

    useEffect(() => {

        //console.log("globalContextState.currentPath====", globalContextState.currentPath);

        if (globalContextState.currentNodeType === "youtube") {
            setUrl(globalContextState.currentPath);
        }
        else if (globalContextState.currentNodeType === "pdf") {

            axios
                .get(`http://10.244.3.218:8080/${globalContextState.currentPath}`)
                .then((response) => {

                    // This encodes the Actual URL
                    const encrypted = CryptoJS.AES.encrypt(
                        "/" + response.data,
                        "cdac@123"
                    ).toString();
                    const safeEncodedString = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

                    const pdfDomain = "10.244.3.218:8080"
                    const finalSubDomain = pdfDomain + "/" + safeEncodedString

                    //console.log("finalSubDomain", finalSubDomain)

                    setUrl(finalSubDomain);

                })
                .catch((error) => { });
        }
        else {
            axios
                .get(`http://10.244.3.218:8080/${globalContextState.currentPath}`)
                .then((response) => {
                    setUrl(response.data);
                })
                .catch((error) => { });
        }
    }, [isActiveFile, globalState, apiData1, courseId]);

    const Content = () => {
        let extension = '';
        if (globalContextState.currentNodeType === "youtube") {
            extension = "youtube";
        } else if (globalContextState.currentNodeType === "pdf") {
            extension = "pdf";
        }
        else {
            extension = url.split(".").pop();
        }

        const Extension = () => {
            if (globalState.length === 1) {
                return <div className="is-size-4">{t('select_file_in')} {globalState[0]}</div>;
            }
            if (globalState.length === 0) {
                return <div className="is-size-4">{t('pls_click_on')} {menuData[0].label} {t('to_view_content')}</div>;
            }
            if (extension === "mp4") {
                return (<>
                    {(globalContextState.DependencyActivityProgress === 100) ? (<div>
                        <video width="100%" height="100%" controls>
                            <source
                                src={globalContextState.DependencyActivityProgress === 100 ? `http://10.244.3.218:8080/${url}` : "#"}
                                type="video/mp4"
                            />
                        </video>
                    </div>) : (<div>
                        <h6>
                            {t('view_previous_content')}
                        </h6>
                    </div>)}
                </>
                );
            } else if (extension === "png" || extension === "jpg") {
                return (
                    <>

                        {(globalContextState.DependencyActivityProgress === 100) ? (
                            <div><figure>
                                <img
                                    src={globalContextState.DependencyActivityProgress === 100 ? `http://10.244.3.218:8080/${url}` : "#"}
                                    width="100%"
                                    height="100%"
                                />
                            </figure>
                            </div>) : (<div>
                                <h6>
                                    {t('view_previous_content')}
                                </h6>
                            </div>)}

                    </>
                );
            } else if (extension === "scorm" || extension === "html") {
                return (

                    <>
                        {(globalContextState.DependencyActivityProgress === 100) ? (<div>
                            <object
                                data={globalContextState.DependencyActivityProgress === 100 ? `http://10.244.3.218:8080/${url}` : "#"}
                                width="100%" height="700" type="text/html"> {t('alternative_iframe')}</object>
                        </div>) : (<div>
                            <h6>
                                {t('view_previous_content')}
                            </h6>
                        </div>)}
                    </>

                );
            }
            else if (
                extension === "zip"
            ) {
                return (

                    <>
                        {(globalContextState.DependencyActivityProgress === 100) ? (<div>
                            <iframe
                                src={globalContextState.DependencyActivityProgress === 100 ? `http://10.244.3.218:8080/${url}` : "#"}
                                width="100%"
                                height="700px"
                                allowFullScreen={true}
                                style={{ minHeight: "700px", overflow: "auto" }}
                            />
                        </div>) : (<div>
                            <h6>
                                {t('view_previous_content')}
                            </h6>
                        </div>)}
                    </>


                );
            } else if (
                extension === "pdf"
            ) {
                return (
                    <>
                        {(globalContextState.DependencyActivityProgress === 100) ? (<div>
                            <ViewPdf pdfUrl={`http://meghs1.hyderabad.cdac.in/pdfViewer/${url}`} />
                        </div>) : (<div>
                            <h6>
                                {t('view_previous_content')}
                            </h6>
                        </div>)}
                    </>
                );
            }
            else if (extension === "youtube") {
                return (
                    <>

                        {(globalContextState.DependencyActivityProgress === 100) ? (<div>
                            <ReactPlayer
                                url={globalContextState.DependencyActivityProgress === 100 ? `${url}` : "#"}
                                width="100%"
                                height="700px"
                                controls="true"
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 1 }
                                    }
                                }}
                            />
                        </div>) : (<div>
                            <h6>
                                {t('view_previous_content')}
                            </h6>
                        </div>)}
                    </>

                );
            } else {
                return (
                    <div></div>
                )
            }
        };
        return (
            <div className="card m-0 p-2" style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none" }}>
                <Extension />
            </div>
        );
    };


    const Breadcrumb = () => {
        return globalState.map((obj, i) => (
            <>
                {/* {i === 1 ? <span className="btn btn-default active" >{obj}</span> : <span className="btn btn-default" onClick={clicks1}>{obj}</span>} */}
                <span style={{ color: '#11B67A' }} className="btn btn-default">{obj}</span>
            </>
        ));
    };

    const [show, setShow] = useState(true);


    const history = useHistory();

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

    const CourseDetails = (id, tid) => {

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
        // if (prevId !== '') {
        //     ////console.log(prevId, userId, sessionId);
        //     service.updateContentVisitOutTime(userId, sessionId);
        // }
        // history.goBack();
        // //history.push(`${process.env.PUBLIC_URL + "/course-details/"}${rNumber}${cid}/${result}${tId}`);

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



    const [showAccordion, setShowAccordion] = useState(false);
    const [showQuery, setShowQuery] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const handleOpenAccordion = () => {
        setShowAccordion(!showAccordion); // Toggle accordion
    };
    const handleOpenQuery = () => {
        setShowQuery(!showQuery); // Toggle accordion Query
    };
    const handleOpenFeedback = () => {
        setShowFeedback(!showFeedback); // Toggle accordion Feedback
    };

    return (
        <>
            <StickyMenu />
            <>
                <Modal backdrop="static" show={show} fullscreen={true} onHide={() => setShow(false)}>
                    <Modal.Header>
                        <Col className="text-left">
                            <Modal.Title>{t('content_delivery')}</Modal.Title>
                        </Col>
                        <Row>
                            <Row>
                                <Col>
                                    <div className='row'>
                                        {/* <div className='col-md-9 d-none d-md-block'></div> */}
                                        <div className='col-md-3 d-none d-md-block'>
                                            {globalState.length == 0 || globalState.length == 1 ? (
                                                <div className="d-flex justify-content-between">
                                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} >
                                                        <i className="fas fa-caret-left fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} >
                                                        <i className="fas fa-caret-right fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                </div>
                                            ) : globalContextState.selectedIndex >= uniqueArray.length - 1 && globalContextState.selectedIndex == 0 ? (
                                                <div className="d-flex justify-content-between">
                                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} >
                                                        <i className="fas fa-caret-left fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} >
                                                        <i className="fas fa-caret-right fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                </div>
                                            ) : globalContextState.selectedIndex >= uniqueArray.length - 1 ? (
                                                <div className="d-flex justify-content-between">
                                                    <button type='button' className='btn btn-danger mr-1' onClick={() => Prev()} >
                                                        <i className="fas fa-caret-left fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} >
                                                        <i className="fas fa-caret-right fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                </div>
                                            ) : globalContextState.selectedIndex == 0 ? (
                                                <div className="d-flex justify-content-between">
                                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} >
                                                        <i className="fas fa-caret-left fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                    <button type='button' className='btn btn-success' onClick={() => Next()} >
                                                        <i className="fas fa-caret-right fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="d-flex justify-content-between">
                                                    <button type='button' className='btn btn-danger mr-1' onClick={() => Prev()} >
                                                        <i className="fas fa-caret-left fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                    <button type='button' className='btn btn-success' onClick={() => Next()} >
                                                        <i className="fas fa-caret-right fa-lg" style={{ width: "40px" }}></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => CourseDetails(courseId, tenantId)}>
                                        {t('close')}
                                    </button>
                                </Col>
                            </Row>
                            <Col>
                                <div className='col-md-3 d-block d-sm-block d-md-none pb-2'>
                                    <button type="button" className="btn btn-primary mr-2" style={{ position: "relative", float: "left" }} onClick={toggle}>
                                        {state.collapse ? (
                                            <span>
                                                <i className="fas fa-times fa-lg" style={{ width: "25px" }}></i>
                                            </span>
                                        ) : (
                                            <span>
                                                <i className="fas fa-bars fa-lg" style={{ width: "25px" }}></i>
                                            </span>
                                        )}
                                    </button>

                                    {globalState.length == 0 || globalState.length == 1 ? (
                                        <div className="d-flex justify-content-between">
                                            <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} >
                                                <i className="fas fa-caret-left fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                            <button type='button' className='btn btn-success' disabled onClick={() => Next()} >
                                                <i className="fas fa-caret-right fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                        </div>
                                    ) : globalContextState.selectedIndex >= uniqueArray.length - 1 && globalContextState.selectedIndex == 0 ? (
                                        <div className="d-flex justify-content-between">
                                            <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} >
                                                <i className="fas fa-caret-left fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                            <button type='button' className='btn btn-success' disabled onClick={() => Next()} >
                                                <i className="fas fa-caret-right fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                        </div>
                                    ) : globalContextState.selectedIndex >= uniqueArray.length - 1 ? (
                                        <div className="d-flex justify-content-between">
                                            <button type='button' className='btn btn-danger mr-1' onClick={() => Prev()} >
                                                <i className="fas fa-caret-left fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                            <button type='button' className='btn btn-success' disabled onClick={() => Next()} >
                                                <i className="fas fa-caret-right fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                        </div>
                                    ) : globalContextState.selectedIndex == 0 ? (
                                        <div className="d-flex justify-content-between">
                                            <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} >
                                                <i className="fas fa-caret-left fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                            <button type='button' className='btn btn-success' onClick={() => Next()} >
                                                <i className="fas fa-caret-right fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="d-flex justify-content-between">
                                            <button type='button' className='btn btn-danger mr-1' onClick={() => Prev()} >
                                                <i className="fas fa-caret-left fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                            <button type='button' className='btn btn-success' onClick={() => Next()} >
                                                <i className="fas fa-caret-right fa-lg" style={{ width: "25px" }}></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Modal.Header>

                    <Modal.Body>
                        <span className='row' style={{ width: '100%' }}>

                            {/* /////////////////////////////////////////////////OLD MODAL BODY/////////////////////////////////////////////// */}
                            {/* <div className='col-2 d-none d-md-block'></div> */}
                            {/* <div className='col-md-12'>
                                <div className='row m-2'>
                                    <div className='col-md-3 card m-0 d-none d-xl-block px-2 pb-2' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none", width: "auto" }}>
                                        <>
                                            <div className="items">{items}</div>
                                        </>
                                    </div>
                                    <div className='col-md-5 card m-0 d-none d-md-block d-lg-none px-2 pb-2' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none", width: "auto" }}>
                                        <>
                                            <div className="items">{items}</div>
                                        </>
                                    </div>
                                    <div className='col-md-4 card m-0 d-none d-lg-block d-xl-none px-2 pb-2' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none", width: "auto" }}>
                                        <>
                                            <div className="items">{items}</div>
                                        </>
                                    </div>
                                    <div className='col-md-12 d-block d-sm-block d-md-none p-0' style={{ position: "absolute", zIndex: "2", width: "auto" }}>
                                        <Collapse isOpen={state.collapse}>
                                            <div className='card m-0 px-2 pb-2' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none", width: "auto" }}>
                                                <>
                                                    <div className="items">{items}</div>
                                                </>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='col-md-9 d-none d-xl-block' style={{ paddingRight: "0px" }}>
                                        <Content />
                                    </div>
                                    <div className='col-md-7 d-none d-md-block d-lg-none' style={{ paddingRight: "0px" }}>
                                        <Content />
                                    </div>
                                    <div className='col-md-8 d-none d-lg-block d-xl-none' style={{ paddingRight: "0px" }}>
                                        <Content />
                                    </div>
                                    <div className='col-md-12 d-block d-sm-block d-md-none' style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                                        <Content />
                                    </div>
                                </div>
                            </div> */}
                            {/* /////////////////////////////////////////////////OLD MODAL BODY/////////////////////////////////////////////// */}


                            {/* /////////////////////////////////////////////////NEW MODAL BODY/////////////////////////////////////////////// */}
                            <Container fluid id='Main'>
                                <Row>
                                    <div className='col-md-12 pr-2'>
                                        <Row className='p-3'>
                                            <Col sm={3} className='d-none d-md-block shadow pt-2 pb-4'>
                                                {items}
                                            </Col>
                                            <Col md={12} className='d-md-none'>
                                                <Row>
                                                    <Col xs={state.collapse ? 12 : 0} className="p-0">
                                                        <div className={state.collapse ? "shadow card m-0 px-2 pb-2" : ""}>
                                                            <Collapse isOpen={state.collapse}>
                                                                <div className='items'>{items}</div>
                                                            </Collapse>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col sm={9} className='mt-3 pt-2 pb-4'>
                                                <Content />
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                            </Container>
                            {/* /////////////////////////////////////////////////NEW MODAL BODY/////////////////////////////////////////////// */}

                            {/* <div className='col-md-3 d-none d-md-block p-0 pr-3'>
                                <div className='card mt-2 p-2 mr-2' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none", width: "auto" }}>
                                    <div className="wrapper">
                                        <Accordion1 flush>
                                            <Accordion1.Item eventKey="0">
                                                <Accordion1.Header onClick={handleOpenAccordion}>Discussion Form</Accordion1.Header>
                                                {showAccordion && (
                                                  <Accordion1.Body>
                                                   <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={courseId} /> 
                                                 </Accordion1.Body>
                                                )}
                                            </Accordion1.Item>

                                            <Accordion1.Item eventKey="1">
                                                <Accordion1.Header onClick={handleOpenQuery}>Query</Accordion1.Header>
                                                {showQuery && (<Accordion1.Body>
                                                     <Query courseid={courseId} tenantid={tenantId} userid={userId} itemid={courseId} />
                                                </Accordion1.Body>
                                                )}
                                            </Accordion1.Item>

                                            <Accordion1.Item eventKey="2">
                                                <Accordion1.Header onClick={handleOpenFeedback}>Feedback Form</Accordion1.Header>
                                                {showFeedback && (<Accordion1.Body>
                                                    <CourseFeedback typeid={1} cid={courseId} />
                                                </Accordion1.Body>
                                                )}
                                            </Accordion1.Item>
                                             <Accordion1.Item eventKey="4">
                                                <Accordion1.Header>Content Feedback</Accordion1.Header>
                                                <Accordion1.Body>
                                                     <TopicFeedbackResponseByLearner typeid={3} cid={courseId} itemId = {globalContextState.currentId} />
                                                </Accordion1.Body>  
                                            </Accordion1.Item>
                                        </Accordion1>

                                        <div className="app">
                                              <div className="accordian">
                                                <div className="accordian-header" onClick={handleOpenAccordion}>
                                                  <div>Accordion Header</div>
                                                  <div className="sign">{showAccordion ? '-' : '+'}</div>
                                                </div>
                                                {showAccordion && (
                                                  <div className="accordian-body">
                                                    <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={courseId} />
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                    </div>
                                </div>
                            </div > */}




                            {/* <div className='col-md-12 d-block d-sm-block d-md-none'>
                                <div className='card ml-2 p-2' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none", width: "auto" }}>
                                    <div className="wrapper">
                                        <Accordion1 flush>
                                            <Accordion1.Item eventKey="0">
                                                <Accordion1.Header>Discussion Form</Accordion1.Header>
                                                <Accordion1.Body>
                                                    <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={courseId} />
                                                </Accordion1.Body>
                                            </Accordion1.Item>

                                            <Accordion1.Item eventKey="1">
                                                <Accordion1.Header>Query</Accordion1.Header>
                                                <Accordion1.Body>
                                                    Query
                                                </Accordion1.Body>
                                            </Accordion1.Item>

                                            <Accordion1.Item eventKey="2">
                                                <Accordion1.Header>Feedback Form</Accordion1.Header>
                                                <Accordion1.Body>
                                                    <CourseFeedback typeid={1} cid={courseId} />
                                                </Accordion1.Body>
                                            </Accordion1.Item>
                                        </Accordion1>
                                    </div>
                                </div>
                            </div> */}
                        </span >

                    </Modal.Body>
                </Modal>
            </>
        </>
    );
}

export default ContentDelivery;