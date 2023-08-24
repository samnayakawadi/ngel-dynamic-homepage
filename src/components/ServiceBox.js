import React, { Component } from 'react';
import Datas from '../data/service/service-box.json';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/serviceBox.js";
import UserService from '../services/UserService';

class ServiceBox extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Service Box */}
                <section className="service-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="sec-title text-center">
                                    <h4>{Datas.secTitle}</h4>
                                </div>
                            </Col>
                            {
                                Datas.dataList.map((data, i) => (
                                    <Col md="4" key={i}>
                                        <div className="service-box d-flex">
                                            <div className="box-icon">
                                                <i className={data.boxIcon}></i>
                                            </div>
                                            <div className="box-title">
                                                <h6>{data.title}</h6>
                                                <p>{data.subTitle}</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </section>
            </Styles>
        )
    }
}

export default ServiceBox
