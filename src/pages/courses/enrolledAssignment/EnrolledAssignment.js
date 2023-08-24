import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import AssignmentService, { getFileToView, getSolutionFile } from '../../../services/AssignmentService';
import UserService from '../../../services/UserService';
import FilterDataTable from '../../instructor/FilterDataTable';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import md5 from 'md5';
import moment from 'moment';


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

function EnrolledAssignment(props) {
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

    const [comp, setComp] = useState(<ListEnrollAssignment />);
    //const [comp, setComp] = useState(<UploadAssignmentFile />);
    return (
        <div>
            {comp}
        </div>
    );


    /****************Front Views of Enrolled Assignment **********************/


    function ListEnrollAssignment() {

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

        const [getAssignmentList, setAssignmentList] = useState([]);
        const [filterText, setFilterText] = React.useState("");
        const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
            false
        );
        const assignmentListAPI = async () => {
            try {
                let result = await AssignmentService.getListStudentAssignment(props.courseID, props.tenantID)
                //let result = await AssignmentService.getAssignDetail("8edb6947-c501-4ad1-9bf6-9d9728c67aaa", 1, 1);
                ////console.log(result.data);
                setAssignmentList(result.data);

            } catch (error) {
                //console.log(error)
            }

        }
        const filteredAssignmentList = getAssignmentList.filter(
            item =>
                item.name
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


        function onUploadFileComponentCall(assignid) {

            setComp(
                <>
                    <UploadAssignmentFile
                        assignID={assignid}
                    />
                </>
            )
        }

        function onClickViewAssignmentFile(assignId) {
            setComp(
                <>
                    <ViewAssignment assignID={assignId} />
                </>
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

                wrap: true,
                width: '150px',
            },
            {
                name: 'Closing Date',
                selector: row => moment(row.closingDate).format('DD-MM-yyyy'),
                wrap: true,
                width: '150px',
            },
            // {
            //     name: "Status",
            //     selector: row => <>
            //         {
            //             row.status == 'opened'
            //                 ?
            //                 <>{row.status.toUpperCase()}</>
            //                 :
            //                 <>
            //                 </>
            //         }
            //     </>

            // },
            {
                name: 'Action',
                width: '200px',
                cell: row =>
                    <>
                        {
                            row.status == 'opened'
                                ?
                                <>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('upload_file')}</Tooltip>}>
                                        <button type="button" style={{ marginRight: '5px', border: '0px' }} onClick={() => { onUploadFileComponentCall(row.assignment_id) }}><i class="fa fa-upload fa-2x" style={{ color: "#1CC74B" }}></i></button>
                                    </OverlayTrigger>
                                </>
                                :
                                <>
                                </>
                        }
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('view_assign')}</Tooltip>}>
                                <button type="button" style={{ border: '0px' }} onClick={() => { onClickViewAssignmentFile(row.assignment_id) }}><i class="fa fa-eye fa-2x" style={{ color: "blue" }}></i></button>
                            </OverlayTrigger>
                        </div>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('view_result')}</Tooltip>}>
                                <button type="button" style={{ border: '0px' }} onClick={() => { showResult(row.assignment_id) }}><i class="fa fa-list-alt fa-2x" style={{ color: "blue" }}></i></button>
                            </OverlayTrigger>
                        </div>
                    </>
            }
        ]

        const [result, setResult] = useState();
        const [ShareUrlModal, setShareUrlModal] = useState({
            show: false,
            marks: '',
            remarks: '',
            status: '',
            upload: ''
        });

        const showResult = (assignid) => {
            const userid = UserService.getUserid();
            ////console.log(assignid , userid);
            AssignmentService.getStudentFileUpload(assignid, userid).then((resp) => {
                ////console.log(resp.data)
                if (resp.data.solutionmarks == null) {
                    setShareUrlModal({
                        show: true,
                        upload: t('not_upload_msg')
                    })
                }
                else if (resp.data.solutionmarks.marks == 0) {
                    setShareUrlModal({
                        show: true,
                        upload: t('not_evalauted')
                    })
                }

                else {
                    setShareUrlModal({
                        show: true,
                        marks: resp.data.solutionmarks.marks,
                        remarks: resp.data.solutionmarks.remarks,
                        status: resp.data.solutionmarks.status,
                    })
                }

            }).catch((err) => {
                //console.log(err)
            })

        }

        return (
            <>
                <div>
                    <h5 style={{ fontWeight: 'bold' }}>{t('list_assignment')}</h5>
                    <hr />
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

                <Modal centered show={ShareUrlModal.show} onHide={() => { setShareUrlModal({ ...ShareUrlModal, show: false }) }} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                            {t('result')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table class="table table-borderless">

                            <tbody>
                                {
                                    ShareUrlModal.marks && ShareUrlModal.remarks
                                        ?
                                        <>
                                            <tr>
                                                <td>Marks :</td>
                                                <td>{ShareUrlModal.marks}</td>
                                            </tr>
                                            <tr>
                                                <td>Remarks : </td>
                                                <td>{ShareUrlModal.remarks}</td>
                                            </tr>
                                            <tr>
                                                <td>Status : </td>
                                                <td>{ShareUrlModal.status}</td>
                                            </tr>
                                        </>
                                        :
                                        <>
                                            <tr>
                                                <td>Status : </td>
                                                <td>{ShareUrlModal.upload}</td>
                                            </tr>
                                        </>
                                }
                            </tbody>
                        </table>
                    </Modal.Body>
                    {/* <Modal.Footer style={{ justifyContent: "right" }}>
                    <Button variant="secondary" onClick={() => shareUrlModalHide()}>
                        Cancel
                    </Button>
                </Modal.Footer> */}
                </Modal>

            </>
        );
    }

    /*********************** FILE UPLOAD********************************/

    function UploadAssignmentFile(props) {

        const userid = UserService.getUserid();
        const assignID = props.assignID;

        useEffect(() => {
            getAssignmentStudentList();
        }, [])
        const [solutionFileData, getSolutionFileData] = useState([]);
        const [status, getStatus] = useState();
        const getAssignmentStudentList = () => {
            //service Called here to get the data
            AssignmentService.getStudentFileUpload(assignID, userid)
                .then((resp) => {

                    if (resp.data.solutionfile !== null) {
                        getSolutionFileData(resp.data.solutionfile)
                        getStatus(resp.data.solutionmarks.status);
                        ////console.log(resp.data.solutionfile);
                    }
                    else {
                        getSolutionFileData([])
                    }


                }).catch((err) => {

                    //console.log(err);
                })
        }
        // const getAssignmentStudentListAfterDelete = (assignID, userid) => {
        //     //service Called here to get the data
        //     AssignmentService.getStudentFileUpload(assignID, userid)
        //         .then((resp) => {
        //             getSolutionFileData(resp.data.solutionfile)
        //             getStatus(resp.data.solutionmarks.status);
        //             //console.log(resp.data.solutionfile);
        //         }).catch((err) => {
        //             //console.log(err);
        //         })
        // }


        const [errorType, setErrorType] = useState();
        const [uploadFileCheck, setUploadFileCheck] = useState(false);
        const [selectedFiles, setSelectedFiles] = useState([]);

        const selectFiles = (event) => {
            // event.preventDefault();
            // let fi = document.getElementById('file');
            let files = event.target.files;
            ////console.log("Selected Files : ", files)
            for (let i = 0; i < files.length; i++) {
                if (files[i].type != "application/pdf" && files[i].type != "application/x-zip-compressed" && files[i].type != "application/msword") {
                    setErrorType(t('invalid_file_assignment'));
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

                if (status !== 'evaluated') {
                    const form = new FormData();
                    for (let index = 0; index < selectedFiles.length; index++) {
                        // const form = new FormData();
                        form.append('files', selectedFiles[index]);
                        form.append('filehash', md5((selectedFiles[index].size).toString()))
                    }
                    //console.log(form)
                    AssignmentService.postStudentFileUpload(props.assignID, userid, form).then((res) => {
                        if (res.data === "InvalidFile") {
                            swal(t('error'), t('file_not_support'), 'success');
                        }
                        else if (res.data === "ReSubmitError") {
                            swal(t('resubmiterror'), t('resubmitmsg'), 'warning');
                        }
                        else {
                            swal(t('success'), t('file_upload_msg'), 'success');
                            getAssignmentStudentList();
                        }
                        ////console.log("Files Res - ", res.data)
                        ////console.log("File upload SuccessFull")
                    }).catch((error) => {
                        //console.log(error);
                    })


                    // document.getElementById('form').addEventListener('submit', function (e) {
                    //     // e.preventDefault();

                    //     // let fi = document.getElementById('file');
                    //     // let files = fi.files;

                    // })
                }

            }
        }

        const onClickDeleteFile = (id) => {
            ////console.log(id);
            AssignmentService.solutionfileonlydelete(id).
                then((resp) => {
                    if (resp.status == 200) {
                        swal(t('success'), t('file_delete_msg'), 'success');
                        // window.location.reload();
                        getAssignmentStudentList();
                        ////console.log("TRUE-------------")
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
                        <a className='link'  >
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
            {
                name: 'Delete',
                selector: row =>
                    <>
                        {
                            status !== 'evaluated'
                                ?
                                <>
                                    <Button className='btn btn-danger' onClick={() => { onClickDeleteFile(row.sno) }}> X </Button>

                                </>
                                :
                                <>
                                    <Button className='btn btn-danger' onClick={() => { onClickDeleteFile(row.sno) }} disabled> X </Button>
                                </>
                        }

                    </>
            },

        ]



        const onClickBack = () => {
            setComp(
                <>
                    <ListEnrollAssignment />
                </>
            )
        }
        return (
            <>
                <div>
                    <div>
                        <h5>{t('upload_assign')}</h5>
                    </div>
                    <br />
                    <div>
                        <h4 class="control-label" style={{ textAlign: 'center' }}> {t('file_upload')}</h4>
                        <p class="control-label" style={{ textAlign: 'center' }}>{t('file_pdf_doc_zip')}</p>
                        <br />
                        <form id='form'>
                            <div className='row'>
                                {
                                    status !== "evaluated"
                                        ?
                                        <>
                                            <div className='col-md-6 offset-md-3'>
                                                <input type='file' id='file' onChange={selectFiles} />
                                                {/* <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="file"
                                        aria-describedby="inputGroupFileAddon01"
                                        onChange={selectFiles} />
                                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div> */}
                                            </div>
                                            <button class="btn btn-primary" onClick={onClickupload} > {t('upload_file')} </button>
                                        </>
                                        :
                                        <>
                                            <div className='col-md-6 offset-md-3'>
                                                <input type='file' id='file' onChange={selectFiles} disabled />
                                                {/* <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="file"
                                        aria-describedby="inputGroupFileAddon01"
                                        onChange={selectFiles} />
                                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div> */}
                                            </div>
                                            <button class="btn btn-light" onClick={onClickupload} disabled > {t('upload_file')} </button>

                                        </>
                                }
                            </div>
                            <div>
                                {errorType ? <div className="alert alert-danger mt-2">{errorType}</div> : <></>}
                            </div>
                        </form>
                        <br />
                        <div>
                            <DataTable
                                columns={fileUploadColumn}
                                data={solutionFileData}
                                customStyles={customStyles}
                            />

                        </div>
                        <br />
                        <br />
                        <Row style={{ display: 'flex', margin: '0px 1px' }}>
                            <Button onClick={onClickBack}> {t('back')} </Button>
                        </Row>
                    </div>
                </div>
            </>
        )

    }


    function ViewAssignment(props) {

        const assignId = props.assignID;
        useEffect(() => {
            getAssignmentFileList();
        }, [])

        const [assignmentFileList, setAssignmentFileList] = useState();
        const getAssignmentFileList = () => {
            AssignmentService.getAssignmentData(assignId).
                then((resp) => {
                    setAssignmentFileList(resp.data.assignmentFilePath);
                    ////console.log(resp.data.assignmentFilePath);
                }).catch((error) => {
                    //console.log(error)
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
                        <a className='link' href="#" >
                            {
                                row.filename.match(".zip")
                                    ?
                                    <>

                                        <a href={`${getFileToView}${row.id}`}  ><i class="fas fa-file-archive" style={{ fontSize: "35px", color: "#fdbf00" }}></i></a>
                                    </>

                                    :
                                    row.filename.match(".pdf")
                                        ?
                                        <>

                                            <a href={`${getFileToView}${row.id}`} >
                                                <i class="fas fa-file-pdf" style={{ fontSize: "35px", color: "#b30b00" }}></i>
                                            </a>

                                        </>
                                        :
                                        row.filename.match(".doc") ||
                                            row.filename.match(".docx")
                                            ?
                                            <>

                                                <a href={`${getFileToView}${row.id}`} target="_blank">
                                                    <i class="fas fa-file-word" style={{ fontSize: "35px", color: "#2596be" }}></i>
                                                </a>
                                                {/* <i class="fa-solid fa-file-word"></i> */}

                                            </>

                                            :
                                            <></>
                            }
                        </a>
                    </>
            },
        ]

        const onClickBack = () => {
            setComp(
                <>
                    <ListEnrollAssignment />
                </>
            )

        }


        return (
            <>
                <div>
                    <h5 style={{ fontWeight: 'bold' }}>{t('assign_list')}</h5>

                    <br />

                    <br />
                    <div style={{ margin: '0px 50px' }}>
                        <DataTable
                            columns={fileUploadColumn}
                            data={assignmentFileList}
                            customStyles={customStyles}
                        />
                    </div>
                    <br />
                    <br />
                    <div>
                        <Button onClick={onClickBack} style={{ marginRight: "5px" }}> {t('back')} </Button>
                    </div>
                </div>

            </>
        )
    }


}
export default EnrolledAssignment;





