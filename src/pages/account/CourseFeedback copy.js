import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/account.js';
import service from '../../services/service';
import UserService from '../../services/UserService';
import { useHistory } from 'react-router-dom';
import RenderOnAuthenticated from './RenderOnAuthenticated';
import swal from 'sweetalert';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';


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
//     code : 'te',
//        name : 'Telugu',
//        country_code : 'in'
//    },
    // {
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
] 

function CourseFeedback(props) {

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

    ////console.log(props);
    const [questionState, setQuestionState] = useState([]);
    const userId = UserService.getUserid();
    const [visibility, setVisibility] = useState(true);
    const [showButton, setShowButton] = useState();
    const history = useHistory();
    let typeid = props.typeid;
    let cid = props.cid;
    useEffect(() => {
        service.getFeedback(typeid, cid)
        .then(res => {
                //console.log("Resp ------ ",res.data)
                if (res.data != '') {
                    setQuestionState(res.data);
                    setShowButton(true);
                    //console.log(res);
                }
                else {
                    setVisibility(true);
                    setShowButton(false);
                }
            })
            .catch(err => {
                //console.log(err)

            })


        service.getFeedbackStatus(typeid, cid, userId)
            .then(res => {
                if (res.status == 200) {
                    setVisibility(false);
                }


            })
            .catch(err => {
                //console.log(err)
            })
    }, [])
    let dummyJson = {};

    questionState.map((d) => {
        dummyJson[d.id.questionId] = '';
    })
    let feedBackJson = [];
    let newJSON = {};
    let arr = [];

    const handleOnChange = (id, value, type) => {
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

    const [feedbackSubmit, setFeedbackSubmit] = useState({
        isLoading: false
    })


    const feedBackFunction = () => {
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
            feedBackJson.push({ feedbackBy: userId, feedbackResponse: dummyJson[key], questionId: keys, typeId: typeid, id: cid });
        }
        // //console.log(feedBackJson);
        setFeedbackSubmit({ isLoading: true });
        service.postFeedback(feedBackJson)
            .then(async res => {
                await swal(t('feedback_submit_msg'), t('feedback_submit_msg_desc'), "success");
                setFeedbackSubmit({ isLoading: false });
                window.location.reload();
                // //console.log(res);
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const singleChoiceQType = (quesId, mandatory) => {
        return (
            questionState.map((q2, index) => {
                if (quesId === q2.id.questionId) {
                    return (

                        <div key={q2.id.questionId}>
                            {q2.questionMaster.optionsMasters.map((q3, i) => {
                                return (
                                    <div key={q3.optionId}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" value={q3.optionId} name={quesId} onChange={(e) => handleOnChange(quesId, e.target.value)} />
                                            <label className="form-check-label">
                                                {q3.optionText}
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                            <br />
                        </div>

                    );
                }
            })
        );
    }
    const trueOrFalseQType = (quesId, mandatory) => {
        return (
            <div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name={quesId} value="True" onChange={(e) => handleOnChange(quesId, e.target.value)} required />
                    <label className="form-check-label">
                        {t('true')}
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name={quesId} value="False" onChange={(e) => handleOnChange(quesId, e.target.value)} />
                    <label className="form-check-label">
                       {t('false')}
                    </label>
                </div>
                <br />
            </div>
        );
    }
    const textAreaQType = (quesId, mandatory) => {
        return (
            <div>
                <textarea
                    className="form-control"
                    rows="3"
                    placeholder={t('type_feedback_here')}
                    name={quesId}
                    onChange={(e) => handleOnChange(quesId, e.target.value)} />
                <br />
            </div>
        );
    }
    const multipleChoiceQType = (quesId, type, mandatory) => {
        return (
            questionState.map((q2, index) => {
                if (quesId === q2.id.questionId) {
                    return (
                        <div key={q2.id.questionId}>
                            {q2.questionMaster.optionsMasters.map((q3, i) => {
                                return (
                                    <div key={q3.optionId}>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" name="multiple-choice" value={q3.optionId} onChange={(e) => handleOnChange(quesId, e.target.value, type)} />
                                            <label className="form-check-label">{q3.optionText}</label>
                                        </div>
                                    </div>
                                );
                            })}
                            <br />
                        </div>
                    );
                }
            })
        );
    }

    function changeBackgroundOver(e) {
        e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
    }

    function changeBackgroundOut(e) {
        e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
    }

    return (
        <RenderOnAuthenticated>
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper registration-page">

                    {/* Header 2 */}
                    {/* <HeaderTwo /> */}

                    {/* Breadcroumb */}
                    {/* <BreadcrumbBox title="Feedback" /> */}

                    {/* Feedback Area */}
                    {visibility === true ?
                        <section className="registration-area" id="formRegistration">
                            <Container>
                                <Row>
                                    <Col md="12">
                                        <div className="registration-box">
                                            <div className="registration-title text-center">
                                                {/* <h3>Feedback</h3> */}
                                            </div>
                                            {questionState.map((q1, index) => {
                                                return (
                                                    <form key={q1.id.questionId} className="form">

                                                        <p className="form-control mb-0">
                                                            <label htmlFor="registration_fname">{index + 1} {q1.questionMaster.question}</label>
                                                        </p>
                                                        {
                                                            q1.questionMaster.questionType === 'SC' ?
                                                                singleChoiceQType(q1.id.questionId, q1.questionMaster.mandatory)
                                                                : q1.questionMaster.questionType === 'TF' ?
                                                                    trueOrFalseQType(q1.id.questionId, q1.questionMaster.mandatory)
                                                                    : q1.questionMaster.questionType === 'TA' ?
                                                                        textAreaQType(q1.id.questionId, q1.questionMaster.mandatory)
                                                                        : q1.questionMaster.questionType === 'MC' ?
                                                                            multipleChoiceQType(q1.id.questionId, q1.questionMaster.questionType, q1.questionMaster.mandatory)
                                                                            : null
                                                        }

                                                    </form>
                                                );
                                            })}
                                            {showButton ?
                                                // <button type="button" className="btn btn-success btn-lg btn-block" onClick={() => feedBackFunction()} id="successButton">Submit</button>
                                                <button type="button" className="btn btn-success btn-lg btn-block" onClick={() => feedBackFunction()} id="successButton"  disabled={feedbackSubmit.isLoading ? "true" : ""}>{feedbackSubmit.isLoading ? (<> Loading...</>) : "Submit"}</button>
                                                :
                                                <button type="button" className="btn btn-success btn-lg btn-block" onClick={() => feedBackFunction()} id="successButton" disabled>{t('no_feedback_available')}</button>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                        :
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

                    }

                    {/* Footer 2 */}
                    {/* <FooterTwo /> */}

                </div>
            </Styles>
        </RenderOnAuthenticated>
    )
}

export default CourseFeedback
