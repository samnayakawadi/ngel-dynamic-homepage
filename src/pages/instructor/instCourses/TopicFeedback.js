import { render } from '@testing-library/react';
import React, { useState, useEffect, useMemo } from 'react';
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

const customStyles = {
    title: {
        style: {
            fontColor: 'red',
            fontWeight: '900',
        }
    },
    headCells: {
        style: {
            fontSize: '17px',
            fontWeight: '500',
            textTransform: 'uppercase',
            paddingLeft: '0 8px',
            marginLeft: '10px',
        },
    },
    cells: {
        style: {
            fontSize: '15px',
            // paddingLeft: '0 8px',
            // marginLeft: '10px'
        },
    },
};

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

function TopicFeedback(props) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    let courseId = props.courseId;
    let itemId = props.itemIdForFeedback;
    ////console.log(props);

    // for different languages
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    ////////////////////

    let UserId = UserService.getUserid();
    // let tenantId = myDecipher(`${tenantID}`);

    const feedbackInitialState = {
        feedback_title: '',
        feedbacktitleError: '',
        feedbacktitledesc: '',
        feedbacktitledescError: '',
    }

    const questionInitialState = {
        question: '',
        mandatory: '',
        questionType: '',

        questionError: '',
        mandatoryError: '',
        questionTypeError: '',
        questionOptionError: '',

    }

    const [feedbackData, setfeedbackData] = useState(feedbackInitialState)
    const [questionData, setquestionData] = useState(questionInitialState)
    const [serviceList, setServiceList] = useState([{ service: "" }]);
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );

    useEffect(() => {
        getAllFeedbackQuestionList();
        topicFeedbackResponses();
    }, [])
    const [getFeedbackQuestion, setfeedbackQuestion] = useState([])
    const [getFeedbackResponse, setfeedbackResponse] = useState([])
    const getAllFeedbackQuestionList = async () => {
        let result = await service.getAllQuestionByTypeAndUpdatedBy(3, UserId);
        setfeedbackQuestion(result.data);
    }

    const topicFeedbackResponses = async () => {
        let result = await service.courseFeedbackResponse(3, itemId);
        setfeedbackResponse(result.data);
    }

    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterDataTable
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const updateQuestion = (questionId, question, questionType, mandatory, optionsMasters) => {
        let array = []
        let data = {
            questionId: questionId,
            question: question,
            mandatory: mandatory,
            questionType: questionType,

            questionError: '',
            mandatoryError: '',
            questionTypeError: '',
            questionOptionError: '',
        }
        // if (mandatory === "true") {
        //     //console.log("mandatory true")
        //     document.getElementById('flexRadioDefault1').checked = true;
        //     document.getElementById('flexRadioDefault2').checked = false;
        // }
        // if (mandatory === "false") {
        //     //console.log("mandatory false")
        //     document.getElementById('flexRadioDefault2').checked = true;
        //     document.getElementById('flexRadioDefault1').checked = false;
        // }

        if (questionType === "TF") {
            // document.getElementById('option').value = "TF";
            setquestionData(data);
            setServiceList([{ service: "" }]);
        }
        if (questionType === "TA") {
            // document.getElementById('option').value = "TA";
            setquestionData(data);
            setServiceList([{ service: "" }]);

        }
        if (questionType === "SC") {
            // document.getElementById('option').value = "SC";
            setquestionData(data);
            optionsMasters.map((d) =>
                array.push({ service: d.optionText })
            )
            setServiceList(array);
        }
        if (questionType === "MC") {
            // document.getElementById('option').value = "MC";
            setquestionData(data);
            optionsMasters.map((d) =>
                array.push({ service: d.optionText })
            )
            setServiceList(array);
        }


        // setquestionData(data);
        // optionsMasters.map((d) =>
        //     array.push({ service: d.optionText })
        // )
        // setServiceList(array);
    }

    const feedbackQuestionReset = () => {
        setquestionData({
            question: '',
            mandatory: '',
            questionType: '',
        })
    }

    const deleteQuestion = (id) => {
        swal({
            title: t('swal_title'),
            text: t('u_want_delete_question'),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: t('yes_delete'),
            closeOnConfirm: false
        }).then(isConfirmed => {
            if (isConfirmed) {
                service.deleteFeedbackQuestion(id)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(t('deleted'), t('your_question_delete'), "success");
                            getAllFeedbackQuestionList();
                            feedbackQuestionReset();
                        }
                    }).catch((err) => {
                        //console.log(err);
                        swal(t('error_mesg'), t('something_went_wrong_try_again'), "error");
                    })
            }
        });
    }


    const coloumnfeedbackQuestion = [
        {
            name: "Question",
            selector: row => row.question,
            sortable: true,
            wrap: true
        },
        {
            name: "Question Type",
            selector: row => row.questionType == "SC" ? "Single Choice" : row.questionType == "MC" ? "Multiple Choice" : row.questionType == "TF" ? "True or False" :
                row.questionType == "TA" ? "Descriptive" : '',
            sortable: true,
            wrap: true
        },
        {
            name: "Question Mandatory",
            selector: row => row.mandatory,
            sortable: true,
            wrap: true
        },
        {
            name: "Options",
            selector: row => row.questionType == "SC" || row.questionType == "MC" ? row.optionsMasters.map((d, i) => <ol>
                <li>{i + 1}.{d.optionText}</li>
            </ol>) : '',
            sortable: true,
            wrap: true
        },
        {
            name: "Action",
            sortable: true,
            wrap: true,
            cell: (row) => <div>
                {UserId === row.updatedBy ?
                    <><button className='btn btn-danger m-3' onClick={() => deleteQuestion(row.questionId)}><i class="fas fa-trash"></i> </button>
                        <button className='btn btn-primary' onClick={() => updateQuestion(row.questionId, row.question, row.questionType, row.mandatory, row.optionsMasters)}><i class="fas fa-edit"></i> </button></>
                    : ''}
                {/* {UserId === row.updatedBy ?
                    <>
                        <button className='btn btn-primary' onClick={() => updateQuestion(row.questionId, row.question, row.questionType, row.mandatory, row.optionsMasters)}><i class="fas fa-edit"></i></button>
                    </>
                    :
                    <>
                    </>

                } */}
            </div>

        }

    ]


    const coloumnfeedbackQuestion1 = [
        {
            name: "Question",
            selector: row => row.question,
            sortable: true,
            wrap: true
        },
        {
            name: "Question Type",
            selector: row => row.questionType == "SC" ? "Single Choice" : row.questionType == "MC" ? "Multiple Choice" : row.questionType == "TF" ? "True or False" :
                row.questionType == "TA" ? "Descriptive" : '',
            sortable: true,
            wrap: true
        },
        {
            name: "Question Mandatory",
            selector: row => row.mandatory,
            sortable: true,
            wrap: true
        },
        {
            name: "Options",
            selector: row => row.questionType == "SC" || row.questionType == "MC" ? row.optionsMasters.map((d, i) => <ol>
                <li>{i + 1}.{d.optionText}</li>
            </ol>) : '',
            sortable: true,
            wrap: true
        }

    ]

    const filteredItemsFeedbackQuestion = getFeedbackQuestion.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );
    const [questionselectedRows, setQuestionSelectedRows] = React.useState([]);
    const questionRowSelected = React.useCallback(state => {
        setQuestionSelectedRows(state.selectedRows);
    }, []);

    let questionIds = questionselectedRows.map((d) => d.questionId);

    // const AddQuestionInCourse = () => {
    //     let data = {
    //         "feedbackId": feedbackId,
    //         "questionId": questionIds
    //     }
    //     service.addQuestionsMapWithIds(data)
    //         .then(async res => {
    //             if (res.status === 201) {
    //                 await swal("Success!", "Your Feedback Question Successfully Add in Course.", "success");
    //                 getAllFeedbackQuestionList();
    //             }
    //         })
    // }

    const feedbackResponseCheckHandler = (data) => {
        let array = data;
        let result = array.split(",").map((e) => parseInt(e));
        return result;
    }

    /* this code is for  feedback question handle submit */


    const feedbackformVlaidate = () => {
        let feedbacktitleError = '';
        let feedbacktitledescError = '';

        if (!feedbackData.feedback_title) {
            feedbacktitleError = t('title_is_required_field');
        } else if (feedbackData.feedback_title.length > 50) {
            feedbacktitleError = t('length_exceed');
        }
        else if (feedbackData.feedback_title.length < 3) {
            feedbacktitleError = t('length_greater_than_3');
        }
        else if (feedbackData.feedback_title.match(/[A-Za-z0-9& ]+$/)) {
            feedbacktitleError = "";
        }
        else {
            feedbacktitleError = t('do_not_use_special_charater');
        }

        if (!feedbackData.feedbacktitledesc) {
            feedbacktitledescError = t('title_description_required_field');
        } else if (feedbackData.feedbacktitledesc.length > 500) {
            feedbacktitledescError = t('length_exceed');
        }
        else if (feedbackData.feedbacktitledesc.length < 3) {
            feedbacktitledescError = t('length_greater_than_3');
        }
        else if (feedbackData.feedbacktitledesc.match(/[A-Za-z0-9&., ]+$/)) {
            feedbacktitledescError = "";
        }
        else {
            feedbacktitledescError = t('do_not_use_special_charater');
        }

        if (feedbacktitleError || feedbacktitledescError) {
            setfeedbackData({ ...feedbackData, feedbacktitleError, feedbacktitledescError, });
            return false;
        }
        return true;
    }

    const feedbackReset = () => {
        setfeedbackData({
            feedback_title: "",
            feedbacktitledesc: "",
        })
    }

    const feedbackhandleSubmit = (e) => {
        e.preventDefault();
        const isValidate1 = feedbackformVlaidate();
        if (isValidate1) {
            let data = {
                "description": feedbackData.feedbacktitledesc,
                "feedbackId": 0,
                "feedbackTitle": feedbackData.feedback_title,
                "id": itemId,
                "typeMasterId": 3,
                "updatedBy": UserId
            }
            ////console.log(data);
            service.feedbackMasterPost(data)
                .then(async res => {
                    if (res.status === 201) {
                        await swal(t('success'), t('feedback_master_add_sucessfully'), "success");
                        feedbackReset();
                        let data = {
                            "feedbackId": res.data.feedbackId,
                            "questionId": questionIds
                        }
                        service.addQuestionsMapWithIds(data)
                            .then(async res => {
                                if (res.status === 201) {
                                    await swal(t('success'), t('feedback_question_successfully_add_course'), "success");
                                    getAllFeedbackQuestionList();
                                }
                            })
                    } else {
                        //console.log("something is wrong")
                    }
                }).catch(err => {
                    //console.log(err);
                })
        }
    }

    const questionhandleSubmit = (e) => {
        e.preventDefault();
        const qValidate = questionformVlaidate();
        if (questionData.questionId) {
            let data = {
                "courseId": 0,
                "mandatory": questionData.mandatory,
                "options": (questionData.questionType == "SC" || questionData.questionType == "MC") ? serviceList.map((d) => d.service) : ["NA"],
                "question": questionData.question,
                "questionId": 0,
                "questionType": questionData.questionType,
                "tenantId": 0,
                "updatedBy": UserId,
                "typeId": 3,
                "questionId": questionData.questionId
            }

            if (qValidate) {
                service.feedbackQuestionUpdateForCourse(data)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(t('success'), t('question_update'), "success");
                            getAllFeedbackQuestionList();
                            feedbackQuestionReset();
                            setServiceList([{ service: "" }]);
                        } else {
                            swal(t('error_mesg'), t('something_went_wrong_try_again'), "error")
                            //console.log("something is wrong")

                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        }
        else {
            let data = {
                "courseId": 0,
                "mandatory": questionData.mandatory,
                "options": (questionData.questionType == "SC" || questionData.questionType == "MC") ? serviceList.map((d) => d.service) : ["NA"],
                "question": questionData.question,
                "questionId": 0,
                "questionType": questionData.questionType,
                "tenantId": 0,
                "updatedBy": UserId,
                "typeId": 3,
            }

            if (qValidate) {
                service.feedbackQuestionCreationForCourse(data)
                    .then(async res => {
                        if (res.status === 201) {
                            await swal(t('success'), t('question_created_successfully'), "success");
                            getAllFeedbackQuestionList();
                            feedbackQuestionReset();
                            setServiceList([{ service: "" }]);
                        } else {
                            swal(t('error_mesg'), t('something_went_wrong_try_again'), "error")
                            //console.log("something is wrong")
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        }
    }

    const questionformVlaidate = () => {
        let questionError = '';
        let mandatoryError = '';
        let questionTypeError = '';
        let questionOptionError = '';

        if (!questionData.question) {
            questionError = t('question_is_required_field');
            //console.log("testing flow");
        } else if (questionData.question.length > 50) {
            questionError = t('text_max_50_error');
            //console.log("testing flow");
        }
        else if (questionData.question.length < 3) {
            questionError = t('text_min_3_char');
            //console.log("testing flow");
        }
        else if (questionData.question.match(/[A-Za-z0-9&.,? ]+$/)) {
            questionError = "";
            //console.log("testing flow");
        }
        else {
            questionError = t('special_symbol_not_allowed');
            //console.log("testing flow");
        }


        if (!questionData.mandatory) {
            mandatoryError = t('question_mandatory_is_required_field');
        }
        if (!questionData.questionType) {
            questionTypeError =t('quest_Type_required');
        }
        // if (serviceList.length == 0) {
        //     questionOptionError = "Option is required field"
        // }

        if (!questionData.questionType || questionData.questionType == "Select Option") {
            questionTypeError = t('quest_Type_required');
        }
        if (questionData.questionType === "MC" || questionData.questionType === "SC") {
            if (serviceList.length >= 1 && serviceList.length <= 4) {
                if (serviceList.length == 1) {
                    if (serviceList[0].service === '') {
                        questionOptionError = t('option_required_field')
                    }
                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&')) {
                            questionOptionError = t('general_feedback_error_1')
                        }
                    }
                }
                if (serviceList.length === 2) {
                    if (serviceList[0].service == '' || serviceList[1].service == '') {
                        questionOptionError = t('option_required_field')
                    }
                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&')) {
                            questionOptionError = t('general_feedback_error_1')
                        }
                    }

                }
                if (serviceList.length == 3) {
                    if (serviceList[0].service == '' || serviceList[1].service == '' || serviceList[2].service == '') {
                        questionOptionError = t('option_required_field')
                    }

                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&') || !serviceList[2].service.match(/[a-zA-Z]+/g) || serviceList[2].service.includes('>') || serviceList[2].service.includes('<') || serviceList[2].service.includes('%') || serviceList[2].service.includes('&')) {
                            questionOptionError = t('general_feedback_error_1')
                        }
                    }

                }
                if (serviceList.length == 4) {
                    if (serviceList[0].service == '' || serviceList[1].service == '' || serviceList[2].service == '' || serviceList[3].service == '') {
                        questionOptionError = t('option_required_field')
                    }

                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&') || !serviceList[2].service.match(/[a-zA-Z]+/g) || serviceList[2].service.includes('>') || serviceList[2].service.includes('<') || serviceList[2].service.includes('%') || serviceList[2].service.includes('&') || !serviceList[3].service.match(/[a-zA-Z]+/g) || serviceList[3].service.includes('>') || serviceList[3].service.includes('<') || serviceList[3].service.includes('%') || serviceList[3].service.includes('&')) {
                            questionOptionError =  t('general_feedback_error_1')
                        }
                    }

                }
            }
        }

        if (questionError || mandatoryError || questionTypeError || questionOptionError) {
            setquestionData({ ...questionData, questionError, mandatoryError, questionTypeError, questionOptionError });
            return false;
        }
        return true;
    }

    return (
        <div>

            <Tab.Container defaultActiveKey="AddMaster">
                <div>
                    <Nav className="flex-column">
                        {/* <Row>
        <Col style={{textAlign:'center', background: `${colors.gr_bg}`, margin:10, marginLeft:20, paddingTop:10, paddingBottom:0 , borderRadius:10, marginBottom:20}}>
        
            <Nav.Item>
                <Nav.Link eventKey="AddMaster" style={{color: 'white'}}><h6>MANAGE FEEDBACK</h6></Nav.Link>
            </Nav.Item>
        </Col>
        
        <Col style={{textAlign:'center', background: `${colors.gr_bg}`, margin:10, marginRight:20, paddingTop:10, paddingBottom:0, borderRadius:10, marginBottom:20}} >
            <Nav.Item>
                <Nav.Link eventKey="AddQuestion" style={{color: 'white'}}><h6>ADD QUESTION</h6></Nav.Link>
            </Nav.Item>
        </Col> */}
                        <Row>
                            <Col style={{ textAlign: 'center', margin: 10, marginRight: 20, paddingTop: 10, paddingBottom: 0, borderRadius: 10 }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="AddMaster"><h6 className="heading" style={{ textTransform: 'capitalize' }}>{t('manage_feedBack')}</h6></Nav.Link>
                                </Nav.Item>
                            </Col>

                            <Col style={{ textAlign: 'center', margin: 10, marginRight: 20, paddingTop: 10, paddingBottom: 0, borderRadius: 10 }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="AddQuestion"><h6 className="heading" style={{ textTransform: 'capitalize' }}>{t('add_question')}</h6></Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col style={{ textAlign: 'center', margin: 10, marginRight: 20, paddingTop: 10, paddingBottom: 0, borderRadius: 10 }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="ViewFeedback"><h6 className="heading" style={{ textTransform: 'capitalize' }}>{t('view_feedback')}</h6></Nav.Link>
                                </Nav.Item>
                            </Col>
                        </Row>
                    </Nav>
                </div>
                <Tab.Content>
                    <Tab.Pane eventKey="AddMaster" className="overview-tab">
                        <form onSubmit={(e) => feedbackhandleSubmit(e)} autoComplete="off">
                            <div className="form-group">
                                <label className="mb-0">{t('feedback_title')}<span className="text-danger">*</span></label>
                                <input name="feedback_title" type="text" minLength={2} maxLength={50} value={feedbackData.feedback_title} className="form-control" placeholder={t('enter_feedback_title')} onChange={(e) => setfeedbackData({ ...feedbackData, feedback_title: e.target.value })}
                                />
                                {feedbackData.feedbacktitleError
                                    ? <div className="alert alert-danger mt-2">{feedbackData.feedbacktitleError}</div>
                                    : ''
                                }
                            </div>
                            <div className="form-group">
                                <label className="mb-0">{t('feedback_description')}<span className="text-danger">*</span></label>
                                <textarea name="feedback_desc" type="text" minLength={2} maxLength={1500} value={feedbackData.feedbacktitledesc} className="form-control" placeholder={t('enter_feedback_description')} onChange={(e) => setfeedbackData({ ...feedbackData, feedbacktitledesc: e.target.value })}
                                />
                                {feedbackData.feedbacktitledescError
                                    ? <div className="alert alert-danger mt-2">{feedbackData.feedbacktitledescError}</div>
                                    : ''
                                }
                            </div>

                            <div class="shadow-lg p-3 bg-body rounded">
                                <Card>
                                    <div>
                                        <DataTable
                                            columns={coloumnfeedbackQuestion1}
                                            data={filteredItemsFeedbackQuestion}
                                            defaultSortField="Name"
                                            defaultSortAsc={true}
                                            striped
                                            pagination
                                            highlightOnHover
                                            customStyles={customStyles}
                                            subHeader
                                            subHeaderComponent={subHeaderComponent}
                                            fixedHeader
                                            fixedHeaderScrollHeight="300px"
                                            selectableRows
                                            onSelectedRowsChange={questionRowSelected}
                                        />
                                    </div>
                                    <div style={{ width: "300px" }}>
                                        <Row style={{ marginBottom: '15px', marginLeft: '2px', marginTop: '-40px' }}>
                                            <Col>
                                                {questionIds.length == 0 ? <Button disabled className="btn btn-primary pull-left m-2 w-10">{t('add_feedback_question')}</Button> :
                                                    <Button type="submit" className="btn btn-primary pull-left m-2 w-10">{t('add_feedback_question')}</Button>}
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </div>
                        </form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="AddQuestion" className="overview-tab">
                        <form onSubmit={(e) => questionhandleSubmit(e)} autoComplete="off">
                            <div className="form-group">
                                <label className="mb-0">{t('question')}<span className="text-danger">*</span></label>
                                <input name="feedback_title" type="text" minLength={2} maxLength={150} value={questionData.question} className="form-control" placeholder={t('enter_question')} onChange={(e) => setquestionData({ ...questionData, question: e.target.value })}
                                />
                                {
                                    (questionData.question == '' || questionData.question == undefined || questionData.questionError !== '')
                                        ?
                                        <>
                                            {
                                                questionData.questionError
                                                    ?
                                                    <div className="alert alert-danger mt-2">
                                                        {questionData.questionError}
                                                    </div>
                                                    : ''
                                            }
                                        </>
                                        :
                                        <>
                                            {null}
                                        </>
                                }
                                {/* {questionData.questionError
                        ? <div className="alert alert-danger mt-2">{questionData.questionError}</div>
                        : ''
                    } */}
                            </div>
                            <div className="form-group">
                                <label className="mb-0">{t('question_mandatory')}<span className="text-danger">*</span></label>
                                <div class="form-check">
                                    <input class="form-check-input" checked={questionData.mandatory == 'true' ? 'true' : ''} type="radio" value="true" name="flexRadioDefault" id="flexRadioDefault1"
                                        onChange={(e) => setquestionData({ ...questionData, mandatory: e.target.value })} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        {t('yes')}
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" checked={questionData.mandatory == 'false' ? 'false' : ''} type="radio" value="false" name="flexRadioDefault" id="flexRadioDefault2"
                                        onChange={(e) => setquestionData({ ...questionData, mandatory: e.target.value })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        {t('no')}
                                    </label>
                                </div>
                                {
                                    questionData.mandatory == '' || questionData.mandatory == undefined
                                        ?
                                        <>
                                            {questionData.mandatoryError
                                                ? <div className="alert alert-danger mt-2">{questionData.mandatoryError}</div>
                                                : ''
                                            }
                                        </>
                                        :
                                        <>
                                            {null}
                                        </>
                                }


                                {/* {questionData.mandatoryError
                        ? <div className="alert alert-danger mt-2">{questionData.mandatoryError}</div>
                        : ''
                    } */}
                            </div>

                            <div className="form-group">
                                <label className="mb-0">{t('question_type')}<span className="text-danger">*</span></label>
                                <select className="form-control" value={questionData.questionType} onChange={(e) => setquestionData({ ...questionData, questionType: e.target.value })} aria-label="Default select example">
                                    <option selected>{t('select_question')}</option>
                                    <option value="SC">{t('single_choice')}</option>
                                    <option value="MC">{t('multiple_choice')}</option>
                                    <option value="TF">{t('true_and_false')}</option>
                                    <option value="TA">{t('descriptive')}</option>
                                </select>
                                {
                                    questionData.questionType == '' || questionData.questionType == undefined || questionData.questionType == "Select Option"
                                        ?
                                        <>
                                            {questionData.questionTypeError
                                                ?
                                                <div className="alert alert-danger mt-2">{questionData.questionTypeError}</div>
                                                : ''
                                            }
                                        </>
                                        :
                                        <>
                                            {null}
                                        </>
                                }


                                {/* {questionData.questionTypeError
                        ? <div className="alert alert-danger mt-2">{questionData.questionTypeError}</div>
                        : ''
                    } */}
                            </div>
                            {questionData.questionType === "SC" || questionData.questionType === "MC" ?
                                <div className="form-group">
                                    <label className="mb-0">{t('options')}<span className="text-danger">*</span></label>
                                    {serviceList.map((singleService, index) => (
                                        <div key={index} className="services">
                                            <div className="first-division">
                                                <input className="form-control"
                                                    name="service"
                                                    type="text"
                                                    id="service"
                                                    value={singleService.service}
                                                    onChange={(e) => handleServiceChange(e, index)}
                                                />
                                                {serviceList.length - 1 === index && serviceList.length < 4 && (
                                                    <i class="fa fa-plus-circle pull-right fa-2x" onClick={handleServiceAdd} style={{ "color": "green" }} aria-hidden="true"></i>
                                                )}
                                            </div>
                                            <br></br>
                                            <div className="second-division">
                                                {serviceList.length !== 1 && (
                                                    <i class="fa fa-times-circle pull-right fa-2x" onClick={() => handleServiceRemove(index)} style={{ "background": "radial-gradient(white 50%, transparent 50%)", "color": "red" }} aria-hidden="true"></i>

                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {questionData.questionOptionError
                                        ? <div className="alert alert-danger mt-2">{questionData.questionOptionError}</div>
                                        : ''
                                    }
                                </div>
                                : ''}
                            <Button type="submit" className="btn btn-primary pull-left m-2 w-10">{questionData.questionId ? t('update') : t('add')}</Button>
                            {questionData.questionId ? '' :
                                < Button type="reset" onClick={() => feedbackQuestionReset()} className="btn btn-primary w-10">{t('reset')}</Button>}
                        </form>

                        <div class="shadow-lg p-3 bg-body rounded">
                            <Card>
                                <DataTable
                                    columns={coloumnfeedbackQuestion}
                                    data={filteredItemsFeedbackQuestion}
                                    defaultSortField="Name"
                                    defaultSortAsc={true}
                                    striped
                                    pagination
                                    highlightOnHover
                                    customStyles={customStyles}
                                    subHeader
                                    subHeaderComponent={subHeaderComponent}
                                    fixedHeader
                                    fixedHeaderScrollHeight="300px"
                                />
                                {/* <Row style={{ marginBottom: '15px', marginLeft: '2px', marginTop: '-40px' }}>
                        <Col>
                            <Button onClick={() => [reset(), setAddAnnouncementDiv(true)]}>Add Announcement</Button>
                        </Col>
                    </Row> */}
                            </Card>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="ViewFeedback" className="overview-tab">
                        <Accordion defaultActiveKey="0">
                            {getFeedbackResponse.length == 0 ? <p>{t('no_responses_for_course')}</p> :
                                <>
                                    {getFeedbackResponse.map((data, i) =>
                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header>{i + 1}</Accordion.Header>
                                            <Accordion.Body style={{ marginLeft: '25px' }}>
                                                {data.responseMaster.map((a, j) => <div style={{ margin: '10px', padding: '10px' }}>{j + 1}.{a.questionMaster.question} {a.questionMaster.questionType == "TF" || a.questionMaster.questionType == "TA" ? <ul style={{ listStyleType: 'none', marginLeft: '10px' }}><li>
                                                    Ans. {a.feedbackResponse} </li></ul> : ''}
                                                    {a.questionMaster.optionsMasters.map((d, k) => <ul style={{ listStyleType: 'none', marginLeft: '10px' }}><li>
                                                        {k + 1}.  {d.optionText} {feedbackResponseCheckHandler(a.feedbackResponse).includes(d.optionId) ? <i class="fa fa-check" style={{ color: 'green' }} aria-hidden="true"></i>
                                                            : ''}</li></ul>)}
                                                </div>)}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )}
                                </>
                            }
                        </Accordion>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>

    )
}

export default TopicFeedback