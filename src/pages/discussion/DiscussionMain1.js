import React, { useEffect, useState, useRef } from 'react';
import { format, render, cancel, register } from 'timeago.js';
import ReactHtmlParser from 'react-html-parser';
import { CKEditor } from 'ckeditor4-react';
import service from '../../services/service';
import { Modal, Button } from 'react-bootstrap';
import './style.css';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import UserService from '../../services/UserService';

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
function DiscussionMain1({ courseid, tenantid, userid, itemid, useremail }) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const um_api = UserService.USER_API;
    ////console.log(um_api);


    const [getPostedValues, setPostedValue] = useState([]);
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
    useEffect(() => {
        service.getDiscussionsByItem(itemid, tenantid, UserService.getEmail())
            .then(res => {
                ////console.log(res.data);
                setPostedValue(res.data);
            })
            .catch(err => {
                swal("Network error", "", "error");
            })
    }, [])

    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }


    const editorHandler = (evt) => {
        setEditorState(evt.editor.getData());
    }
    const submitHandler = () => {
        const title = document.getElementById('title').value;
        if (title == '' && !editorState) {
            setValidations({ title: t('blank_title_not_allowed'), value: t('blank_content_not_allowed') });
        }
        else if (title == '') {
            setValidations({ title: t('blank_title_not_allowed') });
        }
        else if (!editorState) {
            setValidations({ value: t('blank_title_not_allowed') });
        }
        else {
            service.addDiscussion(title, courseid, UserService.getEmail(), encodeURIComponent(editorState), tenantid, itemid, UserService.getUsername())
                .then(res => {
                    if (res.status == 201) {
                        swal(t('discussion_added_successfully'), "", "success");
                        // $('#firstReload').load(' #firstReload');
                    }
                    service.getDiscussionsByItem(itemid, tenantid, UserService.getEmail())
                        .then(res => {
                            setPostedValue(res.data);
                        })
                        .catch(err => {
                            //console.log(err.data);
                        })

                    setVisibility(false);
                    setValidations({ title: "", value: "" });
                    setEditorState('');
                    title = '';
                })
                .catch(err => {
                    //console.log(err);
                })
        }

    }

    const responseHandler = (postId) => {
        service.getAllPostInfo(postId, tenantid)
            .then(res => {
                setResponse(res.data.responsedto);
                // //console.log(res.data.responsedto);
            })
            .catch(err => {
                //console.log(err);
            })
        setVisibility(false);
    }

    const deletePostValues = (id) => {
        service.deleteDiscussion(id, tenantid)
            .then(res => {
                if (res.status == 200) {
                    swal(t('discussion_deleted_successfully'), "", "success");;
                }
                service.getDiscussionsByItem(itemid, tenantid, UserService.getEmail())
                    .then(res => {
                        setPostedValue(res.data);
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
        service.getAllPostInfo(id, tenantid)
            .then(res => {
                setUpdateValues(res.data);
                setModalState(true);
            })
            .catch(err => {
                //console.log(err);
            })
    }

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
            setValidations({ value: t('blank_content_not_allowed') });
        }
        else {
            service.updateDiscussion(id, encodeURIComponent(content), tenantid)
                .then(res => {
                    swal(t('discussion_updated_successfully'), "", "success");
                    service.getDiscussionsByItem(itemid, tenantid, UserService.getEmail())
                        .then(res => {
                            setPostedValue(res.data);
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

    // const upvoteFunction = (id) => {
    //     service.setVote(tenantid, {
    //         id: id,
    //         vote: "1",
    //         voteType: "POST",
    //         votedBy: userid
    //     })
    //         .then(res => {
    //             service.getPostValues(courseid, itemid, tenantid)
    //                 .then(res => {
    //                     setPostedValue(res.data);
    //                 })
    //                 .catch(err => {
    //                     //console.log(err);
    //                 })
    //         })
    //         .catch(err => {
    //             //console.log(err);
    //         })
    // }

    // const downvoteFunction = (id) => {
    //     service.setVote(tenantid, {
    //         id: id,
    //         vote: "0",
    //         voteType: "POST",
    //         votedBy: userid
    //     })
    //         .then(res => {
    //             service.getPostValues(courseid, itemid, tenantid)
    //                 .then(res => {
    //                     setPostedValue(res.data);
    //                 })
    //                 .catch(err => {
    //                     alert("Service is down please try after some time");
    //                 })
    //         })
    //         .catch(err => {
    //             //console.log(err);
    //         })
    // }

    const reportSpamFunction = (id) => {
        setReportSpamState({ flag: true, value: id });
    }

    const submitSpamValue = () => {
        service.setReportSpam(tenantid, {
            id: getReportSpamState.value,
            reportSpamBy: userid,
            reportSpamValue: getSpamValue,
            type: "POST"
        })
            .then(res => {
                setReportSpamState({ flag: false });
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
                        getPostedValues.map((data, i) => {
                            return (
                                <div key={data.postId}>
                                    <div className="media">
                                        <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                            <img src={um_api + `getprofilepicfordis/${data.userid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                        </a>
                                        <span className="span-right"></span>
                                        <div className="media-body" style={{ margin: '10px' }}>
                                            <p style={{ marginTop: "10px" }}><b>{data.title}</b></p>
                                            <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.body)}</p>
                                            <p style={{ marginTop: '10px' }}><small> <a href="#" style={{ marginLeft: "4px" }} onClick={() => [responseHandler(data.postid), setVisibilityId(data.postid)]} title="Show Responses"><i className="fas fa-reply"></i></a> <small style={{ marginLeft: "4px" }}>{ }</small></small>
                                                {useremail == data.userid ?
                                                    <span className="pull-right">
                                                        <i className="las la-edit" style={{ fontSize: "24px", color: "green" }} onClick={() => getPostValues(data.postid)} title="Update"></i>
                                                        <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green" }} onClick={() => deletePostValues(data.postid)} title="Delete"></i>
                                                        <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px" }} onClick={() => reportSpamFunction(data.postid)} title="Report Spam"></i>
                                                    </span>
                                                    :
                                                    <span className="pull-right">
                                                        <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green" }} onClick={() => reportSpamFunction(data.postid)} title="Report Spam"></i>
                                                    </span>}
                                            </p>
                                        </div>

                                        <p className="pull-right"><small>{dateConverter(data.createDate)}</small></p>
                                    </div>
                                    {data.postid === visibilityId ? <ResponseComponent response={getResponse} postId={visibilityId} tenantid={tenantid} userid={userid} useremail={useremail} /> : null}

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <br />
            {visibility ?
                <div >
                    <input type="text" id="title" name="title" className="form-control" placeholder={t('enter_your_title')} />
                    <p style={{ color: "red" }}>{validations.title}</p>
                    <br />
                    {/* <textarea id="content" name="content" className="form-control" placeholder="Enter your content" /> */}
                    <CKEditor onChange={editorHandler} />
                    <p style={{ color: "red" }}>{validations.value}</p>
                    <br />
                    <button className="btn btn-primary" onClick={() => submitHandler()}>{t('submit')}</button>
                    <button className="btn btn-danger" onClick={() => setVisibility(false)} style={{ marginLeft: "1vh" }}>{t('close')}</button>
                </div> :
                <b><a href="#" onClick={() => setVisibility(true)} style={{ color: "#006400" }}><h6>{t('start_a_discussion')}</h6></a></b>
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
                    <input type="text" id="updateTitle" className="form-control" placeholder={t('enter_your_title')} defaultValue={getUpdateValues ? getUpdateValues.discussionMaster.title : null} disabled />
                    <p style={{ color: "red" }}>{validations.title}</p>
                    <br />
                    {/* <textarea id="content" name="content" className="form-control" placeholder="Enter your content" /> */}
                    <CKEditor onChange={editorHandler} initData={getUpdateValues ? ReactHtmlParser(getUpdateValues.discussionMaster.body) : null} />
                    <p style={{ color: "red" }}>{validations.value}</p>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => updatePostValues(getUpdateValues.discussionMaster.postid)}>{t('submit')}</Button>
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
                    <Button onClick={() => submitSpamValue()}>{t('submit')}</Button>
                    <Button onClick={() => setReportSpamState(false)}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}


function ResponseComponent({ response, postId, tenantid, userid, useremail }) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

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
    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }
    const editorHandler = (evt) => {
        setEditorState(evt.editor.getData());
    }
    ////console.log(comments);
    const responseHandler = (pid, rid) => {
        service.getAllPostInfo(pid, tenantid)
            .then(res => {
                // setComments(res.data);

                res.data.responsedto.filter(function (ele) {
                    if (ele.responseMaster.responseid == rid) {
                        setComments(ele.commentMaster)
                    }
                })
                setVisibility(false);
            })
            .catch(err => {
                //console.log(err);
            })

    }
    const submitHandler = () => {
        if (!editorState) {
            setValidations(t('blank_content_not_allowed'));
        }
        else {
            service.addResponse(postId, encodeURIComponent(editorState), useremail, UserService.getUsername(), tenantid)
                .then(res => {
                    if (res.status == 201) {
                        swal(t('response_added_successfully'), "", "success");
                    }
                    service.getAllPostInfo(postId, tenantid)
                        .then(res => {
                            setResponse(res.data.responsedto);
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

    const getResponseValues = (id, pid) => {
        service.getAllPostInfo(pid, tenantid)
            .then(res => {
                // setUpdateValues(res.data.filter(function (ele){
                //     return ele.responsedto.responseMaster.responseid == id
                // }));
                setUpdateValues(res.data.responsedto.filter(function (ele) {
                    return ele.responseMaster.responseid === id
                }))
                setModalState(true);
            })
            .catch(err => {
                //console.log(err);
            })
    }
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
            service.updateResponse(id, encodeURIComponent(content), tenantid)
                .then(res => {
                    if (res.status == 200) {
                        swal(t('response_updated_successfully'), "", "success");;
                    }
                    setModalState(false);
                    setValidations('');
                    setEditorState('');
                    service.getAllPostInfo(postId, tenantid)
                        .then(res => {
                            setResponse(res.data.responsedto);
                        })
                        .catch(err => {
                            //console.log(err);
                        })

                })
        }
    }

    const deleteResponseValues = (id) => {


        service.deleteResponse(id, tenantid)
            .then(res => {
                if (res.status == 200) {
                    swal(t('response_deleted_successfully'), "", "success");;
                    service.getAllPostInfo(postId, tenantid)
                        .then(res => {
                            setResponse(res.data.responsedto);
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
    // const upvoteFunction = (id) => {
    //     service.setVote(tenantid, {
    //         id: id,
    //         vote: "1",
    //         voteType: "RESPONSE",
    //         votedBy: userid
    //     })
    //         .then(res => {
    //             service.getResponseValues(postId, tenantid)
    //                 .then(res => {
    //                     setResponse(res.data);
    //                 })
    //                 .catch(err => {
    //                     //console.log(err);
    //                 })
    //         })
    //         .catch(err => {
    //             //console.log(err);
    //         })
    // }

    // const downvoteFunction = (id) => {
    //     service.setVote(tenantid, {
    //         id: id,
    //         vote: "0",
    //         voteType: "RESPONSE",
    //         votedBy: userid
    //     })
    //         .then(res => {
    //             service.getResponseValues(postId, tenantid)
    //                 .then(res => {
    //                     setResponse(res.data);
    //                 })
    //                 .catch(err => {
    //                     //console.log(err);
    //                 })
    //         })
    //         .catch(err => {
    //             //console.log(err);
    //         })
    // }
    const reportSpamFunction = (id) => {
        setReportSpamState({ flag: true, value: id });
    }

    const submitSpamValue = () => {
        service.setReportSpam(tenantid, {
            id: getReportSpamState.value,
            reportSpamBy: userid,
            reportSpamValue: getSpamValue,
            type: "RESPONSE"
        })
            .then(res => {
                setReportSpamState({ flag: false });
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
                            <div key={data.responseMaster.responseid}>
                                <div className="media">

                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepicfordis/${data.responseMaster.userid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.responseMaster.body)}</p>
                                        <p style={{ marginTop: "10px" }}><small><a href="#" style={{ marginLeft: "4px" }} onClick={() => [responseHandler(data.responseMaster.postid, data.responseMaster.responseid), setVisibilityId(data.responseMaster.responseid)]} title="Show Comments"><i className="far fa-comments"></i></a> <small style={{ marginLeft: "4px" }}>{ }</small></small>
                                            {useremail == data.responseMaster.userid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green" }} onClick={() => getResponseValues(data.responseMaster.responseid, data.responseMaster.postid)} title="Update"></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green" }} onClick={() => deleteResponseValues(data.responseMaster.responseid)} title="Delete"></i>
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px" }} onClick={() => reportSpamFunction(data.responseMaster.responseid)} title="Report Spam"></i>

                                                </span>
                                                : <span className="pull-right">
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green" }} onClick={() => reportSpamFunction(data.responseMaster.responseid)} title="Report Spam"></i>
                                                </span>}</p>
                                    </div>
                                    <p className="pull-right"><small>{dateConverter(data.responseMaster.postedDate)}</small></p>
                                </div>


                                {data.responseMaster.responseid === visibilityId ? <CommentComponent comments={comments} responseId={visibilityId} tenantid={tenantid} userid={userid} useremail={useremail} postId={postId} /> : null}
                            </div>
                        )
                    })
                    :
                    response.map((data, i) => {
                        return (
                            <div key={data.responseMaster.responseid}>
                                <div className="media">

                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepicfordis/${data.responseMaster.userid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.responseMaster.body)}</p>
                                        <p style={{ marginTop: "10px" }}><small><a href="#" style={{ marginLeft: "4px" }} onClick={() => [responseHandler(data.responseMaster.postid, data.responseMaster.responseid), setVisibilityId(data.responseMaster.responseid)]} title="Show Comments"><i className="far fa-comments"></i></a> <small style={{ marginLeft: "4px" }}>{ }</small></small>
                                            {useremail == data.responseMaster.userid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green" }} onClick={() => getResponseValues(data.responseMaster.responseid, data.responseMaster.postid)} title="Update"></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green" }} onClick={() => deleteResponseValues(data.responseMaster.responseid)} title="Delete"></i>
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px" }} onClick={() => reportSpamFunction(data.responseMaster.responseid)} title="Report Spam"></i>

                                                </span>
                                                : <span className="pull-right">
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green" }} onClick={() => reportSpamFunction(data.responseMaster.responseid)} title="Report Spam"></i>
                                                </span>}</p>
                                    </div>
                                    <p className="pull-right"><small>{dateConverter(data.responseMaster.postedDate)}</small></p>
                                </div>
                                {data.responseMaster.responseid === visibilityId ? <CommentComponent comments={comments} responseId={visibilityId} tenantid={tenantid} userid={userid} useremail={useremail} postId={postId} /> : null}
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
                        <button className="btn btn-primary" onClick={() => submitHandler()}>{t('submit')}</button>
                        <button className="btn btn-danger" onClick={() => setVisibility(false)} style={{ marginLeft: "1vh" }}>{t('close')}</button>
                    </div>
                    :
                    <b><a href="#" onClick={() => setVisibility(true)} style={{ color: "#006400" }}><h6>{t('add_a_response')}</h6></a></b>
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
                        <CKEditor onChange={editorHandler} initData={getUpdateValues ? ReactHtmlParser(getUpdateValues[0].responseMaster.body) : null} />
                        <p style={{ color: "red" }}>{validations}</p>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => updateResponseValues(getUpdateValues[0].responseMaster.responseid)}>{t('submit')}</Button>
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
                    <Button onClick={() => submitSpamValue()}>{t('submit')}</Button>
                    <Button onClick={() => setReportSpamState(false)}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

function CommentComponent({ comments, responseId, tenantid, userid, useremail, postId }) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const um_api = UserService.USER_API;
    const [visibility, setVisibility] = useState(false);
    const [getComments, setComments] = useState();
    const [editorState, setEditorState] = useState();
    const [getUpdateValues, setUpdateValues] = useState({ id: '', body: '' });
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
    const submitHandler = () => {
        if (!editorState) {
            setValidations(t('blank_content_not_allowed'));
        }
        else {
            service.addComment(responseId, encodeURIComponent(editorState), useremail, UserService.getUsername(), tenantid)
                .then(res => {
                    if (res.data == 201) {
                        swal("Comment added Successfully", "", "success");
                    }
                    service.getAllPostInfo(postId, tenantid)
                        .then(res => {
                            setComments(res.data.responsedto.filter(function (ele) {
                                return ele.responseMaster.responseid === responseId
                            }));
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
        //console.log(id);
        service.getAllPostInfo(postId, tenantid)
            .then(res => {
                res.data.responsedto.map((d1, i1) => {
                    d1.commentMaster.map((d2, i2) => {
                        if (d2.commentid == id) {
                            setUpdateValues({ id: id, body: d2.body });
                            setModalState(true);
                        }
                    })
                })

            })
            .catch(err => {
                //console.log(err);
            })

        // service.getUpdateCommentValues(id, tenantid)
        //     .then(res => {
        //         setUpdateValues(res.data);
        //         setModalState(true);
        //     })
        //     .catch(err => {
        //         //console.log(err);
        //     })
    }
    const updateCommentValues = (id) => {
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
            service.updateComment(id, encodeURIComponent(content), tenantid)
                .then(res => {
                    if (res.status == 200) {
                        swal("Comment updated Successfully", "", "success");
                    }
                    setModalState(false);
                    setValidations('');
                    setEditorState('');
                    service.getAllPostInfo(postId, tenantid)
                        .then(res => {
                            setComments(res.data.responsedto.filter(function (ele) {
                                return ele.responseMaster.responseid === responseId
                            }));
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
        service.deleteComment(id, tenantid)
            .then(res => {
                if (res.status == 200) {
                    swal("Comment deleted Successfully", "", "success");
                }
                service.getAllPostInfo(postId, tenantid)
                    .then(res => {
                        setComments(res.data.responsedto.filter(function (ele) {
                            return ele.responseMaster.responseid === responseId
                        }));
                    })
                    .catch(err => {
                        //console.log(err);
                    })
            })
            .catch(err => {
                //console.log(err);
            })
    }
    // const upvoteFunction = (id) => {
    //     service.setVote(tenantid, {
    //         id: id,
    //         vote: "1",
    //         voteType: "COMMENT",
    //         votedBy: userid
    //     })
    //         .then(res => {
    //             service.getCommentValues(responseId, tenantid)
    //                 .then(res => {
    //                     setComments(res.data);
    //                 })
    //                 .catch(err => {
    //                     //console.log(err);
    //                 })
    //         })
    //         .catch(err => {
    //             //console.log(err);
    //         })
    // }

    // const downvoteFunction = (id) => {
    //     service.setVote(tenantid, {
    //         id: id,
    //         vote: "0",
    //         voteType: "COMMENT",
    //         votedBy: userid
    //     })
    //         .then(res => {
    //             service.getCommentValues(responseId, tenantid)
    //                 .then(res => {
    //                     setComments(res.data);
    //                 })
    //                 .catch(err => {
    //                     //console.log(err);
    //                 })
    //         })
    //         .catch(err => {
    //             //console.log(err);
    //         })
    // }
    const reportSpamFunction = (id) => {
        setReportSpamState({ flag: true, value: id });
    }

    const submitSpamValue = () => {
        service.setReportSpam(tenantid, {
            id: getReportSpamState.value,
            reportSpamBy: userid,
            reportSpamValue: getSpamValue,
            type: "COMMENT"
        })
            .then(res => {
                setReportSpamState({ flag: false });
            })
            .catch(err => {
                //console.log(err);
            })
    }

    return (
        <div style={{ marginLeft: "11vh" }}>
            <div className="comments-list">
                {getComments ?
                    getComments[0].commentMaster.map((data, i) => {
                        return (
                            <div key={data.commentId}>
                                <div className="media">
                                    <a className="media-left" style={{ marginTop: "10px" }} href="#">
                                        <img src={um_api + `getprofilepicfordis/${data.userid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.body)}</p>
                                        <p style={{ marginTop: "10px" }}><small></small>
                                            {useremail == data.userid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green" }} onClick={() => getCommentValues(data.commentid)} title="Update"></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green" }} onClick={() => deleteCommentValues(data.commentid)} title="Delete"></i>
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px" }} onClick={() => reportSpamFunction(data.commentId)} title="Report Spam"></i>

                                                </span>
                                                : <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px" }} onClick={() => reportSpamFunction(data.commentId)} title="Report Spam"></i>}</p>
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
                                        <img src={um_api + `getprofilepicfordis/${data.userid}`} style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: 40 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} />
                                    </a>
                                    <span className="span-right"></span>
                                    <div className="media-body" style={{ margin: "10px" }}>
                                        <p style={{ marginTop: "10px" }}>{ReactHtmlParser(data.body)}</p>
                                        <p style={{ marginTop: "10px" }}><small></small>
                                            {useremail == data.userid ?
                                                <span className="pull-right">
                                                    <i className="las la-edit" style={{ fontSize: "24px", color: "green" }} onClick={() => getCommentValues(data.commentid)} title="Update"></i>
                                                    <i className="las la-trash-alt" style={{ fontSize: "24px", color: "green" }} onClick={() => deleteCommentValues(data.commentid)} title="Delete"></i>
                                                    <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px" }} onClick={() => reportSpamFunction(data.commentId)} title="Report Spam"></i>
                                                </span>
                                                : <i className="las la-exclamation-circle" style={{ fontSize: "24px", color: "green", marginLeft: "10px" }} onClick={() => reportSpamFunction(data.commentId)} title="Report Spam"></i>}</p>
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
                        <button className="btn btn-primary" onClick={() => submitHandler()}>{t('submit')}</button>
                        <button className="btn btn-danger" onClick={() => setVisibility(false)} style={{ marginLeft: "1vh" }}>{t('close')}</button>
                    </div>
                    :
                    <b><a href="#" onClick={() => setVisibility(true)} style={{ color: "#006400" }}><h6>{t('add_a_comment')} </h6></a></b>
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
                    <CKEditor onChange={editorHandler} initData={getUpdateValues ? ReactHtmlParser(getUpdateValues.body) : null} />
                    <p style={{ color: "red" }}>{validations}</p>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => updateCommentValues(getUpdateValues.id)}>{t('submit')}</Button>
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
                    <Button onClick={() => submitSpamValue()}>{t('submit')}</Button>
                    <Button onClick={() => setReportSpamState(false)}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DiscussionMain1;
