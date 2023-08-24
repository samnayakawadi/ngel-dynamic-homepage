import React, { Component, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import CourseSidebar from '../../pages/courses/components/CourseSidebar';
import CourseItemGrid from '../../pages/courses/components/CourseItemsGrid';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/course.js';
import { useHistory } from 'react-router-dom';
import StickyMenu from '../../components/common/StickyMenu';
import LibraryItemGrid from './LibraryItemGrid';
import UserService from '../../services/UserService';


const libraryContent = (props) => {



    //const history = useHistory();

    const switchListView = () => {
       
        //history.push('course-list');
        window.location.reload();
    }

    const scrollWin = () => {
        //document.getElementById('Main').scrollIntoView({behavior:'smooth'})
        window.scrollTo(0,290);
    }

    return (
        <div className="main-wrapper course-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            <HeaderTwo />
            
            {/* Breadcroumb */}
            <BreadcrumbBox title="Library" />

            <Styles >
                {/* Course Grid */}
                <section className="course-grid-area"  >
                    <Container>
                        <Row>
                            <Col lg="3" md="4" sm="5">
                                <CourseSidebar />
                            </Col>
                            <Col lg="8" md="7" sm="6">
                                <div className="course-items">
                                    <Row>
                                        {/* <CourseItemGrid /> */}
                                        <LibraryItemGrid/>                                        
                                    </Row>
                                </div>
                            </Col>
                            <Col lg="1" md="1" sm="1">
                                <a href="#" onClick={() => switchListView()} style={{ color: "black" }}><i className="las la-list-ul" style={{ fontSize: "30px", color:'#11B67A' }} title="List View"></i></a>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>

            {/* Footer 2 */}
            <FooterTwo />

        </div>
    )

}

export default libraryContent