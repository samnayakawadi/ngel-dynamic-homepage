import React, { Component, useContext, useEffect } from 'react';
import Datas from '../data/icon-box/icon-box.json';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/iconBox.js";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
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

function IconBox() {
    const { textTypeHandlers } = TextTypeHandlers()
    const { dynamicContextState } = useContext(DynamicContext)
    const { globalContextState } = useContext(GlobalContext)
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
            {/* Icon Box */}
            <section className="icon-box-area">
                <Container>
                    <Row>
                        {/* {
                            Datas.map((data, i) => (
                                <Col md="4" key={i}>
                                    <div className="full-icon-box">
                                        <div className="icon-box d-flex">
                                            <div className={data.uniqClass}>
                                                <i className={data.boxIcon} style={{ fontSize: '50px' }}></i>
                                            </div>
                                            <div className="box-title">
                                                <h6>{t(data.title)}</h6>
                                                <p>{t(data.subTitle)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        } */}

                        {/* Add this code for make element Dynamic */}
                        <Col md="4" >
                            <div className="full-icon-box">
                                <div className="icon-box d-flex">
                                    <div className="box-icon box1">
                                        <i className="las la-thumbs-up" style={{ fontSize: '50px' }}></i>
                                    </div>
                                    <div className="box-title">
                                        <h6>{dynamicContextState[lang].popular_courses.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("popular_courses") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</h6>
                                        <p>{dynamicContextState[lang].popular_courses_desc.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("popular_courses_desc") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</p>

                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="full-icon-box">
                                <div className="icon-box d-flex">
                                    <div className="box-icon box2">
                                        <i className="las la-book-reader" style={{ fontSize: '50px' }}></i>
                                    </div>
                                    <div className="box-title">
                                        <h6>{dynamicContextState[lang].modern_library.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("modern_library") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</h6>
                                        <p>{dynamicContextState[lang].modern_library_desc.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("modern_library_desc") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="4" >
                            <div className="full-icon-box">
                                <div className="icon-box d-flex">
                                    <div className="box-icon box3">
                                        <i className="las la-chalkboard-teacher" style={{ fontSize: '50px' }}></i>
                                    </div>
                                    <div className="box-title">
                                        <h6>{dynamicContextState[lang].qualified_teacher.value}
                                            {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                                onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("qualified_teacher") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</h6>
                                        <p>{dynamicContextState[lang].qualified_teacher_desc.value}
                                        {globalContextState.editMode && <button className="btn  btn-xs btn-secondary  ml-2 align-top" style={{ width: '20px', height: '20px', padding: '0', position: 'relative' }}
                                             onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("qualified_teacher_desc") }}>
                                                <i className="fas fa-pen fa-xs" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', fontSize: '12px' }} ></i>
                                            </button>}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    )
}

export default IconBox
