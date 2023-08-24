import React, { Component, useEffect } from 'react';
import Datas from '../../data/404/error.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/pageNotFound.js';
import UserService from '../../services/UserService';
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
    //   },
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

const PageNotFound =() =>{

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {       
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    useEffect(()=>{
        UserService.generateToken();
    },[])    
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper error-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* 404 Area */}
                    <section className="error-area" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.backgroundImage})` }}>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <div className="error-box text-center">
                                        <h1>4<span>0</span>4</h1>
                                        <h3>{t('page_not_found')}</h3>
                                        <p>{t('page_not_found_msg')}</p>
                                        <Link to={process.env.PUBLIC_URL + "/"}><i className="fas fa-home"></i>{t('home_page')}</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    {/* Footer 2 */}
                    <FooterTwo />
                </div>
            </Styles>
        )
    
}

export default PageNotFound


// class PageNotFound extends Component {

     
//     componentDidMount() {
//         UserService.generateToken();
//        }

//     render() {
//         return (
//             <Styles>
//                 {/* Main Wrapper */}
//                 <div className="main-wrapper error-page">

//                     {/* Header 2 */}
//                     <HeaderTwo />

//                     {/* 404 Area */}
//                     <section className="error-area" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.backgroundImage})` }}>
//                         <Container>
//                             <Row>
//                                 <Col md="12">
//                                     <div className="error-box text-center">
//                                         <h1>4<span>0</span>4</h1>
//                                         <h3>{}</h3>
//                                         <p>Ooops! The page you are looking for, couldn't be found.</p>
//                                         <Link to={process.env.PUBLIC_URL + "/"}><i className="fas fa-home"></i>Go To Homepage</Link>
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Container>
//                     </section>

//                     {/* Footer 2 */}
//                     <FooterTwo />
//                 </div>
//             </Styles>
//         )
//     }
// }

// export default PageNotFound