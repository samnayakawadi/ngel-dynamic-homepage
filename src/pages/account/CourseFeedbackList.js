import React, { useEffect, useState } from 'react'
import RenderOnAuthenticated from './RenderOnAuthenticated'
import { Styles } from './styles/account.js';
import { Accordion, Col, Container, Row } from 'react-bootstrap';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../../services/UserService';
import service from '../../services/service';
import swal from 'sweetalert';


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


export default function CourseFeedbackList(props) {

    useEffect(() => {
        UserService.generateToken();
        getFeedbackList();
        getUserFeedbackStatus();
    }, []);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])
    let typeid = props.typeid;
    let cid = props.cid;

    const [feedback, setFeedback] = useState([]);
    const [feedbackStatus, setFeedbackStatus] = useState([]);

    const getFeedbackList = () => {
        service.getFeedback(typeid, cid, UserService.getUserid()).then((resp) => {
            //console.log(resp.data);
            setFeedback(resp.data);
        }).catch((err) => {

        })
    }

    const getUserFeedbackStatus = () => {

        service.getUserFeedbackStatus(cid, UserService.getUserid()).then((resp) => {
            //console.log(resp.data);
            setFeedbackStatus(resp.data);
        }).catch((err) => {
            //console.log(err)
        })


    }

    const userId = UserService.getUserid();

    let dummyJson = {};
    let feedBackJson = [];
    let newJSON = {};
    let arr = [];

    const onClickAccodian = () => {
        dummyJson = {};
        feedBackJson = [];
        newJSON = {};
        arr = [];
    }

    const handleOnChange = (id, value, type, feedbackid) => {

        arr = []
        // //console.log(newJSON)
        if (type === "MC") {
            // arr.push(value);
            // let values = arr.toString();

            if (newJSON[id]) {

                arr = newJSON[id].split(',')
                if (arr.includes(value)) {
                    let i = arr.indexOf(value)
                    arr.splice(i, 1)

                }
                else {
                    arr.push(value);
                }
                // let newArr = [...new Set(arr)];
                // newJSON[id].push(value);
                // newJSON[id] = `${newJSON[id]},${arr.toString()}`
                newJSON[id] = arr.toString()
            }
            else {
                // newJSON[id] = []
                // newJSON[id].push(value);
                newJSON[id] = `${value}`
            }

        } else {
            newJSON[id] = value;
        }
        // //console.log(newJSON);
    }

    const feedBackFunction = (feedbackid) => {

        //console.log("FeedbackId -", feedbackid)

        for (var key in newJSON) {
            dummyJson[key] = newJSON[key]
        }
        for (var key in dummyJson) {
            if (dummyJson[key] === '') {
                swal(t('attempt_all_que'), t('attempt_all_que_desc'), "warning");
                return false;
            }
        }
        for (var key in dummyJson) {
            // //console.log("Key: " + key);
            let keys = parseInt(key);
            // //console.log("Value: " + dummyJson[key]);
            feedBackJson.push({ feedbackBy: userId, feedbackResponse: dummyJson[key], questionId: keys, typeId: typeid, id: cid, feedbackId: feedbackid });
        }

        //console.log("FEEDBACK JSON --- ", feedBackJson)

        //console.log(feedBackJson);
        service.postFeedback(feedBackJson)
            .then(async res => {
                await swal(t('feedback_submit_msg'), t('feedback_submit_msg_desc'), "success");
                window.location.reload();
                // //console.log(res);
            })
            .catch(err => {
                feedBackJson = [];
            })
    }

    return (
        <RenderOnAuthenticated>
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper registration-page">
                    <Accordion defaultActiveKey="0">
                        <section className="registration-area" id="formRegistration">
                            {feedback.length == 0 ? <p>{t('response_condition')}</p> :
                                <>
                                    {feedback.map((data, i) =>
                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header >{data.feedback}</Accordion.Header>
                                            <Accordion.Body style={{ marginLeft: '25px' }}>
                                                <div className="registration-box">
                                                    {
                                                        data.feedbackgiven === "true"
                                                            ?
                                                            <>
                                                                <section className="registration-area" id="formRegistration">
                                                                    <Container>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <div className="registration-box">
                                                                                    <div className="registration-title text-center">
                                                                                        <h3>{t('feedback_already_submitted')}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </section>
                                                            </>
                                                            :
                                                            <>
                                                                {
                                                                    data.feedbackQuestionMap.map((ques, index) => {
                                                                        return (
                                                                            <form key={ques.id.questionId} className="form">
                                                                                <p className="form-control mb-0">
                                                                                    <label htmlFor="registration_fname">{index + 1} {ques.questionMaster.question}</label>
                                                                                </p>
                                                                                {
                                                                                    ques.questionMaster.questionType === "SC" ?
                                                                                        <>
                                                                                            {
                                                                                                ques.questionMaster.optionsMasters.map((q3) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <div key={q3.optionId}>
                                                                                                                <div className="form-check">
                                                                                                                    <input className="form-check-input" type="radio" value={q3.optionId} name={ques.questionMaster.questionId} onChange={(e) => handleOnChange(ques.questionMaster.questionId, e.target.value, ques.id.feedbackId)} />
                                                                                                                    <label className="form-check-label">
                                                                                                                        {q3.optionText}
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </>
                                                                                        :
                                                                                        ques.questionMaster.questionType === "MC" ?
                                                                                            <>
                                                                                                {
                                                                                                    ques.questionMaster.optionsMasters.map((q3) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <div key={q3.optionId}>
                                                                                                                    <div className="form-check form-check-inline">
                                                                                                                        <input className="form-check-input" type="checkbox" value={q3.optionId} name="multiple-choice" onChange={(e) => handleOnChange(ques.questionMaster.questionId, e.target.value, ques.questionMaster.questionType, ques.id.feedbackId)} />
                                                                                                                        <label className="form-check-label">{q3.optionText}</label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </>
                                                                                            :
                                                                                            ques.questionMaster.questionType === "TA" ?
                                                                                                <>
                                                                                                    <div>
                                                                                                        <textarea
                                                                                                            className="form-control"
                                                                                                            rows="3"
                                                                                                            placeholder={t('type_feedback_here')}
                                                                                                            onChange={(e) => handleOnChange(ques.questionMaster.questionId, e.target.value, ques.id.feedbackId)}
                                                                                                        />
                                                                                                        <br />
                                                                                                    </div>
                                                                                                </>
                                                                                                :
                                                                                                ques.questionMaster.questionType === "TF" ?
                                                                                                    <>
                                                                                                        <div>
                                                                                                            <div className="form-check">
                                                                                                                <input className="form-check-input" type="radio" name={ques.questionMaster.questionId} value="True" onChange={(e) => handleOnChange(ques.questionMaster.questionId, e.target.value, ques.id.feedbackId)} />
                                                                                                                <label className="form-check-label">
                                                                                                                    {t('true')}
                                                                                                                </label>
                                                                                                            </div>
                                                                                                            <div className="form-check">
                                                                                                                <input className="form-check-input" type="radio" name={ques.questionMaster.questionId} value="False" onChange={(e) => handleOnChange(ques.questionMaster.questionId, e.target.value, ques.id.feedbackId)} />
                                                                                                                <label className="form-check-label">
                                                                                                                    {t('false')}
                                                                                                                </label>
                                                                                                            </div>
                                                                                                            <br />
                                                                                                        </div>
                                                                                                    </>
                                                                                                    :
                                                                                                    null
                                                                                }
                                                                                <br />
                                                                            </form>
                                                                        )
                                                                    })
                                                                }
                                                                <br />
                                                                <button type="button" className="btn btn-success btn-lg btn-block" onClick={() => feedBackFunction(data.feedbackId)} >{t('submit')}</button>

                                                            </>
                                                    }

                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )}
                                </>
                            }
                        </section>

                    </Accordion>

                </div>
            </Styles>
        </RenderOnAuthenticated>
    )
}

