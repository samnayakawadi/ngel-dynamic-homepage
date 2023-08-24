import { assign } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, CloseButton, Col, Container, Modal, OverlayTrigger, ProgressBar, Row, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
//import DateTimePicker from 'react-datetime-picker';

import { setDefaults } from 'react-i18next';
import { Step } from 'react-step-progress-bar';
import swal from 'sweetalert';
import { BreadcrumbBox } from '../../../../components/common/Breadcrumb';
import AssignmentService, { getFileToView, getSolutionFile } from '../../../../services/AssignmentService';
import instructorService from '../../../../services/instructorService';

import UserService from '../../../../services/UserService';
import FilterDataTable from '../../FilterDataTable';
// import AssignStep1 from './AssignStep1';
// import AssignStep2 from './AssignStep2';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import md5 from 'md5';


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






function FrontAssignment(props) {
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


    const userID = props.userID;
    const courseID = props.courseID;
    const tenantID = props.tenantID;

    //console.log("courseID", courseID)
    /*********************************** MAIN FRONT COMPONENT ************************/
    const [comp, setComp] = useState(<ViewAssignment />);
    //const [comp, setComp] = useState(<EvaluationMarks />);
    return (
        <>
            {comp}
        </>
    );

    /*********************************** VIEW ASSIGNMENT ***********************************/
    function ViewAssignment(props) {
        const currentLanguageCode = cookies.get('i18next') || 'en'
        const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
        const { t } = useTranslation()

        useEffect(() => {
            document.body.dir = currentLanguage.dir || 'ltr'
            document.title = t('app_title')
        }, [currentLanguage, t])

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

        useEffect(() => {
            assignmentListAPI();
        }, [])
        const assignmentListAPI = async () => {
            try {
                let result = await AssignmentService.getAssignDetail(UserService.getUserid(), courseID, tenantID)
                ////console.log(result.data);
                setAssignmentList(result.data);
            } catch (error) {
                //console.log(error);
            }
        }

        const [getAssignmentList, setAssignmentList] = useState([]);
        const [filterText, setFilterText] = useState('');
        const [resetPaginationToggle, setResetPaginationToggle] = useState(
            false
        );

        const filteredAssignmentList = getAssignmentList.filter(
            item =>
                item.name.toLowerCase()
                    .indexOf(filterText.toLowerCase()) !== -1
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




        const deleteAssign = (assignID) => {
            AssignmentService.deleteAssignment(assignID).then(resp => {
                if (resp.status == 200) {
                    swal(t('deleted'), t('assignment_delete'), "success");
                    assignmentListAPI();
                }
            }).catch(error => {
                //console.log(error)
            })
        }

        const uploadFile = (assignID) => {
            setComp(
                <AssignStep2
                    uploadFileClick={true}
                    steps={2}
                    assignID={assignID}
                    courseID={courseID}
                    tenantID={tenantID}
                />
            )
        }
        function onClickEvaluationButton(courseID, tenantID, assignID) {
            setComp(
                <>
                    <Evaluation
                        courseID={courseID}
                        tenantID={tenantID}
                        assignID={assignID}
                    />
                </>
            )
        }
        function onClickEdit(assignID, name, totalMarks, passMark, description, openingDate, closingDate) {

            setComp(
                <CreateAssignment
                    updateAssignment={true}
                    assignID={assignID}
                    name={name}
                    totalMarks={totalMarks}
                    passMarks={passMark}
                    description={description}
                    openDate={openingDate}
                    closeDate={closingDate}
                    courseID={courseID}
                    tenantID={tenantID}
                />
            )

        }

        const columnViewAssignment = [
            {
                name: 'Assignment Name',
                selector: row => row.name,
                sortable: true,
                wrap: true,
                width: '200px',
            },
            {
                name: 'Description',
                selector: row => row.description,
                wrap: true
            },
            {
                name: 'Total Marks',
                selector: row => row.totalMarks,
                wrap: true,
                width: '130px',
            },
            {
                name: 'Passing Marks',
                selector: row => row.passMarks,
                wrap: true,
                width: '150px',
            },
            {
                name: "Opening Date",
                selector: row => moment(row.openingDate).format('DD-MM-yyyy'),
                // selector: row => moment(row.openingDate).format('MM-DD-YYYY'),
                wrap: true,
                width: '150px',
            },
            {
                name: 'Closing Date',
                selector: row => moment(row.closingDate).format('DD-MM-yyyy'),
                // selector: row => moment(row.closingDate).format('MM-DD-YYYY'),
                wrap: true,
                width: '150px',
            },
            {
                name: 'Action',
                width: '200px',
                cell: row => <>
                    <div>
                        {UserService.getUserid() === row.createdBy
                            ?
                            <>
                                {/* {//console.log('Check-----', row.assignmentFilePath.length)} */}
                                {/* <button className='btn btn-primary' style={{ marginRight: '5px' }} onClick={() => { onClickEdit(row.assignment_id, row.name, row.totalMarks, row.passMarks, row.description, row.openingDate, row.closingDate) }} ><i class="fas fa-edit"></i> </button> */}
                                {
                                    row.assignmentFilePath.length > 0 ?
                                        <>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('edit_assign')}</Tooltip>}>
                                                <button className='btn btn-primary' style={{ marginRight: '5px' }} onClick={() => { onClickEdit(row.assignment_id, row.name, row.totalMarks, row.passMarks, row.description, row.openingDate, row.closingDate) }} ><i class="fas fa-edit"></i> </button>
                                            </OverlayTrigger>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('upload_file')}</Tooltip>}>
                                                <button className='btn btn-primary' onClick={() => { uploadFile(row.assignment_id) }} style={{ marginRight: '5px' }} ><i class="fas fa-upload"></i> </button>
                                            </OverlayTrigger>
                                        </>
                                        :
                                        <>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('upload_file')}</Tooltip>}>
                                                <button className='btn btn-primary' onClick={() => { uploadFile(row.assignment_id) }} style={{ marginRight: '5px' }} ><i class="fas fa-upload"></i> </button>
                                            </OverlayTrigger>
                                        </>
                                }
                                {/* {
                                    !row.assignmentFilePath
                                        ?
                                        <>

                                        </>
                                        :
                                        <>
                                        </>
                                } */}
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('evaluate_assign')}</Tooltip>}>
                                    <button className='btn btn-primary' onClick={() => { onClickEvaluationButton(courseID, tenantID, row.assignment_id) }} style={{ marginRight: '5px' }} ><i class="fas fa-book-open"></i> </button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('delete_assign')}</Tooltip>}>
                                    <button className='btn btn-danger' onClick={() => { deleteAssign(row.assignment_id) }} ><i class="fas fa-trash"></i> </button>
                                </OverlayTrigger>
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                </>
            }
        ]

        const onClickCreateAssign = () => {
            setComp(
                <CreateAssignment />)
        }

        return (
            <>

                <div>
                    <Button type="submit" onClick={onClickCreateAssign} className="btn btn-success btn-lg" > {t('create_assign')}</Button>
                    <br></br>
                    <br></br>
                </div>
                <div>
                    <h5>{t('assign_list')}</h5>
                    <br />
                    <Card>
                        <DataTable
                            columns={columnViewAssignment}
                            data={filteredAssignmentList}
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
                </div>
            </>
        )
    }

    /***********************************   Creating Assignment Function ******************************/

    /*****PARENT COMPONENT OF AssignStep1 and AssignStep2 */
    function CreateAssignment(props) {
        const currentLanguageCode = cookies.get('i18next') || 'en'
        const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
        const { t } = useTranslation()

        useEffect(() => {
            document.body.dir = currentLanguage.dir || 'ltr'
            document.title = t('app_title')
        }, [currentLanguage, t])

        const assignID = props.assignID
        const onClickClose = () => {
            setComp(<ViewAssignment />)
        }
        const [getServerTime, setServerTime] = useState();
        const [swalMsg, setSwalMsg] = useState(t('assign_data_msg'))

        useEffect(() => {

            instructorService.getServerTime()
                .then(res => {
                    let serTime = res.data;
                    setServerTime(serTime);
                    setServerTime(serTime.replace(/\s/g, 'T'));
                    // var arr = serTime.split(" ");
                    // setDateTime(arr);
                })
            if (props.assignID) {
                setAssignmentData({
                    steps: 1,
                    updateAssignment: props.updateAssignment,
                    name: props.name,
                    totalMarks: props.totalMarks,
                    passMarks: props.passMarks,
                    description: props.description,
                    openDate: props.openDate,
                    closeDate: props.closeDate,
                    assignID: props.assignID,
                })
                setSwalMsg(t('assign_update_msg'))
                setSuccessMsg(t('success'))
                setDefaultDate({
                    ...defaultDate,
                    defaultOpeningDate: props.openDate,
                    defaultClosingDate: props.closeDate,
                })
            }
        }, [])

        const [defaultDate, setDefaultDate] = useState({
            defaultOpeningDate: '',
            defaultClosingDate: ''
        });


        const [successMsg, setSuccessMsg] = useState();
        const [assignmentData, setAssignmentData] = useState({
            steps: 1,//steps: 1,
            updateAssignment: '',
            name: '',
            totalMarks: '',
            passMarks: '',
            description: '',
            openDate: '',
            closeDate: '',
            assignID: '',// assignID: undefined,
        })

        const handleChange = (event) => {
            setAssignmentData({
                ...assignmentData, [event.target.name]: event.target.value
            })
        }

        const [assignFormError, setAssignFormError] = useState({
            nameError: '',
            totalMarksError: '',
            passMarksError: '',
            descriptionError: '',
            openDateError: '',
            openTimeError: '',
            closeDateError: '',
            closeTimeError: '',
        })




        function assignmentFormValidate() {

            ////console.log(assignmentData)
            let nameE = '';
            let totalMarksE = '';
            let passMarksE = '';
            let descriptionE = '';
            let openDateE = '';
            let closeDateE = '';

            if (assignmentData.name == '') {
                nameE = t('assign_name_req')
            } else if (assignmentData.name.match(/[A-Za-z0-9&., ]+$/)) {
                nameE = '';
            } else if (assignmentData.name.length > 20) {
                nameE = t('name_less_than_20');
            } else if (assignmentData.name.length < 5) {
                nameE =t('name_greter_than_5');
            } else {
                nameE = t('alpha_digit_space_allowed');
            }


            if (assignmentData.passMarks == '') {
                passMarksE = t('passing_mark_req')
            }
            if (parseInt(assignmentData.passMarks) > parseInt(assignmentData.totalMarks)) {
                passMarksE = t('not_greater_than_total')
            }
            if (parseInt(assignmentData.passMarks) < 0) {
                passMarksE = t('not_negative')
            }
            if (parseInt(assignmentData.totalMarks) < 0) {
                totalMarksE = t('not_negative')
            }
            if (assignmentData.totalMarks == '') {
                totalMarksE = t('total_mark_req')
            }
            if (assignmentData.description == '') {
                descriptionE = t('assign_desc_require')
            } else if (assignmentData.description.match(/[A-Za-z0-9&., ]+$/)) {
                nameE = '';
            } else if (assignmentData.description.length > 50) {
                nameE = t('description_less_than_50');
            } else if (assignmentData.description.length < 10) {
                nameE = t('description_greater_than_10');
            } else {
                nameE = t('alpha_digit_space_allowed');
            }


            if (assignmentData.openDate == '') {
                openDateE = t('open_date_req')
            }

            if (assignmentData.closeDate == '') {
                closeDateE = t('close_date_req')
            }

            if (assignmentData.updateAssignment) {
                if (defaultDate.defaultOpeningDate) {
                    //const openDateTime = assignmentData.openDate;
                    const defOpenDate = new Date(defaultDate.defaultOpeningDate).getTime();
                    const openingAssignDate = new Date(assignmentData.openDate).getTime();
                    if (openingAssignDate < defOpenDate) {
                        openDateE = t('not_greater_opening_date')
                    }
                }
            }
            else {
                const serv = new Date(getServerTime).getTime();
                const openingAssignDate = new Date(assignmentData.openDate).getTime();
                if (openingAssignDate < serv) {
                    openDateE = t('greater_than_current_time')
                }
            }

            // if (assignmentData.openDate) {
            //     //const openDateTime = assignmentData.openDate;
            //     const serv = new Date(getServerTime).getTime();
            //     const openingAssignDate = new Date(assignmentData.openDate).getTime();
            //     if (openingAssignDate < serv) {
            //         openDateE = "Should Be Greater Than Current Time"
            //     }
            // }

            if (assignmentData.openDate && assignmentData.closeDate) {
                const openDateTime = assignmentData.openDate
                const closeDateTime = assignmentData.closeDate
                const closingAssignDate = new Date(closeDateTime).getTime();
                const openingAssignDate = new Date(openDateTime).getTime();
                if (closingAssignDate < openingAssignDate) {
                    closeDateE = t('opening_date_greater')
                }
            }

            if (nameE !== '' || totalMarksE !== '' || passMarksE !== '' || descriptionE !== '' || openDateE !== '' || closeDateE !== '') {
                setAssignFormError({
                    ...assignFormError,
                    nameError: nameE,
                    totalMarksError: totalMarksE,
                    passMarksError: passMarksE,
                    descriptionError: descriptionE,
                    openDateError: openDateE,
                    closeDateError: closeDateE,
                })
                return false;
            }
            return true
        }

        const onClickNext = () => {
            // dateHandler();

            ////console.log(assignmentData)


            if (assignmentData.updateAssignment) {
                const check = assignmentFormValidate();
                if (check == true) {
                    ////console.log(assignmentData)
                    assignmentDataService();
                }
            }
            else if (assignmentData.assignID) {
                setAssignmentData({
                    ...assignmentData,
                    steps: 2,
                })

            }
            else {
                const check = assignmentFormValidate();
                if (check == true) {
                    assignmentDataService();
                }
            }
        }



        var OpenTime = ''
        var CloseTime = ''
        const assignmentDataService = async () => {

            if (assignmentData.updateAssignment) {

                var openDate, openMonth, openYear, openHour, openMinute, openSecond;
                var openDate1, openMonth1, openYear1, openHour1, openMinute1, openSecond1;
                var closeDate, closeMonth, closeYear, closeHour, closeMinute, closeSecond;
                var closeDate1, closeMonth1, closeYear1, closeHour1, closeMinute1, closeSecond1;
                openDate = new Date(assignmentData.openDate).getDate();
                openMonth = (new Date(assignmentData.openDate).getMonth()) + 1;
                openYear = new Date(assignmentData.openDate).getFullYear();
                openHour = new Date(assignmentData.openDate).getHours();
                openMinute = new Date(assignmentData.openDate).getMinutes();

                closeDate = new Date(assignmentData.closeDate).getDate();
                closeMonth = (new Date(assignmentData.closeDate).getMonth()) + 1;
                closeYear = new Date(assignmentData.closeDate).getFullYear();
                closeHour = new Date(assignmentData.closeDate).getHours();
                closeMinute = new Date(assignmentData.closeDate).getMinutes();

                openDate1 = openDate < 10 ? '0' + openDate : openDate;
                openMonth1 = openMonth < 10 ? '0' + openMonth : openMonth;
                openHour1 = openHour < 10 ? '0' + openHour : openHour;
                openMinute1 = openMinute < 10 ? '0' + openMinute : openMinute;

                closeDate1 = closeDate < 10 ? '0' + closeDate : closeDate;
                closeMonth1 = closeMonth < 10 ? '0' + closeMonth : closeMonth;
                closeHour1 = closeHour < 10 ? '0' + closeHour : closeHour;
                closeMinute1 = closeMinute < 10 ? '0' + openMinute : closeMinute;

                OpenTime = openYear + '-' + openMonth1 + '-' + openDate1 + "%20" + openHour1 + '%3A' + openMinute1 + '%3A00'
                CloseTime = closeYear + '-' + closeMonth1 + '-' + closeDate1 + "%20" + closeHour1 + '%3A' + closeMinute1 + '%3A00'

                ////console.log("OpenTime ---", OpenTime)
                ////console.log("CloseTime ---", CloseTime)

                const assignmentName = assignmentData.name.trim();
                const totalMarks = parseInt(assignmentData.totalMarks)
                const passMarks = parseInt(assignmentData.passMarks)
                const assignmentDescription = assignmentData.description.trim();
                // const openingDateSplit = assignmentData.openDate.split("T");
                // const closingDateSplit = assignmentData.closeDate.split("T");
                // const openingAssignDatereplace = ((assignmentData.openDate.replace("T",'%20')).replace(':','%3A'))+"%3A00";
                // const openingAssignDate = (openingAssignDatereplace.replace(':', '%3A00')).replace(".0",'');
                // const closingAssignDatereplace = ((assignmentData.closeDate.replace('T','%20')).replace(':','%3A'))+"%3A00";
                // OpenTime = openingAssignDatereplace;
                // CloseTime = closingAssignDatereplace;
                // const closingAssignDate = (closingAssignDatereplace.replace(':', '%3A00')).replace(".0",'');
                const instID = UserService.getUserid();
                const courseId = parseInt(courseID)
                //console.log(courseId);
                const tenantId = parseInt(tenantID)
                const assignmentID = assignmentData.assignID

                let date4 = moment(assignmentData.openDate).format();
                let date5 = moment(assignmentData.closeDate).format();
                //console.log("OpenTime", " ", date4)


                let ReqBodyInfo = {
                    assignmentId: assignmentID,
                    name: assignmentName,
                    totalMarks: totalMarks,
                    passMarks: passMarks,
                    description: assignmentDescription,
                    openingDate: date4,
                    closingDate: date5,
                    createdBy: instID,
                    courseId: courseId,
                    tenantId: tenantId
                }
                //console.log("ReqBodyInfo",ReqBodyInfo);

                AssignmentService.updateAssignmentDetail(ReqBodyInfo).then(res => {
                    ////console.log("postAsssss 200 -  ", res);
                    setAssignmentData({
                        ...assignmentData,
                        steps: 2,
                        assignID: assignID,
                    })
                }).catch(err => {
                    ////console.log("postAsssss err -  ", err)
                })
            }
            if (!assignmentData.updateAssignment) {

                // const hours = assignmentData.openTime[0] + assignmentData.openTime[1];
                // const minutes = assignmentData.openTime[3] + assignmentData.openTime[4];
                // const seconds = "00";
                // const finalTime = `${hours}%3A${minutes}%3A${seconds}`
                // const openingAssignDate = assignmentData.openDate + " " + finalTime;
                // const hoursC = assignmentData.closeTime[0] + assignmentData.closeTime[1];
                // const minutesC = assignmentData.closeTime[3] + assignmentData.closeTime[4];
                // const secondsC = "00";
                // const finalTimeC = `${hoursC}%3A${minutesC}%3A${secondsC}`
                // const closingAssignDate = assignmentData.closeDate + " " + finalTimeC;
                // //const closeAD = closingAssignDate.replace(':','%3A');
                // const assignmentName = assignmentData.name.trim();
                // const assignmentDescription = assignmentData.description.trim();
                // const totalMarks = parseInt(assignmentData.totalMarks)
                // const passMarks = parseInt(assignmentData.passMarks)
                // const instID = UserService.getUserid();
                // const courseId = parseInt(props.courseID)
                // const tenantId = parseInt(props.tenantID)
                const assignmentName = assignmentData.name.trim();
                const totalMarks = parseInt(assignmentData.totalMarks)
                const passMarks = parseInt(assignmentData.passMarks)
                const assignmentDescription = assignmentData.description.trim();
                const openingDateSplit = assignmentData.openDate.split("T");
                const closingDateSplit = assignmentData.closeDate.split("T");
                // const openingAssignDate = openingDateSplit[0] + "%20" + openingDateSplit[1] + "%3A00";
                // const closingAssignDate = closingDateSplit[0] + "%20" + closingDateSplit[1] + "%3A00";
                const openingAssignDatereplace = (assignmentData.openDate.replace("T", '%20')) + "%3A00"
                const openingAssignDate = openingAssignDatereplace.replace(':', '%3A00')
                const closingAssignDatereplace = (assignmentData.closeDate.replace('T', '%20')) + "%3A00"
                const closingAssignDate = closingAssignDatereplace.replace(':', '%3A00')

                // const openingAssignDate = assignmentData.openDate + " " + assignmentData.openTime + "%3A00"
                // const openAD1 = openingAssignDate.replace(':', '%3A');
                // const openAD = openAD1.replace(' ', '%20');
                // const closingAssignDate = assignmentData.closeDate + " " + assignmentData.closeTime + "%3A00"
                // const closeAD1 = closingAssignDate.replace(' ', '%20');
                // const closeAD = closeAD1.replace(' ', '%20');
                const instID = UserService.getUserid();
                const courseId = parseInt(courseID)
                const tenantId = parseInt(tenantID)
                // //console.log(courseId, "***********", tenantId)
                let date4 = moment(assignmentData.openDate).format();
                let date5 = moment(assignmentData.closeDate).format();


                let ReqBodyInfoSave = {
                    name: assignmentName,
                    totalMarks: totalMarks,
                    passMarks: passMarks,
                    description: assignmentDescription,
                    openingDate: date4,
                    closingDate: date5,
                    createdBy: instID,
                    courseId: courseId,
                    tenantId: tenantId
                }

                //console.log("ReqBodyInfoSave",ReqBodyInfoSave);

                AssignmentService.postAssignmentDetail(ReqBodyInfoSave).then(res => {
                    ////console.log("postAsssss 200 -  ", res);
                    setAssignmentData({
                        ...assignmentData,
                        steps: 2,
                        assignID: res.data
                    })
                }).catch(err => {
                    ////console.log("postAsssss err -  ", err)
                })
            }
        }
        const onClickSubmit = () => {
            if (successMsg) {
                swal(t('success_swal'), swalMsg, 'success');
                setComp(
                    <>
                        <ViewAssignment />
                    </>
                )
            }
        }

        const onClickPrev = () => {
            setAssignmentData({
                ...assignmentData, steps: 1
            })
        }

        return (
            <>
                <div>
                    {/* {//console.log(getServerTime)} */}
                    <h5>{t('create_assign')}</h5>
                </div>

                <div>
                    <Row style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 1px' }}>
                        <p>{t('fill_all_form')}</p>
                        <Button className='btn btn-danger' style={{ textAlign: 'right' }} onClick={onClickClose}> X </Button>
                    </Row>
                </div>
                <br />
                <Container>
                    <form>
                        {/*Assignment step 1 Component is Called */}
                        <AssignStep1
                            steps={assignmentData.steps}
                            name={assignmentData.name}
                            totalMarks={assignmentData.totalMarks}
                            passMarks={assignmentData.passMarks}
                            description={assignmentData.description}
                            openDate={assignmentData.openDate}
                            //openTime={assignmentData.openTime}
                            closeDate={assignmentData.closeDate}
                            //closeTime={assignmentData.closeTime}                            
                            handleChange={handleChange}
                            assignmentFormError={assignFormError}
                            assignID={assignID}
                        />
                        {/*Assignment step 2 Component is Called */}
                        <AssignStep2
                            steps={assignmentData.steps}
                            assignID={assignmentData.assignID}
                            setState={setSuccessMsg}
                        />
                        <br />
                        <div class="row justify-content-between">
                            {
                                assignmentData.steps == 2
                                    ?
                                    <>
                                        <Row style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 1px' }}>
                                            <Button onClick={onClickPrev} style={{ marginRight: "5px" }}> {t('prev')} </Button>
                                            <Button onClick={onClickSubmit} > {t('submit')} </Button>
                                        </Row>
                                    </>
                                    :
                                    <>
                                        <Button onClick={onClickNext}>{t('next')} </Button>
                                    </>
                            }

                        </div>
                    </form>
                </Container>
            </>
        )
    }
    ////Assignment Step 1
    function AssignStep1(props) {

        const [getServerTime, setServerTime] = useState();
        useEffect(() => {
            instructorService.getServerTime()
                .then(res => {
                    let serTime = res.data;
                    setServerTime(serTime.replace(/\s/g, 'T'))
                })
        }, [])
        if (props.steps !== 1) {
            return null;
        }
        else {

            return (
                <>
                    <fieldset>
                        <div className='row'>
                            <p class="control-label">{t('assignment_name')}</p>
                            <input type='text' className="form-control" placeholder={t('enter_assign_name')} name='name' value={props.name} onChange={props.handleChange} />
                            {
                                props.assignmentFormError.nameError
                                    ?
                                    <>
                                        <div className="alert alert-danger mt-2">{props.assignmentFormError.nameError}</div>
                                    </>
                                    :
                                    <>
                                    </>
                            }

                        </div>
                        <br />
                        <div class="row justify-content-between">
                            <div class="row col-4 ">
                                <div>
                                    <p class="control-label">{t('total_marks')}</p>
                                    <input type='number' className="form-control" min={0} pattern="^[0-9]" placeholder={t('enter_total_marks')} name='totalMarks' value={props.totalMarks} onChange={props.handleChange} />
                                    {
                                        props.assignmentFormError.totalMarksError
                                            ?
                                            <>
                                                <div className="alert alert-danger mt-2">{props.assignmentFormError.totalMarksError}</div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </div>
                            <div class="row col-4">
                                <div>
                                    <p class="control-label">{t('pass_marks')}</p>
                                    <input type='number' className="form-control" min={0} pattern="^[0-9]" placeholder={t('enter_passing_marks')} name='passMarks' value={props.passMarks} onChange={props.handleChange} />
                                    {
                                        props.assignmentFormError.passMarksError
                                            ?
                                            <>
                                                <div className="alert alert-danger mt-2">{props.assignmentFormError.passMarksError}</div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <p class="control-label">{t('assign_desc')}</p>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                name='description' value={props.description} onChange={props.handleChange}></textarea>
                            {
                                props.assignmentFormError.descriptionError
                                    ?
                                    <>
                                        <div className="alert alert-danger mt-2">{props.assignmentFormError.descriptionError}</div>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>
                        <br />
                        <div class="row justify-content-between">
                            <div class="col col-4 ">
                                <div>
                                    <p class="control-label">{t('opening_date')}</p>



                                    <input type='datetime-local' className="form-control" name='openDate' value={props.openDate} onChange={props.handleChange} />
                                    {
                                        props.assignmentFormError.openDateError
                                            ?
                                            <>
                                                <div className="alert alert-danger mt-2">{props.assignmentFormError.openDateError}</div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </div>
                            <div class="col col-4 ">
                                <div>
                                    <p class="control-label">{t('close_date')}</p>
                                    <input type='datetime-local' className="form-control" name='closeDate' value={props.closeDate} onChange={props.handleChange} />
                                    {
                                        props.assignmentFormError.closeDateError
                                            ?
                                            <>
                                                <div className="alert alert-danger mt-2">{props.assignmentFormError.closeDateError}</div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                        <br />
                        {/* <div class="row justify-content-between">
                            <div class="col col-4">
                                <div>
                                    <p class="control-label">Opening Time</p>
                                    <input type='time' className="form-control" name='openTime' value={props.openTime} onChange={props.handleChange} />
                                    {
                                        props.assignmentFormError.openTimeError
                                            ?
                                            <>
                                                <div className="alert alert-danger mt-2">{props.assignmentFormError.openTimeError}</div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </div>
                            <div class="col col-4">
                                <div>
                                    <p class="control-label">Closing Time</p>
                                    <input type='time' className="form-control" name='closeTime' value={props.closeTime} onChange={props.handleChange} />
                                    {
                                        props.assignmentFormError.closeTimeError
                                            ?
                                            <>
                                                <div className="alert alert-danger mt-2">{props.assignmentFormError.closeTimeError}</div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </div>
                        </div> */}

                        {/* <input type='calendar' className="form-control" name='closeDate' value={props.closeDate} onChange={props.handleChange} /> */}
                    </fieldset>
                </>
            )
        }
    }



    ////Assignment Step 2 
    function AssignStep2(props) {
        const assignid = props.assignID;

        useEffect(() => {
            getAssignDetailById();
            ////console.log(assignid);
        }, [assignid])

        const [storeAssignDataById, setStoreAssignDataById] = useState();
        const getAssignDetailById = () => {
            AssignmentService.getAssignmentData(assignid).
                then((resp) => {
                    setStoreAssignDataById(resp.data.assignmentFilePath);
                    ////console.log(resp.data.assignmentFilePath)
                }).catch((err) => {
                    //console.log(err);
                })
        }

        const [errorType, setErrorType] = useState();
        const [uploadFileCheck, setUploadFileCheck] = useState(false);
        const [selectedFiles, setSelectedFiles] = useState([])
        const selectFiles = (event) => {
            // event.preventDefault();
            // let fi = document.getElementById('file');
            let files = event.target.files;
            ////console.log("Selected Files : ", files)
            for (let i = 0; i < files.length; i++) {
                ////console.log(files[i].type)
                if (files[i].type != "application/pdf" && files[i].type != "application/x-zip-compressed" && files[i].type != "application/msword" && files[i].type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    setErrorType(t('assign_upload_err'));
                    return;
                }
                else {
                    setUploadFileCheck(true)
                    setErrorType();
                    setSelectedFiles(files)
                }
            }
        }
        const onClickupload = (e) => {

            e.preventDefault()

            if (uploadFileCheck == true) {

                for (let index = 0; index < selectedFiles.length; index++) {
                    const form = new FormData();
                    form.append('file', selectedFiles[index]);
                    form.append('lengthHash', md5((selectedFiles[index].size).toString()))
                    //console.log(selectedFiles[index].size);
                    //console.log("FrontEND   =  ",md5((selectedFiles[index].size).toString()));
                    AssignmentService.postFileUpload(props.assignID, form).then((res) => {




                        if (res.data === "InvalidFile") {
                            swal(t('error'), t('file_not_support'), "error");
                        }
                        else if (res.data === "double-extension-file") {
                            swal(t('error'), t('double-ext-file'), "error");
                        }
                        else {
                            swal(t('success'), t('file_upload_msg'), 'success');
                            getAssignDetailById();
                            document.getElementById('file').value = null;
                            props.setState("Success");
                        }


                    }).catch((error) => {
                        // if(error.response.status === 406){
                        //     swal(t('error'),"File Not Supported","error");
                        // }
                        //console.log(error);
                    })
                }

                // document.getElementById('form').addEventListener('submit', function (e) {
                //     // e.preventDefault();

                //     // let fi = document.getElementById('file');
                //     // let files = fi.files;

                // })
            }
            else {
                //console.log("Error")
            }
        }


        /*This is For when instructor Click upload Button from Assignment List passes */
        /*uploadFileClick={true}
        steps={2}
        assignID={assignID}
        courseID={props.courseID}
        tenantID={props.tenantID} Line No 129  */

        const onClickBack = () => {
            setComp(<ViewAssignment />)
        }



        // useEffect(() => {
        //     listAssignmentFileFunction();
        // }, [])
        // const [listFileAssignment, setListFileAssignment] = useState([]);
        // const listAssignmentFileFunction = () => {
        //     AssignmentService.getAssignDetail(props.userID , props.courseID , props.tenantID)
        //     .then((resp)=>{
        //         setListFileAssignment(resp.data)
        //     }).catch((err)=>{
        //         //console.log(err);
        //     })
        //     if(listFileAssignment)
        //     {
        //         //console.log(listFileAssignment);
        //     }
        // }
        // const [filterText, setFilterText] = React.useState("");
        // const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        //     false
        // );
        // const filteredAssignmentFile = listFileAssignment.filter(
        //     item =>
        //         JSON.stringify(item)
        //             .toLowerCase()
        //             .indexOf(filterText.toLowerCase()) !== -1
        // );
        // const subHeaderComponent = useMemo(() => {
        //     const handleClear = () => {
        //         if (filterText) {
        //             setResetPaginationToggle(!resetPaginationToggle);
        //             setFilterText("");
        //         }
        //     };

        //     return (
        //         <FilterDataTable
        //             onFilter={e => setFilterText(e.target.value)}
        //             onClear={handleClear}
        //             filterText={filterText}
        //         />
        //     );
        // }, [filterText, resetPaginationToggle]);

        const [dispModel, setDispModal] = useState(false)
        const onHideClick = () => {
            setDispModal(false);
        }
        const [contentType, setContentType] = useState();
        const [file, setFile] = useState();
        const onClickView = (id) => {

            setFile(id);
            setDispModal(true)

        }
        const onClickDeleteFile = (id) => {
            AssignmentService.fileOnDelete(id).
                then((resp) => {
                    if (resp.status === 200) {
                        swal(t('success'), t('file_delete_msg'), 'success');
                        getAssignDetailById();
                        props.setState("Success");
                    }
                }).catch((err) => {
                    //console.log(err);
                })
        }
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

        const fileUploadColumn = [
            {
                name: 'File Name',
                selector: row => row.filename,
            },
            {
                name: "Preview",
                cell: (row) =>
                    <>
                        <a className='link' href="#" onClick={() => { onClickView(row.id) }}>
                            {
                                row.filename.match(".zip")
                                    ?
                                    <>
                                        {setContentType(".zip")}
                                        <a href={`${getFileToView}${row.id}`}  ><i class="fas fa-file-archive" style={{ fontSize: "35px", color: "#fdbf00" }}></i></a>
                                    </>

                                    :
                                    row.filename.match(".pdf")
                                        ?
                                        <>
                                            {setContentType(".pdf")}
                                            <a href={`${getFileToView}${row.id}`} >
                                                <i class="fas fa-file-pdf" style={{ fontSize: "35px", color: "#b30b00" }}></i>
                                            </a>

                                        </>
                                        :
                                        row.filename.match(".doc") ||
                                            row.filename.match(".docx")
                                            ?
                                            <>
                                                {setContentType(".doc")}
                                                <a href={`${getFileToView}${row.id}`} target="_blank">
                                                    <i class="fas fa-file-word" style={{ fontSize: "35px", color: "#2596be" }}></i>
                                                </a>

                                            </>

                                            :
                                            <></>
                            }
                        </a>
                    </>
            },
            {
                name: 'Delete',
                selector: row =>
                    <>
                        <Button className='btn btn-danger' onClick={() => { onClickDeleteFile(row.id) }}> X </Button>
                    </>


            }
        ]

        if (props.steps !== 2) {
            return null;
        }
        else {

            return (
                <>
                    {/* {//console.log(assignid)} */}

                    <div>
                        <h4 class="control-label" style={{ textAlign: 'center' }}> {t('upload_file')}</h4>
                        <p class="control-label" style={{ textAlign: 'center' }}>{t('file_pdf_doc_zip')}</p>
                        <br />
                        <form id='form'>
                            <div className='row'>
                                <div className='col-md-6 offset-md-3'>
                                    <input type='file' id='file' onChange={selectFiles} />
                                    {/* <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="file"
                                        aria-describedby="inputGroupFileAddon01"
                                        onChange={selectFiles} />
                                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div> */}
                                </div>
                                <button class="btn btn-primary" onClick={onClickupload} > {t('upload_file')}</button>
                            </div>
                            <div>
                                {errorType ? <div className="alert alert-danger mt-2">{errorType}</div> : <></>}
                            </div>
                        </form>
                        {
                            <>



                                {/* <div>
                                    {
                                        props.uploadFileClick == true ?
                                            <>
                                                <div>
                                                    <DataTable
                                                        columns={fileUploadColumn}
                                                        data={filteredAssignmentFile}
                                                        defaultSortField="Name"
                                                        defaultSortAsc={true}
                                                        striped
                                                        pagination
                                                        highlightOnHover
                                                        //customStyles={customStyles}
                                                        subHeader
                                                        subHeaderComponent={subHeaderComponent}
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="300px"
                                                    />
                                                </div> 
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div> */}
                            </>
                        }
                    </div>
                    <br />
                    <br />
                    <div>
                        <DataTable
                            columns={fileUploadColumn}
                            data={storeAssignDataById}
                            customStyles={customStyles}
                        />
                    </div>
                    <br />
                    {
                        props.uploadFileClick == true
                            ?
                            <>
                                <Button onClick={onClickBack} style={{ marginRight: "5px" }}> {t('back')} </Button>
                            </>
                            :
                            <>
                            </>
                    }


                </>
            )
        }
    }


    /**************************************  EVALUATION COMPONENT ********************************/

    function Evaluation(props) {

        const courseID = props.courseID;
        const tenantID = props.tenantID;
        const assignID = props.assignID;

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

        function onClickClose() {
            setComp(
                <>
                    <ViewAssignment />
                </>
            )
        }

        useEffect(() => {
            assignmentSubmittedListAPI();
        }, [])


        const [getAssignmentSubmittedList, setAssignmentSubmittedList] = useState([]);
        const [filterText, setFilterText] = React.useState("");
        const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
            false
        );
        const assignmentSubmittedListAPI = async () => {
            AssignmentService.getAssignmentSubmittedList(courseID, tenantID, assignID)
                .then((resp) => {
                    ////console.log(resp.data)
                    setAssignmentSubmittedList(resp.data)

                }).catch((err) => {
                    //console.log(err);
                })

        }
        const filteredAssignmentSubmittedList = getAssignmentSubmittedList.filter(
            item =>
                item.solution.submittedBy
                    .toLowerCase()
                    .indexOf(filterText.toLowerCase()) !== -1
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


        const columnViewSubmittedAssignment = [
            {
                name: 'Name',
                selector: row => row.name,
                sortable: true,
                wrap: true,

            },
            {
                name: 'Status',
                selector: row => row.solutionmarks.status,
            },
            {
                name: 'Score',
                selector: row => row.solutionmarks.marks,
                wrap: true
            },
            {
                name: 'Remarks',
                selector: row => row.solutionmarks.remarks,
                wrap: true,
                width: '130px',
            },
            {
                name: 'Action',
                width: '200px',
                cell: row => <>
                    <div>
                        {props.userID === row.createdBy
                            ?
                            <>
                                {
                                    row.solutionmarks.status !== 'evaluated'
                                        ?
                                        <>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('evaluate')}</Tooltip>}>
                                                <button className='btn btn-primary' style={{ marginLeft: '5px' }} onClick={() => { onClickEvalutionMarks(row.solution.assignmentId, row.solution.submittedBy, row.solution.solutionId) }} ><i class="fas fa-book-open"></i> </button>
                                                {/* style={activeAddModule ? {color: "white"} : {color:"#5cb85c"} */}
                                            </OverlayTrigger>

                                        </>
                                        :
                                        <>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('evaluate')}</Tooltip>}>
                                                <button className='btn btn-primary' style={{ marginLeft: '5px' }} onClick={() => { onClickEvalutionMarks(row.solution.assignmentId, row.solution.submittedBy, row.solution.solutionId) }} disabled><i class="fas fa-book-open"></i> </button>
                                                {/* style={activeAddModule ? {color: "white"} : {color:"#5cb85c"} */}
                                            </OverlayTrigger>
                                        </>

                                }


                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                </>
            }
        ]

        function onClickEvalutionMarks(assignId, submittedBy, solID) {
            setComp(
                <>
                    <EvaluationMarks
                        solID={solID}
                        assignID={assignId}
                        courseID={courseID}
                        tenantID={tenantID}
                        submittedBy={submittedBy}
                    />

                </>
            )
        }

        return (
            <>
                <div>
                    {/* {//console.log(getAssignmentSubmittedList)} */}
                    {/* {//console.log(getServerTime)} */}
                    <h5>{t('evaluation')}</h5>
                </div>
                <div>
                    <Row style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 1px' }}>
                        <p>{t('submit_assign_list')}</p>
                        <Button className='btn btn-danger' style={{ textAlign: 'right' }} onClick={onClickClose}> X </Button>
                    </Row>
                </div>
                <br />
                <br />
                <div>
                    <Card>
                        <DataTable
                            columns={columnViewSubmittedAssignment}
                            data={filteredAssignmentSubmittedList}
                            //data={getAssignmentSubmittedList}

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
                </div>
            </>
        );
    }


    ////Evaluation Marks
    function EvaluationMarks(props) {
        const currentLanguageCode = cookies.get('i18next') || 'en'
        const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
        const { t } = useTranslation()

        useEffect(() => {
            document.body.dir = currentLanguage.dir || 'ltr'
            document.title = t('app_title')
        }, [currentLanguage, t])
        const solID = props.solID;
        const assignID = props.assignID;
        const tenantID = props.tenantID;
        const courseID = props.courseID;
        const submittedBy = props.submittedBy;
        const userID = UserService.getUserid();

        useEffect(() => {
            getStudentFile();
        }, [])

        const [solStudFile, setSolStudFile] = useState([])
        const getStudentFile = () => {
            AssignmentService.getStudentFileUpload(assignID, submittedBy).then((resp) => {
                setSolStudFile(resp.data.solutionfile)
                ////console.log(resp.data.solutionfile)
            }).catch((err) => {
                //console.log(err)
            })
        }

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
        const studfileColumn = [
            {
                name: 'File Name',
                selector: row => row.filename,
            },
            {
                name: "Preview",
                cell: (row) =>
                    <>
                        <a className='link' href="#" >
                            {
                                row.filename.match(".zip")
                                    ?
                                    <>

                                        <a href={`${getSolutionFile}${row.sno}`}  ><i class="fas fa-file-archive" style={{ fontSize: "35px", color: "#fdbf00" }}></i></a>
                                    </>

                                    :
                                    row.filename.match(".pdf")
                                        ?
                                        <>

                                            <a href={`${getSolutionFile}${row.sno}`} >
                                                <i class="fas fa-file-pdf" style={{ fontSize: "35px", color: "#b30b00" }}></i>
                                            </a>

                                        </>
                                        :
                                        row.filename.match(".doc") ||
                                            row.filename.match(".docx")
                                            ?
                                            <>

                                                <a href={`${getSolutionFile}${row.sno}`} target="_blank">
                                                    <i class="fas fa-file-word" style={{ fontSize: "35px", color: "#2596be" }}></i>
                                                </a>
                                            </>


                                            :
                                            <></>
                            }
                        </a>
                    </>
            },
        ]



        const [evaluationMarks, setEvaluationMarks] = useState({
            marks: '',
            remarks: '',
        });
        const [evaluationMarksError, setEvaluationMarksError] = useState({
            marksError: '',
            remarksError: '',
        })

        const marksHandler = (event) => {
            setEvaluationMarks({
                ...evaluationMarks,
                [event.target.name]: event.target.value
            })
        }

        function ValidateForm() {
            let marksE = '';
            let remarksE = '';

            if (evaluationMarks.marks == '') {
                marksE = t('field_required')
            }
            if (evaluationMarks.remarks == '') {
                remarksE = t('field_required')
            }

            if (marksE != '' && remarksE != '') {
                setEvaluationMarksError({
                    ...evaluationMarksError,
                    marksError: marksE,
                    remarksError: remarksE,
                })
                return false;
            }
            return true
        }

        function onClickSubmit() {
            const check = ValidateForm();

            if (check == true) {

                swal({
                    title: t('swal_title'),
                    text: t('evaluation_msg'),
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((Ok) => {
                        if (Ok) {

                            let evalBody = {
                                solution_id: solID,
                                marks: evaluationMarks.marks,
                                remarks: evaluationMarks.remarks,
                                evaluatedBy: userID
                            }
                            //console.log("evalBody",evalBody);

                            AssignmentService.putEvaluatedBy(evalBody).then((resp) => {
                                if (resp.status == 200) {
                                    swal(t('evaluate_success'), {
                                        icon: "success",
                                    });
                                    setComp(
                                        <>
                                            <Evaluation
                                                courseID={courseID}
                                                tenantID={tenantID}
                                                assignID={assignID}
                                            />
                                        </>
                                    )
                                }
                            })
                        }
                        // else {
                        //     swal("Your imaginary file is safe!");
                        // }
                    });


                // AssignmentService.putEvaluatedBy(solID, evaluationMarks.marks, evaluationMarks.remarks, userID).then((resp) => {
                //     if (resp.status == 200) {
                //         swal("Submited", "Submitted Successfully", 'success');
                //         setComp(
                //             <Evaluation
                //                 courseID={courseID}
                //                 tenantID={tenantID}
                //                 assignID={assignID}
                //             />
                //         )
                //     }
                // }).catch((error) => {
                //     //console.log(error)
                // })
            }
        }

        function onClickCloseButton() {
            setComp(
                <>
                    <Evaluation
                        assignID={assignID}
                        tenantID={tenantID}
                        courseID={courseID}
                    />
                </>
            )
        }


        return (
            <>
                <fieldset>
                    {/* {//console.log(assignID)} */}
                    <div>
                        <Button className='btn btn-danger' onClick={onClickCloseButton} style={{ float: 'right' }} > X </Button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <DataTable
                            columns={studfileColumn}
                            data={solStudFile}
                            customStyles={customStyles}
                        />
                    </div>
                    <br />
                    <br />
                    <div>
                        <form>
                            <div className='row' style={{ marginLeft: '1px' }}>
                                <p class="control-label" style={{ marginRight: '20px' }}>{t('mark')} </p>
                                <input type='number' min={0} pattern="^[0-9]" placeholder="Enter Marks " name='marks' value={evaluationMarks.marks} onChange={marksHandler} />
                            </div>
                            <div>
                                {
                                    evaluationMarksError.marksError
                                        ?
                                        <>
                                            <div className="alert alert-danger mt-2">{evaluationMarksError.marksError}</div>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </div>


                            <br />
                            <div className='row' style={{ marginLeft: '1px' }}>
                                <p class="control-label">{t('remarks')}</p>
                                <textarea class="form-control" style={{ marginRight: '1px' }} id="exampleFormControlTextarea1" rows="3"
                                    name='remarks' value={evaluationMarks.remarks} onChange={marksHandler}></textarea>
                            </div>
                            {
                                evaluationMarksError.remarksError
                                    ?
                                    <>
                                        <div className="alert alert-danger mt-2">{evaluationMarksError.remarksError}</div>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </form>
                    </div>
                    <br />
                    <br />
                    <Row style={{ display: 'flex', margin: '0px 1px' }}>
                        <Button onClick={onClickSubmit}> {t('submit')} </Button>
                    </Row>
                </fieldset>

            </>
        )
    }
}

export default FrontAssignment;