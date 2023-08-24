import React, { Component } from 'react';
import Datas from '../../data/faq/faq.json';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/faq.js';
import UserService from '../../services/UserService';

class Faq extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper faq-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title="Faq" />

                    {/* Faq Area */}
                    <section className="faq-area">
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Tab.Container defaultActiveKey="general">
                                        <Nav className="justify-content-center">
                                            <Nav.Item><Nav.Link eventKey="general">General </Nav.Link></Nav.Item>
                                            <Nav.Item><Nav.Link eventKey="author">Indoor Training</Nav.Link></Nav.Item>
                                            <Nav.Item><Nav.Link eventKey="buyer">Outdoor Training</Nav.Link></Nav.Item>
                                            <Nav.Item><Nav.Link eventKey="price">Online Course</Nav.Link></Nav.Item>
                                            <Nav.Item><Nav.Link eventKey="payment">Course Catalogue</Nav.Link></Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="general">
                                                <Row>
                                                    {
                                                        Datas.map((data, i) => (
                                                            <Col md="6" key={i}>
                                                                <div className="faq-item">
                                                                    <div className="faq-title d-flex">
                                                                        <div className="title-icon"><span>Q</span></div>
                                                                        <div className="title-text"><p>{data.faqTitle}</p></div>
                                                                    </div>
                                                                    <div className="faq-desc">
                                                                        <p>{data.faqDesc}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="author">
                                                <Row>
                                                    {
                                                        Datas.map((data, i) => (
                                                            <Col md="6" key={i}>
                                                                <div className="faq-item">
                                                                    <div className="faq-title d-flex">
                                                                        <div className="title-icon"><span>Q</span></div>
                                                                        <div className="title-text"><p>{data.faqTitle}</p></div>
                                                                    </div>
                                                                    <div className="faq-desc">
                                                                        <p>{data.faqDesc}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="buyer">
                                                <Row>
                                                    {
                                                        Datas.map((data, i) => (
                                                            <Col md="6" key={i}>
                                                                <div className="faq-item">
                                                                    <div className="faq-title d-flex">
                                                                        <div className="title-icon"><span>Q</span></div>
                                                                        <div className="title-text"><p>{data.faqTitle}</p></div>
                                                                    </div>
                                                                    <div className="faq-desc">
                                                                        <p>{data.faqDesc}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="price">
                                                <Row>
                                                    {
                                                        Datas.map((data, i) => (
                                                            <Col md="6" key={i}>
                                                                <div className="faq-item">
                                                                    <div className="faq-title d-flex">
                                                                        <div className="title-icon"><span>Q</span></div>
                                                                        <div className="title-text"><p>{data.faqTitle}</p></div>
                                                                    </div>
                                                                    <div className="faq-desc">
                                                                        <p>{data.faqDesc}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="payment">
                                                <Row>
                                                    {
                                                        Datas.map((data, i) => (
                                                            <Col md="6" key={i}>
                                                                <div className="faq-item">
                                                                    <div className="faq-title d-flex">
                                                                        <div className="title-icon"><span>Q</span></div>
                                                                        <div className="title-text"><p>{data.faqTitle}</p></div>
                                                                    </div>
                                                                    <div className="faq-desc">
                                                                        <p>{data.faqDesc}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
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
}

export default Faq