import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CourseSearch from "../../pages/courses/components/CourseSearch.js";
import { Styles } from "../../pages/instructor/instCourses/styles/coursedetails.js";

import { BreadcrumbBox } from "../common/Breadcrumb.js";
import FooterTwo from "../FooterTwo.js";
import HeaderTwo from "../HeaderTwo.js";
import UserService from "../../services/UserService.js";
import LibraryItem from "./LibraryItem.js";
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


function ViewLibrary() {
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

    const scrollWin = () => {
        window.scrollTo(0, 290);
    }

    return (
        <div className="main-wrapper course-page" onLoad={() => scrollWin()}>

            <HeaderTwo />

            <BreadcrumbBox title={t('published_book')} />

            <Styles>
                <section className="course-grid-area">
                    <Container>
                        <Row>
                            <Col>
                                <div className="course-items">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-4 col-md-4">
                                            <CourseSearch name={t('search_library')} />
                                        </div>
                                        <div class="col-xs-6 col-sm-4 col-md-4">
                                            {/* <CourseCategory /> */}
                                        </div>
                                        <div class="col-xs-6 col-sm-4 col-md-4">
                                            {/* <CoursePrice /> */}
                                        </div>
                                    </div>
                                    <Row>
                                        <LibraryItem />
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>

            <FooterTwo />
        </div>
    )
}

export default ViewLibrary;