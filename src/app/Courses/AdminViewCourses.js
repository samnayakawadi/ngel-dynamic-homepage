import React, { useEffect, useState } from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import instructorService from '../../services/instructorService';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import { Styles } from './styles/course.js'
import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/UserService';
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
function AdminViewCourses(props) {

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

    const [postsPerPage] = useState(10);
    const [getCourseData, setCourseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    

    const imageUrls = (url) => {
        if (url == null) {
            return '';
        } else {
            let imagepath = url.replace(/\\/g, "\\\\");
            let imageurl = `http://10.244.3.218:8082/${imagepath}`;
            return imageurl;
        }

    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentCourseState = getCourseData.slice(0, 1000);


    // Change page
    //const paginate = pageNumber => setCurrentPage(pageNumber);
    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(currentCourseState.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const [submitHandlerLoading, setSubmitHandlerLoading] = useState({
        isLoading: false
    })

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

    const submitHandler = (courseId) => {
        setSubmitHandlerLoading({ isLoading: true });
        CourseDetails(courseId, 1);
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
        // history.push(`${process.env.PUBLIC_URL + "/admin-course-details/"}${rNumber}${cid}/${result}${tId}`);

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

        history.push(`${process.env.PUBLIC_URL + "/admin-course-details/"}${safeEncodedCourseId}/${safeEncodedTenantId}`);

    }
    useEffect(() => {
        
        courseData();
    }, [])
    const courseData = async () => {
        try {
            let result = await instructorService.getAllCourses()
            setCourseData(result.data);
        } catch (e) {
            //console.log(e);
        }
    }

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
                                <h3 className="page-title">
                                    {t('courses')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('courses')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('view_courses')}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className='card'>
                                <div className="row">
                                    {currentCourseState.slice(pagesVisited, pagesVisited + usersPerPage).map((data, i) => {
                                        return (
                                            <Styles>
                                                <div className='container-fluid d-flex justify-content-center'>
                                                    <div className='row'>
                                                        <div className='col-md-12'>
                                                            <div className='card text-center shadow'>
                                                                <div className='overflow'>
                                                                    <img src={imageUrls(data.imageUrl)} alt="" className='card-img-top' />
                                                                </div>
                                                                <div className='card-body text-dark'>
                                                                    <h4 className='card-title'>{data.courseName}</h4>
                                                                    <p className='card-text text-secondary'>
                                                                        {/* <a href='#' className='btn btn-outline-success'>View Learner</a> */}

                                                                        <a href='#' className='btn btn-success' onClick={() => submitHandler(data.courseId)} style={{ background: "green" }} disabled={submitHandlerLoading.isLoading ? "true" : ""} > {submitHandlerLoading.isLoading ? (<>{t('loading')}</>) : (<>{t('course_details')}</>)}</a>

                                                                    </p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Styles>
                                        )
                                    })}
                                </div>
                                <br></br>
                                <br></br>
                                <div className='pagination-container'>
                                    {currentCourseState.length == 0 ? null :
                                        <Col md="12" className="text-center">
                                            <ReactPaginate
                                                previousLabel={t('previous')}
                                                nextLabel={t('next')}
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
                                </div>
                            </div>
                        </div>
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>

    );
}

export default AdminViewCourses;