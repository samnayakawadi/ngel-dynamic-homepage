import React, { useState, useEffect } from 'react'
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from '../../components/FooterTwo';
import { Styles } from "./styles/AddCourseCategory.js"
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import instructorService from '../../services/instructorService';
import $ from 'jquery';
import { CKEditor } from 'ckeditor4-react';
import './styles/createcourse.css'
import swal from 'sweetalert';
import UserService from '../../services/UserService';


function CreateCourse() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    let instructorId = UserService.getUserid();
    const [coursePeditorState, setCoursePEditorState] = useState();
    const [courseDeditorState, setCourseDEditorState] = useState();
    const [getPublishDate, setPublishDate] = useState('');
    const [geteSdate, seteSdate] = useState('');
    const [getFeeSelect, setFeeSelect] = useState();
    const [successCourse, setSuccessCourse] = useState();
    const [getServerTime, setServerTime] = useState();
    const [getProcessing, setProcessing] = useState(false);
    const feeSelect = (e) => {
        setFeeSelect(e.target.value);
    }

    const [getCourseCat, setCourseCat] = useState([]);
    useEffect(() => {
        instructorService.getAllCourseCategory()
            .then(res => {
                setCourseCat(res.data);
            }).catch(err => {
                //console.log(err);
            })
        instructorService.getServerTime()
            .then(res => {
                let serTime = res.data;
                setServerTime(serTime.replace(/\s/g, 'T'))
            })
    }, [])
    const [getabc, setabc] = useState(
        {
            selectedFiles: undefined,
            currentFile: undefined,
            file: '',
        }
    )

    // const [count, setCount] = useState(1);
    // const next = (arr) => {
    //     $('#progress-bar li:not(.active):first').addClass('active');

    // }
    // const prev = () => {
    //     $('#progress-bar li.active:last').removeClass('active');
    // }

    const [getIconImg, setIConImg] = useState([]);
    const courseIcon = (e) => {
        e.preventDefault();
        const courseIcon = document.getElementById("course_icon");
        var files = courseIcon.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                const fsize = files.item(i).size;
                const file = Math.round((fsize / 1024));
                // The size of the file.
                if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
                    if (file >= 100) {
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

    const courseDeditorHandler = (evt) => {
        setCourseDEditorState(evt.editor.getData());
    }
    const coursePeditorHandler = (evt) => {
        setCoursePEditorState(evt.editor.getData());
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

    function validateFee() {
        const courseFee = document.getElementById("course_fee");
        const courseFeeVal = courseFee.value.trim();
        if (courseFeeVal === "") {
            setError(courseFee, ("Enter Course Cost"));
        } else {
            setValidationFlag(true);
        }
    }

    const onBlurFeeHandler = () => {
        validateFee();
    }
    const [getValidationFlag, setValidationFlag] = useState();
    function validateCourseName() {
        const courseName = document.getElementById("course_name");
        const courseNameVal = courseName.value.trim();
        if (courseNameVal === "") {
            setValidationFlag(false)
            return setError(courseName, ("Enter Course Name"));
        } else {
            setValidationFlag(true);
            return setSuccess(courseName);
        }
    }

    const onBlurCourseNameHandler = () => {
        validateCourseName();
    }

    function validateCourseCategory() {
        const courseCategory = document.getElementById("course_category");
        const courseCategoryVal = courseCategory.value.trim();
        if (courseCategoryVal === "") {
            setError(courseCategory, ("Select Course Category"));
        } else {
            setSuccess(courseCategory);
        }
    }

    const onBlurCourseCatSelect = () => {
        validateCourseCategory();
    }

    const onBlurDurationHandler = () => {
        const duration = document.getElementById("duration");
        const durationVal = duration.value.trim();
        if (durationVal === "") {
            setError(duration, ("Enter Duration"));
        } else {
            setSuccess(duration);
        }
    }
    const onBlurPublishDateHandler = () => {
        const publishDate = document.getElementById("publish_date");
        const publishDateVal = publishDate.value.trim();
        const pDate = publishDateVal;
        const cDate = getServerTime;
        setPublishDate(pDate);
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
        const eSdate = enrollStartDateVal;
        const pDate = getPublishDate;
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


    const [getS, setS] = useState('');
    //const [courseFeeVal, setCourseFeeVal] = useState();
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

        // let currentFile = getabc.selectedFiles[0];
        // setabc({f
        //     currentFile: currentFile,
        // });

        // if (getIconImg.file) {
        //     //console.log("file  is avail")
        // } else {
        //     setIConImg({
        //         file: ''
        //     })
        // }

        if (status) {
            setProcessing(true);
            instructorService.createCourse(feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal,
                durationVal, toDateTime(publishDateVal), toDateTime(enrollStartDateVal), toDateTime(enrollEndDateVal),
                toDateTime(commencementDateVal), getIconImg.file, courseDeditorState, coursePeditorState, "0", "19f4bfda-4ec5-4e74-8b38-bcc15399e866",
                (event) => {
                })
                .then(async res => {
                    if (res.data == "Course Saved Successfully !!") {
                        setSuccessCourse(res.data);
                        setProcessing(false);
                        await swal("Success!", "Course Created Successfully !!", "success")
                    } else {
                        setSuccessCourse(res.data);
                        setProcessing(false);
                        await swal("Error!", `${res.data}`, "error")
                    }
                }).catch(err => {
                    //console.log(err);
                })
        } else {
            //console.log("Error something")
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
        min = date.getMinutes() + 5;
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

    ////console.log(new Date().toUTCString("en-US", { timeZone: "Asia/Kolkata" }));

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


    return (
        <Styles>
            <div className="main-wrapper registration-page">
                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Create Course" />

                <section className="registration-area">
                    <Container>
                        <div className="registration-box" style={{ maxWidth: "1000px" }}>
                            <h2 id="heading" ><h3>Create Course</h3></h2>
                            <p style={{ textAlign: 'center' }}>Fill all form field to go to next step</p>
                            <form onSubmit={formSubmit} className="form" id="msform">

                                <ul id="progressbar">
                                    <li class="active" id="account"><strong>Details</strong></li>
                                    <li id="personal"><strong id="ant">Duration</strong></li>
                                    <li id="payment"><strong>Upload</strong></li>
                                    {successCourse === "Course Saved Successfully !!" ? <li id="confirm"><strong>Finish</strong></li>
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
                                                <option selected="true" value="free">Free</option>
                                                <option value="paid">Paid</option>
                                            </select>
                                            <span className="registration_input-msg"></span>
                                            {getFeeSelect == "paid" ?
                                                <>
                                                    <input type="number" class="form-control" onBlur={onBlurFeeHandler} id="course_fee" placeholder="Enter Amount in rupees" name="course_fee" />
                                                    <span className="registration_input-msg"></span>
                                                </>
                                                : null}
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Course Name (Maximum 150 characters) : </label>
                                            <input type="text" class="form-control" onBlur={onBlurCourseNameHandler} id="course_name" placeholder="Enter Course Name" name="category_name" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label for="name">Category Name : </label>
                                            <select id="course_category" onBlur={onBlurCourseCatSelect} class="form-select selectpicker">
                                                <option selected="true" value="">Select</option>
                                                {getCourseCat.map((d) => {
                                                    return (
                                                        <option value={d.categoryId}>{d.categoryName}</option>
                                                    )
                                                })}
                                            </select>
                                            <span className="registration_input-msg"></span>
                                        </p>
                                    </div>
                                    {getValidationFlag == true ?
                                        <input type="button" name="next" class="next action-button" value="Next" />
                                        : <input type="button" disabled name="next" class="next action-button" value="Next" />}
                                </fieldset>
                                <fieldset>
                                    <div class="form-card">
                                        <div class="row">
                                            <div class="col-7">
                                                <h2 class="fs-title">Duration Information:</h2>
                                            </div>
                                        </div>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Duration [Day] : </label>
                                            <input type="number" class="form-control" onBlur={onBlurDurationHandler} id="duration" placeholder="Enter Duration Days" name="duration" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Publish Date : </label> <a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select the date using date picker for publishing this course. From the date of publishing date course will be visible to users
                                            </Tooltip>}><i class="fa fa-question-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                                            <input type="datetime-local" class="form-control" min={getServerTime} onBlur={onBlurPublishDateHandler} step="1" id="publish_date" placeholder="Enter Publish Date" name="publish_date" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Enrolment Start Date : </label> <a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select the date using date picker for enrolment start date of course. From the date of enrolment start date course registration will be open for enrolment by Learners
                                            </Tooltip>}><i class="fa fa-question-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                                            <input type="datetime-local" class="form-control" title="Select Course Publish Date" disabled={getPublishDate.length === 0 ? true : false} min={getPublishDate.length === 0 ? str : getPublishDate} onBlur={onBlurEnrolStartDateHandler} step="1" id="enroll_start_date" placeholder="Enter Enrolment Start Date" name="enroll_start_date" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Enrolment End Date : </label><a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select the date using date picker for enrolment end date of course. Course enrolment will be closed on enrolment end date. After this date no learner will be allowed to enrol to this course
                                            </Tooltip>}><i class="fa fa-question-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                                            <input type="datetime-local" class="form-control" title="Select Course Publish Date" disabled={getPublishDate.length === 0 ? true : false} min={getPublishDate.length === 0 ? str : getPublishDate} onBlur={onBlurEnrolEndDateHandler} step="1" id="enroll_end_date" placeholder="Enter Enrolment End Date" name="enroll_end_date" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Commencement Date : </label> <a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select Commencement date from which course is going to start.Commencement date should be greater than Enrolment End Date.
                                            </Tooltip>}><i class="fa fa-question-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                                            <input type="datetime-local" class="form-control" title="Select Course Publish Date" disabled={getPublishDate.length === 0 ? true : false} min={getPublishDate.length === 0 ? str : getPublishDate} onBlur={onBlurCommencementdateHandler} step="1" id="commencement_date" placeholder="Enter Commencement Date" name="commencement_date" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                    </div> <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                                </fieldset>
                                <fieldset>
                                    <div class="form-card">
                                        <div class="row">
                                            <div class="col-7">
                                                <h2 class="fs-title">Image Upload:</h2>
                                            </div>
                                        </div>
                                        <p className="form-control">
                                            <label class="control-label" for="name">Course Icon : </label>(.png and .jpg/JPEG images (250X150) are only allowed with max size 100KB)
                                            <input type="file" onChange={(e) => courseIcon(e)} class="form-control" id="course_icon" name="course_icon" accept="image/*" />
                                            <br></br>
                                            <img src={getIconImg.imagePreviewUrl == null ?
                                                "http://10.244.0.233:8081/uploads/DefaultImage/default.jpg" : getIconImg.imagePreviewUrl}
                                                style={{ height: '150px', width: '200px' }} />
                                        </p>
                                        <p className="form-control">
                                            <label for="name">Course Description : </label>
                                        </p>
                                        <CKEditor onChange={courseDeditorHandler} />
                                        <br></br>
                                        <p className="form-control">
                                            <label for="name">Course Prerequisites : </label>
                                        </p>
                                        <CKEditor onChange={coursePeditorHandler} />
                                        <br></br>
                                    </div> <button name="next" class="next action-button" value="Submit">Submit</button> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
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
                                            <div class="row justify-content-center">
                                                <div class="col-3"> <img src={process.env.PUBLIC_URL + `/assets/images/processing.gif`} class="fit-image" /> </div>
                                            </div> <br></br>
                                            <div class="row justify-content-center">
                                                <div class="col-7 text-center">
                                                    <h5 class="red-text text-center">Wait your course is creating...</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                                    </fieldset> :
                                    successCourse === "Course Saved Successfully !!" ?
                                        <fieldset>
                                            <div class="form-card">
                                                <div class="row">
                                                    <div class="col-7">
                                                        <h2 class="fs-title">Finish:</h2>
                                                    </div>
                                                </div> <br></br>
                                                <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2> <br></br>
                                                <div class="row justify-content-center">
                                                    <div class="col-3"> <img src={process.env.PUBLIC_URL + `/assets/images/right.jpg`} class="fit-image" /> </div>
                                                </div> <br></br>
                                                <div class="row justify-content-center">
                                                    <div class="col-7 text-center">
                                                        <h5 class="purple-text text-center">You Have Successfully Create Course</h5>
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

                {/* <section className="registration-area">
                    <Container>
                        <div className="registration-box" style={{ maxWidth: "1000px" }}>
                            <div className="registration-title text-center">
                                <h3>Create Course</h3>
                            </div>
                            <div className='progressDiv'>
                                <ul id="progress-bar" class="progressbar">
                                    <li class="active">Details</li>
                                    <li>Address</li>
                                    <li>add friends</li>
                                </ul>
                            </div>
                            <Row>
                                <Col>
                                    <form className="form">
                                        {count === 1 ?
                                            <div>
                                                <p className="form-control">
                                                    <label class="control-label" for="name">Course Type : </label>
                                                    <select className="form-select">
                                                        <option selected="true" value="">Select</option>
                                                        <option value="Basic Course">Basic Course</option>
                                                    </select>
                                                </p>
                                                <p className="form-control">
                                                    <label class="control-label" for="name">Course Access Type : </label>
                                                    <select onChange={(e) => feeSelect(e)} className="form-select">
                                                        <option selected="true" value="free">Free</option>
                                                        <option value="paid">Paid</option>
                                                    </select>
                                                    {getFeeSelect == "paid" ?
                                                        <input type="number" class="form-control" id="course_fee" placeholder="Enter Amount in rupees" name="course_fee" />
                                                        : null}
                                                </p>
                                                <p className="form-control">
                                                    <label class="control-label" for="name">Course Name (Maximum 150 characters) : </label>
                                                    <input type="text" class="form-control" id="category_name" placeholder="Enter Course Name" name="category_name" />
                                                </p>
                                                <p className="form-control">
                                                    <label for="name">Category Name : </label>
                                                    <select class="form-select">
                                                        {getCourseCat.map((d) => {
                                                            return (
                                                                <option value={d.categoryId}>{d.categoryName}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </p>
                                            </div>
                                            : count === 2 ?
                                                <div>
                                                    <p className="form-control">
                                                        <label class="control-label" for="name">Duration [Day] : </label>
                                                        <input type="number" class="form-control" id="category_name" placeholder="Enter Duration Days" name="category_name" />
                                                    </p>
                                                    <p className="form-control">
                                                        <label class="control-label" for="name">Publish Date : </label>
                                                        <input type="datetime-local" class="form-control" id="category_name" placeholder="Enter Course Name" name="category_name" />
                                                    </p>
                                                    <p className="form-control">
                                                        <label class="control-label" for="name">Enrolment Start Date : </label>
                                                        <input type="datetime-local" class="form-control" id="category_name" placeholder="Enter Course Name" name="category_name" />
                                                    </p>
                                                    <p className="form-control">
                                                        <label class="control-label" for="name">Enrolment End Date : </label>
                                                        <input type="datetime-local" class="form-control" id="category_name" placeholder="Enter Course Name" name="category_name" />
                                                    </p>
                                                    <p className="form-control">
                                                        <label class="control-label" for="name">Commencement Date : </label>
                                                        <input type="datetime-local" class="form-control" id="category_name" placeholder="Enter Course Name" name="category_name" />
                                                    </p>
                                                </div>
                                                : count === 3 ?
                                                    <div>
                                                        <p className="form-control">
                                                            <label class="control-label" for="name">Course Icon : </label>
                                                            <input type="file" onChange={(e) => courseIcon(e)} class="form-control" id="category_name" placeholder="Enter Course Name" name="category_name" />
                                                            <br></br>
                                                            <img src={getIconImg.imagePreviewUrl == null ?
                                                                "http://10.244.0.43:8081/uploads/19f4bfda-4ec5-4e74-8b38-bcc15399e866/CourseImages/default.png" : getIconImg.imagePreviewUrl}
                                                                style={{ height: '150px', width: '200px' }} />
                                                        </p>
                                                        <p className="form-control">
                                                            <label for="name">Course Description : </label>
                                                        </p>
                                                        <CKEditor onChange={editorHandler} />
                                                        <br></br>
                                                        <p className="form-control">
                                                            <label for="name">Course Prerequisites : </label>
                                                        </p>
                                                        <CKEditor onChange={editorHandler} />
                                                        <br></br>
                                                    </div>
                                                    : null}
                                    </form>
                                </Col>
                            </Row>     

                            <Row><Col style={{ textAlign: 'right' }}>
                                {count === 1 ? null : <button class="btn btn-primary" onClick={() => prev(setCount(count - 1))} id="Back">Back</button>}&nbsp;&nbsp;&nbsp;&nbsp;
                                {count === 3 ? null : <button class="btn btn-primary" onClick={() => next(setCount(count + 1))} id="Next">Next</button>}
                                {count === 3 ? <button class="btn btn-primary" id="Next">Submit</button> : null}
                            </Col></Row>
                        </div>
                    </Container>
                </section> */}

                {/* Footer 2 */}
                <FooterTwo />
            </div>
        </Styles >
    )
}
export default CreateCourse;