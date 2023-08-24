import React from "react";
import Navbar from "../../app/shared/Navbar";
import Sidebar from "../../app/shared/Sidebar";
import StickyMenu from "../common/StickyMenu";
import { Styles } from "../../app/Courses/styles/course.js";
import { useEffect } from "react";
import instructorService from "../../services/instructorService";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Col,
    Container,
    Nav,
    Row,
    Tab,
    TabPane,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import SettingsPanel from "../../app/shared/SettingsPanel";
import Footer from "../../app/shared/Footer";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import service from "../../services/service";
import swal from "sweetalert";
import CourseSearch from "../../pages/courses/components/CourseSearch";
import { useSelector } from "react-redux";
import UserService from "../../services/UserService";

const languages = [
    {
        code: "en",
        name: "English",
        country_code: "gb",
    },

    {
        code: "hi",
        name: "Hindi",
        country_code: "in",
    },
    // {
    //     code: 'te',
    //     name: 'Telugu',
    //     country_code: 'in'
    // },
    {
        code: "pu",
        name: "Punjabi",
        country_code: "in",
    },
    // {
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
];

function AdminViewAllLibrary(props) {
    useEffect(() => {
        UserService.generateToken();
    }, []);

    const currentLanguageCode = Cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t } = useTranslation();
    useEffect(() => {
        document.body.dir = currentLanguage.dir || "ltr";
        document.title = t("app_title");
    }, [currentLanguage, t]);

    const [postsPerPage] = useState(10);
    const [getCourseData, setCourseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);

    let value = useSelector((state) => state.inputValue);

    useEffect(() => {
        courseData();
    }, []);
    const courseData = async () => {
        try {
            let result = await service.getAllLibraryForAdmin();
            setCourseData(result.data);
        } catch (e) {
            //console.log(e);
        }
    };

    const imageUrls = (url) => {
        if (url == null) {
            return "";
        } else {
            let imagepath = url.replace(/\\/g, "\\\\");
            let imageurl = `http://10.244.3.218:8082/${imagepath}`;
            return imageurl;
        }
    };
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentCourseState = getCourseData.slice(0, 1000);
    const [search, setSearch] = useState();

    if (value) {
        let data = getCourseData.filter((course) =>
            course.courseName.toLowerCase().includes(value)
        );
        currentCourseState = data.slice(0, 1000);
    } else {
        currentCourseState = getCourseData.slice(0, 1000);
    }

    // Change page
    //const paginate = pageNumber => setCurrentPage(pageNumber);
    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(currentCourseState.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const [submitHandlerLoading, setSubmitHandlerLoading] = useState({
        isLoading: false,
    });

    const submitHandler = () => {
        setSubmitHandlerLoading({ isLoading: true });
    };

    const onClickApproveButton = (courseId) => {
        instructorService
            .LibraryPublish(courseId)
            .then((resp) => {
                if (resp.status === 200) {
                    swal(`${t("successfully")}`, `${t("library_published")}`, "success");
                    courseData();
                }
            })
            .catch((err) => {
                //console.log(err);
            });
    };

    const onClickRejectButton = (courseId) => {
        instructorService
            .libraryUnPublish(courseId)
            .then((resp) => {
                if (resp.status === 200) {
                    swal(
                        `${t("successfully")}`,
                        `${t("library_unpublished")}`,
                        "success"
                    );
                    courseData();
                }
            })
            .catch((err) => {
                //console.log(err);
            });
    };

    return (
        <div className="container-scroller">
            <Navbar />
            <StickyMenu />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div>
                            <div className="page-header">
                                <h3 className="page-title">{t("courses")}</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="!#" onClick={(event) => event.preventDefault()}>
                                                {t("courses")}
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            {t("view_course")}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <Container>
                            {/* <CourseSearch name={"Search Library"} /> */}
                            <Tab.Container defaultActiveKey="all">
                                <Styles>
                                    <div className="course-tab-list">
                                        <Nav className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="all">{t("all")}</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="published">
                                                    {t("published_library")}
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="reject">
                                                    {t("reject_library")}
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </Styles>
                                <Tab.Content>
                                    <Tab.Pane eventKey="all">
                                        <div className="col-lg-12 grid-margin stretch-card">
                                            <div className='card'>
                                                <div className="row">
                                                    {currentCourseState
                                                        .slice(pagesVisited, pagesVisited + usersPerPage)
                                                        .map((data, i) => {
                                                            return (
                                                                <Styles>
                                                                    <div className="container-fluid d-flex justify-content-center">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="card text-center shadow">
                                                                                    <div className="overflow">
                                                                                        <img
                                                                                            src={imageUrls(data.courseImage)}
                                                                                            alt=""
                                                                                            className="card-img-top"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="card-body text-dark">
                                                                                        <h4 className="card-title">
                                                                                            {data.courseName}
                                                                                        </h4>
                                                                                        <p className="card-text text-secondary">
                                                                                            {/* <a href='#' className='btn btn-outline-success'>View Learner</a> */}
                                                                                            <Link
                                                                                                className="nav-link"
                                                                                                to={
                                                                                                    process.env.PUBLIC_URL +
                                                                                                    `/library/view-content/${data.courseId}`
                                                                                                }
                                                                                            >
                                                                                                <a
                                                                                                    href="#"
                                                                                                    className="btn btn-success"
                                                                                                    onClick={submitHandler}
                                                                                                    style={{ background: "green" }}
                                                                                                    disabled={
                                                                                                        submitHandlerLoading.isLoading
                                                                                                            ? "true"
                                                                                                            : ""
                                                                                                    }
                                                                                                >
                                                                                                    {" "}
                                                                                                    {submitHandlerLoading.isLoading ? (
                                                                                                        <>{t("loading")}</>
                                                                                                    ) : (
                                                                                                        <>{t("view_content")}</>
                                                                                                    )}
                                                                                                </a>
                                                                                            </Link>
                                                                                            {data.status === "R" ||
                                                                                                data.status === "N" ? (
                                                                                                <>
                                                                                                    <div>
                                                                                                        <Button
                                                                                                            onClick={() => {
                                                                                                                onClickApproveButton(
                                                                                                                    data.courseId
                                                                                                                );
                                                                                                            }}
                                                                                                            style={{ marginRight: "5px" }}
                                                                                                            className="btn btn-success"
                                                                                                        >
                                                                                                            {t("approve")}
                                                                                                        </Button>
                                                                                                        <Button
                                                                                                            onClick={() => {
                                                                                                                onClickRejectButton(
                                                                                                                    data.courseId
                                                                                                                );
                                                                                                            }}
                                                                                                            className="btn btn-danger"
                                                                                                        >
                                                                                                            {t("reject")}
                                                                                                        </Button>
                                                                                                    </div>
                                                                                                </>
                                                                                            ) : data.status === "P" ? (
                                                                                                <>
                                                                                                    <Button
                                                                                                        onClick={() => {
                                                                                                            onClickRejectButton(
                                                                                                                data.courseId
                                                                                                            );
                                                                                                        }}
                                                                                                        className="btn btn-danger"
                                                                                                    >
                                                                                                        {t("reject")}
                                                                                                    </Button>
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    <Button
                                                                                                        onClick={() => {
                                                                                                            onClickApproveButton(
                                                                                                                data.courseId
                                                                                                            );
                                                                                                        }}
                                                                                                        className="btn btn-success"
                                                                                                    >
                                                                                                        {t("approve")}
                                                                                                    </Button>
                                                                                                </>
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                {data.status === "N" ? (
                                                                                    <div
                                                                                        className="card text-center shadow"
                                                                                        style={{
                                                                                            position: "absolute",
                                                                                            top: "0px",
                                                                                            left: "15px",
                                                                                            background: "#c20606",
                                                                                            color: "white",
                                                                                            border: "0px"
                                                                                        }}
                                                                                    >
                                                                                        <div>{t('new_content')}</div>
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Styles>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                                <Tab.Content>
                                    <Tab.Pane eventKey="published">
                                        <div className="col-lg-12 grid-margin stretch-card">
                                            <div className='card'>
                                                <div className="row">
                                                    {currentCourseState
                                                        .slice(pagesVisited, pagesVisited + usersPerPage)
                                                        .map((data, i) => {
                                                            return (
                                                                <Styles>
                                                                    {data.status === "P" || data.status === "N" ? (
                                                                        <>
                                                                            <div className="container-fluid d-flex justify-content-center">
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <div className="card text-center shadow">
                                                                                            <div className="overflow">
                                                                                                <img
                                                                                                    src={imageUrls(data.courseImage)}
                                                                                                    alt=""
                                                                                                    className="card-img-top"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="card-body text-dark">
                                                                                                <h4 className="card-title">
                                                                                                    {data.courseName}
                                                                                                </h4>
                                                                                                <p className="card-text text-secondary">
                                                                                                    {/* <a href='#' className='btn btn-outline-success'>View Learner</a> */}
                                                                                                    <Link
                                                                                                        className="nav-link"
                                                                                                        to={
                                                                                                            process.env.PUBLIC_URL +
                                                                                                            `/library/view-content/${data.courseId}`
                                                                                                        }
                                                                                                    >
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className="btn btn-success"
                                                                                                            onClick={submitHandler}
                                                                                                            style={{
                                                                                                                background: "green",
                                                                                                            }}
                                                                                                            disabled={
                                                                                                                submitHandlerLoading.isLoading
                                                                                                                    ? "true"
                                                                                                                    : ""
                                                                                                            }
                                                                                                        >
                                                                                                            {" "}
                                                                                                            {submitHandlerLoading.isLoading ? (
                                                                                                                <>{t("loading")}</>
                                                                                                            ) : (
                                                                                                                <>{t("view_content")}</>
                                                                                                            )}
                                                                                                        </a>
                                                                                                    </Link>
                                                                                                    {data.status === "R" || data.status === "N" ? (
                                                                                                        <>
                                                                                                            <div>
                                                                                                                <Button
                                                                                                                    onClick={() => {
                                                                                                                        onClickApproveButton(
                                                                                                                            data.courseId
                                                                                                                        );
                                                                                                                    }}
                                                                                                                    style={{
                                                                                                                        marginRight: "5px",
                                                                                                                    }}
                                                                                                                    className="btn btn-success"
                                                                                                                >
                                                                                                                    {t("approve")}
                                                                                                                </Button>
                                                                                                                <Button
                                                                                                                    onClick={() => {
                                                                                                                        onClickRejectButton(
                                                                                                                            data.courseId
                                                                                                                        );
                                                                                                                    }}
                                                                                                                    className="btn btn-danger"
                                                                                                                >
                                                                                                                    {t("reject")}
                                                                                                                </Button>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    ) : data.status === "P" ? (
                                                                                                        <>
                                                                                                            <Button
                                                                                                                onClick={() => {
                                                                                                                    onClickRejectButton(
                                                                                                                        data.courseId
                                                                                                                    );
                                                                                                                }}
                                                                                                                className="btn btn-danger"
                                                                                                            >
                                                                                                                {t("reject")}
                                                                                                            </Button>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <>
                                                                                                            <Button
                                                                                                                onClick={() => {
                                                                                                                    onClickApproveButton(
                                                                                                                        data.courseId
                                                                                                                    );
                                                                                                                }}
                                                                                                                className="btn btn-success"
                                                                                                            >
                                                                                                                {t("approve")}
                                                                                                            </Button>
                                                                                                        </>
                                                                                                    )}
                                                                                                </p>
                                                                                            </div>
                                                                                            {data.status === "N" ? (
                                                                                                <div
                                                                                                    className="card text-center shadow"
                                                                                                    style={{
                                                                                                        position: "absolute",
                                                                                                        top: "-20px",
                                                                                                        left: "0px",
                                                                                                        background: "#c20606",
                                                                                                        color: "white",
                                                                                                        border: "0px"
                                                                                                    }}
                                                                                                >
                                                                                                    <div>{t('new_content')}</div>
                                                                                                </div>
                                                                                            ) : null}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </Styles>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                                <Tab.Content>
                                    <Tab.Pane eventKey="reject">
                                        <div className="col-lg-12 grid-margin stretch-card">
                                            <div className='card'>
                                                <div className="row">
                                                    {currentCourseState
                                                        .slice(pagesVisited, pagesVisited + usersPerPage)
                                                        .map((data, i) => {
                                                            return (
                                                                <Styles>
                                                                    {data.status === "U" ? (
                                                                        <>
                                                                            <div className="container-fluid d-flex justify-content-center">
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <div className="card text-center shadow">
                                                                                            <div className="overflow">
                                                                                                <img
                                                                                                    src={imageUrls(data.courseImage)}
                                                                                                    alt=""
                                                                                                    className="card-img-top"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="card-body text-dark">
                                                                                                <h4 className="card-title">
                                                                                                    {data.courseName}
                                                                                                </h4>
                                                                                                <p className="card-text text-secondary">
                                                                                                    {/* <a href='#' className='btn btn-outline-success'>View Learner</a> */}
                                                                                                    <Link
                                                                                                        className="nav-link"
                                                                                                        to={
                                                                                                            process.env.PUBLIC_URL +
                                                                                                            `/library/view-content/${data.courseId}`
                                                                                                        }
                                                                                                    >
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className="btn btn-success"
                                                                                                            onClick={submitHandler}
                                                                                                            style={{
                                                                                                                background: "green",
                                                                                                            }}
                                                                                                            disabled={
                                                                                                                submitHandlerLoading.isLoading
                                                                                                                    ? "true"
                                                                                                                    : ""
                                                                                                            }
                                                                                                        >
                                                                                                            {" "}
                                                                                                            {submitHandlerLoading.isLoading ? (
                                                                                                                <> {t("loading")}</>
                                                                                                            ) : (
                                                                                                                <>{t("view_content")}</>
                                                                                                            )}
                                                                                                        </a>
                                                                                                    </Link>
                                                                                                    {data.status === "R" ? (
                                                                                                        <>
                                                                                                            <div>
                                                                                                                <Button
                                                                                                                    onClick={() => {
                                                                                                                        onClickApproveButton(
                                                                                                                            data.courseId
                                                                                                                        );
                                                                                                                    }}
                                                                                                                    style={{
                                                                                                                        marginRight: "5px",
                                                                                                                    }}
                                                                                                                    className="btn btn-success"
                                                                                                                >
                                                                                                                    {t("approve")}
                                                                                                                </Button>
                                                                                                                <Button
                                                                                                                    onClick={() => {
                                                                                                                        onClickRejectButton(
                                                                                                                            data.courseId
                                                                                                                        );
                                                                                                                    }}
                                                                                                                    className="btn btn-danger"
                                                                                                                >
                                                                                                                    {t("reject")}
                                                                                                                </Button>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    ) : data.status === "P" ? (
                                                                                                        <>
                                                                                                            <Button
                                                                                                                onClick={() => {
                                                                                                                    onClickRejectButton(
                                                                                                                        data.courseId
                                                                                                                    );
                                                                                                                }}
                                                                                                                className="btn btn-danger"
                                                                                                            >
                                                                                                                {t("reject")}
                                                                                                            </Button>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <>
                                                                                                            <Button
                                                                                                                onClick={() => {
                                                                                                                    onClickApproveButton(
                                                                                                                        data.courseId
                                                                                                                    );
                                                                                                                }}
                                                                                                                className="btn btn-success"
                                                                                                            >
                                                                                                                {t("approve")}
                                                                                                            </Button>
                                                                                                        </>
                                                                                                    )}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </Styles>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Container>
                        <div style={{ marginTop: "30px" }}>
                            {currentCourseState.length == 0 ? null : (
                                <Col md="12" className="text-center">
                                    <ReactPaginate
                                        previousLabel={t("previous")}
                                        nextLabel={t("next")}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />
                                </Col>
                            )}
                        </div>
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AdminViewAllLibrary;
