import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Modal } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/Register.js';
import { useHistory } from 'react-router-dom'
import service from '../../services/service';
import swal from 'sweetalert';
import ClientCaptcha from "react-client-captcha";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../../services/UserService';
import HomeOne from '../../HomeOne';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import moment from 'moment';
import Webcam from 'react-webcam';
import { CheckEmail } from './CheckEmail';
import adminServices from '../../services/adminServices';



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

const videoConstraints = {
    width: 470,
    height: 240,
    facingMode: "user",
};

function Register() {

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

    const history = useHistory();
    const [getLoading, setLoading] = useState();
    const [captchaCode, setCaptchaCode] = useState({
        captchaCode: ''
    })
    const setCode = captchaCode => {
        setCaptchaCode({ captchaCode });
    }

    const [data, setData] = useState();
    const [captchaHash, setCaptchaHash] = useState();
    const [captchaToken, setCaptchaToken] = useState();

    useEffect(() => {
        service.getRegisterCaptcha()
            .then((res) => {
                //console.log(res.data);
                setData(res.data.captchaImage);
                setCaptchaHash(res.data.captchaHash);
                setCaptchaToken(res.data.captchaToken);
            })
    }, [])

    const handleRefereshCaptcha = () => {
        service.getRegisterCaptcha()
            .then((res) => {
                //console.log(res.data);
                setData(res.data.captchaImage);
                setCaptchaHash(res.data.captchaHash);
                setCaptchaToken(res.data.captchaToken);
            })
    }

    const onBlurFirstNameHandler = () => {
        const fname = document.getElementById("registration_fname");
        const fnameValue = fname.value.trim();


        if (fnameValue === "") {
            setError(fname, t('name_error_desc1'));
        }
        else if (!isfirstName(fnameValue)) {
            setError(fname, t('name_error_desc2'));
        }
        else if (fnameValue.match(/^[A-Za-z\s]{2,50}$/)) {
            setSuccess(fname);
        }
        else {
            setError(fname, t('must_have_2-50_alphabet'));
        }
    }

    const onBlurLastNameHandler = () => {
        const lname = document.getElementById("registration_lname");
        const lnameValue = lname.value.trim();

        if (lnameValue === "") {
            setError(lname, t('last_error_desc1'));
        }
        else if (lnameValue.match(/^[A-Za-z\s]{2,50}$/)) {
            setSuccess(lname);

        } else if (!islastName(lnameValue)) {
            setError(lname, t('pls_dont_use_no_special_char_space'));
        }
        else {
            setError(lname, t('must_have_2-50_alphabet'));
        }
    }

    const onBlurEmailHandler = () => {
        const email = document.getElementById("registration_email");
        const emailValue = email.value.trim();
        //const mailCheck = CheckEmail(emailValue);
        const domainArray = emailValue.split("@");
        const spamDomain = domainArray[1];
        const mailCheck = true;
        //console.log("Register1 -- ", mailCheck)
        if (emailValue === "") {
            setError(email, t('email_error1'));
        }
        else if (mailCheck) {
            adminServices.checkEmailSpam(spamDomain).then((resp) => {
                if (resp.status === 200) {
                    setSuccess(email);
                }
            }).catch((err) => {
                setError(email, t('email_validation'));
            })
            // console.log("Register2 -- ",mailCheck)
            // setError(email, t('email_validation'));
        }
        else if (!isEmail(emailValue)) {
            setError(email, t('email_error2'));
        }
        else {
            setSuccess(email);
        }
    }

    const onBlurMobileHandler = () => {
        const mobile = document.getElementById("registration_mobile");
        const mobileValue = mobile.value.trim();

        if (mobileValue === "") {
            setError(mobile, t('mobile_err1'));
        } else if (!isMobile(mobileValue)) {
            setError(mobile, t('mobile_err2'));
        }
        else if (mobileValue.match(/^[0-9]{10}$/)) {
            setSuccess(mobile);
        }
        else {

            setError(mobile, t('enter_10_digit_no'));
        }
    }

    const onBlurRegimentBeltHandler = () => {
        const RegimentBeltNumber = document.getElementById("registration_RegimentBelt");
        const RegimentBeltNumberValue = RegimentBeltNumber.value.trim();
        ////console.log("RegimentBeltNumberValue.length----------> ", RegimentBeltNumberValue.length);
        if (RegimentBeltNumberValue === "") {
            setError(RegimentBeltNumber, t('belt_err'));
        }
        else if (RegimentBeltNumberValue.match(/^[A-Za-z0-9-/]{1,12}$/)) {
            setSuccess(RegimentBeltNumber);
        }
        // else if (RegimentBeltNumberValue.length > 15) {
        //     setError(RegimentBeltNumber, t('type_correct_belt_no'));
        // }
        else {

            setError(RegimentBeltNumber, t('enter_correct_belt_no'));
        }

    }
    const onBlurDesignationHandler = () => {
        const designation = document.getElementById("registration_designation");
        const designationValue = designation.value.trim();
        if (designationValue === "" || designationValue === "Select Designation") {
            setError(designation, t('desig_err'));
        }
        else {
            setSuccess(designation);
        }
    }

    const onBlurCadreHandler = () => {
        const cadre = document.getElementById("registration_cadre");
        ////console.log(cadre);
        const cadreValue = cadre.value.trim();
        if (cadreValue === " " || cadreValue === "Select Cadre") {
            setError(cadre, t('cadre_err'));
        }
        else {
            setSuccess(cadre);
        }
    }


    const onBlurPlaceOfPostingHandler = () => {
        const PlaceOfPost = document.getElementById("registration_PlaceOfPosting");
        const PlaceOfPostValue = PlaceOfPost.value.trim();
        if (PlaceOfPostValue === "") {
            setError(PlaceOfPost, t('post_err'));
        }
        else if (PlaceOfPostValue.match(/^[A-Za-z \s]{2,100}$/)) {
            setSuccess(PlaceOfPost);
        }
        else {
            setError(PlaceOfPost, t('post_err'));
        }
    }



    const onBlurGPFHandler = () => {
        const gpfNumber = document.getElementById("registration_GPF");
        const gpfNumberValue = gpfNumber.value.trim();

        if (gpfNumberValue === "") {
            setError(gpfNumber, t('gpf/cpf_error'));

        }
        else if (gpfNumberValue.match(/^[A-Za-z0-9 \s]{2,100}$/)) {
            setSuccess(gpfNumber);
        }
        else {
            setError(gpfNumber, t('enter_valid_gpf_number'));

        }

    }
    const onBlurIdentityPhotoHandler = () => {
        // const IdentityPhoto = document.getElementById("registration_IdentityPhoto");
        // const IdentityPhotoValue = IdentityPhoto.value.trim();
        // if (IdentityPhotoValue === "") {
        //     setError(IdentityPhoto, "Select your Identity with Photograph");
        // }
        // else {
        //     setSuccess(IdentityPhoto);
        // }

        if (!cameraIdentityCondition) {
            const IdentityPhoto = document.getElementById("registration_IdentityPhoto");
            const IdentityPhotoValue = IdentityPhoto.value.trim();
            if (IdentityPhotoValue === "") {
                setError(IdentityPhoto, t('identity_err'));
            }
            else {
                setSuccess(IdentityPhoto);
            }
        }
        else {
            const IdentityPhoto = document.getElementById("registration_IdentityPhoto");
            setSuccess(IdentityPhoto);
        }

    }


    const onBlurPhotoHandler = () => {
        // const Photo = document.getElementById("registration_Photo");
        // const PhotoValue = Photo.value.trim();
        // if (PhotoValue === "") {
        //     setError(Photo, "Select your Photograph");
        // }
        // else {
        //     setSuccess(Photo);
        // }
        if (!cameraPhotoCondition) {
            const Photo = document.getElementById("registration_Photo");
            const PhotoValue = Photo.value.trim();
            if (PhotoValue === "") {
                setError(Photo, t('select_photo'));
            }
            else {
                setSuccess(Photo);
            }
        }
        else {
            const Photo = document.getElementById("registration_Photo");
            setSuccess(Photo);
        }
    }

    const onBlurdobHandler = () => {
        const dob = document.getElementById("registration_dob");
        const dobValue = dob.value.trim();
        const date = new Date();
        const date1 = new Date(dobValue);
        let dobFormatted = moment(date).format('yyyy-MM-DD');

        // To calculate the time difference of two dates
        var Difference_In_Time = date.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        // let check =  (dobValue - dobFormatted).getDate();
        ////console.log(Difference_In_Days);
        ////console.log(date1);
        if (dobValue === "") {
            setError(dob, t('select_your_date_of_birth'));
        }
        // else if (Difference_In_Days < 5475) {
        else if (Difference_In_Days < 6570) {
            setError(dob, t('age_err'));
        }
        else {
            setSuccess(dob);
        }
    }

    const onBlurQualifactionHandler = () => {
        const qualification = document.getElementById("registration_Qualification");
        const qualifactionValue = qualification.value.trim();
        if (qualifactionValue === "" || qualifactionValue === "Select Qualification") {
            setError(qualification, t('qualification_err'));
        }
        else {
            setSuccess(qualification);
        }
    }


    const onBlurAddressHandler = () => {
        const address = document.getElementById("registration_Address");
        const addressValue = address.value.trim();
        if (addressValue === "") {
            setError(address, t('add_err'));
        }
        else if (addressValue.match(/^[A-Za-z0-9&.,#\-()+ \n]+$/)) {
            setSuccess(address);
        } else if (addressValue.length > 250) {
            setError(address, t('text_must_range_250_char'));
        }
        else if (addressValue.length < 5) {
            setError(address, t('min_5_char_error'));
        } else {
            setError(address, t('reg_special_character_allow'));
        }
    }

    const [captchaInput, setCaptchaInput] = useState();

    function handleCaptcha(e) {
        setCaptchaInput(e.target.value);
    }

    const [cadre, setCatre] = useState([]);
    const [qualification, setQualification] = useState([]);
    const [designation, setDesignation] = useState([]);
    const [getRegistrationIdInfo, setRegistrationIdInfo] = useState({
        designation: " ",
        dob: "",
        RegimentBeltNumber: " ",
        Cadre: " ",
        PlaceOfPosting: " ",
        GPFNumber: " ",
        qualification: " ",
        address: " ",
        designationName: "",
    });

    useEffect(() => {
        service.RegisterCadre()
            .then((res) => {
                ////console.log(res.data);
                setCatre(res.data);
            })
            .catch((err) => {
                //console.log(err);
            })

        service.RegisterQualification()
            .then((res) => {
                ////console.log(res.data);
                setQualification(res.data);
            })
            .catch((err) => {
                //console.log(err);
            })
        service.RegisterDesignation()
            .then((res) => {
                ////console.log(res.data);
                setDesignation(res.data);
            })
            .catch((err) => {
                //console.log(err);
            })
        //console.log("REGISTRATION _______ ", getRegistrationIdInfo)

    }, [getRegistrationIdInfo])


    ////console.log(getRegistrationIdInfo.dob);

    function formSubmit(e) {
        e.preventDefault();
        let status = true;
        const fname = document.getElementById("registration_fname");
        const lname = document.getElementById("registration_lname");
        const email = document.getElementById("registration_email");
        const mobile = document.getElementById("registration_mobile");
        const captcha = document.getElementById("registration_captcha");

        const designation = document.getElementById("registration_designation");
        const cadre = document.getElementById("registration_cadre");
        const qualification = document.getElementById("registration_Qualification");
        const gpfNumber = document.getElementById("registration_GPF");;
        const PlaceOfPost = document.getElementById("registration_PlaceOfPosting");
        const RegimentBeltNumber = document.getElementById("registration_RegimentBelt");
        const dob = document.getElementById("registration_dob");
        const Photo = document.getElementById("registration_Photo");
        const IdentityPhoto = document.getElementById("registration_IdentityPhoto");
        const address = document.getElementById("registration_Address");


        const fnameValue = fname.value.trim();
        const lnameValue = lname.value.trim();
        const emailValue = email.value.trim();
        const mobileValue = mobile.value.trim();
        const captchaValue = captcha.value.trim();
        const designationValue = designation.value.trim();
        const cadreValue = cadre.value.trim();
        const qualifactionValue = qualification.value.trim();
        const gpfNumberValue = gpfNumber.value.trim();
        const PlaceOfPostValue = PlaceOfPost.value.trim();
        const RegimentBeltNumberValue = RegimentBeltNumber.value.trim();
        const dobValue = dob.value.trim();
        const PhotoValue = Photo.value.trim();
        const IdentityPhotoValue = IdentityPhoto.value.trim();
        const addressValue = address.value.trim();


        if (fnameValue === "") {
            setError(fname, t('first_name_cant_be_blank'));
            status = false;
        } else if (!isfirstName(fnameValue)) {
            setError(fname, t('numbers_and_special_characters_are_not_allowed'));
            status = false;
        }
        else {
            setSuccess(fname);
        }

        if (lnameValue === "") {
            setError(lname, t('last_name_cant_be_blank'));
            status = false;
        } else if (!islastName(lnameValue)) {
            setError(lname, t('numbers_and_special_characters_are_not_allowed'));
            status = false;
        }
        else {
            setSuccess(lname);
        }

        if (emailValue === "") {
            setError(email, t('email_cant_be_blank'));
            status = false;
        } else if (!isEmail(emailValue)) {
            setError(email, t('not_a_valid_email'));
            status = false;
        } else {
            setSuccess(email);
        }

        if (mobileValue === "") {
            setError(mobile, t('mobile_number_cant_be_blank'));
            status = false;
        } else if (!isMobile(mobileValue)) {
            setError(mobile, t('not_a_valid_mobile_number'));
        }
        else {
            setSuccess(mobile);
        }

        if (designationValue === "" || designationValue === "Select Designation") {
            setError(designation, t('desig_err'));
            status = false;
        }
        else {
            setSuccess(designation);
        }

        if (cadreValue === " " || cadreValue === "Select Cadre") {
            setError(cadre, t('cadre_err'));
            status = false;
        }
        else {
            setSuccess(cadre);
        }

        if (qualifactionValue === "" || qualifactionValue === "Select Qualification") {
            setError(qualification, t('qualification_err'));
            status = false;
        }
        else {
            setSuccess(qualification);
        }

        if (gpfNumberValue === "") {
            setError(gpfNumber, t('gpf/cpf_error'));
            status = false;
        }
        else if (gpfNumberValue.match(/^[A-Za-z0-9 \s]{2,100}$/)) {
            setSuccess(gpfNumber);
        }
        else {
            setError(gpfNumber, t('enter_valid_gpf_number'));
            status = false;
        }

        if (PlaceOfPostValue === "") {
            setError(PlaceOfPost, t('post_err'));
        }
        else if (PlaceOfPostValue.match(/^[A-Za-z \s]{2,100}$/)) {
            setSuccess(PlaceOfPost);
        }
        else {
            setError(PlaceOfPost, t('post_err'));
        }

        if (RegimentBeltNumberValue === "") {
            setError(RegimentBeltNumber, t('belt_err'));
        }
        else if (RegimentBeltNumberValue.match(/^[A-Za-z0-9-/]{1,12}$/)) {
            setSuccess(RegimentBeltNumber);
        }
        // else if (RegimentBeltNumberValue.length > 15) {
        //     setError(RegimentBeltNumber, t('type_correct_belt_no'));
        // }
        else {

            setError(RegimentBeltNumber, t('enter_correct_belt_no'));
        }


        //validation for Date of Birth

        const date = new Date();
        const date1 = new Date(dobValue);
        let dobFormatted = moment(date).format('yyyy-MM-DD');

        // To calculate the time difference of two dates
        var Difference_In_Time = date.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


        if (dobValue === "") {
            setError(dob, t('select_your_date_of_birth'));
            status = false;
        }
        else if (Difference_In_Days < 6570) {
            setError(dob, t('age_err'));
        }
        else {
            setSuccess(dob);
        }


        if (PhotoValue === "" && cameraPhotoCondition === false) {
            ////console.log(PhotoValue);
            setError(Photo, t('select_photo'));
            status = false;
        }
        // if (PhotoValue === "") {
        //     setError(Photo, "Select your Photograph");
        //     status = false;
        // }
        else {
            setSuccess(Photo);
        }


        // if (IdentityPhotoValue === "") {
        //     setError(IdentityPhoto, "Select your Identity with Photograph");
        //     status = false;
        // }
        if (IdentityPhotoValue === "" && cameraIdentityCondition === false) {
            ////console.log(getIdentity);
            setError(IdentityPhoto, t('identity_err'));
            status = false;
        }
        else {
            setSuccess(IdentityPhoto);
        }

        if (addressValue === "") {
            setError(address, t('add_err'));
        }
        else if (addressValue.match(/^[A-Za-z0-9&.,#\-()+ " ' \n]{2,250}$/)) {
            setSuccess(address);
        } else if (addressValue.length > 250) {
            setError(address, t('text_must_range_250_char'));
        }
        else if (addressValue.length < 5) {
            setError(address, t('min_5_char_error'));
        } else {
            setError(address, t('reg_special_character_allow'));
        }

        if (status) {
            setLoading(true);

            ////console.log("dob", getRegistrationIdInfo.dob);
            let dobFormatted = moment(getRegistrationIdInfo.dob).format('DD-MM-yyyy');

            let idcard = getIdentity;
            let profilePhoto = getPhoto;

            ////console.log("profilePhoto", profilePhoto);
            //console.log("profilePhoto", profilePhoto[0]);
            const formData1 = new FormData();
            if (cameraIdentityCondition) {
                ////console.log("CAMERA ------- ", idcard);
                formData1.append("file2", idcard);
            }
            else {
                formData1.append("file2", idcard[0]);
            }
            // formData1.append("file2", idcard[0]);
            // formData1.append("file1", profilePhoto[0]);
            if (cameraPhotoCondition) {
                ////console.log("Camera")
                formData1.append("file1", profilePhoto);
            }
            else {
                ////console.log("File Upload")
                formData1.append("file1", profilePhoto[0]);
            }
            formData1.append("firstName", fnameValue);
            formData1.append("lastName", lnameValue);
            formData1.append("email", emailValue);
            formData1.append("mobile", mobileValue);
            formData1.append("desgId", getRegistrationIdInfo.designation);
            formData1.append("dob", dobFormatted);
            formData1.append("beltNumber", getRegistrationIdInfo.RegimentBeltNumber);
            formData1.append("cadreId", getRegistrationIdInfo.Cadre);
            formData1.append("placeOfPosting", getRegistrationIdInfo.PlaceOfPosting);
            formData1.append("gpfNumber", getRegistrationIdInfo.GPFNumber);
            formData1.append("qualId", getRegistrationIdInfo.qualification);
            formData1.append("address", getRegistrationIdInfo.address);
            formData1.append("captchaHash", captchaHash);
            formData1.append("captchaInput", captchaInput);
            formData1.append("captchaToken", captchaToken);




            //to check data in formdata
            // for (var key of formData1.entries()) {
            //     //console.log(key[0] + ', ' + key[1]);
            // }

            service.Register(formData1)
                .then(async response => {
                    setLoading(false);
                    ////console.log(response);
                    if (response.data === "double-extension-file") {
                        swal(t('error'), t('double-ext-file'), "error");
                    }
                    else if (response.data == "Exists") {
                        await swal(t('learner_already_exit'), t('try_diff_mail'), "warning");
                    }
                    else if (response.data == "error") {
                        await swal(t('learner_already_exit'), t('try_diff_mail'), "warning");
                    }
                    else {
                        await swal(t('reg_success'), t('reg_success_desc'), "success");
                        history.push('/');
                    }

                }).catch(err => {
                    setLoading(false);
                    //console.log(err.response);
                    if (err.response.data.status === 406) {
                        setError(captcha, t('enter_correct_captcha'));
                    }
                    else if (err.response.data.status === 400) {
                        setError(captcha, t('invalid_token'));
                    }
                });
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

    function clear(input) {
        const formControl = input.parentElement;
        formControl.className = "form-control light";
    }

    function isEmail(email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    }
    function isMobile(mobile) {
        return /^[6-9]\d{9}$/.test(mobile);
    }
    function isfirstName(firstName) {
        return /^[_A-z]*((-|\s)*[_A-z])*$/.test(firstName);
    }
    function islastName(lastName) {
        return /^[_A-z]*((-|\s)*[_A-z])*$/.test(lastName);
    }

    function changeBackgroundOver(e) {
        e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
    }

    function changeBackgroundOut(e) {
        e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
    }
    const loginHandler = () => {
        if (UserService.isLoggedIn()) {
            history.push("/");
        }
    }
    loginHandler();

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

    const [show, setShow] = useState();
    const [getIdentity, setIdentity] = useState();
    const [getPhoto, setPhoto] = useState();

    const selectFile = (event) => {
        setCameraIdentityCondition(false);
        var files = event.target.files;
        ////console.log(files);
        for (var i = 0; i < files.length; i++) {
            ////console.log(files[i].type);
            if (files[i].type == "application/msword" || files[i].type == "application/vnd.rar" ||
                files[i].type == "application/x-msdownload" || files[i].type == "text/plain" || files[i].type == "application/x-zip-compressed" || files[i].type == "application/zip") {
                return swal(t('warnings'), t('invalid_file'), "warning");
            }
            else {
                setShow(false);
            }
        }
        setIdentity(event.target.files);
    }
    const selectPhoto = (event) => {
        setcameraPhotoCondition(false);
        var files = event.target.files;
        ////console.log(files);
        for (var i = 0; i < files.length; i++) {
            ////console.log(files[i].type);
            if (files[i].type == "application/msword" || files[i].type == "application/vnd.rar" || files[i].type == "application/pdf" ||
                files[i].type == "application/x-msdownload" || files[i].type == "text/plain" || files[i].type == "application/x-zip-compressed" || files[i].type == "application/zip") {
                return swal(t('warnings'), t('invalid_file_2'), "warning");
            }
            else {
                setShow(false);
            }
        }
        setPhoto(event.target.files);
    }

    ///////////////////////  CAMERA Photo   //////////////////////////
    const [modalShow, setModalShow] = useState(false);
    const webcamRef = useRef(null);
    const [url, setUrl] = useState();
    const capturePhoto = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
    }, [webcamRef]);
    const Capture = () => {
        setUrl();
        setModalShow(true);
    }

    // useEffect(() => {
    //     //console.log(getPhoto);
    // }, [getPhoto])

    const [cameraPhotoCondition, setcameraPhotoCondition] = useState(false);

    const file = () => {
        setcameraPhotoCondition(true);
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mime });
        }
        var file = dataURLtoFile(url, "image.jpeg");
        ////console.log(file);
        ////console.log(getPhoto);
        setModalShow(false);
        setPhoto(file);
    }

    /////////////////////////// Photo Camera End  //////////////////

    //////////////////////// Camera Identity ///////////////////////////

    const [cameraIdentityCondition, setCameraIdentityCondition] = useState(false);

    const [modalShowIdentity, setModalShowIdentity] = useState(false);
    const webcamRefIdentity = useRef(null);
    const [urlIdentity, setUrlIdentity] = useState();
    const capturePhotoIdentity = useCallback(() => {
        const imageSrc = webcamRefIdentity.current.getScreenshot();
        setUrlIdentity(imageSrc);
    }, [webcamRefIdentity]);
    const CaptureIdentity = () => {
        setUrlIdentity();
        setModalShowIdentity(true);
    }

    useEffect(() => {
        ////console.log(getIdentity);
        ////console.log(cameraIdentityCondition);
    }, [getIdentity])


    const fileIdentity = () => {
        setCameraIdentityCondition(true);

        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mime });
        }

        var file = dataURLtoFile(urlIdentity, "identityImage.jpeg");
        ////console.log(file);
        ////console.log(file);
        ////console.log(getPhoto);
        setModalShowIdentity(false);
        setIdentity(file);
    }

    const [other, setOther] = useState(false);

    const desInfoUpdate = (e) => {
        setRegistrationIdInfo({ ...getRegistrationIdInfo, designation: e.target.value })
        const value = e.target.value;
        //console.log("ddddddddddddd", designation)
        designation.map((des) => {
            if (des.desgId == value && des.designation.trim().toLowerCase() == 'other') {
                const RegimentBeltNumber = document.getElementById("registration_RegimentBelt");
                RegimentBeltNumber.value = "";
                clear(RegimentBeltNumber)
                setRegistrationIdInfo({ ...getRegistrationIdInfo, RegimentBeltNumber: "" })
                //console.log(true)
                setOther(true);
            }
            else if (des.desgId == value && des.designation.trim().toLowerCase() !== 'other') {
                //console.log(false)
                setOther(false);
            }
        })
    }

    ////console.log("getRegistrationIdInfo-------" + getRegistrationIdInfo.address);
    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('registration')} />

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>{t('registration')}</h3>
                                    </div>
                                    <form onSubmit={formSubmit} className="form" enctype="multipart/form-data" action="..." method="post">
                                        <Row>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_fname">{t('first_name')}</label>
                                                    <input type="text" name="firstName" placeholder={t('first_name')} id="registration_fname" onBlur={onBlurFirstNameHandler} minLength="2" maxLength="30" />
                                                    <span className="registration_input-msg "></span>
                                                </p>
                                            </Col>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_lname">{t('last_name')}</label>
                                                    <input type="text" name="lastName" placeholder={t('last_name')} id="registration_lname" onBlur={onBlurLastNameHandler} minLength="2" maxLength="30" />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_mobile">{t('mobile')}</label>
                                                    <input type="text" name="mobile" placeholder={t('mobile')} id="registration_mobile" minLength="10" maxLength="10" onBlur={onBlurMobileHandler} />
                                                    <span className="registration_input-msg "></span>
                                                </p>
                                            </Col>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_email">{t('email_address')}</label>
                                                    <input type="email" name="email" placeholder={t('email_address')} id="registration_email" onBlur={onBlurEmailHandler} minLength="2" maxLength="40" />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_designation">{t('select_designation')}</label>
                                                    <select className='h-100' onChange={e => desInfoUpdate(e)} id='registration_designation' placeholder={t('select_designation')} onBlur={onBlurDesignationHandler}>
                                                        <option selected>{t('select_designation')}</option>
                                                        {
                                                            designation.map((designation, index) => {
                                                                return (
                                                                    <option value={
                                                                        designation.desgId

                                                                    }>
                                                                        {designation.designation}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <span className="registration_input-msg spanClass"></span>
                                                </p>
                                            </Col>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_cadre">{t('select_cadre')}</label>
                                                    <select className='h-100' onChange={e => setRegistrationIdInfo({ ...getRegistrationIdInfo, Cadre: e.target.value })} placeholder={t('select_cadre')} onBlur={onBlurCadreHandler} id="registration_cadre">
                                                        <option selected>{t('select_cadre')}</option>
                                                        {
                                                            cadre.map((cadre, index) => {
                                                                return (
                                                                    <option value={
                                                                        cadre.cadreId
                                                                    }>
                                                                        {cadre.cadre}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_Regiment/Belt">{t('belt')}</label>
                                                    {
                                                        other
                                                            ?
                                                            <>
                                                                <input type="text" name="RegimentBeltNumber" placeholder={t('belt')} id="registration_RegimentBelt"
                                                                    onBlur={onBlurRegimentBeltHandler} maxLength="12"
                                                                    onChange={e => setRegistrationIdInfo({ ...getRegistrationIdInfo, RegimentBeltNumber: e.target.value })} disabled />
                                                            </>
                                                            :
                                                            <>
                                                                <input type="text" name="RegimentBeltNumber" placeholder={t('belt')} id="registration_RegimentBelt"
                                                                    onBlur={onBlurRegimentBeltHandler} maxLength="12"
                                                                    onChange={e => setRegistrationIdInfo({ ...getRegistrationIdInfo, RegimentBeltNumber: e.target.value })} />

                                                            </>
                                                    }
                                                    <span className="registration_input-msg "></span>
                                                </p>
                                            </Col>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_PlaceOfPosting"> {t('place_posting')}</label>
                                                    <input type="text" name="Enter Place of Posting" placeholder={t('place_posting')} id="registration_PlaceOfPosting" onBlur={onBlurPlaceOfPostingHandler} maxLength="30"
                                                        onChange={e => setRegistrationIdInfo({ ...getRegistrationIdInfo, PlaceOfPosting: e.target.value })} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    {/* <Form.Group> */}
                                                    <label htmlFor="registration_dob">{t('date_of_birth')}</label>
                                                    <Form.Control dateFormate='dd/MM/yyyy' max={timeNow} placeholder={t('date_of_birth')}
                                                        onBlur={onBlurdobHandler}
                                                        onChange={e => setRegistrationIdInfo({ ...getRegistrationIdInfo, dob: e.target.value })} type="Date" id="registration_dob" />
                                                    <span className="registration_input-msg "></span>
                                                    {/* </Form.Group> */}
                                                </p>
                                            </Col>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_GPF">{t('gpf/cpf_number')}</label>
                                                    <input type="text" name="GPF" placeholder={t('gpf/cpf_number')} id="registration_GPF" onBlur={onBlurGPFHandler} maxLength="15"
                                                        onChange={e => setRegistrationIdInfo({ ...getRegistrationIdInfo, GPFNumber: e.target.value })} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm={6}>
                                                <p className="form-control" >
                                                    <label style={{ fontWeight: 'bold' }}>{t('user_photo')} :</label>
                                                    <input type="file" id="registration_Photo" onChange={selectPhoto} onBlur={onBlurPhotoHandler}
                                                        accept="image/jpeg, image/png" style={{ padding: "10px" }} />
                                                    {/* <i id="registration_Photo_Camera" class="fa fa-camera" style={{ marginLeft: "-45px", fontSize: "20px" }} onClick={() => { Capture() }}></i> */}
                                                    <span className="registration_input-msg"></span>
                                                    <br></br>
                                                    <p> {t('image_size_less_200kb')}</p>
                                                </p>
                                            </Col>
                                            <Col sm={6}>
                                                <p className="form-control">
                                                    <label style={{ fontWeight: 'bold' }}>{t('upload_dept')} :</label>
                                                    <input type="file" id="registration_IdentityPhoto"
                                                        onChange={selectFile} onBlur={onBlurIdentityPhotoHandler}
                                                        accept="image/* , application/pdf" style={{ padding: "10px" }} />
                                                    {/* <i id="registration_Photo_Camera" class="fa fa-camera " style={{ marginLeft: "-45px", fontSize: "20px" }} onClick={() => { CaptureIdentity() }}></i> */}
                                                    <span className="registration_input-msg"></span>
                                                    <br></br>
                                                    <p> {t('image_size_less_200kb')}</p>
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_Qualification">{t('select_qualification')}</label>
                                                    <select className='h-100' onChange={e => setRegistrationIdInfo({ ...getRegistrationIdInfo, qualification: e.target.value })}
                                                        placeholder={t('qualification')} id='registration_Qualification' onBlur={onBlurQualifactionHandler}>
                                                        <option selected>{t('select_qualification')}</option>
                                                        {
                                                            qualification.map((qualification, index) => {
                                                                return (
                                                                    <option value={
                                                                        qualification.qualId
                                                                    }>
                                                                        {qualification.qualification}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12}>
                                                <p className="form-control">
                                                    <label htmlFor="registration_Address">{t('add_communication')} ({t('add_communication_desc')})</label>
                                                    <textarea name="Address" type="text" className="form-control textareaClass" onBlur={onBlurAddressHandler} id="registration_Address"
                                                        onChange={e => setRegistrationIdInfo({ ...getRegistrationIdInfo, address: e.target.value })} minLength="5" maxLength="250" />
                                                    <span className="registration_input-msg "></span>
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="3">
                                                <div>
                                                    {/* <ClientCaptcha captchaCode={setCode} charsCount={5} /> */}
                                                    <img src={`data:image/jpeg;base64,${data}`} style={{ height: "50px" }} />
                                                </div>
                                            </Col>
                                            <Col md="1">
                                                <button className='btn' onClick={handleRefereshCaptcha} style={{ color: 'white', fontSize: "24px", background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}><i class="fa fa-refresh"></i></button>
                                            </Col>
                                            <Col md="4">
                                                <p className="form-control">
                                                    {/* <label htmlFor="registration_captcha">{t('captcha')}</label> */}
                                                    <input type="text" placeholder={t('captcha')} id="registration_captcha" onChange={(e) => handleCaptcha(e)} minLength="4" maxLength="7" />
                                                    <span className="registration_input-msg "></span>
                                                </p>
                                            </Col>
                                        </Row>
                                        {getLoading ?
                                            <button style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }} onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} class="btn" disabled>
                                                <div class="spinner-border" role="status">
                                                    <span class="sr-only">{t('loading')}</span>
                                                </div>   {t('register_now')}
                                            </button> :
                                            <button style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }} onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" class="btn">
                                                {t('register_now')}
                                            </button>
                                        }

                                    </form>
                                    <div className="have_account-btn text-center">
                                        {/* <p>Already have an account? <Link to="/login">Login Here</Link></p> */}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Footer 2 */}
                <FooterTwo />

            </div>
            <Modal centered show={modalShow} onHide={() => { setModalShow(false) }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title style={{ alignContent: "center" }}>{t('capture_photo')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        !url
                            ?
                            <>
                                <div >
                                    <Webcam
                                        ref={webcamRef}
                                        // height={720}
                                        mirrored={true}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                        style={{ borderRadius: '5px' }}
                                    // onUserMedia={onUserMedia}
                                    />
                                </div>
                            </>
                            :
                            <>
                                <img src={url} alt="Screenshot" style={{ borderRadius: '5px', }} />
                            </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        {
                            url
                                ?
                                <>
                                    <button onClick={() => { file(); }} style={{ borderRadius: "5px", backgroundColor: "#00a76a", borderStyle: "none", marginRight: "10px" }} > {t('ok')} </button>
                                </>
                                :
                                <></>

                        }
                        <button style={{ borderRadius: "5px", backgroundColor: "#00a76a", borderStyle: "none", marginRight: "10px" }} onClick={capturePhoto}> {t('capture')} </button>
                        <button style={{ borderRadius: "5px", backgroundColor: "#8ad8e5", borderStyle: "none" }} onClick={() => setUrl(null)} > {t('refresh')} </button>
                    </Row>
                </Modal.Footer>
            </Modal>
            <Modal centered show={modalShowIdentity} onHide={() => { setModalShowIdentity(false) }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title style={{ alignContent: "center" }}>{t('capture_photo_identity')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        !urlIdentity
                            ?
                            <>
                                <div >
                                    <Webcam
                                        ref={webcamRefIdentity}
                                        // height={720}
                                        mirrored={true}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                        style={{ borderRadius: '5px' }}
                                    // onUserMedia={onUserMedia}
                                    />
                                </div>
                            </>
                            :
                            <>
                                <img src={urlIdentity} alt="Screenshot" style={{ borderRadius: '5px', }} />
                            </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        {
                            urlIdentity
                                ?
                                <>
                                    <button onClick={() => { fileIdentity(); }} style={{ borderRadius: "5px", backgroundColor: "#00a76a", borderStyle: "none", marginRight: "10px" }} > {t('ok')} </button>
                                </>
                                :
                                <></>

                        }
                        <button style={{ borderRadius: "5px", backgroundColor: "#00a76a", borderStyle: "none", marginRight: "10px" }} onClick={capturePhotoIdentity}> {t('capture')} </button>
                        <button style={{ borderRadius: "5px", backgroundColor: "#8ad8e5", borderStyle: "none" }} onClick={() => setUrlIdentity(null)} > {t('refresh')} </button>
                    </Row>
                </Modal.Footer>
            </Modal>
        </Styles>
    )
}

export default Register