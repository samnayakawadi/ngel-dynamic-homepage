import React, { Component } from 'react';
import Datas from '../../data/404/error.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/pageNotFound.js';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import service from '../../services/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserService from '../../services/UserService';

function TokenActivatePage(props) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const { search } = useLocation();
    const parameters = new URLSearchParams(search);
    const token = parameters.get('token');
    const [getTokenStatus, setTokenStatus] = useState();

    ////console.log(props);
    ////console.log(token);

    const [TokenLoading, setTokenLoading] = useState({
        isLoading: false
    })


    useEffect(() => {
        setTokenLoading({ isLoading: true });
        service.tokenVerification(token)
            .then((res) => {
                ////console.log("Token Response "+ res.data);
                if (res.data === 'Success') {
                    setTokenStatus(true);
                    setTokenLoading({ isLoading: false });
                }
                else if (res.data === 'Failed') {

                    setTokenStatus(false);
                    setTokenLoading({ isLoading: false });
                }
            })
            .catch((err) => {
                //console.log(err);
                setTokenLoading({ isLoading: false });

            })
    }, [token])

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper error-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* 404 Area */}
                <section className="error-area" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.backgroundImage})` }}>
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="text-center">
                                    <div style={{ background: "#182B49de", padding: "20px", borderRadius: "15px" }}  >
                                        <div>
                                            {(TokenLoading.isLoading === true) && (
                                                <>
                                                    <div>
                                                        <i class="fa fa-envelope fa-6x" style={{ color: "white", fontSize: "4rem", position: "relative", left: "10px" }} aria-hidden="true"></i>
                                                        <i class="fa fa-spinner fa-spin fa-2x" style={{ right: "20px", position: "relative", color: "#0a1a33", top: "10px", right: "4px" }} aria-hidden="true"></i>
                                                    </div>
                                                    <div style={{ color: "white" }}>
                                                        <br></br>
                                                        <h5>Wait!</h5>
                                                        <br></br>
                                                        <h6 style={{ margin: "1px" }}>Dear User, kindly wait for Confirmation. </h6>
                                                    </div>
                                                </>
                                             )} 
                                             {(getTokenStatus === true) && (TokenLoading.isLoading === false) && (
                                                <>
                                                    <div>
                                                        <i class="fa fa-envelope fa-6x" style={{ color: "white", fontSize: "4rem", position: "relative", left: "10px" }} aria-hidden="true"></i>
                                                        <i class="fa fa-check-circle fa-2x " style={{ right: "20px", position: "relative", color: "green", top: "10px", right: "4px" }} aria-hidden="true"></i>
                                                    </div>
                                                    <div style={{ color: "white" }}>
                                                        <br></br>
                                                        <h5>Welcome to MeghSikshak!</h5>
                                                        <br></br>
                                                        <h6 style={{ margin: "1px" }}>Dear User, Your E-mail ID has been approved.</h6>
                                                        <h6 style={{ margin: "1px" }}>Kindly wait till the admin confirm your registration request.</h6>
                                                    </div>
                                                </>
                                            )}
                                            {(getTokenStatus === false) && (TokenLoading.isLoading === false) && (
                                                <>
                                                    <div>
                                                        <i class="fa fa-envelope fa-6x" style={{ color: "white", fontSize: "4rem", position: "relative", left: "10px" }} aria-hidden="true"></i>
                                                        <i class="fa fa-times-circle fa-2x" style={{ position: "relative", color: "red", top: "10px", right: "4px" }} aria-hidden="true"></i>
                                                    </div>
                                                    <div style={{ color: "white" }}>
                                                        <br></br>
                                                        <h5>Sorry!</h5>
                                                        <br></br>
                                                        <h6 style={{ margin: "1px" }}>Dear User, kindly check your email ID. </h6>
                                                    </div>
                                                </>
                                            )} 
                                        </div>
                                    </div>
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

export default TokenActivatePage