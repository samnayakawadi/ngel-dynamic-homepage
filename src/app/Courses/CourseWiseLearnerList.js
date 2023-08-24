
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Row, Modal } from 'react-bootstrap';
import ReactSelect from 'react-select';
import StickyMenu from '../../components/common/StickyMenu';
import instructorService from '../../services/instructorService';
import learnerService from '../../services/learnerService';
import service from '../../services/service';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import UserService from '../../services/UserService';
import DataTable from "react-data-table-component";
import moment from 'moment';
import { downloadExcel, DownloadTableExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { categoryData } from '../../redux-files/Actions/courseTypeAction';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';

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



export default function CourseWiseLearnerList() {

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
        getCourseList();
    }, []);

    const um_api = UserService.USER_API;

    const [getLearnerData, setLearnerData] = useState();
    const [data, setData] = useState();
    const [learnerEnrolledData, setLearnerEnrolledData] = useState();
    const [courseData, setCourseData] = useState();
    const [options, setOption] = useState();
    const [selectData, setSelectData] = useState();
    const getCourseList = () => {
        instructorService.getAllCourses().then((resp) => {
            const courseData = resp.data.map((single) => {
                return {
                    value: single.courseId,
                    label: single.courseName
                }
            })
            setOption(courseData);
        }).catch((err) => {
            //console.log(err);
        })
    }

    const check = () => {
        // //console.log(learnerEnrolledData);
        // //console.log(courseData);
        ////console.log("===============", data)
    }

    let selectedDatanew = [];
    let selectedDatanew2 = [];
    const onSelecteHandler = (selectedData) => {
        //console.log(selectedData);
        selectedDatanew = selectedData.map(({ value }) => ({ value }));
        //console.log(selectedDatanew);
        for (let i = 0; i < selectedDatanew.length; i++) {
            selectedDatanew2.push(selectedDatanew[i].value)
        }
        ////console.log(selectedDatanew2);
        setSelectData(selectedDatanew2);
    }

    
    let optionsnew = [];
    let optionsnew2 = [];
    const onSelecteAllHandler = async() => {
        //console.log(options);
        optionsnew = options.map(({ value }) => ({ value }));
        //console.log(optionsnew);
        for (let i = 0; i < optionsnew.length; i++) {
            optionsnew2.push(optionsnew[i].value)
        }
        ////console.log(selectedDatanew2);
        setSelectData(optionsnew2);

        let optionLength = 0;

        if (optionsnew2 !== undefined) {
            optionLength = optionsnew2.length;
        }
        var courseData = [];
        const selectCourseLearnerData = []

        //console.log("selectData ------>  ",selectData);
        service.getCourseProgressReport(optionsnew2)
            .then(res => {
                ////console.log("selectData res ------>  ",res);
                setLearnerData(res.data);
            })
            .catch(err => {
                ////console.log("selectData err ------>  ",err);
            })

    }
    

    const [ShareUrlModal, setShareUrlModal] = useState({
        show: false
    });

    const shareUrlModalHide = () => {
        setShareUrlModal({ show: false });
        setInfoLoading({ isLoading: false });
    }

    const [filterText, setFilterText] = React.useState("");
    const [infoLoading, setInfoLoading] = useState({
        isLoading: false
    })

    let filteredItems = getLearnerData;

    useEffect(() => {
        if (getLearnerData !== undefined) {

            filteredItems = getLearnerData

            // filteredItems = getLearnerData.filter(
            //     item =>
            //         JSON.stringify(item)
            //             .toLowerCase()
            //             .indexOf(filterText.toLowerCase()) !== -1
            // );
        }
    }, [selectData])

    const shareUrlModalShow = (firstName, lastName, designation, mobile, email, cadre, dob, gpfno, beltno, eduQualification, enrolmentDate, courseName, catName, courseSDate, courseEDate, quizPassingStatus) => {
        setInfoLoading({ isLoading: true });
        let dobFormatted = moment(dob).format('DD-MM-yyyy');
        setShareUrlModal({
            show: true,
            firstName: firstName,
            lastName: lastName,
            designation: designation,
            mobile: mobile,
            email: email,
            cadre: cadre,
            dob: dobFormatted,
            gpfno: gpfno,
            beltno: beltno,
            eduQualification: eduQualification,
            enrolmentDate: enrolmentDate,
            courseName: courseName,
            catName: catName,
            courseSDate: courseSDate,
            courseEDate: courseEDate,
            quizPassingStatus: quizPassingStatus
        });
    }


    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            width: '100px',
            sortable: true,
        },
        {
            name: "Name",
            selector: row => `${row.firstName} ${row.lastName}`,
            sortable: true,
            wrap: true,
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            wrap: true
        },
        {
            name: "Mobile",
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: "Course Name",
            selector: row => row.courseName,
            sortable: true,
        },
        {
            name: "More Details",
            sortable: true,
            wrap: true,
            cell: (row) => <div>
                <span className="d-inline-block">
                    <button
                        onClick={() => shareUrlModalShow(row.firstName, row.lastName, row.designation, row.mobile, row.email, row.cadre, row.dob, row.gpfno, row.beltno, row.eduQualification, row.enrolmentDate, row.courseName, row.catName, row.courseSDate, row.courseEDate, row.quizPassingStatus)}
                        type="button" class="btn btn-info" disabled={infoLoading.isLoading ? "true" : ""}>
                        {infoLoading.isLoading ? (ShareUrlModal.beltno === row.beltno) ? (ShareUrlModal.courseName === row.courseName) ? (<> {t('loading')}</>) : (<><i class="fa fa-info-circle"></i>  {t('info')}</>) : (<><i class="fa fa-info-circle"></i>  {t('info')}</>) : (<><i class="fa fa-info-circle"></i>  {t('info')}</>)}
                    </button>
                </span>
            </div>
        }
    ];

    const [getSelectedQuiz, setSelectedQuiz] = useState();

    const onClickSubmit = async () => {
        let selectLength = 0;
        if (selectData !== undefined) {
            selectLength = selectData.length;
        }
        var courseData = [];
        const selectCourseLearnerData = []

        //console.log("selectData ------>  ",selectData);
        service.getCourseProgressReport(selectData)
            .then(res => {
                ////console.log("selectData res ------>  ",res);
                setLearnerData(res.data);
            })
            .catch(err => {
                ////console.log("selectData err ------>  ",err);
            })

        //setData(courseData);
        // setLearnerEnrolledData(selectCourseLearnerData);
        // setCourseData(courseData);

    }


    ////console.log("filteredItems ", filteredItems);

    const tableExportExcel = () => {
        ////console.log(getLearnerData);
        var checkData = [];
        const header = ["Name", "E-mail", "Mobile No.", "Designation", "Cadre", "Date of Birth", "GPF/CPF Number", "Belt Number", "Qualification", "Enrollment Date", "Course Name", "Category Name", "Course Start Date", "Course End Date", "Quiz Report"]

        if (getLearnerData !== undefined) {
            getLearnerData.map((data) => {
                const name = `${data.firstName} ${data.lastName}`;
                const email = `${data.email}`;
                const mobile = `${data.mobile}`;
                const designation = `${data.designation}`;
                const cadre = `${data.cadre}`;
                const dob = `${data.dob}`;
                let dobFormatted = moment(dob).format('DD-MM-yyyy');
                const gpfno = `${data.gpfno}`;
                const beltno = `${data.beltno}`;
                const eduQualification = `${data.eduQualification}`;
                const enrolmentDate = `${data.enrolmentDate}`;
                let enrolmentDateFormatted = moment(enrolmentDate).format('DD-MM-yyyy');
                const courseName = `${data.courseName}`;
                const catName = `${data.catName}`;
                const courseSDate = `${data.courseSDate}`;
                const courseEDate = `${data.courseEDate}`;
                let courseSDateFormatted = moment(courseSDate).format('DD-MM-yyyy');
                let courseEDateFormatted = moment(courseEDate).format('DD-MM-yyyy');
                let quizreport = "";
                data.quizPassingStatus.map((res) => {
                    quizreport += "Quiz Name : " + res.quizName + ",\nQuiz Achieved Score : " + res.quizAchievedScore + "/" + res.quizTotalScore + ",\nQuiz Achieved Percentage : " + Math.round(res.quizAchievedPercentage) + "% ";
                    quizreport += '\r\n';
                    quizreport += "----------------------------------------------\n";
                })
                const instData = [name, email, mobile, designation, cadre, dobFormatted, gpfno, beltno, eduQualification, enrolmentDateFormatted, courseName, catName, courseSDateFormatted, courseEDateFormatted, quizreport]
                checkData.push(instData);
            })
        }
        downloadExcel({
            fileName: "Course Learner List",
            sheet: "Course Learner List",
            tablePayload: {
                header,
                body: checkData,
            },
        })
    }

    const tableExportPDF = () => {
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape"
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(13);
        const title = "Course Learner List";
        const headers = [["Name", "E-mail", "Mobile No.", "Designation", "Cadre", "Date of Birth", "GPF/CPF Number", "Belt Number", "Qualification", "Enrollment Date", "Course Name", "Category Name", "Course Start Date", "Course End Date", "Quiz Report"]];

        var checkData = [];
        if (getLearnerData !== undefined) {

            getLearnerData.map((data) => {
                const name = `${data.firstName} ${data.lastName}`;
                const email = `${data.email}`;
                const mobile = `${data.mobile}`;
                const designation = `${data.designation}`;
                const cadre = `${data.cadre}`;
                const dob = `${data.dob}`;
                let dobFormatted = moment(dob).format('DD-MM-yyyy');
                const gpfno = `${data.gpfno}`;
                const beltno = `${data.beltno}`;
                const eduQualification = `${data.eduQualification}`;
                const enrolmentDate = `${data.enrolmentDate}`;
                let enrolmentDateFormatted = moment(enrolmentDate).format('DD-MM-yyyy');
                const courseName = `${data.courseName}`;
                const catName = `${data.catName}`;
                const courseSDate = `${data.courseSDate}`;
                const courseEDate = `${data.courseEDate}`;
                let courseSDateFormatted = moment(courseSDate).format('DD-MM-yyyy');
                let courseEDateFormatted = moment(courseEDate).format('DD-MM-yyyy');
                let quizreport = "";
                data.quizPassingStatus.map((res) => {
                    quizreport += "Quiz Name : " + res.quizName + ",\nQuiz Achieved Score : " + res.quizAchievedScore + "/" + res.quizTotalScore + ",\nQuiz Achieved Percentage : " + Math.round(res.quizAchievedPercentage) + "% ";
                    quizreport += '\r\n';
                    quizreport += "----------------------------------\n";
                })
                const instData = [name, email, mobile, designation, cadre, dobFormatted, gpfno, beltno, eduQualification, enrolmentDateFormatted, courseName, catName, courseSDateFormatted, courseEDateFormatted, quizreport]
                checkData.push(instData);
            })
        }

        let content = {
            startY: 50,
            head: headers,
            body: checkData
        };
        doc.text(title, 40, 40);
        doc.autoTable(content);
        doc.save("CourseLearnerList.pdf")
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

                            <h3 className="page-title">{t('course_wise_learner_details')}</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('courses')}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{t('course_wise_learner_details')}</li>

                                </ol>
                            </nav>
                        </div>
                        <div className="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <Col lg="12">
                                <Row >
                                    <Col>
                                        <Row>
                                            <div className="col-12 col-md-8">
                                                <label>{t('select_courses')}</label>
                                                <br />
                                                <ReactSelect options={options} isMulti onChange={onSelecteHandler} />
                                            </div>
                                            <div className="col-12 col-md-4 mt-4">
                                                <div className="d-flex flex-column align-items-center">
                                                    <Button onClick={onClickSubmit} className="mb-3">
                                                        {t('submit')}
                                                    </Button>
                                                    <h5 className="my-3">OR</h5>
                                                    <Button onClick={onSelecteAllHandler} className="mb-3" style={{ background: 'green', borderColor: 'green' }}>
                                                        Select All Courses
                                                    </Button>
                                                </div>
                                            </div>
                                        </Row>
                                        <br>
                                        </br>

                                        {/* <div className="card-body"> */}
                                        <br>
                                        </br>
                                        <div>
                                            <div className="d-flex px-2">

                                                <Button onClick={tableExportExcel} style={{ marginRight: "5px", background: "#f0ad4e", border: "0px" }}> {t('export_to_excel')} </Button>
                                                <Button onClick={tableExportPDF} style={{ background: "#f0ad4e", border: "0px" }}> {t('export_to_pdf')} </Button>

                                            </div>
                                            <br></br>
                                            <Card>
                                                <br></br>
                                                <h5 style={{ textAlign: 'center' }}>{t('course_list')}</h5>

                                                <br></br>
                                                <DataTable
                                                    columns={columns}
                                                    data={filteredItems}
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

            <Modal centered show={ShareUrlModal.show} onHide={() => shareUrlModalHide()} backdrop="static" size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('user_details')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-borderless table-responsive" style={{whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td>Name : </td>
                                <td>{ShareUrlModal.firstName} {ShareUrlModal.lastName}</td>
                                <td>Email : </td>
                                <td>{ShareUrlModal.email}</td>
                            </tr>
                            <tr>
                                <td>Date Of Birth : </td>
                                <td>{ShareUrlModal.dob === null ? "NA" : `${ShareUrlModal.dob}`}</td>
                                <td>Mobile : </td>
                                <td>{ShareUrlModal.mobile}</td>
                            </tr>
                            <tr>
                                <td>Designation : </td>
                                <td>{ShareUrlModal.designation}</td>
                                <td>Cadre : </td>
                                <td>{ShareUrlModal.cadre}</td>
                            </tr>
                            <tr>
                                <td>GPF/CPF Number : </td>
                                <td>{ShareUrlModal.gpfno}</td>
                                <td>Belt Number : </td>
                                <td>{ShareUrlModal.beltno}</td>
                            </tr>
                            <tr>
                                <td>Qualification : </td>
                                <td>{ShareUrlModal.eduQualification === null ? "NA" : `${ShareUrlModal.eduQualification}`}</td>
                            </tr>
                        </tbody>
                        <br></br>
                        <tbody>
                            <tr>
                                <td>Course Name : </td>
                                <td>{ShareUrlModal.courseName}</td>
                                <td>Course Category : </td>
                                <td>{ShareUrlModal.catName}</td>
                            </tr>
                            <tr>
                                <td>Course Start Date : </td>
                                <td>{ShareUrlModal.courseSDate}</td>
                                <td>Course End Date : </td>
                                <td>{ShareUrlModal.courseEDate}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <table class="table table-striped">
                        <thead>
                            <h5>{t('quiz_report')} : </h5>
                            <br></br>
                            <div>
                                <label>{t('select_quiz_name')} : </label>
                                <select
                                    onChange={(e) => setSelectedQuiz(e.target.value)}
                                    class="custom-select" id="QuizReport">
                                    <option selected>Choose...</option>
                                    {ShareUrlModal.quizPassingStatus === undefined ? " " : ShareUrlModal.quizPassingStatus.map((data, index) => {
                                        return (
                                            <option value={data.quizId}>{data.quizName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <br></br>
                        </thead>
                        <tbody>
                            <>
                                {
                                    ShareUrlModal.quizPassingStatus === undefined ? " " : ShareUrlModal.quizPassingStatus.map((data) => {
                                        return (
                                            <>
                                                {(getSelectedQuiz === data.quizId) && (
                                                    <>
                                                        <tr>
                                                            <td>Quiz Name : </td>
                                                            <td>{data.quizName}</td>
                                                            <td>Scoring Method : </td>
                                                            <td>{data.scoringMethod}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Quiz Start Time : </td>
                                                            <td>{data.quizStartTime}</td>
                                                            <td>Quiz End Time : </td>
                                                            <td>{data.quizEndTime}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Quiz Achieved Score : </td>
                                                            <td>{data.quizAchievedScore} / {data.quizTotalScore}</td>
                                                            <td>Quiz Achieved Percentage : </td>
                                                            <td>{Math.round(data.quizAchievedPercentage)}%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Quiz Result : </td>
                                                            <td>{data.isPassed === true ? "Passed" : "Failed"}</td>
                                                        </tr>
                                                        <br></br>
                                                        <br></br>
                                                    </>
                                                )}
                                            </>
                                        )
                                    })
                                }
                            </>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "right" }}>

                    <Button variant="secondary" onClick={() => shareUrlModalHide()}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    );
}
