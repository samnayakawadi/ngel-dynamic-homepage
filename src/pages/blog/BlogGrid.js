import React, { Component } from 'react';
import Datas from '../../data/blog/grid.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import Pagination from './../../components/Pagination';
import BlogSidebar from './components/BlogSidebar';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/blog.js';
import UserService from '../../services/UserService';

class BlogGrid extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper blog-grid-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title="Blog Grid" />

                    {/* Blog Classic */}
                    <section className="blog-grid-area">
                        <Container>
                            <Row>
                                <Col lg="9" md="8" sm="7">
                                    <Row>
                                        {
                                            Datas.map((data, i) => (
                                                <Col lg="6" md="12" key={i}>
                                                    <div className="blog-item">
                                                        <div className="blog-img">
                                                            <Link to={process.env.PUBLIC_URL + data.postLink}><img src={process.env.PUBLIC_URL + `/assets/images/${data.postImg}`} alt="" className="img-fluid" /></Link>
                                                        </div>
                                                        <div className="blog-content">
                                                            <div className="blog-auth_date d-flex">
                                                                <div className="author-img d-flex">
                                                                    <Link to={process.env.PUBLIC_URL + data.authorLink}><img src={process.env.PUBLIC_URL + `/assets/images/${data.authorImg}`} alt="" /></Link>
                                                                    <p><Link to={process.env.PUBLIC_URL + data.authorLink}>{data.authorName}</Link></p>
                                                                </div>
                                                                <div className="post-date">
                                                                    <p><i className="las la-calendar"></i> {data.postDate}</p>
                                                                </div>
                                                            </div>
                                                            <div className="blog-title">
                                                                <h6><Link to={process.env.PUBLIC_URL + data.postLink}>{data.postTitle}</Link></h6>
                                                            </div>
                                                            <div className="blog-desc">
                                                                <p>{data.postDesc}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>

                                    <div className="text-center">
                                        <Pagination />
                                    </div>
                                </Col>
                                <Col lg="3" md="4" sm="5">
                                    <BlogSidebar />
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

export default BlogGrid