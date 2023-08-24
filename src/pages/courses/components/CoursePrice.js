import React, { useEffect, useState } from 'react';
import { Styles } from '../styles/coursePrice.js';
import { useSelector, useDispatch } from "react-redux";
import { paidCoursesStatus, freeCoursesStatus } from './../../../redux-files/Actions/courseTypeAction';
import Services from '../../../services/service';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import learnerService from '../../../services/learnerService';
import UserService from '../../../services/UserService.js';

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

const CoursePrice = (props) => {

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
    const [courseState, setCourseState] = useState([]);
    let paidCoursesLength = 0;
    let freeCoursesLength = 0;
    let allCoursesLength = 0;
    // let allLen = 0;

    useEffect(() => {
        learnerService.getPublishCourses()
            .then(res => {
                setCourseState(res.data);
            })
            .catch(err => {
                //console.log(err);
            })
        let allCheckBox = document.getElementById("price1");
        allCheckBox.checked = true;
    }, [])

    const dispatch = useDispatch();
    let paidCheckBox = null;
    let freeCheckBox = null;

    function calculatePaidCourses() {
        courseState.map((item) => {
            if (item.courseFee > 0) {
                freeCoursesLength++;
            }
        });
        return freeCoursesLength;
        // ////console.log("Length of obj:",obj.length);
    }
    function calculateFreeCourses() {
        courseState.map((item) => {
            if (item.courseFee == 0) {
                paidCoursesLength++;
            }
        });
        return paidCoursesLength;
        // ////console.log("Length of obj:",obj.length);
    }
    function calculateAllCourses() {
        courseState.map((item) => {
            if (item.courseFee > 0 || item.courseFee == 0) {
                allCoursesLength++;
            }
        });

        return allCoursesLength;
        // ////console.log("Length of obj:",obj.length);
    }
    const paidHandler = () => {
        paidCheckBox = document.getElementById("price3");
        const free = document.getElementById("price2");
        const all = document.getElementById("price1");
        if (paidCheckBox.checked == true) {
            free.checked = false;
            all.checked = false;
            dispatch(freeCoursesStatus(false));
            dispatch(paidCoursesStatus(true));

        }
        else {
            dispatch(paidCoursesStatus(false));
        }
    }

    const freeHandler = () => {
        freeCheckBox = document.getElementById("price2");
        const paid = document.getElementById("price3");
        const all = document.getElementById("price1");
        if (freeCheckBox.checked == true) {
            paid.checked = false;
            all.checked = false;
            dispatch(paidCoursesStatus(false));
            dispatch(freeCoursesStatus(true));
        }
        else {
            dispatch(freeCoursesStatus(false));
        }
    }

    const allHandler = () => {
        const paid = document.getElementById("price3");
        const free = document.getElementById("price2");
        if (paid.checked == true) {
            paid.checked = false;
            dispatch(paidCoursesStatus(false));
            dispatch(freeCoursesStatus(false));
        }
        else if (free.checked == true) {
            free.checked = false;
            dispatch(paidCoursesStatus(false));
            dispatch(freeCoursesStatus(false));
        }
    }


    return (
        <Styles>
            {/* Course Price */}
            <div className="course-price">
                <h5>{t('course_access')}</h5>
                <ul className="price-item list-unstyled">
                    <li className="check-btn">
                        <label htmlFor="price1"><input type="checkbox" id="price1" className="check-box" onClick={allHandler} />{t('all')}<span>({calculateAllCourses()})</span></label>
                    </li>
                    <li className="check-btn">
                        <label htmlFor="price2"><input type="checkbox" id="price2" className="check-box" onClick={freeHandler} />{t('free')}<span>({calculateFreeCourses()})</span></label>
                    </li>
                    <li className="check-btn">
                        <label htmlFor="price3"><input type="checkbox" id="price3" className="check-box" onClick={paidHandler} />{t('Paid')}<span>({calculatePaidCourses()})</span></label>
                    </li>
                    {/* <li className="check-btn">
                            <label htmlFor="price4"><input type="checkbox" id="price1" className="check-box" onClick={allHandler} />Paid<span><CountUp end={calculatePaidCourses()/2} duration={10} delay={1.5} /></span></label>
                        </li> */}
                </ul>
            </div>
        </Styles>
    )
}

export default CoursePrice
