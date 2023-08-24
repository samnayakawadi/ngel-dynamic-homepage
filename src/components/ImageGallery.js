import React, { Component } from 'react';
import Datas from '../data/gallery/gallery.json';
import { Container, Row, Col } from 'react-bootstrap';
import ModalImage from "react-modal-image";
import { Styles } from "./styles/imageGallery.js";
import UserService from '../services/UserService';

class ImageGallery extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Campus Tour */}
                <section className="gallery-area">
                    <Container fluid>
                        <Row>
                            {
                                Datas.map((data, i) => (
                                    <Col md="3" sm="6" className="padding-fix" key={i}>
                                        <div className="gallery-box">
                                            <ModalImage small={process.env.PUBLIC_URL + `/assets/images/${data.galleryImage}`} large={process.env.PUBLIC_URL + `/assets/images/${data.galleryImage}`} alt="" />
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

export default ImageGallery
