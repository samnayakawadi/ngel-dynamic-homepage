import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { downloadExcel } from 'react-export-table-to-excel';
import { For } from 'react-loops';

import StickyMenu from '../../components/common/StickyMenu';
import adminServices from '../../services/adminServices';
import service from '../../services/service';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import UserService from '../../services/UserService';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import moment from 'moment';


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

export default function InstructorCourseList() {
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

  useEffect(() => {
    instructorListFuction();
  }, [])


  const [instructorList, setInstructorList] = useState([]);
  const [instId, setInstId] = useState('');
  const instructorListFuction = () => {
    adminServices.getAllInstructors().then((resp) => {
      setInstructorList(resp.data);
    }).catch((err) => {
      //console.log(err);
    })
  }

  const [instCourse, setInstCourse] = useState();
  const [instName, setInstName] = useState({
    firstName: '',
    lastName: '',
  });

  const onClickSubmit = () => {
    if(instId){
      setCondition(true);
      setInstName({
        ...instName,
        firstName: '',
        lastName: '',
      })
    }

    instructorList.map((data) => {
      if (data.learnerUsername === instId) {
        setInstName({
          ...instName,
          firstName: data.firstName,
          lastName: data.lastName,
        })
      }
    })
    service.getUserEnrolledCourses(instId, 2).then((resp) => {
      setInstCourse(resp.data);
      //console.log(resp.data);
    }).then((err) => {
      //console.log(err);
    })
  }

  const [condition, setCondition] = useState();
  //console.log("instId ----> ", instId);

  const instCourseColumns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      wrap: true,

    },
    {
      name: "Course Name",
      selector: row => row.courseDetails.courseName,
      wrap: true,

    },
    {
      name: "Course Category",
      selector: row => row.courseDetails.category,
      wrap: true,
    },
    {
      name: "Start Date",
      // selector: row => row.courseDetails.enrollSdate,
      selector: row => moment(row.courseDetails.enrollSdate).format('MM-DD-YYYY'),
      wrap: true,
    },
    {
      name: "End Date",
      // selector: row => row.courseDetails.enrollEdate,
      selector: row => moment(row.courseDetails.enrollEdate).format('MM-DD-YYYY'),
      wrap: true,
    },
    {
      name: "Enrolled User Count",
      selector: row => row.courseDetails.userCount,
      wrap: true
    },
  ];

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = `${instName.firstName} ${instName.lastName}`;
    doc.text(title, 250, 40)
    const headers = [["Course Name", "Catagory", "Start Date", "End Date", "Total Enrolled User"]];
    var checkData = instCourse.map((data) => [
      `${data.courseDetails.courseName}`,
      `${data.courseDetails.category}`,
      `${data.courseDetails.enrollSdate}`,
      `${data.courseDetails.enrollEdate}`,
      `${data.courseDetails.userCount}`,
    ])
    let content = {
      startY: 50,
      head: headers,
      body: checkData
    };
    doc.autoTable(content);
    doc.save(`${instName.firstName} ${instName.lastName}`);
  }


  const exportExcel = () => {

    var instName = '';
    var checkData = [];
    const header = ["Course Name", "Catagory", "Start Date", "End Date", "Total Enrolled User"]

    instCourse.map((data) => {
      const sDay = new Date(`${data.courseDetails.enrollSdate}`).getDay();
      const sMonth = new Date(`${data.courseDetails.enrollSdate}`).getMonth();
      const sYear = new Date(`${data.courseDetails.enrollSdate}`).getFullYear();
      const eDay = new Date(`${data.courseDetails.enrollEdate}`).getDay();
      const eMonth = new Date(`${data.courseDetails.enrollEdate}`).getMonth();
      const eYear = new Date(`${data.courseDetails.enrollEdate}`).getFullYear();

      const name = `${data.courseDetails.courseName}`;
      const catagory = `${data.courseDetails.category}`;
      const start = `${sDay}-${sMonth + 1}-${sYear}`;
      const end = `${eDay}-${eMonth + 1}-${eYear}`;
      instName = `${data.instructor[0].firstName} ${data.instructor[0].lastName}`;
      const totalEnrolled = `${data.courseDetails.userCount}`
      const instData = [name, catagory, start, end, totalEnrolled]
      checkData.push(instData);
    })

    downloadExcel({
      fileName: `${instName}`,
      sheet: `${instName}`,
      tablePayload: {
        header,
        body: checkData,
      },
    })
  }



  return (
    <div className="container-scroller">
      {/* {//console.log(instId)} */}
      <Navbar />
      <StickyMenu />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">{t('inst_course_list')}</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('instructor_details')}</a></li>
                  <li className="breadcrumb-item active" aria-current="page">{t('instructor_course_list')}</li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <Col lg="12">
                  <Row >
                    <Col>
                      <Row>
                        <div class="col-8 col-md-4">
                          <Form.Group>
                            <label> {t('select_the_instructor')} </label>
                            <Form.Control onChange={e => setInstId(e.target.value)} as='select'>
                              <option selected> {t('select_the_instructor')} </option>
                              {
                                instructorList.map((inst) => {
                                  return (
                                    <>
                                      <option value={inst.learnerUsername}> {inst.firstName} {inst.lastName}</option>
                                    </>
                                  )
                                })
                              }
                            </Form.Control>
                            <br></br>
                          </Form.Group>

                        </div>
                        <Button onClick={() => { onClickSubmit() }} style={{ height: '40px', marginTop: "20px" }}>{t('submit')}</Button>
                      </Row>
                      <br>
                      </br>

                      {/* <div className="card-body"> */}
                      <br>
                      </br>
                      <div>
                        <br></br>
                        <Card>
                          <br></br>
                          <h5 style={{ textAlign: 'center' }}>{t('inst_course_list')}</h5>
                          <br></br>
                          {
                            condition
                              ?
                              <>
                                <div className="d-flex px-2">
                                  <Button onClick={() => { exportExcel() }} style={{ marginRight: "10px" }}>{t('export_to_excel')}</Button>
                                  <Button onClick={() => { exportPDF() }}>{t('export_to_pdf')}</Button>
                                </div>
                                <br></br>
                                <br></br>
                                <DataTable
                                  columns={instCourseColumns}
                                  data={instCourse}
                                  customStyles={customStyles}
                                />
                              </>
                              :
                              <></>
                          }
                        </Card>
                        <br></br>

                      </div>
                    </Col>
                  </Row>
                </Col>
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



