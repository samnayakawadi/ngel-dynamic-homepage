import React, { useState, useEffect } from 'react';
import Datas from '../data/hero/hero-image.json';
import { Container, Row, Col } from 'react-bootstrap';
import ModalVideo from 'react-modal-video';
import { Styles } from "./styles/heroImage.js";
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
function HeroImage() {

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

    const [getOpenModal, setOpenModal] = useState({
        isOpen: false
    });
    function openModal() {
        setOpenModal({ isOpen: true })
    }

    return (
        <Styles>
            {/* Hero Image */}
            <section className="hero-image-area" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.heroBackground})` }}>
                <div className="round-shape" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.heroRoundShape})` }}></div>
                <div className="hero-table">
                    <div className="hero-tablecell">
                        <Container>
                            <Row>
                                <Col md="12">
                                    <div className="hero-box text-center">
                                        <h1>{t(Datas.heroTitle)}</h1>
                                        <p>{t(Datas.heroSubtitle)}</p>
                                        <div className="video-player">
                                            <ModalVideo channel='youtube' isOpen={getOpenModal.isOpen} videoId='FDHkBCFG6JM' onClose={() => setOpenModal({ isOpen: false })} />
                                            <button onClick={openModal} className="play-button"><i className="las la-play"></i></button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </section>
        </Styles>
    )

}

export default HeroImage
