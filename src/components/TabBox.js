import React, { Component, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { Styles } from "./styles/tabBox.js";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../services/UserService.js';
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
function TabBox() {

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
    return (
        <Styles>
            {/* Tab Box Area */}
            <section className="tab-section">
                <Container>
                    <Tab.Container defaultActiveKey="why">
                        <Row>
                            <Col lg="3" md="4">
                                <Nav className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="why"><i className="las la-arrow-right"></i>{t('why_cdac')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="mission"><i className="las la-arrow-right"></i>{t('our_mission')}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="vision"><i className="las la-arrow-right"></i>{t('director_Message')}</Nav.Link>
                                    </Nav.Item>
                                    {/* <Nav.Item>
                                            <Nav.Link eventKey="ranking"><i className="las la-arrow-right"></i> Our Ranking</Nav.Link>
                                        </Nav.Item> */}
                                    <Nav.Item>
                                        <Nav.Link eventKey="research"><i className="las la-arrow-right"></i>{t('our_research')}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col lg="9" md="8">
                                <Tab.Content>
                                    <Tab.Pane eventKey="why">
                                        <h4 className="tab-title">{t('why_cdac')}</h4>
                                        <p className="tab-desc" style={{textAlign:"justify"}}>{t('why_cdac_desc')}</p>
                                        {/* <ul className="list-unstyled check-list">
                                            <li><i className="fa fa-check"></i>{t('why_cdac_desc1')}</li>
                                            <li><i className="fa fa-check"></i>{t('why_cdac_desc2')}</li>
                                            <li><i className="fa fa-check"></i>{t('why_cdac_desc3')}</li>
                                            <li><i className="fa fa-check"></i>{t('why_cdac_desc4')}</li>
                                        </ul> */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="mission">
                                        <h4 className="tab-title">{t('our_mission')}</h4>
                                        {/* <p className="tab-desc">{t('our_mission_desc')}</p> */}
                                        <ul className="list-unstyled check-list">
                                            <li style={{textAlign:"justify"}}><i className="fa fa-check"></i>{t('our_mission_desc1')}</li>
                                            <li style={{textAlign:"justify"}}><i className="fa fa-check"></i>{t('our_mission_desc2')}</li>
                                            <li style={{textAlign:"justify"}}><i className="fa fa-check"></i>{t('our_mission_desc3')}</li>
                                            {/* <li><i className="fa fa-check"></i>{t('our_mission_desc4')}</li> */}
                                        </ul>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="vision">
                                        <h4 className="tab-title">{t('director_Message')}</h4>
                                        <p className="tab-desc" style={{textAlign:"justify"}}>{t('our_vision_desc1')}</p>
                                        <p className="tab-desc" style={{textAlign:"justify"}}>{t('our_vision_desc2')}</p>
                                        <p className="tab-desc" style={{textAlign:"justify"}}>{t('our_vision_desc3')}</p>
                                        {/* <ul className="list-unstyled check-list">
                                                <li><i className="fa fa-check"></i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere.</li>
                                                <li><i className="fa fa-check"></i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere.</li>
                                                <li><i className="fa fa-check"></i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere.</li>
                                            </ul> */}
                                    </Tab.Pane>
                                    {/* <Tab.Pane eventKey="ranking">
                                            <h4 className="tab-title">Our Ranking</h4>
                                            <p className="tab-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere a nisi fuga rem quas molestias, eveniet minima molestiae. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, recusandae? Assumenda, error. Quam dicta iusto saepe. Odit minus voluptas, fuga ipsum quia debitis totam, tempore laudantium quasi dicta dolorem deleniti.</p>
                                            <ul className="list-unstyled check-list">
                                                <li><i className="fa fa-check"></i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere.</li>
                                                <li><i className="fa fa-check"></i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere.</li>
                                                <li><i className="fa fa-check"></i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere.</li>
                                            </ul>
                                        </Tab.Pane> */}
                                    <Tab.Pane eventKey="research">
                                        <h4 className="tab-title">{t('our_research')}</h4>
                                        {/* <p className="tab-desc">{t('our_research_desc1')}</p> */}

                                        <ul className="list-unstyled check-list">
                                            <li style={{textAlign:"justify"}}><i className="fa fa-check" ></i><b>{t('our_research_title_1')}</b> {t('our_research_title_1_desc1')}</li>
                                            <li style={{textAlign:"justify"}}><i className="fa fa-check"></i><b>{t('our_research_title_2')}</b> {t('our_research_title_2_desc2')}</li>
                                            {/* <li><i className="fa fa-check"></i><b>{t('our_research_title_3')}</b> {t('our_research_title_3_desc3')}</li>
                                            <li><i className="fa fa-check"></i><b>{t('our_research_title_4')}</b> {t('our_research_title_4_desc4')}</li>
                                            <li><i className="fa fa-check"></i><b>{t('our_research_title_5')}</b> {t('our_research_title_5_desc5')}</li>
                                            <li><i className="fa fa-check"></i><b>{t('our_research_title_6')}</b> {t('our_research_title_6_desc6')}</li> */}
                                        </ul>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </section>
        </Styles>
    )

}

export default TabBox
