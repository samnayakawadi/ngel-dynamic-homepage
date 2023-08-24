import React, { Component } from 'react';
import Datas from '../data/course/slider.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { Styles } from "./styles/courseSlider.js";
import UserService from '../services/UserService';

class CourseSlider extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        const settings = {
            slidesPerView: 3,
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
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3
                }
            }
        };

        return (
            <Styles>
                {/* Course Slider */}
                <section className="course-slider-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="sec-title text-center">
                                    <h4>{Datas.secTitle}</h4>
                                </div>
                            </Col>
                            <Col md="12" className="course-slider">
                                <Swiper {...settings}>
                                    {
                                        Datas.dataList.map((data, i) => (

                                            <div className="course-item" key={i}>
                                                <Link to={process.env.PUBLIC_URL + data.courseLink}>
                                                    <div className="course-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${data.imgUrl})` }}>
                                                        <div className="author-img d-flex">
                                                            <div className="img">
                                                                <img src={process.env.PUBLIC_URL + `/assets/images/${data.authorImg}`} alt="" />
                                                            </div>
                                                            <div className="title">
                                                                <p>{data.authorName}</p>
                                                                <span>{data.authorCourses}</span>
                                                            </div>
                                                        </div>
                                                        <div className="course-price">
                                                            <p>{data.price}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="course-content">
                                                    <h6 className="heading"><Link to={process.env.PUBLIC_URL + data.courseLink}>{data.courseTitle}</Link></h6>
                                                    <p className="desc">{data.courseDesc}</p>
                                                    <div className="course-face d-flex justify-content-between">
                                                        <div className="duration">
                                                            <p><i className="las la-clock"></i>120</p>
                                                        </div>
                                                        <div className="rating">
                                                            <ul className="list-unstyled list-inline">
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star-half-alt"></i>
                                                                </li>
                                                                <li className="list-inline-item">(4.5)</li>
                                                            </ul>
                                                        </div>
                                                        <div className="student">
                                                            <p><i className="las la-chair"></i>60</p>
                                                        </div>
                                                    </div>
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

export default CourseSlider
