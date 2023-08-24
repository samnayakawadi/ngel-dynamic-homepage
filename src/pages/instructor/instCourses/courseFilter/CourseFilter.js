import React, { Fragment, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import CourseCategory from "../../../courses/components/CourseCategory";
import CoursePrice from "../../../courses/components/CoursePrice";
import CourseSearch from "./CourseSearch";
import UserService from "../../../../services/UserService";


function CourseFilter() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    return (
        <div className="course-sidebar">
            <Fragment>
                <Row>
                    <Col lg="4" md="12" >
                        <CourseSearch />
                    </Col>
                    <Col lg="4" md="12" >
                        <CoursePrice />
                    </Col>
                    <Col lg="4" md="12" >
                        <CourseCategory />
                    </Col>
                </Row>
            </Fragment>
        </div>
    )

}
export default CourseFilter