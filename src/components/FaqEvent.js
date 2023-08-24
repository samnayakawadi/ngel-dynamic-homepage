import React, { useState, useEffect, useContext } from 'react';
import Datas from '../data/faq-event/faq-event.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/faqEvent.js";
import service from ".././services/service";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../services/UserService';
import { DynamicContext } from '../context/DynamicContext';
import { GlobalContext } from '../context/GlobalContext';
import TextTypeHandlers from '../dynamicHomePage/handlers/TextTypeHandlers';
import LinkTypeHandlers from '../dynamicHomePage/handlers/LinkTypeHandlers';
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
function FaqEvent() {
    const { textTypeHandlers } = TextTypeHandlers()
    const { linkTypeHandlers } = LinkTypeHandlers()
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
    const [getupcomingeventdata, setupcomingeventdata] = useState([]);
    const [msg, setmsg] = useState();

    useEffect(() => {
        // alert("check inside the Faq event1111");

        const accordionButton = document.querySelectorAll(".accordion-button");
        accordionButton.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("active");
                const content = button.nextElementSibling;

                if (button.classList.contains("active")) {
                    content.className = "accordion-content show";
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.className = "accordion-content";
                    content.style.maxHeight = "0";
                }
            });
        });


        service.getUpcomingActivEvents()
            .then(res => {
                // alert("check inside the Faq event222::" + res.data);
                setupcomingeventdata(res.data);
                // //console.log(res.data);
            }).catch(error => setmsg(t('service_down')));

    }, []);



    return (
        <Styles>
            {/* Faq & Event */}
            <section className="event-faq-area" style={{ textAlign: "justify" }}>
                <Container>
                    <Row>
                        {<Col md="6">
                            <div className="event-area">
                                <Row>
                                    <Col md="12">
                                        <div className="sec-title">
                                            <h4>{t('upcoming')} <span>{t('events')}</span></h4>
                                        </div>
                                    </Col>
                                    <Col md="12">

                                        {/* {
                                            getupcomingeventdata.map((eventData, i) => (
                                                <div className="event-box d-flex" key={i}>
                                                    <div className="event-date text-center">
                                                        <p style={{ color: "white" }}>{eventData.eventDate}</p>
                                                    </div>
                                                    <div className="event-details">
                                                        <h6><Link to="#">{eventData.eventTitle}</Link></h6>
                                                        <ul className="list-unstyled list-inline">
                                                            <li className="list-inline-item"><i className="las la-clock"></i>{eventData.eventTime}</li>
                                                            <li className="list-inline-item"><i className="las la-map-marker"></i>{eventData.eventLocation}</li>
                                                        </ul>
                                                        <p>{eventData.eventdesc}</p>
                                                    </div>
                                                </div>
                                            ))
                                        } */}

                                        {
                                            getupcomingeventdata.map((eventData, i) => (
                                                <div className="event-box d-flex" key={i}>
                                                    <div className="event-date text-center">
                                                        <p style={{ color: "white", fontSize: '15px', padding: "15px" }}>{eventData.eventDate}</p>
                                                    </div>
                                                    <div className="event-details">
                                                        <h6><Link to="#">{eventData.eventTitle}</Link></h6>
                                                        <ul className="list-unstyled list-inline">
                                                            <li className="list-inline-item"><i className="las la-clock"></i>{eventData.eventTime}</li>
                                                            <li className="list-inline-item"><i className="las la-map-marker"></i>{eventData.eventLocation}</li>
                                                        </ul>
                                                        <p>{eventData.eventdesc}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Col>
                                </Row>
                            </div>
                        </Col>}
                        <Col md="6">
                            <div className="faq-area">
                                <div className="sec-title">
                                    <h4>{t('frequently_ask')} <span>{t('question')}</span></h4>
                                </div>
                                <div className="faq-box">
                                    {/* {
                                        Datas.faqDataList.map((faqData, i) => (
                                            <div className="faq-item" key={i}>
                                                <button className="accordion-button active">
                                                    <div className="accordion-icon"><i className="las la-plus"></i></div>
                                                    <p className='pl-5 ml-2'>{t(faqData.faqTitle)}</p>
                                                </button>
                                                <div className="accordion-content show">
                                                    <p>{t(faqData.faqDesc)}</p>
                                                </div>
                                            </div>
                                        ))
                                    } */}

                                    {/* using this code we make elements Dynamic */}
                                    <div className="faq-item">
                                        <button className="accordion-button active">
                                            <div className="accordion-icon"><i className="las la-plus"></i></div>
                                            <p className='pl-5 ml-2'>{dynamicContextState[lang].faq_titile_1.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                             onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("faq_titile_1") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </button>
                                        <div className="accordion-content show">
                                            <p>{dynamicContextState[lang].faq_desc_1.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                            onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("faq_desc_1") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </div>
                                    </div>
                                    <div className="faq-item">
                                        <button className="accordion-button active">
                                            <div className="accordion-icon"><i className="las la-plus"></i></div>
                                            <p className='pl-5 ml-2'>{dynamicContextState[lang].faq_titile_2.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                             onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("faq_titile_2") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </button>
                                        <div className="accordion-content show">
                                            <p>{dynamicContextState[lang].faq_desc_2.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                            onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("faq_desc_2") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </div>
                                    </div>
                                    <div className="faq-item">
                                        <button className="accordion-button active">
                                            <div className="accordion-icon"><i className="las la-plus"></i></div>
                                            <p className='pl-5 ml-2'>{dynamicContextState[lang].faq_titile_3.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                            onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("faq_titile_3") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </button>
                                        <div className="accordion-content show">
                                            <p>{dynamicContextState[lang].faq_desc_3.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                             onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("faq_desc_3") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </div>
                                    </div>
                                    {/* <div className="faq-item">
                                        <button className="accordion-button active">
                                            <div className="accordion-icon"><i className="las la-plus"></i></div>
                                            <p className='pl-5 ml-2'>{t(faqData.faqTitle)}</p>
                                        </button>
                                        <div className="accordion-content show">
                                            <p>{t(faqData.faqDesc)}</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    );




}

export default FaqEvent
