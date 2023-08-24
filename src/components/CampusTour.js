import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ModalImage from "react-modal-image";
import { Styles } from "./styles/campusTour.js";
import UserService from '../services/UserService.js';

class CampusTour extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    state = {
        secTitle: "We Have Best Campus In The Region. Let's Explore The Campus.",
    }

    render() {
        return (
            <Styles>
                {/* Campus Tour */}
                <section className="campus-tour">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="sec-title text-center">
                                    <h4>{this.state.secTitle}</h4>
                                </div>
                            </Col>
                            <Col lg="2" md="3">
                                <div className="tour-box">
                                    <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-1.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-1.jpg"} alt="" />
                                </div>
                                <div className="tour-box">
                                    <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-2.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-2.jpg"} alt="" />
                                </div>
                            </Col>
                            <Col lg="4" md="6">
                                <Row>
                                    <Col lg="6" md="6">
                                        <div className="tour-box">
                                            <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-3.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-3.jpg"} alt="" />
                                        </div>
                                    </Col>
                                    <Col lg="6" md="6">
                                        <div className="tour-box">
                                            <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-4.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-4.jpg"} alt="" />
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="tour-box">
                                            <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-wt1.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-wt1.jpg"} alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="2" md="3">
                                <div className="tour-box">
                                    <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-ht.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-ht.jpg"} alt="" />
                                </div>
                            </Col>
                            <Col lg="4" md="12">
                                <Row>
                                    <Col lg="12" md="6">
                                        <div className="tour-box">
                                            <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-wt2.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-wt2.jpg"} alt="" />
                                        </div>
                                    </Col>
                                    <Col lg="6" md="3">
                                        <div className="tour-box">
                                            <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-5.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-5.jpg"} alt="" />
                                        </div>
                                    </Col>
                                    <Col lg="6" md="3">
                                        <div className="tour-box">
                                            <ModalImage small={process.env.PUBLIC_URL + "/assets/images/tour-6.jpg"} large={process.env.PUBLIC_URL + "/assets/images/tour-6.jpg"} alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>
        )
    }
}

export default CampusTour
