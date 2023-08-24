import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/account.js';
import { useHistory } from 'react-router-dom'
import service from '../../services/service';
import UserService from '../../services/UserService';
import swal from 'sweetalert';
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
    }
    // {
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
]


function AddTestimonial() {

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
    const userId = UserService.getUserid();
    const onBlurTitleHandler = () => {
        const title = document.getElementById("testimonial_title");
        const titleValue = title.value.trim();

        if (titleValue === "") {
            setError(title, t('title_cannot_blank'));
        }
        else if (titleValue.length > 200) {
            setError(title, t('length_exceed'))
        }
        else if (titleValue.length < 3) {
            setError(title, t('length_greater_than_3'))
        }
        else if (!isTitle(titleValue)) {
            setError(title, t('do_not_use_special_charater'));
        }
        else {
            setSuccess(title);
        }
    }

    const onBlurDescNameHandler = () => {
        const desc = document.getElementById("testimonial_desc");
        const descValue = desc.value.trim();
        if (descValue === "") {
            setError(desc, t('desc_cannot_blank'));
        }
        else if (descValue.length > 2000) {
            setError(desc, t('length_exceed'));
        }
        else if (descValue.length < 3) {
            setError(desc, t('length_greater_than_3'));
        }
        else if (!isDesc(descValue)) {
            setError(desc, t('do_not_use_special_charater'));
        }
        else {
            setSuccess(desc);
        }
    }

    function formSubmit(e) {
        e.preventDefault();
        let status = true;
        const title = document.getElementById("testimonial_title");
        const desc = document.getElementById("testimonial_desc");

        const titleValue = title.value.trim();
        const descValue = desc.value.trim();

        if (titleValue === "") {
            setError(title, t('title_cannot_blank'));
            status = false;
        }
        else if (titleValue.length > 50) {
            setError(title, t('length_exceed'));
            status = false;
        }
        else if (titleValue.length < 3) {
            setError(title, t('length_greater_than_3'));
            status = false;
        }
        else if (!isTitle(titleValue)) {
            setError(title, t('do_not_use_special_charater'));
            status = false;
        }
        else {
            setSuccess(title);
        }

        if (descValue === "") {
            setError(desc, t('desc_cannot_blank'));
            status = false;
        }
        else if (descValue.length > 500) {
            setError(desc, t('length_exceed'));
            status = false;
        }
        else if (descValue.length < 3) {
            setError(desc, t('length_greater_than_3'));
            status = false;
        }
        else if (!isDesc(descValue)) {
            setError(desc, t('do_not_use_special_charater'));
            status = false;
        }
        else {
            setSuccess(title);
        }
        if (status) {
            // //console.log(fnameValue + lnameValue + emailValue + mobileValue);
            // service.Register({ firstName: fnameValue, lastName: lnameValue, email: emailValue, mobile: mobileValue })
            //     .then(async response => {
            //         //console.log('res =>', response.data);

            //         if (response.data == "Exists") {
            //             await swal("Learner already present!", "Try with different email", "warning");
            //         }
            //         else {
            //             await swal("Registered Successfully!", "Check your email", "success");
            //             history.push('/');
            //         }

            //     }).catch(err => {
            //         alert("Service is down please try after some time");
            //     });
            service.addTestimonial({
                testiBy: userId,
                testiDesc: descValue,
                testiId: 0,
                testiStatus: "",
                testiTitle: titleValue
            })
                .then(async res => {
                    await swal(t('testimonial_added'), "", "success");
                    history.push('/');
                })
                .catch(err => {
                    //console.log(err);
                })
        }


    }

    function setError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector(".testimonial_input-msg");
        formControl.className = "form-control text-left error";
        errorMsg.innerText = message;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = "form-control success";
    }
    function isTitle(title) {
        return /^[_A-z]*((-|\s)*[_A-z])*$/.test(title);
    }
    function isDesc(desc) {
        return /^(?=.*[a-zA-Z])[\w\s~@#$^*+=`|{}:;!.,?\"()\[\]-]+$/.test(desc);
    }

    // const save = (e) => {
    //     //e.preventDefault();
    //     if (getName.firstName === "") {
    //         //console.log("Firstname can't blank ")
    //     }
    //     else if (getName.lastName === "") {
    //         //console.log("Lastname can't blank ")
    //     } else if (getName.email === "") {
    //         //console.log("Email can't blank ")
    //     } else if (getName.mobile === "") {
    //         //console.log("Mobile can't blank ")
    //     }

    //     else {

    //         let register = { firstName: getName.firstName, lastName: getName.lastName, email: getName.email, mobile: getName.mobile };
    //         //console.log('Details =>' + JSON.stringify(register))
    //         service.Register(register)
    //             .then(response => {
    //                 //console.log('res =>' + response);
    //                 if (response.status === 200) {
    //                     alert("Your Registration Successfully Please check your email !")
    //                     history.push('/');
    //                 }
    //                 else {
    //                     alert("services is down please register after sometime !");
    //                 }
    //             }).catch(err => {
    //                 //console.log(err);
    //             })
    //     }
    // }

    function changeBackgroundOver(e) {
        e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
    }

    function changeBackgroundOut(e) {
        e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
    }

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('testimonials')} />

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>{t('add_testimonial')}</h3>
                                    </div>
                                    <form onSubmit={formSubmit} className="form">
                                        <p className="form-control">
                                            <label htmlFor="registration_fname">{t('add_title')}</label>
                                            <input type="text" name="title" placeholder={t('add_title')} id="testimonial_title" onBlur={onBlurTitleHandler} />
                                            <span className="testimonial_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label>{t('description')}</label>
                                            <textarea name="desc" placeholder={t('add_desc')} id="testimonial_desc" onBlur={onBlurDescNameHandler} />
                                            <span className="testimonial_input-msg"></span>
                                        </p>
                                        <button style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)' }} onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register">{t('add_now')}</button>
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
        </Styles>
    )
}

export default AddTestimonial