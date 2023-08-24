import React, { Component, useContext, useEffect, useState } from 'react';
import Datas from '../data/about-us/about-us.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ModalVideo from 'react-modal-video';
import CountUp from 'react-countup';
import { Styles } from "./styles/aboutUs.js";
import service from '../services/service';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import DSC_5578 from "../assets/images/DSC_5578.jpg"
import DSC_5595 from "../assets/images/DSC_5595.jpg";
import UserService from '../services/UserService';
import { DynamicContext } from '../context/DynamicContext';
import { GlobalContext } from '../context/GlobalContext';
import TextTypeHandlers from '../dynamicHomePage/handlers/TextTypeHandlers';

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
function AboutUs() {
    const { textTypeHandlers } = TextTypeHandlers()
    const { dynamicContextState } = useContext(DynamicContext)
    const { globalContextState, setGlobalContextState } = useContext(GlobalContext)
    var lang = globalContextState.lang;

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
    const [getAboutState, setAboutState] = useState({
        isOpen: false,
        coursesCount: 0,
        learnerCount: 0,
        instructorCount: 0
    });

    function openModal() {
        setAboutState({ isOpen: true })
    }

    useEffect(() => {

        service.getNumberOfCounts()
            .then(res => {
                setAboutState({ coursesCount: res.data.courseCount, learnerCount: res.data.learnerCount, instructorCount: res.data.instructorCount })
            })
    }, [])
    return (
        <Styles>
            {/* About Us */}
            <section className="about-us">
                <Container>
                    <Row>
                        <Col md="6">
                            <div className="about-image">
                                {/* Dynamiccode for image upload */}
                            {/* <img src={`${globalContextState.server.imageDownload}/${dynamicContextState[lang].hOPPA_image.link}`} className="main-img" alt="" />
                                <div className=" buttons is-left">
                                    {globalContextState.editMode && <button className="button mt-1 is-small is-dark" onClick={() => { fileTypeHandlers.fileTypeModalUpdateHandler("hOPPA_image") }}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>}
                                </div> */}
                                <img src={DSC_5578} className="main-img" alt="" />
                                <img src={process.env.PUBLIC_URL + "/assets/images/pattern.png"} className="pattern-img" alt="" />
                                <div className="video-player" style={{ backgroundImage: `url(${DSC_5595})` }}>
                                    <ModalVideo channel='youtube' isOpen={getAboutState.isOpen} videoId='ojNw1sCs5v4' onClose={() => setAboutState({ isOpen: false })} />
                                    <button onClick={openModal} className="play-button"><i className="las la-play"></i></button>
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="about-content">
                                <h4 className="about-title">{dynamicContextState[lang].title.value}
                                {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                 onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("title") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                    </button>}</h4>
                                <p className="about-para" style={{ textAlign: "justify" }}>{dynamicContextState[lang].about_desc1.value}
                                {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                 onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("about_desc1") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                    </button>}</p>
                                <p className="about-para" style={{ textAlign: "justify" }}>{dynamicContextState[lang].about_desc2.value}
                                {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("about_desc2") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                    </button>}</p>
                                <Row>
                                    <Col sm="4">
                                        <div className="counter-box box1 text-center">
                                            <h3><CountUp end={getAboutState.learnerCount} duration={5} delay={1.5} /><i className="las la-plus"></i></h3>
                                            <p>{dynamicContextState[lang].happy_students.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                             onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("happy_students") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </div>
                                    </Col>
                                    <Col sm="4">
                                        <div className="counter-box box2 text-center">
                                            <h3><CountUp end={getAboutState.instructorCount} duration={5} delay={1.5} /><i className="las la-plus"></i></h3>
                                            <p>{dynamicContextState[lang].teachers.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                             onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("teachers") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </div>
                                    </Col>
                                    <Col sm="4">
                                        <div className="counter-box box3 text-center">
                                            <h3><CountUp end={getAboutState.coursesCount} duration={5} delay={1.5} /><i className="las la-plus"></i></h3>
                                            <p>{dynamicContextState[lang].coursess.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                            onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("coursesss") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                                </button>}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <a className="readmore-btn" target='_blank' href={'https://www.punjabpoliceacademy.com/history-punjab-police-academy-phillaur'}>{t('read_more')} </a>
                                {/* <Link className="readmore-btn" to={process.env.PUBLIC_URL + "/about"}>{t('read_more')} </Link> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    )
}

export default AboutUs
