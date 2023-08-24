import { render } from '@testing-library/react';
import axios from "axios";
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { BreadcrumbBox } from '../../../components/common/Breadcrumb';
import HeaderTwo from '../../../components/HeaderTwo';
import DataTable from "react-data-table-component";
import Videojs from './video.js';
import swal from 'sweetalert';
import instructorService from '../../../services/instructorService.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FilterDataTable from '../FilterDataTable';
import FooterTwo from '../../../components/FooterTwo';
import UserService from '../../../services/UserService';
import { UncontrolledCollapse } from "reactstrap";
import '../styles.css';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import service from '../../../services/service.js';
import { useParams } from 'react-router-dom';
import '../styles.css';
import './styles/styles.scss';
import './styles/tree.css';
import '../../../../node_modules/react-simple-tree-menu/dist/main.css';
import { colors } from "../../../components/common/element/elements.js";
import { Styles } from './styles/coursedetails.js';
import Form from 'react-bootstrap/Form';
import GlobalState from "../../courses/contentdelivery/states/GlobalState";
import { Collapse } from 'reactstrap';
import { FaStreetView } from 'react-icons/fa';
import { GlobalContext } from '../../../context/GlobalContext';


function CompletionCriteria(props) {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    ////console.log(props);
    let sessionId = UserService.getSessionId();
    const userId = props.userID;
    const courseId = props.courseID;
    const tenantId = props.tenantID;
    const menuData = [];
    const [apiData1, setApiData1] = useState([]);
    const { globalContextState, setGlobalContextState } =
    useContext(GlobalContext);
    const { globalState, setGlobalState } = GlobalState();
    const [isActiveFile, setIsActive] = useState({
        folder: 0,
        file: 0
    });
    const [array, setArray] = useState([]);
    const [prevId, setPrevId] = useState('');
    const [items, setItems] = useState([]);
    const [state, setState] = useState({
        collapse: false,
    });

    useEffect(() => {
        axios.get(`http://10.244.3.218:8082/courseOrganizer/getCourseStructure/${courseId}`)
            .then((res) => {
                ////console.log(res.data);
                setApiData1(res.data);
            })
            .catch((error) => console.error(error));
    }, []);
    menuData.push(apiData1);

    const handleContentVisit = (userId, courseId, id, label, sessionId, nodetype) =>{

        if(prevId !== id){
        if(prevId !== '')
        {
            ////console.log(prevId, userId, sessionId);
            service.updateContentVisitOutTime(userId, sessionId);    
        }       
        ////console.log(userId, courseId, id, label, sessionId, nodetype);
        service.saveContentVisit(userId, courseId, id, label, sessionId, nodetype);
    }
        setPrevId(id);
       
    };

    const setCurrentPathHandler = (ind, path, label, ind1, nodeType) => {
        setGlobalContextState((prev) => {
            return {
                ...prev,
                currentId: ind,
                currentPath: path,
                currentLabel: label,
                selectedIndex: ind1,
                currentNodeType: nodeType
            };
        });
    };

    function  sumOfAllContentDuration(data) {
        if (data.length === 0) {
            data = "";
        } else {
            var res = data && data.nodes.map(d => d.duration).reduce((a, b) => b + a);
            return res;
        }
    }

    function folderStructureTree() {
        let menuData = [];
        axios
            .get(`http://10.244.3.218:8082/courseOrganizer/getCourseStructure/${courseId}`)
            .then((res) => {
                menuData = [res.data];
                // setApiData(menuData)
                let menuItems = menuData.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    return menuItem;
                });
                setItems(menuItems);
            });

        const returnMenuItem = (item, i) => {
            let menuItem;

            if (item.nodes.length === 0) {
                menuItem = (
                    <div key={item.id}>
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
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
                                                        ////console.log(item.filePath);
                                                    }
                                                });
                                        });
                                    });
                                    setCurrentPathHandler(
                                        item.id,
                                        item.filePath,
                                        item.label,
                                        ind1,
                                        item.nodetype
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
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>
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
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
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
                                        item.nodetype
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
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
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
                                        item.nodetype
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
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
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
                                        item.nodetype
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
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
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
                                        item.nodetype
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
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
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
                                        item.nodetype
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
                                                        handleContentVisit(userId, courseId, item.id, item.label, sessionId, itemtype.nodetype);
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
                                        item.nodetype
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
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
                                    <span style={{ float: 'right' }}>{item.duration}:00</span>
                                </span>
                            </div>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </div>
                );
            } else {
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
                        >
                            {menuItemChildren}
                        </UncontrolledCollapse>
                    </div>
                );
            }
            return menuItem;
        };
    }

    useEffect(() => {
        folderStructureTree();
    }, [isActiveFile, globalState, apiData1]);
    

    function changeBackgroundOver(e) {
        e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
        e.target.style.border="0px";
    }

    function changeBackgroundOut(e) {
        e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
        e.target.style.border="0px";
    }

    const Content = () => {

        const [ACView, setACView] = useState(false);  
        if(!globalContextState.currentId == " "){
            setACView(true);
        }
        return (

            // { !ACView && (<div>
            //     <p>
            //     please Select Content
            //     </p>
            // </div>)}
            
            <div>
                <p>
                File Id: {globalContextState.currentId}
                </p>
            </div>
                     
        )
    }

        return (
            <>
            <div style={{height: " 30px", background:"green"}}>

            </div>  
                                    <Card>
                                <div className='row m-2'>
                                    <div className='col-md-3 card m-0 d-none d-xl-block px-2 pb-2' style={{border: "none", width: "auto" }}>
                                        <>
                                            <div className="items">{items}</div>
                                        </>
                                    </div>
                                    <div className='col-md-5 card m-0 d-none d-md-block d-lg-none px-2 pb-2' style={{  border: "none", width: "auto" }}>
                                        <>
                                            <div className="items">{items}</div>
                                        </>
                                    </div>
                                    <div className='col-md-4 card m-0 d-none d-lg-block d-xl-none px-2 pb-2' style={{  border: "none", width: "auto" }}>
                                        <>
                                            <div className="items">{items}</div>
                                        </>
                                    </div>
                                    <div className='col-md-12 d-block d-sm-block d-md-none p-0' style={{ position: "absolute", zIndex: "2", width: "auto" }}>
                                        <Collapse isOpen={state.collapse}>
                                            <div className='card m-0 px-2 pb-2' style={{  border: "none", width: "auto" }}>
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
                                </Card>
           
            

            </>
        )
}


export default CompletionCriteria;