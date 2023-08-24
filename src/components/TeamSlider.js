import React, { Component } from 'react';
import Datas from '../data/team/team-slider.json';
import { Container, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { Styles } from "./styles/teamSlider.js";
import UserService from '../services/UserService';

class TeamSlider extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        const settings = {
            slidesPerView: 4,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            spaceBetween: 30,
            watchSlidesVisibility: true,
            pagination: {
                el: '.slider-dot.text-center',
                clickable: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                576: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                992: {
                    slidesPerView: 4
                }
            }
        };

        return (
            <Styles>
                {/* Team Slider */}
                <section className="team-member-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="sec-title text-center">
                                    <h4>{Datas.secTitle}</h4>
                                </div>
                            </Col>
                            <Col md="12" className="team-slider">
                                <Swiper {...settings}>
                                    {
                                        Datas.dataList.map((data, i) => (
                                            <div className="team-item" key={i}>
                                                <img src={process.env.PUBLIC_URL + `/assets/images/${data.personImage}`} alt="" className="img-fluid" />
                                                <div className="img-content text-center">
                                                    <h5>{data.personName}</h5>
                                                    <p>{data.personTitle}</p>
                                                    <ul className="list-unstyled list-inline">
                                                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.socialLinks.facebook}><i className="fab fa-facebook-f"></i></a></li>
                                                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.socialLinks.twitter}><i className="fab fa-twitter"></i></a></li>
                                                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.socialLinks.youtube}><i className="fab fa-youtube"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Swiper>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>
        )
    }
}

export default TeamSlider
