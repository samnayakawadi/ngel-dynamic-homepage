import React, { Component, useState, useEffect } from 'react';
import { Styles } from '../styles/courseSearch.js';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../../redux-files/Actions/courseTypeAction.js';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
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

const CourseSearch = (props) => {

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
    const dispatch = useDispatch();
    let [getSearch, setSearch] = useState();

    const searchPage = (e) => {
        setSearch(e.target.value.toLowerCase());
    }
    dispatch(search(getSearch));

    return (
        <Styles>
            {/* Course Search */}
            <div className="course-search">
                <h5>{t(`${props.name}`)}</h5>
                <form action="#">
                    <input type="text" onChange={searchPage} id="search" autoComplete="off" name="search" placeholder={t('search_here')} />
                    {/* <button type="submit" disabled><i className="las la-search"></i></button> */}
                </form>
            </div>
        </Styles>
    )
}




export default CourseSearch
