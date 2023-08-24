import React, { Component, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import CourseSidebar from './components/CourseSidebar';
import UserEnrolledCoursesGrid from './components/UserEnrolledCoursesGrid';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/course.js';
import { useHistory } from 'react-router-dom';
import EnrolledCourseSidebar from './components/EnrolledCourseSidebar';
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

function UserCourseGrid(props) {

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


    const history = useHistory();

    const switchListView = () => {
        history.push('/user-list/:id');
    }

    const scrollWin = () => {
        window.scrollTo(0, 290);
    }

    return (
        <div className="main-wrapper course-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            <HeaderTwo />

            {/* Breadcroumb */}
            <BreadcrumbBox title={t('enrolled')} />

            <Styles>
                {/* Course Grid */}
                <section className="course-grid-area">
                    <Container>
                        <Row>
                            <Col lg="3" md="4" sm="5">
                                <EnrolledCourseSidebar />
                            </Col>
                            <Col lg="8" md="7" sm="6">
                                <div className="course-items">
                                    <Row>
                                        <UserEnrolledCoursesGrid />
                                    </Row>
                                </div>
                            </Col>
                            <Col lg="1" md="1" sm="1">
                                <a href="#" onClick={() => switchListView()} style={{ color: "black" }}><i className="las la-list" style={{ fontSize: "32px" }} title={t('list_view')}></i></a>
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

export default UserCourseGrid;