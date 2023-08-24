import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CourseSearch from './../../courses/components/CourseSearch';
import PriceFilter from './PriceFilter';
import PopularCourse from './../../courses/components/PopularCourse';
import CourseTag from './../../courses/components/CourseTag';
import UserService from '../../../services/UserService';

class ShopSidebar extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <div className="course-sidebar">
                <Row>
                    <Col md="12">
                        <CourseSearch />
                    </Col>
                    <Col md="12">
                        <PriceFilter />
                    </Col>
                    <Col md="12">
                        <PopularCourse />
                    </Col>
                    <Col md="12">
                        <CourseTag />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ShopSidebar
