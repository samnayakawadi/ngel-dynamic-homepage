import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CourseSearch from './CourseSearch';
import CoursePrice from './CoursePrice';
import PopularCourse from './PopularCourse';
import CourseTag from './CourseTag';
import CourseCategory from './CourseCategory';

class CourseSidebar extends Component {

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
                        <CourseCategory />
                    </Col>
                    <Col md="12">
                        <CoursePrice />
                    </Col>
                    {/* <Col md="12">
                        <PopularCourse />
                    </Col> */}
                    {/* <Col md="12">
                        <CourseTag />
                    </Col> */}
                </Row>
            </div>
        )
    }
}

export default CourseSidebar
