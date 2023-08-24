import React, { Component, useEffect, useState } from 'react';
import Datas from '../../data/instructor/instructor.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import Pagination from './../../components/Pagination';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/instructor.js';
import service from '../../services/service';
import UserService from '../../services/UserService';

function Instructor() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    const um_api = UserService.USER_API;
    ////console.log(um_api);

    const [getInstructordata, setInstructordata] = useState([]);
    useEffect(() => {
        service.getAllInstructorsDetails()
            .then((res) => {
                setInstructordata(res.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])
    const [getInstructorImg, setInstructorImg] = useState({
        img: um_api + "getprofilepic/"
    });

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper instructor-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Instructors" />

                {/* Instructor Area */}
                <section className="instructor-area">
                    <Container>
                        <Row>
                            {
                                getInstructordata.map((data, i) => (
                                    <Col lg="3" md="4" sm="6" key={i}>
                                        <div className="instructor-item">
                                            <Link to={process.env.PUBLIC_URL + `/instructor-details/${data.learnerUsername}`}><img src={`${getInstructorImg.img}${data.learnerUsername}`} alt="" className="img-fluid" /></Link>
                                            <div className="img-content text-center">
                                                <h5><Link to={process.env.PUBLIC_URL + `/instructor-details/${data.learnerUsername}`}>{data.firstName}</Link></h5>
                                                <p>{data.designation}</p>
                                                <ul className="list-unstyled list-inline">
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.facebookId}><i className="fab fa-facebook-f"></i></a></li>
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.twitterId}><i className="fab fa-twitter"></i></a></li>
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.youtubeId}><i className="fab fa-youtube"></i></a></li>
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.linkedinId}><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li className="list-inline-item"><a href={process.env.PUBLIC_URL + data.skypeId}><i className="fab fa-skype"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                            <Col md="12" className="text-center">
                                <Pagination />
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

export default Instructor