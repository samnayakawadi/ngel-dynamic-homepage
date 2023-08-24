import React, { useEffect, useState, useRef, useContext } from 'react';
import { format, render, cancel, register } from 'timeago.js';
import ReactHtmlParser from 'react-html-parser';
import { CKEditor } from 'ckeditor4-react';
import service from '../../services/service';
import { Modal, Button } from 'react-bootstrap';
import './style.css';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { Pointer } from 'highcharts';
import UserService from '../../services/UserService';
import { GlobalContext } from '../../context/GlobalContext';

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

let ResponseCount = 0;

let commentCount = 0;

// const DiscussionMain2 = () => {
//     const getDiscussionData = (courseid, itemid, tenantid) => {
//         service.getPostValues(courseid, itemid, tenantid)
//             .then(res => {
//                 setPostedValue(res.data);
//                 //console.log(res.data);
//             })
//             .catch(err => {
//                 //console.log("discussion Service is not working");
//             })
//     }

//     return { getDiscussionData }
// }

function DiscussionMain({ courseid, tenantid, userid, itemid }) {

    useEffect(() => {
        //console.log("Discussion Course Id - ",courseid,"-", tenantid,"-", userid,"-", itemid)
        UserService.generateToken();
    }, []);

    const { globalContextState, setGlobalContextState } = useContext(GlobalContext)

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    const um_api = UserService.USER_API;
    ////console.log(um_api);

    //let [ResponseCount, setResponseCount] = useState(0);
    // const [getPostedValues, setPostedValue] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const [getResponse, setResponse] = useState([]);
    const [visibilityId, setVisibilityId] = useState(0);
    const [editorState, setEditorState] = useState();
    const [getUpdateValues, setUpdateValues] = useState();
    const [getModalState, setModalState] = useState();
    const [getReportSpamState, setReportSpamState] = useState({ flag: false, value: 0 });
    const [getSpamValue, setSpamValue] = useState();
    const [validations, setValidations] = useState({ title: '', value: '' });

    const getDiscussionData = (courseid, itemid, tenantid) => {
        ////console.log("Global State Dataaaaaa : ", globalContextState)
        service.getPostValues(courseid, itemid, tenantid)
            .then(res => {
                ////console.log(res.data)
                // setPostedValue(res.data);
                setGlobalContextState(prevState => { return { ...prevState, discussionData: res.data } })
                ////console.log(res.data);
            })
            .catch(err => {
                //console.log("discussion Service is not working");
            })
    }

    // useEffect(() => {
    //     setGlobalContextState(prevState => { return { ...prevState, discussionData: getPostedValues } })
    // }, [getPostedValues])

    // useEffect(() => {

    // }, [globalContextState.discussionData])

    useEffect(() => {
        getDiscussionData(courseid, itemid, tenantid)
    }, [])

    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }


    //let ResponseCount = 0;

    const [submitHandlerLoading, setSubmitHandlerLoading] = useState({
        isLoading: false
    })


    const editorHandler = (evt) => {
        setEditorState(evt.editor.getData());
    }
    const submitHandler = () => {
        const title = document.getElementById('title').value;

        let titleerr = '';
        let valueerr = "";
        if (title == '') {
            titleerr = t('blank_title_not_allowed')
        }
        else if (!title.match(/^[A-Za-z ]+$/)) {
            titleerr = t('alphabet_with_space')
        }
        if (!editorState) {
            valueerr = t('blank_content_not_allowed')
        }
        // else if (!editorState.match(/^[A-Za-z0-9&.,< > / ]+$/)) {

        //     console.log(editorState.match(/^[A-Za-z0-9&.,< > / ]+$/))
        //     valueerr = "Alphabet with space , Digit and Special Character (? , .)   are Allowed";
        // }
        if (titleerr || valueerr) {
            setValidations({
                ...validations,
                title: titleerr,
                value: valueerr
            })
            return
        }



        // if (title == '' && !editorState) {
        //     setValidations({ title: t('blank_title_not_allowed'), value: t('blank_content_not_allowed') });
        // }
        // else if (!title.match(/^[A-Za-z ]+$/) || !editorState.match(/^[A-Za-z&,. ]+$/)) {
        //     setValidations({ title: "Alphabet with space are Allowed", value: "Alphabet with space , Digit and Special Character (? , .)   are Allowed" });
        // }
        // else if (title == '') {
        //     setValidations({ title: t('blank_title_not_allowed') });
        // }
        // else if (!editorState) {
        //     setValidations({ value: t('blank_title_not_allowed') });
        // }
        // else {
        setSubmitHandlerLoading({ isLoading: true });
        service.setPostValues(tenantid, {
            content: editorState,
            courseId: courseid,
            itemParentId: itemid,
            title: title,
            userId: userid
        })
            .then(res => {
                setSubmitHandlerLoading({ isLoading: false });
                if (res.status == 201) {
                    swal(t('discussion_added_successfully'), "", "success");
                    // $('#firstReload').load(' #firstReload');
                }
                service.getPostValues(courseid, itemid, tenantid)
                    .then(res => {
                        // setPostedValue(res.data);
                        setGlobalContextState(prevState => { return { ...prevState, discussionData: res.data } })
                        setSubmitHandlerLoading({ isLoading: false });
                    })
                    .catch(err => {
                        //console.log(err);
                    })

                setVisibility(false);
                setValidations({ title: "", value: "" });
                setEditorState('');
                title = '';
            })
            .catch(err => {
                //console.log(err);
            })
        // }

    }

    const responseHandler = (postId, ResponseCount) => {
        service.getResponseValues(postId, tenantid)
            .then(res => {
                setResponse(res.data);
                ////console.log(length);

                ////console.log(ResponseCount);
            })
            .catch(err => {
                //console.log(err);
            })
        setVisibility(false);
    }

    const deletePostValues = (id) => {
        service.deletePostValues(id, tenantid)
            .then(res => {
                if (res.status == 200) {
                    swal(t('discussion_deleted_successfully'), "", "success");;
                }
                service.getPostValues(courseid, itemid, tenantid)
                    .then(res => {
                        // setPostedValue(res.data);
                        setGlobalContextState(prevState => { return { ...prevState, discussionData: res.data } })
                    })
                    .catch(err => {
                        //console.log(err);
                    })

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

    const [updatePostValuesLoading, setUpdatePostValuesLoading] = useState({
        isLoading: false
    })

    const updatePostValues = (id) => {
        const title = document.getElementById('updateTitle').value;
        let content = '';
        if (editorState) {
            content = editorState;
        }
        else {
            content = getUpdateValues.content;
        }
        if (title == '' && content == '') {
            setValidations({ title: t('blank_title_not_allowed'), value: t('blank_content_not_allowed') });
        }
        else if (title == '') {
            setValidations({ title: t('blank_title_not_allowed') });
        }
        else if (content == '') {
            setValidations({ value: t('blank_title_not_allowed') });
        }
        else {
            setUpdatePostValuesLoading({ isLoading: true });
            service.setUpdatePostValues(tenantid, {
                content: content,
                courseId: courseid,
                itemParentId: itemid,
                postId: id,
                title: title,
                userId: userid
            })
                .then(res => {
                    swal(t('discussion_updated_successfully'), "", "success");
                    service.getPostValues(courseid, itemid, tenantid)
                        .then(res => {
                            // setPostedValue(res.data);
                            setGlobalContextState(prevState => { return { ...prevState, discussionData: res.data } })
                            setUpdatePostValuesLoading({ isLoading: false });
                        })
                        .catch(err => {
                            //console.log(err);
                        })
                    setModalState(false);
                    setValidations({ title: "", value: "" });
                    setEditorState('');
                    title = '';
                })
                .catch(err => {
                    //console.log(err);
                })
        }

    }

    const upvoteFunction = (id) => {
        service.setVote(tenantid, {
            id: id,
            vote: "1",
            voteType: "POST",
            votedBy: userid
        })
            .then(res => {
                service.getPostValues(courseid, itemid, tenantid)
                    .then(res => {
                        // setPostedValue(res.data);
                        setGlobalContextState(prevState => { return { ...prevState, discussionData: res.data } })
                    })
                    .catch(err => {
                        //console.log(err);
                    })
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const downvoteFunction = (id) => {
        service.setVote(tenantid, {
            id: id,
            vote: "0",
            voteType: "POST",
            votedBy: userid
        })
            .then(res => {
                service.getPostValues(courseid, itemid, tenantid)
                    .then(res => {
                        // setPostedValue(res.data);
                        setGlobalContextState(prevState => { return { ...prevState, discussionData: res.data } })
                    })
                    .catch(err => {
                        alert("Service is down please try after some time");
                    })
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const reportSpamFunction = (id) => {
        setReportSpamState({ flag: true, value: id });
    }

    const [submitSpamValueLoading, setSubmitSpamValueLoading] = useState({
        isLoading: false
    })

    const submitSpamValue = () => {
        setSubmitSpamValueLoading({ isLoading: true });
        service.setReportSpam(tenantid, {
            id: getReportSpamState.value,
            reportSpamBy: userid,
            reportSpamValue: getSpamValue,
            type: "POST"
        })
            .then(res => {
                setReportSpamState({ flag: false });
                setSubmitSpamValueLoading({ isLoading: false });
            })
            .catch(err => {
                //console.log(err);
            })
    }

    return (
        <div>
            <div className="col-md-12">
                {/* <div className="page-header">
                            <h1><small className="pull-right">45 comments</small> Comments </h1>
                        </div> */}
                <div className="page-header">
                    <h2 className="h2">{t('discussion')}</h2>
                    <br />
                </div>
                <div className="comments-list" id="firstReload">
                    {
                        globalContextState.discussionData.map((data, i) => {

                            ////console.log("data---> " + JSON.stringify(data));

                            if (data.responseMasters === undefined) {
                                ResponseCount = 0;
                            }
                            else {
                                ResponseCount = data.responseMasters.length;
                            }
                            ////console.log(ResponseCount);
                            return (
                                <div key={data.postId}>
                                    <div className="media">
                                        <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                            <img src={um_api + `getprofilepic/${data.userId}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                        </a>
                                        <span className="span-right"></span>
                                        <div className="media-body" style={{ margin: '10px' }}>
                                            <p style={{ marginTop: "10px" }}><b>{data.title}</b></p>
                                            <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.content)}</p>
                                            <p style={{ marginTop: '10px' }}><small>
                                                <button className='btn btn-light' onClick={() => upvoteFunction(data.postId)} title="Like">
                                                    <i className="far fa-thumbs-up"></i></button>
                                                <small style={{ marginLeft: "4px" }}>{data.upvote}</small>
                                                <button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => downvoteFunction(data.postId)} title="Dislike">
                                                    <i className="far fa-thumbs-down"></i></button>
                                                <small style={{ marginLeft: "4px" }}>{data.downvote}</small>
                                                <button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => [responseHandler(data.postId, ResponseCount), setVisibilityId(data.postId)]} title={t('show_response')}>
                                                    <i className="fa fa-reply"></i></button>
                                                <small style={{ marginLeft: "4px" }}>{ResponseCount}</small>

                                            </small>
                                                {userid == data.userId ?
                                                    <span className="pull-right">
                                                        <i className="las la-edit" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => getPostValues(data.postId)} title={t('Updates')}></i>
                                                        <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => deletePostValues(data.postId)} title={t('delete')}></i>
                                                        <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px", cursor: "pointer" }} onClick={() => reportSpamFunction(data.postId)} title={t('report_spam')}></i>
                                                    </span>
                                                    :
                                                    <span className="pull-right">
                                                        <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => reportSpamFunction(data.postId)} title={t('report_spam')}></i>
                                                    </span>}
                                            </p>
                                        </div>

                                        <p className="pull-right"><small>{dateConverter(data.createDate)}</small></p>
                                    </div>
                                    {data.postId === visibilityId ? <ResponseComponent response={getResponse} postId={visibilityId} tenantid={tenantid} userid={userid} courseid={courseid} itemid={itemid} /> : null}

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <br />
            {visibility ?
                <div >
                    <input type="text" minLength={5} maxLength={50} id="title" name="title" className="form-control" placeholder={t('enter_your_title')} />
                    <p style={{ color: "red" }}>{validations.title}</p>
                    <br />
                    {/* <textarea id="content" name="content" className="form-control" placeholder="Enter your content" /> */}
                    <CKEditor onChange={editorHandler} />
                    <p style={{ color: "red" }}>{validations.value}</p>
                    <br />
                    <button className="btn btn-primary" style={{ background: "green" }} onClick={() => submitHandler()} disabled={submitHandlerLoading.isLoading ? "true" : ""}>{submitHandlerLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</button>
                    <button className="btn btn-danger" onClick={() => setVisibility(false)} style={{ marginLeft: "1vh" }}>{t('close')}</button>
                </div> :
                <b><button class="btn btn-light" onClick={() => setVisibility(true)} style={{ color: "#006400" }}><h6>{t('start_a_discussion')}</h6></button></b>
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
                    <input type="text" id="updateTitle" minLength={5} maxLength={50} className="form-control" placeholder={t('enter_your_title')} defaultValue={getUpdateValues ? getUpdateValues.title : null} />
                    <p style={{ color: "red" }}>{validations.title}</p>
                    <br />
                    {/* <textarea id="content" name="content" className="form-control" placeholder="Enter your content" /> */}
                    <CKEditor onChange={editorHandler} initData={getUpdateValues ? ReactHtmlParser(getUpdateValues.content) : null} />
                    <p style={{ color: "red" }}>{validations.value}</p>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => updatePostValues(getUpdateValues.postId)} style={{ background: "green" }} disabled={updatePostValuesLoading.isLoading ? "true" : ""}>{updatePostValuesLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</Button>
                    <Button onClick={() => setModalState(false)} className="btn btn-danger">{t('close')}</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={getReportSpamState.flag}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('help_us_in_understanding_what_is_happening')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p> */}
                    <div className="radio">
                        <label><input type="radio" value="It's Annoying" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('its_annoying')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="Not Interesting" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('not_interesting')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="It's a Spam Content" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('its_a_spam_content')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="Other" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('other')}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => submitSpamValue()} style={{ background: "green" }} disabled={submitSpamValueLoading.isLoading ? "true" : ""}>{submitSpamValueLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</Button>
                    <Button onClick={() => setReportSpamState(false)}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}



function ResponseComponent({ response, postId, tenantid, userid, courseid, itemid }) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const { setGlobalContextState } = useContext(GlobalContext)

    const um_api = UserService.USER_API;

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

    // useEffect(() => {
    //     //console.log("Checking Stateeeeee : ", globalContextState)
    // }, [])

    const getDiscussionData = (courseid, itemid, tenantid) => {

        service.getPostValues(courseid, itemid, tenantid)
            .then(res => {
                // setPostedValue(res.data);
                setGlobalContextState(prevState => { return { ...prevState, discussionData: res.data } })
                ////console.log(res.data);
            })
            .catch(err => {
                //console.log("discussion Service is not working");
            })
    }

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

    const [submitHandlerLoading, setSubmitHandlerLoading] = useState({
        isLoading: false
    })

    const submitHandler = () => {
        if (!editorState) {
            setValidations(t('blank_title_not_allowed'));
        }
        else {
            service.setResponseValues(tenantid, {
                postId: postId,
                rcontent: editorState,
                responseId: 0,
                ruserid: userid
            })
                .then(async (res) => {
                    setSubmitHandlerLoading({ isLoading: true });
                    if (res.status == 201) {
                        await swal(t('response_added_successfully'), "", "success");

                        ResponseCount = ResponseCount + 1;
                        ////console.log(ResponseCount);
                    }
                    service.getResponseValues(postId, tenantid)
                        .then(res => {
                            setResponse(res.data);
                            //window.location.reload();
                            ////console.log(courseid, tenantid, userid, itemid);
                            // DiscussionMain(courseid, tenantid, userid, itemid);
                            getDiscussionData(courseid, itemid, tenantid);
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


    const [responseValuesloading, setResponseValuesloading] = useState({
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
            setResponseValuesloading({ isLoading: true });
            service.setUpdateResponseValues(tenantid, {
                tenantid: tenantid,
                postId: postId,
                rcontent: content,
                responseId: id,
                ruserid: userid
            })
                .then(res => {
                    if (res.status == 200) {
                        swal(t('response_updated_successfully'), "", "success");
                        getDiscussionData(courseid, itemid, tenantid);
                    }
                    setModalState(false);
                    setValidations('');
                    setEditorState('');
                    service.getResponseValues(postId, tenantid)
                        .then(res => {
                            setResponse(res.data);
                            setResponseValuesloading({ isLoading: false });
                        })
                        .catch(err => {
                            //console.log(err);
                        })

                })
        }
    }

    const deleteResponseValues = (id) => {
        service.deleteResponseValues(id, tenantid)
            .then(async (res) => {
                if (res.status == 200) {
                    await swal(t('response_deleted_successfully'), "", "success");;
                    service.getResponseValues(postId, tenantid)
                        .then(res => {
                            setResponse(res.data);
                            getDiscussionData(courseid, itemid, tenantid);
                            //window.location.reload();
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
    const upvoteFunction = (id) => {
        service.setVote(tenantid, {
            id: id,
            vote: "1",
            voteType: "RESPONSE",
            votedBy: userid
        })
            .then(res => {
                service.getResponseValues(postId, tenantid)
                    .then(res => {
                        setResponse(res.data);
                    })
                    .catch(err => {
                        //console.log(err);
                    })
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const downvoteFunction = (id) => {
        service.setVote(tenantid, {
            id: id,
            vote: "0",
            voteType: "RESPONSE",
            votedBy: userid
        })
            .then(res => {
                service.getResponseValues(postId, tenantid)
                    .then(res => {
                        setResponse(res.data);
                    })
                    .catch(err => {
                        //console.log(err);
                    })
            })
            .catch(err => {
                //console.log(err);
            })
    }
    const reportSpamFunction = (id) => {
        setReportSpamState({ flag: true, value: id });
    }


    const [submitSpamValueloading, setSubmitSpamValueloading] = useState({
        isLoading: false
    })

    const submitSpamValue = () => {
        setSubmitSpamValueloading({ isLoading: true });
        service.setReportSpam(tenantid, {
            id: getReportSpamState.value,
            reportSpamBy: userid,
            reportSpamValue: getSpamValue,
            type: "RESPONSE"
        })
            .then(res => {
                setReportSpamState({ flag: false });
                setSubmitSpamValueloading({ isLoading: false });
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

                        ////console.log("data---> " + JSON.stringify(data.commentMasters));

                        if (data.commentMasters === undefined) {
                            commentCount = 0;
                        }
                        else {
                            commentCount = data.commentMasters.length;
                        }

                        return (
                            <div key={data.responseId}>
                                <div className="media">

                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepic/${data.ruserid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.rcontent)}</p>
                                        <p style={{ marginTop: "10px" }}><small>
                                            <button className='btn btn-light' onClick={() => upvoteFunction(data.responseId)} title="Like">
                                                <i className="far fa-thumbs-up"></i></button>
                                            <small style={{ marginLeft: "4px" }}>{data.upvote}</small>
                                            <button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => downvoteFunction(data.responseId)} title={t('dislike')}>
                                                <i className="far fa-thumbs-down"></i></button>
                                            <small style={{ marginLeft: "4px" }}>{data.downvote}</small>
                                            <button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => [responseHandler(data.responseId), setVisibilityId(data.responseId)]} title={t('show_comment')}>
                                                <i className="far fa-comments"></i></button>
                                            <small style={{ marginLeft: "4px" }}>{commentCount}</small>
                                        </small>
                                            {userid == data.ruserid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => getResponseValues(data.responseId)} title={t('Update')}></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => deleteResponseValues(data.responseId)} title={t('delete')}></i>
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px", cursor: "pointer" }} onClick={() => reportSpamFunction(data.responseId)} title={t("report_spam")}></i>

                                                </span>
                                                : <span className="pull-right">
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => reportSpamFunction(data.responseId)} title={t("report_spam")}></i>
                                                </span>}</p>
                                    </div>
                                    <p className="pull-right"><small>{dateConverter(data.createDate)}</small></p>
                                </div>


                                {data.responseId === visibilityId ? <CommentComponent comments={comments} responseId={visibilityId} tenantid={tenantid} userid={userid} /> : null}
                            </div>
                        )
                    })
                    :
                    response.map((data, i) => {

                        ////console.log("data---> " + JSON.stringify(data.commentMasters));

                        if (data.commentMasters === undefined) {
                            commentCount = 0;
                        }
                        else {
                            commentCount = data.commentMasters.length;
                        }

                        return (
                            <div key={data.responseId}>
                                <div className="media">

                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepic/${data.ruserid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.rcontent)}</p>
                                        <p style={{ marginTop: "10px" }}><small><button className='btn btn-light' onClick={() => upvoteFunction(data.responseId)} title="Like"><i className="far fa-thumbs-up"></i></button> <small style={{ marginLeft: "4px" }}>{data.upvote}</small> <button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => downvoteFunction(data.responseId)} title="Dislike"><i className="far fa-thumbs-down"></i></button> <small style={{ marginLeft: "4px" }}>{data.downvote}</small> <button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => [responseHandler(data.responseId), setVisibilityId(data.responseId)]} title="Show Comments"><i className="far fa-comments"></i></button> <small style={{ marginLeft: "4px" }}>{commentCount}</small></small>
                                            {userid == data.ruserid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => getResponseValues(data.responseId)} title="Update"></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => deleteResponseValues(data.responseId)} title="Delete"></i>
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px", cursor: "pointer" }} onClick={() => reportSpamFunction(data.responseId)} title={t('report_spam')}></i>

                                                </span>
                                                : <span className="pull-right">
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => reportSpamFunction(data.responseId)} title={t('report_spam')}></i>
                                                </span>}</p>
                                    </div>
                                    <p className="pull-right"><small>{dateConverter(data.createDate)}</small></p>
                                </div>
                                {data.responseId === visibilityId ? <CommentComponent comments={comments} responseId={visibilityId} tenantid={tenantid} userid={userid} /> : null}
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
                        <button className="btn btn-primary" style={{ background: "green" }} onClick={() => submitHandler()} disabled={submitHandlerLoading.isLoading ? "true" : ""}> {submitHandlerLoading.isLoading ? (<>{t('loading')}</>) : <>{t('submit')}</>}</button>
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
                        <Button style={{ background: "green" }} onClick={() => updateResponseValues(getUpdateValues.responseId)} disabled={responseValuesloading.isLoading ? "true" : ""}>{responseValuesloading.isLoading ? (<>{t('loading')}</>) : <>{t('submit')}</>}</Button>
                        <Button onClick={() => setModalState(false)} className="btn btn-danger">{t('close')}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={getReportSpamState.flag}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('help_us_in_understanding_what_is_happening')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p> */}
                    <div className="radio">
                        <label><input type="radio" value="It's Annoying" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('its_annoying')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="Not Interesting" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('not_interesting')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="It's a Spam Content" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('its_a_spam_content')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="Other" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('other')}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ background: "green" }} onClick={() => submitSpamValue()} disabled={submitSpamValueloading.isLoading ? "true" : ""}>{submitSpamValueloading.isLoading ? (<>{t('loading')}</>) : <>{t('submit')}</>}</Button>
                    <Button onClick={() => setReportSpamState(false)}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

function CommentComponent({ comments, responseId, tenantid, userid }) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const um_api = UserService.USER_API;

    const [visibility, setVisibility] = useState(false);
    const [getComments, setComments] = useState();
    const [editorState, setEditorState] = useState();
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


    const [submitHandlerLoading, setSubmitHandlerLoading] = useState({
        isLoading: false
    })

    const submitHandler = () => {
        if (!editorState) {
            setValidations(t('blank_title_not_allowed'));
        }
        else {
            setSubmitHandlerLoading({ isLoading: true });
            service.setCommentValues(tenantid, {
                cmtContent: editorState,
                cmtUserid: userid,
                commentId: 0,
                responseId: responseId
            })
                .then(res => {
                    if (res.data == 201) {
                        swal(t('comment_add_success'), "", "success");
                    }
                    service.getCommentValues(responseId, tenantid)
                        .then(res => {
                            setComments(res.data);
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
    const editorHandler = (evt) => {
        setEditorState(evt.editor.getData());
    }
    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }
    const getCommentValues = (id) => {
        service.getUpdateCommentValues(id, tenantid)
            .then(res => {
                setUpdateValues(res.data);
                setModalState(true);
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const [updateCommentValuesLoading, setUpdateCommentValuesLoading] = useState({
        isLoading: false
    })

    const updateCommentValues = (id) => {
        let content = '';
        if (editorState) {
            content = editorState;
        }
        else {
            content = getUpdateValues.content;
        }
        if (content == '') {
            setValidations(t('blank_title_not_allowed'));
        }
        else {
            setUpdateCommentValuesLoading({ isLoading: true });
            service.setUpdateCommentValues(tenantid,
                {
                    cmtContent: content,
                    cmtUserid: userid,
                    commentId: id,
                    responseId: responseId
                })
                .then(res => {
                    if (res.status == 200) {
                        swal(t('comment_update_success'), "", "success");
                    }
                    setModalState(false);
                    setValidations('');
                    setEditorState('');
                    service.getCommentValues(responseId, tenantid)
                        .then(res => {
                            setComments(res.data);
                            setUpdateCommentValuesLoading({ isLoading: false });
                        })
                        .catch(err => {
                            //console.log(err);
                        })


                })
                .catch(err => {
                    //console.log(err);
                })
        }
    }
    const deleteCommentValues = (id) => {
        service.deleteCommentValues(id, tenantid)
            .then(res => {
                if (res.status == 200) {
                    swal(t('comment_delete_success'), "", "success");
                }
                service.getCommentValues(responseId, tenantid)
                    .then(res => {
                        setComments(res.data);
                    })
                    .catch(err => {
                        //console.log(err);
                    })
            })
            .catch(err => {
                //console.log(err);
            })
    }
    const upvoteFunction = (id) => {
        service.setVote(tenantid, {
            id: id,
            vote: "1",
            voteType: "COMMENT",
            votedBy: userid
        })
            .then(res => {
                service.getCommentValues(responseId, tenantid)
                    .then(res => {
                        setComments(res.data);
                    })
                    .catch(err => {
                        //console.log(err);
                    })
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const downvoteFunction = (id) => {
        service.setVote(tenantid, {
            id: id,
            vote: "0",
            voteType: "COMMENT",
            votedBy: userid
        })
            .then(res => {
                service.getCommentValues(responseId, tenantid)
                    .then(res => {
                        setComments(res.data);
                    })
                    .catch(err => {
                        //console.log(err);
                    })
            })
            .catch(err => {
                //console.log(err);
            })
    }
    const reportSpamFunction = (id) => {
        setReportSpamState({ flag: true, value: id });
    }

    const [submitSpamValueLoading, setSubmitSpamValueLoading] = useState({
        isLoading: false
    })


    const submitSpamValue = () => {
        setSubmitSpamValueLoading({ isLoading: true });
        service.setReportSpam(tenantid, {
            id: getReportSpamState.value,
            reportSpamBy: userid,
            reportSpamValue: getSpamValue,
            type: "COMMENT"
        })
            .then(res => {
                setReportSpamState({ flag: false });
                setSubmitSpamValueLoading({ isLoading: false });
            })
            .catch(err => {
                //console.log(err);
            })
    }
    return (
        <div style={{ marginLeft: "11vh" }}>
            <div className="comments-list">
                {getComments ?
                    getComments.map((data, i) => {
                        return (
                            <div key={data.commentId}>
                                <div className="media">
                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepic/${data.cmtUserid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.cmtContent)}</p>
                                        <p style={{ marginTop: "10px" }}><small><button className='btn btn-light' onClick={() => upvoteFunction(data.commentId)} title="Like"><i className="far fa-thumbs-up"></i></button> <small style={{ marginLeft: "4px" }}>{data.upvote}</small> <button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => downvoteFunction(data.commentId)} title={t('dislike')}><i className="far fa-thumbs-down"></i></button> <small style={{ marginLeft: "4px" }}>{data.downvote}</small></small>
                                            {userid == data.cmtUserid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => getCommentValues(data.commentId)} title={t('Update')}></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => deleteCommentValues(data.commentId)} title={t('delete')}></i>
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px", cursor: "pointer" }} onClick={() => reportSpamFunction(data.commentId)} title={t('report_spam')}></i>

                                                </span>
                                                : <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px", cursor: "pointer" }} onClick={() => reportSpamFunction(data.commentId)} title={t('report_spam')}></i>}</p>
                                    </div>
                                    <p className="pull-right"><small>{dateConverter(data.createDate)}</small></p>

                                </div>
                            </div>
                        )
                    })
                    :
                    comments.map((data, i) => {
                        return (
                            <div key={data.commentId}>
                                <div className="media">
                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepic/${data.cmtUserid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.cmtContent)}</p>
                                        <p style={{ marginTop: "10px" }}><small><button className='btn btn-light' onClick={() => upvoteFunction(data.commentId)} title="Like"><i className="far fa-thumbs-up"></i></button> <small style={{ marginLeft: "4px" }}>{data.upvote}</small> <button className='btn btn-light' style={{ marginLeft: "4px" }} onClick={() => downvoteFunction(data.commentId)} title={t('dislike')}><i className="far fa-thumbs-down"></i></button> <small style={{ marginLeft: "4px" }}>{data.downvote}</small></small>
                                            {userid == data.cmtUserid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => getCommentValues(data.commentId)} title={t('Update')}></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green", cursor: "pointer" }} onClick={() => deleteCommentValues(data.commentId)} title={t('delete')}></i>
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px", cursor: "pointer" }} onClick={() => reportSpamFunction(data.commentId)} title={t('report_spam')}></i>
                                                </span>
                                                : <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px", cursor: "pointer" }} onClick={() => reportSpamFunction(data.commentId)} title={t('report_spam')}></i>}</p>
                                    </div>
                                    <p className="pull-right"><small>{dateConverter(data.createDate)}</small></p>

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
                        <button className="btn btn-primary" style={{ background: "green" }} onClick={() => submitHandler()} disabled={submitHandlerLoading.isLoading ? "true" : ""}>{submitHandlerLoading.isLoading ? (<> {t('loading')}</>) : <>{t('submit')}</>}</button>
                        <button className="btn btn-danger" onClick={() => setVisibility(false)} style={{ marginLeft: "1vh" }}>{t('close')}</button>
                    </div>
                    :
                    <b><button className='btn btn-light' onClick={() => setVisibility(true)} style={{ color: "#006400" }}><h6>{t('add_a_comment')} </h6></button></b>
                }
            </div>
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
                    <CKEditor onChange={editorHandler} initData={getUpdateValues ? ReactHtmlParser(getUpdateValues.cmtContent) : null} />
                    <p style={{ color: "red" }}>{validations}</p>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => updateCommentValues(getUpdateValues.commentId)} style={{ background: "green" }} disabled={updateCommentValuesLoading.isLoading ? "true" : ""}>{updateCommentValuesLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</Button>
                    <Button onClick={() => setModalState(false)} className="btn btn-danger">{t('close')}</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={getReportSpamState.flag}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('help_us_in_understanding_what_is_happening')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p> */}
                    <div className="radio">
                        <label><input type="radio" value="It's Annoying" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('its_annoying')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="Not Interesting" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('not_interesting')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="It's a Spam Content" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('its_a_spam_content')}</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" value="Other" name="spam" onChange={(e) => setSpamValue(e.target.value)} />&nbsp;{t('other')}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => submitSpamValue()} style={{ background: "green" }} disabled={submitSpamValueLoading.isLoading ? "true" : ""}>{submitSpamValueLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('submit')}</>)}</Button>
                    <Button onClick={() => setReportSpamState(false)}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DiscussionMain;
