import React, { Component } from 'react';
import Datas from '../../data/shop/product.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import Pagination from './../../components/Pagination';
import ShopSidebar from './components/ShopSidebar';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/product.js';
import UserService from '../../services/UserService';

class Product extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper product-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title="Products" />

                    {/* Products */}
                    <section className="product-area">
                        <Container>
                            <Row>
                                <Col lg="9" md="8" sm="7">
                                    <Row>
                                        {
                                            Datas.map((data, i) => (
                                                <Col lg="4" md="6" key={i}>
                                                    <div className="product-box">
                                                        <div className="product-img">
                                                            <img src={process.env.PUBLIC_URL + `/assets/images/${data.productImg}`} alt="" className="img-fluid" />
                                                            <span>{data.discount}</span>
                                                            <div className="layer-box"></div>
                                                            <Link className="add_cart" to={process.env.PUBLIC_URL + data.productUrl}>Add To Cart</Link>
                                                            <Link className="item_view" to={process.env.PUBLIC_URL + data.productUrl}>View Item</Link>
                                                        </div>
                                                        <div className="product-content text-center">
                                                            <div className="pro-title">
                                                                <h5><Link to={process.env.PUBLIC_URL + data.productUrl}>{data.productTitle}</Link></h5>
                                                            </div>
                                                            <div className="pro-rating">
                                                                <ul className="list-unstyled list-inline">
                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                    <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                </ul>
                                                            </div>
                                                            <div className="pro-price">
                                                                <p>{data.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))
                                        }

                                        <Col md="12" className="text-center">
                                            <Pagination />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg="3" md="4" sm="5">
                                    <ShopSidebar />
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

export default Product