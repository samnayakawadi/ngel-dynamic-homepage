

import jsPDF from 'jspdf';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { downloadExcel } from 'react-export-table-to-excel';
import StickyMenu from '../components/common/StickyMenu';
import service from '../services/service';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';
import SettingsPanel from './shared/SettingsPanel';
import Sidebar from './shared/Sidebar';
import UserService from '../services/UserService';
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
      paddingLeft: '0 8px',
      marginLeft: '10px'
    },
  },
};




function CourseListDetails() {

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
    listCourse();
  }, []);

  const [getAllCourse, setAllCourse] = useState();
  const listCourse = () => {
    service.getAllCourses().then((resp) => {
      setAllCourse(resp.data);
    }).then((err) => {
      //console.log(err);
    })
  }

  const columnCourseList = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: '100px',

    },
    {
      name: "Course Name",
      selector: row => row.courseName,
      //selector: row => moment.unix(row.userId).utc(),

     // width: "150px",
      wrap: true,
    },
    {
      name: "Category",
      selector: row => row.catName,

      wrap: true,
      //width: "120px"
    },
    {
      name: "Start Date",      
      // selector: row => row.courseSDate,
      selector: row => moment(row.courseSDate).format('MM-DD-YYYY'),
      //wrap: true,
    },
    {
      name: "End Date",
      // selector: row => row.courseEDate,
      selector: row => moment(row.courseSDate).format('MM-DD-YYYY'),
      wrap: true,
    },
    {
      name: "Instructor",
      selector: row => <>
        {`${row.instructor[0].firstName} ${row.instructor[0].lastName}`}
      </>,
      wrap: true,
      //width: "120px"
    },
    {
      name: "Total Enrolled User",
      selector: row => row.userCount,
      //width: "200px",
      wrap: true,
    },
  ];

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Course List";
    const headers = [["Course Name", "Catagory", "Start Date", "End Date", "Instructor", "Total Enrolled User"]];

    var checkData = getAllCourse.map((data) => [`${data.courseName}`
      , `${data.catName}`
      , `${data.courseSDate}`
      , `${data.courseEDate}`
      , `${data.instructor[0].firstName} ${data.instructor[0].lastName}`
      , `${data.userCount}`

    ])
    let content = {
      startY: 50,
      head: headers,
      body: checkData
    };
    doc.text(title, 40, 40);
    doc.autoTable(content);
    doc.save("CourseList.pdf")
  }


  const exportExcel = () => {

    var checkData = [];
    const header = ["Course Name", "Catagory", "Start Date", "End Date", "Instructor", "Total Enrolled User"]
    getAllCourse.map((data) => {
      const name = `${data.courseName}`;
      const catagory = `${data.catName}`;
      const start = `${data.courseSDate}`
      const end = `${data.courseEDate}`;
      const instName = `${data.instructor[0].firstName} ${data.instructor[0].lastName}`;
      const totalEnrolled = `${data.userCount}`
      const instData = [name, catagory, start, end, instName, totalEnrolled]
      checkData.push(instData);
    })
    downloadExcel({
      fileName: "Course",
      sheet: "CourseList",
      tablePayload: {
        header,
        body: checkData,
      },
    })

  }





  return (
    <div className="container-scroller">
      <Navbar />
      <StickyMenu />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">{t('course_details')}</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('course_details')}</a></li>
                  <li className="breadcrumb-item active" aria-current="page">{t('course_details')}</li>
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

                        </div>
                      </Row>
                      <br>
                      </br>

                      {/* <div className="card-body"> */}
                      <br>
                      </br>
                      <div>
                        <div className="d-flex px-2">
                          <Button onClick={exportExcel} style={{ marginRight: "10px" }}>{t('export_to_excel')}</Button>
                          <Button onClick={exportPDF}>{t('export_to_pdf')}</Button>
                        </div>
                        <br></br>
                        <Card>
                          <br></br>
                          <h5 style={{ textAlign: 'center' }}>{t('course_list')}</h5>
                          <br></br>
                          <DataTable
                            columns={columnCourseList}
                            data={getAllCourse}
                            striped
                            pagination
                            highlightOnHover
                            customStyles={customStyles}

                          />
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

export default CourseListDetails;


