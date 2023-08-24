import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CourseSearch from './CourseSearch';
import CoursePrice from './CoursePrice';
import PopularCourse from './PopularCourse';
import CourseTag from './CourseTag';
import CourseCategory from './CourseCategory';
import UserService from '../../../services/UserService';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import { useEffect } from 'react';


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


const CourseSidebar = () => {

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    useEffect(() => {
        UserService.generateToken();
    })


    return (
        <div className="course-sidebar">
            <Row>
                <Col md="12">
                    <CourseSearch name={t('search_material')} />
                </Col>
                {/* <Col md="12">
                        <CourseCategory />
                    </Col>
                    <Col md="12">
                        <CoursePrice />
                    </Col> */}
                {/* <Col md="12">
                        <PopularCourse />
                    </Col> */}
                {/* <Col md="12">
                        <CourseTag />
                    </Col> */}
            </Row>
        </div>
    )

}

export default CourseSidebar
