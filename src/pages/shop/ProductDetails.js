import React, { Component } from 'react';
import Datas from '../../data/shop/details.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Tab, Nav, Table } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Quantity from './components/Quantity';
import ReviewForm from './../courses/components/ReviewForm';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/productDetails.js';
import UserService from '../../services/UserService';

class ProductDetails extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        const settings = {
            showArrows: false,
            showStatus: false,
            showIndicators: false,
        };

        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper product-details-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title="Product Details" />

                    {/* Product Details */}
                    <section className="product-details-area">
                        <Container>
                            <Row>
                                <Col md="5">
                                    <div className="product-slider">
                                        <Carousel {...settings}>
                                            {
                                                Datas.map((data, i) => (
                                                    <div className="slider-item" key={i}>
                                                        <img src={process.env.PUBLIC_URL + `/assets/images/${data.productImg}`} alt="" className="img-fluid" />
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                </Col>

                                <Col md="7">
                                    <div className="product-information">
                                        <div className="product-title">
                                            <h4>Xiaomy LED Light Bulb With Verious Model</h4>
                                        </div>
                                        <div className="product-rating d-flex">
                                            <ul className="rating list-unstyled list-inline">
                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                            </ul>
                                            <div className="review-num">
                                                <Link to={process.env.PUBLIC_URL + "/"}>( 07 Review )</Link>
                                            </div>
                                        </div>
                                        <div className="product-price d-flex">
                                            <p className="dc-price">$139.00</p>
                                            <p className="ac-price">$199.00</p>
                                        </div>
                                        <div className="product-desc">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam et dolorem nostrum quos placeat. Quibusdam necessitatibus adipisci dignissimos autem voluptate, dicta ullam, assumenda qui, corporis ut vero neque sapiente possimus.</p>
                                        </div>
                                        <div className="product-stock">
                                            <p>Availability : <span className="stock">In Stock</span> <span className="stock-num">(09 Available)</span></p>
                                        </div>
                                        <div className="product-color">
                                            <ul className="list-unstyled list-inline">
                                                <li className="list-inline-item">Color :</li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="color-1" name="color" value="color-1" />
                                                    <label htmlFor="color-1"><span><i className="las la-check"></i></span></label>
                                                </li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="color-2" name="color" value="color-2" />
                                                    <label htmlFor="color-2"><span><i className="las la-check"></i></span></label>
                                                </li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="color-3" name="color" value="color-3" />
                                                    <label htmlFor="color-3"><span><i className="las la-check"></i></span></label>
                                                </li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="color-4" name="color" value="color-4" />
                                                    <label htmlFor="color-4"><span><i className="las la-check"></i></span></label>
                                                </li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="color-5" name="color" value="color-5" />
                                                    <label htmlFor="color-5"><span><i className="las la-check"></i></span></label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product-size">
                                            <ul className="list-unstyled list-inline">
                                                <li className="list-inline-item">Size :</li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="size-1" name="size" value="size-1" />
                                                    <label htmlFor="size-1">S</label>
                                                </li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="size-2" name="size" value="size-2" />
                                                    <label htmlFor="size-2">M</label>
                                                </li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="size-3" name="size" value="size-3" />
                                                    <label htmlFor="size-3">L</label>
                                                </li>
                                                <li className="list-inline-item">
                                                    <input type="radio" id="size-4" name="size" value="size-4" />
                                                    <label htmlFor="size-4">XL</label>
                                                </li>
                                            </ul>
                                        </div>

                                        <Quantity />

                                        <div className="product-cart-wh-com-btn">
                                            <Link to={process.env.PUBLIC_URL + "/product-details"} className="cart-btn">Add To Cart</Link>
                                            <Link to={process.env.PUBLIC_URL + "/product-details"} className="wishlist-btn"><i className="far fa-heart"></i></Link>
                                            <Link to={process.env.PUBLIC_URL + "/product-details"} className="compare-btn"><i className="fas fa-random"></i></Link>
                                        </div>
                                    </div>
                                </Col>

                                <Col md="12">
                                    <div className="product-tab">
                                        <Tab.Container defaultActiveKey="description">
                                            <Nav className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="description">Description</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="additional">Additional Information</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="review">Product Review</Nav.Link>
                                                </Nav.Item>
                                            </Nav>

                                            <Tab.Content>
                                                <Tab.Pane eventKey="description" className="description-tab">
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda optio sequi suscipit et modi! Corporis obcaecati rerum et, explicabo inventore, aliquid, odit modi harum libero culpa distinctio. Nemo, aliquid dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum praesentium impedit enim voluptate ducimus, saepe autem. Lorem ipsum dolor sit, amet consectetur adipisicing accusantium quam eius dignissimos quaerat voluptatem excepturi aliquid dolor ducimus. Illo porro maiores fuga dignissimos temporibus odio nulla nobis nemo. Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /><br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nesciunt harum facilis odit inventore molestias qui asperiores recusandae architecto mollitia provident ipsa unde, praesentium impedit enim voluptate ducimus, saepe autem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio earum accusantium quam eius dignissimos quaerat voluptatem excepturi aliquid dolor ducimus.<br /><br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nesciunt harum facilis odit inventore molestias qui asperiores recusandae architecto mollitia provident ipsa unde, praesentium impedit enim voluptate ducimus, saepe autem met adipisicing nesciunt facilis.</p>
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="additional" className="additional-tab">
                                                    <Table className="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>Product Id</td>
                                                                <td>#KC7269889</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Brand</td>
                                                                <td>Samsung Electronics</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Model</td>
                                                                <td>Regular Model</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Size</td>
                                                                <td>Small / Medium / Large</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Color</td>
                                                                <td>White / Black / Blue</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Warranty</td>
                                                                <td>3 Years International Warranty</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Country Of Origin</td>
                                                                <td>United States</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Made In</td>
                                                                <td>Republic Of China</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Dimensions</td>
                                                                <td>24 x 27 x 163 cm</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Weight</td>
                                                                <td>33 KG</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="review" className="review-tab">
                                                    <div className="review-comments">
                                                        <div className="comment-box d-flex">
                                                            <div className="comment-image">
                                                                <img src={process.env.PUBLIC_URL + `/assets/images/testimonial-2.jpg`} alt="" />
                                                            </div>
                                                            <div className="comment-content">
                                                                <div className="comment-title">
                                                                    <h6>Mark Shadow</h6>
                                                                </div>
                                                                <div className="date-rating d-flex justify-content-between">
                                                                    <p>Mar 26, 2020</p>
                                                                    <ul className="list-unstyled list-inline">
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="comment-desc">
                                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto laborum quas placeat perspiciatis est, nisi expedita consectetur sit minus illum laudantium nostrum dolore odit asperiores quisquam ad enim iusto laborum quas placeat perspiciatis saepe.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="comment-box d-flex">
                                                            <div className="comment-image">
                                                                <img src={process.env.PUBLIC_URL + `/assets/images/testimonial-1.jpg`} alt="" />
                                                            </div>
                                                            <div className="comment-content">
                                                                <div className="comment-title">
                                                                    <h6>Katrin Kay</h6>
                                                                </div>
                                                                <div className="date-rating d-flex justify-content-between">
                                                                    <p>Mar 26, 2020</p>
                                                                    <ul className="list-unstyled list-inline">
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="comment-desc">
                                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto laborum quas placeat perspiciatis est, nisi expedita consectetur sit minus illum laudantium nostrum dolore odit asperiores quisquam ad enim iusto laborum quas placeat perspiciatis saepe.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="comment-box d-flex">
                                                            <div className="comment-image">
                                                                <img src={process.env.PUBLIC_URL + `/assets/images/testimonial-2.jpg`} alt="" />
                                                            </div>
                                                            <div className="comment-content">
                                                                <div className="comment-title">
                                                                    <h6>David Show</h6>
                                                                </div>
                                                                <div className="date-rating d-flex justify-content-between">
                                                                    <p>Mar 26, 2020</p>
                                                                    <ul className="list-unstyled list-inline">
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="comment-desc">
                                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto laborum quas placeat perspiciatis est, nisi expedita consectetur sit minus illum laudantium nostrum dolore odit asperiores quisquam ad enim iusto laborum quas placeat perspiciatis saepe.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="review-form">
                                                        <h5>Write a Review</h5>
                                                        <ReviewForm />
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
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

export default ProductDetails