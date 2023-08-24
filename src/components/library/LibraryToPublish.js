
// import React, { useEffect, useState, useMemo } from 'react';
import UserService from '../../services/UserService';
// import DataTable from "react-data-table-component";
// import { useHistory } from 'react-router-dom';
// import { Container, Row, Col, Button, Form, Card, Modal } from 'react-bootstrap';
// import swal from 'sweetalert';
// import service from '../../services/service';
// import adminServices from '../../services/adminServices';
// import FilterDataTable from '../../pages/instructor/FilterDataTable';
// import Navbar from '../../app/shared/Navbar';
// import StickyMenu from '../common/StickyMenu';
// import Sidebar from '../../app/shared/Sidebar';
// import SettingsPanel from '../../app/shared/SettingsPanel';
// import Footer from '../../app/shared/Footer';


import React from 'react';
import Navbar from '../../app/shared/Navbar';
import Sidebar from '../../app/shared/Sidebar';
import StickyMenu from '../common/StickyMenu';
import { Styles } from '../../app/Courses/styles/course.js'
import { useEffect } from 'react';
import instructorService from '../../services/instructorService';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import SettingsPanel from '../../app/shared/SettingsPanel';
import Footer from '../../app/shared/Footer';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import service from '../../services/service';
import swal from 'sweetalert';



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




function LibraryToPublish(props) {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    // const um_api = UserService.USER_API;
    // ////console.log(um_api);

    // const [getLearnerData, setlearnerData] = useState([]);
    // const [getLearnerDataStatus, setlearnerDataStatus] = useState(false);
    // const [courseList, setCourseList] = useState([]);
    // const [getCourseIdName, setCourseIdName] = useState({
    //     id: ''
    // })

    // const getAllCourseList = () => {
    //     service.getAllLibraryToPublish().then((resp) => {
    //         //setLearnerList(resp.data);
    //         //console.log(resp.data)
    //         setCourseList(resp.data);
    //     }).catch((err) => {
    //         //console.log(err)
    //     })
    // }

    // useEffect(() => {
    //     getAllCourseList();
    // }, [getLearnerDataStatus])

    // useEffect(() => {
    //     LearnersDatas(getCourseIdName.id);
    // }, [getLearnerDataStatus])

    // const LearnersDatas = async (id) => {
    //     try {
    //         let result = await adminServices.getRequestOfLearnerForCourse(id)
    //         setlearnerData(result.data);
    //         //console.log(result.data);
    //         setlearnerDataStatus(false);
    //     } catch (e) {
    //         //console.log(e);
    //         setlearnerDataStatus(false);
    //     }
    // }
    // const [approveLoading, setApproveLoading] = useState({
    //     isLoading: false
    // })
    // const [rejectLoading, setRejectLoading] = useState({
    //     isLoading: false
    // })

    // //const [rowEmail, setRowCourseUserdIds] = useState("")
    // const [getRowCourseUserdIds, setRowCourseUserdIds] = useState({
    //     courseId: " ", 
    //     userId: " "
    // })

    // const ApproveAsLearner = async (courseId, userId) => {   
    //     setApproveLoading({ isLoading: true });
    //     // Previously there is an 'email' in Parameter
    //     // let data = { "rolename": "instructor", "username": email };

    //     try {
    //         // //console.log(email);

    //         let result = await service.approveCourseLearnerRequest(courseId, userId);

    //         //console.log(result.data);
    //         if (result.data == "success") {
    //             await swal("Success", "Learner Approved Successfully!", "success");
    //            // InstructorRequestDatas();
    //            setApproveLoading({ isLoading: false });
    //            setlearnerDataStatus(true);
    //         }
    //     } catch (e) {
    //         swal("Error", "Something Went Wrong Try Again!", "error")
    //         //console.log(e)
    //         setApproveLoading({ isLoading: false });
    //         setlearnerDataStatus(true);
    //     }
    // }

    // const columns = [
    //     // {
    //     //     name: "S.No",
    //     //     selector: (row, index) => index + 1,
    //     //     //width: '100px',
    //     //     sortable: true,
    //     // },
    //     // {
    //     //     name: "Learner",
    //     //     cell: (row) => <img src={um_api + `getprofilepic/${row.learnerUsername}`} style={{ width: '42px', height: '42px', borderRadius: '100%', boxShadow: "5px 10px 20px 1px rgba(0, 0, 0, 0.253)" }} />,
    //     //     sortable: true,
    //     //     //width: "100px",
    //     // },
    //     {
    //         name: "course Id",
    //         selector: row => row.courseId,
    //         wrap : true,
    //         sortable: true,
    //     },
    //     {
    //         name: "Course Name",
    //         selector: row => `${row.courseName}`,
    //         sortable: true,
    //         wrap: true,
    //         //width: '150px',
    //     },
    //     {
    //         name: "Category Name",
    //         selector: row => row.catName,
    //         wrap : true,
    //         sortable: true,
    //     },
    //     {
    //         name: "instructor",
    //         selector: row => `${row.instructor[0].firstName} ${row.instructor[0].lastName}`,
    //         sortable: true,
    //     },
    //     // {
    //     //     name: "Regiment/Belt Number",
    //     //     selector: row => row.beltno,
    //     //     wrap : true,
    //     //     sortable: true,
    //     // },
    //     // {
    //     //     name: "GPF/CPF Number",
    //     //     selector: row => row.gpfno,
    //     //     sortable: true,
    //     // },
    //     {
    //         name: "Action",
    //         sortable: true,
    //         wrap: true,
    //         width: '300px',
    //         cell: (row) => <div>
    //             <div className="d-inline-block">
    //                  <button onClick={() => shareUrlModalShow(row.courseId,row.instructor.learnerUsername)} 
    //                 type="button" class="btn btn-info" style={{marginRight:"6px"}} disabled={infoLoading.isLoading ? "true" : ""}>
    //                 {infoLoading.isLoading ? (<> Loading...</>) : (<>View Course</>)}
    //                 </button>
    //             </div>

    //         </div>
    //     }
    // ];



    // /* Table content Filter and Search */
    // const [filterText, setFilterText] = React.useState("");
    // const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    //     false
    // );
    // const filteredItems = courseList.filter(
    //     item =>
    //         JSON.stringify(item)
    //             .toLowerCase()
    //             .indexOf(filterText.toLowerCase()) !== -1
    // );
    // const subHeaderComponent = useMemo(() => {
    //     const handleClear = () => {
    //         if (filterText) {
    //             setResetPaginationToggle(!resetPaginationToggle);
    //             setFilterText("");
    //         }
    //     };

    //     return (
    //         <FilterDataTable
    //             onFilter={e => setFilterText(e.target.value)}
    //             onClear={handleClear}
    //             filterText={filterText}
    //         />
    //     );
    // }, [filterText, resetPaginationToggle]);

    // const [ShareUrlModal, setShareUrlModal] = useState({
    //     show: false
    // });

    // const [infoLoading, setInfoLoading] = useState({
    //     isLoading: false
    // })

    // const history = useHistory();

    // const cipher = salt => {
    //     const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    //     const byteHex = n => ("0" + Number(n).toString(32)).substr(-2);
    //     const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
    //     return text => text.split('')
    //         .map(textToChars)
    //         .map(applySaltToChar)
    //         .map(byteHex)
    //         .join('');
    // }


    // const CourseDetails = (id, instid ,tid) => {
    //     var result = '';
    //     let length = 10;
    //     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var charactersLength = characters.length;
    //     for (var i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() *
    //             charactersLength));
    //     }
    //     const myCipher = cipher(`${result}`)
    //     let cid = myCipher(`${id}`);
    //     let tId = myCipher(`${tid}`);
    //     let inst_id = myCipher(`${instid}`);
    //     let rNumber = Math.floor(Math.random() * 10000000000);
    //     history.push(`${process.env.PUBLIC_URL + "/instLibraryDetails/"}${rNumber}${cid}/${result}${tId}/${result}${inst_id}`);

    //     //history.push(`${process.env.PUBLIC_URL + "/admin-library-details/"}${rNumber}${cid}/${result}${tId}`);
    // }

    // const shareUrlModalShow = (courseId,userId) => {
    //     setInfoLoading({ isLoading: true });
    //     CourseDetails(courseId, 1,userId);
    // }

    // return (
    //     <div className="container-scroller">
    //         <Navbar />
    //         <StickyMenu />
    //         <div className="container-fluid page-body-wrapper">
    //             <Sidebar />
    //             <div className="main-panel">
    //                 <div className="content-wrapper">
    //                     <div>
    //                         <div className="page-header">
    //                             <h3 className="page-title">
    //                             Library List to Publish
    //                             </h3>
    //                             <nav aria-label="breadcrumb">
    //                                 <ol className="breadcrumb">
    //                                     <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Courses</a></li>
    //                                     <li className="breadcrumb-item active" aria-current="page">Library List to Publish</li>
    //                                 </ol>
    //                             </nav>
    //                         </div>
    //                     </div>
    //                     <div className="col-lg-12 grid-margin stretch-card">
    //                         <div className="card" style={{padding: '20px'}}>
    //                             <div className="card-body">
    //                                 <DataTable
    //                                     columns={columns}
    //                                     data={filteredItems}
    //                                     defaultSortField="Name"
    //                                     defaultSortAsc={true}
    //                                     striped
    //                                     pagination
    //                                     highlightOnHover
    //                                     customStyles={customStyles}
    //                                     subHeader
    //                                     subHeaderComponent={subHeaderComponent}
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <SettingsPanel />
    //                 </div>
    //                 <Footer />
    //             </div>
    //         </div>
    //     </div>

    // );


    const currentLanguageCode = Cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    const [postsPerPage] = useState(10);
    const [getCourseData, setCourseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    useEffect(() => {
        courseData();
    }, [])
    const courseData = async () => {
        try {
            let result = await service.getAllLibraryToPublish();
            setCourseData(result.data);
        } catch (e) {
            //console.log(e);
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
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentCourseState = getCourseData.slice(0, 1000);
    const [search, setSearch] = useState();


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

    const submitHandler = () => {
        setSubmitHandlerLoading({ isLoading: true });
    }

    const onClickApproveButton = (courseId) => {
        instructorService.LibraryPublish(courseId).then((resp) => {
            if (resp.status === 200) {
                swal(`${t('successfully')}`, `${t('library_published')}`, "success");
                courseData();
            }
        }).catch((err) => {
            //console.log(err);
        })
    }

    const onClickRejectButton = (courseId) => {
        instructorService.libraryUnPublish(courseId).then((resp) => {
            if (resp.status === 200) {
                swal(`${t('successfully')}`, `${t('library_unpublished')}`, "success");
                courseData();
            }
        }).catch((err) => {
            //console.log(err);
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
                        <div>
                            <div className="page-header">
                                <h3 className="page-title">
                                    {t('library')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('library')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('library_to_publish')}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        {
                            currentCourseState.length === 0 ?
                                <>
                                    {/* <Card> */}
                                    <h3 class="d-flex justify-content-center">{t('no_library_to_publish')}</h3>
                                    {/* </Card> */}
                                </>
                                :
                                <>
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
                                                                                <img src={imageUrls(data.courseImage)} alt="" className='card-img-top' />
                                                                            </div>
                                                                            <div className='card-body text-dark'>
                                                                                <h4 className='card-title'>{data.courseName}</h4>
                                                                                <p className='card-text text-secondary'>
                                                                                    {/* <a href='#' className='btn btn-outline-success'>View Learner</a> */}

                                                                                    <Link className="nav-link" to={`${process.env.PUBLIC_URL}/library/view-content/${data.courseId}`}>
                                                                                        <a href='#' className='btn btn-success' onClick={submitHandler} style={{ background: "green" }} disabled={submitHandlerLoading.isLoading ? "true" : ""} > {submitHandlerLoading.isLoading ? (<>{t('loading')}</>) : (<>{t('view_content')}</>)}</a>
                                                                                    </Link>
                                                                                    <div className='row'>
                                                                                        <Button onClick={() => { onClickApproveButton(data.courseId) }} style={{ marginRight: "5px" }} className='btn btn-success'>{t('approve')}</Button>
                                                                                        <Button onClick={() => { onClickRejectButton(data.courseId) }} className='btn btn-danger'>{t('reject')}</Button>
                                                                                    </div>
                                                                                </p>
                                                                            </div>
                                                                            {data.status === "N" ? (
                                                                                <div
                                                                                    className="card text-center shadow"
                                                                                    style={{
                                                                                        position: "absolute",
                                                                                        top: "-20px",
                                                                                        left: "0px",
                                                                                        background: "#c20606",
                                                                                        color: "white",
                                                                                        border: "0px"
                                                                                    }}
                                                                                >
                                                                                    <div>{t('new_content')}</div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Styles>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                        <div style={{ marginTop: "30px" }}>
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
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>

    );



}

export default LibraryToPublish;