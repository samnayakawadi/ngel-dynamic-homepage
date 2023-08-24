import axios from "axios";

const COURSE_URL = "http://10.244.3.218:8082/courseOrganizer/";
//const COURSE_URL = "http://10.244.3.218:8082/courseOrganizer/";


const DMS_URL = "http://10.244.3.218:8080/dms/";
//const DMS_URL = "http://10.244.3.218:8080/dms/";




//dms is document management service

class instructorService {

    /* Category Services Start here  */

    addCourseCategory(data) {
        return axios.post(COURSE_URL + "addCategory", data);
    }

    getAllCourseCategory() {
        return axios.get(COURSE_URL + "getAllCategories");
    }

    deleteCategory(categoryId) {
        return axios.post(COURSE_URL + "deleteCategory/" + categoryId);
    }

    editCategory(data) {
        return axios.post(COURSE_URL + "updateCategory", data);
    }
    /* Category Services End here  */

    /* Course Create Services Start */

    createCourse(feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal, durationVal , type , durationSelectVal, publishDateVal, enrollStartDateVal, enrollEndDateVal,
        commencementDateVal, courseIcon,iconsig, banner,bannersig, video,videosig, instructorProfile, Objective, gDetails, prerequisite, isScormCompliant, userId, fee_discount) {
        let formData = new FormData();
        formData.append("courseType", feeSelectVal);
        if (feeSelectVal == "free" || feeSelectVal == "restricted") {
            formData.append("courseFee", 0);
        } else {
            formData.append("courseFee", courseFeeVal);
        }
        formData.append("courseName", courseNameVal);
        formData.append("categoryId", courseCategoryVal);
        formData.append("courseAccessType", durationSelectVal);
        if (durationSelectVal == "unlimited") {
            formData.append("duration", 0);
        } else {
            formData.append("duration", durationVal);
        }
        formData.append("publishDate", publishDateVal);
        formData.append("enrollSdate", enrollStartDateVal);
        formData.append("enrollEdate", enrollEndDateVal);
        formData.append("commencementDate", commencementDateVal);
        formData.append("file", courseIcon);
        formData.append("filesig", iconsig);
        formData.append("video", video);
        formData.append("videosig", videosig);
        formData.append("banner", banner);
        formData.append("bannersig", bannersig);
        // type 1 is for Course and 2 for library 
        formData.append("type", type);
        if (gDetails == '') {
            formData.append("generalDetails", undefined);
        } else {
            formData.append("generalDetails", gDetails);
        }
        if (prerequisite == '') {
            formData.append("prerequisite", undefined);
        } else {
            formData.append("prerequisite", prerequisite);
        }
        if (Objective == '') {
            formData.append("objective", undefined);
        } else {
            formData.append("objective", Objective);
        }
        formData.append("inst_profile", instructorProfile);
        formData.append("isScormCompliant", isScormCompliant);
        formData.append("userId", userId);
        formData.append("fee_discount", fee_discount);
        // console.log("formData", formData);
        return axios.post(COURSE_URL + "addCourse/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    updateCourse(feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal, durationVal, durationSelectVal, publishDateVal, enrollStartDateVal, enrollEndDateVal,
        commencementDateVal, courseIcon,iconsig, banner,bannersig, video,videosig, instructorProfile, Objective, gDetails, prerequisite, isScormCompliant, userId, courseId, fee_discount) {
        // console.log("phlesasasasasas", feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal, durationVal, durationSelectVal, publishDateVal, enrollStartDateVal, enrollEndDateVal,
        //     commencementDateVal, courseIcon, banner, video, instructorProfile, Objective, gDetails, prerequisite, isScormCompliant, userId, courseId, fee_discount)
        let formData = new FormData();
        formData.append("courseType", feeSelectVal);
        if (feeSelectVal == "free" || feeSelectVal == "restricted") {
            formData.append("courseFee", 0);
        } else {
            formData.append("courseFee", courseFeeVal);
        }
        formData.append("courseName", courseNameVal);
        formData.append("categoryId", courseCategoryVal);
        formData.append("courseAccessType", durationSelectVal);
        if (durationSelectVal == "unlimited") {
            formData.append("duration", 0);
        } else {
            formData.append("duration", durationVal);
        }
        formData.append("publishDate", publishDateVal);
        formData.append("enrollSdate", enrollStartDateVal);
        formData.append("enrollEdate", enrollEndDateVal);
        formData.append("commencementDate", commencementDateVal);
        formData.append("file", courseIcon);
        formData.append("filesig", iconsig);
        formData.append("video", video);
        formData.append("videosig", videosig);
        formData.append("banner", banner);
        formData.append("bannersig", bannersig);
        if (gDetails == '') {
            formData.append("generalDetails", undefined);
        } else {
            formData.append("generalDetails", gDetails);
        }
        if (prerequisite == '') {
            formData.append("prerequisite", undefined);
        } else {
            formData.append("prerequisite", prerequisite);
        }
        if (Objective == '') {
            formData.append("objective", undefined);
        } else {
            formData.append("objective", Objective);
        }
        formData.append("inst_profile", instructorProfile);
        formData.append("isScormCompliant", isScormCompliant);
        formData.append("userId", userId);
        formData.append("courseId", courseId)
        formData.append("fee_discount", fee_discount);
        // console.log("bad me", feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal, durationVal, publishDateVal, enrollStartDateVal, enrollEndDateVal,
        //     commencementDateVal, courseIcon, Objective, gDetails, prerequisite, isScormCompliant, userId, courseId);
        return axios.post(COURSE_URL + "updateCourse/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

    }

    getAllCourses() {
        return axios.get(COURSE_URL + "getCourses")
    }

    getCourseById(cId) {
        return axios.get(COURSE_URL + "getCourses/" + cId);
    }

    getLibraryById(cId) {
        return axios.get(COURSE_URL + "getLibraries/" + cId);
    }

    getLibraryContent(id){
        return axios.get(COURSE_URL+`getInstLibraryStructure/${id}`);
    }

    /* Course Create Services End */

    /* Create Course Structure and Get All Code Start Here */


    contentDetails(dir_id, user_id) {
        return axios.get(DMS_URL + "getContentDetails/" + dir_id + "/" + user_id);
    }


    createDirectory(data) {
        return axios.post(DMS_URL + "addRootDirectory/", data);
    }

    createChildDirectory(data) {
        return axios.post(DMS_URL + "addChildDirectory/", data)
    }

    getFolderStructure(userId) {
        return axios.get(DMS_URL + "getDirectories/" + userId);
    }

    fileUpload(file,filesig, user_id, dir_name, durationInMinutes, contentName, fileSelectedOption, checkBox) {
        //console.log(file);
        let formData = new FormData();
        formData.append("file", file);
        formData.append("fileSig", filesig);
        formData.append("user_id", user_id)
        formData.append("dir_name", dir_name);
        formData.append("durationInMinutes", durationInMinutes);
        formData.append("contentName", contentName);
        formData.append("zipStatus", checkBox);
        formData.append("fileSelectedOption",fileSelectedOption);
         return axios.post(DMS_URL + "fileUpload/", formData, {
             headers: {
                 "Content-Type": "multipart/form-data",
             }
         })
            // return axios.post(DMS_URL + "fileUploadmediacms/", formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     }
            // })
    }

    // fileUpload(file,filesig, user_id, dir_name, durationInMinutes, contentName, fileSelectedOption, checkBox) {
    //     //console.log(file);
    //     let formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("fileSig", filesig);
    //     formData.append("user_id", user_id)
    //     formData.append("dir_name", dir_name);
    //     formData.append("durationInMinutes", durationInMinutes);
    //     formData.append("contentName", contentName);
    //     formData.append("zipStatus", checkBox);
    //     formData.append("fileSelectedOption",fileSelectedOption);
    //     return axios.post(DMS_URL + "fileUploadmediacms/", formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         }
    //     })
    // }

    contentDetails(dir_id, user_id) {
        return axios.get(DMS_URL + "getContentDetails/" + dir_id + "/" + user_id);
    }

    deleteDirectory(data) {
        return axios.post(DMS_URL + "deleteDirectory", data);
    }

    directoryStatusCheck(dirId) {
        return axios.post(DMS_URL + "directoryStatusCheck/" + dirId)
    }

    contentDelete(contentId) {
        return axios.post(DMS_URL + "deleteContent/" + contentId);
    }

    fileCotentDetailsUpdate(data) {
        return axios.post(DMS_URL + "updateContent", data)
    }

    folderNameUpdate(data) {
        return axios.post(DMS_URL + "updateDirectory", data);
    }

    contentAccess(url) {
        return axios.get(url);
    }

    getContentAccess(url){
        return axios.get(`http://10.244.3.218:8080/${url}`)
    }

    /* Create Course Structure and Get All Code Start Here */

    /* Course Structure API Methods */

    addContentToCourseStructure(data) {
        return axios.post(COURSE_URL + "addContent", data)
    }

    checkContentStatus(contentId) {
        return axios.get(COURSE_URL + "contentStatusCheck/" + contentId);
    }

    deleteCourseContent(data) {
        return axios.post(COURSE_URL + "deleteContent", data);
    }

    deleteCourseStructureChild(data) {
        return axios.post(COURSE_URL + "deleteChild", data);
    }

    addModuleOrTopic(data) {
        return axios.post(COURSE_URL + "addChild", data);
    }

    courseDelete(id) {
        return axios.post(COURSE_URL + "deleteCourse/" + id);
    }

    updateFolderDetails(data) {
        return axios.post(COURSE_URL + "updateChild", data);
    }

    updateContentDetails(data) {
        return axios.post(COURSE_URL + "updateContent", data);
    }

    coursePublish(cId) {
        return axios.post(COURSE_URL + "publishCourse/" + cId);
    }

    LibraryPublish(cId) {
        return axios.post(COURSE_URL + "publishLibrary/" + cId);
    }

    coursePublishAdminRequest(cId) {
        return axios.post(COURSE_URL + "requestAdminforPublishCourse/" + cId);
    }

    libraryPublishAdminRequest(cId) {
        return axios.post(COURSE_URL + "requestAdminforPublishLibrary/" + cId);
    }

    ContentPublishAdminRequest(cId) {
        return axios.post(COURSE_URL + "requestAdminforPublishContent/" + cId);
    }

    LibraryDisableStatus(cId){
        return axios.post(COURSE_URL + "LibraryDisableStatus/" + cId);
    }

    courseUnPublish(cId) {
        return axios.post(COURSE_URL + "UnPublishCourse/" + cId);
    }

    libraryUnPublish(cId) {
        return axios.post(COURSE_URL + "UnPublishLibrary/" + cId);
    }

    // libraryUnPublish(cId) {
    //     return axios.post(COURSE_URL + "UnPublishLibrary/" + cId);
    // }

    CourseDisable(cId) {
        return axios.post(COURSE_URL + "CourseDisableStatus/" + cId);
    }

    LibraryDisable(cId) {
        return axios.post(COURSE_URL + "LibraryDisableStatus/" + cId);
    }
    //  get time and date call this api

    getServerTime() {
        return axios.get(COURSE_URL + "getSystemDate/");
    }

    /////  Library  Services   ///

    addLibrary(data1){
        return axios({
            method : "POST",
            url : COURSE_URL+`addLibrary`,
            data : data1,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }) 

    }


}

export default new instructorService()