import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ScrollToTop from './helper/ScrollToTop';
import { GlobalStyle } from "./components/common/styles/global.js";
import HomeOne from './HomeOne';
import HomeTwo from './HomeTwo';
import About from './pages/about/About';
import CourseGrid from './pages/courses/CourseGrid';
import CourseList from './pages/courses/CourseList';
import CourseDetails from './pages/courses/CourseDetails';
import Instructor from './pages/instructor/Instructors';
import InstructorDetails from './pages/instructor/InstructorDetails';
import Gallery from './pages/gallery/Gallery';
import Events from './pages/events/Events';
import EventDetails from './pages/events/EventsDetails';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import Contact from './pages/contact/Contact';
import Faq from './pages/faq/Faq';
import PageNotFound from './pages/404/PageNotFound';
import ComingSoon from './pages/comingsoon/ComingSoon';
import BlogClassic from './pages/blog/BlogClassic';
import BlogGrid from './pages/blog/BlogGrid';
import BlogDetails from './pages/blog/BlogDetails';
import Product from './pages/shop/Products';
import ProductDetails from './pages/shop/ProductDetails';
import Cart from './pages/shop/Cart';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import userProfile from './components/User/userProfile'
import Feedback from './pages/account/Feedback';
import UserGrid from './pages/courses/UserCourseGrid';
import UserList from './pages/courses/UserCourseList';
import RenderOnRole from './pages/account/RenderOnRole'
import AddTestimonial from './pages/account/AddTestimonial';
import Dashborad from './pages/dashboard/dashborad';
import AddCourseCategory from './pages/instructor/AddCourseCategory';
import CreateCourse from './pages/instructor/CourseCreate';
import ViewCourses from './pages/instructor/instCourses/ViewCourses';
import InstCourseDetails from './pages/instructor/instCourses/InstCourseDetails';
import CourseStructureDrive from './pages/instructor/instCourses/CourseStructureDrive';
import UpdateCourse from './pages/instructor/UpdateCourse';
import LearnerListToApprove from './app/basic-ui/LearnerListToApprove';
import LearnerListtoApproveForCourse from './app/Courses/LearnerListtoApproveForCourse';
import AdminCourseDetail from './app/Courses/AdminCourseDetail';

import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';

import ThemeSelector from './theme/ThemeSelector';

import Dialog from './theme/Dialog';
import CreateThemeContent from './theme/CreateThemeContent';
import Setting from './components/common/Setting';
import CertificateVerificatonpage from './pages/404/CertificateVerificatonpage';


// import Buttons from './app/basic-ui/Buttons';
// import Dropdowns from './app/basic-ui/Dropdowns';
// import Typography from './app/basic-ui/Typography';
// import BasicElements from './app/form-elements/BasicElements';
// import BasicTable from './app/tables/BasicTable';
// import Mdi from './app/icons/Mdi';
// import ChartJs from './app/charts/ChartJs';
// import LockScreen from './app/user-pages/Lockscreen';
// import Error500 from './app/error-pages/Error500';
// import Error404 from './app/error-pages/Error404';
// import BlankPage from './app/general-pages/BlankPage';
import Dashboard from './app/dashboard/Dashboard';
import AdminDashBoard from './app/AdminDashBoard';
import Spinner from './app/shared/Spinner';
import RenderOnAdmin from './pages/account/RenderOnAdmin';
import AdminViewCourses from './app/Courses/AdminViewCourses';
import LearnersData from './app/basic-ui/LearnersData';

import Menu from './pages/instructor/menu';
import Testimonials from './app/basic-ui/Testimonials';
import ContentDelivery from './pages/courses/contentdelivery/menubar/ContentDelivery';
import BulkUserRegistration from './app/basic-ui/BulkUserRegistration';
import RequestForInstructor from './app/basic-ui/RequestForInstructor';
import GeneralAnnouncement from './app/basic-ui/GeneralAnnouncement';
import GeneralFeedbackMaster from './app/basic-ui/GeneralFeedbackMaster';
import AdminViewCourseDetails from './app/Courses/AdminViewCourseDetails';
import CourseAnalyticsReports from './app/basic-ui/CourseAnalyticsReports';
import MailConfigureSetting from './app/basic-ui/MailConfigureSetting';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import InstructorsData from './app/basic-ui/InstructorsData';
import UserService from './services/UserService';
import ContactWebsiteMessage from './app/basic-ui/ContactWebsiteMessage';
import { Modal } from 'react-bootstrap';
import { IdleTimerProvider } from 'react-idle-timer';
import SessionExpire from './pages/404/SessionExpire';
import Payment from './pages/courses/payment/Payment';
import EventHandling from './app/basic-ui/EventHandling';
import CoursePaymentDetails from './app/basic-ui/CoursePaymentDetails';
import TokenActivatePage from './pages/404/TokenActivatePage';

import CourseListDetails from './app/CourseListDetails';
import InstructorCourseList from './app/basic-ui/InstructorCourseList';
import CourseWiseLearnerList from './app/Courses/CourseWiseLearnerList';
import ManageCadre from './app/basic-ui/ManageCadre';
import ManageDesignation from './app/basic-ui/ManageDesignation';
import ManageQualification from './app/basic-ui/ManageQualification';

import libraryContent from './components/library/libraryContent';
import CoursesToPublish from './app/Courses/CoursesToPublish';
import CreateLibrary from './components/library/CreateLibrary';
import ViewLibrary from './components/library/ViewLibrary';
import InstLibraryDetails from './components/library/InstLibraryDetails';
import LibraryToPublish from './components/library/LibraryToPublish';
import AdminLibraryDetails from './app/Courses/AdminLibraryDetails';
import AdminViewLibrary from './components/library/AdminViewLibrary';
import AdminViewAllLibrary from './components/library/AdminViewAllLibrary';

import AdminViewLibraryContent from './components/library/AdminViewLibraryContent';
import LibraryDetails from './pages/courses/LibraryDetails';
import axios from 'axios';
import "../src/assets/css/all.css";
import "../src/assets/css/line-awesome.min.css";
import "../src/assets/css/swiper.min.css";
import "../src/assets/css/font-awesome.min.css";
import Logout from './pages/logout/Logout';
import { GlobalContext } from './context/GlobalContext';
import { DynamicContext } from './context/DynamicContext';
import { ValidationContext } from './context/ValidationContext';
import GlobalContextState from './context/states/GlobalContextState';
import DynamicContextState from './context/states/DynamicContextState';
import ValidationState from './context/states/ValidationState';
import GlobalComponents from './dynamicHomePage/Global/GlobalComponents';
// import GlobalComponents from './dynamicHomePage/Global/GlobalComponents';
// import { Document, Page, pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App({ store, history }) {

    const { defaultDynamicContextState, dynamicContextState, setDynamicContextState } = DynamicContextState()
    const { globalContextState, setGlobalContextState, defaultGlobalContextState } = GlobalContextState()
    const { defaultValidationState, validationState, setValidationState } = ValidationState()

    // useEffect(() => {
    //     UserService.generateToken();
    //    }, []);

    //const nav = useRouteMatch();
    useEffect(() => {
        // UserService.updateToken();
        // UserService.refreshToken();
        if (UserService.getToken() !== undefined) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${UserService.getToken()}`;

            // axios.defaults.headers.common["Origin"] = "http://meghs1.hyderabad.cdac.in"

            // globalContextState.server.originServer
        }

        // axios.defaults.headers.common["Origin"] = "http://meghs1.hyderabad.cdac.in"
    }, []);


    const [checkIdle, setCheckIdle] = useState(false)
    //const [timer, setTimer] = useState(1 * 1000);
    //let timer = 5*1000
    //const loc = useLocation();
    const clickOnOK = () => {
        UserService.doLogout();
        //console.log("token Expire")
        //nav(`${process.env.PUBLIC_URL + "/"}`)
    }
    const clickOnLoginAgain = () => {
        UserService.doLogout();
        //console.log("token Expire");


    }
    const onIdle = () => {
        ////console.log("ABCD")
        // if (!UserService.isLoggedIn()) {
        //     setCheckIdle(true);
        // }
        setCheckIdle(true);
    }


    // const { theme, themeLoaded, getFonts } = useTheme();
    // const [selectedTheme, setSelectedTheme] = useState(theme);
    // const [showDialog, setShowDialog] = useState(false);
    // const [newTheme, setNewTheme] = useState();

    // useEffect(() => {
    //     WebFont.load({
    //         google: {
    //             families: getFonts()
    //         }
    //     });
    // });

    // useEffect(() => {
    //     setSelectedTheme(theme);
    // }, [themeLoaded]);

    // const manageDialog = () => {
    //     setShowDialog(!showDialog);
    // }

    // const createTheme = newTheme => {
    //     //console.log(newTheme);
    //     setShowDialog(false);
    //     setNewTheme(newTheme);
    // }


    return (
        <Provider store={store}>
            <GlobalContext.Provider value={{ defaultGlobalContextState, globalContextState, setGlobalContextState }}>
                <DynamicContext.Provider value={{ defaultDynamicContextState, dynamicContextState, setDynamicContextState }}>
                    <ValidationContext.Provider value={{ defaultValidationState, validationState, setValidationState }}>
                        <GlobalComponents />
                        <Router history={history}>
                            <GlobalStyle />
                            <ScrollToTop />
                            <Suspense fallback={<Spinner />}>
                                {/* <button onClick={() => { UserService.updateToken()}} >  Check  </button> */}
                                <Route>
                                    <Switch>
                                        <Route path={`${process.env.PUBLIC_URL + "/logoutFromAllApps"}`} component={Logout} />
                                    </Switch>
                                </Route>
                                <Route>
                                    {
                                        (!UserService.hasRole(['admin']) && !UserService.hasRole(['instructor']) && !UserService.hasRole(['learner']))
                                            ?
                                            <> {/* IF CONDITION NON OF THEM IS LOGIN */}
                                                <Switch>
                                                    <Route path={`${process.env.PUBLIC_URL + "/logoutFromAllApps"}`} component={Logout} />
                                                    <Route exact path={`${process.env.PUBLIC_URL + "/"}`} component={HomeOne} />
                                                    <Route exact path={`${process.env.PUBLIC_URL + "/arcane/:arcane"}`} component={HomeOne} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/about"}`} component={About} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/course-grid"}`} component={CourseGrid} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/course-list"}`} component={CourseList} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/user-grid"}`} component={UserGrid} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/user-list"}`} component={UserList} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/course-details/:id/:tid"}`} component={CourseDetails} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/library-details/:id/:tid"}`} component={LibraryDetails} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/login"}`} component={Login} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/registration"}`} component={Register} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/contact"}`} component={Contact} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/faq"}`} component={Faq} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/activate"}`} component={TokenActivatePage} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/library-content"}`} component={libraryContent} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/certificates/verifycertificate"}`} component={CertificateVerificatonpage} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/*"}`} component={PageNotFound} />
                                                </Switch>
                                            </>
                                            :
                                            <>  {/* INSTRUCTOR OR ADMIN both are learner but learner is individual*/}

                                                {/* <IdleTimerProvider timeout={2 * 1000} onIdle={onIdle} > */}
                                                <Switch>
                                                    <Route path={`${process.env.PUBLIC_URL + "/logoutFromAllApps"}`} component={Logout} />
                                                    <Route exact path={`${process.env.PUBLIC_URL + "/"}`} component={HomeOne} />
                                                    <Route exact path={`${process.env.PUBLIC_URL + "/arcane/:arcane"}`} component={HomeOne} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/about"}`} component={About} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/course-grid"}`} component={CourseGrid} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/course-list"}`} component={CourseList} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/user-grid"}`} component={UserGrid} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/user-list"}`} component={UserList} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/course-details/:id/:tid"}`} component={CourseDetails} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/library-details/:id/:tid"}`} component={LibraryDetails} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/login"}`} component={Login} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/registration"}`} component={Register} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/contact"}`} component={Contact} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/faq"}`} component={Faq} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/ContentDelivery/:id/:tid"}`} component={ContentDelivery} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/dashboard"}`} component={Dashborad} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/products"}`} component={Product} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/product-details"}`} component={ProductDetails} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/cart"}`} component={Cart} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/getfeedback"}`} component={Feedback} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/userProfile/:id"}`} component={userProfile} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/addTestimonial"}`} component={AddTestimonial} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/Payment/:courseId/:tenantId/:orderId"}`} component={Payment} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/certificates/verifycertificate"}`} component={CertificateVerificatonpage} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/library-content"}`} component={libraryContent} />


                                                    {
                                                        (UserService.hasRole(['admin'])) ?
                                                            <>
                                                                <Switch>
                                                                    <Route path={`${process.env.PUBLIC_URL + "/AdminDashBoard"}`} component={AdminDashBoard} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/courses/view-courses"}`} component={AdminViewCourses} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/courses/course-details/:id"}`} component={AdminViewCourseDetails} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/library/view-content/:id"}`} component={AdminViewLibraryContent} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/users/view-learners"}`} component={LearnersData} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/users/view-instructors"}`} component={InstructorsData} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/users/view-request-instructors"}`} component={RequestForInstructor} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/testimonials/view-testimonials"}`} component={Testimonials} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/User/Bulk-User-Registration"}`} component={BulkUserRegistration} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/Announcement/General-Announcement"}`} component={GeneralAnnouncement} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/Feedback-Master"}`} component={GeneralFeedbackMaster} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/Announcement/event-handling"}`} component={EventHandling} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/Course-Analytics-Report"}`} component={CourseAnalyticsReports} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/mail-configure-settings"}`} component={MailConfigureSetting} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/contact-website-message"}`} component={ContactWebsiteMessage} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/course-Payment-Details"}`} component={CoursePaymentDetails} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/Course-Details-List"}`} component={CourseListDetails} />

                                                                    <Route path={`${process.env.PUBLIC_URL + "/manage-cadre"}`} component={ManageCadre} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/manage-designation"}`} component={ManageDesignation} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/manage-qualification"}`} component={ManageQualification} />

                                                                    <Route path={`${process.env.PUBLIC_URL + "/InstructorCourseList"}`} component={InstructorCourseList} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/courses/coursewise-learnerlist"}`} component={CourseWiseLearnerList} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/users/view-request-learner"}`} component={LearnerListToApprove} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/library-content"}`} component={libraryContent} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/courses/courses-to-publish"}`} component={CoursesToPublish} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/library/library-to-publish"}`} component={LibraryToPublish} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/library/view-all-library"}`} component={AdminViewAllLibrary} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/admin-course-details/:id/:tid"}`} component={AdminCourseDetail} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/instLibraryDetails/:id/:tid"}`} component={AdminViewLibrary} />
                                                                    {/* <Route path={`${process.env.PUBLIC_URL + "/admin-library-details/:id/:tid"}`} component={AdminLibraryDetails} /> */}
                                                                    <Route path={`${process.env.PUBLIC_URL + "/ContentDelivery/:id/:tid"}`} component={ContentDelivery} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "/courses/view-request-learner-for-course"}`} component={LearnerListtoApproveForCourse} />
                                                                    <Route path={`${process.env.PUBLIC_URL + "*"}`} component={PageNotFound} />
                                                                </Switch>
                                                            </>
                                                            :
                                                            <>
                                                                {
                                                                    (UserService.hasRole(['instructor'])) ?
                                                                        <>
                                                                            <Switch>
                                                                                <Route path={`${process.env.PUBLIC_URL + "/instructor-dashboard"}`} component={InstructorDashboard} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/add-course-category"}`} component={AddCourseCategory} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/CreateCourse"}`} component={CreateCourse} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/UpdateCourse/:cId"}`} component={UpdateCourse} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/ViewCourses"}`} component={ViewCourses} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/inst-course-details/:cId"}`} component={InstCourseDetails} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/CourseStructureDrive"}`} component={CourseStructureDrive} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/library-content"}`} component={libraryContent} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/instLibraryDetails/:cId"}`} component={InstLibraryDetails} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/create-library"}`} component={CreateLibrary} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "/view-library"}`} component={ViewLibrary} />
                                                                                <Route path={`${process.env.PUBLIC_URL + "*"}`} component={PageNotFound} />
                                                                            </Switch>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Route path={`${process.env.PUBLIC_URL + "*"}`} component={PageNotFound} />
                                                                        </>
                                                                }
                                                            </>
                                                    }
                                                </Switch>
                                                {/* </IdleTimerProvider> */}
                                            </>
                                    }
                                    <>
                                        {/* <Modal show={checkIdle}>
                                    <Modal.Header>
                                        <Modal.Title>
                                            SORRY
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h6>Your Session Has Been Expire </h6>
                                        <p>Please Click On OK to Redirect To Home Page</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <a href={`${process.env.PUBLIC_URL + "/"}`} class="btn btn-primary" style={{border:'0px'}} onClick={clickOnOK}><button> HOME </button></a>
                                        <a href="http://ngel.hyderabad.cdac.in:8080/realms/ngel/protocol/openid-connect/auth?client_id=reactclient&redirect_uri=http%3A%2F%2F10.244.1.190%3A3000%2F&state=b32c2e8a-7375-4782-b009-030f2afb0b98&response_mode=fragment&response_type=code&scope=openid&nonce=4326f3f5-dbc6-4c02-8ef9-82db0d915d31&code_challenge=HQWmNfpPbM6ECMVBDT_aii4x9hNtpxJVOziigqE6Umc&code_challenge_method=S256" class="btn btn-outline-primary" onClick={clickOnLoginAgain}><button> Login Again </button></a>
                                    </Modal.Footer>
                                </Modal> */}
                                    </>






                                    {/* <RenderOnRole roles={["admin"]}>
                                                <Switch>
                                                    <Route path={`${process.env.PUBLIC_URL + "/AdminDashBoard"}`} component={AdminDashBoard} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/courses/view-courses"}`} component={AdminViewCourses} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/courses/course-details/:id"}`} component={AdminViewCourseDetails} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/users/view-learners"}`} component={LearnersData} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/users/view-instructors"}`} component={InstructorsData} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/users/view-request-instructors"}`} component={RequestForInstructor} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/testimonials/view-testimonials"}`} component={Testimonials} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/User/Bulk-User-Registration"}`} component={BulkUserRegistration} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/Announcement/General-Announcement"}`} component={GeneralAnnouncement} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/Feedback-Master"}`} component={GeneralFeedbackMaster} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/Course-Analytics-Report"}`} component={CourseAnalyticsReports} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/mail-configure-settings"}`} component={MailConfigureSetting} />
                                                </Switch>
                                            </RenderOnRole>

                                            <RenderOnRole roles={["instructor"]}>
                                                
                                                    <Route path={`${process.env.PUBLIC_URL + "/instructor-dashboard"}`} component={InstructorDashboard} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/add-course-category"}`} component={AddCourseCategory} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/CreateCourse"}`} component={CreateCourse} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/UpdateCourse/:cId"}`} component={UpdateCourse} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/ViewCourses"}`} component={ViewCourses} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/inst-course-details/:cId"}`} component={InstCourseDetails} />
                                                    <Route path={`${process.env.PUBLIC_URL + "/CourseStructureDrive"}`} component={CourseStructureDrive} />
                                                    <Route path={`${process.env.PUBLIC_URL + "*"}`} component={PageNotFound} /> 
                                                
                                            </RenderOnRole> */}



































                                    {/* <Route exact path={`${process.env.PUBLIC_URL + "/"}`} component={HomeOne} />
                            <Route path={`${process.env.PUBLIC_URL + "/home-two"}`} component={HomeTwo} />
                            <Route path={`${process.env.PUBLIC_URL + "/about"}`} component={About} />
                            <Route path={`${process.env.PUBLIC_URL + "/course-grid"}`} component={CourseGrid} />
                            <Route path={`${process.env.PUBLIC_URL + "/course-list"}`} component={CourseList} />
                            <Route path={`${process.env.PUBLIC_URL + "/user-grid"}`} component={UserGrid} />
                            <Route path={`${process.env.PUBLIC_URL + "/user-list"}`} component={UserList} />
                            <Route path={`${process.env.PUBLIC_URL + "/course-details/:id/:tid"}`} component={CourseDetails} />
                            <Route path={`${process.env.PUBLIC_URL + "/instructor"}`} component={Instructor} />
                            <Route path={`${process.env.PUBLIC_URL + "/instructor-details/:id"}`} component={InstructorDetails} />
                            <Route path={`${process.env.PUBLIC_URL + "/gallery"}`} component={Gallery} />
                            <Route path={`${process.env.PUBLIC_URL + "/events"}`} component={Events} />
                            <Route path={`${process.env.PUBLIC_URL + "/event-details"}`} component={EventDetails} />
                            <Route path={`${process.env.PUBLIC_URL + "/dashboard"}`} component={Dashborad} />
                            <Route path={`${process.env.PUBLIC_URL + "/login"}`} component={Login} />
                            <Route path={`${process.env.PUBLIC_URL + "/registration"}`} component={Register} />
                            <Route path={`${process.env.PUBLIC_URL + "/contact"}`} component={Contact} />
                            <Route path={`${process.env.PUBLIC_URL + "/faq"}`} component={Faq} />
                            <Route path={`${process.env.PUBLIC_URL + "/404"}`} component={PageNotFound} />
                            <Route path={`${process.env.PUBLIC_URL + "/coming-soon"}`} component={ComingSoon} />
                            <Route path={`${process.env.PUBLIC_URL + "/blog-classic"}`} component={BlogClassic} />
                            <Route path={`${process.env.PUBLIC_URL + "/blog-grid"}`} component={BlogGrid} />
                            <Route path={`${process.env.PUBLIC_URL + "/blog-details"}`} component={BlogDetails} />
                            <Route path={`${process.env.PUBLIC_URL + "/products"}`} component={Product} />
                            <Route path={`${process.env.PUBLIC_URL + "/product-details"}`} component={ProductDetails} />
                            <Route path={`${process.env.PUBLIC_URL + "/cart"}`} component={Cart} />
                            <Route path={`${process.env.PUBLIC_URL + "/feedback"}`} component={Feedback} />
                            <Route path={`${process.env.PUBLIC_URL + "/userProfile/:id"}`} component={userProfile} />
                            <Route path={`${process.env.PUBLIC_URL + "/addTestimonial"}`} component={AddTestimonial} />
                            <Route path={`${process.env.PUBLIC_URL + "/instructor-dashboard"}`} component={InstructorDashboard} />



                            <Route path={`${process.env.PUBLIC_URL + "/menu"}`} component={Menu} />

                            

                            <Route path={`${process.env.PUBLIC_URL + "/AdminDashBoard"}`} component={AdminDashBoard} />
                            <Route path={`${process.env.PUBLIC_URL + "/courses/view-courses"}`} component={AdminViewCourses} />
                            <Route path={`${process.env.PUBLIC_URL + "/courses/course-details/:id"}`} component={AdminViewCourseDetails} />
                            <Route path={`${process.env.PUBLIC_URL + "/users/view-learners"}`} component={LearnersData} />
                            <Route path={`${process.env.PUBLIC_URL + "/users/view-instructors"}`} component={InstructorsData} />
                            <Route path={`${process.env.PUBLIC_URL + "/users/view-request-instructors"}`} component={RequestForInstructor} />
                            <Route path={`${process.env.PUBLIC_URL + "/testimonials/view-testimonials"}`} component={Testimonials} />
                            <Route path={`${process.env.PUBLIC_URL + "/User/Bulk-User-Registration"}`} component={BulkUserRegistration} />
                            <Route path={`${process.env.PUBLIC_URL + "/Announcement/General-Announcement"}`} component={GeneralAnnouncement} />
                            <Route path={`${process.env.PUBLIC_URL + "/Feedback-Master"}`} component={GeneralFeedbackMaster} />
                            <Route path={`${process.env.PUBLIC_URL + "/Course-Analytics-Report"}`} component={CourseAnalyticsReports} />
                            <Route path={`${process.env.PUBLIC_URL + "/mail-configure-settings"}`} component={MailConfigureSetting} />




                            


                            <Route path={`${process.env.PUBLIC_URL + "/ContentDelivery/:id/:tid"}`} component={ContentDelivery} />



                            <RenderOnRole roles={['instructor']}>
                              
                                <Route path={`${process.env.PUBLIC_URL + "/add-course-category"}`} component={AddCourseCategory} />
                                <Route path={`${process.env.PUBLIC_URL + "/CreateCourse"}`} component={CreateCourse} />
                                <Route path={`${process.env.PUBLIC_URL + "/UpdateCourse/:cId"}`} component={UpdateCourse} />
                                <Route path={`${process.env.PUBLIC_URL + "/ViewCourses"}`} component={ViewCourses} />
                                <Route path={`${process.env.PUBLIC_URL + "/inst-course-details/:cId"}`} component={InstCourseDetails} />
                                <Route path={`${process.env.PUBLIC_URL + "/CourseStructureDrive"}`} component={CourseStructureDrive} />
                            </RenderOnRole> */}

                                    {/* <Route path={`${process.env.PUBLIC_URL + "/basic-ui/typography"}`} component={Typography} />
                                    <Route path={`${process.env.PUBLIC_URL + "/form-Elements/basic-elements"}`} component={BasicElements} />
                                    <Route path={`${process.env.PUBLIC_URL + "/tables/basic-table"}`} component={BasicTable} />
                                    <Route path={`${process.env.PUBLIC_URL + "/icons/mdi"}`} component={Mdi} />
                                    <Route path={`${process.env.PUBLIC_URL + "/charts/chart-js"}`} component={ChartJs} />
                                    <Route path="/user-pages/login-1" component={Login} />
                                    <Route path="/user-pages/register-1" component={Register} /> 
                                    <Route path={`${process.env.PUBLIC_URL + "/user-pages/lockscreen"}`} component={LockScreen} />
                                    <Route path={`${process.env.PUBLIC_URL + "/error-pages/error-404"}`} component={Error404} />
                                    <Route path={`${process.env.PUBLIC_URL + "/error-pages/error-500"}`} component={Error500} />
                                    <Route path={`${process.env.PUBLIC_URL + "/general-pages/blank-page"}`} component={BlankPage} /> */}






                                    {/* <RenderOnRole roles={['learner']}>
                        <Route exact path={`${process.env.PUBLIC_URL + "/"}`} component={HomeOne} />
                        <Route path={`${process.env.PUBLIC_URL + "/home-two"}`} component={HomeTwo} />
                        <Route path={`${process.env.PUBLIC_URL + "/about"}`} component={About} />
                        <Route path={`${process.env.PUBLIC_URL + "/course-grid"}`} component={CourseGrid} />
                        <Route path={`${process.env.PUBLIC_URL + "/course-list"}`} component={CourseList} />
                        <Route path={`${process.env.PUBLIC_URL + "/user-grid"}`} component={UserGrid} />
                        <Route path={`${process.env.PUBLIC_URL + "/user-list"}`} component={UserList} />
                        <Route path={`${process.env.PUBLIC_URL + "/course-details/:id/:tid"}`} component={CourseDetails} />
                        <Route path={`${process.env.PUBLIC_URL + "/instructor"}`} component={Instructor} />
                        <Route path={`${process.env.PUBLIC_URL + "/instructor-details/:id"}`} component={InstructorDetails} />
                        <Route path={`${process.env.PUBLIC_URL + "/gallery"}`} component={Gallery} />
                        <Route path={`${process.env.PUBLIC_URL + "/events"}`} component={Events} />
                        <Route path={`${process.env.PUBLIC_URL + "/event-details"}`} component={EventDetails} />
                        <Route path={`${process.env.PUBLIC_URL + "/dashboard"}`} component={Dashborad} />
                        <Route path={`${process.env.PUBLIC_URL + "/login"}`} component={Login} />
                        <Route path={`${process.env.PUBLIC_URL + "/registration"}`} component={Register} />
                        <Route path={`${process.env.PUBLIC_URL + "/contact"}`} component={Contact} />
                        <Route path={`${process.env.PUBLIC_URL + "/faq"}`} component={Faq} />
                        <Route path={`${process.env.PUBLIC_URL + "/404"}`} component={PageNotFound} />
                        <Route path={`${process.env.PUBLIC_URL + "/coming-soon"}`} component={ComingSoon} />
                        <Route path={`${process.env.PUBLIC_URL + "/blog-classic"}`} component={BlogClassic} />
                        <Route path={`${process.env.PUBLIC_URL + "/blog-grid"}`} component={BlogGrid} />
                        <Route path={`${process.env.PUBLIC_URL + "/blog-details"}`} component={BlogDetails} />
                        <Route path={`${process.env.PUBLIC_URL + "/products"}`} component={Product} />
                        <Route path={`${process.env.PUBLIC_URL + "/product-details"}`} component={ProductDetails} />
                        <Route path={`${process.env.PUBLIC_URL + "/cart"}`} component={Cart} />
                        <Route path={`${process.env.PUBLIC_URL + "/feedback"}`} component={Feedback} />
                        <Route path={`${process.env.PUBLIC_URL + "/userProfile/:id"}`} component={userProfile} />
                        <Route path={`${process.env.PUBLIC_URL + "/addTestimonial"}`} component={AddTestimonial} />
                        <Route path={`${process.env.PUBLIC_URL + "/add-course-category"}`} component={AddCourseCategory} />
                        <Route path={`${process.env.PUBLIC_URL + "/CreateCourse"}`} component={CreateCourse} />
                        <Route path={`${process.env.PUBLIC_URL + "/UpdateCourse/:cId"}`} component={UpdateCourse} />
                        <Route path={`${process.env.PUBLIC_URL + "/ViewCourses"}`} component={ViewCourses} />
                        <Route path={`${process.env.PUBLIC_URL + "/inst-course-details/:cId"}`} component={InstCourseDetails} />
                        <Route path={`${process.env.PUBLIC_URL + "/CourseStructureDrive"}`} component={CourseStructureDrive} />
                    </RenderOnRole> */}
                                </Route>
                            </Suspense>
                        </Router>



                        {/* {
                themeLoaded && <ThemeProvider theme={selectedTheme}>
                    <GlobalStyles />
                    <Container style={{ fontFamily: selectedTheme.font }}>
                        <button className="btn" onClick={manageDialog}>Create a Theme</button>
                        <Dialog
                            header="Create a Theme"
                            body={<CreateThemeContent create={createTheme} />}
                            open={showDialog}
                            callback={manageDialog} />
                        <ThemeSelector setter={setSelectedTheme} newTheme={newTheme} />
                    </Container>
                </ThemeProvider>
            } */}
                    </ValidationContext.Provider>
                </DynamicContext.Provider>
            </GlobalContext.Provider>
        </Provider >
    )
}

App.propTypes = {
    history: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

export default App;