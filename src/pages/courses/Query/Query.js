import React, { useEffect, useState, useRef, useContext } from 'react';
import { format, render, cancel, register } from 'timeago.js';
import ReactHtmlParser from 'react-html-parser';
import { CKEditor } from 'ckeditor4-react';
import { Modal, Button } from 'react-bootstrap';
// import './style.css';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import service from '../../../services/service';
import UserService from '../../../services/UserService';
import { GlobalContext } from '../../../context/GlobalContext';

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
function Query({ courseid, tenantid, userid, itemid, instructor }) {

    useEffect(() => {
        //console.log(courseid, tenantid, userid, itemid, instructor)
        UserService.generateToken();
    }, []);

    const { globalContextState, setGlobalContextState } = useContext(GlobalContext)

    const um_api = UserService.USER_API;
    ////console.log(um_api);

    const [getInstructor, setInstructor] = useState();
    //const [getPostedValues, setPostedValue] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const [getResponse, setResponse] = useState([]);
    const [visibilityId, setVisibilityId] = useState(0);
    const [editorState, setEditorState] = useState();
    const [getUpdateValues, setUpdateValues] = useState();
    const [getModalState, setModalState] = useState();
    const [getReportSpamState, setReportSpamState] = useState({ flag: false, value: 0 });
    const [getSpamValue, setSpamValue] = useState();
    const [validations, setValidations] = useState({ title: '', value: '' });
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    let tenantId = 1;

    const [isQueryEmpty, setIsQueryEmpty] = useState(false);
    const [isQueryExist, setIsQueryExist] = useState(false);



    useEffect(() => {
        getQuestions();
        service.getInstructorDetails(courseid, tenantId)
            .then((res) => {
                setInstructor(res.data.map((d) => d.learnerUsername))

            })
            .catch(err => {
                //console.log(err);
            })
    }, [isQueryEmpty, isQueryExist])

    const getQuestions = () => {
        if (instructor == "instructor") {
            service.getQueryQuestions(courseid, userid)
                .then(res => {
                    ////console.log( res.data);
                    //setPostedValue(res.data);
                    setGlobalContextState(prevState => { return { ...prevState, queryData: res.data } })
                    ////console.log(globalContextState.queryData.length === 0);
                    if (globalContextState.queryData.length === 0) {
                        setIsQueryEmpty(true);
                        setIsQueryExist(false);
                    }
                    if (globalContextState.queryData.length !== 0) {
                        setIsQueryExist(true);
                        setIsQueryEmpty(false);
                    }
                })
                .catch(err => {
                    //console.log("Query Service is not working");
                })

        } else {
            service.getQueryQuestionByCourseIdAndLearnerId(courseid, userid)
                .then(res => {
                    ////console.log("Query test" ,res.data);
                    setGlobalContextState(prevState => { return { ...prevState, queryData: res.data } })
                    //setPostedValue(res.data);
                    ////console.log(res.data)

                    if (globalContextState.queryData.length === 0) {
                        setIsQueryEmpty(true);
                        setIsQueryExist(false);
                    }
                    if (globalContextState.queryData.length !== 0) {
                        setIsQueryExist(true);
                        setIsQueryEmpty(false);
                    }
                })
                .catch(err => {
                    //console.log("Query Service is not working");
                })
        }
    }

    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }


    const editorHandler = (evt) => {
        setEditorState(evt.editor.getData());
    }

    const [submitHandlerLoading, setSubmitHandlerLoading] = useState({
        isLoading: false
    })


    const submitHandler = () => {
        if (!editorState) {
            setValidations({ value: t('blank_title_not_allowed') });
        }
        else {
            setSubmitHandlerLoading({ isLoading: true });
            service.setPostQuestion(tenantid, {
                content: editorState,
                courseId: courseid,
                askedTo: getInstructor[0],
                userId: userid
            })
                .then(res => {
                    if (res.status == 201) {
                        swal(t('query_added_success'), "", "success");
                        getQuestions();
                    }
                    setVisibility(false);
                    setValidations({ title: "", value: "" });
                    setEditorState('');
                    setSubmitHandlerLoading({ isLoading: false });
                })
                .catch(err => {
                    //console.log(err);
                })
        }

    }

    const responseHandler = (postId) => {
        service.getResponseValues(postId, tenantid)
            .then(res => {
                setResponse(res.data);
            })
            .catch(err => {
                //console.log(err);
            })
        setVisibility(false);
    }

    const deleteQuestion = (id) => {
        service.deleteQuestion(id, tenantid)
            .then(res => {
                if (res.status == 200) {
                    swal(t('query_delete_success'), "", "success");;
                    getQuestions();
                }
            })
            .catch(err => {
                //console.log(err)
            })
    }

    const getPostValues = (id) => {
        service.getUpdatePostValues(id, tenantid)
            .then(res => {
                setUpdateValues(res.data);
                setModalState(true);
            })
            .catch(err => {
                //console.log(err);
            })
    }


    const [updateResponseValuesLoading, setUpdateResponseValuesLoading] = useState({
        isLoading: false
    })

    const updatePostValues = (id) => {
        let content = '';
        if (editorState) {
            content = editorState;
        }
        else {
            content = getUpdateValues.content;
        }
        if (content == '') {
            setValidations({ title: t('blank_title_not_allowed'), value: t('blank_content_not_allowed') });
        }
        else if (content == '') {
            setValidations({ value: t('blank_title_not_allowed') });
        }
        else {
            setUpdateResponseValuesLoading({ isLoading: true });
            service.setUpdatePostValues(tenantid, {
                content: content,
                courseId: courseid,
                itemParentId: itemid,
                postId: id,
                userId: userid
            })
                .then(res => {
                    swal(t('discussion_updated_successfully'), "", "success");
                    service.getPostValues(courseid, itemid, tenantid)
                        .then(res => {
                            getQuestions();
                            setUpdateResponseValuesLoading({ isLoading: false });
                        })
                        .catch(err => {
                            //console.log(err);
                        })
                    setModalState(false);
                    setValidations({ value: "" });
                    setEditorState('');
                })
                .catch(err => {
                    //console.log(err);
                })
        }

    }



    return (
        <div>
            <div className="col-md-12">
                {/* <div className="page-header">
                            <h1><small className="pull-right">45 comments</small> Comments </h1>
                        </div> */}
                <div className="page-header">
                    <h2 className="h2">{t('query')}</h2>
                    <br />
                </div>

                {isQueryExist && (<div className="comments-list" id="firstReload">
                    {
                        globalContextState.queryData.map((data, i) => {
                            return (
                                <div key={data.postMaster.postId}>
                                    <div className="media">
                                        <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                            <img src={um_api + `getprofilepic/${data.postMaster.userId}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                        </a>
                                        <span className="span-right"></span>
                                        <div className="media-body" style={{ margin: '10px' }}>
                                            <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.postMaster.content)}</p>
                                            <p style={{ marginTop: '10px' }}><small><button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => [responseHandler(data.postMaster.postId), setVisibilityId(data.postMaster.postId)]} title={t('show_response')}><i className="fa fa-reply"></i></button> <small style={{ marginLeft: "4px" }}>{data.postMaster.responseMasters.length}</small></small>
                                                {userid == data.postMaster.userId ?
                                                    <span className="pull-right">
                                                        {/* <i className="las la-edit" style={{ fontSize: "24px", color: "green" }} onClick={() => getPostValues(data.postMaster.postId)} title="Update"></i> */}
                                                        <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => deleteQuestion(data.questionId)} title={t('delete')}></i>
                                                    </span>
                                                    : ''}
                                            </p>
                                        </div>

                                        <p className="pull-right"><small>{dateConverter(data.postMaster.createDate)}</small></p>
                                    </div>
                                    {data.postMaster.postId === visibilityId ? <ResponseComponent response={getResponse} postId={visibilityId} tenantid={tenantid} userid={userid} courseid={courseid} instructor={instructor} /> : null}

                                </div>
                            )
                        })
                    }
                </div>)}
                {isQueryEmpty && (
                    <div>
                        <p>{t('no_queries_found')}</p>
                    </div>
                )}
            </div>
            <br />
            {visibility ?
                <div >
                    <CKEditor onChange={editorHandler} />
                    <p style={{ color: "red" }}>{validations.value}</p>
                    <br />
                    <button className="btn btn-primary" style={{ background: "green" }} onClick={() => submitHandler()} disabled={submitHandlerLoading.isLoading ? "true" : ""}>{submitHandlerLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</button>
                    <button className="btn btn-danger" onClick={() => setVisibility(false)} style={{ marginLeft: "1vh" }}>{t('close')}</button>
                </div> :
                <b> {instructor == "instructor" ? '' : <button class="btn btn-light" onClick={() => setVisibility(true)} style={{ color: "#006400" }}><h6>{t('add_query')}</h6></button>}</b>
            }
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={getModalState}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('update')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <textarea id="content" name="content" className="form-control" placeholder="Enter your content" /> */}
                    <CKEditor onChange={editorHandler} initData={getUpdateValues ? ReactHtmlParser(getUpdateValues.content) : null} />
                    <p style={{ color: "red" }}>{validations.value}</p>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => updatePostValues(getUpdateValues.postId)} disabled={updateResponseValuesLoading.isLoading ? "true" : ""}>{updateResponseValuesLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</Button>
                    <Button onClick={() => setModalState(false)} className="btn btn-danger">{t('close')}</Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
}

function ResponseComponent({ response, postId, tenantid, userid, courseid, instructor }) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const { setGlobalContextState } = useContext(GlobalContext);

    const [visibility, setVisibility] = useState(false);
    const [visibilityId, setVisibilityId] = useState(0);
    const [comments, setComments] = useState([]);
    const [editorState, setEditorState] = useState();
    const [getResponse, setResponse] = useState();
    const [getUpdateValues, setUpdateValues] = useState();
    const [getModalState, setModalState] = useState();
    const [getReportSpamState, setReportSpamState] = useState({ flag: false, value: 0 });
    const [getSpamValue, setSpamValue] = useState();
    const [validations, setValidations] = useState();
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])
    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }
    const editorHandler = (evt) => {
        setEditorState(evt.editor.getData());
    }
    const responseHandler = (id) => {
        service.getCommentValues(id, tenantid)
            .then(res => {
                setComments(res.data);

            })
            .catch(err => {
                //console.log(err);
            })
        setVisibility(false);
    }

    const getQuestions = () => {
        if (instructor == "instructor") {
            service.getQueryQuestions(courseid, userid)
                .then(res => {
                    //setPostedValue(res.data);
                    ////console.log( res.data);
                    setGlobalContextState(prevState => { return { ...prevState, queryData: res.data } })
                    ////console.log(res.data)
                })
                .catch(err => {
                    //console.log("Query Service is not working");
                })

        } else {
            service.getQueryQuestionByCourseIdAndLearnerId(courseid, userid)
                .then(res => {
                    ////console.log( res.data);
                    setGlobalContextState(prevState => { return { ...prevState, queryData: res.data } })
                    //setPostedValue(res.data);
                    ////console.log(res.data)
                })
                .catch(err => {
                    //console.log("Query Service is not working");
                })
        }
    }

    const [submitHandlerLoading, setSubmitHandlerLoading] = useState({
        isLoading: false
    })

    const submitHandler = () => {

        const um_api = UserService.USER_API;
        ////console.log(um_api);

        if (!editorState) {
            setValidations(t('blank_title_not_allowed'));
        }
        else {
            setSubmitHandlerLoading({ isLoading: true });
            service.setResponseValues(tenantid, {
                postId: postId,
                rcontent: editorState,
                responseId: 0,
                ruserid: userid
            })
                .then(res => {
                    if (res.status == 201) {
                        swal(t('response_added_successfully'), "", "success");
                    }
                    service.getResponseValues(postId, tenantid)
                        .then(res => {
                            setResponse(res.data);
                            getQuestions();
                            setSubmitHandlerLoading({ isLoading: false });
                        })
                        .catch(err => {
                            //console.log(err);
                        })
                    setVisibility(false);
                    setValidations('');
                    setEditorState('');
                })
                .catch(err => {
                    //console.log(err);
                })
        }

    }

    const getResponseValues = (id) => {
        service.getUpdateResponseValues(id, tenantid)
            .then(res => {
                setUpdateValues(res.data);
                setModalState(true);
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const [updateResponseValuesLoading, setUpdateResponseValuesLoading] = useState({
        isLoading: false
    })

    const updateResponseValues = (id) => {
        let content = '';
        if (editorState) {
            content = editorState;
        }
        else {
            content = getUpdateValues.content;
        }
        if (content == '') {
            setValidations(t('blank_content_not_allowed'));
        }
        else {

            setUpdateResponseValuesLoading({ isLoading: true });
            service.setUpdateResponseValues(tenantid, {
                tenantid: tenantid,
                postId: postId,
                rcontent: content,
                responseId: id,
                ruserid: userid
            })
                .then(res => {
                    if (res.status == 200) {
                        swal(t('response_updated_successfully'), "", "success");;
                    }
                    setModalState(false);
                    setValidations('');
                    setEditorState('');
                    service.getResponseValues(postId, tenantid)
                        .then(res => {
                            setResponse(res.data);
                            getQuestions();
                            setUpdateResponseValuesLoading({ isLoading: false });
                        })
                        .catch(err => {
                            //console.log(err);
                        })

                })
        }
    }
    const um_api = UserService.USER_API;

    const deleteResponseValues = (id) => {



        service.deleteResponseValues(id, tenantid)
            .then(res => {
                if (res.status == 200) {
                    swal(t('response_deleted_successfully'), "", "success");;
                    service.getResponseValues(postId, tenantid)
                        .then(res => {
                            setResponse(res.data);
                            getQuestions();
                        })
                        .catch(err => {
                            //console.log(err);
                        })
                }
            })
            .catch(err => {
                //console.log(err);
            })
    }

    return (
        <div style={{ marginLeft: "11vh" }}>
            <div className="comments-list">
                {getResponse ?
                    getResponse.map((data, i) => {
                        return (
                            <div key={data.responseId}>
                                <div className="media">

                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepic/${data.ruserid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.rcontent)}</p>
                                    </div>
                                    <p className="pull-right"><small>{dateConverter(data.createDate)}</small></p>
                                </div>

                            </div>
                        )
                    })
                    :
                    response.map((data, i) => {
                        return (
                            <div key={data.responseId}>
                                <div className="media">

                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepic/${data.ruserid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.rcontent)}</p>
                                        <p style={{ marginTop: "10px" }}>
                                            {userid == data.ruserid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => getResponseValues(data.responseId)} title="Update"></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => deleteResponseValues(data.responseId)} title="Delete"></i>

                                                </span>
                                                : ''}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <br />
                {visibility ?
                    <div>
                        <CKEditor onChange={editorHandler} />
                        <p style={{ color: "red" }}>{validations}</p>
                        <br />
                        <button className="btn btn-primary" style={{ background: "green" }} onClick={() => submitHandler()} disabled={submitHandlerLoading.isLoading ? "true" : ""}>{submitHandlerLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</button>
                        <button className="btn btn-danger" onClick={() => setVisibility(false)} style={{ marginLeft: "1vh" }}>{t('close')}</button>
                    </div>
                    :
                    <b><button className='btn btn-light' onClick={() => setVisibility(true)} style={{ color: "#006400" }}><h6>{t('add_a_response')}</h6></button></b>
                }
            </div>
            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={getModalState}
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {t('update')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CKEditor onChange={editorHandler} initData={getUpdateValues ? ReactHtmlParser(getUpdateValues.rcontent) : null} />
                        <p style={{ color: "red" }}>{validations}</p>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => updateResponseValues(getUpdateValues.responseId)} disabled={updateResponseValuesLoading.isLoading ? "true" : ""}>{updateResponseValuesLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</Button>
                        <Button onClick={() => setModalState(false)} className="btn btn-danger">{t('close')}</Button>
                    </Modal.Footer>
                </Modal>
            </div>


        </div>
    );
}



export default Query;

