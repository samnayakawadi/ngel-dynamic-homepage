import React from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import { Container, Tab, Nav, Card, Modal, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import swal from 'sweetalert';
import { Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect, useMemo } from 'react';
import UserService from '../../services/UserService';
import Accordion from 'react-bootstrap/Accordion';
import DataTable from "react-data-table-component";
import service from '../../services/service';
import FilterDataTable from '../../pages/instructor/FilterDataTable';

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



const customStyles = {
    title: {
        style: {
            fontColor: 'red',
            fontWeight: '900',
        }
    },

    rows: {
        style: {
            minHeight: '72px'
        },
    },

    headCells: {
        style: {

            widthRight: '8px',
            widthLeft: '8px',
            // paddingLeft: '8px', // override the cell padding for head cells
            // paddingRight: '8px',
            fontSize: '17px',
            // fontWeight: '500',
            // textTransform: 'uppercase',
            // paddingLeft: '0 8px',
            // marginLeft: '10px',
        },
    },
    cells: {
        style: {
            widthRight: '8px',
            widthLeft: '8px',
            // paddingLeft: '8px', // override the cell padding for data cells
            // paddingRight: '8px',
            fontSize: '15px',
            // paddingLeft: '0 8px',
            // marginLeft: '10px'
        },
    },
};


function GeneralFeedbackMaster() {

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    useEffect(() => {
        UserService.generateToken();
    }, []);


    let tenantId = 1;
    let UserId = UserService.getUserid();

    const initialState = {
        feedback_title: '',
        feedbacktitleError: '',
        feedbacktitledesc: '',
        feedbacktitledescError: '',
        feedbackType: '',
        feedbackTypeError: '',
        publishupto: '',
        publishuptoError: '',
    }
    const [announcementData, setAnnouncementData] = useState(initialState)

    const formVlaidate = () => {
        let feedbacktitleError = '';
        let feedbacktitledescError = '';
        let feedbackTypeError = '';
        let publishuptoError = '';

        if (!announcementData.feedback_title) {
            feedbacktitleError = t('title_is_required_field');
        } else if (announcementData.feedback_title.length > 50) {
            feedbacktitleError = t('length_exceed');
        }
        else if (announcementData.feedback_title.length < 3) {
            feedbacktitleError = t('length_greater_than_3');
        }
        else if (announcementData.feedback_title.match(/[A-Za-z0-9& ]+$/)) {
            feedbacktitleError = "";
        }
        else {
            feedbacktitleError = t('do_not_use_special_charater');
        }



        if (!announcementData.feedbacktitledesc) {
            feedbacktitledescError = t('title_description_required_field');
        } else if (announcementData.feedbacktitledesc.length > 500) {
            feedbacktitledescError = t('length_exceed');
        }
        else if (announcementData.feedbacktitledesc.length < 3) {
            feedbacktitledescError = t('length_greater_than_3');
        }
        else if (announcementData.feedbacktitledesc.match(/[A-Za-z0-9&., ]+$/)) {
            feedbacktitledescError = "";
        }
        else {
            feedbacktitledescError = t('do_not_use_special_charater');
        }


        if (!announcementData.feedbackType) {
            feedbackTypeError = t('this_is_required_field');
        }
        if (!announcementData.publishupto) {
            publishuptoError = t('this_is_required_field');
        }
        if (feedbacktitleError || feedbacktitledescError || feedbackTypeError || publishuptoError) {
            setAnnouncementData({ ...announcementData, feedbacktitleError, feedbacktitledescError, feedbackTypeError, publishuptoError });
            return false;
        }
        return true;
    }

    const reset = () => {
        setAnnouncementData({
            title: "",
            titledesc: "",
            publishfrom: "",
            publishupto: ''
        })
    }

    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );

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


    /* Course Structure Create Code End */

    /* this code is for  feedback handle submit */

    const feedbackInitialState = {
        feedback_title: '',
        feedbacktitleError: '',
        feedbacktitledesc: '',
        feedbacktitledescError: '',
    }
    const [feedbackData, setfeedbackData] = useState(feedbackInitialState)

    const feedbackformVlaidate = () => {
        let feedbacktitleError = '';
        let feedbacktitledescError = '';

        if (!feedbackData.feedback_title) {
            feedbacktitleError = t('this_is_required_field');
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
                "id": tenantId,
                "typeMasterId": 2,
                "updatedBy": UserId
            }
            service.feedbackMasterPost(data)
                .then(async res => {
                    if (res.status === 201) {
                        await swal(`${t('success')}`, `${t('feedback_master_add_sucessfully')}`, "success");
                        feedbackReset();
                        let data = {
                            "feedbackId": res.data.feedbackId,
                            "questionId": questionIds
                        }
                        service.addQuestionsMapWithIds(data)
                            .then(async res => {
                                if (res.status === 201) {
                                    await swal(`${t('success')}`, `${t('feedback_question_successfully_add_course')}`, "success");
                                    getAllFeedbackQuestionList();
                                }
                            })
                    } else {
                        swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
                        //console.log("something is wrong")
                    }
                }).catch(err => {
                    //console.log(err);
                })
        }
    }

    /* this code is for  feedback handle submit */

    /* this code is for  feedback question handle submit */

    const [serviceList, setServiceList] = useState([{ service: "" }]);

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
        setServiceList([...serviceList, { service: '' }]);
    };

    function feedbackQuestionReset() {
        document.getElementById("flexRadioDefault1").checked = false;
        document.getElementById("flexRadioDefault2").checked = false;
        document.getElementById("option").value = "SO";
        ////console.log(service.length)
        setServiceList([{ service: '' }]);
        setquestionData({
            question: '',
            mandatory: '',
            questionType: '',
        })
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
    const [questionData, setquestionData] = useState(questionInitialState)

    const questionformVlaidate = () => {
        let questionError = '';
        let mandatoryError = '';
        let questionTypeError = '';
        let questionOptionError = '';


        if (!questionData.question) {
            questionError = t('question_is_required_field');
        } else if (questionData.question.length > 50) {
            questionError = t('length_exceed');
        }
        else if (questionData.question.length < 3) {
            questionError = t('length_greater_than_3');
        }
        else if (questionData.question.match(/[A-Za-z0-9&.,? ]+$/)) {
            questionError = "";
        }
        else {
            questionError = t('do_not_use_special_charater');
        }


        if (!questionData.mandatory) {
            mandatoryError = t('question_mandatory_is_required_field');
        }
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
                        if (!serviceList[0].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&')) {
                            questionOptionError = t('general_feedback_error_1')
                        }
                    }
                }
                if (serviceList.length === 2) {
                    if (serviceList[0].service == '' || serviceList[1].service == '') {
                        questionOptionError = t('option_required_field')
                    }
                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&')) {
                            questionOptionError = t('general_feedback_error_1')
                        }
                    }

                }
                if (serviceList.length == 3) {
                    if (serviceList[0].service == '' || serviceList[1].service == '' || serviceList[2].service == '') {
                        questionOptionError = t('option_required_field')
                    }

                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&') || !serviceList[2].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[2].service.includes('>') || serviceList[2].service.includes('<') || serviceList[2].service.includes('%') || serviceList[2].service.includes('&')) {
                            questionOptionError = t('general_feedback_error_1')
                        }
                    }

                }
                if (serviceList.length == 4) {
                    if (serviceList[0].service == '' || serviceList[1].service == '' || serviceList[2].service == '' || serviceList[3].service == '') {
                        questionOptionError = t('option_required_field')
                    }

                    else {
                        if (!serviceList[0].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[0].service.includes('>') || serviceList[0].service.includes('<') || serviceList[0].service.includes('%') || serviceList[0].service.includes('&') || !serviceList[1].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[1].service.includes('>') || serviceList[1].service.includes('<') || serviceList[1].service.includes('%') || serviceList[1].service.includes('&') || !serviceList[2].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[2].service.includes('>') || serviceList[2].service.includes('<') || serviceList[2].service.includes('%') || serviceList[2].service.includes('&') || !serviceList[3].service.match(/[a-zA-Z0-9,.'() ]+/g) || serviceList[3].service.includes('>') || serviceList[3].service.includes('<') || serviceList[3].service.includes('%') || serviceList[3].service.includes('&')) {
                            questionOptionError = t('general_feedback_error_1')
                        }
                    }

                }
            }

        }


        //console.log(questionError)
        //console.log(mandatoryError)
        //console.log(questionTypeError)
        //console.log(questionOptionError)

        if (questionError || mandatoryError || questionTypeError || questionOptionError) {
            setquestionData({ ...questionData, questionError, mandatoryError, questionTypeError, questionOptionError });
            return false;
        }
        return true;
    }


    // const questionhandleSubmit = (e) => {
    //     e.preventDefault();
    //     const qValidate = questionformVlaidate();
    //     let data = {
    //         "courseId": 0,
    //         "mandatory": questionData.mandatory,
    //         "options": questionData.questionType == "SC" || questionData.questionType == "MC" ? serviceList.map((d) => d.service) : ["NA"],
    //         "question": questionData.question,
    //         "questionId": 0,
    //         "questionType": questionData.questionType,
    //         "tenantId": 0,
    //         "updatedBy": UserId,
    //         "typeId": 2,
    //     }
    //     if (qValidate) {
    //         service.feedbackQuestionCreationForCourse(data)
    //             .then(async res => {
    //                 if (res.status === 201) {
    //                     await swal("Success!", "Question Created Successfully.", "success");
    //                     getAllFeedbackQuestionList();
    //                     feedbackQuestionReset();
    //                 } else {
    //                     //console.log("something is wrong")
    //                 }
    //             }).catch(err => {
    //                 //console.log(err);
    //         })
    //     }
    // }

    const [showAddFeedback, setShowAddFeedback] = useState(false)

    const [showCreateQuestion, setShowCreateQuestion] = useState(false);
    const onClickCreateQuestion = () => {

        setShowCreateQuestion(true);
    }
    const onClickCloseButton = () => {

        setShowCreateQuestion(false);
    }


    const questionhandleSubmit = (e) => {
        e.preventDefault();
        const qValidate = questionformVlaidate();
        if (questionData.questionId) {
            let data = {
                "courseId": 0,
                "mandatory": questionData.mandatory,
                "options": questionData.questionType == "SC" || questionData.questionType == "MC" ? serviceList.map((d) => d.service) : ["NA"],
                "question": questionData.question,
                "questionId": 0,
                "questionType": questionData.questionType,
                "tenantId": 0,
                "updatedBy": UserId,
                "typeId": 2,
                "questionId": questionData.questionId
            }

            if (qValidate) {
                service.feedbackQuestionUpdateForCourse(data)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('success')}`, `${t('question_update')}`, "success");
                            getAllFeedbackQuestionList();
                            setShowCreateQuestion(false);
                            feedbackQuestionReset();
                        } else {
                            swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
                            //console.log("something is wrong")
                        }
                    }).catch(err => {

                        //console.log(err);
                    })
                document.getElementById("flexRadioDefault2").checked = false;
                document.getElementById("flexRadioDefault1").checked = false;
                document.getElementById("option").value = "SO";
            }
        }
        else {

            let data = {
                "courseId": 0,
                "mandatory": questionData.mandatory,
                "options": questionData.questionType == "SC" || questionData.questionType == "MC" ? serviceList.map((d) => d.service) : ["NA"],
                "question": questionData.question,
                "questionId": 0,
                "questionType": questionData.questionType,
                "tenantId": 0,
                "updatedBy": UserId,
                "typeId": 2,
            }

            if (qValidate) {
                service.feedbackQuestionCreationForCourse(data)
                    .then(async res => {
                        if (res.status === 201) {
                            await swal(`${t('success')}`, `${t('question_update')}`, "success");
                            getAllFeedbackQuestionList();
                            setShowCreateQuestion(false);
                            feedbackQuestionReset();
                        } else {
                            swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
                            //console.log("something is wrong")
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
                document.getElementById("flexRadioDefault1").checked = false;
                document.getElementById("flexRadioDefault2").checked = false;
                document.getElementById("option").value = "SO";

            }
        }
    }




    useEffect(() => {
        getAllFeedbackQuestionList();
        courseFeedbackResponses();
    }, [])
    const [getFeedbackQuestion, setfeedbackQuestion] = useState([])
    const [getFeedbackResponse, setfeedbackResponse] = useState([])
    const getAllFeedbackQuestionList = async () => {
        let result = await service.getAllQuestionByType(2);
        ////console.log(result.data);
        setfeedbackQuestion(result.data);
    }

    const courseFeedbackResponses = async () => {
        let result = await service.courseFeedbackResponse(2, tenantId);
        setfeedbackResponse(result.data);
    }

    const deleteQuestion = (id) => {
        swal({
            title: `${t('r_u_sure')}`,
            text: `${t('u_want_delete_question')}`,
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
                            await swal(`${t('deleted')}`, `${t('your_folder_deleted')}`, "success");
                            getAllFeedbackQuestionList();
                            feedbackQuestionReset();
                        }
                    }).catch((error) => {
                        swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
                        //console.log(error)
                    })
            }

        });
    }

    const updateQuestion = (questionId, question, questionType, mandatory, optionsMasters) => {

        //setShowCreateQuestion(true);

        setUpdateData(questionId, question, questionType, mandatory, optionsMasters);

    }

    const setUpdateData = (questionId, question, questionType, mandatory, optionsMasters) => {
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

        if (mandatory === "true") {
            // //console.log("mandatory true")
            document.getElementById('flexRadioDefault1').checked = true;
            document.getElementById('flexRadioDefault2').checked = false;
        }
        if (mandatory === "false") {
            // //console.log("mandatory false")
            document.getElementById('flexRadioDefault2').checked = true;
            document.getElementById('flexRadioDefault1').checked = false;
        }

        if (questionType === "TF") {
            document.getElementById('option').value = "TF";
            // //console.log(serviceList.length);
            // const index=serviceList.length - 1;
            // handleServiceRemove(index); 
            setquestionData(data);
            setServiceList([{ service: "" }]);
        }
        if (questionType === "TA") {
            document.getElementById('option').value = "TA";
            // //console.log(serviceList.length);
            // const index=serviceList.length - 1;
            // handleServiceRemove(index);
            setquestionData(data);
            setServiceList([{ service: "" }]);


        }
        if (questionType === "SC") {
            document.getElementById('option').value = "SC";
            setquestionData(data);
            optionsMasters.map((d) =>
                array.push({ service: d.optionText })
            )
            setServiceList(array);
        }
        if (questionType === "MC") {
            document.getElementById('option').value = "MC";
            setquestionData(data);
            optionsMasters.map((d) =>
                array.push({ service: d.optionText })
            )
            setServiceList(array);
        }
    }

    const coloumnfeedbackQuestion = [
        {
            name: "Question",
            selector: row => row.question,
            sortable: true,
            width: '250px',
            wrap: true
        },
        {
            name: "Question Type",
            selector: (row) => <>
                {
                    row.questionType === 'SC' ? "Single Choice" : row.questionType === 'MC' ? 'Multiple Choice' : row.questionType === "TF" ? "True and False" : row.questionType === 'TA' ? 'Description' : ''
                }
            </>,
            sortable: true,
            width: '200px',
            wrap: true
        },
        {
            name: "Question Mandatory",
            selector: row => row.mandatory,
            sortable: true,
            width: '250px',
            wrap: true,
        },
        {
            name: "Options",
            selector: row => row.optionsMasters.map((d, i) => <ol>
                <li>{i + 1}.{d.optionText}</li>
            </ol>),
            sortable: true,
            width: '200px',
            wrap: true
        },
        {
            name: "Action",
            width: '130px',
            wrap: true,
            cell: (row) => <div>
                {UserId === row.updatedBy ?
                    <button className='btn btn-danger' onClick={() => deleteQuestion(row.questionId)}><i class="fas fa-trash"></i> </button>
                    : ''}
                {UserId === row.updatedBy ?
                    <button className='btn btn-primary' style={{ marginLeft: '5px' }} onClick={() => updateQuestion(row.questionId, row.question, row.questionType, row.mandatory, row.optionsMasters)}><i class="fas fa-edit"></i> </button>
                    :
                    <></>
                }
            </div>
        }

    ]


    const coloumnfeedbackQuestion1 = [
        {
            name: "Question",
            selector: row => row.question,
            sortable: true,
            width: '250px',
            wrap: true,

        },
        {
            name: "Question Type",
            selector: (row) => <>
                {
                    row.questionType === 'SC' ? "Single Choice" : row.questionType === 'MC' ? 'Multiple Choice' : row.questionType === "TF" ? "True and False" : row.questionType === 'TA' ? 'Description' : ''
                }
            </>,
            sortable: true,
            width: '200px',
            wrap: true
        },
        {
            name: "Question Mandatory",
            selector: row => row.mandatory,
            sortable: true,
            width: '250px',
            wrap: true
        },
        {
            name: "Option",
            selector: row => row.optionsMasters.map((d, i) => <ol>
                <li>{i + 1}.{d.optionText}</li>
            </ol>),
            sortable: true,
            width: '150px',
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

    ///////////////     Feedback List Start     ////////////////

    useEffect(() => {
        getFeedbackList();
    }, [])
    
    const courseId = 1;
    const [feedbackListData, setFeedbackListData] = useState();
    const getFeedbackList = () => {
        service.getGeneralFeedbackListById(courseId).then((resp) => {
            setFeedbackListData(resp.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const closeCreateFeedback = () => {

        setfeedbackData({
            ...feedbackData,
            feedback_title: "",
            feedbacktitledesc: "",
            feedbacktitledescError: "",
            feedbacktitleError: "",
        })

        setShowAddFeedback(false)
    }

    const setActiveInactive = (id) => {
        service.setActiveInactive(id).then((resp) => {
            if (resp.data === "active") {
                swal(t('success'), "", "success");
                getFeedbackList();
            }
            else if (resp.data === "inactive") {
                swal(t('success'), "", "success");
                getFeedbackList();
            }
        })
    }


    const FeedbackList = [
        {
            name: "S No.",
            selector: (row, index) => index + 1,
        },
        {
            name: "Title",
            selector: (row) => row.feedbackTitle,
        },
        {
            name: "Description",
            selector: (row) => row.description,
        },
        {
            name: "Status",
            selector: (row) => row.status,

        },
        {
            name: "Action",
            selector: row =>
                <>
                    {
                        row.status === 'active' ?
                            <>
                                <Button onClick={() => { setActiveInactive(row.feedbackId) }} className="btn btn-danger pull-left m-2 w-10">{t('deactivate_feedback')}</Button>
                            </>
                            :
                            <>
                                <Button onClick={() => { setActiveInactive(row.feedbackId) }} className="btn btn-success pull-left m-2 w-10">{t('activate_feedback')}</Button>
                            </>
                    }
                </>

        },
    ];




    //////////////     Feedback list end    /////////////////

    /* this code is for  feedback question handle submit */

    return (
        <div className="container-scroller">
            <Navbar />
            <StickyMenu />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div>
                            <div className="page-header">
                                <h3 className="page-title">
                                    {t('feedback')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('feedback')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('add_master_feedback')}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <Tab.Container defaultActiveKey="second">
                            <Nav variant="pills" className='ml-3'>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">{t('add_question')}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="first">{t('manage_feedBack')}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">{t('view_feedback')}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <br></br>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div class="shadow-lg p-3 bg-body rounded">
                                        <Card>
                                            <DataTable
                                                columns={FeedbackList}
                                                data={feedbackListData}
                                                // defaultSortField="Name"
                                                // defaultSortAsc={true}
                                                striped
                                                highlightOnHover
                                                customStyles={customStyles}
                                                subHeader
                                                subHeaderComponent={subHeaderComponent}
                                                fixedHeader
                                                fixedHeaderScrollHeight="300px"
                                                // selectableRows
                                                // onSelectedRowsChange={questionRowSelected}
                                                pagination
                                            />
                                            <div className="d-flex justify-content-center">
                                                    <Button onClick={() => setShowAddFeedback(true)} className="btn btn-primary m-2 w-10">{t('create_new_feedback')}</Button>
                                            </div>
                                        </Card>
                                    </div>
                                    <br />
                                    {
                                        showAddFeedback ?
                                            <>
                                                <div class="shadow-lg p-3 bg-body rounded">
                                                    <form onSubmit={(e) => feedbackhandleSubmit(e)} autoComplete="off">
                                                        <div className="form-group">
                                                            <label className="mb-0">{t('feedback_title')}<span className="text-danger">*</span></label>
                                                            <input name="feedback_title" type="text" minLength={5} maxLength={50} value={feedbackData.feedback_title} className="form-control" placeholder={t('enter_feedback_title')} onChange={(e) => setfeedbackData({ ...feedbackData, feedback_title: e.target.value })}
                                                            />
                                                            {feedbackData.feedbacktitleError
                                                                ? <div className="alert alert-danger mt-2">{feedbackData.feedbacktitleError}</div>
                                                                : ''
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="mb-0">{t('feedback_description')}<span className="text-danger">*</span></label>
                                                            <textarea name="feedback_desc" type="text" minLength={5} maxLength={1500} value={feedbackData.feedbacktitledesc} className="form-control" placeholder={t('enter_feedback_description')} onChange={(e) => setfeedbackData({ ...feedbackData, feedbacktitledesc: e.target.value })}
                                                            />
                                                            {feedbackData.feedbacktitledescError
                                                                ? <div className="alert alert-danger mt-2">{feedbackData.feedbacktitledescError}</div>
                                                                : ''
                                                            }
                                                        </div>

                                                        <div class="shadow-lg p-3 bg-body rounded">
                                                            <Card>
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
                                                                <Row style={{ marginBottom: '15px', marginLeft: '2px', marginTop: '-40px' }}>
                                                                    <Col>
                                                                        {/* <Button onClick={() => AddQuestionInCourse()}>Add Feeddback Question</Button> */}
                                                                        {
                                                                            questionIds.length == 0
                                                                                ?
                                                                                <>
                                                                                    <Button disabled className="btn btn-primary pull-left m-2 w-10">{t('add_feedback_question')}</Button>
                                                                                    <Button onClick={() => { closeCreateFeedback() }} className="btn btn-danger pull-left m-2 w-10">{t('cancel')}</Button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <Button type="submit" className="btn btn-primary pull-left m-2 w-10">{t('add_feedback_question')}</Button>
                                                                                    <Button onClick={() => { closeCreateFeedback() }} className="btn btn-danger pull-left m-2 w-10">{t('cancel')}</Button>
                                                                                </>
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </Card>
                                                        </div>
                                                    </form>
                                                </div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {/* {
                                        showCreateQuestion === true ? */}
                                    <>
                                        <div class="shadow-lg p-3 bg-body rounded">
                                            <Card style={{ padding: "15px" }}>
                                                <form onSubmit={(e) => questionhandleSubmit(e)} autoComplete="off">
                                                    <div className="form-group">
                                                        <label className="mb-0">{t('question')}<span className="text-danger">*</span></label>
                                                        <input name="feedback_title" type="text" minLength={5} maxLength={50} value={questionData.question} className="form-control" placeholder={t('enter_feedback_title')} onChange={(e) => setquestionData({ ...questionData, question: e.target.value })}
                                                        />
                                                        {
                                                            questionData.question == '' || questionData.question == undefined || questionData.questionError !== ''
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
                                                        <label className="mb-0" >{t('question_mandatory')}<span className="text-danger">*</span></label>
                                                        <div id='mandatory' >
                                                            <div class="form-check" value="Yes">
                                                                <input class="form-check-input" type="radio" value="true" name="flexRadioDefault" id="flexRadioDefault1"
                                                                    onChange={(e) => setquestionData({ ...questionData, mandatory: e.target.value })} />
                                                                <label class="form-check-label" for="flexRadioDefault1" >
                                                                    {t('yes')}
                                                                </label>
                                                            </div>
                                                            <div class="form-check" value='No'>
                                                                <input class="form-check-input" type="radio" value="false" name="flexRadioDefault" id="flexRadioDefault2"
                                                                    onChange={(e) => setquestionData({ ...questionData, mandatory: e.target.value })} />
                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                    {t('no')}
                                                                </label>
                                                            </div>
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

                                                        <select className="form-control" id='option' onChange={(e) => setquestionData({ ...questionData, questionType: e.target.value })} aria-label="Default select example">
                                                            <option selected value='SO'>{t('select_option')}</option>
                                                            <option value="SC">{t('single_choice')}</option>
                                                            <option value="MC">{t('multiple_choice')}</option>
                                                            <option value="TF">{t('true_and_false')}</option>
                                                            <option value="TA" >{t('descriptive')}</option>
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
                                                    <div>
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
                                                    </div>
                                                    <Row>
                                                        <div>
                                                            <Button type="submit" className="btn btn-primary pull-left ml-2 mr-2 w-10">{questionData.questionId ? t('update') : t('add')}</Button>
                                                            {
                                                                questionData.questionId
                                                                    ?
                                                                    <></>
                                                                    :
                                                                    < Button type="reset" onClick={() => feedbackQuestionReset()} className="btn btn-primary w-10">{t('reset')}</Button>
                                                            }
                                                        </div>
                                                        {/* <Button onClick={() => { onClickCloseButton() }} className="btn btn-danger pull-left ml-2 w-10">Close</Button> */}

                                                    </Row>
                                                </form>
                                            </Card>
                                        </div>
                                    </>
                                    {/* :
                                            <></>
                                        } */}
                                    <br />

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
                                        </Card>
                                        {/* <br />
                                        <Button onClick={() => { onClickCreateQuestion() }}>Create Question</Button> */}
                                    </div>

                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <Accordion defaultActiveKey="0">
                                        {getFeedbackResponse.length == 0 ? <p>{t('response_condition')}</p> :
                                            <>
                                                {getFeedbackResponse.map((data, i) =>
                                                    <Accordion.Item eventKey={i}>
                                                        <Accordion.Header>{i + 1}.  {data.feedbackTitle}</Accordion.Header>
                                                        <Accordion.Body style={{ marginLeft: '25px' }}>
                                                            {
                                                                data.responseMaster.map((a, j) =>
                                                                    <div style={{ margin: '10px', padding: '10px' }}>
                                                                        {j + 1}.{a.questionMaster.question} {a.questionMaster.questionType == "TF" || a.questionMaster.questionType == "TA"
                                                                            ?
                                                                            <ul style={{ listStyleType: 'none', marginLeft: '10px' }}>
                                                                                <li>Ans. {a.feedbackResponse}</li>
                                                                            </ul>
                                                                            :
                                                                            ''
                                                                        }
                                                                        {
                                                                            a.questionMaster.optionsMasters.map((d, k) =>
                                                                                <ul style={{ listStyleType: 'none', marginLeft: '10px' }}>
                                                                                    <li>
                                                                                        {k + 1}.  {d.optionText} {feedbackResponseCheckHandler(a.feedbackResponse).includes(d.optionId)
                                                                                            ?
                                                                                            <i class="fa fa-check" style={{ color: 'green' }} aria-hidden="true"></i>
                                                                                            :
                                                                                            ''
                                                                                        }
                                                                                    </li>
                                                                                </ul>)
                                                                        }
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
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div >
    );
}

export default GeneralFeedbackMaster;