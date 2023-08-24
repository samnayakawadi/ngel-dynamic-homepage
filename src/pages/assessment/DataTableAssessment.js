import React, { useEffect, useState, useRef } from 'react';
import service from '../../services/service';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Modal1 from "react-modal";
import { Styles } from './Styles'
import { Style1 } from './Style1'
import UserService from '../../services/UserService';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { useContext } from 'react';
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

function DataTableAssessment({ tenantId, courseId }) {

    const { globalContextState } = useContext(GlobalContext)

    useEffect(() => {
        UserService.generateToken();
    }, []);


    const [assessDetails, setAccessDetails] = useState([]);
    const [attemptedQuizDetails, setAttemptedQuizDetails] = useState([]);
    const [firstVisibility, setFirstVisibility] = useState(true);
    const [secondVisibility, setSecondVisibility] = useState(false);
    const [noOfAttempts, setNoOfAttempts] = useState(0);
    const [getQuizId, setQuizId] = useState(0);
    const [getTime, setTime] = useState('');
    const [getNoOfQuestions, setNoOfQuestions] = useState(0);
    const [assessmentModal, setassessmentModal] = useState(false);
    const [assessmentQuestion, setAssessmentQuestion] = useState([]);
    const [quesTitle, setQuesTitle] = useState([]);
    const [quesId, setQuesId] = useState([]);
    const [getQues, setQues] = useState([]);
    const [getOption, setOption] = useState([]);
    const [getNoOfQue, setNoOfQue] = useState([]);
    const [getChoiceValue, setChoiceValue] = useState([]);
    const [gettimer, setTimer] = useState();
    const [getAttemptQuesIds, setAttemptQuesIds] = useState([]);
    const [getResumeTimer, setResumeTimer] = useState([]);
    const [getRtime, setRtime] = useState();
    const history = useHistory();
    const [selected, setSelected] = useState(false);
    const [msg, setmsg] = useState();
    const [modalOpen, setModalopen] = useState(false);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])


    let userId = UserService.getUserid();
    let userEmail = UserService.getEmail();
    const um_api = UserService.USER_API;
    ////console.log(um_api);

    useEffect(() => {
        // service.getAssignedQuizDetails(courseId, userEmail, tenantId)
        //     .then(res => {
        //         // //console.log("Hello cdac ..", res.data);
        //         setAccessDetails(res.data);
        //     })
        //     .catch(error => setmsg(t('services_is_down_please_update_after_sometime')));
    }, [])

    useEffect(() => {
        clearTime(getDeadLineTime());
    }, [selected])

    var questionNumber = `${getNoOfQue}`;
    var newvar = questionNumber.split(',')
    let lastElement = newvar[newvar.length - 1];
    let firstElement = newvar[0];
    var questionIds = `${getAttemptQuesIds}`;
    var new1 = questionIds.split(',');
    let arr = [];
    const quizIdHandler = (value, attempts) => {
        // //console.log("Tenantid is" + tenantId);
        // //console.log("Value which is fetched is " + value);
        // //console.log("Attempts which is fetched is " + attempts);
        setQuizId(value);
        setNoOfAttempts(attempts);
        setFirstVisibility(false);
        setSecondVisibility(true);
        arr.push(value);
        service.getAttemptedQuizDetails({
            instituteId: tenantId,
            quizId: arr,
            userId: userId
        })
            .then(res => {
                setAttemptedQuizDetails(res.data);
            })
            .catch(error => setmsg(t('services_is_down_please_update_after_sometime')));

    }

    const reportHandler = (length) => {
        let remainingNoOfAttempts = noOfAttempts - length;
        ////console.log(remainingNoOfAttempts);
        return remainingNoOfAttempts;
    }
    var [AttemptID, setAttemptedID] = useState();
    const quizDetailsHandler = () => {
        ////console.log(getQuizId);
        setSecondVisibility(false);
        service.getAttemptIdAndQuizDetails({
            instituteId: tenantId,
            quizId: getQuizId,
            userId: userId
        })
            .then(res => {
                timeConverter(res.data[2]);
                setNoOfQuestions(res.data[3]);
                setAttemptedID(res.data[4]);
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const timeConverter = (timeInSeconds) => {
        let time = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
        setTime(time);
        setSelected(true);
    }

    function convertMinutestoSeconds(value) {
        var a = value.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        return seconds;
    }

    function openModal(atmpid) {
        setModalopen(true);

        // setSelected(true);
        if (atmpid !== 0) {
            setAttemptedID(atmpid);
            service.ResumeQuiz({
                attemptId: atmpid,
                instituteId: tenantId,
                quizId: `${getQuizId}`
            })
                .then(res => {
                    setAssessmentQuestion(res.data);
                    setNoOfQue(res.data[2]);
                    timeConverter(res.data[3]);
                    setAttemptQuesIds(res.data[4]);
                    const xml_data = `${res.data}`;
                    var XMLParser = require('react-xml-parser');
                    var xml = new XMLParser().parseFromString(xml_data);
                    setQues(xml.getElementsByTagName('prompt'));
                    setOption(xml.getElementsByTagName('simpleChoice'));
                    setAssessmentQuestion(xml)
                    setQuesId(xml.attributes.identifier)
                    setQuesTitle(xml.attributes.title)

                })
                .catch(err => {
                    //console.log(err);
                })
        }
        if (atmpid === 0) {
            setAttemptedID(AttemptID);
            service.initializeQuiz({
                attemptId: AttemptID,
                instituteId: tenantId,
                quizId: `${getQuizId}`
            })
                .then(res => {
                    setAssessmentQuestion(res.data);
                    setNoOfQue(res.data[1]);
                    const xml_data = `${res.data}`;
                    var XMLParser = require('react-xml-parser');
                    var xml = new XMLParser().parseFromString(xml_data);
                    setQues(xml.getElementsByTagName('prompt'));
                    setOption(xml.getElementsByTagName('simpleChoice'));
                    setAssessmentQuestion(xml)
                    setQuesId(xml.attributes.identifier)
                    setQuesTitle(xml.attributes.title)

                })
        }
        // var counter = setInterval(Pooling, 5000);
        setassessmentModal(true);
        const stickyMenu = document.querySelector(".sticky-menu.sticky");
        stickyMenu.style.display = 'none';
        // clearTime(getDeadLineTime())
    }

    function closeModal() {
        setassessmentModal(false);
        clearInterval(intervalRef.current);
        window.location.reload();
        const stickyMenu = document.querySelector(".sticky-menu");
        stickyMenu.style.display = 'block';
        window.addEventListener("scroll", () => {
            const stickyMenu = document.querySelector(".sticky-menu");
            if (window.scrollY > 160) {
                stickyMenu.style.display = 'block';
                stickyMenu.classList.add("sticky");
            } else {
                stickyMenu.style.display = 'none';
                stickyMenu.classList.remove("sticky");
            }
        });
    }


    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = assessmentModal ? 'hidden' : 'auto';
    }, [assessmentModal])

    const intervalRef = useRef(null)
    function getTimeRemaining(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date());
        const second = Math.floor((total / 1000) % 60);
        const minute = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, second, minute, hours
        }
    }

    function startTimer(deadLine) {
        let { total, second, minute, hours } = getTimeRemaining(deadLine);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minute > 9 ? minute : '0' + minute) + ':' +
                (second > 9 ? second : '0' + second)
            )
        } else {
            clearInterval(intervalRef.current);
        }
    }

    function clearTime(endTime) {
        setTimer(`${getTime}`);
        if (intervalRef.current) clearInterval(intervalRef.current);
        const id = setInterval(() => {
            startTimer(endTime)
        }, 1000)
        intervalRef.current = id;
    }

    function getDeadLineTime() {
        let deadLine = new Date();
        var hms = `${getTime}`;
        var a = hms.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        deadLine.setSeconds(deadLine.getSeconds() + seconds);
        return deadLine;
    }


    const [image, setImage] = useState({
        id: UserService.getUserid(),
        img: um_api + "getprofilepic/"
    });
    const customStyles = {
        content: {
            position: 'fixed',
            left: 2,
            right: 2,
            top: 2,
            bottom: 2,
            background: 'none',
            backgroundColor: 'white',
            padding: '0px',
        },
    };

    const chooseOptStore = event => {
        setChooseOption([]);
        let newArray = [...getChoiceValue, event.target.value];
        if (getChoiceValue.includes(event.target.value)) {
            newArray = newArray.filter(day => day !== event.target.value)
        }
        setChoiceValue(newArray);
    }


    const [getChooseOption, setChooseOption] = useState([])
    function nextQuestion() {
        service.nextQuestion({
            attemptId: AttemptID,
            currentQuesId: `${quesId}`,
            instituteId: tenantId,
            options:
                getChoiceValue
            ,
            quizId: `${getQuizId}`,
            timeslice: convertMinutestoSeconds(gettimer)
        })
            .then(async res => {
                if (res.data == "No-Next") {
                    // await swal(t('you_have_no_next_question'), t('please_go_to_previous_question'), "warning");
                } else {
                    setOption([]);
                    setChoiceValue([]);
                }
                if (res.data[1] == " ") {

                } else {
                    setChoiceValue([res.data[1]])
                }
                setChooseOption(res.data[1]);
                const xml_data = `${res.data}`;
                var XMLParser = require('react-xml-parser');
                var xml = new XMLParser().parseFromString(xml_data);
                setQues(xml.getElementsByTagName('prompt'));
                setOption(xml.getElementsByTagName('simpleChoice'));
                setQuesId(xml.attributes.identifier)
                setQuesTitle(xml.attributes.title);
            })
            .catch(err => {
                //console.log(err);
            })
    }

    function prevQuestion() {
        service.prevQuestion({
            attemptId: AttemptID,
            currentQuesId: `${quesId}`,
            instituteId: tenantId,
            options:
                getChoiceValue
            ,
            quizId: `${getQuizId}`,
            timeslice: convertMinutestoSeconds(gettimer)
        })
            .then(async res => {
                if (res.data == "No-Previous") {
                    // await swal(t('you_have_no_previous_question'), t('please_go_to_next_question'), "warning");
                } else {
                    setOption([]);
                    setChoiceValue([]);
                }
                if (res.data[1] == " ") {

                } else {
                    setChoiceValue([res.data[1]])
                }
                setChooseOption(res.data[1])
                const xml_data = `${res.data}`
                var XMLParser = require('react-xml-parser');
                var xml = new XMLParser().parseFromString(xml_data);
                setQues(xml.getElementsByTagName('prompt'));
                setOption(xml.getElementsByTagName('simpleChoice'));
                setQuesId(xml.attributes.identifier)
                setQuesTitle(xml.attributes.title);
            })
            .catch(err => {
                //console.log(err);
            })
    }


    function Pooling() {
        service.QuizUpdatePooling({
            attemptId: AttemptID,
            currentQuesId: `${quesId}`,
            currentQuizId: `${getQuizId}`,
            instituteId: tenantId,
            options:
                getChoiceValue
            ,
            timeslice: convertMinutestoSeconds(gettimer)
        })
    }

    function questionPalette(data) {
        setOption([]);
        setChoiceValue([]);
        setSelected(true);
        setOption([]);
        setChoiceValue([]);
        service.questionPalette({
            attemptId: AttemptID,
            currentQuesId: `${quesId}`,
            instituteId: tenantId,
            options:
                getChoiceValue
            ,
            quizId: `${getQuizId}`,
            reqQuesId: `${data}`,
            timeslice: convertMinutestoSeconds(gettimer)
        })
            .then(res => {
                // //console.log(res.data)
                const xml_data = `${res.data}`
                var XMLParser = require('react-xml-parser');
                var xml = new XMLParser().parseFromString(xml_data);
                setQues(xml.getElementsByTagName('prompt'));
                setOption(xml.getElementsByTagName('simpleChoice'));
                setQuesId(xml.attributes.identifier)
                setQuesTitle(xml.attributes.title);
            })
            .catch(err => {
                //console.log(err);
            })
    }

    function FinishQuizs() {
        nextQuestion();
        service.FinishQuizs({
            attemptId: AttemptID,
            instituteId: tenantId,
            quizId: `${getQuizId}`
        })
            .then(async res => {
                service.getQuizScore({
                    attemptId: AttemptID,
                    instituteId: tenantId
                })
                    .then(async res1 => {
                        await swal(t('quiz_submit_successfully'), `Your score is ${res1.data.score}, Passing marks ${res1.data.passmarks} , Result is ${parseInt(res1.data.score) >= parseInt(res1.data.passmarks) ? "Pass" : "Fail"}`, "success");
                        if (parseInt(res1.data.score) >= parseInt(res1.data.passmarks)) {
                            var params = new URLSearchParams();
                            params.append("courseId", courseId)
                            params.append("quizId", getQuizId)
                            params.append("userId", userEmail)
                            axios({
                                method: 'post',
                                data: params,
                                url: `http://10.244.2.238:8081/Assessment/quiz/updateAssignMasterResultDelcare?tenant_id=${tenantId}`,
                            })
                                .then((response) => {
                                    if (response.data === "Success") {
                                        window.location.reload();
                                    }
                                })
                        } else {
                            window.location.reload();
                        }
                    })
            })
    }

    function colorChange() {
        let abc = document.getElementById(quesId);
        abc.style.backgroundColor = "green";
        abc.style.color = "white";
    }

    const removeGreater = (value) => {
        value = value.slice(0, value.length - 1);
        return value;
    }

    const returnToGetAssignedQuizDetailsHandler = () => {
        setSecondVisibility(false)
        setFirstVisibility(true);
    }

    const returnToGetAttemptedQuizDetailsHandler = () => {
        setSecondVisibility(true);
        setFirstVisibility(false);
    }

    const checkboxvalue = (value1, value2) => {
        return value1.includes(value2)
    }
    const [viewAssessment, setViewAssessment] = useState({
        isLoading: false
    })

    const viewAssessmentFun = () => {
        setViewAssessment({ isLoading: true });
    }

    return (
        <div>
            {firstVisibility ?
                <div>

                    {assessDetails.length === 0 ? (<a className="btn btn-success btn-lg btn-block" href={`http://samnayakawadi.hyderabad.cdac.in:3002/assessment/delivery/dashboard/courseId/${courseId}`} onClick={() => viewAssessmentFun()} disabled={viewAssessment.isLoading ? "true" : ""}>{viewAssessment.isLoading ? (<> Loading...</>) : "Take Online Quiz"}</a>) :

                        <table className="table" >
                            <thead>
                                <tr>
                                    <td><b>{t('quiz_id')}</b></td>
                                    <td><b>{t('no_of_attempts')}</b></td>
                                    <td><b>{t('validity_from')}</b></td>
                                    <td><b>{t('validity_to')}</b></td>
                                    <td><b>{t('status')}</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                {assessDetails.length == 0 ?
                                    <div>{msg}</div>
                                    : assessDetails.map((data, i) => {
                                        return (<tr>
                                            <td>{data.quizId}</td>
                                            <td>{data.noOfAttempts}</td>
                                            <td>{data.validFrom}</td>
                                            <td>{data.validTo}</td>
                                            <td><button className="btn btn-info" onClick={() => { quizIdHandler(data.quizId, data.noOfAttempts); viewAssessmentFun(); }} disabled={viewAssessment.isLoading ? "true" : ""}>{viewAssessment.isLoading ? (<>{t('loading')}</>) : (<>{t('start_the_quiz')}</>)}</button></td>
                                        </tr>)
                                    })
                                }

                            </tbody>
                        </table>
                    }
                </div>
                : secondVisibility ?
                    <div>
                        <div>
                            <button className="btn btn-light" onClick={() => returnToGetAssignedQuizDetailsHandler()}><b>{t('back_to_previous_page')}</b></button>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    {t('attempts_remaining')}:- <b>{reportHandler(attemptedQuizDetails.length)}</b>
                                    {/* {//console.log(attemptedQuizDetails.length)} */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{ textAlign: "center" }}>
                                    {reportHandler(attemptedQuizDetails.length) == 0 ? <Button disabled className="btn btn-warning" >{t('attempt')}</Button>
                                        : <button className="btn btn-warning" onClick={() => quizDetailsHandler()}>{t('new_attempt')}</button>}

                                </div>
                            </div>
                        </div>
                        <br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <td><b>{t('attempt_id')}</b></td>
                                    <td><b>{t('max_marks')}</b></td>
                                    <td><b>{t('score')}</b></td>
                                    <td><b>{t('result')}</b></td>
                                    <td><b>{t('status')}</b></td>
                                </tr>
                            </thead>
                            <tbody>

                                {attemptedQuizDetails.length == 0 ?
                                    <div>{msg}</div>
                                    : attemptedQuizDetails.map((data, i) => {
                                        return (<tr>
                                            <td>{data.attemptID}</td>
                                            <td>{data.maxMarks}</td>
                                            <td>{data.score}</td>
                                            <td>{data.status === "Completed" ? (data.score >= data.passmarks ? "Pass" : "Fail") : "--"}</td>
                                            <td>{data.status === "Completed" ? data.status : <Button onClick={() => openModal(data.attemptID)}>{t('resume_quiz')}</Button>}</td>
                                            {/* <td>{reportHandler(attemptedQuizDetails.length)}</td> */}
                                            {/* <td><button className="btn btn-info" onClick={(e) => quizIdHandler(e.target.value)} value={data.quizId}>Start the Quiz</button></td> */}
                                        </tr>)

                                    })
                                }

                            </tbody>
                        </table>
                        <div>
                            <button className="btn btn-light" onClick={() => returnToGetAssignedQuizDetailsHandler()}><b>{t('back_to_previous_page')}</b></button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="row">
                            <div className="col-md-4">
                                <b>{t('time')}:-</b> {getTime}
                            </div>
                            <div className="col-md-4">
                                <b>{t('total_no_of_questions')} :-</b> {getNoOfQuestions}
                            </div>
                            <div className="col-md-4">
                                <button onClick={() => openModal(0)} className="btn btn-success">{t('start')}</button>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-light" onClick={() => returnToGetAttemptedQuizDetailsHandler()}><b>{t('back_to_previous_page')}</b></button>
                        </div>
                    </div>
            }
            <Modal1 isOpen={assessmentModal} style={customStyles}>
                <div style={{ backgroundColor: 'skyblue', height: 50, textAlign: 'center', padding: '10px' }}><h4>{t('meghSikshak_practice_test')}</h4></div>
                <Container style={{ maxWidth: '100%' }}>
                    <Row >
                        <Col>
                            <div style={{ paddingTop: '125px' }}>{t('question_type')} : {quesTitle}</div>
                            <hr style={{ borderTop: "5px solid #dddddd" }}></hr>
                        </Col>
                        <Col sm={3}>
                            <div style={{ backgroundColor: 'white', padding: '20px' }}>
                                <img style={{ width: 100, height: 100, backgroundColor: "white", borderRadius: 100 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} src={`${image.img}${image.id}`} alt="" />
                                <div id="demo">{t('time_left')}: {gettimer === '00:00:00' ? FinishQuizs() : gettimer}</div></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row><Col>
                                <Style1>
                                    <div>
                                        {getQues.map((data, i) => {
                                            return (
                                                <div className="question">{removeGreater(ReactHtmlParser(ReactHtmlParser(data.value)))}</div>
                                            )
                                        })}
                                        {quesTitle === "CHOICE MULTIPLE" ? getOption.map((data, i) => {
                                            return (
                                                <ul>
                                                    <li>
                                                        <input type="checkbox" id={data.attributes.identifier}
                                                            onClick={() => colorChange()} onChange={(event) => chooseOptStore(event)} name="selector"
                                                            value={data.attributes.identifier}
                                                            checked={checkboxvalue(getChooseOption, data.attributes.identifier) == true ? true : null}
                                                        />

                                                        <label for={data.attributes.identifier} className="element-animation">{removeGreater(data.value)}</label>
                                                        <div className="checker"></div>
                                                    </li>
                                                </ul>
                                            )
                                        }) : quesTitle === "CHOICE SINGLE" ? getOption.map((data) => {
                                            return (
                                                <ul>
                                                    <li>
                                                        <input type="radio" id={data.attributes.identifier} onClick={() => colorChange()}
                                                            onChange={(event) => chooseOptStore(event)} name="selector"
                                                            value={data.attributes.identifier}
                                                            checked={getChooseOption === data.attributes.identifier ? true : null}
                                                        />
                                                        <label for={data.attributes.identifier} className="element-animation">{removeGreater(data.value)}</label>
                                                        <div className="check"></div>
                                                    </li>
                                                </ul>
                                            )
                                        }) : quesTitle === "true or false" ? getOption.map((data) => {
                                            return (
                                                <ul>
                                                    <li>
                                                        <input type="radio" id={data.attributes.identifier} onClick={() => colorChange()}
                                                            onChange={(event) => chooseOptStore(event)} name="selector"
                                                            value={data.attributes.identifier}
                                                            checked={getChooseOption === data.attributes.identifier ? true : null}
                                                        />
                                                        <label for={data.attributes.identifier} className="element-animation">{(data.value)}</label>
                                                        <div className="check"></div>
                                                    </li>
                                                </ul>
                                            )
                                        })
                                            : null
                                        }
                                    </div>
                                </Style1>
                            </Col></Row>
                        </Col>
                        <Col sm={3}>
                            <div style={{ backgroundColor: '#e0f2fd' }}>
                                <Styles>
                                    <p style={{ padding: '50px' }}>{t('question_palette')}</p>
                                    <div className="container" id="question_palette">
                                        <ul>
                                            {/* {new1.map((data1) => {
                                                return (
                                                    <div>{
                                                        newvar.map((data, i) => {
                                                            return (
                                                                <li id={data} style={data1 ? {backgroundColor: 'green'} : {backgroundColor: 'yellow'}} onClick={() => questionPalette(data)} className="bottom">{i + 1}</li>
                                                            )
                                                        })
                                                    }</div>
                                                )
                                            })} */}
                                            {
                                                newvar.map((data, i) => {
                                                    return (
                                                        <li id={data} onClick={() => questionPalette(data)} className="bottom" style={{ backgroundColor: (newvar[i] == new1[i] ? 'green' : 'white') }}>{i + 1}</li>
                                                    )
                                                })
                                            }
                                        </ul>

                                    </div>
                                </Styles>
                                <Container style={{ height: 'fit-content' }}>
                                    <Row style={{ marginTop: '10px', color: 'white' }}>
                                        <Col style={{ backgroundColor: 'green', textAlign: 'center', marginRight: '10px', marginLeft: '15px' }}>{t('answered')}</Col>
                                        <Col style={{ backgroundColor: 'red', textAlign: 'center', marginRight: '15px' }}>{t('not_answered')}</Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ borderTop: '1px solid green' }}>
                            <Row style={{ marginLeft: '30%', padding: '15px' }}>
                                <Col>{quesId === firstElement ? null : <Button onClick={() => prevQuestion()}>{t('prev')}</Button>}</Col>
                                <Col>{quesId === lastElement ? null : <Button onClick={() => nextQuestion()}>{t('next')}</Button>}</Col>
                            </Row>
                        </Col>
                        <Col sm={3}>
                            <div style={{ backgroundColor: '#e0f2fd' }}>
                                <Row style={{ marginLeft: '20%', padding: '15px 0px 15px 0px' }}>
                                    <Col><Button onClick={() => FinishQuizs()}>{t('submit')}</Button></Col>
                                    <Col><Button onClick={() => [closeModal(), Pooling()]}>{t('close')}</Button></Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <div style={{ backgroundColor: 'skyblue', height: 50, textAlign: 'center', padding: '10px' }}><h4>{t('version_1.0.0')}</h4></div>
            </Modal1>
        </div>

    );
}

export default DataTableAssessment;
