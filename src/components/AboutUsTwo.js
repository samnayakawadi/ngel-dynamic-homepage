import React, { Component } from 'react';
import Datas from '../data/about-us/about-us2.json';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/aboutUsTwo.js";
import UserService from '../services/UserService';

class AboutUsTwo extends Component {

    componentDidMount() {
        UserService.generateToken();
       }


    render() {
        return (
            <Styles>
                {/* About Us 2 */}
                <section className="about-us2">
                    <Container>
                        <Row>
                            <Col md="6">
                                <div className="about-content">
                                    <h4 className="about-title">{Datas.secTitle}</h4>
                                    <p className="about-para">{Datas.secDesc}</p>

                                    {
                                        Datas.dataList.map((data, i) => (
                                            <div className="cta-box d-flex" key={i}>
                                                <div className="cta-icon text-center">
                                                    <i className="las la-thumbs-up"></i>
                                                </div>
                                                <div className="cta-content">
                                                    <h6>{data.iconTitle}</h6>
                                                    <p>{data.iconSubtitle}</p>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </Col>
                            <Col md="6">
                                <div className="about-image">
                                    <img src={process.env.PUBLIC_URL + `/assets/images/${Datas.aboutImageOne}`} className="main-img1" alt="" />
                                    <img src={process.env.PUBLIC_URL + `/assets/images/${Datas.aboutImageTwo}`} className="main-img2" alt="" />
                                    <p className="exp-box"><span>{Datas.experianceYear}<i className="las la-plus"></i></span> Yrs Exprience</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>
        )
    }
}

export default AboutUsTwo
