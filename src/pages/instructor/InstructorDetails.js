import React, { useState, useEffect } from 'react';
import Datas from '../../data/instructor/details.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/instructor.js';
import service from '../../services/service';
import UserService from '../../services/UserService';

function InstructorDetails(props) {

    useEffect(() => {
        UserService.generateToken();
    }, []);
    // const settings = {
    //     slidesPerView: 3,
    //     loop: true,
    //     speed: 1000,
    //     autoplay: false,
    //     spaceBetween: 30,
    //     watchSlidesVisibility: true,
    //     pagination: {
    //         el: '.slider-dot.text-center',
    //         clickable: true
    //     },
    //     breakpoints: {
    //         0: {
    //             slidesPerView: 1
    //         },
    //         576: {
    //             slidesPerView: 1
    //         },
    //         768: {
    //             slidesPerView: 2
    //         },
    //         992: {
    //             slidesPerView: 3
    //         }
    //     }
    // };


    const um_api = UserService.USER_API;
    ////console.log(um_api);

    let instructorId = props.match.params.id;
    const [getInstructordata, setInstructordata] = useState([]);
    const [getfilteredIns, setFilteredIns] = useState([]);
    useEffect(() => {
        service.getAllInstructorsDetails()
            .then((res) => {
                setInstructordata(res.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    useEffect(() => {
        setFilteredIns(
            getInstructordata.filter((course) =>
                course.learnerUsername === instructorId
            )
        );
    }, [getInstructordata]);
    const [getInstructorImg, setInstructorImg] = useState({
        img: um_api + "getprofilepic/"
    });

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper instructor-details-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Instructor Details" />

                {/* Instructor Details Area */}
                <section className="instructor-details-area">
                    <Container>
                        {
                            getfilteredIns.map((data) => {
                                return (
                                    <Row>
                                        <Col md="4">
                                            <div className="instructor-img">
                                                <img src={`${getInstructorImg.img}${data.learnerUsername}`} alt="" className="img-fluid" />
                                                <ul className="list-unstyled getintouch">
                                                    <li><i className="las la-phone"></i> {data.mobile}</li>
                                                    <li><i className="lar la-envelope"></i> {data.email}</li>
                                                    <li><i className="lab la-skype"></i> {data.skypeId}</li>
                                                </ul>
                                                <ul className="social list-unstyled list-inline">
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.facebookId}><i className="fab fa-facebook-f"></i></a></li>
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.twitterId}><i className="fab fa-twitter"></i></a></li>
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.youtubeId}><i className="fab fa-youtube"></i></a></li>
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.linkedinId}><i className="fab fa-linkedin-in"></i></a></li>
                                                    {/* <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-dribbble"></i></a></li> */}
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col md="8">
                                            <div className="instructor-content">
                                                <h4>{data.firstName}{data.lastName === "NA" ? null : data.lastName}</h4>
                                                <span>{data.designation}</span>
                                                <p>{data.biodata}</p>
                                            </div>
                                            <div className="qual-expe d-flex">
                                                <div className="qualification">
                                                    <h5>Qualifications</h5>
                                                    <div className="qual-expe-box">
                                                        <h6>{data.eduQualification}</h6>
                                                        <p>{data.instituteName}</p>
                                                    </div>
                                                </div>
                                                {/* <div className="experiance">
                                                    <h5>Experiance</h5>
                                                    <div className="qual-expe-box">
                                                        <h6>SnazzyTheme.com</h6>
                                                        <p>2016 - 2019</p>
                                                    </div>
                                                    <div className="qual-expe-box">
                                                        <h6>Envato Market</h6>
                                                        <p>2019 - Present</p>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </Col>
                                        {/* <Col md="12">
                                    <div className="instructor-course-title">
                                        <h5>Courses by Kamal Sulaiman</h5>
                                    </div>
                                    <div className="instructor-course-slider">
                                        <Swiper {...settings}>
                                            {
                                                Datas.map((data, i) => (
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
                                    </div>
                                </Col> */}
                                    </Row>
                                )
                            })
                        }

                    </Container>
                </section>

                {/* Footer 2 */}
                <FooterTwo />

            </div>
        </Styles>
    )

}

export default InstructorDetails