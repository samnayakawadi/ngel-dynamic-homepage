import React, { useState, useEffect } from "react";
import { Styles } from './styles/courseSearch'
import { useDispatch, useSelector } from 'react-redux';
import { search } from "../../../../redux-files/Actions/courseTypeAction";
import UserService from "../../../../services/UserService";
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

function CourseSearch() {

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

    let [getSearch, setSearch] = useState();
    const dispatch = useDispatch();
    const searchPage = (e) => {
        setSearch(e.target.value.toLowerCase());
    }
    dispatch(search(getSearch));

    return (
        <Styles>
            <div className="course-search">
                <h5>{t('search_course')}</h5>
                <form action="#">
                    <input type="text" onChange={searchPage} id="search" autoComplete="off" name="search" placeholder={t('search_here')} />
                    <button type="submit" disabled><i className="las la-search"></i></button>
                </form>
            </div>
        </Styles>
    )
}
export default CourseSearch