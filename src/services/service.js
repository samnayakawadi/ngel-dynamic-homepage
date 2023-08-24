import axios from 'axios';
import UserService from './UserService';

const BASE_URL = UserService.USER_API;

//const register_URL = "http://10.244.0.131:8080/UserAdministrationService/";

const register_URL =  BASE_URL + "registerlearner";

//const BASE_URL1 = "http://10.244.3.218:8080/UserAdministrationService/api/learner";


const GET_COURSES = 'http://10.244.3.218:8085/courseCatalouge';

// const ENROLLMENT = 'http://10.244.3.218:8085/CourseCatalouge/api';

const ENROLLMENT = 'http://10.244.3.218:8085/api';

// const Rating_URL = "http://10.244.2.226:8092/review"
const Rating_URL = "http://10.244.2.238:8092/review"

const FEEDBACK = 'http://10.244.2.238:8088';

//const FEEDBACK = 'http://tmis1.hyderabad.cdac.in:8088/';

const ASSESSMENT = 'http://10.244.2.238:8081/Assessment/quiz';

const SEARCHENGINEURL = 'http://10.244.3.218:8085/courseCatalouge/getCourseByCourseIds';

const DISCUSSION = 'http://10.244.2.238:8089';

const ANNOUNCEMENT = 'http://10.244.2.238:8087/announcements';
//const ANNOUNCEMENT = 'http://10.244.3.218:8086/announcements';

const LEARNING_ANALYTICS = 'http://10.244.3.218:8090/la_an';
//const LEARNING_ANALYTICS = 'http://10.244.3.218:8090/learning_analytics';

const TESTIMONIAL = 'http://10.244.2.238:8081/testimonial';

const NUMBEROFCOUNTS = 'http://10.244.3.218:8085/api/getLearnerInstructorCourseCount';

const UPCOMINGEVENTS_URL = "http://10.244.2.238:8081/upcomingEvent";
//const UPCOMINGEVENTS_URL = "http://10.244.2.238:8081/upcomingEvent";

const ASSIGNMENT = "http://10.244.3.218:8085/courseCatalouge";

const INSTRUCTOR_URL = "http://10.244.3.218:8085/courseCatalouge";

const NEW_DISCUSSION = "http://10.244.3.218:8089/Discussion";

const USER_DASHBOARD = "http://10.244.0.43:8081/dashboard";

//payment 

const PAYMENT = "http://10.244.3.218:8091/payment/";

const LEARNER_REQUEST_APPROVAL_For_Course = "http://10.244.3.218:8085/api";

const QUIZRESULT = "http://samnayakawadi.hyderabad.cdac.in:8094/";

const QUIZCOMPLETERESULT = "http://samnayakawadi.hyderabad.cdac.in:8095/";

const ACTIVITYCOMPLETION = "http://10.244.3.218:8100/";


class service {

    validateURL(url) {
        const parsed = new URL(url)
        if (parsed.protocol === 'http:') {
            return url
        }
        if (parsed.protocol === 'https:') {
            return url
        }
        else {
            return false
        }
    }



    // learner user service

    /* This code is for add token in header send to endpoint for refrence */
    // getCountry() {
    //     return axios.get(this.validateURL(BASE_URL) + '/' + "country",
    //     {
    //             headers: {
    //                 'Authorization': `Bearer ${UserService.getToken()}`
    //             },
    //         }
    //     );

    //     return axios.get(this.validateURL(BASE_URL) + '/' + "country");
    // }

    // getState() {
    //     return axios.post(this.validateURL(BASE_URL) + '/' + 'imageupload', formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //             'Authorization': `Bearer ${UserService.getToken()}`
    //         },
    //         onUploadProgress,
    //     });
    // }


    getUser() {
        return axios.get(this.validateURL(BASE_URL));
    }

    getUserById(userId) {
        return axios.get(this.validateURL(BASE_URL) + "learner/" + userId);
    }

    updateUser(userdata) {
        return axios.post(this.validateURL(BASE_URL)  + "updatelearner/", userdata);
    }


    stateByid(stateId) {
        return axios.get(this.validateURL(BASE_URL)  + "state/" + stateId)
    }

    getCountry() {
        return axios.get(this.validateURL(BASE_URL)  + "country");
    }

    getState() {
        return axios.get(this.validateURL(BASE_URL)  + "state");
    }

    getDistrict(id) {
        return axios.get(this.validateURL(BASE_URL) + "district/byStateId/" + id);
    }
    getProfilePic(userId) {
        return axios.get(this.validateURL(BASE_URL) + 'getprofilepic/' + userId);
    }

    Register(formData1) {
        return axios.post(this.validateURL(register_URL), formData1, {headers: {
            "Content-Type": "multipart/form-data",
        }} );
    }
    RegisterCadre() {
        return axios.get(this.validateURL(BASE_URL)  + 'cadre');
    }
    RegisterQualification() {
        return axios.get(this.validateURL(BASE_URL)  + 'qualf');
    }
    RegisterDesignation() {
        return axios.get(this.validateURL(BASE_URL)  + 'desig');
    }
    // troken Verification Service
    tokenVerification(tokenId){
        return axios.post(this.validateURL(BASE_URL) + 'learneremailveristatus?token='+tokenId);
    }

    assignLearnerRole(email) {        
        return axios.post(BASE_URL + `approvelearner`, email);        
    }
    rejectLearnerRole(email) {        
        return axios.post(BASE_URL + `rejectlearner`, email);        
    }

    getRegisterCaptcha() {
        return axios.get(this.validateURL(BASE_URL) + 'generateCaptcha');
    }

    approveCourseLearnerRequest(courseId, userId){
        //http://10.244.3.218:8085/api/approveCourseEnrollRequestByAdmin?courseId=10&userId=f9abe3a8-43b2-4a50-a45f-fca6b87ebcd1
        return axios.post(LEARNER_REQUEST_APPROVAL_For_Course + `/approveCourseEnrollRequestByAdmin?courseId=` + courseId + "&userId=" + userId);   
    }
    rejectCourseLearnerRequest(courseId, userId){
        //http://10.244.3.218:8085/api/approveCourseEnrollRequestByAdmin?courseId=10&userId=f9abe3a8-43b2-4a50-a45f-fca6b87ebcd1
        return axios.post(LEARNER_REQUEST_APPROVAL_For_Course + `/rejectCourseEnrollRequestByAdmin?courseId=` + courseId + "&userId=" + userId);   
    }

    getRoleIdbyCourseIdandUserId(courseId, userId){
        return axios.get(LEARNER_REQUEST_APPROVAL_For_Course + `/getRoleIdbyCourseIdandUserId/` + courseId + "/" + userId);   
    }


    

    upload(file, sig, user_id, onUploadProgress) {
        let formData = new FormData();
        formData.append("filesig", sig);
        formData.append("file", file);
        formData.append("user_id", user_id)
        return axios.post(this.validateURL(BASE_URL) + 'imageupload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    assignInstructorRole(data) {        
        return axios.post(BASE_URL + `approveInstRequest/${data}`)        
        //return axios.post(this.validateURL(KEYCLOCK_AUTH_URL) + 'assigninstrole', data);
    }

    deleteRequestInstructor(email) {        
        //return axios.post(this.validateURL(BASE_URL) + '/userInstReq/' + email);
    }
    // assignInstructorRole(data) {
    //     return axios.post(this.validateURL(KEYCLOCK_AUTH_URL) + 'assigninstrole', data);
    // }

    // deleteRequestInstructor(email) {
    //     return axios.post(this.validateURL(BASE_URL) + '/userInstReq/' + email);
    // }
    // end of learner managemenrt url 

    //course grid and course details services

    getAllCourses() {
        return axios.get(this.validateURL(GET_COURSES) + '/courses');
    }

    getPublishCourses() {
        return axios.get(this.validateURL(GET_COURSES) + '/publishCourses');
    }

    getAllLibraryForAdmin() {
        return axios.get(this.validateURL(GET_COURSES) + '/libraries');
    }

    getAllLibrary() {
        return axios.get(this.validateURL(GET_COURSES) + '/publishedlibraries');
    }

    

    getAllLibraryToPublish() {
        return axios.get(this.validateURL(GET_COURSES) + '/librariestopublish');
    }

    getCoursesById(courseId, tenantId) {
        return axios.get(this.validateURL(GET_COURSES) + "/courses/" + courseId + "?tenant_id=" + tenantId);
    }
    userCount(courseId, tenantId) {
        return axios.get(this.validateURL(ENROLLMENT) + "/userCount/" + courseId + "/" + tenantId);
    }

    //closed here

    // Courser Structure function 

    getCourseStructure(courseId, tenantId) {
        return axios.get(this.validateURL(GET_COURSES) + '/' + courseId + '/structure', {
            headers: {
                'tenant_id': + tenantId
            }
        })
    }

    // getCourseContent(courseId, identifierId, path) {
    //     return axios.get(COURSE_CONTENT_ACCESS + '/' + courseId + '/' + identifierId + '/' + path);
    // }
    // End of code here 

    //Enrolled user courses

    getUserEnrolledCourses(userId, roleId) {
        return axios.get(this.validateURL(ENROLLMENT) + '/getCoursesEnrolledByUser/' + userId + '/' + roleId);
    }

    getCoursesByUserIdAndRoleId(userId, roleId) {
        return axios.get(this.validateURL(ENROLLMENT) + '/getCoursesEnrolledByUser/' + userId + '/' + roleId);
    }

    getLibrariesByUserIdAndRoleId(userId, roleId) {
        return axios.get(this.validateURL(ENROLLMENT) + '/getLibrariesEnrolledByUser/' + userId + '/' + roleId);
    }


    postUserEnrollment(data) {
        return axios.post(this.validateURL(ENROLLMENT) + '/userEnrolltoCourse/', data);
    }

    getUserEnrollmentStatus(courseId, userId, roleId, tenantId) {
        return axios.get(this.validateURL(ENROLLMENT) + '/CheckUserEnrollementStatus/' + courseId + '/' + userId + '/' + roleId + "?tenant_id=" + tenantId)
    }

    getCourseProgressReport(courseIds) {
        return axios.post(this.validateURL(ENROLLMENT) + '/getCourseProgressReport', courseIds);
    }


    // End of enroll course function 

    // Review Rating functions 

    updaterating(review) {
        ////console.log("review in update service file:::" + review);
        return axios.post(this.validateURL(Rating_URL) + "/updateReview", review);
    }
    deleterating(rId) {
        return axios.post(this.validateURL(Rating_URL) + '/' + "deleteReview?reviewId" + '=' + rId);
    }

    createreply(reply) {
        return axios.post(this.validateURL(Rating_URL) + "/savereply", reply);
    }

    getoverallRating(itemid) {
        return axios.get(this.validateURL(Rating_URL) + '/byReviewItemid?reviewItemId=' + itemid);
    }

    // averageRating(reviews) {
    //     return axios.post(this.validateURL(Rating_URL) + '/getAvgbyReviewItemid?reviewType=1', reviews);
    // }
    averageRating(reviews) {
        return axios.post(this.validateURL(Rating_URL) + '/getAvgbyReviewItemid', reviews);
    }


    //End//

    getreplybyreviewId(rerid) {
        return axios.get(this.validateURL(Rating_URL) + '/byReviewItemid?reviewItemId=' + rerid);
    }

    createrating(review) {
        return axios.post(this.validateURL(Rating_URL) + '/saveReview', review)
    }

    getratingbyreviewId(Rerid) {
        ////console.log("Inside the getratingbyreviewId reviewId:::" + Rerid)
        return axios.post(this.validateURL(Rating_URL) + '/byReviewId', Rerid);
    }


    // End of Rating Review Function

    //feedback services

    // getFeedback(typeid, cid) {
    //     return axios.get(this.validateURL(FEEDBACK) + '/feedbackmap/' + typeid + '/' + cid);
    // }
    getFeedback(typeid, cid,uid) {
        return axios.get(this.validateURL(FEEDBACK) + `/feedback/getCourseFeedbacklistBycourseId/${cid}/${typeid}/${uid}`);
    }
    getUserFeedbackStatus(cid,uid) {
        return axios.get(this.validateURL(FEEDBACK) + `/feedbackResponse/coursefeedbackstatus/${cid}/${uid}`);
    }
    // getFeedback(typeid, cid) {
    //     return axios.get(this.validateURL(FEEDBACK) + `/feedback/getCourseFeedbacklistBycourseId/${cid}/${typeid}`);
    // }

    getFeedbackByTypeAndItemId(typeid, id) {
        return axios.get(this.validateURL(FEEDBACK) + '/feedbackmap/' + typeid + '/' + id);
    }

    getFeedbackStatus(typeid, id, feedbackBy) {
        return axios.get(this.validateURL(FEEDBACK) + '/feedbackResponse/' + typeid + '/' + id + '/' + feedbackBy);
    }

    postFeedback(feedback) {
        return axios.post(this.validateURL(FEEDBACK) + '/feedbackResponse', feedback);
    }

    postContactUs(contactValues) {
        return axios.post(this.validateURL(FEEDBACK) + '/contactus', contactValues);
    }

    // Create feedback call api
    feedbackMasterPost(data) {
        return axios.post(this.validateURL(FEEDBACK) + '/feedback', data)
    }

    feedbackQuestionCreationForCourse(data) {
        return axios.post(this.validateURL(FEEDBACK) + '/question', data)
    }

    feedbackQuestionUpdateForCourse(data) {
        return axios.post(this.validateURL(FEEDBACK) + '/question/updateQuestion', data)
    }

    getAllQuestionByType(typeId) {
        return axios.get(this.validateURL(FEEDBACK) + '/question/getQuestionByType/' + typeId);
    }

    getAllQuestionByTypeAndUpdatedBy(typeId, userId) {
        return axios.get(this.validateURL(FEEDBACK) + '/question/getQuestionByTypeAndUpdatedBy/' + typeId + '/' + userId);
    }

    getResponseCount(typeId,id){
        return axios.get(FEEDBACK+`/feedbackResponse/questionsummary/${typeId}/${id}`);
    }

    deleteFeedbackQuestion(questionId) {
        return axios.post(this.validateURL(FEEDBACK + '/question/deleteQuestion/' + questionId))
    }

    addQuestionsMapWithIds(data) {
        return axios.post(this.validateURL(FEEDBACK) + '/feedbackmap', data)
    }

    courseFeedbackResponse(courseId, typeId) {
        return axios.get(this.validateURL(FEEDBACK) + '/feedbackResponse/' + courseId + '/' + typeId);
    }

    getContactCaptcha() {
        return axios.get(this.validateURL(FEEDBACK) + '/contactus/generateCaptcha');
    }


    getFeedbackListByCourseId(courseid){
        
        return axios.get(this.validateURL(FEEDBACK)+'/feedback/courseid/'+courseid)
    }

    getGeneralFeedbackListById(courseid){
        
        return axios.get(this.validateURL(FEEDBACK)+'/feedback/id/'+courseid)
    }

    setActiveInactive(feedbackId){        
        return axios.post(this.validateURL(FEEDBACK)+'/feedback/activeinactive/'+feedbackId)
    }





    //end of feedback services

    searchEngine(val) {
        return axios.get("http://tmis1.hyderabad.cdac.in:9200/ngel/_search?q=" + val)
    }

    //assessment services

    getAssignedQuizDetails(courseId, userId, tenant_id) {
        return axios.get(this.validateURL(ASSESSMENT) + '/AssignedQuizdetails?courseId=' + courseId + '&userId=' + userId + '&tenant_id=' + tenant_id);
    }

    getAttemptedQuizDetails(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/getAttemptedQuizDetails', details);
    }

    getAttemptIdAndQuizDetails(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/getAttemptIDAndQuizDetails', details);
    }

    initializeQuiz(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/initializeQuiz', details)
    }

    nextQuestion(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/nextQuestion', details)
    }

    prevQuestion(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/prevQuestion', details)
    }

    questionPalette(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/getRequestedQuestion', details)
    }

    FinishQuizs(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/finishQuiz', details)
    }

    getQuizScore(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/getScore', details);
    }

    ResumeQuiz(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/resumeQuiz', details)
    }

    QuizUpdatePooling(details) {
        return axios.post(this.validateURL(ASSESSMENT) + '/quizUpdatePolling', details)
    }
    //end of assessment services

    // Search Engine Service

    SearchEngineResult(courseIds, tenantid) {
        return axios.get(this.validateURL(SEARCHENGINEURL) + '?courseIds=' + courseIds + '&tenantId=' + tenantid)
    }
    //Discussion forum 

    // getPostValues(courseId, itemid, tenantId) {
    //     return axios.get(this.validateURL(DISCUSSION) + '/post/' + courseId + '/' + itemid + '?tenantId=' + tenantId)
    // }

    getPostValues(courseId, itemid, tenantId) {
        return axios.get(this.validateURL(DISCUSSION) + '/post/' + courseId + '/' + itemid + '?tenantId=' + tenantId)
    }
    setPostValues(tenantid, postValue) {
        return axios.post(this.validateURL(DISCUSSION) + '/post?tenantId=' + tenantid, postValue);
    }
    deletePostValues(id, tenantid) {
        return axios.post(this.validateURL(DISCUSSION) + '/post/deletePost/' + id + '?tenantId=' + tenantid);
    }
    getUpdatePostValues(id, tenantid) {
        return axios.get(this.validateURL(DISCUSSION) + '/post/getByPostId?postId=' + id + '&tenantId=' + tenantid);
    }
    setUpdatePostValues(tenantid, values) {
        return axios.post(this.validateURL(DISCUSSION) + '/post/updatePost/?tenantId=' + tenantid, values)
    }
    getResponseValues(postId, tenantId) {
        return axios.get(this.validateURL(DISCUSSION) + '/response/getByPostId?postId=' + postId + '&tenantId=' + tenantId);
    }
    setResponseValues(tenantid, responseValue) {
        return axios.post(this.validateURL(DISCUSSION) + '/response?tenantId=' + tenantid, responseValue);
    }
    // deleteResponseValues(id, tenantid) {
    //     return axios.post(this.validateURL(DISCUSSION) + '/response/deleteResponse/' + id + '?tenantId=' + tenantid);
    // }
    deleteResponseValues(id, tenantid) {
        return axios.post(this.validateURL(DISCUSSION) + '/response/deleteResponse/' + id + '?tenantId=' + tenantid);
    }
    getUpdateResponseValues(id, tenantid) {
        return axios.get(this.validateURL(DISCUSSION) + '/response/' + id + '?tenantId=' + tenantid);
    }
    // setUpdateResponseValues(tenantid, values) {
    //     return axios.post(this.validateURL(DISCUSSION) + '/response/updateResponse?tenantId=' + tenantid, values);
    // }

    setUpdateResponseValues(tenantid, values) {
        return axios.post(this.validateURL(DISCUSSION) + '/response/updateResponse', values);
    }
    getCommentValues(id, tenantId) {
        return axios.get(this.validateURL(DISCUSSION) + '/comment/getByResponseId?responseId=' + id + '&tenantId=' + tenantId);
    }
    // setCommentValues(tenantid, commentValue) {
    //     return axios.post(this.validateURL(DISCUSSION) + '/comment?tenantId=' + tenantid, commentValue);
    // }
    setCommentValues(tenantid, commentValue) {
        return axios.post(this.validateURL(DISCUSSION) + '/comment/save?tenantId=' + tenantid, commentValue);
    }
    deleteCommentValues(id, tenantid) {
        return axios.post(DISCUSSION + '/comment/deleteComment/' + id + '?tenantId=' + tenantid);
    }
    getUpdateCommentValues(id, tenantid) {
        return axios.get(this.validateURL(DISCUSSION) + '/comment/' + id + '?tenantId=' + tenantid);
    }
    setUpdateCommentValues(tenantid, values) {
        return axios.post(this.validateURL(DISCUSSION) + '/comment/updateComment?tenantId=' + tenantid, values);
    }
    setVote(tenantid, value) {
        return axios.post(this.validateURL(DISCUSSION) + '/vote/?tenantId=' + tenantid, value);
    }
    setReportSpam(tenantid, value) {
        return axios.post(this.validateURL(DISCUSSION) + '/reportspam/?tenantId=' + tenantid, value);
    }

    // Query Form 

    setPostQuestion(tenantid, postValue) {
        return axios.post(this.validateURL(DISCUSSION) + '/disQuestion?tenantId=' + tenantid, postValue);
    }

    getQueryQuestions(courseId, userId) {
        return axios.get(this.validateURL(DISCUSSION) + '/disQuestion/' + courseId + '/' + userId)
    }

    getQueryQuestionByCourseIdAndLearnerId(courseId, userId) {
        return axios.get(this.validateURL(DISCUSSION) + '/disQuestion/getByCourseIdAndLearnerId/' + courseId + '/' + userId)
    }

    deleteQuestion(questionId, tenantid) {
        return axios.post(this.validateURL(DISCUSSION) + '/disQuestion/deleteQuestion/' + questionId + '?tenantId=' + tenantid);
    }

    // Announcement service calls

    AnnouncementByCurrentDataToPublishUpTo() {
        return axios.get(this.validateURL(ANNOUNCEMENT) + '/getAnnouncementByCurrentDateTopublishUpTo/?tenant_id=1');
    }
    courseAnnouncement(courseId, tenantId) {
        return axios.get(this.validateURL(ANNOUNCEMENT) + '/course/' + courseId + '/?tenant_id=' + tenantId)
    }
    createAnnouncement(data) {
        return axios.post(this.validateURL(ANNOUNCEMENT) + '/saveAnnouncement', data);
    }

    getAllGeneralAnnouncementListByAuthor(authorId) {
        return axios.get(this.validateURL(ANNOUNCEMENT) + '/getAllGeneralAnnouncementListByAuthor/' + authorId);
    }

    getAllCourseAnnouncementListByAuthor(authorId, courseId) {
        return axios.get(this.validateURL(ANNOUNCEMENT) + '/getAllCourseAnnouncementListByAuthor/' + authorId + '/' + courseId);
    }

    deleteAnnouncement(id) {
        return axios.post(this.validateURL(ANNOUNCEMENT) + '/delete/' + id);
    }

    updateAnnouncement(id, data) {
        return axios.post(this.validateURL(ANNOUNCEMENT) + '/' + id, data)
    }

    // learning analytics

    //Action Controller

    saveUserActionDetails(browserName, os, resolution, userid, ipaddress, sessionId) {
        // return axios.post(this.validateURL(LEARNING_ANALYTICS) + 'saveuseractiondetails?emailID=' + emailid + '&ipaddress=' + ipaddress + '&action=' + action +
        //     '&config_os=' + os + '&config_resolution=' + resolution + '&config_browser=' + browserName + '&actionresult=' + result +
        //     '&siteId=' + siteid + '&sessionId=' + sessionId)

        return axios.post(this.validateURL(LEARNING_ANALYTICS) +'/lauseractionlogin/'+ browserName + '/' + os + '/' + resolution + '/' + userid + '/' + ipaddress + '/'+ sessionId )
    }

    updateUserActionDetails(userid, sessionid) {
        return axios.post(this.validateURL(LEARNING_ANALYTICS) + '/lauseractionlogout/' + userid + '/' + sessionid);
    }

    getAllActions(){
        return axios.get(this.validateURL(LEARNING_ANALYTICS) + '/lauseraction');
    }


    // Content Visit Controller

    getContentVisitById(userid,courseId){
       return axios.get(this.validateURL(LEARNING_ANALYTICS) + '/contentaccess/' + userid + '/' + courseId);
    }

    getContentVisitList(){
        return axios.get(this.validateURL(LEARNING_ANALYTICS) + '/lacontentvisit');
    }

    saveContentVisit(userid, courseId, resid, restitle, sessionId, fileType){
        return axios.post(this.validateURL(LEARNING_ANALYTICS) + '/lacontentvisitintime/' + userid + '/' + courseId + '/' + resid + '/' + restitle + '/' + sessionId + '/' + fileType);
    }

    updateContentVisitOutTime(userid, sessionId){

        return axios.post(this.validateURL(LEARNING_ANALYTICS) + '/lacontentvisitouttime/' + userid + '/' + sessionId);
    }

    getTotalTimeSpentOnContent(userid, courseId){

        return axios.get(this.validateURL(LEARNING_ANALYTICS) + '/timespent/' + userid + '/' + courseId);
    }

    getTimeSpentOnContents(userid, courseId){
        return axios.get(this.validateURL(LEARNING_ANALYTICS)+ '/timespentres/' + userid + '/' + courseId);
    }

    getCourseViewCount(courseId) {
        return axios.get(this.validateURL(LEARNING_ANALYTICS)+ '/getviewcountbycourseid/' + courseId);
    }

    getViewCount() {
        return axios.get(this.validateURL(LEARNING_ANALYTICS)+ '/getviewcount');
    }

    // learning analytics end


    //testimonial 
    addTestimonial(value) {
        return axios.post(this.validateURL(TESTIMONIAL), value);
    }

    getTestimonial() {
        return axios.get(this.validateURL(TESTIMONIAL) + '/getApprovedTestimonial');
    }

    //number of counts on homepage

    getNumberOfCounts() {
        return axios.get(this.validateURL(NUMBEROFCOUNTS));
    }

    //Get upcoming_events

    getUpcomingActivEvents() {
        // alert("inside the service")
        return axios.get(this.validateURL(UPCOMINGEVENTS_URL));
    }
    // get all upcomming Event List in admin-panal
    getAllEventList(){
        return axios.get(this.validateURL(UPCOMINGEVENTS_URL)+'/getAll')
    }

    // detele particular event
    deleteEvent(eventId){
        return axios.post(this.validateURL(UPCOMINGEVENTS_URL)+`/${eventId}`)
    }

    //Add Event (Done by Admin)
    addEvent(eventData){
        return axios.post(this.validateURL(UPCOMINGEVENTS_URL),eventData);
    }

    // Update Event (Done by Admin)
    // updateEvent(description,eventDate,eventId,location,time,title){
    //     //console.log(eventId)
    //     return axios.post(this.validateURL(UPCOMINGEVENTS_URL)+`?description=${description}&eventDate=${eventDate}&eventId=${eventId}&location=${location}&time=${time}&title=${title}`)
    // }
    updateEvent(updateData){
        //console.log(updateData);
        return axios.post(this.validateURL(UPCOMINGEVENTS_URL) +`/updateEvent`,updateData)
        // return axios.post(this.validateURL(UPCOMINGEVENTS_URL)+`?description=${description}&eventDate=${eventDate}&eventId=${eventId}&location=${location}&time=${time}&title=${title}`)
    }


    //Get news_letter

    getnewsletterdetails(newsletterdetails) {
        return axios.post(this.validateURL(UPCOMINGEVENTS_URL) + '/subscribe', newsletterdetails);
    }

    // certificate Generate
    // getCertificateGenerate(tenantId, courseId, emailId, username) {
    //     return axios.post(CERTIFICATE_URL + '?tenantId=' + tenantId + '&courseId=' + courseId + '&emailId=' + emailId + '&name=' + username)

    // }

    //assignment services

    getAssignmentDetails(courseId, tenantId) {
        return axios.get(this.validateURL(ASSIGNMENT) + '/getassgndetails?course_id=' + courseId, {
            headers: {
                'tenant_id': + tenantId
            }
        });
    }

    assignmentupload(file, userid, courseId, assignmentId, tenantId) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", userid)
        formData.append("course_id", courseId);
        formData.append("assgn_id", assignmentId);
        //formData.append("tenant_id", tenantId);

        return axios.post(this.validateURL(ASSIGNMENT) + '/docupload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'tenant_id': + tenantId
            },
        });
    }

    getAssignmentScoreDetails(courseid, tenantid, userid) {
        return axios.get(this.validateURL(ASSIGNMENT) + '/getassgnscoredetails?course_id=' + courseid + '&user_id=' + userid, {
            headers: {
                'tenant_id': + tenantid
            }
        });
    }

    // Instructor data fatch
    getInstructorDetails(courseId, tenantId) {
        return axios.get(this.validateURL(GET_COURSES) + '/getInstructorByCourseId?courseId=' + courseId + '&tenantId=' + tenantId)
    }

    getAllInstructorsDetails() {
        return axios.get(this.validateURL(BASE_URL) + 'learner/getallmeghinst')
    }

    //New Discussion
    getCourseDiscussionDetails(courseId, tenantId, userId) {
        return axios.get(this.validateURL(NEW_DISCUSSION) + '/getResponseValues?courseId=' + courseId + '&tId=' + tenantId + '&userId=' + userId + '&roleId=1');
    }

    getAllPostInfo(postId, tenantId) {
        return axios.get(this.validateURL(NEW_DISCUSSION) + '/getAllPostInfo?postId=' + postId + '&tenantId=' + tenantId);
    }

    getDiscussionsByItem(itemId, tenantId, userId) {
        return axios.get(this.validateURL(NEW_DISCUSSION) + '/getItemDiscussions?itemId=' + itemId + '&tenantId=' + tenantId + '&userId=' + userId + '&roleId=1');
    }

    addDiscussion(title, courseId, userId, posttext, tenantId, item, username) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/addDiscussion?posttype=Discussion&title=' + title + '&courseId=' + courseId + '&userId=' + userId + '&posttext=' + posttext + '&tId=' + tenantId + '&item=' + item + '&username=' + username);
    }

    addResponse(postId, responseTextValue, userId, username, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/addResponse?postid=' + postId + '&responseText=' + responseTextValue + '&userId=' + userId + '&username=' + username + '&tenantId=' + tenantId);
    }

    addComment(responseId, commentTextValue, userId, username, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/addComment?responseId=' + responseId + '&commentText=' + commentTextValue + '&userid=' + userId + '&username=' + username + '&tenantId=' + tenantId);
    }

    updateDiscussion(postId, editedText, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/editPost?postid=' + postId + '&editedPostText=' + editedText + '&tenantId=' + tenantId);
    }

    updateResponse(responseId, editedText, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/editResponse?responseId=' + responseId + '&responseText=' + editedText + '&tenantId=' + tenantId);
    }

    updateComment(commentId, editedText, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/editComment?commentId=' + commentId + '&commentText=' + editedText + '&tenantId=' + tenantId);
    }

    deleteDiscussion(postId, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/deletePost?postid=' + postId + '&tenantId=' + tenantId);
    }

    deleteResponse(responseId, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/deleteResponse?responseId=' + responseId + '&tenantId=' + tenantId);
    }

    deleteComment(commentId, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/deleteComment?commentId=' + commentId + '&tenantId=' + tenantId);
    }

    postSpamValue(postId, userId, spamValue, tenantId) {
        return axios.post(this.validateURL(NEW_DISCUSSION) + '/postreportspam?sid=' + postId + '&userId=' + userId + '&spamValue=' + spamValue + '&sValue=' + '' + '&tenantId=' + tenantId);
    }


    // user dashbord api calling

    userLoginDuration(userId) {
        return axios.get(this.validateURL(USER_DASHBOARD) + '/getUserLogoutDetails/' + userId);
    }

    userContentAccessDur(userId) {
        return axios.get(this.validateURL(USER_DASHBOARD) + '/userContentDetails/' + userId);
    }

    requestForInstructor(userId) {
        return axios.post(this.validateURL(BASE_URL)+ "UserRequestinstructor/" + userId);
    }

    checkInstructorRequest(userID){
        return axios.get(this.validateURL(BASE_URL)+"UserRequestinstructorStatus/"+userID);
    }

    paymentDetailSave(userId, courseId, tenantId){
        return axios.post(this.validateURL(PAYMENT)+"saveNewDetails/"+ userId +"/"+ courseId + "/" + tenantId);
    }

    
    getPaymentDetailsbyOrderId(orderId, generatedOrderId){
        return axios.get(this.validateURL(PAYMENT)+"getPaymentDetailsbyOrderId/"+ orderId + "/" +generatedOrderId);
    }

    getOrderId(fees, orderId){
        return axios.post(this.validateURL(PAYMENT)+"getOrderID/"+ fees +"/"+ orderId);
    }

    updateRazorOrderid(orderId, razorOrderId){
        return axios.post(this.validateURL(PAYMENT)+"updateOrderID/"+ orderId +"/"+ razorOrderId);
    }

    updateRazorpayDetails(orderId, paymentId, paymentSignature){
        return axios.post(this.validateURL(PAYMENT)+"updateRazorpayDetails/"+ orderId +"/"+ paymentId + "/" + paymentSignature);
    }

    getPaymentDetails(userId, courseId, tenantId){
        return axios.get(this.validateURL(PAYMENT)+"getPaymentDetails/" + userId + "/" + courseId + "/" + tenantId);
    }

    getCoursePaymentDetailsByDate(courseId, fromDate, toDate){
        return axios.get(this.validateURL(PAYMENT)+"paymentBydaterange/"+`${courseId}?fromdate=${fromDate}&todate=${toDate}`)
    }

    //Quiz Services


    quizReport(userId, courseId){
        
        return axios.get(this.validateURL(QUIZRESULT)+"assign/get/getAssignedQuizzes/" + userId + "/" + courseId);
    }
    getQuizCompleteResult(data){

        return axios.post(this.validateURL(QUIZCOMPLETERESULT)+"delivery/get/getListOfDeliveryContentByUserAndQuizId/" , data);
    }

    // Completion Criteria

    courseCompletionMaster(courseCompletion){
        
        return axios.post(this.validateURL(ACTIVITYCOMPLETION)+"coursecompletionmaster/" , courseCompletion);
    }

    addUpdateA_Restriction_Completion_CriteriaMaster(course_A_Completion){

        return axios.post(this.validateURL(ACTIVITYCOMPLETION)+"coursecompletioncriteria/addUpdateActivityRestrictionAndCompletionAndCriteriaMaster" , course_A_Completion);
    }

    courseActivitiesStatus(userId, courseId ){

        return axios.get(this.validateURL(ACTIVITYCOMPLETION)+"useractivitystatus/courseActivitiesStatus?userId=" + userId +"&ccId="+ courseId);
    }




}
export default new service()

