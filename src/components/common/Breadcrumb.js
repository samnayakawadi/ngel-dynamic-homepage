import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { Styles } from "./styles/breadcrumb.js";
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService.js';
import { useEffect } from 'react';
// import backgroundimg from "../../../public/assets/images/breadcrumb-bg."

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


// export class BreadcrumbBox extends Component {

//     componentDidMount() {
//         UserService.generateToken();
//        }

//     state = {
//          backgroundImage: 'breadcrumb-bg.jpg',
//     }


//     imageUrls = (url) => {
//         if (url == null) {
//             return '';
//         } else {
//             let imagepath = url.replace(/\\/g, "\\\\");
//             return imagepath;
//         }
//     }

//     render() {
//         return (
//             <Styles>
//                 <section className="breadcrumb-area" style={{ backgroundImage: this.props.bannerUrl == null ? `url(${process.env.PUBLIC_URL}/assets/images/${this.state.backgroundImage})` : `url(${this.imageUrls(this.props.bannerUrl)})` }}>
//                     <Container>
//                         <Row>
//                             <Col md="12" className="text-center">
//                                 <div className="breadcrumb-box">
//                                     <h2 className="breadcrumb-title">{this.props.title}</h2>
//                                     <Breadcrumb>
//                                         <Breadcrumb.Item><Link to={process.env.PUBLIC_URL + "/"}>Home</Link></Breadcrumb.Item>
//                                         <Breadcrumb.Item active>{this.props.title}</Breadcrumb.Item>
//                                     </Breadcrumb>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </section>
//             </Styles>
//         )
//     }
// }

export const BreadcrumbBox = (props) => {

    useEffect(() => {
        UserService.generateToken();
    })
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])





    const state = {
        backgroundImage: 'breadcrumb-bg.jpg',
    }


    const imageUrls = (url) => {
        if (url == null) {
            return '';
        } else {
            let imagepath = url.replace(/\\/g, "\\\\");
            return imagepath;
        }
    }


    return (
        <Styles>
            <section className="breadcrumb-area" style={{ backgroundImage: props.bannerUrl == null ? `url(${process.env.PUBLIC_URL}/assets/images/${state.backgroundImage})` : `url(${imageUrls(props.bannerUrl)})` }}>
                <Container>
                    <Row>
                        <Col md="12" className="text-center">
                            <div className="breadcrumb-box">
                                <h2 className="breadcrumb-title">{props.title}</h2>
                                <Breadcrumb>
                                    <Breadcrumb.Item><Link to={process.env.PUBLIC_URL + "/"}>{t('home')}</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    )

}