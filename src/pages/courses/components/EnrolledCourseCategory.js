import React, { useEffect, useState } from 'react';
import { Styles } from '../styles/courseCategory.js';
import Services from '../../../services/service';
import { useDispatch } from 'react-redux';
import { categoryData } from '../../../redux-files/Actions/courseTypeAction';
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

const EnrolledCourseCategory = () => {

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
    let [category, setCategory] = useState([{ categoryName: '', categoryLength: 0 }]);
    //let [checkState,setCheckState] = useState(false);
    let cat = [];
    let json = {};
    let counter = 0;
    const dispatch = useDispatch();
    let userId = UserService.getUserid();
    let roleId = 1;
    useEffect(() => {
        Services.getUserEnrolledCourses(userId, roleId)
            .then(res => {
                res.data.map((data, i) => {
                    if (json[data.courseDetails.category] == undefined) {
                        json[data.courseDetails.category] = 1;
                    }
                    else {
                        counter = json[data.courseDetails.category];
                        counter++;
                        json[data.courseDetails.category] = counter;
                    }
                })

                for (var key in json) {
                    cat.push({ categoryName: key, categoryLength: json[key] });
                }
                setCategory(cat);
            })

            .catch(err => {
                //console.log(err)
            })


    }, [])


    const categoryHandler = (value) => {
        dispatch(categoryData(value));
    }

    return (
        <Styles>
            {/* Course Tag */}
            <div className="course-category">
                <h5>{t('course_category')}</h5>
                <ul className="category-item list-unstyled">
                    {category.map((data, i) => {
                        return (
                            <li className="check-btn">
                                <label htmlFor="cat1" style={{ marginLeft: "10px", marginTop: "5px" }}><input type="radio" name="category" className="form-check-input" value={data.categoryName} onClick={(e) => categoryHandler(e.target.value)} />{data.categoryName}<span>({data.categoryLength})</span></label>
                            </li>

                        )
                    })
                    }
                </ul>
            </div>
        </Styles>
    )
}

export default EnrolledCourseCategory