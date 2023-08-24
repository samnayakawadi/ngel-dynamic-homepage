import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
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
import cookies from 'js-cookie'
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

function Feedback(props) {

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

    const [feedback, setFeedback] = useState([]);
    const [feedbackStatus, setFeedbackStatus] = useState([]);

    const userId = UserService.getUserid();

    let dummyJson = {};
    let feedBackJson = [];
    let newJSON = {};
    let arr = [];


    const [questionState, setQuestionState] = useState([]);
    const [visibility, setVisibility] = useState(true);
    const [showButton, setShowButton] = useState();
    const history = useHistory();
    let typeid = 2;
    let cid = 1;

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


    questionState.map((d) => {
        dummyJson[d.id.questionId] = '';
    })

    function setError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector(".desc_input-msg");
        formControl.className = "form-control text-left error";
        errorMsg.innerText = message;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = "form-control success";
    }


    const checkDescText = () => {
        const DescText = document.getElementById("DescText");
        const descValue = DescText.value.trim();
        if (descValue === "") {
            setError(DescText, t('desc_cannot_blank'));
        }
        else if (descValue.length > 2000) {
            setError(DescText, t('length_exceed'));
        }
        else if (descValue.length < 3) {
            setError(DescText, t('length_greater_than_3'));
        }
        else if (descValue.match(/[A-Za-z0-9&., ]+$/)) {
            setSuccess(DescText);
        }
        else {
            setError(DescText, t('do_not_use_special_charater'));
        }

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

    // const singleChoiceQType = (quesId, mandatory) => {
    //     return (
    //         questionState.map((q2, index) => {
    //             if (quesId === q2.id.questionId) {
    //                 return (

    //                     <div key={q2.id.questionId} >
    //                         {q2.questionMaster.optionsMasters.map((q3, i) => {
    //                             return (
    //                                 <div key={q3.optionId}>
    //                                     <div className="form-check">
    //                                         <input className="form-check-input" type="radio" value={q3.optionId} name={quesId} onChange={(e) => handleOnChange(quesId, e.target.value)} />
    //                                         <label className="form-check-label">
    //                                             {q3.optionText}
    //                                         </label>
    //                                     </div>
    //                                 </div>
    //                             );
    //                         })}
    //                         <br />
    //                     </div>

    //                 );
    //             }
    //         })
    //     );
    // }
    // const trueOrFalseQType = (quesId, mandatory) => {
    //     return (
    //         <div >
    //             <div className="form-check">
    //                 <input className="form-check-input" type="radio" name={quesId} value="True" onChange={(e) => handleOnChange(quesId, e.target.value)} required />
    //                 <label className="form-check-label">
    //                     {t('true')}
    //                 </label>
    //             </div>
    //             <div className="form-check">
    //                 <input className="form-check-input" type="radio" name={quesId} value="False" onChange={(e) => handleOnChange(quesId, e.target.value)} />
    //                 <label className="form-check-label">
    //                     {t('false')}
    //                 </label>
    //             </div>
    //             <br />
    //         </div>
    //     );
    // }
    // const textAreaQType = (quesId, mandatory) => {
    //     return (
    //         <div>
    //              <div >
    //             <textarea
    //                 className="form-control"
    //                 rows="2"
    //                 placeholder="Type your feedback here"
    //                 name={quesId}
    //                 onBlur={checkDescText}
    //                 id = "DescText"
    //                 onChange={(e) => handleOnChange(quesId, e.target.value)} />
    //                 <span className="desc_input-msg"></span>
    //                 <br></br>
    //         </div>
    //         </div>
    //     );
    // }
    // const multipleChoiceQType = (quesId, type, mandatory) => {
    //     return (
    //         questionState.map((q2, index) => {
    //             if (quesId === q2.id.questionId) {
    //                 return (
    //                     <div key={q2.id.questionId}>
    //                         {q2.questionMaster.optionsMasters.map((q3, i) => {
    //                             return (
    //                                 <div key={q3.optionId} >
    //                                     <div className="form-check form-check-inline">
    //                                         <input className="form-check-input" type="checkbox" name="multiple-choice" value={q3.optionId} onChange={(e) => handleOnChange(quesId, e.target.value, type)} />
    //                                         <label className="form-check-label">{q3.optionText}</label>
    //                                     </div>
    //                                 </div>
    //                             );
    //                         })}
    //                         <br />
    //                     </div>
    //                 );
    //             }
    //         })
    //     );
    // }

    // function changeBackgroundOver(e) {
    //     e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
    // }

    // function changeBackgroundOut(e) {
    //     e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
    // }

    return (
        <RenderOnAuthenticated>
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper registration-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title={t('feedback')} />



                    <Accordion defaultActiveKey="1" style={{ margin: "10px 0px" }}>
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



                    {/* Feedback Area */}
                    {/* {visibility === true ?
                        <section className="registration-area" id="formRegistration">
                            <Container>
                                <Row>
                                    <Col md="12">
                                        <div className="registration-box">
                                            <div className="registration-title text-center">
                                                <h3>{t('feedback')}</h3>
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
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            {showButton ?
                                                <button type="button" className="btn btn-success btn-lg btn-block" onClick={() => feedBackFunction()} id="successButton">{t('submit')}</button>
                                                :
                                                <button type="button" className="btn btn-success btn-lg btn-block" onClick={() => feedBackFunction()} id="successButton" disabled>{t('no_feedback_msg')}</button>
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

                    } */}

                    {/* Footer 2 */}
                    <FooterTwo />

                </div>
            </Styles>
        </RenderOnAuthenticated>
    )
}

export default Feedback
