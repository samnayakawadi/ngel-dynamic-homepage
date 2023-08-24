import React, { Component, useContext, useEffect } from 'react';
import Datas from '../data/footer/footer.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BackToTop from './common/BackToTop';
import { Styles } from "./styles/footerOne.js";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import logo from "../../src/assets/images/logo.png"
import logo2 from "../../src/assets/images/logo2.png";
import UserService from '../services/UserService';
import { DynamicContext } from '../context/DynamicContext';
import { GlobalContext } from '../context/GlobalContext';

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

function Footer(textTypeHandlers,linkTypeHandlers) {
     
    const { dynamicContextState } = useContext(DynamicContext)
    const { globalContextState, setGlobalContextState } = useContext(GlobalContext)
    var lang = globalContextState.lang

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

    return (
        <Styles>
            {/* Footer Area */}
            <footer className="footer1" style={{ backgroundImage: `url(assets/images/${process.env.PUBLIC_URL + Datas.backgroundImage})` }}>
                <Container>
                    <Row>
                        <Col md="4">
                            <div className="footer-logo-info">
                                {/* <img src={process.env.PUBLIC_URL + "/assets/images/f-logo.png"} alt="" className="img-fluid" /> */}
                                {/* <img src={logo} alt="" style={{background : "#ffffff33" , borderRadius : "5px"}} className="img-fluid" /> */}
                                {/* <p>Lorem ipsum dolor sit amet, consectet adipisicing elit. Saepe porro neque a nam null quos.  Adipisci eius unde magnam ad, nisi voluptates.</p> */}
                                <ul className="list-unstyled">
                                    <li><div><Row><Col sm={1}><i className="las la-map-marker" style={{ paddingTop: '8px' }}></i></Col><Col sm={10}><p>{dynamicContextState[lang].cdac_full_address.value} 
                                    {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                    onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("cdac_full_address") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                </button>}</p></Col></Row></div></li>
                                    {/* <li><i className="las la-envelope"></i>{t('enquiry_us_id')}</li>
                                    <li><i className="las la-phone"></i>{t("call_us_phone")}</li> */}
                                    <li><i className="las la-envelope"></i>{dynamicContextState[lang].enquiry_us_id.title.value}</li>
                                    <li><i className="las la-phone"></i>{dynamicContextState[lang].call_us_phone.title.value}</li>
                                </ul>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="f-links">
                                <h5>{t('usefull_links')}</h5>
                                <ul className="list-unstyled">
                                    <li><a href={dynamicContextState[lang].footerPoweredBy.link.value} ><i className="las la-angle-right"></i> {dynamicContextState[lang].footerPoweredBy.title.value}</a></li>
                                    <li><a href={dynamicContextState[lang].footerMeghS.link.value}><i className="las la-angle-right"></i>{dynamicContextState[lang].footerMeghS.title.value}</a></li>
                                    <li><a href={dynamicContextState[lang].footerHelp.link.value}><i className="las la-angle-right"></i>{dynamicContextState[lang].footerHelp.title.value}</a></li>
                                    <li><a href="https://punjab.gov.in/"><i className="las la-angle-right"></i>{t('chariot')}</a></li>
                                    {/* <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Our Services</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Online Support</Link></li> */}
                                </ul>
                                {/* <ul className="list-unstyled">
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>General Info</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Help Center</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Our Services</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Privacy Policy</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Online Support</Link></li>
                                    </ul> */}
                            </div>
                        </Col>
                        {/* <Col md="4">
                                <div className="f-post">
                                    <h5>Recent Post</h5>
                                    <div className="post-box d-flex">
                                        <div className="post-img">
                                            <img src={process.env.PUBLIC_URL + "/assets/images/blog-2.jpg"} alt="" />
                                        </div>
                                        <div className="post-content">
                                            <Link to={process.env.PUBLIC_URL +"/blog-details"}>Lorem ipsum dolor sit amet consectet adipisicing elit com...</Link>
                                            <span>Mar 30, 2020</span>
                                        </div>
                                    </div>
                                    <div className="post-box d-flex">
                                        <div className="post-img">
                                            <img src={process.env.PUBLIC_URL + "/assets/images/blog-3.jpg"} alt="" />
                                        </div>
                                        <div className="post-content">
                                            <Link to={process.env.PUBLIC_URL +"/blog-details"}>Lorem ipsum dolor sit amet consectet adipisicing elit com...</Link>
                                            <span>Mar 30, 2020</span>
                                        </div>
                                    </div>
                                </div>
                            </Col> */}
                    </Row>
                </Container>
            </footer>

            {/* Copyright Area */}
            <section className="copyright-area">
                <Container>
                    <Row >
                        <Col md="5" style={{ textAlign: "center" }}>
                            <div className="copy-text">
                                <p>{t('copyright')} &copy; {new Date().getFullYear()}{" "} {t('powerby')}<a href='https://meghsikshak.in/'>{t('megh')}</a> {t('design_develop')}<a href='https://www.cdac.in/'>({t('cdac')})</a></p>
                            </div>
                        </Col>
                        {/* <Col md="4" style={{ textAlign: 'center' }}>
                            <div className="copy-text">
                                <a target="_blank" href="https://www.cdac.in/"><img src={process.env.PUBLIC_URL + "/assets/images/cdac2.png"} alt="" style={{ height: '50px', width: '70px' }} /></a>
                                <a target="_blank" href="https://www.cdac.in/"><img src={logo2} alt="" style={{ height: '95px', width: '70px' }} /></a>
                            </div>
                        </Col> */}
                        <Col md="3" className="text-right">
                            <ul className="social list-unstyled list-inline">
                                <li className="list-inline-item"><a href="https://www.facebook.com/PunjabPoliceIndia" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                <li className="list-inline-item"><a href="https://twitter.com/PunjabPoliceInd" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.instagram.com/punjabpoliceind" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.youtube.com/c/PunjabPoliceIndiaOfficial" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                {/* <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-dribbble"></i></a></li> */}
                            </ul>
                        </Col>
                    </Row>
                </Container>
                {/* Back To Top */}
                <BackToTop />
            </section>
        </Styles>
    )
}


export default Footer
