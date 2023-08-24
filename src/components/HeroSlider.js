import React, { Component, useContext, useEffect, useState } from 'react';
import Datas from '../data/hero/hero-slider.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { Styles } from "./styles/heroSlider.js";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../services/UserService';
import { DynamicContext } from '../context/DynamicContext';
import { GlobalContext } from '../context/GlobalContext';
import FileTypeHandlers from '../dynamicHomePage/handlers/FileTypeHandlers';

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
function HeroSlider() {

    const { dynamicContextState } = useContext(DynamicContext)
    const { globalContextState } = useContext(GlobalContext)
    const { fileTypeHandlers } = FileTypeHandlers()
    var lang = globalContextState.lang

    const [currentIndex, setCurrentIndex] = useState(0);
    // const [isEditing, setIsEditing] = useState(true);

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

    const settings = {
        slidesPerView: 1,
        loop: true,
        speed: 3000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        watchSlidesVisibility: true,
        effect: 'fade',
        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev'
        },
        renderPrevButton: () => (
            <div className="swiper-btn slider-button-prev" onClick={previousSlide}><i className="flaticon-arrow-left-th"></i></div>
        ),
        renderNextButton: () => (
            <div className="swiper-btn slider-button-next" onClick={nextSlide}><i className="flaticon-arrow-right-th"></i></div>
        )
    };

    const previousSlide = () => {
        const newIndex = (currentIndex === 0) ? Datas.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex === Datas.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const handleEditButtonClick = (index) => {
        // console.log(`Edit button clicked for carousel_img${index + 1}`);
        // setIsEditing(false);
        fileTypeHandlers.fileTypeModalUpdateHandler(`carousel_img${index + 1}`);
    };


    return (
        <Styles>
            {/* Hero Slider */}
            <section className="hero-slider-area">
                <Swiper {...settings}>
                    {
                        Datas.map((data, index) => (

                            <div className="slider-item" key={index}>
                                <div className="image-container" style={{ textAlign: "center" }}>
                                    {/* <img src={process.env.PUBLIC_URL + `/assets/images/${data.backgroundImage}`} className="slider-image" alt={data.backgroundImage} /> */}

                                    {dynamicContextState[lang][`carousel_img${index + 1}`] && dynamicContextState[lang][`carousel_img${index + 1}`].link && (
                                        <img
                                            src={`${globalContextState.server.imageDownload}/${dynamicContextState[lang][`carousel_img${index + 1}`].link}`}
                                            className="slider-image"
                                        />
                                    )}
                                </div>
                                <div className="slider-table">
                                    <div className="slider-tablecell">
                                        <Container>
                                            <Row>
                                                <Col md="12">
                                                    <div className={data.uniqClass}>
                                                        <div className="slider-title">
                                                            <p>{t('welcome_to_meghSikshak')}</p>
                                                        </div>
                                                        <div className="slider-desc">
                                                            <h1>{t(data.desc)}</h1>
                                                        </div>
                                                        <div className="slider-btn">
                                                            <Link className="slider-btn1" to={process.env.PUBLIC_URL + `/${data.btnOneLink}`}>{t('our_courses')}</Link>
                                                            <Link className="slider-btn2" to={process.env.PUBLIC_URL + `/${data.btnTwoLink}`}>{t('contact_us')}</Link>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                                <div className="slider-table ">
                                    {/* Edit button */}
                                    {globalContextState.editMode &&
                                        <div className="slider-tablecell" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '100%', textAlign: 'center' }}>
                                            <button className="btn btn-xs btn-secondary ml-2 mb-5 align-top slider-btn" style={{ width: '30px', height: '30px', padding: '0', position: 'relative' }}
                                                onClick={(e) => handleEditButtonClick(index)}>
                                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                    <i className="fas fa-pen fa-xs" />
                                                    <span style={{ marginLeft: '5px' }}>{index + 1}</span>
                                                </span>
                                            </button>
                                        </div>

                                    }
                                </div>

                                {/* <div className="has-text-centered mb-4">
                                        Edit button
                                        {globalContextState.editMode &&
                                            <button className="btn btn-xs btn-secondary ml-2 align-top" style={{ width: '30px', height: '30px', padding: '0', position: 'relative' }}
                                                onClick={(e) => handleEditButtonClick(index)}>
                                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                    <i className="fas fa-pen fa-xs" />
                                                    <span style={{ marginLeft: '5px' }}>{index + 1}</span>
                                                </span>
                                            </button>
                                        }
                                    </div> */}
                            </div>
                        ))
                    }
                </Swiper>
            </section>
        </Styles>
    )
}


export default HeroSlider
