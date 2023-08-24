import React, { Component, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import UserService from '../../services/UserService';
import service from '../../services/service';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';


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
  //   code: 'te',
  //   name: 'Telugu',
  //   country_code: 'in'
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




function Sidebar() {

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])


  useEffect(() => {
    UserService.generateToken();
  }, []);

  const um_api = UserService.USER_API;

  const [getstate, setState] = useState({});

  function toggleMenuState(menuState) {
    if (getstate[menuState]) {
      setState({ [menuState]: false });
    } else if (Object.keys(getstate).length === 0) {
      setState({ [menuState]: true });
    } else {
      Object.keys(getstate).forEach(i => {
        setState({ [i]: false });
      });
      setState({ [menuState]: true });
    }
  }

  function onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(getstate).forEach(i => {
      setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/courses', state: 'basicUiMenuOpen' },
      { path: '/users', state: 'advancedUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/maps', state: 'mapsMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/announcement', state: 'announcementMenuOpen' },
      { path: '/feedback', state: 'feedbackMenuOpen' },
      { path: '/CourseReport', state: 'courseReportMenuOpen' },
      { path: '/emailConfigureSetting', state: 'EmailConfigureMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/general-pages', state: 'generalPagesMenuOpen' },
      { path: '/ecommerce', state: 'ecommercePagesMenuOpen' },
      { path: '/contactConfigureSetting', state: 'ContactConfigureMenuOpen' },
      { path: '/InstructorCourseList', state: 'InstructorCourseListOpen' },
      { path: '/managingData', state: 'basicRegistrationOperation' },
      { path: '/paymentConfigureSetting', state: 'PaymentConfigureMenuOpen' },
      { path: '/library', state: 'LibraryAdminOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (isPathActive(obj.path)) {
        setState({ [obj.state]: true })
      }
    }));

  }

  function isPathActive(path) {
    return window.location.pathname.startsWith(path);
  }

  function capitalizeFirstLetter(str) {
    let data = `${str}`;
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

  const [headerState, setHeaderState] = useState({
    id: UserService.getUserid(),
    img: um_api + "getprofilepic"
  });



  const [getUserDetails, setUserDetails] = useState({});
  let id = UserService.getUserid();

  useEffect(() => {
    onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });

    service.getUserById(id)
      .then(res => {
        setUserDetails(res.data);
      })
      .catch(err => {
        //console.log(err);
      })
  }, [])

  return (
    <div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt => evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={`${headerState.img}/${headerState.id}`} alt="profile" />
                <span className="login-status online"></span> {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>{capitalizeFirstLetter(getUserDetails.firstName)} {capitalizeFirstLetter(getUserDetails.lastName)}</Trans></span>
                {/* <span className="text-secondary text-small"><Trans>Project Manager</Trans></span> */}
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li className={isPathActive('/AdminDashBoard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/AdminDashBoard">
              <span className="menu-title"><Trans>{t('dashboard')}</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={isPathActive('/courses') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('basicUiMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('courses')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-book-open-variant menu-icon"></i>
            </div>
            <Collapse in={getstate.basicUiMenuOpen}>
              <ul className="nav flex-column sub-menu">

                <li className="nav-item">
                  <Link className={isPathActive('/courses/view-courses') ? 'nav-link active' : 'nav-link'} to="/courses/view-courses"><Trans>{t('view_courses')}</Trans></Link></li>
                {/* <li className="nav-item">  */}
                {/* <Link className={isPathActive('/courses/coursewise-learnerlist') ? 'nav-link active' : 'nav-link'} to="/courses/coursewise-learnerlist"><Trans>Enrolled Course Learner List</Trans></Link></li> */}
                <li className="nav-item">

                  <Link className={isPathActive('/courses/view-request-learner-for-course') ? 'nav-link active' : 'nav-link'} to="/courses/view-request-learner-for-course"><Trans>{t('learner_request_for_course')}</Trans></Link></li>

                <li className="nav-item">
                  <Link className={isPathActive('/courses/courses-to-publish') ? 'nav-link active' : 'nav-link'} to="/courses/courses-to-publish"><Trans>{t('course_to_publish')}</Trans></Link></li>
                {/* <li className="nav-item"> <Link className={isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li> */}
                <li className="nav-item"> <Link className={isPathActive('/Course-Details-List') ? 'nav-link active' : 'nav-link'} to="/Course-Details-List"><Trans>{t('course_details_list')}</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/InstructorCourseList') ? 'nav-link active' : 'nav-link'} to="/InstructorCourseList"><Trans>{t('instructor_course_list')}</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/courses/coursewise-learnerlist') ? 'nav-link active' : 'nav-link'} to="/courses/coursewise-learnerlist"><Trans>{t('course_learner_list')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/library') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.LibraryAdminOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('LibraryAdminOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('library')}</Trans></span>
              <i className="menu-arrow"></i> <i className="mdi mdi-library menu-icon"></i>
            </div>
            <Collapse in={getstate.LibraryAdminOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className={isPathActive('/library/library-to-publish') ? 'nav-link active' : 'nav-link'} to="/library/library-to-publish"><Trans>{t('library_content_to_publish')}</Trans></Link></li>
                <li className="nav-item">
                  <Link className={isPathActive('/library/view-all-library') ? 'nav-link active' : 'nav-link'} to="/library/view-all-library"><Trans>{t('all_library')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>



          <li className={isPathActive('/users') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('formElementsMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('view_users')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-multiple menu-icon"></i>
            </div>
            <Collapse in={getstate.formElementsMenuOpen}>
              <ul className="nav flex-column sub-menu">

                <li className="nav-item"> <Link className={isPathActive('/users/view-learners') ? 'nav-link active' : 'nav-link'} to="/users/view-learners"><Trans>{t('view_learner')}</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/users/view-request-learner') ? 'nav-link active' : 'nav-link'} to="/users/view-request-learner"><Trans>{t('request_learner')}</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/users/view-instructors') ? 'nav-link active' : 'nav-link'} to="/users/view-instructors"><Trans>{t('view_instructor')}</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/users/view-request-instructors') ? 'nav-link active' : 'nav-link'} to="/users/view-request-instructors"><Trans>{t('inst_request')}</Trans></Link></li>

              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/tables') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('tablesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('testimonials')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-format-quote-close menu-icon"></i>
            </div>
            <Collapse in={getstate.tablesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/testimonials/view-testimonials') ? 'nav-link active' : 'nav-link'} to="/testimonials/view-testimonials"><Trans>{t('view_testimonials')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/icons') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('user_reg')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-multiple-plus menu-icon"></i>
            </div>
            <Collapse in={getstate.iconsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/User/Bulk-User-Registration') ? 'nav-link active' : 'nav-link'} to="/User/Bulk-User-Registration"><Trans>{t('bulk_reg')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/announcement') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.announcementMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('announcementMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('announcement')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-bullhorn menu-icon"></i>
            </div>
            <Collapse in={getstate.announcementMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/Announcement/General-Announcement') ? 'nav-link active' : 'nav-link'} to="/Announcement/General-Announcement"><Trans>{t('general_announcement')}</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/event-handling') ? 'nav-link active' : 'nav-link'} to="/Announcement/event-handling"><Trans>{t('event_handling')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/feedback') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.feedbackMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('feedbackMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('feedback')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-comment menu-icon"></i>
            </div>
            <Collapse in={getstate.feedbackMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/Feedback-Master') ? 'nav-link active' : 'nav-link'} to="/Feedback-Master"><Trans>{t('add_master_feedback')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/CourseReport') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.courseReportMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('courseReportMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('analytic_report')}</Trans></span>
              <i className="menu-arrow"></i> <i className="mdi mdi-chart-areaspline menu-icon"></i>
            </div>
            <Collapse in={getstate.courseReportMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/Course-Analytics-Report') ? 'nav-link active' : 'nav-link'} to="/Course-Analytics-Report"><Trans>{t('course_report')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          {/* <li className={isPathActive('/emailConfigureSetting') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.EmailConfigureMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('EmailConfigureMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('mail_setting')}</Trans></span>
              <i className="menu-arrow"></i> <i className="mdi mdi-settings-outline menu-icon"></i>
            </div>
            <Collapse in={getstate.EmailConfigureMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/mail-configure-settings') ? 'nav-link active' : 'nav-link'} to="/mail-configure-settings"><Trans>{t('email_setting')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
          {/* <li className={isPathActive('/contactConfigureSetting') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.ContactConfigureMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('ContactConfigureMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Contact Messages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-email"></i>
            </div>
            <Collapse in={getstate.ContactConfigureMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/contact-website-message') ? 'nav-link active' : 'nav-link'} to="/contact-website-message"><Trans>Website Contact Message</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
          <li className={isPathActive('/paymentConfigureSetting') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.PaymentConfigureMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('PaymentConfigureMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('payment_details')}</Trans></span>
              <i className="menu-arrow"></i> <i className="mdi mdi-cash-multiple menu-icon"></i>
            </div>
            <Collapse in={getstate.PaymentConfigureMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/course-Payment-Details') ? 'nav-link active' : 'nav-link'} to="/course-Payment-Details"><Trans>{t('payment_details_course')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          {/* <li className={isPathActive('/CourseDetailsList') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.CourseListOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('CourseListOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('course_details')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-cash-multiple"></i>
            </div>
            <Collapse in={getstate.CourseListOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/CourseDetailsList') ? 'nav-link active' : 'nav-link'} to="/InstructorCourseList"><Trans>{t('course_details_list')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
          {/* <li className={isPathActive('/InstructorCourseList') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.InstructorCourseListOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('InstructorCourseListOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('inst_details')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-cash-multiple"></i>
            </div>
            <Collapse in={getstate.InstructorCourseListOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/InstructorCourseList') ? 'nav-link active' : 'nav-link'} to="/InstructorCourseList"><Trans>{t('inst_course_list')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}

          <li className={isPathActive('/managingData') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.basicRegistrationOperation ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('basicRegistrationOperation')} data-toggle="collapse">
              <span className="menu-title"><Trans>{t('manage_reg')}</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-multiple menu-icon"></i>
            </div>
            <Collapse in={getstate.basicRegistrationOperation}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/manage-cadre') ? 'nav-link active' : 'nav-link'} to="/manage-cadre"><Trans>{t('manage_cadre')}</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/manage-designation') ? 'nav-link active' : 'nav-link'} to="/manage-designation"><Trans>{t("manage_designation")}</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/manage-qualification') ? 'nav-link active' : 'nav-link'} to="/manage-qualification"><Trans>{t('manage_qualification')}</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          {/*
          <li className={isPathActive('/charts') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('chartsMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Charts</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-chart-bar menu-icon"></i>
            </div>
            <Collapse in={getstate.chartsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link'} to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/user-pages') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-lock menu-icon"></i>
            </div>
            <Collapse in={getstate.userPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/user-pages/lockscreen') ? 'nav-link active' : 'nav-link'} to="/user-pages/lockscreen"><Trans>Lockscreen</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/error-pages') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('errorPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-security menu-icon"></i>
            </div>
            <Collapse in={getstate.errorPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-404">404</Link></li>
                <li className="nav-item"> <Link className={isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-500">500</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={isPathActive('/general-pages') ? 'nav-item active' : 'nav-item'}>
            <div className={getstate.generalPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('generalPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>General Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </div>
            <Collapse in={getstate.generalPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/general-pages/blank-page') ? 'nav-link active' : 'nav-link'} to="/general-pages/blank-page"><Trans>Blank Page</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://bootstrapdash.com/demo/purple-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-title"><Trans>Documentation</Trans></span>
              <i className="mdi mdi-file-document-box menu-icon"></i>
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;




// class Sidebar extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       UserId: UserService.getUserid(),
//       UserData: [],
//       img: '',
//       id: ''
//     }

//   }
//   state = {};

//   toggleMenuState(menuState) {
//     if (this.state[menuState]) {
//       this.setState({ [menuState]: false });
//     } else if (Object.keys(this.state).length === 0) {
//       this.setState({ [menuState]: true });
//     } else {
//       Object.keys(this.state).forEach(i => {
//         this.setState({ [i]: false });
//       });
//       this.setState({ [menuState]: true });
//     }
//   }


//   componentDidUpdate(prevProps) {
//     if (this.props.location !== prevProps.location) {
//       this.onRouteChanged();
//     }
//   }

//   onRouteChanged() {
//     document.querySelector('#sidebar').classList.remove('active');
//     Object.keys(this.state).forEach(i => {
//       this.setState({ [i]: false });
//     });

//     const dropdownPaths = [
//       { path: '/apps', state: 'appsMenuOpen' },
//       { path: '/basic-ui', state: 'basicUiMenuOpen' },
//       { path: '/advanced-ui', state: 'advancedUiMenuOpen' },
//       { path: '/form-elements', state: 'formElementsMenuOpen' },
//       { path: '/tables', state: 'tablesMenuOpen' },
//       { path: '/maps', state: 'mapsMenuOpen' },
//       { path: '/icons', state: 'iconsMenuOpen' },
//       { path: '/charts', state: 'chartsMenuOpen' },
//       { path: '/user-pages', state: 'userPagesMenuOpen' },
//       { path: '/error-pages', state: 'errorPagesMenuOpen' },
//       { path: '/general-pages', state: 'generalPagesMenuOpen' },
//       { path: '/ecommerce', state: 'ecommercePagesMenuOpen' },
//     ];

//     dropdownPaths.forEach((obj => {
//       if (isPathActive(obj.path)) {
//         this.setState({ [obj.state]: true })
//       }
//     }));

//   }

//   render() {
//     return (
//       <nav className="sidebar sidebar-offcanvas" id="sidebar">
//         <ul className="nav">
//           <li className="nav-item nav-profile">
//             <a href="!#" className="nav-link" onClick={evt => evt.preventDefault()}>
//               <div className="nav-profile-image">
//                 <img src={`${this.state.img}${this.state.id}`} alt="profile" />
//                 <span className="login-status online"></span> {/* change to offline or busy as needed */}
//               </div>
//               <div className="nav-profile-text">
//                 <span className="font-weight-bold mb-2"><Trans>{this.state.UserData.firstName} {this.state.UserData.lastName}</Trans></span>
//                 <span className="text-secondary text-small"><Trans>Project Manager</Trans></span>
//               </div>
//               <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
//             </a>
//           </li>
//           <li className={isPathActive('/AdminDashBoard') ? 'nav-item active' : 'nav-item'}>
//             <Link className="nav-link" to="/AdminDashBoard">
//               <span className="menu-title"><Trans>Dashboard</Trans></span>
//               <i className="mdi mdi-home menu-icon"></i>
//             </Link>
//           </li>
//           <li className={isPathActive('/basic-ui') ? 'nav-item active' : 'nav-item'}>
//             <div className={this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('basicUiMenuOpen')} data-toggle="collapse">
//               <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
//               <i className="menu-arrow"></i>
//               <i className="mdi mdi-crosshairs-gps menu-icon"></i>
//             </div>
//             <Collapse in={this.state.basicUiMenuOpen}>
//               <ul className="nav flex-column sub-menu">
//                 <li className="nav-item"> <Link className={isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
//                 <li className="nav-item"> <Link className={isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
//                 <li className="nav-item"> <Link className={isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
//               </ul>
//             </Collapse>
//           </li>
//           <li className={isPathActive('/form-elements') ? 'nav-item active' : 'nav-item'}>
//             <div className={this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('formElementsMenuOpen')} data-toggle="collapse">
//               <span className="menu-title"><Trans>Form Elements</Trans></span>
//               <i className="menu-arrow"></i>
//               <i className="mdi mdi-format-list-bulleted menu-icon"></i>
//             </div>
//             <Collapse in={this.state.formElementsMenuOpen}>
//               <ul className="nav flex-column sub-menu">
//                 <li className="nav-item"> <Link className={isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
//               </ul>
//             </Collapse>
//           </li>
//           <li className={isPathActive('/tables') ? 'nav-item active' : 'nav-item'}>
//             <div className={this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('tablesMenuOpen')} data-toggle="collapse">
//               <span className="menu-title"><Trans>Tables</Trans></span>
//               <i className="menu-arrow"></i>
//               <i className="mdi mdi-table-large menu-icon"></i>
//             </div>
//             <Collapse in={this.state.tablesMenuOpen}>
//               <ul className="nav flex-column sub-menu">
//                 <li className="nav-item"> <Link className={isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link'} to="/tables/basic-table"><Trans>Basic Table</Trans></Link></li>
//               </ul>
//             </Collapse>
//           </li>
//           <li className={isPathActive('/icons') ? 'nav-item active' : 'nav-item'}>
//             <div className={this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
//               <span className="menu-title"><Trans>Icons</Trans></span>
//               <i className="menu-arrow"></i>
//               <i className="mdi mdi-contacts menu-icon"></i>
//             </div>
//             <Collapse in={this.state.iconsMenuOpen}>
//               <ul className="nav flex-column sub-menu">
//                 <li className="nav-item"> <Link className={isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'} to="/icons/mdi"><Trans>Material</Trans></Link></li>
//               </ul>
//             </Collapse>
//           </li>
//           <li className={isPathActive('/charts') ? 'nav-item active' : 'nav-item'}>
//             <div className={this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('chartsMenuOpen')} data-toggle="collapse">
//               <span className="menu-title"><Trans>Charts</Trans></span>
//               <i className="menu-arrow"></i>
//               <i className="mdi mdi-chart-bar menu-icon"></i>
//             </div>
//             <Collapse in={this.state.chartsMenuOpen}>
//               <ul className="nav flex-column sub-menu">
//                 <li className="nav-item"> <Link className={isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link'} to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
//               </ul>
//             </Collapse>
//           </li>
//           <li className={isPathActive('/user-pages') ? 'nav-item active' : 'nav-item'}>
//             <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
//               <span className="menu-title"><Trans>User Pages</Trans></span>
//               <i className="menu-arrow"></i>
//               <i className="mdi mdi-lock menu-icon"></i>
//             </div>
//             <Collapse in={this.state.userPagesMenuOpen}>
//               <ul className="nav flex-column sub-menu">
//                 <li className="nav-item"> <Link className={isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
//                 <li className="nav-item"> <Link className={isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
//                 <li className="nav-item"> <Link className={isPathActive('/user-pages/lockscreen') ? 'nav-link active' : 'nav-link'} to="/user-pages/lockscreen"><Trans>Lockscreen</Trans></Link></li>
//               </ul>
//             </Collapse>
//           </li>
//           <li className={isPathActive('/error-pages') ? 'nav-item active' : 'nav-item'}>
//             <div className={this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('errorPagesMenuOpen')} data-toggle="collapse">
//               <span className="menu-title"><Trans>Error Pages</Trans></span>
//               <i className="menu-arrow"></i>
//               <i className="mdi mdi-security menu-icon"></i>
//             </div>
//             <Collapse in={this.state.errorPagesMenuOpen}>
//               <ul className="nav flex-column sub-menu">
//                 <li className="nav-item"> <Link className={isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-404">404</Link></li>
//                 <li className="nav-item"> <Link className={isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-500">500</Link></li>
//               </ul>
//             </Collapse>
//           </li>
//           <li className={isPathActive('/general-pages') ? 'nav-item active' : 'nav-item'}>
//             <div className={this.state.generalPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('generalPagesMenuOpen')} data-toggle="collapse">
//               <span className="menu-title"><Trans>General Pages</Trans></span>
//               <i className="menu-arrow"></i>
//               <i className="mdi mdi-medical-bag menu-icon"></i>
//             </div>
//             <Collapse in={this.state.generalPagesMenuOpen}>
//               <ul className="nav flex-column sub-menu">
//                 <li className="nav-item"> <Link className={isPathActive('/general-pages/blank-page') ? 'nav-link active' : 'nav-link'} to="/general-pages/blank-page"><Trans>Blank Page</Trans></Link></li>
//               </ul>
//             </Collapse>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="http://bootstrapdash.com/demo/purple-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
//               <span className="menu-title"><Trans>Documentation</Trans></span>
//               <i className="mdi mdi-file-document-box menu-icon"></i>
//             </a>
//           </li>
//         </ul>
//       </nav>
//     );
//   }

//   isPathActive(path) {
//     return this.props.location.pathname.startsWith(path);
//   }

//   componentDidMount() {
//     this.onRouteChanged();
//     // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
//     const body = document.querySelector('body');
//     document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

//       el.addEventListener('mouseover', function () {
//         if (body.classList.contains('sidebar-icon-only')) {
//           el.classList.add('hover-open');
//         }
//       });
//       el.addEventListener('mouseout', function () {
//         if (body.classList.contains('sidebar-icon-only')) {
//           el.classList.remove('hover-open');
//         }
//       });
//     });

//     service.getUserById(this.state.UserId)
//       .then(res => {
//         this.setState({
//           UserData: res.data,
//           img: um_api + "getprofilepic/",
//           id: UserService.getUserid()
//         });
//       }).catch(err => {
//         //console.log(err);
//       })
//   }

// }

// export default withRouter(Sidebar);