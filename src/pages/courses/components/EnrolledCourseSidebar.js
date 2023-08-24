import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CourseSearch from './CourseSearch';
import EnrolledCoursePrice from './EnrolledCoursePrice';
import PopularCourse from './PopularCourse';
import CourseTag from './CourseTag';
import EnrolledCourseCategory from './EnrolledCourseCategory';
import UserService from '../../../services/UserService';
import { useEffect } from 'react';
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
const EnrolledCourseSidebar = () => {

    useEffect(() => {
        UserService.generateToken();
    }, [])

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])



    return (
        <div className="course-sidebar">
            <Row>
                <Col md="12">
                    <CourseSearch name={t('search_course')} />
                </Col>
                <Col md="12">
                    <EnrolledCourseCategory />
                </Col>
                <Col md="12">
                    <EnrolledCoursePrice />
                </Col>
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

export default EnrolledCourseSidebar
