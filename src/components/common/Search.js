import React, { useEffect, useState } from 'react';
import { Styles } from "./styles/search.js";
import { useHistory } from 'react-router-dom'
import service from '../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import { searchEngine } from '../../redux-files/Actions/courseTypeAction'
import CourseItemGrid from '../../pages/courses/components/CourseItemsGrid.js';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../../services/UserService.js';
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
function Search() {

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
    const dispatch = useDispatch();
    useEffect(() => {
        const searchTrigger = document.getElementById("search-trigger");

        if (searchTrigger) {
            const searchOverlay = document.getElementById("search-overlay");
            const searchWrap = document.getElementById("search-wrap");
            const searchExit = document.getElementById("search-close");

            searchTrigger.addEventListener("click", function (e) {
                e.preventDefault();
                searchWrap.classList.add("active");
            });

            // searchOverlay.addEventListener("click", function (e) {
            //     e.preventDefault();
            //     searchWrap.classList.remove("active");
            // });

            searchExit.addEventListener("click", function (e) {
                e.preventDefault();
                searchWrap.classList.remove("active");
            });
        }
    });
    let [getSearchEng, setSearchEng] = useState({});
    const searchPage = (e) => {
        setSearchEng(e.target.value);
    }
    const onSearch = () => {
        dispatch(searchEngine(getSearchEng));
    }



    return (
        <Styles>
            {/* Search Box */}
            <a href={process.env.PUBLIC_URL + "/"} className="nav-link nav-search" id="search-trigger">
                <i className="las la-search"></i>
            </a>
            {/* Fullscreen search */}
            <div className="search-wrap" id="search-wrap">
                <div className="search-overlay custom-overlay" id="search-overlay"></div>
                <div className="search-inner">
                    <span className="search-form">
                        <input type="search" name="search" id="myText" required="requird" onChange={(e) => searchPage(e)} autoComplete="off" placeholder={t('search_for_anything....')} />
                        <a href="#"><i className="las la-search search-btn" onClick={() => onSearch()} id="search-close"></i></a>
                    </span>
                </div>
            </div>
        </Styles>
    )
}

export default Search
