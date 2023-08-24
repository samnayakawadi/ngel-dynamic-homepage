import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
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

import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';

import ThemeSelector from './theme/ThemeSelector';

import Dialog from './theme/Dialog';
import CreateThemeContent from './theme/CreateThemeContent';
import Setting from './components/common/Setting';


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
import { GlobalContext } from './pages/courses/contentdelivery/contexts/GlobalContext';
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

const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App({ store, history }) {


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
    const [globalContextState, setGlobalContextState] = useState({
        currentId: "",
        currentPath: "",
        selectedIndex: 1,
        currentNodeType: '',
        apiData: []
    });
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (UserService.isLoggedIn() === false) {
    //             history.push("/");
    //         } else {

    //         }
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, []);




    return (
        <Provider store={store}>
            <GlobalContext.Provider value={{ globalContextState, setGlobalContextState }}>
                <Router history={history}>
                    <GlobalStyle />
                    <ScrollToTop />
                    <Suspense fallback={<Spinner />}>
                        <Switch>
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
                            <Route path={`${process.env.PUBLIC_URL + "/instructor-dashboard"}`} component={InstructorDashboard} />



                            <Route path={`${process.env.PUBLIC_URL + "/menu"}`} component={Menu} />

                            {UserService.hasRole(['admin']) ?
                                <>
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
                                </> : <Route path={`${process.env.PUBLIC_URL + "/404"}`} component={PageNotFound} />
                            }


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


                            <Route path={`${process.env.PUBLIC_URL + "/ContentDelivery/:id/:tid"}`} component={ContentDelivery} />



                            <RenderOnRole roles={['instructor']}>
                                <Route path={`${process.env.PUBLIC_URL + "/add-course-category"}`} component={AddCourseCategory} />
                                <Route path={`${process.env.PUBLIC_URL + "/CreateCourse"}`} component={CreateCourse} />
                                <Route path={`${process.env.PUBLIC_URL + "/UpdateCourse/:cId"}`} component={UpdateCourse} />
                                <Route path={`${process.env.PUBLIC_URL + "/ViewCourses"}`} component={ViewCourses} />
                                <Route path={`${process.env.PUBLIC_URL + "/inst-course-details/:cId"}`} component={InstCourseDetails} />
                                <Route path={`${process.env.PUBLIC_URL + "/CourseStructureDrive"}`} component={CourseStructureDrive} />
                            </RenderOnRole>






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
                        </Switch>
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
            </GlobalContext.Provider>
        </Provider >
    )
}

App.propTypes = {
    history: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

export default App;