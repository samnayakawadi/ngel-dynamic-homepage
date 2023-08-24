import React, { Component } from 'react';
import Datas from '../data/testimonial/testimonial-slider.json';
import { Container, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { Styles } from "./styles/testimonialSlider.js";
import { useEffect } from 'react';
import { useState } from 'react';
import service from '../services/service';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../services/UserService';

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
function TestimonialSlider() {
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])
    const [getTestimonials, setTestimonials] = useState([]);

    useEffect(() => {
        service.getTestimonial()
            .then(res => {
                setTestimonials(res.data);
                // //console.log(res.data)
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    const settings = {
        slidesPerView: 2,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        spaceBetween: 30,
        watchSlidesVisibility: true,
        // pagination: {
        //     el: '.slider-dot.text-center',
        //     clickable: true
        // },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 2
            }
        }
    };

    const um_api = UserService.USER_API;
    ////console.log(um_api);

    return (
        <Styles>
            {/* Testimonial Slider */}
            <section className="testimonial-area" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.backgroundImage})` }}>
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="sec-title text-center">
                                <h4>{t(Datas.secTitle)}</h4>
                            </div>
                        </Col>
                        <Col md="12" className="testimonial-slider">
                            {getTestimonials ?
                                <Swiper {...settings}>
                                    {
                                        getTestimonials.map((data, i) => (
                                            <div className="slider-item" key={i}>
                                                <div className="desc">
                                                    <h5>{data.testiTitle}</h5>
                                                    <p>{data.testiDesc}</p>
                                                </div>
                                                <div className="writer">
                                                    <img src={um_api + `getprofilepic/${data.testiBy}`} className="slider-image" />
                                                    {/* <h6>{data.authorName}</h6>
                                                <p>{data.authorTitle}</p> */}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Swiper>
                                : null}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    )
}

export default TestimonialSlider
