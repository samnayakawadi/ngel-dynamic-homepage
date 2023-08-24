import React, { useEffect, useState } from 'react';
import Datas from '../data/course/filter.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/courseFilter.js";
import Services from '../services/service';
import { useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import learnerService from '../services/learnerService';
import service from '../services/service';
import instructorService from '../services/instructorService';
import UserService from '../services/UserService';
import CryptoJS from "crypto-js";


// Testing 2.0

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
function CourseFilter(props) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const um_api = UserService.USER_API;
    ////console.log(um_api);


    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    const [rating, setRating] = useState([]);

    useEffect(() => {
        const buttons = document.querySelector(".filter-btn-list").children;
        const items = document.querySelector(".filter-items").children;

        let dataTarget = "*";
        for (let k = 0; k < items.length; k++) {
            items[k].style.display = "none";

            if (dataTarget === "*") {
                ////console.log(target);
                ////console.log( items[k]);
                ////console.log( items.length);
                for (let i = 0; (i < k && i < 6); i++) {
                    items[i].style.display = "block";
                }

            }
        }

        for (let i = 0; i < buttons.length; i++) {

            buttons[i].addEventListener("click", function () {

                for (let j = 0; j < buttons.length; j++) {
                    buttons[j].classList.remove("active");
                }

                this.classList.add("active");
                const target = this.getAttribute("data-target");
                ////console.log(target);

                for (let k = 0; k < items.length; k++) {
                    items[k].style.display = "none";


                    if (items[k].getAttribute("data-id") === target) {
                        ////console.log(target);

                        items[k].style.display = "block";
                    }

                    if (target === "*") {
                        ////console.log(target);
                        ////console.log( items[k]);
                        ////console.log( items.length);
                        for (let i = 0; (i < k && i < 6); i++) {
                            items[i].style.display = "block";
                        }

                    }
                }
            })
        }
    });

    const [getCategoryData, setCategoryData] = useState([]);
    useEffect(() => {
        Category();
    }, [])

    const Category = async () => {
        let result = await instructorService.getAllCourseCategory();
        setCategoryData(result.data)
    }
    const [getAvgRating, setAvgRating] = useState([]);
    const [courseState, setCourseState] = useState([]);
    useEffect(() => {
        // Services.averageRating()
        //     .then(res => {
        //         setAvgRating(res.data.filter(function (ele) {
        //             return ele.avgScore === 4 || ele.avgScore === 4.1 || ele.avgScore === 4.2 || ele.avgScore === 4.3
        //                 || ele.avgScore === 4.4 || ele.avgScore === 4.5 || ele.avgScore === 4.6
        //                 || ele.avgScore === 4.7 || ele.avgScore === 4.8 || ele.avgScore === 4.9 || ele.avgScore === 5;
        //         }));
        //     })

        // const fatchRating = async () => {
        //     const response = await Services.averageRating();
        //     setAvgRating(response.data);
        // }
        const fetchPosts = async () => {
            const res = await service.getAllCourses();

            setCourseState(res.data);

        };
        fetchPosts();
    }, []);

    useEffect(() => {
        ratingTest();
        ////console.log(courseState);
    }, [courseState])

    const ratingTest = () => {
        ////console.log(courseState);
        courseState.map((data, i) => {
            ////console.log(data.courseId);
            setRating(rating => [...rating, { itemId: data.courseId, tenantId: 1 }])
        })
    }

    useEffect(() => {
        ////console.log("108" + rating);
        if (rating !== " ") {
            //console.log("rating ", rating);
            Services.averageRating(rating)
                .then(res => {
                    setAvgRating(res.data);
                })
        }
    }, [rating]);



    const unique = [...new Map(courseState.map((m) => [m.catId, m])).values()];

    const fee_validator = (fees) => {
        if (fees === 0) {
            return "Free Course"
        }
        else {
            return <div>&#8377;{fees}</div>
        }
    }

    const history = useHistory();
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
    const CourseDetails = (id, tid) => {
        // var result = '';
        // let length = 10;
        // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // var charactersLength = characters.length;
        // for (var i = 0; i < length; i++) {
        //     result += characters.charAt(Math.floor(Math.random() *
        //         charactersLength));
        // }
        // const myCipher = cipher(`${result}`)
        // let cid = myCipher(`${id}`);
        // let tId = myCipher(`${tid}`);
        // let rNumber = Math.floor(Math.random() * 10000000000);
        // history.push(`${process.env.PUBLIC_URL + "/course-details/"}${rNumber}${cid}/${result}${tId}`);

        const secretKey = "cdac@123"

        const encodedCourseId = CryptoJS.AES.encrypt(
            `${id}`,
            secretKey
        ).toString();
        const safeEncodedCourseId = encodedCourseId
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        const encodedTenantId = CryptoJS.AES.encrypt(
            `${tid}`,
            secretKey
        ).toString();
        const safeEncodedTenantId = encodedTenantId
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        history.push(`${process.env.PUBLIC_URL + "/course-details/"}${safeEncodedCourseId}/${safeEncodedTenantId}`);
    }

    // important note highlight read this line carefully
    // after the comes tenant id dyanmically replace this value "1" to this string "courseState[y].tenantId"
    // replace "1" to d.tenantId
    let json = [];
    for (let y in courseState) {
        for (let x in getAvgRating) {
            if (courseState[y].courseId == getAvgRating[x].itemId && 1 == getAvgRating[x].tenantId) {
                json.push(courseState[y]);
            }
        }
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
    ////console.log(courseState);

    const [viewAllCourse, setViewAllCourse] = useState({
        isLoading: false
    })

    const viewAllCourseFunction = () => {
        setViewAllCourse({ isLoading: true });
    }

    return (
        <Styles>
            {/* Course Area */}
            <section className="course-filter">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="sec-title text-center">
                                <h4>{Datas.secTitle}</h4>
                                <h4 style={{ fontFamily: "Raavi" }}>ਦੇਹ ਸਿਵਾ ਬਰੁ ਮੋਹਿ ਇਹੈ, ਸੁਭ ਕਰਮਨ ਤੇ ਕਬਹੂੰ ਨ ਟਰੋਂ ॥<br></br>ਨ ਡਰੋਂ ਅਰਿ ਸੋ ਜਬ ਜਾਇ ਲਰੋਂ, ਨਿਸਚੈ ਕਰਿ ਅਪੁਨੀ ਜੀਤ ਕਰੋਂ ॥</h4>
                            </div>
                        </Col>
                        <Col md="12">
                            <div className="filter-btns text-center">
                                <ul className="filter-btn-list list-unstyled list inline">
                                    <li data-target="*" className="active list-inline-item">{t("all_courses")}</li>
                                    {unique.map((data) => {
                                        return (
                                            <>
                                                {
                                                    data.catName !== "elibrary"
                                                        ?
                                                        <>
                                                            <li data-target={data.catName} className="list-inline-item">{data.catName}</li>
                                                        </>
                                                        :
                                                        <>
                                                        </>

                                                }
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                            <Row className="filter-items">
                                {
                                    courseState.map((data, i) => (
                                        data.status == "P" && data.catName !== "elibrary" ?
                                            <Col lg="4" md="6" key={data.courseId} data-id={data.catName}>
                                                <div className="course-item">
                                                    <Link onClick={() => CourseDetails(data.courseId, 1)}>
                                                        <div className="course-image" style={{ backgroundImage: `url(${imageUrls(data.courseImage)})` }}>
                                                            {data.instructor.map((d) => (
                                                                <div className="author-img d-flex">
                                                                    <div className="img">
                                                                        <img src={um_api + `getprofilepic/${d.learnerUsername}`} alt="" />
                                                                    </div>
                                                                    <div className="title">
                                                                        <p>{d.firstName}</p>
                                                                        <p>{d.lastName}</p>
                                                                        {/* <span>{data.authorCourses}</span> */}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="course-price">
                                                                <p>{fee_validator(data.fees)}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className="course-content">
                                                        <h6 className="heading"><Link onClick={() => CourseDetails(data.courseId, data.tenantId)}>{data.courseName}</Link><p>{t('category')} : {data.catName}</p></h6>
                                                        <p className="desc" style={{ textAlign: "justify", textOverflow: "ellipsis", width: "300px", whiteSpace: "nowrap", overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: data.courseDescription }}></p>
                                                        <div className="course-face d-flex justify-content-between">
                                                            <div className="duration">
                                                                <p><i className="fas fa-clock"></i>{data.duration == 1825 ? "Unlimited" : data.duration} {t('days')}</p>
                                                            </div>
                                                            <div className="rating">
                                                                <ul className="list-unstyled list-inline">
                                                                    {
                                                                        getAvgRating.map((d) => {
                                                                            return (
                                                                                <>
                                                                                    {
                                                                                        1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 1 ?
                                                                                            <>
                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            </>
                                                                                            : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 1.1 || d.avgScore == 1.2 || d.avgScore == 1.3 || d.avgScore == 1.4 || d.avgScore == 1.5 || d.avgScore == 1.6 || d.avgScore == 1.7 || d.avgScore == 1.8 || d.avgScore == 1.9 ?
                                                                                                <>
                                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                </>

                                                                                                : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 2 ?
                                                                                                    <>
                                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    </>

                                                                                                    : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 2.1 || d.avgScore == 2.2 || d.avgScore == 2.3 || d.avgScore == 2.4 || d.avgScore == 2.5 || d.avgScore == 2.6 || d.avgScore == 2.7 || d.avgScore == 2.8 || d.avgScore == 2.9 ?
                                                                                                        <>
                                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                        </>
                                                                                                        : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 3 ?
                                                                                                            <>
                                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            </>
                                                                                                            : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 3.1 || d.avgScore == 3.2 || d.avgScore == 3.3 || d.avgScore == 3.4 || d.avgScore == 3.5 || d.avgScore == 3.6 || d.avgScore == 3.7 || d.avgScore == 3.8 || d.avgScore == 3.9 ?
                                                                                                                <>
                                                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                    <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                                </>
                                                                                                                : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 4 ?
                                                                                                                    <>
                                                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                    </>
                                                                                                                    : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 4.1 || d.avgScore == 4.2 || d.avgScore == 4.3 || d.avgScore == 4.4 || d.avgScore == 4.5 || d.avgScore == 4.6 || d.avgScore == 4.7 || d.avgScore == 4.8 || d.avgScore == 4.9 ?
                                                                                                                        <>
                                                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                                        </>
                                                                                                                        : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 5 ?
                                                                                                                            <>
                                                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                            </>
                                                                                                                            : null : null : null : null : null : null : null : null : null : null
                                                                                    }
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                            <div className="student">
                                                                <p><i className="fas fa-users"></i>{data.userCount == 0 ? null : data.userCount}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col> : null
                                    ))
                                }
                            </Row>
                        </Col>
                        <Col md="12" className="text-center">
                            <div className="viewall-btn" disabled={viewAllCourse.isLoading ? "true" : ""} onClick={() => viewAllCourseFunction()}>
                                <Link to={process.env.PUBLIC_URL + "/course-grid"}>{viewAllCourse.isLoading ? (<>{t('loading')} </>) : <>{t('view_all_courses')}</>}</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>

        // <Styles>
        //     {/* Course Area */}
        //     <section className="course-filter">
        //         <Container>
        //             <Row>
        //                 <Col md="12">
        //                     <div className="sec-title text-center">
        //                         <h4>{t('popular_courses')} </h4>
        //                     </div>
        //                 </Col>
        //                 <Col md="12">
        //                     <div className="filter-btns text-center">
        //                         <ul className="filter-btn-list list-unstyled list inline">
        //                             {/* <li data-target="*" className="active list-inline-item">All Courses</li>
        //                             <li data-target="desi" className="list-inline-item">Web Design</li>
        //                             <li data-target="deve" className="list-inline-item">Web Development</li>
        //                             <li data-target="seo" className="list-inline-item">Seo</li>
        //                             <li data-target="prog" className="list-inline-item">Programming</li> */}
        //                         </ul>
        //                     </div>
        //                     <Row className="filter-items">
        //                         {
        //                             json.splice(0, 6).map((data, i) => (
        //                                 <Col lg="4" md="6" key={data.courseId} data-id={data.targetId}>
        //                                     <div className="course-item">
        //                                         <Link onClick={() => CourseDetails(data.courseId, 1)}>
        //                                             <div className="course-image" style={{ backgroundImage: `url(${imageUrls(data.courseImage)})` }}>
        //                                                 <div className="author-img d-flex">
        //                                                     {/* <div className="img">
        //                                                         <img src={process.env.PUBLIC_URL + `/assets/images/${data.authorImg}`} alt="" />
        //                                                     </div>
        //                                                     <div className="title">
        //                                                         <p>{data.authorName}</p>
        //                                                         <span>{data.authorCourses}</span>
        //                                                     </div> */}
        //                                                 </div>
        //                                                 <div className="course-price">
        //                                                     <p>{fee_validator(data.fees)}</p>
        //                                                 </div>
        //                                             </div>
        //                                         </Link>
        //                                         <div className="course-content">
        //                                             <h6 className="heading"><Link onClick={() => CourseDetails(data.courseId, data.tenantId)}>{data.courseName}</Link><p>{t('category')} : {data.catName}</p></h6>
        //                                             <p className="desc" style={{ textAlign: "justify", textOverflow: "ellipsis", width: "300px", whiteSpace: "nowrap", overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: data.courseDescription }}></p>
        //                                             <div className="course-face d-flex justify-content-between">
        //                                                 <div className="duration">
        //                                                     <p><i className="fas fa-clock"></i>{data.duration == 1825 ? "Unlimited" : data.duration} {t('days')}</p>
        //                                                 </div>
        //                                                 <div className="rating">
        //                                                     <ul className="list-unstyled list-inline">
        //                                                         {
        //                                                             getAvgRating.map((d) => {
        //                                                                 return (
        //                                                                     <>
        //                                                                         {
        //                                                                             1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 1 ?
        //                                                                                 <>
        //                                                                                     <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                 </>
        //                                                                                 : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 1.1 || d.avgScore == 1.2 || d.avgScore == 1.3 || d.avgScore == 1.4 || d.avgScore == 1.5 || d.avgScore == 1.6 || d.avgScore == 1.7 || d.avgScore == 1.8 || d.avgScore == 1.9 ?
        //                                                                                     <>
        //                                                                                         <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                         <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                         <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
        //                                                                                     </>

        //                                                                                     : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 2 ?
        //                                                                                         <>
        //                                                                                             <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                             <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                             <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                         </>

        //                                                                                         : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 2.1 || d.avgScore == 2.2 || d.avgScore == 2.3 || d.avgScore == 2.4 || d.avgScore == 2.5 || d.avgScore == 2.6 || d.avgScore == 2.7 || d.avgScore == 2.8 || d.avgScore == 2.9 ?
        //                                                                                             <>
        //                                                                                                 <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                                 <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                 <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                 <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
        //                                                                                             </>
        //                                                                                             : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 3 ?
        //                                                                                                 <>
        //                                                                                                     <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                 </>
        //                                                                                                 : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 3.1 || d.avgScore == 3.2 || d.avgScore == 3.3 || d.avgScore == 3.4 || d.avgScore == 3.5 || d.avgScore == 3.6 || d.avgScore == 3.7 || d.avgScore == 3.8 || d.avgScore == 3.9 ?
        //                                                                                                     <>
        //                                                                                                         <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                                         <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                         <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                         <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                         <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
        //                                                                                                     </>
        //                                                                                                     : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 4 ?
        //                                                                                                         <>
        //                                                                                                             <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                                             <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                             <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                             <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                             <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                         </>
        //                                                                                                         : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 4.1 || d.avgScore == 4.2 || d.avgScore == 4.3 || d.avgScore == 4.4 || d.avgScore == 4.5 || d.avgScore == 4.6 || d.avgScore == 4.7 || d.avgScore == 4.8 || d.avgScore == 4.9 ?
        //                                                                                                             <>
        //                                                                                                                 <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                                                 <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                 <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                 <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                 <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                 <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
        //                                                                                                             </>
        //                                                                                                             : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 5 ?
        //                                                                                                                 <>
        //                                                                                                                     <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
        //                                                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                     <li className="list-inline-item"><i className="las la-star"></i></li>
        //                                                                                                                 </>
        //                                                                                                                 : null : null : null : null : null : null : null : null : null : null
        //                                                                         }
        //                                                                     </>
        //                                                                 )
        //                                                             })
        //                                                         }
        //                                                     </ul>
        //                                                 </div>
        //                                                 <div className="student">
        //                                                     <p><i className="fas fa-users"></i>{data.userCount == 0 ? null : data.userCount}</p>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </Col>
        //                             ))
        //                         }
        //                     </Row>
        //                 </Col>
        //                 <Col md="12" className="text-center">
        //                     <div className="viewall-btn">
        //                         <Link to={process.env.PUBLIC_URL + "/course-grid"}>{t('view_all_courses')}</Link>
        //                     </div>
        //                 </Col>
        //             </Row>
        //         </Container>
        //     </section>
        // </Styles>
    )
}

export default CourseFilter
