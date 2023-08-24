import React, { Component } from 'react';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import AboutUs from '../../components/AboutUs';
import IconBox from '../../components/IconBox';
import TabBox from './../../components/TabBox';
import TestimonialSlider from '../../components/TestimonialSlider';
import FaqEvent from '../../components/FaqEvent';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from "./styles/about.js";
import UserService from '../../services/UserService';
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



// class About extends Component {

//     componentDidMount() {
//        UserService.generateToken();
//       }

//     render() {
//         return (
//             <Styles>
//                 {/* Main Wrapper */}
//                 <div className="main-wrapper about-page">

//                     {/* Header 2 */}
//                     <HeaderTwo />

//                     {/* Breadcroumb */}
//                     <BreadcrumbBox title={this('about_us')} />

//                     {/* About Area */}
//                     <AboutUs />

//                     {/* Icon Box Area */}
//                     <IconBox />

//                     {/* Tab Section */}
//                     <TabBox />

//                     {/* Testimonial Slider */}
//                     {/* <TestimonialSlider /> */}

//                     {/* Faq & Event Area */}
//                     <FaqEvent />

//                     {/* Footer 2 */}
//                     <FooterTwo />

//                 </div>
//             </Styles>
//         )
//     }
// }

// export default About


const About = () => {
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    useEffect(() => {
        UserService.generateToken();
    }, [])


    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper about-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('about_us')} />

                {/* About Area */}
                <AboutUs />

                {/* Icon Box Area */}
                <IconBox />

                {/* Tab Section */}
                <TabBox />

                {/* Testimonial Slider */}
                {/* <TestimonialSlider /> */}

                {/* Faq & Event Area */}
                <FaqEvent />

                {/* Footer 2 */}
                <FooterTwo />

            </div>
        </Styles>
    )

}

export default About