import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, OverlayTrigger, Tooltip, TabPane, Dropdown, NavDropdown } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/libraryDetails.js';
import { Styles1 } from './styles/reviewForm.js';
import service from '../../services/service';
import UserService from '../../services/UserService';
import ReplyForm, { Replyform } from './components/ReplyForm';
import UpdateReviewform from './components/UpdateReviewForm';
import { Styles2 } from '../courses/styles/courseAccordian.js';
import { useHistory } from 'react-router-dom';
import RenderOnAuthenticated from '../account/RenderOnAuthenticated';
import RenderOnAnonymous from '../account/RenderOnAnonymous';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import Modal1 from "react-modal";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DataTableAssessment from '../assessment/DataTableAssessment';
import DiscussionMain from '../discussion/DiscussionMain';
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { Spinner } from 'react-bootstrap';
import CourseFeedback from '../account/CourseFeedback';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import AssignmentMain from '../assignment/AssignmentMain';
import { FacebookIcon, FacebookShareButton, LinkedinShareButton, TwitterIcon, TwitterShareButton, LinkedinIcon, WhatsappIcon, WhatsappShareButton } from 'react-share';
import DiscussionMain1 from '../discussion/DiscussionMain1';
import Timer from 'react-compound-timer';
import learnerService from '../../services/learnerService';
import instructorService from '../../services/instructorService';
import Videojs from '../../pages/instructor/instCourses/video'
import ModalVideo from 'react-modal-video';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import EnrolledAssignment from './enrolledAssignment/EnrolledAssignment'
import moment from 'moment';
import { colors } from "../../components/common/element/elements.js";
import Query from '../courses/Query/Query';
import ReactPaginate from 'react-paginate';
import Search from '../../components/common/Search';
import CourseSearch from './components/CourseSearch';
import ViewPdf from "../../pages/instructor/ViewPdf.js";
import CryptoJS from "crypto-js";

const customStyles = {
    title: {
        style: {
            fontColor: 'red',
            fontWeight: '900',
        }
    },
    headCells: {
        style: {
            fontSize: '17px',
            fontWeight: '500',
            paddingLeft: '0 8px',
            marginLeft: '10px',
        },
    },
    cells: {
        style: {
            fontSize: '15px',
            // paddingLeft: '0 8px',
            // marginLeft: '10px'
        },
    },
};

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



function LibraryDetails(props) {

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
    Modal1.setAppElement('*');
    const history = useHistory();

    const decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 32))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    }

    let userId = UserService.getUserid();
    let sessionId = UserService.getSessionId();
    let courseID = props.match.params.id;
    let tenantID = props.match.params.tid;
    let hashcode = tenantID.substring(0, 10);
    const myDecipher = decipher(`${hashcode}`);
    let CID = courseID.substring(10);
    let TID = tenantID.substring(10);
    let courseId = myDecipher(`${CID}`);
    let tenantId = myDecipher(`${TID}`);
    // let courseId = courseID.substring(10);
    // let tenantId = tenantID.substring(10);;
    // //console.log("tenantId in course details file" + tenantId);
    const um_api = UserService.USER_API;
    ////console.log(um_api);
    const dms_url = instructorService.DMS_URL;
    ////console.log(dms_url);


    const [libraryName, setLibraryName] = useState(false)

    //scrolling 
    const scrollWin = () => {
        document.getElementById('Tab').scrollIntoView({ behavior: 'smooth' })
        //window.scrollTo(0, 290);
    }

    const [contentData, setContentData] = useState([]);
    const [getUrl, setUrl] = useState('')
    const [getContentType, setContentType] = useState('');
    const [getContentLabel, setContentLabel] = useState('');
    const [urlModal, setUrlModal] = useState(false);
    let value = useSelector(state => state.inputValue);
    const [pageNumber, setPageNumber] = useState(0);
    const [viewCount, setViewCount] = useState([]);

      

    const onClickViewContent = (fileUrl, contentType, contentlabel, id) => {
        // setUrl();
        setContentType();
        setUrlModal(false);
        instructorService.getContentAccess(fileUrl).then((resp) => {
            ////console.log('resp.data----', resp.data);
            if (contentType === "pdf") {
                // This encodes the Actual URL
                const encrypted = CryptoJS.AES.encrypt(
                    "/" + resp.data,
                    "cdac@123"
                ).toString();
                const safeEncodedString = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

                const pdfDomain = "10.244.3.218:8080"
                const finalSubDomain = pdfDomain + "/" + safeEncodedString

                // console.log("finalSubDomain", finalSubDomain)

                setUrl(finalSubDomain);
            } else {
                setUrl(resp.data);
            }
            setContentType(contentType);
            setContentLabel(contentlabel);
            setUrlModal(true);
            service.saveContentVisit(userId, courseId, id, contentlabel, sessionId, contentType);
        }).catch((err) => {
            //console.log(err);
        })
        ////console.log(getUrl + "FILE PATH   ")

    }

    const [search, setSearch] = useState();
    let currentCourseState;
    if (value) {
        let data = contentData.filter((course) =>
            course.label.toLowerCase().includes(value)
        )
        currentCourseState = data.slice(0, 1000);
    } else {
        currentCourseState = contentData.slice(0, 1000);
    }

    useEffect(() => {
        getContentList();
        getViewCount();
    }, [])

    const getContentList = () => {
        // instructorService.getLibraryContent(courseId).then((resp) => {
        //     //console.log(resp.data)
        //     setContentData(resp.data.nodes[0].nodes)
        // }).catch((err) => {
        //     //console.log(err)
        // })
        learnerService.getLibraryStructureById(courseId).then((resp) => {
            //console.log("getLibraryStructureById",resp.data);
            setContentData(resp.data.nodes[0].nodes)
            setLibraryName(resp.data);
        }).catch((err) => {
            //console.log(err)
        })
    }

    const getViewCount = () => {
        //console.log(courseId);
        service.getCourseViewCount(courseId).then((res) =>{
            //console.log(res.data);
            setViewCount(res.data)
        })
    }



    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(currentCourseState.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };




    const videoJsOptions = {
        autoplay: false,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        width: 1100,
        height: 800,
        controls: true,
        sources: [
            {
                src: `http://10.244.3.218:8080/${getUrl}`,
                type: 'video/mp4',
            },
        ]
    };

    const handleContentout = () => {

        service.updateContentVisitOutTime(userId, sessionId);
    }


    return (
        <div className="main-wrapper course-details-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            < HeaderTwo />

            {/* Breadcroumb */}
            {/* < BreadcrumbBox title="Course Details" bannerUrl={`http://10.244.3.218:8082/${courseValue.banner}`} /> */}
            < BreadcrumbBox title={libraryName.label} />
            <br />
            <br />
            <div id="Tab">

                {
                    UserService.hasRole(['learner'])
                        ?
                        <>
                            {
                                currentCourseState.length === 0
                                    ?
                                    <>
                                        <div class="d-flex justify-content-center" >
                                            <h3 >{t('no_content_available')}</h3>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <CourseSearch name={"Search Content"} />
                                        <br />
                                        <div className="row">
                                            <Styles>
                                                <Row>
                                                    {
                                                        currentCourseState.slice(pagesVisited, pagesVisited + usersPerPage).map((content, i) => {
                                                            return (
                                                                <>
                                                                    {/* <Col lg="4" md="12" key={i}> */}
                                                                    <Row>
                                                                        <div className='container-fluid d-flex justify-content-center'>
                                                                            <div className='row'>
                                                                                <div className='col-sm-12 col-xs-12 col-lg-3 col-xl-3 col-md-3'>
                                                                                    <div className='card text-center shadow'>
                                                                                        <div className='overflow'>
                                                                                            {
                                                                                                content.nodetype === "pdf"
                                                                                                    ?
                                                                                                    <>
                                                                                                        <img src={process.env.PUBLIC_URL + "/assets/images/pdf.png"} alt="" className='card-img-top' style={{ height: "100%", width: "50%", padding: "5px" }} />
                                                                                                    </>
                                                                                                    :
                                                                                                    content.nodetype === "jpg" || content.nodetype === "jpeg"
                                                                                                        ?
                                                                                                        <img src={process.env.PUBLIC_URL + "/assets/images/JPEGImage.png"} alt="" className='card-img-top' style={{ height: "100%", width: "50%", padding: "5px" }} />
                                                                                                        :
                                                                                                        content.nodetype === "mp4"
                                                                                                            ?
                                                                                                            <img src={process.env.PUBLIC_URL + "/assets/images/VideoFileImage.png"} alt="" className='card-img-top' style={{ height: "100%", width: "50%", padding: "5px" }} />
                                                                                                            :
                                                                                                            content.nodetype === "zip"
                                                                                                                ?
                                                                                                                <img src={process.env.PUBLIC_URL + "/assets/images/zipFileImage.png"} alt="" className='card-img-top' style={{ height: "100%", width: "50%", padding: "5px" }} />
                                                                                                                :
                                                                                                                <img src={process.env.PUBLIC_URL + "/assets/images/FileImage.png"} alt="" className='card-img-top' style={{ height: "100%", width: "50%", padding: "5px" }} />

                                                                                            }
                                                                                        </div>
                                                                                        <div className='card-body text-dark'>
                                                                                            <h4 className='card-title' style={{ fontFamily: "serif", fontWeight: "bold" }}>{content.label}</h4>
                                                                                            <p className='card-text text-secondary'>
                                                                                                <div>
                                                                                                    <Button variant="success" style={{ marginRight: "10px" }} onClick={() => { onClickViewContent(content.filePath, content.nodetype, content.label, content.id) }} >{t('view')}</Button>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <p style={{ float: "right", marginRight: "20px" }}><i className="fas fa-eye"></i> {viewCount?.length == 0 ? 0 : viewCount?.map(item => {if(item.resId === content.key){return(<>{item.count}</>)}})} </p>
                                                                                                </div>

                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Row>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </Row>


                                            </Styles>
                                        </div>
                                    </>
                            }
                        </>
                        :
                        <>
                            {UserService.doLogin()}
                        </>
                }
            </div>
            <div style={{ marginTop: "50px" }}>
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







            {/* ContentView model code start here*/}
            <Modal
                size="xl" centered show={urlModal} onHide={() => { setUrlModal(false); handleContentout(); }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {getContentType === "zip" ? <i class="fas fa-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                            : getContentType === "pdf" ? <div><i class="fas fa-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}>{` ${getContentLabel.toUpperCase()}`}</i></div>
                                : getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <i class="fas fa-file-image" style={{ fontSize: "25px", color: "#b2b1ff" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                    : getContentType === "html" ? <i class="fab fa-html5" style={{ fontSize: "25px", color: "#e54c21" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                        : getContentType === "ogg" || getContentType === "webm" || getContentType === "mp4" ? <i class="fas fa-file-video" style={{ fontSize: "25px", color: "#8cee02" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                            : getContentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                                : getContentType === "doc" || getContentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                                    : getContentType === "scorm" ? <i class="far fa-file-archive" style={{ fontSize: "25px", color: "green" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                                        : getContentType === "youtube" ? <i class="fab fa-youtube" style={{ fontSize: "25px", color: "green" }}>{` ${getContentLabel.toUpperCase()}`}</i>
                                                            : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <img src={`http://10.244.3.218:8080/${getUrl}`} width="1100" height="800" />
                            : getContentType === "pdf" ? (
                                <div>
                                    {" "}
                                    <ViewPdf
                                        pdfUrl={`http://meghs1.hyderabad.cdac.in/pdfViewer/${getUrl}`}
                                    />
                                </div>
                            )
                                : getContentType === "mp4" ? <div> <Videojs {...videoJsOptions} /></div>
                                    : getContentType === "docx" ? <iframe width="100%" height="100%" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                        : getContentType === "html" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                            : getContentType === "zip" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                                : getContentType === "scorm" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                                                    : getContentType === "youtube" ? <ReactPlayer url={getUrl} width="100%" height="800px" controls="true"
                                                        config={{
                                                            youtube: {
                                                                playerVars: { showinfo: 1 }
                                                            }
                                                        }}
                                                    />

                                                        : <p>{t('no_content_available')}</p>
                    }
                </Modal.Body>
                {/* <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={123} /> */}
            </Modal>
            {/* ContentView model code end here*/}



            {/* Footer 2 */}
            <FooterTwo />

        </div >
    )
}

export default LibraryDetails;



