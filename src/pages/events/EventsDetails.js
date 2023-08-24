import React, { Component } from 'react';
import Datas from '../../data/event/details.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Timer from 'react-compound-timer';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import PopularCourse from './../courses/components/PopularCourse';
import CourseTag from './../courses/components/CourseTag';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/eventDetails.js';
import UserService from '../../services/UserService';

class EventDetails extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper event-details-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title="Event Details" />

                    {/* Event Details Area */}
                    <section className="event-details-area">
                        <Container>
                            <Row>
                                <Col lg="9" md="8" sm="12">
                                    <div className="event-details-content">
                                        <div className="heading">
                                            <h4>International students coming in Uk from Asian subcontinant for better education.</h4>
                                        </div>
                                        <div className="event-icon">
                                            <ul className="list-unstyled list-inline">
                                                <li className="list-inline-item"><i className="las la-calendar"></i> 19 February, 2021</li>
                                                <li className="list-inline-item"><i className="las la-clock"></i> 10:30am</li>
                                                <li className="list-inline-item"><i className="las la-map-marker"></i> 795 South Park Avenue, CA</li>
                                                <li className="list-inline-item"><i className="las la-copy"></i> Social Science</li>
                                            </ul>
                                        </div>
                                        <div className="event-details-banner">
                                            <img src={process.env.PUBLIC_URL + `/assets/images/event-banner.jpg`} alt="" className="img-fluid" />
                                        </div>
                                        <div className="event-details-overview">
                                            <h5>Event Overview</h5>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nesciunt harum facilis odit inventore molestias qui asperiores recusandae architecto mollitia provident ipsa unde, praesentium impedit enim voluptate ducimus, saepe autem. Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br /><br />Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda optio sequi suscipit et modi! Corporis obcaecati rerum et, explicabo inventore, aliquid, odit modi harum libero culpa distinctio. Nemo, aliquid dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum accusantium quam eius dignissimos quaerat voluptatem excepturi aliquid dolor ducimus. Illo porro maiores fuga dignissimos temporibus odio nulla nobis nemo. Lorem ipsum dolor sit amet consectetur adipisicing elit. <span><i className="las la-quote-right"></i>Nemo, aliquid dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum accusantium quam eius dignissimos quaerat voluptatem excepturi aliquid dolor ducimus. Optio earum accusantium quam eius dignissimos quaerat voluptatem excepturi aliquid dolor ducimus.</span>Assumenda optio sequi suscipit et modi! Corporis obcaecati rerum et, explicabo inventore, aliquid, odit modi harum libero culpa distinctio. Nemo, aliquid dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                            <ul className="list-unstyled">
                                                <li><i className="fa fa-check"></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere Quae impedit eligendi perspiciatis animi maxime ab minus corporis omnis similique excepturi.</li>
                                                <li><i className="fa fa-check"></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere Quae impedit eligendi perspiciatis animi maxime ab minus corporis omnis similique excepturi.</li>
                                                <li><i className="fa fa-check"></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum amet quo eius saepe et quis necessitatibus hic natus facere Quae impedit eligendi perspiciatis animi maxime ab minus corporis omnis similique excepturi.</li>
                                            </ul>
                                        </div>
                                        <div className="event-details-speaker">
                                            <h5>Event Speakers</h5>
                                            <Row>
                                                {
                                                    Datas.map((data, i) => (
                                                        <Col lg="3" md="6" sm="6" key={i}>
                                                            <div className="event-speaker-item">
                                                                <img src={process.env.PUBLIC_URL + `/assets/images/${data.personImage}`} alt="" className="img-fluid" />
                                                                <div className="img-content text-center">
                                                                    <h6>{data.personName}</h6>
                                                                    <ul className="list-unstyled list-inline">
                                                                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.socialLinks.facebook}><i className="fab fa-facebook-f"></i></a></li>
                                                                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.socialLinks.twitter}><i className="fab fa-twitter"></i></a></li>
                                                                        <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.socialLinks.youtube}><i className="fab fa-youtube"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </div>

                                        <div className="pre-nxt-event">
                                            <Row>
                                                <Col md="6">
                                                    <div className="next-prev-item prev-event d-flex">
                                                        <div className="prev-img">
                                                            <img src={process.env.PUBLIC_URL + `/assets/images/gallery-03.jpg`} alt="" />
                                                        </div>
                                                        <div className="prev-text">
                                                            <p><Link to={process.env.PUBLIC_URL + "/event-details"}>Lorem, ipsum dolor sit amet consectetur adipisicing elit Perferendis.</Link></p>
                                                            <span> March 27, 2020</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="next-prev-item next-event d-flex flex-row-reverse text-right">
                                                        <div className="next-img">
                                                            <img src={process.env.PUBLIC_URL + `/assets/images/gallery-06.jpg`} alt="" />
                                                        </div>
                                                        <div className="next-text">
                                                            <p><Link to={process.env.PUBLIC_URL + "/event-details"}>Lorem, ipsum dolor sit amet consectetur adipisicing elit Perferendis.</Link></p>
                                                            <span> March 27, 2020</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg="3" md="4" sm="12">
                                    <div className="event-details-sidebar">
                                        <Row>
                                            <Col md="12">
                                                <div className="event-sidebar-info">
                                                    <div className="event-sidebar-timer text-center">
                                                        <Timer initialTime={1040 * 970 * 980} direction="backward">
                                                            <p><Timer.Days /><span>Days</span></p>
                                                            <p><Timer.Hours /><span>Hours</span></p>
                                                            <p><Timer.Minutes /><span>Minutes</span></p>
                                                        </Timer>
                                                    </div>
                                                    <ul className="list-unstyled event-info-list">
                                                        <li>Start Date: <span>Aug 21, 2020</span></li>
                                                        <li>Time: <span>08:30am</span></li>
                                                        <li>Seat: <span>220</span></li>
                                                        <li>Place: <span>Ontario,CA</span></li>
                                                        <li>Organizer: <span>David Young</span></li>
                                                        <li>Phone: <span>+1 (396) 486 4709</span></li>
                                                        <li>Email: <span>email@me.com</span></li>
                                                        <li>Website: <span>www.mydomain.com</span></li>
                                                    </ul>
                                                    <button type="button" className="buy-btn">Buy Ticket</button>
                                                </div>
                                            </Col>
                                            <Col md="12">
                                                <PopularCourse />
                                            </Col>
                                            <Col md="12">
                                                <CourseTag />
                                            </Col>
                                        </Row>
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
}

export default EventDetails