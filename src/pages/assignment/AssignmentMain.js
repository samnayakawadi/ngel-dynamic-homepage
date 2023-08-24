import React, { useEffect, useState } from 'react';
import service from '../../services/service';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import AssignmentFileUpload from './AssignmentFileUpload';
import UserService from '../../services/UserService';

function AssignmentMain(props) {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    const [getFirstDetails, setFirstDetails] = useState(true);
    const [getAssignmentDetails, setAssignmentDetails] = useState([]);
    const [getAssignmentScoreDetails, setAssignmentScoreDetails] = useState();
    const [getViewFile, setViewFile] = useState();
    const [getViewModalState, setViewModalState] = useState();
    const [getUploadModalState, setUploadModalState] = useState();

    const viewUrl = "http://10.244.3.218:8085/courseCatalouge/getAssignmentDoc?course_id=" + props.courseId + "&tenant_id=" + props.tenantId;
    const [getAssignId, setAssignId] = useState();

    useEffect(() => {
        // service.getAssignmentDetails(props.courseId, props.tenantId)
        //     .then(res => {
        //         setAssignmentDetails(res.data);
        //     })
        //     .catch(err => {
        //         //console.log(err);
        //     })
    }, []);

    const changeDetails = () => {
        service.getAssignmentScoreDetails(props.courseId, props.tenantId, props.userId)
            .then(res => {
                setAssignmentScoreDetails(res.data);
                setFirstDetails(false);
            })
            .catch(err => {

            })

    }

    const handleSubmit = (id) => {
        setAssignId(id);
        setUploadModalState(true);
    }


    const viewHandler = () => {
        setViewModalState(true);
        axios({
            method: 'post',
            url: viewUrl,
            responseType: 'blob',
            headers : {
                'tenant_id' : + props.tenantId
            }
        })
            .then(res => {
                const file = new Blob(
                    [res.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                setViewFile(fileURL);
            })
            .catch(err => {
                //console.log(err);
            })
    }

    const getMarksScoredHandler = (id) => {
        for (let k in getAssignmentScoreDetails) {
            if (getAssignmentScoreDetails[k].assignId == id) {
                if (getAssignmentScoreDetails[k].marksScored === 0 || getAssignmentScoreDetails === null) {
                    return 'Marks not assigned yet'
                }
                else {
                    return getAssignmentScoreDetails[k].marksScored;
                }
            }
        }
    }

    const getInstructorRemarksHandler = (id) => {
        for (let k in getAssignmentScoreDetails) {
            if (getAssignmentScoreDetails[k].assignId == id) {
                if (getAssignmentScoreDetails[k].instremarks === null || getAssignmentScoreDetails === null) {
                    return 'Remarks not assigned yet';
                }
                else {
                    return getAssignmentScoreDetails[k].instremarks;
                }
            }
        }
    }


    return (
        <div>
            {getFirstDetails ?
                <table className="table">
                    {getAssignmentDetails.length === 0 ? <b className="btn btn-success btn-lg btn-block">Assignment is not assign yet</b> :
                        < thead >
                            <tr>
                                <td><b>Assignment Name</b></td>
                                <td><b>Remarks</b></td>
                                <td><b>Due Date</b></td>
                                <td><b>Actions</b></td>
                            </tr>
                        </thead>
                    }
                    <tbody>

                        {getAssignmentDetails ? getAssignmentDetails.map((data, i) => {

                            return (
                                <tr>
                                    <td>{data.assignName}</td>
                                    <td>{data.remarks}</td>
                                    <td>{data.assignLastDate}</td>
                                    <td><button className="btn btn-info" onClick={() => changeDetails()} title="Show Details"><i className="las la-arrow-right" ></i></button></td>
                                </tr>
                            );

                        }) : null}

                    </tbody>
                </table>
                :
                <div className="container">
                    <div className="row">
                        <button onClick={() => setFirstDetails(true)} className="btn btn-light"><b>Back to previous page</b></button>
                    </div>
                    <br />
                    <table className="table">
                        <thead>

                            <tr>
                                <td><b>Max Marks</b></td>
                                <td><b>Marks Scored</b></td>
                                <td><b>View</b></td>
                                <td><b>Instructor Remarks</b></td>
                                <td><b>Upload File</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {getAssignmentDetails ? getAssignmentDetails.map((data, i) => {

                                return (
                                    <tr>
                                        <td>{data.maxMarks}</td>
                                        <td>{getMarksScoredHandler(data.assignId)}</td>
                                        <td><button className="btn btn-secondary" onClick={() => viewHandler()}><i className="las la-eye" title="View assignment"></i></button></td>
                                        <td>{getInstructorRemarksHandler(data.assignId)}</td>
                                        <td><button className="btn btn-info" onClick={() => handleSubmit(data.assignId)} title="Show Details"><i className="las la-file" ></i></button></td>
                                    </tr>
                                );

                            }) : null}
                        </tbody>
                    </table>
                </div>
            }



            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={getViewModalState}
            >
                <Modal.Header>
                    {/* <Modal.Title id="contained-modal-title-vcenter">
                            
                        </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <iframe src={getViewFile} width="725px" height="800px" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setViewModalState(false)} className="btn btn-danger">Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                centered show={getUploadModalState} >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Upload The File
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AssignmentFileUpload userId={props.userId} courseId={props.courseId} tenantId={props.tenantId} assignId={getAssignId} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setUploadModalState(false)} className="btn btn-danger">Close</Button>
                </Modal.Footer>
            </Modal>

        </div >

    );
}

export default AssignmentMain;