import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BreadcrumbBox } from "../../../components/common/Breadcrumb.js";
import FooterTwo from "../../../components/FooterTwo.js";
import HeaderTwo from "../../../components/HeaderTwo.js";
import CourseCategory from "./courseFilter/CourseCategory.js";
import CourseFilter from "./courseFilter/CourseFilter.js";
import CoursePrice from "./courseFilter/CoursePrice.js";
import CourseSearch from "./courseFilter/CourseSearch.js";
import CourseItem from "./CourseItem.js";
import { Styles } from './styles/ViewCourse.js';
import UserService from "../../../services/UserService.js";

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

function ViewCourses() {

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

            <BreadcrumbBox title={t('authored_Courses')} />

            <Styles>
                <section className="course-grid-area">
                    <Container>
                        <Row>
                            <Col>
                                <div className="course-items">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-4 col-md-4">
                                            <CourseSearch />
                                        </div>
                                        <div class="col-xs-6 col-sm-4 col-md-4">
                                            {/* <CourseCategory /> */}
                                        </div>
                                        <div class="col-xs-6 col-sm-4 col-md-4">
                                            {/* <CoursePrice /> */}
                                        </div>
                                    </div>
                                    <Row>
                                        <CourseItem />
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
export default ViewCourses