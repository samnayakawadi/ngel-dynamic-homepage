import React, { Component } from 'react';
import Datas from '../../data/404/error.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/pageNotFound.js';
import UserService from '../../services/UserService';

class SessionExpire extends Component {

    componentDidMount() {
        UserService.generateToken();
       }
       
    render() {
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
                                    <div className="error-box text-center">
                                        <h1>Oo<span>p</span>s!</h1>
                                        <h3>Time's Out</h3>
                                        <p>Your Session Has Been Expire</p>
                                        <Link to={process.env.PUBLIC_URL + "/"}><i className="fas fa-home"></i>Go To Homepage</Link>
                                        <br/>
                                        <br/>
                                        <Link onClick={()=>{UserService.doLogin()}}><i className="fas fa-user"></i>  Login Again  </Link>
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

export default SessionExpire;