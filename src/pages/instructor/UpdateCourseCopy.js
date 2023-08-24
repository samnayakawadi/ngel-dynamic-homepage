import React, { useState, useEffect } from 'react';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import HeaderTwo from '../../components/HeaderTwo';
import { Styles } from './styles/AddCourseCategory';
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import instructorService from '../../services/instructorService';
import $ from 'jquery';
import { CKEditor } from 'ckeditor4-react';
import './styles/createcourse.css';
import swal from 'sweetalert';
import ReactHtmlParser from 'react-html-parser';
import UserService from '../../services/UserService';

function UpdateCourseCopy(props) {

    useEffect(() => {
        UserService.generateToken();
       }, []);


    let courseId = props.match.params.cId;
    const [getCourseDetails, setCourseDetails] = useState([]);
    const [coursePeditorState, setCoursePEditorState] = useState();
    const [courseDeditorState, setCourseDEditorState] = useState();
    const [courseOeditorState, setCourseOEditorState] = useState();
    const [geteSdate, seteSdate] = useState('');
    const [getFeeSelect, setFeeSelect] = useState();
    const [successCourse, setSuccessCourse] = useState();
    const [getPublishDate, setPublishDate] = useState('');
    const [getEnrollmentStartDate, setEnrollmentStartDate] = useState('');
    const [getenrollEndDate, setenrollEndDate] = useState('');
    const [getcommenceDate, setcommenceDate] = useState('');
    const [getProcessing, setProcessing] = useState(false);
    const [getDurationSelect, setDurationSelect] = useState();

    const um_api = UserService.USER_API;
    ////console.log(um_api);

    const feeSelect = (e) => {
        setFeeSelect(e.target.value);
    }

    const durationSelect = (e) => {
        setDurationSelect(e.target.value);
    }

    const [getCourseCat, setCourseCat] = useState([]);
    useEffect(() => {
        instructorService.getAllCourseCategory()
            .then(res => {
                setCourseCat(res.data);
            }).catch(err => {
                //console.log(err);
            })
    }, [])



    const [getabc, setabc] = useState(
        {
            selectedFiles: undefined,
            currentFile: undefined,
            file: '',
        }
    )

    const [getBanner, setBanner] = useState(
        {
            selectedFiles: undefined,
            currentFile: undefined,
            file: '',
        }
    )

    const [getVideo, setVideo] = useState(
        {
            selectedFiles: undefined,
            currentFile: undefined,
            file: '',
        }
    )



    const InstructorCourseData = async () => {
        try {
            let res = await instructorService.getCourseById(courseId)
            setCourseDetails(res.data);
            setPublishDate(`${dateConvertToTformate(res.data.publishDate)}`);
            setEnrollmentStartDate(`${dateConvertToTformate(res.data.enrollStartDate)}`);
            setenrollEndDate(`${dateConvertToTformate(res.data.enrollEndDate)}`);
            setcommenceDate(`${dateConvertToTformate(res.data.commenceDate)}`);
            setFeeSelect(res.data.courseType);
            setCourseDEditorState(res.data.generalDetails);
            setCoursePEditorState(res.data.prerequisite);
            setCourseOEditorState(res.data.objective);
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        InstructorCourseData()
    }, [])

    // useEffect(() => {
    //     instructorService.getCourseById(courseId)
    //         .then(res => {
    //             setCourseDetails(res.data);
    //             setPublishDate(`${dateConvertToTformate(res.data.publishDate)}`);
    //             setEnrollmentStartDate(`${dateConvertToTformate(res.data.enrollStartDate)}`);
    //             setenrollEndDate(`${dateConvertToTformate(res.data.enrollEndDate)}`);
    //             setcommenceDate(`${dateConvertToTformate(res.data.commenceDate)}`);
    //             setFeeSelect(res.data.courseType);
    //             setCourseDEditorState(res.data.generalDetails);
    //             setCoursePEditorState(res.data.prerequisite);
    //             setCourseOEditorState(res.data.objective);
    //         }).catch(err => {
    //             //console.log(err);
    //         })
    // }, [])


    // const [count, setCount] = useState(1);
    // const next = (arr) => {
    //     $('#progress-bar li:not(.active):first').addClass('active');

    // }
    // const prev = () => {
    //     $('#progress-bar li.active:last').removeClass('active');
    // }

    // const onSelectChangeHandlerForDuration = (e)=>{
    //     durationSelect(e);
    //     if(e.target.value === "limited"){
    //         getDurationSelect === "1825" && setDurationSelect(0);
    //     }
    // }

    const [getIconImg, setIConImg] = useState([]);
    const courseIcon = (e) => {
        e.preventDefault();
        const courseIcon = document.getElementById("course_icon");
        var files = courseIcon.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                const fsize = files.item(i).size;
                const file = Math.round((fsize / 100));
                // The size of the file.
                if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
                    if (file >= 500) {
                        swal("Warning!", "File size exceeded Max Size 100 KB!!", "warning");
                    } else {
                        let reader = new FileReader();
                        let file = e.target.files[0];
                        reader.onloadend = () => {
                            setIConImg({
                                file: file,
                                imagePreviewUrl: reader.result
                            });
                        }
                        reader.readAsDataURL(file)
                    }
                } else {
                    swal("Warning!", "Please select a valid image", "warning");
                }
            }
        }
        setabc({
            selectedFiles: e.target.files,
        });
    }


    const [getBannerImg, setBannerImg] = useState([]);
    const courseBanner = (e) => {
        e.preventDefault();
        const courseBanner = document.getElementById("course_banner");
        var files = courseBanner.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                const fsize = files.item(i).size;
                const file = Math.round((fsize / 1024));
                // The size of the file.
                if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
                    ////console.log("fileaaa", file)
                    if (file >= 100) {
                        swal("Warning!", "Course Banner size exceeded Max Size 100 KB!!", "warning");
                    } else {
                        let reader = new FileReader();
                        let file = e.target.files[0];
                        reader.onloadend = () => {
                            setBannerImg({
                                file: file,
                                imagePreviewUrl: reader.result
                            });
                        }
                        reader.readAsDataURL(file)
                    }
                } else {
                    swal("Warning!", "Please select a valid image", "warning");
                }
            }
        }
        setBanner({
            selectedFiles: e.target.files,
        });
    }

    const [getVideoState, setVideoState] = useState(true);
    const [getIntroVideo, setIntroVideo] = useState([]);
    const courseVideo = (e) => {
        setVideoState(false)
        e.preventDefault();
        const courseVideo = document.getElementById("course_video");
        const video = document.getElementById('video');
        const videoSource = document.createElement('source');
        var files = courseVideo.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                const fsize = files.item(i).size;
                const file = Math.round((fsize / 1024));
                // The size of the file.
                if (files[i].type === "video/mp4" || files[i].type === "video/ogg" || files[i].type === "video/webm") {
                    ////console.log("fileaaa", file)
                    if (file >= 10240) {
                        swal("Warning!", "Course Introduction video size exceeded Max Size 10 MB!!", "warning");
                    } else {
                        let reader = new FileReader();
                        let file = e.target.files[0];
                        let file1 = e.target.files[0];
                        reader.onloadend = (file) => {
                            videoSource.setAttribute('src', file.target.result);
                            video.appendChild(videoSource);
                            video.load();
                            video.play();
                            setIntroVideo({
                                file: file1,
                                videoPreviewUrl: reader.result
                            });
                        }
                        reader.readAsDataURL(file)
                    }
                } else {
                    swal("Warning!", "Please select a valid image", "warning");
                }
            }
        }
        setVideo({
            selectedFiles: e.target.files,
        });
    }


    const courseDeditorHandler = (evt) => {
        if (evt.editor.getData() == '') {
            setCourseDEditorState(undefined);
        } else {
            setCourseDEditorState(evt.editor.getData());
        }

    }
    const coursePeditorHandler = (evt) => {
        if (evt.editor.getData() == '') {
            setCoursePEditorState(undefined)
        } else {
            setCoursePEditorState(evt.editor.getData());
        }
    }
    const courseOeditorHandler = (evt) => {
        if (evt.editor.getData() == '') {
            setCourseOEditorState(undefined)
        } else {
            setCourseOEditorState(evt.editor.getData());
        }
    }

    $(document).ready(function () {
        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;
        var current = 1;
        var steps = $("fieldset").length;

        $(".next").click(function () {
            let status = true;
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();

            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 500
            });
        });

        $(".previous").click(function () {

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();

            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({ 'opacity': opacity });
                },
                duration: 500
            });
        });

        $(".submit").click(function () {
            return false;
        })

    });


    // const onBlurCourseSelect = () => {
    //     const courseSelect = document.getElementById("courseSelect");
    //     const courseSelectVal = courseSelect.value.trim();
    //     if (courseSelectVal === "") {
    //         setError(courseSelect, ("Select Course Type"));
    //     } else {
    //         setSuccess(courseSelect);
    //     }
    // }
    const onBlurFeeSelect = () => {
        const feeSelect = document.getElementById("feeSelect");
        const feeSelectVal = feeSelect.value.trim();
        if (feeSelectVal === "") {
            setError(feeSelect, ("Select Fee Type"));
        } else {
            setSuccess(feeSelect);
        }
    }

    const onBlurDurationSelect = () => {
        const durationSelect = document.getElementById("durationSelect");
        const durationSelectVal = durationSelect.value.trim();
        if (durationSelectVal === "" || durationSelectVal === "select") {
            setError(durationSelect, ("Select Duration "));
        } else {
            setSuccess(durationSelect);
        }
    }

    // const [courseFeeVal, setCourseFeeVal] = useState()
    // const onBlurFeeHandler = () => {
    //     if (getFeeSelect == "paid") {
    //         const courseFee = document.getElementById("course_fee");
    //         courseFeeVal = courseFee.value.trim();
    //         if (courseFeeVal === "") {
    //             setError(courseFee, ("Enter Course Cost"));
    //         } else {
    //             setSuccess(courseFee);
    //         }
    //     } else {
    //         setCourseFeeVal = 0;
    //     }
    // }

    const onBlurFeeHandler = () => {
        const courseFee = document.getElementById("course_fee");
        const courseFeeVal = courseFee.value.trim();
        if (courseFeeVal === "") {
            setError(courseFee, ("Enter Course Cost"));
        } else {
            setSuccess(courseFee);
        }
    }
    const [getValidationFlag, setValidationFlag] = useState();
    function validateInstructorProfile() {
        const instructorProfile = document.getElementById("instructor_profile");
        const instructorProfileVal = instructorProfile.value.trim();
        if (instructorProfileVal === "") {
            setValidationFlag(false)
            return setError(instructorProfile, ("Enter Instructor Profile"));
        } else {
            setValidationFlag(true);
            return setSuccess(instructorProfile);
        }
    }
    const onBlurInstructorProfileHandler = () => {
        validateInstructorProfile();
    }

    const onBlurCourseNameHandler = () => {
        const courseName = document.getElementById("course_name");
        const courseNameVal = courseName.value.trim();
        if (courseNameVal === "") {
            setError(courseName, ("Enter Course Name"));
        } else {
            setSuccess(courseName);
        }
    }
    const onBlurCourseCatSelect = () => {
        const courseCategory = document.getElementById("course_category");
        const courseCategoryVal = courseCategory.value.trim();
        if (courseCategoryVal === "") {
            setError(courseCategory, ("Select Course Category"));
        } else {
            setSuccess(courseCategory);
        }
    }
    const onBlurDurationHandler = () => {
        const duration = document.getElementById("duration");
        const durationVal = duration.value.trim();
        // //console.log(durationVal);
        if (durationVal === "") {
            setError(duration, ("Enter Duration"));
        } else {
            setSuccess(duration);
        }
    }
    const onBlurPublishDateHandler = () => {
        const publishDate = document.getElementById("publish_date");
        const publishDateVal = publishDate.value.trim();
        const pDate = new Date(publishDateVal);
        const cDate = new Date(getPublishDate);
        setPublishDate(publishDateVal);
        if (publishDateVal === "") {
            setError(publishDate, ("Enter Publish Date"));
        } else if (pDate >= cDate) {
            setSuccess(publishDate);
        }
        else {
            setError(publishDate, ("Enter Valid Publish Date"));
        }
    }
    const onBlurEnrolStartDateHandler = () => {
        const enrollStartDate = document.getElementById("enroll_start_date");
        const enrollStartDateVal = enrollStartDate.value.trim();
        seteSdate(enrollStartDateVal);
        const eSdate = new Date(enrollStartDateVal);
        const pDate = new Date(getPublishDate);
        if (enrollStartDateVal === "") {
            setError(enrollStartDate, ("Enter Enrollment Start Date"));
        } else if (eSdate > pDate) {
            setSuccess(enrollStartDate);
        }
        else {
            setError(enrollStartDate, ("Enter Valid Start Date"));
        }
    }

    const onBlurEnrolEndDateHandler = () => {
        const enrollEndDate = document.getElementById("enroll_end_date");
        const enrollEndDateVal = enrollEndDate.value.trim();
        const eEdate = new Date(enrollEndDateVal);
        const pDate = new Date(getPublishDate);
        const eSdate = new Date(geteSdate);
        if (enrollEndDateVal === "") {
            setError(enrollEndDate, ("Enter Enrollment End Date"));
        } else if (eEdate > pDate && eEdate >= eSdate) {
            setSuccess(enrollEndDate);
        }
        else {
            setError(enrollEndDate, ("Enter Valid Enrollment Date"));
        }
    }

    const onBlurCommencementdateHandler = () => {
        const commencementDate = document.getElementById("commencement_date");
        const commencementDateVal = commencementDate.value.trim();
        const pDate = new Date(getPublishDate);
        const commenceDate = new Date(commencementDateVal);
        const eSdate = new Date(geteSdate);
        if (commencementDateVal === "") {
            setError(commencementDate, ("Enter Commencement Date"));
        } else if (commenceDate > pDate && eSdate < commenceDate) {
            setSuccess(commencementDate);
        } else {
            setError(commencementDate, ("Enter Valid Commencement Date"))
        }
    }


    function formSubmit(e) {
        e.preventDefault();
        let status = true;
        // const courseSelect = document.getElementById("courseSelect");
        // const courseSelectVal = courseSelect.value.trim();
        // if (courseSelectVal === "") {
        //     setError(courseSelect, ("Select Course Type"));
        //     status = false;
        // } else {
        //     setSuccess(courseSelect);
        // }

        const feeSelect = document.getElementById("feeSelect");
        const feeSelectVal = feeSelect.value.trim();
        if (feeSelectVal === "") {
            setError(feeSelect, ("Select Fee Type"));
            status = false;
        } else {
            setSuccess(feeSelect);
        }


        let courseFeeVal = null;
        const courseFee = document.getElementById("course_fee");
        if (getFeeSelect == "paid") {
            courseFeeVal = courseFee.value.trim();
            if (courseFeeVal === "") {
                setError(courseFee, ("Enter Course Cost"));
                status = false;
            } else {
                setSuccess(courseFee);
            }
        } else {
            courseFeeVal = 0;
        }



        // const courseFee = document.getElementById("course_fee");
        // const courseFeeVal = courseFee.value.trim();
        // if (courseFeeVal === "") {
        //     setError(courseFee, ("Enter Course Cost"));
        //     status = false;
        // } else {
        //     setSuccess(courseFee);
        // }

        const courseName = document.getElementById("course_name");
        const courseNameVal = courseName.value.trim();
        if (courseNameVal === "") {
            setError(courseName, ("Enter Course Name"));
            status = false;
        } else {
            setSuccess(courseName);
        }

        const instructorProfile = document.getElementById("instructor_profile");
        const instructorProfileVal = instructorProfile.value.trim();
        if (instructorProfileVal === "") {
            setError(instructorProfile, ("Enter Course Name"));
            status = false;
        } else {
            setSuccess(instructorProfile);
        }

        const courseCategory = document.getElementById("course_category");
        const courseCategoryVal = courseCategory.value.trim();
        if (courseCategoryVal === "") {
            setError(courseCategory, ("Select Course Category"));
            status = false;
        } else {
            setSuccess(courseCategory);
        }

        const duration = document.getElementById("duration");
        const durationVal = duration.value.trim();
        if (durationVal === "") {
            setError(duration, ("Enter Duration"));
            status = false;
        } else {
            setSuccess(duration);
        }

        const durationSelect = document.getElementById("durationSelect");
        const durationSelectVal = durationSelect.value.trim();
        if (durationSelectVal === "" || durationSelectVal === "select") {
            setError(durationSelect, ("Select Duration "));
        } else {
            setSuccess(durationSelect);
        }


        const publishDate = document.getElementById("publish_date");
        const publishDateVal = publishDate.value.trim();
        if (publishDateVal === "") {
            setError(publishDate, ("Enter Publish Date"));
            status = false;
        } else {
            setSuccess(publishDate);
        }

        const enrollStartDate = document.getElementById("enroll_start_date");
        const enrollStartDateVal = enrollStartDate.value.trim();
        if (enrollStartDateVal === "") {
            setError(enrollStartDate, ("Enter Enrollment Start Date"));
            status = false;
        } else {
            setSuccess(enrollStartDate);
        }

        const enrollEndDate = document.getElementById("enroll_end_date");
        const enrollEndDateVal = enrollEndDate.value.trim();
        if (enrollEndDateVal === "") {
            setError(enrollEndDate, ("Enter Enrollment End Date"));
            status = false;
        } else {
            setSuccess(enrollEndDate);
        }

        const commencementDate = document.getElementById("commencement_date");
        const commencementDateVal = commencementDate.value.trim();
        if (commencementDateVal === "") {
            setError(commencementDate, ("Enter Commencement Date"));
            status = false;
        } else {
            setSuccess(commencementDate);
        }


        if (status) {
            setProcessing(true);
            instructorService.updateCourse(feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal,
                durationVal, durationSelectVal, toDateTime(publishDateVal), toDateTime(enrollStartDateVal), toDateTime(enrollEndDateVal),
                toDateTime(commencementDateVal), getIconImg.file, getBannerImg.file, getIntroVideo.file, instructorProfileVal,
                courseOeditorState, courseDeditorState, coursePeditorState, "0", "19f4bfda-4ec5-4e74-8b38-bcc15399e866", courseId, "0",
                (event) => {
                })
                .then(async res => {
                    if (res.data == "Course Updated Successfully !!") {
                        setSuccessCourse(res.data);
                        setProcessing(false);
                        await swal("Success!", "Course Update Successfully !!", "success");
                    } else {
                        setSuccessCourse(res.data);
                        setProcessing(false);
                        await swal("Error!", `${res.data}`, "error");
                    }
                }).catch(err => {
                    //console.log(err);
                })

        }
    }

    const toDateTime = (dateFormat) => {
        var date = new Date(dateFormat);
        var str = '';
        var year, month, day, hour, min, sec;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        day = date.getDate();
        day = day < 10 ? '0' + day : day;
        hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        min = date.getMinutes();
        min = min < 10 ? '0' + min : min;
        sec = date.getSeconds();
        sec = sec < 10 ? '0' + sec : sec;

        str += year + '-' + month + '-' + day;
        str += ' ' + hour + ':' + min + ':' + sec;
        return str;
    }

    function setError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector(".registration_input-msg");
        formControl.className = "form-control text-left error";
        errorMsg.innerText = message;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = "form-control success";
    }


    var currentdate = new Date();
    let currentdateFormate = currentdate.toISOString();
    let s = currentdateFormate.slice(0, 19);

    let a = new Date().toISOString().split('.')[0];


    var date = new Date();
    var str = '';
    var timeNow = '';
    var year, month, day, hour, min, sec;
    year = date.getFullYear();
    month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    day = date.getDate();
    day = day < 10 ? '0' + day : day;
    hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    min = date.getMinutes();
    min = min < 10 ? '0' + min : min;
    sec = date.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;

    str += year + '-' + month + '-' + day;
    str += 'T' + hour + ':' + min;
    timeNow += year + '-' + month + '-' + day;
    timeNow += 'T' + hour + ':' + min + ':' + sec;

    const dateConvertToTformate = (value) => {
        var date = new Date(value);
        var str = '';
        var year, month, day, hour, min, sec;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        day = date.getDate();
        day = day < 10 ? '0' + day : day;
        hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        min = date.getMinutes();
        min = min < 10 ? '0' + min : min;
        sec = date.getSeconds();
        sec = sec < 10 ? '0' + sec : sec;

        str += year + '-' + month + '-' + day;
        str += 'T' + hour + ':' + min + ':' + sec;
        return str;
    }

    function courseObjectiveDetailsFun(data) {
        return <div dangerouslySetInnerHTML={{ __html: data }} />;
    }

    function courseGeneralDetailsFun(data) {
        return <div dangerouslySetInnerHTML={{ __html: data }} />;
    }


    function coursePrerequisiteFun(data) {
        return <div dangerouslySetInnerHTML={{ __html: data }} />;
    }

    function capitalizeFirstLetter(str) {
        let data = `${str}`;
        return data.charAt(0).toUpperCase() + data.slice(1);
    }
    // let xyz = `${dateConvertToTformate(getCourseDetails.publishDate)}`;

    return (
        <Styles>
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Update Course" />

                <section className="registration-area">
                    <Container>
                        <div className="registration-box" style={{ maxWidth: "1000px" }}>
                            <h2 id="heading" ><h3>Update Course Details</h3></h2>
                            <p style={{ textAlign: 'center' }}>Fill all form field to go to next step</p>
                            <form onSubmit={formSubmit} className="form" id="msform">
                                <ul id="progressbar">
                                    <li class="active" id="details"><strong>Details</strong></li>
                                    <li id="durationprogress"><strong id="ant">Duration</strong></li>
                                    <li id="content"><strong>Content</strong></li>
                                    <li id="upload"><strong>Upload</strong></li>
                                    <li id="instructor"><strong>Instructor</strong></li>
                                    {successCourse === "Course Updated Successfully !!" ? <li id="confirm"><strong>Finish</strong></li>
                                        : <li id="process"><strong>Progress</strong></li>}
                                </ul>
                                <fieldset>
                                    <div class="form-card">
                                        <div class="row">
                                            <div class="col-7">
                                                <h2 class="fs-title">Course Information:</h2>
                                            </div>
                                        </div>
                                        {/* <p className="form-control">
                                            <label class="control-label" for="name">Course Type : </label>
                                            <select id="courseSelect" onBlur={onBlurCourseSelect} className="form-select">
                                                <option selected="true" value="">Select</option>
                                                <option value="Basic Course">Basic Course</option>
                                            </select>
                                            <span className="registration_input-msg"></span>
                                        </p> */}
                                        <p className="form-control">
                                            <label class="control-label" for="name">Course Access Type : </label>
                                            <select id="feeSelect" onBlur={onBlurFeeSelect} onChange={(e) => feeSelect(e)} className="form-select">
                                                <option selected={getCourseDetails.courseType == "free" ? "true" : null} value="free">Free</option>
                                                <option selected={getCourseDetails.courseType == "paid" ? "true" : null} value="paid">Paid</option>
                                                <option selected={getCourseDetails.courseType == "restricted" ? "true" : null} value="restricted">Restricted</option>
                                            </select>
                                            <span className="registration_input-msg"></span>
                                            {getFeeSelect == "paid" ?
                                                <>
                                                    <input type="number" class="form-control" defaultValue={getCourseDetails.courseFee} onBlur={onBlurFeeHandler} id="course_fee" placeholder="Enter Amount in rupees" name="course_fee" />
                                                    <span className="registration_input-msg"></span>
                                                </>
                                                : null}
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Course Name (Maximum 150 characters) : </label>
                                            <input type="text" class="form-control" defaultValue={getCourseDetails.courseName} onBlur={onBlurCourseNameHandler} id="course_name" placeholder="Enter Course Name" name="category_name" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label for="name">Category Name : </label>
                                            <select id="course_category" onBlur={onBlurCourseCatSelect} class="form-select selectpicker">
                                                <option selected="true" value={getCourseDetails.categoryId}>{getCourseDetails.categoryName}</option>
                                                {getCourseCat.map((d) => {
                                                    return (
                                                        <option value={d.categoryId}>{d.categoryName}</option>
                                                    )
                                                })}
                                            </select>
                                            <span className="registration_input-msg"></span>
                                        </p>
                                    </div> <input type="button" name="next" class="next action-button" value="Next" />
                                </fieldset>
                                <fieldset>
                                    <div class="form-card">
                                        <div class="row">
                                            <div class="col-7">
                                                <h2 class="fs-title">Duration Information:</h2>
                                            </div>
                                        </div>
                                        {/* <p className="form-control">
                                            <label class="control-label" for="name">Course Access Type : </label>
                                            <select id="feeSelect" onBlur={onBlurFeeSelect} onChange={(e) => feeSelect(e)} className="form-select">
                                                <option selected={getCourseDetails.courseType == "free" ? "true" : null} value="free">Free</option>
                                                <option selected={getCourseDetails.courseType == "paid" ? "true" : null} value="paid">Paid</option>
                                                <option selected={getCourseDetails.courseType == "restricted" ? "true" : null} value="restricted">Restricted</option>
                                            </select>
                                            <span className="registration_input-msg"></span>
                                            {getFeeSelect == "paid" ?
                                                <>
                                                    <input type="number" class="form-control" defaultValue={getCourseDetails.courseFee} onBlur={onBlurFeeHandler} id="course_fee" placeholder="Enter Amount in rupees" name="course_fee" />
                                                    <span className="registration_input-msg"></span>
                                                </>
                                                : null}
                                        </p> */}
                                        <p className="form-control">
                                            <label class="control-label" for="name">Duration [Day] : </label>
                                            <select id="durationSelect" onBlur={onBlurDurationSelect} onChange={(e) => durationSelect(e)} className="form-select">
                                                <option selected={getCourseDetails.course_access_type == "limited" ? "true" : null} value="limited">Limited</option>
                                                <option selected={getCourseDetails.course_access_type == "unlimited" ? "true" : null} value="unlimited">Unlimited</option>
                                            </select>
                                            <span className="registration_input-msg"></span>
                                            {getDurationSelect === "limited" ? <input type="number" class="form-control" defaultValue={getCourseDetails.duration} onBlur={onBlurDurationHandler} id="duration" placeholder="Enter Duration Days" name="duration" />
                                                : getDurationSelect === "unlimited" ? <input type="number" hidden class="form-control" value={0} onBlur={onBlurDurationHandler} id="duration" placeholder="Enter Duration Days" name="duration" />
                                                    : getCourseDetails.course_access_type == "limited" ? <input type="number" class="form-control" defaultValue={getCourseDetails.duration} onBlur={onBlurDurationHandler} id="duration" placeholder="Enter Duration Days" name="duration" />
                                                        : getCourseDetails.course_access_type == "unlimited" ? <input hidden type="number" class="form-control" value={0} onBlur={onBlurDurationHandler} id="duration" placeholder="Enter Duration Days" name="duration" />
                                                            : null
                                            }
                                            {/* <input type="number" class="form-control" defaultValue={getCourseDetails.duration} onBlur={onBlurDurationHandler} id="duration" placeholder="Enter Duration Days" name="duration" /> */}
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Publish Date : </label> <a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select the date using date picker for publishing this course. From the date of publishing date course will be visible to users
                                            </Tooltip>}><i class="fa fa-question-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                                            <input type="datetime-local" class="form-control" defaultValue={getPublishDate} min={getPublishDate} onBlur={onBlurPublishDateHandler} step="1" id="publish_date" placeholder="Enter Publish Date" name="publish_date" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Enrolment Start Date : </label> <a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select the date using date picker for enrolment start date of course. From the date of enrolment start date course registration will be open for enrolment by Learners
                                            </Tooltip>}><i class="fa fa-question-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                                            <input type="datetime-local" class="form-control" defaultValue={getEnrollmentStartDate} min={getPublishDate} onBlur={onBlurEnrolStartDateHandler} step="1" id="enroll_start_date" placeholder="Enter Enrolment Start Date" name="enroll_start_date" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Enrolment End Date : </label><a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select the date using date picker for enrolment end date of course. Course enrolment will be closed on enrolment end date. After this date no learner will be allowed to enrol to this course
                                            </Tooltip>}><i class="fa fa-question-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                                            <input type="datetime-local" class="form-control" defaultValue={getenrollEndDate} min={getPublishDate} onBlur={onBlurEnrolEndDateHandler} step="1" id="enroll_end_date" placeholder="Enter Enrolment End Date" name="enroll_end_date" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Commencement Date : </label> <a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select Commencement date from which course is going to start.Commencement date should be greater than Enrolment End Date.
                                            </Tooltip>}><i class="fa fa-question-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                                            <input type="datetime-local" min={getPublishDate} class="form-control" defaultValue={getcommenceDate} onBlur={onBlurCommencementdateHandler} step="1" id="commencement_date" placeholder="Enter Commencement Date" name="commencement_date" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                    </div> <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                                </fieldset>
                                <fieldset>
                                    <div class="form-card">
                                        <div class="row">
                                            <div class="col-7">
                                                <h2 class="fs-title">Course Content :</h2>
                                            </div>
                                        </div>
                                        <p className="form-control" style={{ marginBottom: "0px" }}>
                                            <label for="name">Course Objective : </label>
                                        </p>
                                        <CKEditor initData={courseObjectiveDetailsFun(courseOeditorState)} onChange={courseOeditorHandler} />
                                        <br></br>
                                        <p className="form-control" style={{ marginBottom: "0px" }}>
                                            <label for="name">Course Prerequisites : </label>
                                        </p>
                                        <CKEditor initData={coursePrerequisiteFun(coursePeditorState)} onChange={coursePeditorHandler} />
                                        <br></br>
                                        <p className="form-control" style={{ marginBottom: "0px" }}>
                                            <label for="name">Course Description : </label>
                                        </p>
                                        <CKEditor initData={courseGeneralDetailsFun(courseDeditorState)} onChange={courseDeditorHandler} />
                                        <br></br>
                                    </div> <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                                </fieldset>
                                <fieldset>
                                    <div class="form-card">
                                        <div class="row">
                                            <div class="col-7">
                                                <h2 class="fs-title">File Upload:</h2>
                                            </div>
                                        </div>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Course Icon : </label>(.png and .jpg/JPEG images (250X150) are only allowed with max size 100KB)
                                            <input type="file" onChange={(e) => courseIcon(e)} class="form-control" id="course_icon" name="course_icon" accept="image/*" />
                                            <br></br>
                                            <img src={getIconImg.imagePreviewUrl == null ?
                                                `http://10.244.3.218:8082/${getCourseDetails.imageUrl}` : getIconImg.imagePreviewUrl}
                                                style={{ height: '150px', width: '200px' }} />
                                        </p>
                                        <br></br>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Course Banner Image : </label>(.png and .jpg/JPEG images (250X150) are only allowed with max size 200KB)
                                            <input type="file" onChange={(e) => courseBanner(e)} class="form-control" id="course_banner" name="course_banner" accept="image/*" />
                                            <br></br>
                                            <img src={getBannerImg.imagePreviewUrl == null ?
                                                `http://10.244.3.218:8082/${getCourseDetails.banner}` : getBannerImg.imagePreviewUrl}
                                                style={{ height: '150px', width: '100%' }} />
                                        </p>
                                        <br></br>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Course Introduction Video: </label>(.MP4, .Ogg and WebM formats are only allowed with max size 10MB)
                                            <input type="file" onChange={(e) => courseVideo(e)} class="form-control" style={{ marginBottom: '0px' }} id="course_video" name="course_video" accept="video/*" />
                                            <br></br>
                                            {/* <video src={`http://10.244.3.218:8082/${getCourseDetails.video}`}  width="400" controls>
                                            </video> */}
                                            {getVideoState ? <video src={`http://10.244.3.218:8082/${getCourseDetails.video}`} id="video" width="400" controls>
                                            </video> : <video id="video" width="400" controls>
                                            </video>}
                                            {/* <video src={getIntroVideo.videoPreviewUrl}
                                                style={{ height: '150px', width: '100%' }} /> */}
                                        </p>
                                        <br></br>
                                    </div> <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                                </fieldset>
                                <fieldset>
                                    <div class="form-card">
                                        <div class="row">
                                            <div class="col-7">
                                                <h2 class="fs-title">Instructor Details:</h2>
                                            </div>
                                        </div>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Instructor Name : </label>
                                            <input type="text" class="form-control" value={capitalizeFirstLetter(UserService.getUsername())} />
                                        </p>
                                        <br></br>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Instructor Profile : </label>
                                            <input type="text" class="form-control" defaultValue={getCourseDetails.inst_profile} onBlur={onBlurInstructorProfileHandler} id="instructor_profile" placeholder="Enter Instructor Profile" name="instructor_profile" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <br></br>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Instructor Photo : </label>
                                            <br></br>
                                            <img src={um_api + `getprofilepic/${UserService.getUserid()}`}
                                                style={{ height: '150px', width: '200px' }} />
                                        </p>
                                        <br></br>
                                    </div> <button name="next" class="next action-button" value="Submit">Update</button> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                                </fieldset>
                                {getProcessing == true ?
                                    <fieldset>
                                        <div class="form-card">
                                            <div class="row">
                                                {/* <div class="col-7">
                                            <h2 class="fs-title-error">:</h2>
                                        </div> */}
                                            </div> <br></br>
                                            <h2 class="red-text text-center"><strong>Please Wait !</strong></h2> <br></br>
                                            <div class="row justify-content-center" style={{ height: '100px' }}>
                                                <div class="col-3">
                                                    <div class="loader1">
                                                        <span class="loader__element1"></span>
                                                        <span class="loader__element1"></span>
                                                        <span class="loader__element1"></span>
                                                    </div>
                                                </div>
                                            </div> <br></br>
                                            <div class="row justify-content-center">
                                                <div class="col-7 text-center">
                                                    <h5 class="red-text text-center">Wait your course is creating...</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                                    </fieldset> :
                                    successCourse === "Course Updated Successfully !!" ?
                                        <fieldset>
                                            <div class="form-card">
                                                <div class="row">
                                                    <div class="col-7">
                                                        <h2 class="fs-title">Finish:</h2>
                                                    </div>
                                                </div> <br></br>
                                                <h2 class="purple-text text-center"><strong>Updated !</strong></h2> <br></br>
                                                <div class="row justify-content-center">
                                                    <div class="col-3"> <img src={process.env.PUBLIC_URL + `/assets/images/right.jpg`} class="fit-image" /> </div>
                                                </div> <br></br>
                                                <div class="row justify-content-center">
                                                    <div class="col-7 text-center">
                                                        <h5 class="purple-text text-center">You Have Successfully Update Course Details</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        :
                                        <fieldset>
                                            <div class="form-card">
                                                <div class="row">
                                                    <div class="col-7">
                                                        <h2 class="fs-title-error">Error:</h2>
                                                    </div>
                                                </div> <br></br>
                                                <h2 class="red-text text-center"><strong>FAILURE !</strong></h2> <br></br>
                                                <div class="row justify-content-center">
                                                    <div class="col-3"> <img src={process.env.PUBLIC_URL + `/assets/images/wrong-icon.jpg`} class="fit-image" /> </div>
                                                </div> <br></br>
                                                <div class="row justify-content-center">
                                                    <div class="col-7 text-center">
                                                        <h5 class="red-text text-center">{successCourse}</h5>
                                                        <h5 class="red-text text-center">Something is missing check all the fields...</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                                        </fieldset>
                                }
                            </form>

                            {/* <div class="container-fluid">
                                <div class="row justify-content-center">
                                    <div class="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
                                        
                                    </div>
                                </div>
                            </div> */}


                        </div>
                    </Container>
                </section>

                {/* Footer 2 */}
                <FooterTwo />
            </div>

        </Styles>
    );
}

export default UpdateCourseCopy;