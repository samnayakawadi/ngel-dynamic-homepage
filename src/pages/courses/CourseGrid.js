import React, { Component, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import CourseSidebar from './components/CourseSidebar';
import CourseItemGrid from './components/CourseItemsGrid';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/course.js';
import { useHistory } from 'react-router-dom';
import StickyMenu from '../../components/common/StickyMenu';
import UserService from '../../services/UserService';
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
    },
    // {
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
]

const CourseGrid = (props) => {
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

    const switchListView = () => {

        history.push('course-list');
        window.location.reload();
    }

    const scrollWin = () => {
        //document.getElementById('Main').scrollIntoView({behavior:'smooth'})
        window.scrollTo(0, 290);
    }

    return (
        <div className="main-wrapper course-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            <HeaderTwo />

            {/* Breadcroumb */}
            <BreadcrumbBox title={t('all_courses')} />

            <Styles >
                {/* Course Grid */}
                <section className="course-grid-area"  >
                    <Container>
                        <Row>
                            <Col lg="3" md="4" sm="5">
                                <CourseSidebar />
                            </Col>
                            <Col lg="8" md="7" sm="6">
                                <div className="course-items">
                                    <Row>
                                        <CourseItemGrid />
                                    </Row>
                                </div>
                            </Col>
                            <Col lg="1" md="1" sm="1">
                                <a href="#" onClick={() => switchListView()} style={{ color: "black" }}><i className="las la-list-ul" style={{ fontSize: "30px", color: '#11B67A' }} title="List View"></i></a>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>

            {/* Footer 2 */}
            <FooterTwo />

        </div>
    )

}

export default CourseGrid