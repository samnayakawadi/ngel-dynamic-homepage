import React from 'react';
import { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import GlobalState from "../states/GlobalState";
import { Collapse } from 'reactstrap';
import { UncontrolledCollapse } from "reactstrap";
import { GlobalContext } from '../../../../context/GlobalContext';

const BootstrapMenu = () => {

    useEffect(() => {
        UserService.generateToken();
       }, []);
       
    const [state, setState] = useState({
        collapse: false,
    });

    const toggle = (event) => {
        event.preventDefault();
        setState({ collapse: !state.collapse });
    };

    const { globalContextState, setGlobalContextState } =
        useContext(GlobalContext);
    const { globalState, setGlobalState } = GlobalState();
    const menuData = [];
    const [apiData1, setApiData1] = useState([]);
    const [isActiveFile, setIsActive] = useState({
        folder: 0,
        file: 0
    });
    const [url, setUrl] = useState("");
    const [items, setItems] = useState([]);
    var date = new Date();
    var emailid = "shashank@gmail.com";
    var uname = 'defee8281e44af557306c3adde571600f364e320';
    var pass = '909e40cbbdd400ef651f1d00ffc9bfe4d2745e44';
    var basicAuth = 'Basic ZGVmZWU4MjgxZTQ0YWY1NTczMDZjM2FkZGU1NzE2MDBmMzY0ZTMyMDo5MDllNDBjYmJkZDQwMGVmNjUxZjFkMDBmZmM5YmZlNGQyNzQ1ZTQ0';


    // const [apiData, setApiData] = useState([]);
    // const [labelState, setLabelState] = useState("");

    useEffect(() => {
        axios
            .get("http://10.244.3.218:8082/courseOrganizer/getCourseStructure/1")
            .then((res) => {
                setApiData1(res.data);
            })
            .catch((error) => console.error(error));
    }, []);
    menuData.push(apiData1);
    useEffect(() => {
        axios
            .get(`http://10.244.3.218:8080/${globalContextState.currentPath}`)
            .then((response) => {
                setUrl(response.data);
            })
            .catch((error) => { });
    }, [isActiveFile, globalState, apiData1]);

    const myArray = localStorage.getItem("uniqueArray")
        ? JSON.parse(localStorage.getItem("uniqueArray"))
        : [{ ind: "", path: "" }];

    const [array, setArray] = useState([]);
    const uniqueArray = [];

    useEffect(() => {
        array.map((item) => {
            var findItem = uniqueArray.find((x) => x.ind === item.ind);
            if (!findItem) uniqueArray.push(item);
        });
        const json = JSON.stringify(uniqueArray);
        window.localStorage.setItem("uniqueArray", json);
    }, [uniqueArray, array]);

    array.map((item) => {
        var findItem = uniqueArray.find((x) => x.ind === item.ind);
        if (!findItem) uniqueArray.push(item);
    });

    const setCurrentPathHandler = (ind, path, label, ind1, type) => {
        setGlobalContextState((prev) => {
            return {
                ...prev,
                currentId: ind,
                currentPath: path,
                currentLabel: label,
                selectedIndex: ind1,
                currentNodeType: type
            };
        });
    };
    // actor: { "mbox": emailid },
    //     verb: { "id": "This is viewed" },
    //     object: { "id": date}


    const Data =
        [

            {
                "actor": {
                    "name": "Pradeep",
                    "mbox": "mailto:pradeep@cdac.in"
                },
                "verb": {
                    "id": "https:\/\/brindlewaye.com\/xAPITerms\/verbs\/loggedin\/",
                    "display": {
                        "en": "Viewed"
                    }
                },
                "object": {
                    "id": "http://ngel.hyderabad.cdac.in/course-grid",
                    "definition": {
                        "type": "http:\/\/id.tincanapi.com\/activitytype\/lms",
                        "name": {
                            "en": "abc123"
                        }
                    }
                },
                "timestamp": "2015-06-10T15:31:41+01:00",
                "context": {
                    "platform": "E-learning",
                    "language": "en",
                    "extensions": {
                        "http:\/\/lrs.learninglocker.net\/define\/extensions\/info": {
                            "http:\/\/moodle.org": "1.0.0",
                            "https:\/\/github.com\/xAPI-vle\/moodle-logstore_xapi": "0.0.0-development",
                            "event_name": "\\core\\event\\user_loggedin",
                            "event_function": "\\src\\transformer\\events\\core\\user_loggedin"
                        }
                    },
                    "contextActivities": {
                        "category": [
                            {
                                "id": "http:\/\/moodle.org",
                                "definition": {
                                    "type": "http:\/\/id.tincanapi.com\/activitytype\/source",
                                    "name": {
                                        "en": "E-learning"
                                    }
                                }
                            }
                        ]
                    }
                }
            }]

    // {
    //     "id": 1,
    //     "userid": 1,
    //     "courseid": 1,
    //     "timecreated": 1433946701,
    //     "contextinstanceid": 1,
    //     "eventname": "\\mod_lesson\\event\\course_module_viewed"
    // }


    const PostData = () => {
        axios.post(`http://10.244.1.133/data/xAPI/statements`, Data, {
            // auth: {
            //     Username: 'defee8281e44af557306c3adde571600f364e320',
            //     Password: '909e40cbbdd400ef651f1d00ffc9bfe4d2745e44'
            // },
            headers: {
                "Authorization": basicAuth,
                "X-Experience-API-Version": "1.0.3",
                "Content-Type": "application/json"
            }
        
        }).then(res => { //console.log("Posted successfully") 
        })
            .catch(err => { //console.log("Error in posting data") 
            })
    }
    

    // useEffect(() => {
    //     PostData();
    // }, []);


    const Next = () => {
        if (globalContextState.selectedIndex == array.length - 1) {
            return;
        }
        setGlobalContextState((prev) => {
            return {
                ...prev,
                currentPath: array[globalContextState.selectedIndex + 1].path,
                selectedIndex: globalContextState.selectedIndex + 1,
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
                            setIsActive({ folder: itemContent.label, file: array[globalContextState.selectedIndex + 1].ind })
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
                        }
                    });
            });
        });
    };


    function folderStructureTree() {
        let menuData = [];
        axios
            .get("http://10.244.3.218:8082/courseOrganizer/getCourseStructure/1")
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
                                    PostData();
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
                                                backgroundColor: "#02A9F7",
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
                                        <i className="fa-solid fa-file-pdf"></i>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
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
                                    PostData();
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
                                                backgroundColor: "#02A9F7",
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
                                        <i className="fa-solid fa-image"></i>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
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
                                    PostData();
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
                                                backgroundColor: "#02A9F7",
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
                                        <i className="fa-solid fa-file-archive"></i>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
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
                                    PostData();
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
                                                backgroundColor: "#02A9F7",
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
                                        <i className="fa-solid fa-file-archive"></i>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
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
                                                backgroundColor: "#02A9F7",
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
                                        <i className="fa-solid fa-folder"></i>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
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
                                    PostData();
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
                                                backgroundColor: "#02A9F7",
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
                                    PostData();
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
                                                backgroundColor: "#02A9F7",
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
                                        <i className="fa-solid fa-video"></i>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>{item.label}</span>
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
                        item.filePath && setArray((prev) => [...prev, { ind: item.id, path: item.filePath }]);
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
                                                    backgroundColor: "#02A9F7",
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
                                        <i className="fa-solid fa-folder"></i>
                                        <span style={{ marginLeft: "10px" }}>{item.label}</span>
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
                                                backgroundColor: "#02A9F7",
                                                color: "rgb(255, 255, 255)",
                                            }}
                                    >
                                        <i className="fa-solid fa-house-chimney"></i>
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

    const Content = () => {
        var extension = url.split(".").pop();
        const Extension = () => {
            if (globalState.length === 1) {
                return <div className="is-size-4">Please select file in {globalState[0]}</div>;
            }
            if (globalState.length === 0) {
                return <div className="is-size-4">Please select folder in {menuData[0].label}</div>;
            }
            if (
                extension === "pdf" ||
                extension === "scorm" ||
                extension === "zip" ||
                extension === "html"
            ) {
                return (
                    <div>
                        <iframe
                            src={`http://10.244.3.218:8080/${url}`}
                            width="100%"
                            height="700px"
                            allowFullScreen={true}
                            style={{ minHeight: "700px", overflow: "auto" }}
                        />
                    </div>
                );
            } else if (extension === "mp4") {
                return (
                    <div>
                        <video width="100%" height="100%" controls>
                            <source
                                src={`http://10.244.3.218:8080/${url}`}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                );
            } else if (extension === "png" || extension === "jpg") {
                return (
                    <figure>
                        <img
                            src={`http://10.244.3.218:8080/${url}`}
                            width="100%"
                            height="100%"
                        />
                    </figure>
                );
            }
        };
        return (
            <div className="card m-0 p-2" style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none" }}>
                <Extension />
            </div>
        );
    };

    // const clicks = () => {

    //     apiData.map((itemTopic) => {
    //         setLabelState(itemTopic.label)
    //         if (itemTopic.label === labelState) {
    //             // alert("hi")
    //             globalState.length = 0;
    //             setIsActive({ folder: itemTopic.label, file: "" })
    //         }
    //     });
    // }
    // useEffect(() => {
    //     clicks();
    // }, [globalState])
    // const clicks1 = () => {
    //     apiData.map((itemTopic) => {
    //         // alert("Hi")
    //         itemTopic.nodes.map((itemContent) => {

    //             setLabelState(itemContent.label)
    //             // itemContent.nodes &&
    //             if (itemContent.label === labelState) {
    //                 //console.log(itemContent.label)
    //                 // setBreadcrumbFolder(itemContent.label);
    //                 globalState.length = 0;

    //                 globalState.push(labelState);
    //                 setIsActive({ folder: itemContent.label, file: "" })
    //             }
    //         });
    //     });

    // }
    // useEffect(() => {
    //     clicks1();
    // }, [globalState])

    const Breadcrumb = () => {
        return globalState.map((obj, i) => (
            <>
                {/* {i === 1 ? <span className="btn btn-default active" >{obj}</span> : <span className="btn btn-default" onClick={clicks1}>{obj}</span>} */}
                <span className="btn btn-default">{obj}</span>
            </>
        ));
    };

    return (
        <span className='row' style={{ width: 'auto' }}>
            {/* <div className='col-2 d-none d-md-block'></div> */}
            <div className='col-md-9 pr-2'>
                <div className='card m-2 mb-2 p-3' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none" }}>
                    <span style={{ width: "auto" }}>
                        <div className="btn-group btn-breadcrumb" style={{ border: "1px solid #d3d3d3", borderRadius: "5px" }}>
                            <a className="btn btn-default"><i className="fa-solid fa-house-chimney"></i></a>
                            {/* <span className="btn btn-default" onClick={clicks}>
                                {menuData[0].label}
                            </span> */}
                            <span className="btn btn-default">
                                {menuData[0].label}
                            </span>
                            <Breadcrumb />
                        </div>
                    </span>
                    <div className='row'>
                        <div className='col-md-9 d-none d-md-block'></div>
                        <div className='col-md-3 d-block d-sm-block d-md-none pt-2'>
                            <button type="button" className="btn btn-primary" style={{ position: "relative", float: "left" }} onClick={toggle}>
                                {state.collapse ? (
                                    <span>
                                        <i className="fa-solid fa-x fa-lg"></i>
                                    </span>
                                ) : (
                                    <span>
                                        <i className="fa-solid fa-navicon fa-lg"></i>
                                    </span>
                                )}
                            </button>
                            {globalState.length == 0 || globalState.length == 1 ? (
                                <>
                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            ) : globalContextState.selectedIndex >= uniqueArray.length - 1 && globalContextState.selectedIndex == 0 ? (
                                <>
                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            ) : globalContextState.selectedIndex >= uniqueArray.length - 1 ? (
                                <>
                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            ) : globalContextState.selectedIndex == 0 ? (
                                <>
                                    <button type='button' className='btn btn-success' onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type='button' className='btn btn-success' onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            )}
                        </div>
                        <div className='col-md-3 d-none d-md-block pt-2'>
                            {globalState.length == 0 || globalState.length == 1 ? (
                                <>
                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            ) : globalContextState.selectedIndex >= uniqueArray.length - 1 && globalContextState.selectedIndex == 0 ? (
                                <>
                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            ) : globalContextState.selectedIndex >= uniqueArray.length - 1 ? (
                                <>
                                    <button type='button' className='btn btn-success' disabled onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            ) : globalContextState.selectedIndex == 0 ? (
                                <>
                                    <button type='button' className='btn btn-success' onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' disabled onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type='button' className='btn btn-success' onClick={() => Next()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-right fa-lg"></i>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' onClick={() => Prev()} style={{ position: "relative", float: "right", width: "43px" }}>
                                        <i className="fa-solid fa-caret-left fa-lg"></i>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
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
            </div>
            <div className='col-md-3 d-none d-md-block p-0 pr-3'>
                <div className='card mt-2 p-2 mr-2' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none", width: "auto" }}>
                    <div>Discussion form</div>
                </div>
            </div>
            <div className='col-md-12 d-block d-sm-block d-md-none'>
                <div className='card ml-2 p-2' style={{ boxShadow: "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)", border: "none", width: "auto" }}>
                    <div>Discussion form</div>
                </div>
            </div>
        </span>
    );
}

export default BootstrapMenu;