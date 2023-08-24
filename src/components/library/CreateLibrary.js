import React, { useState, useEffect } from 'react'
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from '../../components/FooterTwo';
import { Styles } from "./styles/AddCourseCategory.js"
import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import instructorService from '../../services/instructorService';
import { CKEditor } from 'ckeditor4-react';
import './styles/createcourse.css'
import swal from 'sweetalert';
import UserService from '../../services/UserService';
import MultiStepProgressBar from './MultiStepProgressBar';
import './styles/createcourse.css'
import { Prev } from 'react-bootstrap/esm/PageItem';
import { Link, useHistory } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';


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


const SwalMy = withReactContent(Swal);

function CreateLibrary(props) {

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

    const history = useHistory();

    const [getState, State] = useState({
        currentStep: 1,
        courseName: '',
        categoryId: '',
        courseAccessType: '',
        courseIcon: '',
        courseIconUrl: '',
        instructorProfile: '',
        successMsg: '',
        processing: true,

    });

    const handleChange = event => {
        const { name, value } = event.target
        State({
            ...getState,
            [name]: value
        })
    }

    const [time, setTime] = useState(5)
    var timeVar = 5

    const handleTimer = () => {
        const redirectTime = setInterval(() => {
            ////console.log("Calling handleTimer")
            ////console.log("time", time)
            if (timeVar === 0) {
                history.push(`${process.env.PUBLIC_URL + "/view-library"}`);
                // window.location.replace(`${process.env.PUBLIC_URL + "/view-library"}`)
                ////console.log("time === 0 Condition Matched")
                clearInterval(redirectTime)
            }
            else {
                setTime(prevState => { return prevState - 1 });
                timeVar = timeVar - 1
            }
        }, 1000)
    }

    let instructorId = UserService.getUserid();
    const [getValidationFlag, setValidationFlag] = useState();
    const [getFeeSelect, setFeeSelect] = useState();
    const [getCourseCat, setCourseCat] = useState([]);

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
                        return swal(t('warning'), t('icon_size'), "warning");

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
                    swal(t('warning'), t('valid_image'), "warning");
                }
            }
        }
    }


    const [loading, setLoading] = useState(false);

    const handleSubmit = event => {
        setLoading(true)

        event.preventDefault();
        let status = true;

        if (getState.courseName === "") {

            status = false;
            setLoading(false);
        } else if (!getState.courseName.match(/[A-Za-z0-9&., ]+$/)) {

            setLoading(false);
            status = false;
        } else if (getState.courseName.length > 50) {

            setLoading(false);
            status = false;
        }

        if (getState.instructorProfile === "") {

            setLoading(false);
            status = false;
        } else if (!getState.instructorProfile.match(/[A-Za-z0-9&.,() ]+$/)) {

            setLoading(false);
            status = false;
        } else if (getState.instructorProfile.length > 250) {

            setLoading(false);
            status = false;
        }

        const userId = UserService.getUserid();
        let formData = new FormData();
        formData.append("courseName", getState.courseName);
        formData.append("inst_profile", getState.instructorProfile);
        formData.append("userId", userId);
        formData.append("file", getState.courseIcon);
        if (status === true) {
            instructorService.addLibrary(formData).then((resp) => {
                if (resp.data === "Double-File-Extention") {
                    swal(t('error'), t('double-ext-file'), "error");
                }
                if (resp.status == 200) {
                    setLoading(false);
                    State({
                        ...getState,
                        successMsg: "success",
                        currentStep: 2,
                    })
                    handleTimer();
                }
            }).catch((err) => {
                //console.log(err);
                setLoading(false);
            })
        }
    }




    return (
        <Styles>
            <div className="main-wrapper registration-page">
                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('create_library')} />

                <section className="registration-area">
                    <Container>
                        <div className="registration-box" style={{ maxWidth: "1200px" }}>
                            {
                                getState.successMsg !== "success"
                                    ?
                                    <>
                                        <h2 id="heading" ><h3>{t('create_library_category')}</h3></h2>
                                        <p style={{ textAlign: 'center' }}>{t('fill_all_form')}</p>
                                        <br></br>
                                        <br></br>
                                    </>
                                    :
                                    <>
                                    </>
                            }


                            <form onSubmit={handleSubmit} className="form" id="msform">
                                <Step1
                                    currentStep={getState.currentStep}
                                    handleChange={handleChange}
                                    courseIconHandle={courseIconHandle}
                                    courseIcon={getState.courseIcon}
                                    courseIconUrl={getState.courseIconUrl}
                                    instructorProfile={getState.instructorProfile}
                                    courseName={getState.courseName}
                                />
                                <Step2
                                    currentStep={getState.currentStep}
                                    successMsg={getState.successMsg}
                                    timer={time}
                                />
                                <div className="registration-box" style={{ maxWidth: "1200px", border: '0px', boxShadow: 'none' }}>
                                    {

                                        getState.successMsg == 'success'
                                            ?
                                            <></>

                                            // <Link style={{ borderRadius: '5px' }} className="next action-button" to={`${process.env.PUBLIC_URL + "/"}`} >Home</Link>
                                            :
                                            <button type='submit' style={{ borderRadius: '5px' }} className="next action-button">
                                                {
                                                    loading === true
                                                        ?
                                                        <>
                                                            <div class="spinner-border" role="status">
                                                                <span class="sr-only">{t('loading')}</span>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            {t('submit')}
                                                        </>
                                                }
                                            </button>

                                    }


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
            setValidationFlag(false)
            return setError(courseName, (t('enter_c_name')));
        } else if (courseNameVal.match(/[A-Za-z0-9&., ]+$/)) {
            setValidationFlag(true);
            return setSuccess(courseName);
        } else if (courseNameVal.length > 50) {
            setValidationFlag(false)
            return setError(courseName, t('text_max_50_error'));
        } else {
            setValidationFlag(false)
            return setError(courseName, t('alpha_digit_space_allowed'));
        }

    }

    const onBlurCourseNameHandler = () => {
        validateCourseName();
    }

    function validateInstructorProfile() {
        const instructorProfile = document.getElementById("instructorProfile");
        const instructorProfileVal = instructorProfile.value.trim();
        if (instructorProfileVal === "") {
            setValidationFlag(false)
            return setError(instructorProfile, (t('enter_instructor_profile')));
        } else if (instructorProfileVal.match(/^[A-Za-z0-9&.,() ]+$/)) {
            setValidationFlag(true);
            return setSuccess(instructorProfile);
        } else if (instructorProfileVal.length > 250) {
            setValidationFlag(false)
            return setError(instructorProfile, t('text_must_range_250_char'));
        } else {
            setValidationFlag(false)
            return setError(instructorProfile, t('alpha_digit_space_allowed'));
        }
    }

    const onBlurInstructorProfileHandler = () => {
        validateInstructorProfile();
    }



    const onBlurFeeSelect = () => {
        const feeSelect = document.getElementById("courseType");
        const feeSelectVal = feeSelect.value.trim();
        setFeeSelect(feeSelectVal);
        if (feeSelectVal === "" || feeSelectVal === "selectFeeType") {
            setError(feeSelect, t("select_fee"));
        } else {
            setSuccess(feeSelect);
        }
    }

    function validateFee() {

        const courseFee = document.getElementById("courseFee");
        const courseFeeVal = courseFee.value.trim();
        if (courseFeeVal === "") {
            setError(courseFee, t("course_cost"));
        } else {
            setValidationFlag(true);
        }
    }

    const onBlurFeeHandler = () => {
        validateFee();
    }

    function validateCourseCategory() {
        const courseCategory = document.getElementById("categoryId");
        const courseCategoryVal = courseCategory.value.trim();
        if (courseCategoryVal === "") {
            setError(courseCategory, t('sel_cat'));
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
                        <h2 class="fs-title">{t('library_category_name')}:</h2>
                    </div>
                </div>

                <p className="form-control">
                    <label class="control-label" for="name">{t('libraryName')} : </label>
                    <input className="form-control" minLength={3} maxLength={50} onBlur={onBlurCourseNameHandler} id="courseName" name="courseName" type="courseName" placeholder={t('enter_c_name')}
                        value={props.courseName}
                        onChange={props.handleChange}
                    />
                    <span className="registration_input-msg"></span>
                </p>

                <p className="form-control">
                    <label class="control-label" for="name">{t('instructor_profile')} : </label>
                    <input type="text" minLength={3} maxLength={250} value={props.instructorProfile} class="form-control" onChange={props.handleChange} onBlur={onBlurInstructorProfileHandler} id="instructorProfile" placeholder={t('enter_instructor_profile')} name="instructorProfile" />
                    <span className="registration_input-msg"></span>
                </p>

                <p className="form-control">
                    <label class="control-label" for="name">{t('instructor_profile')} : </label>({t('icon_desp')})
                    <input type="file" onChange={props.courseIconHandle} class="form-control" style={{ marginBottom: '0px' }} id="courseIcon" name="courseIcon" accept="image/*" />
                    <br></br>
                    <img src={props.courseIconUrl == '' ? "http://10.244.3.218:8080/uploads/DefaultImage/default.jpg" : props.courseIconUrl}
                        style={{ height: '150px', width: '200px' }} />
                    {/* "http://10.244.3.218:8080/uploads/DefaultImage/default.jpg" */}
                </p>

                {/* <p className="form-control">
                    <label for="name">Category Name : </label>
                    <select id="categoryId" name='categoryId' value={props.categoryId} onChange={props.handleChange} onBlur={onBlurCourseCatSelect} class="form-select selectpicker">
                        <option selected="true" value="">Select</option>
                        {getCourseCat.map((d) => {
                            return (
                                <option value={d.categoryId}>{d.categoryName}</option>
                            )
                        })}
                    </select>
                    <span className="registration_input-msg"></span>
                </p> */}

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

    // if (props.successMsg === "success") {
    //     setTimeout(() => {
    //         window.location.replace(`${process.env.PUBLIC_URL + "/view-library"}`)
    //     }, 5000)
    // }


    // const [timer , setTimer] = useState(5)

    // const functionTimer = () =>{
    //     setTimer(timer - 1);

    // }
    // setInterval(functionTimer , 5000)



    if (props.currentStep !== 2) {
        return null
    }

    return (
        <fieldset>
            {
                props.successMsg === "success" ?
                    <fieldset>
                        <div class="form-card">
                            <div class="row">
                                {/* <div class="col-7">
                                    <h2 class="fs-title">Finish:</h2>
                                </div> */}
                            </div> <br></br>
                            {/* <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2> <br></br> */}
                            <div class="row justify-content-center">
                                <div class="col-3"> <img src={process.env.PUBLIC_URL + `/assets/images/right.jpg`} class="fit-image" /> </div>
                            </div> <br></br>
                            <div class="row justify-content-center">
                                <div class="col-7 text-center">
                                    <h5 class="purple-text text-center">{t('created_library')}</h5>
                                </div>
                                <div class="col-7 text-center">
                                    <h5 class="purple-text text-center">{t('redirecting_to_published_library')} {props.timer}</h5>
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
                            </div> <br></br>
                            <h2 class="red-text text-center"><strong>{t('failure')}</strong></h2> <br></br>
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







export default CreateLibrary;