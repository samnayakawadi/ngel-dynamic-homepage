import React, { useState, useEffect } from 'react'
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from '../../components/FooterTwo';
import { Styles } from "./styles/AddCourseCategory.js"
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import instructorService from '../../services/instructorService';
import { CKEditor } from 'ckeditor4-react';
import './styles/createcourse.css'
import swal from 'sweetalert';
import UserService from '../../services/UserService';
import MultiStepProgressBar from './MultiStepProgressBar';
import './styles/createcourse.css'
import { Prev } from 'react-bootstrap/esm/PageItem';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
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

function  CourseCreate() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])



    const [getState, State] = useState({
        currentStep: 1,
        courseType: '',
        courseFee: '',
        courseName: '',
        categoryId: '',
        courseAccessType: '',
        duration: '',
        publishDate: '',
        enrollSdate: '',
        enrollEdate: '',
        commencementDate: '',
        courseOeditor: '',
        coursePeditor: '',
        courseDeditor: '',
        cke_1: '',
        cke_2: '',
        cke_3: '',
        courseIcon: '',
        courseIconUrl: '',
        courseBanner: '',
        courseBannerUrl: '',
        courseVideo: '',
        courseVideoUrl: '',
        instructorProfile: '',
        successMsg: '',
        processing: true,

    });

    let instructorId = UserService.getUserid();
    const [successCourse, setSuccessCourse] = useState();
    const handleChange = event => {
        const { name, value } = event.target
        State({
            ...getState,
            [name]: value
        })
    }
    const handleChangeNumber = event => {
        const { name, value } = event.target

        const inputNumber = value.replace(/\D/g, '');

        // Limit to 5 digits
        const limitedNumber = inputNumber.substring(0, 5);

        State({
            ...getState,
            [name]: limitedNumber
        })
    }

    const handleChangeLimited = event => {
        const { name, value } = event.target

        const inputNumber = value.replace(/\D/g, '');

        // Limit to 5 digits
        const limitedNumber = inputNumber.substring(0, 4);

        State({
            ...getState,
            [name]: limitedNumber
        })
    }

    const um_api = UserService.USER_API;
    ////console.log(um_api);


    const handleChangeCourseeditor = event => {
        const { name, value } = event.target
        State({
            ...getState,
            [name]: value
        })
    }


    const courseIconHandle = event => {
        event.preventDefault();
        var files = event.target.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                const fsize = files.item(i).size;
                const file = Math.round((fsize / 1024));
                // The size of the file.
                if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
                    if (file >= 100) {
                        return swal(`${t('warning')}`, `${t('icon_size')}`, "warning");

                    } else {
                        let reader = new FileReader();
                        let file = event.target.files[0];
                        reader.onloadend = () => {
                            State({
                                ...getState,
                                courseIconUrl: reader.result,
                                courseIcon: file
                            });
                        }
                        reader.readAsDataURL(file)
                    }
                } else {
                    swal(`${t('warning')}`, `${t('valid_image')}`, "warning");
                }
            }
        }
    }

    const courseBannerHandle = event => {
        event.preventDefault();
        var files = event.target.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                const fsize = files.item(i).size;
                const file = Math.round((fsize / 1024));
                // The size of the file.
                if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
                    if (file >= 100) {
                        return swal(`${t('warning')}`, `${t('course_baner')}`, "warning");
                    } else {
                        let reader = new FileReader();
                        let file = event.target.files[0];
                        reader.onloadend = () => {
                            State({
                                ...getState,
                                courseBannerUrl: reader.result,
                                courseBanner: file
                            });
                        }
                        reader.readAsDataURL(file)
                    }
                } else {
                    swal(`${t('warning')}`, `${t('valid_image')}`, "warning");
                }
            }
        }
    }

    const courseVideoHandle = event => {
        event.preventDefault();
        var files = event.target.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                const fsize = files.item(i).size;
                const file = Math.round((fsize / 1024));
                // The size of the file.
                if (files[i].type === "video/mp4" || files[i].type === "video/ogg" || files[i].type === "video/webm") {
                    if (file >= 10240) {
                        return swal(`${t('warning')}`, `${t('Course_video_varn')}`, "warning");
                    } else {
                        let reader = new FileReader();
                        let file = event.target.files[0];
                        let file1 = event.target.files[0];
                        reader.onloadend = (file1) => {
                            State({
                                ...getState,
                                courseVideo: file,
                                courseVideoUrl: file1.target.result
                            })
                        }
                        reader.readAsDataURL(file)
                    }
                } else {
                    swal(`${t('warning')}`, `${t('valid_image')}`, "warning");
                }
            }
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

    const [getProcessing, setProcessing] = useState(false);
    const [submitB, setSubmitB] = useState(false)
    const handleSubmit = event => {
        event.preventDefault();
        setProcessing(true);
        ////console.log(getState.courseType, getState.courseFee, getState.courseName, getState.categoryId, getState.duration, getState.courseAccessType,
        //    toDateTime(getState.publishDate), toDateTime(getState.enrollSdate), toDateTime(getState.enrollEdate), toDateTime(getState.commencementDate), getState.courseIcon, getState.courseBanner, getState.courseVideo,
        //   getState.instructorProfile, getState.courseOeditor, getState.courseDeditor, getState.coursePeditor, "0", instructorId, "0")

        const type = 1;
        let bannersig = null;
        let videosig = null;
        let iconsig = null;

        if (getState.currentStep === 5) {

            if (getState.courseBanner != "") {
                bannersig = md5((getState.courseBanner.size).toString())
            }
            if (getState.courseVideo != "") {

                videosig = md5((getState.courseVideo.size).toString())
            }
            if (getState.courseIcon != "") {
                iconsig = md5((getState.courseIcon.size).toString())

            }

        }


        instructorService.createCourse(getState.courseType, getState.courseFee, getState.courseName, getState.categoryId, getState.duration, type, getState.courseAccessType,
            toDateTime(getState.publishDate), toDateTime(getState.enrollSdate), toDateTime(getState.enrollEdate), toDateTime(getState.commencementDate), getState.courseIcon, iconsig, getState.courseBanner, bannersig, getState.courseVideo, videosig,
            getState.instructorProfile, getState.courseOeditor, getState.courseDeditor, getState.coursePeditor, "0", instructorId, "0",
            (event) => {
            }).then(async res => {
                if (res.status === 400) {
                    alert(t('check_field_all'));
                    State({
                        ...getState,
                        currentStep: 5,
                    })

                }
                if (res.data === "Double-File-Extention") {
                    swal(t('error'), t('double-ext-file'), "error");
                }
                else if (res.data == "Course Created Successfully !!") {
                    await swal(`${t('success')}`, `${t('courseCreationmsg')}`, "success")
                    setProcessing(false);
                    State({
                        ...getState,
                        currentStep: 6,
                        successMsg: res.data
                    })
                    setSuccessCourse(res.data);
                } else {
                    ////console.log(res.data);
                    setSuccessCourse(res.data);
                    setProcessing(false);
                    await swal(`${t('error')}`, `${res.data}`, "error")
                    State({
                        ...getState,
                        currentStep: 5,
                        successMsg: res.data
                    })
                }
            }).catch(err => {
                //console.log(err);
            })
    }

    const _next = () => {
        let currentStep = getState.currentStep
        ////console.log(getState);
        currentStep = currentStep >= 5 ? 6 : currentStep + 1
        State({
            ...getState,
            currentStep: currentStep
        })
    }

    const _prev = () => {
        let currentStep = getState.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        State({
            ...getState,
            currentStep: currentStep
        })
    }

    /*
    * the functions for our button
    */
    const previousButton = () => {
        let currentStep = getState.currentStep;
        if (currentStep !== 1) {
            return (
                <button
                    class="next action-button" name='next'
                    type="button" style={{ borderRadius: '5px' }} onClick={_prev}>
                    {t('prev')}
                </button>
            )
        }
        return null;
    }

    const nextButton = () => {
        let currentStep = getState.currentStep;
        if (currentStep === 1) {
            return (
                <>
                    {
                        getState.courseName == '' || getState.courseType == '' || getState.categoryId == ''
                            ?
                            <button class="next action-button float-right" name='next' type="button" style={{ borderRadius: '5px' }} onClick={() => swal(`${t('warninfo')}`, "", "warning")}>{t('next')}</button>
                            :
                            <>
                                {
                                    !getState.courseName.match(/^[A-Za-z0-9 ]{2,150}$/) ?
                                        <>
                                            <button class="next action-button float-right" name='next' type="button" style={{ borderRadius: '5px' }} onClick={() => swal(`${t('warnContentDetail1')}`, "", "warning")}>{t('next')}</button>
                                        </>
                                        :
                                        <>
                                            <button class="next action-button float-right" name='next'
                                                type="button" style={{ borderRadius: '5px' }} onClick={_next}>
                                                {t('next')}
                                            </button>
                                        </>
                                }
                            </>
                    }

                </>
            )
        } if (currentStep === 4) {
            return (
                <>
                    {getState.courseAccessType == '' || getState.publishDate == '' || getState.enrollSdate == '' || getState.enrollEdate == ''
                        || getState.commencementDate == '' ? <button
                            class="next action-button float-right" name='next'
                            type="button" style={{ borderRadius: '5px' }} onClick={() => swal(`${t('warnDura')}`, "", "warning")}>{t('next')}</button> : <button
                                class="next action-button float-right" name='next'
                                type="button" style={{ borderRadius: '5px' }} onClick={_next}>
                        {t('next')}
                    </button>}
                </>
            )
        } if (currentStep === 2) {
            return (
                <>
                    {getState.courseOeditor == '' || getState.coursePeditor == '' || getState.courseDeditor == '' ?
                        <button
                            class="next action-button float-right" name='next'
                            type="button" style={{ borderRadius: '5px' }} onClick={() => swal(`${t('warnContentDetail')}`, "", "warning")}>{t('next')}
                        </button>
                        :

                        !getState.courseOeditor.match(/^[A-Za-z&,.\d:+=\-/"'()\n ]*$/) || !getState.coursePeditor.match(/^[A-Za-z&,.\d:+=\-/"'()\n ]*$/) || !getState.courseDeditor.match(/^[A-Za-z&,.\d:+=\-/"'()\n ]*$/)
                            ?
                            <>
                                <button
                                    class="next action-button float-right" name='next'
                                    type="button" style={{ borderRadius: '5px' }} onClick={() => swal(`${t('warnContentDetail1')}`, "", "warning")}>{t('next')}
                                </button>
                            </>
                            :
                            <>
                                <button
                                    class="next action-button float-right" name='next'
                                    type="button" style={{ borderRadius: '5px' }} onClick={_next}>
                                    {t('next')}
                                </button>
                            </>


                    }
                </>
            )
        } if (currentStep === 3) {
            return (
                <button
                    class="next action-button float-right" name='next'
                    type="button" style={{ borderRadius: '5px' }} onClick={_next}>
                    {t('next')}
                </button>
            )
        }
        return null;
    }

    const submitButton = () => {
        let currentStep = getState.currentStep;
        if (currentStep === 5) {
            return (
                <>
                    {
                        getProcessing == true ?
                            <button disabled className="action-button" style={{ borderRadius: '5px' }} >
                                <div class="spinner-border" role="status" style={{ margin: '5px', marginTop: "3px" }}>
                                    <span class="sr-only">{t('loading')}</span>
                                </div>{t('submit')}
                            </button>
                            : getState.instructorProfile == '' ?
                                <button
                                    class="next action-button float-right" style={{ borderRadius: '5px' }} name='next'
                                    type="button" onClick={() => swal(`${t('warninstDetail')}`, "", "warning")}>{t('submit')}
                                </button>
                                :
                                <>
                                    {
                                        !getState.instructorProfile.match(/^[A-Za-z0-9&., ]{5,250}$/) ?
                                            <>
                                                <button
                                                    class="next action-button float-right" style={{ borderRadius: '5px' }} name='next'
                                                    type="button" onClick={() => swal(`${t('warnContentDetail1')}`, "", "warning")}>{t('submit')}
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button style={{ borderRadius: '5px' }} className="next action-button">{t('submit')}</button>
                                            </>
                                    }
                                </>
                    }
                </>
            )
        }
    }
    // <>
    //     {getState.instructorProfile == '' ? <button
    //         class="next action-button float-right" name='next'
    //         type="button" onClick={() => swal('Fill All Instructor Details', "", "warning")}>Submit</button> :
    //         <button className="next action-button">Submit</button>}
    // </>

    return (
        <Styles>
            <div className="main-wrapper registration-page">
                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('create_course')} />

                <section className="registration-area">
                    <Container>
                        <div className="registration-box" style={{ maxWidth: "1200px" }}>
                            <h2 id="heading" ><h3>{t('create_course')}</h3></h2>
                            <p style={{ textAlign: 'center' }}>{t('fill_all_field')}</p>
                            <br></br>
                            <MultiStepProgressBar currentStep={getState.currentStep} />
                            <br></br>
                            <form onSubmit={handleSubmit} className="form" id="msform">
                                <Step1
                                    currentStep={getState.currentStep}
                                    handleChange={handleChange}
                                    courseType={getState.courseType}
                                    courseFee={getState.courseFee}
                                    courseName={getState.courseName}
                                    categoryId={getState.categoryId}
                                    handleChangeNumber={handleChangeNumber}
                                />
                                <Step2
                                    currentStep={getState.currentStep}
                                    handleChangeCourseeditor={handleChangeCourseeditor}
                                    // handleChangeCourseeditor2={handleChangeCourseeditor2}
                                    // handleChangeCourseeditor3={handleChangeCourseeditor3}
                                    courseDeditor={getState.courseDeditor}
                                    courseOeditor={getState.courseOeditor}
                                    coursePeditor={getState.coursePeditor}
                                />
                                <Step3
                                    currentStep={getState.currentStep}
                                    courseIconHandle={courseIconHandle}
                                    courseBannerHandle={courseBannerHandle}
                                    courseVideoHandle={courseVideoHandle}
                                    courseIcon={getState.courseIcon}
                                    courseIconUrl={getState.courseIconUrl}
                                    courseBanner={getState.courseBanner}
                                    courseBannerUrl={getState.courseBannerUrl}
                                    courseVideo={getState.courseVideo}
                                    courseVideoUrl={getState.courseVideoUrl}
                                />
                                <Step4
                                    currentStep={getState.currentStep}
                                    handleChange={handleChange}
                                    courseAccessType={getState.courseAccessType}
                                    duration={getState.duration}
                                    publishDate={getState.publishDate}
                                    enrollSdate={getState.enrollSdate}
                                    enrollEdate={getState.enrollEdate}
                                    commencementDate={getState.commencementDate}
                                    handleChangeLimited={handleChangeLimited}

                                />
                                <Step5
                                    currentStep={getState.currentStep}
                                    handleChange={handleChange}
                                    instructorProfile={getState.instructorProfile}
                                />
                                <Step6
                                    currentStep={getState.currentStep}
                                    successMsg={getState.successMsg}
                                />
                                <div className="registration-box" style={{ maxWidth: "1200px", border: '0px', boxShadow: 'none' }}>
                                    {nextButton()}
                                    {submitButton()}
                                    {successCourse == "Course Created Successfully !!" ? null : previousButton()}
                                </div>
                            </form>
                        </div>
                    </Container>
                </section>
                <FooterTwo />
            </div>
        </Styles >
    );
}

function Step1(props) {



    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])


    const [value, setValue] = useState('');



    const [getValidationFlag, setValidationFlag] = useState();
    const [getFeeSelect, setFeeSelect] = useState();
    const [getCourseCat, setCourseCat] = useState([]);

    useEffect(() => {
        instructorService.getAllCourseCategory()
            .then(res => {
                setCourseCat(res.data);
            }).catch(err => {
                //console.log(err);
            })
    }, [])

    function validateCourseName() {
        const courseName = document.getElementById("courseName");
        const courseNameVal = courseName.value.trim();
        
        if (courseNameVal === "") {
            return setError(courseName, (`${t("enter_c_name")}`));
        } else if (courseNameVal.length < 5) {
            return setError(courseName, "Name must be of minimum 5 characters");
            // } else if (courseNameVal.length > 150) {
        }else if (courseNameVal.length > 100) {
            return setError(courseName, "Name must be of maximum 100 characters");
            // } else if (courseNameVal.length > 150) {
        } else if (!courseNameVal.match(/^[A-Za-z0-9 ]{2,100}$/)) {
            return setError(courseName, t('aplha_digit_max_75'));
            // } else if (courseNameVal.length > 150) {
        } else {

            return setSuccess(courseName);
            // return setError(courseName, "Alphabet, Digit and Space are Allowed");
        }
    }

    const onBlurCourseNameHandler = () => {
        validateCourseName();
    }
    const onBlurFeeSelect = () => {
        const feeSelect = document.getElementById("courseType");
        const feeSelectVal = feeSelect.value.trim();
        setFeeSelect(feeSelectVal);
        if (feeSelectVal === "" || feeSelectVal === "selectFeeType") {
            setError(feeSelect, (`${t("select_fee")}`));
        } else {
            setSuccess(feeSelect);
        }
    }

    function validateFee() {
        const courseFee = document.getElementById("courseFee");
        const courseFeeVal = courseFee.value.trim();
        if (courseFeeVal === "") {
            setError(courseFee, (`${t("course_cost")}`));
        } else {
            // setValidationFlag(true);
            setSuccess(courseFee);
        }
    }

    const onBlurFeeHandler = () => {
        validateFee();
    }

    function validateCourseCategory() {
        const courseCategory = document.getElementById("categoryId");
        const courseCategoryVal = courseCategory.value.trim();
        if (courseCategoryVal === "") {
            setError(courseCategory, (`${t("sel_cat")}`));
        } else {
            setSuccess(courseCategory);
        }
    }

    const onBlurCourseCatSelect = () => {
        validateCourseCategory();
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

    if (props.currentStep !== 1) {
        return null
    }

    return (
        <fieldset>
            <div class="form-card">
                <div class="row">
                    <div class="col-7">
                        <h2 class="fs-title">{t('fill_all_field')}:</h2>
                    </div>
                </div>

                <p className="form-control">
                    <label class="control-label" for="name">{t('course_access')}: </label>
                    <select name='courseType' id="courseType" onBlur={onBlurFeeSelect} value={props.courseType} onChange={props.handleChange} className="form-select h-100">
                        <option value="selectFeeType">{t('access_type')}</option>
                        <option value="free">{t('free')}</option>
                        <option value="paid">{t('paid')}</option>
                        {/* <option value="restricted">Restricted</option> */}
                    </select>
                    <span className="registration_input-msg"></span>
                    {getFeeSelect == "paid" || props.courseType == "paid" ?
                        <>
                            <input type="number" class="form-control" onBlur={onBlurFeeHandler} id="courseFee" placeholder={`${t("amount")}`}
                                value={props.courseFee}
                                onChange={props.handleChangeNumber} name="courseFee" />
                            <span className="registration_input-msg"></span>
                        </>
                        : props.courseType == "free" ? <></> : props.courseType == "selectFeeType" ? <></> : <></>}
                </p>

                <p className="form-control">
                    <label class="control-label" for="name">{t('course_name')} ({t('maximun_150_character')}) : </label>
                    <input className="form-control" onBlur={onBlurCourseNameHandler} minLength={5} maxLength={100} id="courseName" name="courseName" type="courseName" placeholder={`${t('enter')} ${t('course_name')}`}
                        value={props.courseName}
                        onChange={props.handleChange}
                    />
                    <span className="registration_input-msg"></span>
                </p>

                <p className="form-control">
                    <label for="name">{t('catagory_name')} : </label>
                    <select id="categoryId" name='categoryId' value={props.categoryId} onChange={props.handleChange} onBlur={onBlurCourseCatSelect} class="form-select selectpicker h-100">
                        <option selected="true" value="">{t('select')}</option>
                        {getCourseCat.map((d) => {
                            return (
                                <>
                                    {
                                        d.categoryName !== "elibrary"
                                            ?
                                            <option value={d.categoryId}>
                                                {d.categoryName}
                                            </option>
                                            :
                                            <></>
                                    }

                                </>
                            )
                        })}
                    </select>
                    <span className="registration_input-msg"></span>
                </p>

            </div>
        </fieldset>

    );
}



function Step2(props) {

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    function courseODetailsFun(data) {
        return <div dangerouslySetInnerHTML={{ __html: data }} />;
    }
    function coursePDetailsFun(data) {
        return <div dangerouslySetInnerHTML={{ __html: data }} />;
    }
    function courseDDetailsFun(data) {
        return <div dangerouslySetInnerHTML={{ __html: data }} />;
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

    const onBlurcourseOeditorHandler = () => {
        const courseOeditor = document.getElementById("courseOeditor");
        const courseOeditorVal = courseOeditor.value.trim();
        if (courseOeditorVal === "") {

            return setError(courseOeditor, t('enter_course_object'));
        } else if (courseOeditorVal.match(/^[A-Za-z&,.\d:+=\-/"'()\n ]*$/)) {

            return setSuccess(courseOeditor);
        } else if (courseOeditorVal.length < 5) {

            return setError(courseOeditor, t('course_objective_min_5_char'));
        } else if (courseOeditorVal.length > 1500) {

            return setError(courseOeditor, t('course_objective_man_1500_char'));
        }
        else {
            return setError(courseOeditor, t('alphabet_digit_special_character_allowed'));

        }

    }

    const onBlurcoursePeditorHandler = () => {
        const coursePeditor = document.getElementById("coursePeditor");
        const coursePeditorVal = coursePeditor.value.trim();
        if (coursePeditorVal === "") {

            return setError(coursePeditor, t('enter_course_requirement'));
        } else if (coursePeditorVal.match(/^[A-Za-z&,.\d:+=\-/"'()\n ]*$/)) {

            return setSuccess(coursePeditor);
        } else if (coursePeditorVal.length < 5) {

            return setError(coursePeditor, t('course_objective_min_5_char'));
        } else if (coursePeditorVal.length > 1500) {

            return setError(coursePeditor, t('course_requirement_max_1500_char'));
        } else {

            return setError(coursePeditor, t('apha_special_char_allowed'));
        }

    }

    const onBlurcourseDeditorHandler = () => {

        const courseDeditor = document.getElementById("courseDeditor");
        const courseDeditorVal = courseDeditor.value.trim();
        if (courseDeditorVal === "") {

            return setError(courseDeditor, t('enter_course_desciption'));
        } else if (courseDeditorVal.match(/^[A-Za-z&,.\d:+=\-/"'()\n ]*$/)) {

            return setSuccess(courseDeditor);
        } else if (courseDeditorVal.length < 5) {

            return setError(courseDeditor, t('course_objective_min_5_char'));
        } else if (courseDeditorVal.length > 1500) {

            return setError(courseDeditor, t('course_description_man_1500_char'));
        } else {

            return setError(courseDeditor, t('apha_special_char_allowed'));
        }

    }


    if (props.currentStep !== 2) {
        return null
    }
    return (
        <fieldset>
            <div class="form-card">
                <div class="row">
                    <div class="col-7">
                        <h2 class="fs-title">{t('course_description')}:</h2>
                    </div>
                </div>
                <p className="form-control" style={{ marginBottom: "0px" }}>
                    <label for="name">{t('course_objective')} : </label>
                    <textarea value={props.courseOeditor} id='courseOeditor' onBlur={onBlurcourseOeditorHandler} minLength={5} maxLength={1500} placeholder={`${t('enter')} ${t('course_objective')}`} name='courseOeditor' onChange={props.handleChangeCourseeditor} />
                    <span className="registration_input-msg"></span>
                </p>
                <br></br>
                <p className="form-control" style={{ marginBottom: "0px" }}>
                    <label for="name">{t('course_prerequisite')} : </label>
                    <textarea value={props.coursePeditor} id='coursePeditor' onBlur={onBlurcoursePeditorHandler} minLength={5} maxLength={1500} name='coursePeditor' placeholder={`${t('enter')} ${t('course_prerequisite')}`} onChange={props.handleChangeCourseeditor} />
                    <span className="registration_input-msg"></span>
                </p>
                <br></br>
                <p className="form-control" style={{ marginBottom: "0px" }}>
                    <label for="name">{t('course_description')}: </label>
                    <textarea value={props.courseDeditor} id='courseDeditor' onBlur={onBlurcourseDeditorHandler} minLength={5} maxLength={1500} name='courseDeditor' placeholder={`${t('enter')} ${t('course_description')}`} onChange={props.handleChangeCourseeditor} />
                    <span className="registration_input-msg"></span>
                </p>
                <br></br>
            </div>

        </fieldset>
    );
}

function Step3(props) {

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    if (props.currentStep !== 3) {
        return null
    }
    return (
        <fieldset>
            <div class="form-card">
                <div class="row">
                    <div class="col-7">
                        <h2 class="fs-title">{t('course_logos')}:</h2>
                    </div>
                </div>
                <p className="form-control">
                    <label class="control-label" for="name">{t('course_icon')} : </label>(`${t("icon_desp")}`)
                    <input type="file" onChange={props.courseIconHandle} class="form-control" style={{ marginBottom: '0px' }} id="courseIcon" name="courseIcon" accept="image/*" />
                    <br></br>
                    <img src={props.courseIconUrl == '' ? "http://10.244.3.218:8080/uploads/DefaultImage/default.jpg" : props.courseIconUrl}
                        style={{ height: '150px', width: '200px' }} />
                    {/* "http://10.244.3.218:8080/uploads/DefaultImage/default.jpg" */}
                </p>
                <br></br>
                <p className="form-control">
                    <label class="control-label" for="name">{t('course_banner_image')}: </label>(`${t('banner_desp')}`)
                    <input type="file" onChange={props.courseBannerHandle} class="form-control" style={{ marginBottom: '0px' }} id="courseBanner" name="courseBanner" accept="image/*" />
                    <br></br>
                    <img src={props.courseBannerUrl == '' ?
                        "http://10.244.3.218:8080/uploads/DefaultImage/banner.jpg" : props.courseBannerUrl}
                        style={{ height: '150px', width: '100%' }} />
                </p>
                <br></br>

                <p className="form-control">
                    <label class="control-label" for="name">{t('course_introduction_video')}: </label>(`${t("video_desp")}`)
                    <input type="file" onChange={props.courseVideoHandle} class="form-control" style={{ marginBottom: '0px' }} id="courseVideo" name="courseVideo" accept="video/*" />
                    <br></br>
                    <div className="d-flex justify-content-center align-items-center">
                        <video src={props.courseVideoUrl} width="400" controls></video>
                    </div>
                </p>
                <br></br>
            </div>
        </fieldset>
    );
}


function Step4(props) {

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    const [getDurationSelect, setDurationSelect] = useState();
    const [getServerTime, setServerTime] = useState();
    const [getPublishDate, setPublishDate] = useState('');
    const [geteSdate, seteSdate] = useState('');

    useEffect(() => {
        instructorService.getServerTime()
            .then(res => {
                let serTime = res.data;
                setServerTime(serTime.replace(/\s/g, 'T'))
            })
    }, [])

    const onBlurDurationSelect = () => {
        const durationSelect = document.getElementById("courseAccessType");
        const durationSelectVal = durationSelect.value.trim();
        setDurationSelect(durationSelectVal);
        if (durationSelectVal === "" || durationSelectVal === "select") {
            setError(durationSelect, (`${t("select_dura")}`));
        } else {
            setSuccess(durationSelect);
        }
    }

    const onBlurDurationHandler = () => {
        const duration = document.getElementById("duration");
        const durationVal = duration.value.trim();
        if (durationVal === "") {
            setError(duration, (`${t('enter')} ${t('duration')}`));
        } else {
            setSuccess(duration);
        }
    }

    const onBlurPublishDateHandler = () => {
        const publishDate = document.getElementById("publishDate");
        const publishDateVal = publishDate.value.trim();
        const pDate = publishDateVal;
        const cDate = getServerTime;
        setPublishDate(pDate);
        if (publishDateVal === "") {
            setError(publishDate, (`${t('enter')} ${t('publish_date')}`));
        } else if (pDate >= cDate) {
            setSuccess(publishDate);
        }
        else {
            setError(publishDate, (`${t("valid_pub_date")}`));
        }
    }

    const onBlurEnrolStartDateHandler = () => {
        const enrollStartDate = document.getElementById("enrollSdate");
        const enrollStartDateVal = enrollStartDate.value.trim();
        seteSdate(enrollStartDateVal);
        const eSdate = enrollStartDateVal;
        const pDate = getPublishDate;
        if (enrollStartDateVal === "") {
            setError(enrollStartDate, (`${"enrol_start"}`));
        } else if (eSdate > pDate) {
            setSuccess(enrollStartDate);
        }
        else {
            setError(enrollStartDate, (`${t('valid_start_date')}`));
        }
    }

    const onBlurEnrolEndDateHandler = () => {
        const enrollEndDate = document.getElementById("enrollEdate");
        const enrollEndDateVal = enrollEndDate.value.trim();
        const eEdate = new Date(enrollEndDateVal);
        const pDate = new Date(getPublishDate);
        const eSdate = new Date(geteSdate);
        if (enrollEndDateVal === "") {
            setError(enrollEndDate, t("enter_enrollment_end_date"));
        } else if (eEdate > pDate && eEdate >= eSdate) {
            setSuccess(enrollEndDate);
        }
        else {
            setError(enrollEndDate, t("enter_valid_enrollment_date"));
        }
    }

    const onBlurCommencementdateHandler = () => {
        const commencementDate = document.getElementById("commencementDate");
        const commencementDateVal = commencementDate.value.trim();
        const pDate = new Date(getPublishDate);
        const commenceDate = new Date(commencementDateVal);
        const eSdate = new Date(geteSdate);
        if (commencementDateVal === "") {
            setError(commencementDate, t("tenter_commencement_date"));
        } else if (commenceDate > pDate && eSdate < commenceDate) {
            setSuccess(commencementDate);
        } else {
            setError(commencementDate, t("enter_valid_commencement_date"))
        }
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


    if (props.currentStep !== 4) {
        return null
    }

    // props = {...Prev, endDate : props.commenceDate + props.duration} ;
    // //console.log(props);

    return (
        <fieldset>
            <div class="form-card">
                <div class="row">
                    <div class="col-7">
                        <h2 class="fs-title">{t('duration')}:</h2>
                    </div>
                </div>
                <p className="form-control">
                    <label class="control-label" for="name">{t('duration')} [{t('day')}] : </label>
                    <select id="courseAccessType" name='courseAccessType' onBlur={onBlurDurationSelect} value={props.courseAccessType} onChange={props.handleChange} className="form-select h-100">
                        <option value="select" selected="true">{t('select')}</option>
                        <option value="limited">{t('limited')}</option>
                        <option value="unlimited">{t('unlimited')}</option>
                    </select>
                    {/* <span className="registration_input-msg"></span> */}
                    {getDurationSelect === "limited" || props.courseAccessType == 'limited' ?
                        <input type="number" class="form-control" onBlur={onBlurDurationHandler} id="duration" value={props.duration} onChange={props.handleChangeLimited} placeholder={`${t('enter_duration')}`} name="duration" />
                        : getDurationSelect === "unlimited" || props.courseAccessType == 'unlimited' || props.courseAccessType == 'select' ?
                            <input type="number" hidden value={props.duration} class="form-control" onBlur={onBlurDurationHandler} onChange={props.handleChange} id="duration" placeholder={`${t('enter_duration')}`} name="duration" /> : null
                    }
                    <span className="registration_input-msg"></span>
                </p>
                <p className="form-control">
                    <label class="control-label" for="name">{t('publish_date')} : </label> <a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('publish_desc')}
                    </Tooltip>}><i class="fa fa-info-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                    <input type="datetime-local" class="form-control" min={getServerTime} value={props.publishDate} onChange={props.handleChange} onBlur={onBlurPublishDateHandler} step="1" id="publishDate" placeholder={`${t('enter')} ${t('publish_date')}`} name="publishDate" />
                    <span className="registration_input-msg"></span>
                </p>

                <p className="form-control">
                    <label class="control-label" for="name">{t('enrolment_start')} : </label> <a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('enrolment_desc')}
                    </Tooltip>}><i class="fa fa-info-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                    <input type="datetime-local" class="form-control" value={props.enrollSdate} onChange={props.handleChange} title={t('select_course_publish_date')} disabled={getPublishDate.length === 0 ? true : false} min={getPublishDate.length === 0 ? str : getPublishDate} onBlur={onBlurEnrolStartDateHandler} step="1" id="enrollSdate" placeholder={`${t('enter')} ${t('enrolment_start')}`} name="enrollSdate" />
                    <span className="registration_input-msg"></span>
                </p>

                <p className="form-control">
                    <label class="control-label" for="name">{t('enrolment_end')} : </label><a style={{ cursor: 'pointer', color: '#007bff' }}><OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('enrolment_end_desc')}
                    </Tooltip>}><i class="fa fa-info-circle" style={{ fontSize: '18px' }}></i></OverlayTrigger></a>
                    <input type="datetime-local" class="form-control" value={props.enrollEdate} onChange={props.handleChange} title={t('select_course_publish_date')} disabled={getPublishDate.length === 0 ? true : false} min={getPublishDate.length === 0 ? str : getPublishDate} onBlur={onBlurEnrolEndDateHandler} step="1" id="enrollEdate" placeholder={`${t('enter')} ${t('enrolment_end')}`} name="enrollEdate" />
                    <span className="registration_input-msg"></span>
                </p>

                <p className="form-control">
                    <label class="control-label" for="name">{t('commencement_date')} : </label>
                    <a style={{ cursor: 'pointer', color: '#007bff' }}>
                        <OverlayTrigger overlay={
                            <Tooltip id="tooltip-disabled">{t('commencement_date_desc')}
                            </Tooltip>}>
                            <i class="fa fa-info-circle" style={{ fontSize: '18px' }}></i>
                        </OverlayTrigger>
                    </a>
                    <input type="datetime-local" class="form-control" value={props.commencementDate} onChange={props.handleChange} title={t('select_course_publish_date')} disabled={getPublishDate.length === 0 ? true : false} min={getPublishDate.length === 0 ? str : getPublishDate} onBlur={onBlurCommencementdateHandler} step="1" id="commencementDate" placeholder={`${t('enter')} ${t('commencement_date')}`} name="commencementDate" />
                    <span className="registration_input-msg"></span>
                </p>
            </div>
        </fieldset>
    );
}

function Step5(props) {
    const um_api = UserService.USER_API;

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    const [getValidationFlag, setValidationFlag] = useState();
    function validateInstructorProfile() {
        const instructorProfile = document.getElementById("instructorProfile");
        const instructorProfileVal = instructorProfile.value.trim();
        if (instructorProfileVal === "") {
            setValidationFlag(false)
            return setError(instructorProfile, (`${t("enter")} ${t('instructor_profile')}`));
        } else if (instructorProfileVal.match(/^[A-Za-z0-9&., ]{2,250}$/)) {
            setValidationFlag(true);
            return setSuccess(instructorProfile);
        } else if (instructorProfileVal.length > 250) {
            return setError(instructorProfile, t('text_must_range_250_char'));
        } else {
            return setError(instructorProfile, t('alphabet_digit_special_char_allowed'));
        }
    }
    const onBlurInstructorProfileHandler = () => {
        validateInstructorProfile();
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

    function capitalizeFirstLetter(str) {
        let data = `${str}`;
        return data.charAt(0).toUpperCase() + data.slice(1);
    }
    if (props.currentStep !== 5) {
        return null
    }
    return (
        <fieldset>
            <div class="form-card">
                <div class="row">
                    <div class="col-7">
                        <h2 class="fs-title">{t('course_instructor')} :</h2>
                    </div>
                </div>
                <p className="form-control">
                    <label class="control-label" for="name">{t('instructor_name')} : </label>
                    <input type="text" minLength={2} maxLength={50} class="form-control" value={capitalizeFirstLetter(UserService.getUsername())} />
                </p>
                <br></br>
                <p className="form-control">
                    <label class="control-label" for="name">{t('instructor_profile')} : </label>
                    <input type="text" value={props.instructorProfile} class="form-control" minLength={2} maxLength={250} onChange={props.handleChange} onBlur={onBlurInstructorProfileHandler} id="instructorProfile" placeholder={t('enter_instructor_profile')} name="instructorProfile" />
                    <span className="registration_input-msg"></span>
                </p>
                <br></br>
                <p className="form-control">
                    <label class="control-label" for="name">{t('instructor_photo')}: </label>
                    <br></br>
                    <img src={um_api + `getprofilepic/${UserService.getUserid()}`}
                        style={{ height: '150px', width: '200px' }} />
                </p>
                <br></br>
            </div>
        </fieldset>
    );
}

function Step6(props) {

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])


    if (props.currentStep !== 6) {
        return null
    }

    return (
        <fieldset>
            {
                props.successMsg === "Course Created Successfully !!" ?
                    <fieldset>
                        <div class="form-card">
                            <div class="row">
                                {/* <div class="col-7">
                                    <h2 class="fs-title">Finish:</h2>
                                </div> */}
                            </div> <br></br>
                            <h2 class="purple-text text-center"><strong>{t('success')} !</strong></h2> <br></br>
                            <div class="row justify-content-center">
                                <div class="col-3"> <img src={process.env.PUBLIC_URL + `/assets/images/right.jpg`} class="fit-image" /> </div>
                            </div> <br></br>
                            <div class="row justify-content-center">
                                <div class="col-7 text-center">

                                    <h5 class="purple-text text-center">{t('success_desc')}</h5>

                                </div>
                            </div>
                        </div>
                    </fieldset> :
                    <fieldset>
                        <div class="form-card">
                            <div class="row">
                                {/* <div class="col-7">
                                    <h2 class="fs-title-error">Error:</h2>
                                </div> */}
                            </div>
                            <br></br>
                            <h2 class="red-text text-center"><strong>{t('failure')}!</strong></h2> <br></br>
                            <div class="row justify-content-center">
                                <div class="col-3"> <img src={process.env.PUBLIC_URL + `/assets/images/wrong-icon.jpg`} class="fit-image" /> </div>
                            </div> <br></br>
                            <div class="row justify-content-center">
                                <div class="col-7 text-center">
                                    <h5 class="red-text text-center">{props.successCourse}</h5>
                                    <h5 class="red-text text-center">{t('failure_desc')}</h5>
                                </div>
                            </div>
                        </div>
                    </fieldset>
            }
        </fieldset>
    )

}

export default CourseCreate;