import axios from "axios";
import { assign } from "lodash";
import Header from "react-modal-image/lib/Header";
import UserService from "./UserService";



const getAssignmentDetail = "http://10.244.2.238:8086/assignment/instructor/"
//this will list out the assignment created by the Inst
const postAssignmentDetail = "http://10.244.2.238:8086/assignment/assignment/"
//this is use to create the assignment at the instructor side with meta data
const postFileUpload = "http://10.244.2.238:8086/assignment/fileonlyadd/"
// this api is use to upload the File at inst side
const updateAssignmentDetail = "http://10.244.2.238:8086/assignment/assignmentupdate"
//this is use to update the assignment meta data at the instructor side with meta data

//const postFileUpload = "http://10.244.2.238:8086/fileonlyadd/"
const deleteAssignment = "http://10.244.2.238:8086/assignment/assignmentdelete/"
const deleteFile = "http://10.244.2.238:8086/assignment/fileonlydelete/"


const studentAssignListAPI = "http://10.244.2.238:8086/assignment/student/"
//This will list out the Assignment at the LEarner side with Opening and closing date

const assignmentData = 'http://10.244.2.238:8086/assignment/getassignbyid/'
export const getFileToView = 'http://10.244.2.238:8086/assignment/getfile/'


const studentFileUpload = 'http://10.244.2.238:8086/assignment/solutionsubmit/'
//This is use to upload the file at the Learner side

const getStudentFileUpload = 'http://10.244.2.238:8086/assignment/getsolbyassignandsubmittedby/'
//const getStudentFileUpload = 'http://10.244.2.238:8086/getsolbyassignandsubmittedby/'
const getAssignmentSubmittedList='http://10.244.2.238:8086/assignment/getsolbycourseandtenantassign/'
const putEvaluatedBy = 'http://10.244.2.238:8086/assignment/evaluate/'
const solutionFileDelete = 'http://10.244.2.238:8086/assignment/solutionfileonlydelete/'
// This is use to delete the File at the learner side. make sure that at reuploading the file previous or current file must be delete then only file can be upload by the learner


export const getSolutionFile = 'http://10.244.2.238:8086/assignment/getsolnfile/'




class AssignmentService {

    getAssignDetail(userID, courseID, tenantID) {
        return axios.get(getAssignmentDetail + `${userID}/${courseID}/${tenantID}`);
    }
    postFileUpload(assignid, data) {
        return axios.post(postFileUpload + `${assignid}`, data);
    }
    postAssignmentDetail(ReqBodyInfoSave) {
        return axios.post(postAssignmentDetail, ReqBodyInfoSave)
    }
    deleteAssignment(assignID) {
        return axios.post(deleteAssignment + `${assignID}`);
    }
    fileOnDelete(fileID) {
        return axios.post(deleteFile + `${fileID}`);
    }
    updateAssignmentDetail(ReqBodyInfo) {
        return axios.post(updateAssignmentDetail, ReqBodyInfo)
    }

    getListStudentAssignment(courseID, tenantID) {
        return axios.get(studentAssignListAPI + `${courseID}/${tenantID}`)
        //return axios.get(getAssignmentDetail + `${userID}/${courseID}/${tenantID}`);
    }

    getAssignmentData(assignid) {
        return axios.get(assignmentData + assignid);
    }

    getfileView(fileId) {
        return axios.get(getFileToView + fileId)
    }

    postStudentFileUpload(assignId, userId, studFile) {
        return axios({
            method : "POST" ,
            url: studentFileUpload+`${assignId}/${userId}`,
            data : studFile,
            headers : {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    getStudentFileUpload (assignId , UserId){
        return axios.get(getStudentFileUpload+`${assignId}/${UserId}`)
    }
    getAssignmentSubmittedList(courseId , tenantId , assignId){
        return axios.get(getAssignmentSubmittedList+`${courseId}/${tenantId}/${assignId}`)
    }
    putEvaluatedBy(evalBody){
        return axios.post(putEvaluatedBy, evalBody)

    }
    solutionfileonlydelete(id){
        return axios.post(solutionFileDelete+id);
    }


}

export default new AssignmentService();


