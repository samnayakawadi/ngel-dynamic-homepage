import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import GoogleMap from './GoogleMap';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/contact.js';
import service from '../../services/service';
import swal from 'sweetalert';
import ClientCaptcha from "react-client-captcha";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../../services/UserService';

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
function Contact() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const [data, setData] = useState();
    const [captchaHash, setCaptchaHash] = useState();
    const [captchaToken, setCaptchaToken] = useState();

    useEffect(() => {
        service.getContactCaptcha()
            .then((res) => {
                //console.log(res.data);
                setData(res.data.captchaImage);
                setCaptchaHash(res.data.captchaHash);
                setCaptchaToken(res.data.captchaToken);
            })
    }, [])

    const handleRefereshCaptcha = () => {
        service.getContactCaptcha()
            .then((res) => {
                //console.log(res.data);
                setData(res.data.captchaImage);
                setCaptchaHash(res.data.captchaHash);
                setCaptchaToken(res.data.captchaToken);
            })
    }

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])
    const [captchaCode, setCaptchaCode] = useState({
        captchaCode: ''
    })

    const [loading, setLoading] = useState();

    const setCode = captchaCode => {
        setCaptchaCode({ captchaCode });
    }

    function onBlurHandlerName() {
        const name = document.getElementById("contact_name");
        const nameValue = name.value.trim();

        if (nameValue === "") {
            setError(name, t('name_cant_be_blank'));
        }
        else if (nameValue.length < 3) {
            setError(name, t('name_must_be_greater_than_3_characters'));
        }
        else if (nameValue.length > 50) {
            setError(name, t('name_must_be_less_than_50_characters'));
        }
        else if (nameValue.match(/^[A-Za-z ]*$/)) {
            setSuccess(name);
        }
        else {

            setError(name, t('not_a_valid_name'));
        }

    }

    function onBlurHandlerEmail() {
        const email = document.getElementById("contact_email");
        const emailValue = email.value.trim();

        if (emailValue === "") {
            setError(email, t('email_cant_be_blank'));
        } else if (!isEmail(emailValue)) {
            setError(email, t('not_a_valid_email'));
        } else {
            setSuccess(email);
        }
    }

    function onBlurHandlerSubject() {
        const subject = document.getElementById("contact_subject");
        const subjectValue = subject.value.trim();

        if (subjectValue === "") {
            setError(subject, t('subject_cant_be_blank'));

        }
        else if (subjectValue.length < 3) {
            setError(subject, t('subject_must_be_greater_than_3_characters'));

        }
        else if (subjectValue.length > 150) {
            setError(subject, t('subject_must_be_less_than_150_characters'));

        }
        else if (subjectValue.match(/^[A-Za-z&,.\d:+=\-/"'() ]*$/)) {
            setSuccess(subject);
        }
        else {
            setError(subject, t('not_a_valid_subject'));

        }

    }

    function onBlurHandlerMessage() {
        const message = document.getElementById("contact_message");
        const messageValue = message.value.trim();

        if (messageValue === "") {
            setError(message, t('message_cant_be_blank'));

        }
        else if (messageValue.length < 3) {
            setError(message, t('message_must_be_greater_than_3_characters'));

        }
        else if (messageValue.length > 2000) {
            setError(message, t('message_must_be_less_than_2000_characters'));

        }
        else if (messageValue.match(/^[A-Za-z&,.\d:+=\-/"'()\n ]*$/)) {
            setSuccess(message);
        }
        else {
            setError(message, t('not_a_valid_message'));

        }
    }

    const [captchaInput, setCaptchaInput] = useState();

    function handleCaptcha(e) {
        setCaptchaInput(e.target.value);
    }

    function formSubmit(e) {
        e.preventDefault();
        let status = true;
        const name = document.getElementById("contact_name");
        const email = document.getElementById("contact_email");
        const subject = document.getElementById("contact_subject");
        const message = document.getElementById("contact_message");
        const captcha = document.getElementById("contact_captcha");
        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const subjectValue = subject.value.trim();
        const messageValue = message.value.trim();
        const captchaValue = captcha.value.trim();

        if (nameValue === "") {
            setError(name, t('name_cant_be_blank'));
            status = false;
        }
        else if (nameValue.length < 3) {
            setError(name, t('name_must_be_greater_than_3_characters'));
            status = false;
        }
        else if (nameValue.length > 50) {
            setError(name, t('name_must_be_less_than_50_characters'));
            status = false;
        }
        else if (nameValue.match(/^[A-Za-z ]*$/)) {
            setSuccess(name);
        }
        else {

            setError(name, t('not_a_valid_name'));
            status = false;
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


        if (subjectValue === "") {
            setError(subject, t('subject_cant_be_blank'));
            status = false;
        }
        else if (subjectValue.length < 3) {
            setError(subject, t('subject_must_be_greater_than_3_characters'));
            status = false;
        }
        else if (subjectValue.length > 150) {
            setError(subject, t('subject_must_be_less_than_150_characters'));
            status = false;
        }
        else if (subjectValue.match(/^[A-Za-z&,.\d:+=\-/"'() ]*$/)) {
            setSuccess(subject);
        }
        else {
            setError(subject, t('not_a_valid_subject'));
            status = false;
        }


        if (messageValue === "") {
            setError(message, t('message_cant_be_blank'));
            status = false;
        }
        else if (messageValue.length < 3) {
            setError(message, t('message_must_be_greater_than_3_characters'));
            status = false;
        }
        else if (messageValue.length > 2000) {
            setError(message, t('message_must_be_less_than_2000_characters'));
            status = false;
        }
        else if (messageValue.match(/^[A-Za-z&,.\d:+=\-/"'()\n ]*$/)) {
            setSuccess(message);
        }
        else {
            setError(message, t('not_a_valid_message'));
            status = false;
        }

        // if (captchaCode.captchaCode !== captchaValue) {
        //     setError(captcha, t('enter_correct_captcha'));
        //     status = false;
        // }
        // else {
        //     setSuccess(captcha);
        // }

        if (status) {
            setLoading(true);
            service.postContactUs({ emailId: emailValue, message: messageValue, name: nameValue, subject: subjectValue, captchaHash: captchaHash, captchaInput: captchaInput, captchaToken: captchaToken })
                .then(async res => {
                    setLoading(false);
                    //console.log(res.status)
                    if (res.status == 201) {
                        await swal(t('thank_you'), t('our_team_will_get_back_to_you_soon'), "success");
                        // const nVal = document.getElementById('contact_name');
                        // nVal.value = '';
                        // const eVal = document.getElementById('contact_email');
                        // eVal.value = '';
                        // const sVal = document.getElementById('contact_subject');
                        // sVal.value = '';
                        // const mVal = document.getElementById('contact_message');
                        // mVal.value = '';
                        // const cVal = document.getElementById('contact_captcha');
                        // cVal.value = '';
                        // setOrginalText(nVal, eVal, sVal, mVal,cVal);
                        window.location.reload();
                    }
                })
                .catch(err => {
                    //console.log(err.response.status)
                    if (err.response.status === 406) {
                        setError(captcha, t('enter_correct_captcha'));
                    }
                    else if (err.response.status === 404) {
                        setError(captcha, t('invalid_token'));
                    }
                    setLoading(false);
                })

        }

    }

    function setError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector(".contact_input-msg");
        formControl.className = "form-control text-left error";
        errorMsg.innerText = message;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = "form-control success";
    }

    // function setOrginalText(inputName, inputEmail, inputSubject, inputMessage, inputCaptcha) {
    //     const formControlName = inputName.parentElement;
    //     formControlName.className = "form-control";
    //     const formControlEmail = inputEmail.parentElement;
    //     formControlEmail.className = "form-control";
    //     const formControlSubject = inputSubject.parentElement;
    //     formControlSubject.className = "form-control";
    //     const formControlMessage = inputMessage.parentElement;
    //     formControlMessage.className = "form-control";
    //     const formControlCaptcha = inputCaptcha.parentElement;
    //     formControlCaptcha.className = "form-control";
    // }

    function isEmail(email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    }

    function changeBackgroundOver(e) {
        e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
    }

    function changeBackgroundOut(e) {
        e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
    }

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper contact-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('contact_us')} />

                {/* Contact Area */}
                <section className="contact-area">
                    <Container>
                        <Row>
                            <Col md="4">
                                <div className="contact-box-title">
                                    <h4>{t('contact_info')}</h4>
                                </div>
                                <div className="contact-icon-box d-flex">
                                    <div className="icon">
                                        <i className="las la-map-marker"></i>
                                    </div>
                                    <div className="box-content">
                                        <h5>{t('our_location')} </h5>
                                        <p>{t('cdac_full_address')}</p>
                                    </div>
                                </div>
                                <div className="contact-icon-box d-flex">
                                    <div className="icon">
                                        <i className="las la-envelope-open"></i>
                                    </div>
                                    <div className="box-content">
                                        <h5>{t('email_address')}</h5>
                                        <p>{t('enquiry_us_id')}</p>
                                    </div>
                                </div>
                                <div className="contact-icon-box d-flex">
                                    <div className="icon">
                                        <i className="las la-phone"></i>
                                    </div>
                                    <div className="box-content">
                                        <h5>{t('phone_number')}</h5>
                                        <p>{t('phone')}</p>
                                    </div>
                                </div>
                                <div className="contact-social">
                                    <ul className="social list-unstyled list-inline">
                                        <li className="list-inline-item"><a href="https://www.facebook.com/PunjabPoliceIndia" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                        <li className="list-inline-item"><a href="https://twitter.com/PunjabPoliceInd" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                        {/* <li className="list-inline-item"><a href="https://www.linkedin.com/company/cdac" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li> */}
                                        <li className="list-inline-item"><a href="https://www.instagram.com/punjabpoliceind" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                        <li className="list-inline-item"><a href="https://www.youtube.com/c/PunjabPoliceIndiaOfficial" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md="8">
                                <div className="contact-form">
                                    <div className="form-title">
                                        <h4>{t('get_in_touch')}</h4>
                                    </div>
                                    <div className="form-box">
                                        <form onSubmit={formSubmit} className="form">
                                            <Row>
                                                <Col md="6">
                                                    <p className="form-control">
                                                        <input type="text" placeholder={t('full_name')} id="contact_name" onBlur={onBlurHandlerName} minLength={2} maxLength={50} />
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="6">
                                                    <p className="form-control">
                                                        <input type="text" placeholder={t('email_address')} id="contact_email" onBlur={onBlurHandlerEmail} />
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="12">
                                                    <p className="form-control">
                                                        <input type="text" placeholder={t('subject')} id="contact_subject" onBlur={onBlurHandlerSubject} minLength={5} maxLength={150} />
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="12">
                                                    <p className="form-control">
                                                        <textarea name="message" id="contact_message" placeholder={t('enter_message')} onBlur={onBlurHandlerMessage} minLength={5} maxLength={500}></textarea>
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="4">
                                                    <div style={{ marginLeft: "16px", marginTop: "10px" }}>
                                                        {/* <ClientCaptcha captchaCode={setCode} charsCount={5} /> */}
                                                        <img src={`data:image/jpeg;base64,${data}`} style={{ height: "50px" }} />
                                                    </div>
                                                </Col>
                                                <Col md="2" style={{ marginTop: "10px" }}>
                                                    <button className='btn' onClick={handleRefereshCaptcha} style={{ color: 'white', fontSize: "24px", background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }}><i class="fa fa-refresh"></i></button>
                                                </Col>
                                                <Col md="3" style={{ marginTop: "10px" }}>
                                                    <p className="form-control">
                                                        <input type="text" placeholder={t('captcha')} id="contact_captcha" onChange={(e) => handleCaptcha(e)} minLength="4" maxLength="7" />
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>

                                                <Col md="12">
                                                    {loading ? <button type="button" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }} disabled><div class="spinner-border" role="status">
                                                        <span class="sr-only">{t('loading')}</span>
                                                    </div>  {t('send_message')}</button>
                                                        : <button style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }} onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver}>{t('send_message')} </button>}

                                                </Col>
                                            </Row>
                                        </form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    {/* Google Map */}
                    <GoogleMap />
                </section>

                {/* Footer 2 */}
                <FooterTwo />

            </div>
        </Styles>
    )
}

export default Contact


