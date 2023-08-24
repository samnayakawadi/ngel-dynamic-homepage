import axios from "axios"

const COURSE_FATCH_URL = "http://10.244.3.218:8082/courseOrganizer/";

//const COURSES_CATELOUGE = 'http://10.244.3.218:8085/api/';
const COURSES_CATELOUGE = 'http://10.244.3.218:8085/api/';


const ASSIGNED_QUIZZES_STATUS = 'http://samnayakawadi.hyderabad.cdac.in:8094/assign/get/getAssignedQuizzesWithStatusByUserIdAndCourseId';

//const ASSIGNED_QUIZZES_STATUS = 'http://samnayakawadi.hyderabad.cdac.in:9898/assign/get/getAssignedQuizzesWithStatusByUserIdAndCourseId';

//const CERTIFICATEION_GENERATION = 'http://10.244.3.218:8083/certificate/gencert';
const CERTIFICATEION_GENERATION = 'http://10.244.3.218:8083/certificate';

const GET_LOG = 'http://10.244.3.218:8090/la_an/'



class learnerService {

    getPublishCourses() {
        return axios.get(COURSE_FATCH_URL + "getPublishCourses");
    }

    getCourseMetadataById(courseId) {
        return axios.get(COURSE_FATCH_URL + "getCourseMetadata/" + courseId);
    }

    getCourseStructureById(courseId) {
        return axios.get(COURSE_FATCH_URL + "getCourseStructure/" + courseId);
    }

    getLibraryStructureById(courseId) {
        return axios.get(COURSE_FATCH_URL + "getPubLibraryStructure/" + courseId);
    }

    getLibraryStructureForAdminById(courseId) {
        return axios.get(COURSE_FATCH_URL + "getInstLibraryStructure/" + courseId);
    }


    getUserEnrolledByCourse(courseId, tenantId) {
        return axios.get(COURSES_CATELOUGE + "getCourseEnrolledLearners/" + courseId + "/" + tenantId);
    }

    getCourseInstructors(courseId, tenantId) {
        return axios.get(COURSES_CATELOUGE + "getCourseInstructors/" + courseId + "/" + tenantId);
    }

    getAssignedQuizzesStatus(userId,courseId){
        return axios.get(ASSIGNED_QUIZZES_STATUS + "/" + userId + "/" + courseId);
    }

    toGenerateCertificate(userId, courseId, tenantId){
        //return axios.post(CERTIFICATEION_GENERATION + '/' + userId + '/' + courseId + '/' + tenantId);
        return axios.get(CERTIFICATEION_GENERATION + '/gencert/' + userId + '/' + courseId + '/' + tenantId);
    }

    toDownloadCertificate(courseId, fileCode){
        //return axios.post(CERTIFICATEION_GENERATION + '/' + userId + '/' + courseId + '/' + tenantId);
         let url = CERTIFICATEION_GENERATION + '/downloadFile/' + courseId + '/' + fileCode;
        return axios.get(url,  { responseType: 'arraybuffer' });
    }

    certificateVerification(certificateId){
        return axios.get(CERTIFICATEION_GENERATION + '/verifycertificate?certificateid=' + certificateId);
    }

    getLearnerActivityLog(userId , fromDate , toDate){
        return axios.get(GET_LOG+`activitylogbydaterange/${userId}?fromdate=${fromDate}&todate=${toDate}`)
    }

    getLearnerTimeSpend (userId , courseId , fromDate , toDate) {
        return axios.get(GET_LOG+`timespentresbydaterange/${userId}/${courseId}?fromdate=${fromDate}&todate=${toDate}`)
    }

    getLearnerContentAccessLog (userId , courseId , fromDate , toDate ){
        return axios.get(GET_LOG+`contentaccessbydaterange/${userId}/${courseId}?fromdate=${fromDate}&todate=${toDate}`)
    }
    

}
export default new learnerService