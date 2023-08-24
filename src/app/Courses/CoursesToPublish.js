import React, { useEffect, useState, useMemo } from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import adminServices from '../../services/adminServices';
import learnerService from '../../services/learnerService';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import DataTable from "react-data-table-component";
import service from '../../services/service';
import swal from 'sweetalert';
import { Container, Row, Col, Button, Form, Card, Modal } from 'react-bootstrap';
import services from '../../services/service.js';
import UserService from '../../services/UserService';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
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

function CoursesToPublish() {

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
    ////console.log(um_api);

    const [getLearnerData, setlearnerData] = useState([]);
    const [getLearnerDataStatus, setlearnerDataStatus] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const [getCourseIdName, setCourseIdName] = useState({
        id: ''
    })

    const getAllCourseList = () => {
        services.getAllCourses().then((resp) => {
            //setLearnerList(resp.data);
            //console.log(resp.data)
            setCourseList(resp.data);
        }).catch((err) => {
            //console.log(err)
        })
    }

    useEffect(() => {
        getAllCourseList();
    }, [getLearnerDataStatus])

    useEffect(() => {
        LearnersDatas(getCourseIdName.id);
    }, [getLearnerDataStatus])

    const LearnersDatas = async (id) => {
        try {
            let result = await adminServices.getRequestOfLearnerForCourse(id)
            setlearnerData(result.data);
            ////console.log(result.data);
            setlearnerDataStatus(false);
        } catch (e) {
            //console.log(e);
            setlearnerDataStatus(false);
        }
    }
    const [approveLoading, setApproveLoading] = useState({
        isLoading: false
    })
    const [rejectLoading, setRejectLoading] = useState({
        isLoading: false
    })

    //const [rowEmail, setRowCourseUserdIds] = useState("")
    const [getRowCourseUserdIds, setRowCourseUserdIds] = useState({
        courseId: " ",
        userId: " "
    })

    const ApproveAsLearner = async (courseId, userId) => {
        setApproveLoading({ isLoading: true });
        // Previously there is an 'email' in Parameter
        // let data = { "rolename": "instructor", "username": email };

        try {
            // //console.log(email);

            let result = await service.approveCourseLearnerRequest(courseId, userId);

            ////console.log(result.data);
            if (result.data == "success") {
                await swal(`${t('success')}`, `${t('learner_approved')}`, "success");
                // InstructorRequestDatas();
                setApproveLoading({ isLoading: false });
                setlearnerDataStatus(true);
            }
        } catch (e) {
            swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
            //console.log(e)
            setApproveLoading({ isLoading: false });
            setlearnerDataStatus(true);
        }
    }

    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            width: '100px',
            sortable: true,
        },
        // {
        //     name: "Learner",
        //     cell: (row) => <img src={um_api + `getprofilepic/${row.learnerUsername}`} style={{ width: '42px', height: '42px', borderRadius: '100%', boxShadow: "5px 10px 20px 1px rgba(0, 0, 0, 0.253)" }} />,
        //     sortable: true,
        //     //width: "100px",
        // },
        // {
        //     name: "course Id",
        //     selector: row => row.courseId,
        //     wrap : true,
        //     sortable: true,
        // },
        {
            name: "Course Name",
            selector: row => `${row.courseName}`,
            sortable: true,
            wrap: true,
            //width: '150px',
        },
        {
            name: "Category Name",
            selector: row => row.catName,
            wrap: true,
            sortable: true,
        },
        {
            name: "instructor",
            selector: row => `${row.instructor[0]?.firstName} ${row.instructor[0]?.lastName}`,
            sortable: true,
        },
        // {
        //     name: "Regiment/Belt Number",
        //     selector: row => row.beltno,
        //     wrap : true,
        //     sortable: true,
        // },
        // {
        //     name: "GPF/CPF Number",
        //     selector: row => row.gpfno,
        //     sortable: true,
        // },
        {
            name: "Action",
            sortable: true,
            wrap: true,
            cell: (row) => <div>
                <div className="d-inline-block">
                    <button onClick={() => shareUrlModalShow(row.courseId)}
                        type="button" class="btn btn-info" style={{ marginRight: "6px" }} disabled={infoLoading.isLoading ? "true" : ""}>
                        {infoLoading.isLoading ? (<> {t('loading')}</>) : (<>{t('view_courses')}</>)}
                    </button>
                </div>

            </div>
        }
    ];



    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    // const filteredItems = courseList.filter(
    //     item =>
    //         JSON.stringify(item)
    //             .toLowerCase()
    //             .indexOf(filterText.toLowerCase()) !== -1
    // );
    // //console.log("filteredItems =>" + filteredItems);
    const statusCheck = (courseList) => {
        if (courseList.status === 'R') {
            return courseList;
        }
    }

    const filteredItems = courseList.filter(statusCheck);



    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterDataTable
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const [ShareUrlModal, setShareUrlModal] = useState({
        show: false
    });

    const [infoLoading, setInfoLoading] = useState({
        isLoading: false
    })

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

    const shareUrlModalShow = (courseId) => {
        setInfoLoading({ isLoading: true });
        CourseDetails(courseId, 1);
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
                                    {t('courses_list_to_publish')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('courses')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('courses_list_to_publish')}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <DataTable
                                        columns={columns}
                                        data={filteredItems}
                                        defaultSortField="Name"
                                        defaultSortAsc={true}
                                        striped
                                        pagination
                                        highlightOnHover
                                        customStyles={customStyles}
                                        subHeader
                                        subHeaderComponent={subHeaderComponent}
                                    />
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

export default CoursesToPublish;