import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/cart.js';
import UserService from '../../services/UserService';

class Cart extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper cart-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title="Cart" />

                    {/* Product Details */}
                    <section className="cart-area">
                        <Container>
                            <Row>
                                <Col lg="8" md="12">
                                    <div className="product-list table-responsive">
                                        <Table className="table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="product-remove"></th>
                                                    <th className="product-thumbnail"></th>
                                                    <th className="product-name">Product</th>
                                                    <th className="product-price">Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-subtotal">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="product-remove"><a href={process.env.PUBLIC_URL + "/"}><i className="las la-trash"></i></a></td>
                                                    <td className="product-thumbnail"><a href={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + `/assets/images/product-01.jpg`} alt="" /></a></td>
                                                    <td className="product-title"><a href={process.env.PUBLIC_URL + "/"}>Product Title Here ...</a></td>
                                                    <td className="product-price"><span className="amount">$49.00</span></td>
                                                    <td className="product-quantity">
                                                        <input type="number" className="form-control" defaultValue="1" />
                                                    </td>
                                                    <td className="product-subtotal"><span className="subtotal">$49.00</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="product-remove"><a href={process.env.PUBLIC_URL + "/"}><i className="las la-trash"></i></a></td>
                                                    <td className="product-thumbnail"><a href={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + `/assets/images/product-02.jpg`} alt="" /></a></td>
                                                    <td className="product-title"><a href={process.env.PUBLIC_URL + "/"}>Product Title Here ...</a></td>
                                                    <td className="product-price"><span className="amount">$39.00</span></td>
                                                    <td className="product-quantity">
                                                        <input type="number" className="form-control" defaultValue="1" />
                                                    </td>
                                                    <td className="product-subtotal"><span className="subtotal">$39.00</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="product-remove"><a href={process.env.PUBLIC_URL + "/"}><i className="las la-trash"></i></a></td>
                                                    <td className="product-thumbnail"><a href={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + `/assets/images/product-03.jpg`} alt="" /></a></td>
                                                    <td className="product-title"><a href={process.env.PUBLIC_URL + "/"}>Product Title Here ...</a></td>
                                                    <td className="product-price"><span className="amount">$59.00</span></td>
                                                    <td className="product-quantity">
                                                        <input type="number" className="form-control" defaultValue="1" />
                                                    </td>
                                                    <td className="product-subtotal"><span className="subtotal">$59.00</span></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <div className="actions d-flex justify-content-between">
                                            <div className="coupon">
                                                <form action="#" className="form-inline">
                                                    <input type="text" className="form-control" placeholder="Coupon code ..." />
                                                    <button type="submit" className="apply-btn">Apply Coupon</button>
                                                </form>
                                            </div>
                                            <div className="update-cart">
                                                <a className="update-btn" href={process.env.PUBLIC_URL + "/"}>Update cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg="4" md="6">
                                    <div className="cart-summary">
                                        <div className="cs-title text-center">
                                            <h5>Cart Summary</h5>
                                        </div>
                                        <div className="cs-content">
                                            <ul className="list-unstyled">
                                                <li>Sub Total <span>$147.00</span></li>
                                                <li>Shipping and Handling <span>$9.00</span></li>
                                                <li>Vat (2.5%) <span>$3.68</span></li>
                                                <li>Discount (10%) <span>$14.70</span></li>
                                            </ul>
                                            <p className="cart-total">Grand Total <span>$143.72</span></p>
                                            <button type="button" className="checkout-btn">Proceed to checkout</button>
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
}

export default Cart