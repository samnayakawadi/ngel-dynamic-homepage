import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import instructorService from "../../../services/instructorService";
import service from "../../../services/service";
import UserService from "../../../services/UserService";
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, OverlayTrigger, Tooltip, TabPane } from 'react-bootstrap';
import { colors } from "../../../components/common/element/elements.js";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import CryptoJS from "crypto-js";


const languages = [

    {
        code: 'en',
        name: 'English',
        country_code: 'gb',
    },
    {
        code: 'hi',
        name: 'Hindi',
        country_code: 'in'
    },
    // {
    //     code: 'te',
    //     name: 'Telugu',
    //     country_code: 'in'
    // },
    {
        code: 'pu',
        name: 'Punjabi',
        country_code: 'in'
    },
    // {
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
]

function CourseItem() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    const history = useHistory();
    const [getCourses, setCourses] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [filteredCourse, setFilteredCourse] = useState([]);
    let value = useSelector(state => state.inputValue);
    let userId = UserService.getUserid();
    let roleId = 2;
    useEffect(() => {
        service.getCoursesByUserIdAndRoleId(userId, roleId)
            .then(res => {
                setCourses(res.data);
            }).catch(err => {
                //console.log(err);
            })
    }, [])

    const deleteCourse = (cid) => {
        swal({
            title: `${t('swal_title')}`,
            text: `${t('swal_text')}`,
            icon: "warning",
            buttons: [
                t('no_cancel'),
                t('yes_delete')
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                instructorService.courseDelete(cid)
                    .then(async res => {
                        if (res.data === "deleted successfully") {
                            await swal(`${t('delete')}`, `${t('delete_msg')}`, "success");
                            service.getCoursesByUserIdAndRoleId(userId, roleId)
                                .then(res => {
                                    setCourses(res.data);
                                })
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            } else {
                swal(`${t('cancel')}`, `${t('safe_msg')}`, "error");
            }
        });
    }

    const fee_validator = (fees) => {
        if (fees === 0) {
            return t('free_course')
        }
        else {
            return <div>&#8377;{fees}</div>
        }
    }

    const convertDate = (dateFormat) => {
        let timestamp = Date.parse(dateFormat);
        let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
        return d;
    }

    const imageUrls = (url) => {
        if (url == null) {
            return '';
        } else {
            let imagepath = url.replace(/\\/g, "\\\\");
            let imageurl = `http://10.244.3.218:8082/${imagepath}`;
            return imageurl;
        }
    }

    let currentCourseState;
    if (value) {
        let data = getCourses.filter((course) =>
            course.courseDetails.courseName.toLowerCase().includes(value)
        )
        currentCourseState = data.slice(0, 1000);
    } else {
        currentCourseState = getCourses.slice(0, 1000);
    }

    const usersPerPage = 6;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(currentCourseState.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const cipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(32)).substr(-2);
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return text => text.split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('');
    }


    const CourseDetails = (cId) => {
        // var result = '';
        // let length = 10;
        // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // var charactersLength = characters.length;
        // for (var i = 0; i < length; i++) {
        //     result += characters.charAt(Math.floor(Math.random() *
        //         charactersLength));
        // }
        // const myCipher = cipher(`${result}`)
        // let cid = myCipher(`${cId}`);
        // history.push(`${process.env.PUBLIC_URL + "/inst-course-details/"}${result}${cid}`);

        const secretKey = "cdac@123"

        const encodedCourseId = CryptoJS.AES.encrypt(
            `${cId}`,
            secretKey
        ).toString();
        const safeEncodedCourseId = encodedCourseId
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        // const encodedTenantId = CryptoJS.AES.encrypt(
        //     `${tid}`,
        //     secretKey
        // ).toString();
        // const safeEncodedTenantId = encodedTenantId
        //     .replace(/\+/g, "-")
        //     .replace(/\//g, "_")
        //     .replace(/=+$/, "");

        history.push(`${process.env.PUBLIC_URL + "/inst-course-details/"}${safeEncodedCourseId}`);




    }

    // if (loading) {
    //     return <div className="loader"></div>;
    // }

    return (
        <>
            {currentCourseState.length == 0 ? <div style={{ marginLeft: '30px' }}>{t('no_course')}</div> :
                <Fragment>
                    {currentCourseState.slice(pagesVisited, pagesVisited + usersPerPage).map((data, i) => (
                        <Col lg="4" md="12" key={i}>
                            <div className="course-item">
                                <div className="course-image" style={{ backgroundImage: `url(${imageUrls(data.courseDetails.imageUrl)})` }}>
                                    <div className="layer-box"></div>
                                    {data.courseDetails.userCount == 0 ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('del_course')}</Tooltip>}>
                                        <Link className="add_cart" onClick={() => deleteCourse(data.id.courseId)}><i className="fas fa-trash-alt" style={{ fontSize: "17px" }}></i></Link>
                                    </OverlayTrigger> : null}
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('update_course')}</Tooltip>}>
                                        <Link className="item_view" to={process.env.PUBLIC_URL + `/UpdateCourse/${data.id.courseId}`}><i className="fa fa-edit" style={{ fontSize: "17px" }}></i></Link>
                                    </OverlayTrigger>
                                    <div className="course-price">
                                        <p>{fee_validator(data.courseDetails.course_Fee)}</p>
                                    </div>
                                </div>

                                <div className="course-content">
                                    <div>
                                        <Row>
                                            <Col sm={9}>
                                                <h6 className="heading" style={{ textTransform: 'capitalize' }}>
                                                    <Link onClick={() => CourseDetails(data.id.courseId)}>{data.courseDetails.courseName}</Link></h6>
                                            </Col>
                                            <Col sm={3}>
                                                <Button variant="success" style={{ position: "absolute", right: 10, background: `${colors.gr_bg}` }} onClick={() => CourseDetails(data.id.courseId)}>{t('view')}</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <h6><p>{t('cat')} : {data.courseDetails.category}</p></h6>
                                    <p className="desc" style={{ textAlign: "justify", textOverflow: "ellipsis", width: "300px", whiteSpace: "nowrap", overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: data.courseDetails.courseDescription }}></p>
                                    <div className="course-face d-flex justify-content-between">
                                        <div className="course-date">
                                            <p>{t("enrollment_start_date")} :  {convertDate(data.courseDetails.enrollSdate)} </p>
                                        </div>
                                    </div>
                                    <div className="course-face d-flex justify-content-between" >
                                        <div className="course-date1">
                                            <p>{t("enrollment_end_date")} :  {convertDate(data.courseDetails.enrollEdate)} </p>
                                        </div>
                                    </div><br></br>
                                    <div className="course-face d-flex justify-content-between">
                                        <div className="duration">
                                            <p><i className="fas fa-clock"></i>{data.courseDetails.duration == 1825 ? "Unlimited" : data.courseDetails.duration} {t('day')}</p>
                                        </div>
                                        <div className="student">
                                            <p><i className="fas fa-users"></i> {data.courseDetails.userCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Fragment>
            }
            {
                currentCourseState.length == 0 ? null :
                    <Col md="12" style={{ marginLeft: '110px' }} className="text-center">
                        <ReactPaginate
                            previousLabel="Previous"
                            nextLabel="Next"
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </Col>
            }
        </>
    )

}

export default CourseItem;