import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/newsletterForm.js";
import service from "./../services/service";
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../services/UserService.js';
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
function NewsletterForm() {

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
    const state = {
        name: '',
        email: '',
    }
    const [getDetails, setDetails] = useState(state);


    const validate = () => {
        let nameError = '';
        let emailError = '';
        if (!getDetails.name) {
            nameError = t('name_cant_be_blank');
        }
        if (nameError != '') {
            setDetails({ ...getDetails, nameError });
            return false;
        }
        if (!getDetails.email) {
            emailError = t('email_cant_be_blank');
        }
        if (emailError != '') {
            setDetails({ ...getDetails, emailError });
            return false;
        }
        return true;
    }
    let data = {
        secTitle: 'newslatter_title',
    }

    const refreshPage = () => {
        //alert("check");
        window.location.reload();
    }

    // const savesubscribedetails = () => {
    //     if (validate() && status) {

    //         let newsletterdetails = { subName: getDetails.name, subEmail: getDetails.email };
    //         // alert(getDetails.name);
    //         //alert(getDetails.email);
    //         //console.log("Details::", newsletterdetails);


    //         service.getnewsletterdetails(newsletterdetails).then(async res => {
    //             await swal("Subscribed Succesfully ! ", "success");
    //             document.getElementById('name2').value = '';
    //             document.getElementById('email2').value = '';
    //         }).catch(err => {
    //             //console.log(err);
    //         });
    //     }
    // }
    useEffect(() => {
        const form = document.getElementById("form2");
        const name = document.getElementById("name2");
        const email = document.getElementById("email2");
        let status = true;
        form.addEventListener("submit", formSubmit);

        function formSubmit(e) {
            e.preventDefault();

            const nameValue = name.value.trim();
            const emailValue = email.value.trim();

            if (nameValue === "") {
                setError(name, t('name_cant_be_blank'));
                status = false;
            } else {
                setSuccess(name);
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

            if (status) {
                let data = { "subEmail": emailValue, "subId": 0, "subName": nameValue };
                // service.getnewsletterdetails({ subName: nameValue, subEmail: emailValue }).then(async res => {
                //     await swal("Subscribed Succesfully ! ", "success");
                //     document.getElementById('name2').value = '';
                //     document.getElementById('email2').value = '';
                // }).catch(err => {
                //     //console.log(err);
                // });
            }
        }

        function setError(input, message) {
            const formControl = input.parentElement;
            const errorMsg = formControl.querySelector(".input-msg2");
            formControl.className = "form-control error";
            errorMsg.innerText = message;
        }

        function setSuccess(input) {
            const formControl = input.parentElement;
            formControl.className = "form-control success";
        }



        function isEmail(email) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
        }
    });

    return (
        <Styles>
            {/* Newsletter Form */}
            <section className="newsletter-form-area">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="newsletter-container">
                                <div className="newsletter-box">
                                    <div className="sec-title text-center">
                                        <h4>{t(data.secTitle)}</h4>
                                    </div>
                                    <form id="form2" className="form">
                                        <Row>
                                            <Col md="4">
                                                <p className="form-control">
                                                    <input type="text" minLength={3} maxLength={50} placeholder={t('enter_your_name')} id="name2" onChange={e => setDetails({ ...getDetails, name: e.target.value })} />
                                                    <span className="input-msg2"></span>
                                                </p>
                                            </Col>
                                            <Col md="4">
                                                <p className="form-control">
                                                    <input type="email" placeholder={t('enter_your_email')} id="email2" onChange={e => setDetails({ ...getDetails, email: e.target.value })} />
                                                    <span className="input-msg2"></span>
                                                </p>
                                            </Col>
                                            <Col md="4">
                                                <button><i className="las la-envelope"></i>{t('subscribe_now')}</button>
                                            </Col>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    );
}

export default NewsletterForm
