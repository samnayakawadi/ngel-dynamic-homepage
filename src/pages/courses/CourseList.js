import React,{useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import CourseSidebar from './components/CourseSidebar';
import CourseItemList from './components/CourseItemsList';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/course.js';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/UserService';

const CourseList = () => {
    useEffect(() => {
        UserService.generateToken();
       }, []);

    const history = useHistory();

    const switchGridView = () => {
        history.push('course-grid');
        window.location.reload();
    }

    const scrollWin = () => {
        window.scrollTo(0,290);
    }

    return (
        <div className="main-wrapper course-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            <HeaderTwo />

            {/* Breadcroumb */}
            <BreadcrumbBox title="Courses" />

            <Styles>
                {/* Course Grid */}
                <section className="course-list-area">
                    <Container>
                        <Row>
                            <Col lg="3" md="4" sm="5">
                                <CourseSidebar />
                            </Col>
                            <Col lg="8" md="7" sm="6">
                                <div className="course-items2">
                                    <Row>
                                        <CourseItemList />
                                    </Row>
                                </div>
                            </Col>
                            <Col lg="1" md="1" sm="1">
                                <a href="#" onClick={() => switchGridView()} style={{ color: "black" }}><i className="las la-table" style={{ fontSize: "30px", color:'#11B67A' }} title="Grid View"></i></a>
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

export default CourseList