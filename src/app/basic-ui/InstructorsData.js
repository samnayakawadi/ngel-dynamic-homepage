import React, { useEffect, useState, useMemo, useRef } from 'react';
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
import UserService from '../../services/UserService';
import { Button, Modal } from 'react-bootstrap';
import { downloadExcel, DownloadTableExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf';
import "jspdf-autotable";

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
            // paddingLeft: '0 8px',
            // marginLeft: '10px'
        },
    },
};

function InstructorsData() {

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
    useEffect(() => {
        LearnersDatas();
    }, [])

    const LearnersDatas = async () => {
        try {
            let result = await adminServices.getAllInstructors()
            ////console.log(result.data)
            setlearnerData(result.data);
        } catch (e) {
            //console.log(e)
        }
    }

    const [enableLearnerName, setenableLearnerName] = useState();
    const [disableLearnerName, setDisableLearnerName] = useState();

    const disableUser = async (id) => {

        setDisableLoading({ isLoading: true });
        setDisableLearnerName(id);
        adminServices.disableUser(id).then((resp)=>{
            //console.log("Outside the Disable IF")
            if(resp.status === 200){
                //console.log("inside the Disable IF")
                setDisableLoading({ isLoading: false });
                swal(`${t('success')}`, `${t('user_disable_msg')}`, "success")
                LearnersDatas();                
            }
        }).catch((err)=>{
            setDisableLoading({ isLoading: false });
            swal(`${t('error')}`, `${t('something_went_wrong_try_later')}`, "error")

        })


        // try {
        //     setDisableLoading({ isLoading: true });
        //     setDisableLearnerName(id);
        //     let result = await adminServices.disableUser(id)
        //     ////console.log(result.data.enabled)
        //     if (result.data.enabled == false) {

        //         setDisableLoading({ isLoading: false });

        //         await swal(`${t('success')}`, `${t('user_disable_msg')}`, "success")
        //         LearnersDatas();
        //     }
        // } catch (e) {
        //     await swal(`${t('error')}`, `${t('something_went_wrong_try_later')}`, "error")
        //     //console.log(e)
        //     setDisableLoading({ isLoading: false });

        // }
    }

    const enableUser = async (id) => {

        setEnableLoading({ isLoading: true });
        setenableLearnerName(id);
        //console.log("inside enable Inst")
        adminServices.enableUser(id).then((resp)=>{
            if(resp.status === 200){
        //console.log("If resp enable")

                setEnableLoading({ isLoading: false });
                swal(`${t('success')}`, `${t('user_enable_msg')}`, "success")
                LearnersDatas();
            }
        }).catch((err) =>{
            setEnableLoading({ isLoading: false });
            swal(`${t('error')}`, `${t('something_went_wrong_try_later')}`, "error")
        })

        // try {

        //     setenableLearnerName(id);
        //     setEnableLoading({ isLoading: true });
        //     let result = await adminServices.enableUser(id)
        //     ////console.log(result.data.enabled)
        //     if (result.data.enabled == true) {
        //         setEnableLoading({ isLoading: false });
        //         await swal(`${t('success')}`, `${t('user_enable_msg')}`, "success")
        //         LearnersDatas();
        //     }
        // } catch (e) {
        //     setEnableLoading({ isLoading: false });
        //     await swal(`${t('error')}`, `${t('something_went_wrong_try_later')}`, "error")
        //     //console.log(e)
        // }
    }

    const [ShareUrlModal, setShareUrlModal] = useState({
        show: false
    });

    const [infoLoading, setInfoLoading] = useState({
        isLoading: false
    })

    const [enableLoading, setEnableLoading] = useState({
        isLoading: false
    })
    const [disableLoading, setDisableLoading] = useState({
        isLoading: false
    })

    const shareUrlModalHide = () => {
        setShareUrlModal({ show: false });
        setInfoLoading({ isLoading: false });
    }
    const shareUrlModalShow = (firstname, lastname, email, mobile, gender, address, city, district, state, pincode, country, qualification, institute, dob) => {
        setInfoLoading({ isLoading: true });
        setShareUrlModal({
            show: true,
            firstName: firstname,
            lastName: lastname,
            email: email,
            mobile: mobile,
            gender: gender,
            address: address,
            district: district,
            state: state,
            pincode: pincode,
            country: country,
            qualification: qualification,
            institute: institute,
            dob: dob,
            city: city,
        });
    }

    const columns = [
        {
            name: "Instructor",
            cell: (row) => <img src={um_api + `getprofilepic/${row.learnerUsername}`} style={{ width: '42px', height: '42px', borderRadius: '100%', boxShadow: "5px 10px 20px 1px rgba(0, 0, 0, 0.253)" }} />,
            sortable: true,
            width: "auto",
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
            name: "Block User",
            sortable: true,
            wrap: true,
            cell: (row) => <div>
                <span className="d-inline-block">
                    <button onClick={() => shareUrlModalShow(row.firstName, row.lastName, row.email, row.mobile, row.gender, row.address, row.city, row.districtName, row.stateName, row.pincode, row.countryName, row.eduQualification, row.instituteName, row.dob)}
                        type="button" class="btn btn-info" disabled={infoLoading.isLoading ? "true" : ""}>
                        {infoLoading.isLoading ? ShareUrlModal.email === row.email ? (<> {t('loading')}</>) : (<><i class="fa fa-info-circle"></i>  {t('info')}</>) : (<><i class="fa fa-info-circle"></i>  {t('info')}</>)}
                    </button>

                    {row.status === "true" ?
                        <button onClick={() => disableUser(row.learnerUsername)} type="button" class="btn btn-success m-2">
                            {
                                disableLoading.isLoading ? disableLearnerName === row.learnerUsername ? (<> {t('loading')}</>)
                                    : <><i class="fa fa-lock"></i> {t('disable')}</>
                                    : <><i class="fa fa-lock"></i> {t('disable')}</>
                            }
                        </button>
                        : <button onClick={() => enableUser(row.learnerUsername)} type="button" class="btn btn-danger m-2">
                            {enableLoading.isLoading ? enableLearnerName === row.learnerUsername ? (<>{t('loading')}</>)
                                : <><i class="fa fa-lock-open"></i> {t('enable')}</>
                                : <><i class="fa fa-lock-open"></i> {t('enable')}</>
                            }
                        </button>}

                </span>
            </div>
        }
    ];

    // onClick={() => disableUser(row.learnerUsername)}

    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const filteredItems = getLearnerData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

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

    const tableExportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait"
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Instructors List";
        const headers = [["Name", "Date of Birth", "Address", "Gender", "E-mail", "Mobile No.", "Qualification"]];

        var checkData = getLearnerData.map((data) => [`${data.firstName} ${data.lastName}`, `${data.dob}`
            , `${data.address}, ${data.districtName}, ${data.stateName}, ${data.pincode}`
            , `${data.gender}`
            , `${data.email}`
            , `${data.mobile}`
            , `${data.eduQualification}, ${data.instituteName}`

        ])
        let content = {
            startY: 50,
            head: headers,
            body: checkData
        };
        doc.text(title, 40, 40);
        doc.autoTable(content);
        doc.save("InstructorList.pdf")
    }

    // const [data2,setData]=useState()
    const tableExportExcel = () => {
        ////console.log(getLearnerData);
        var checkData = [];
        const header = ["Name", "Date of Birth", "Address", "Gender", "E-mail", "Mobile No.", "Qualification"]
        getLearnerData.map((data) => {
            const name = `${data.firstName} ${data.lastName}`;
            const address = `${data.address} ${data.districtName} ${data.stateName} ${data.pincode}`;
            const gender = `${data.gender}`
            const email = `${data.email}`
            const mobile = `${data.mobile}`
            const qualification = `${data.eduQualification} ${data.instituteName}`
            const dob = `${data.dob}`
            const instData = [name, dob, address, gender, email, mobile, qualification]
            checkData.push(instData);
        })

        downloadExcel({
            fileName: "Instructors",
            sheet: "Instructor List",
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
                        <div>
                            <div className="page-header">
                                <h3 className="page-title">
                                    {t('instructors')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('instructors')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('view_instructors')}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body" >
                                    <div className="d-flex px-2">
                                        <Button onClick={tableExportExcel} style={{ marginRight: "5px" }}> {t('export_to_excel')} </Button>
                                        <Button onClick={tableExportPDF}> {t('export_to_pdf')} </Button>
                                    </div>

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
            <Modal centered show={ShareUrlModal.show} onHide={() => shareUrlModalHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('user_details')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table table-borderless">

                        <tbody>
                            <tr>
                                <td>Name : </td>
                                <td>{ShareUrlModal.firstName} {ShareUrlModal.lastName}</td>
                            </tr>
                            <tr>
                                <td>Gender : </td>
                                <td>{ShareUrlModal.gender === null ? "NA" : `${ShareUrlModal.gender}`}</td>
                            </tr>
                            <tr>
                                <td>Date Of Birth : </td>
                                <td>{ShareUrlModal.dob === null ? "NA" : `${moment(ShareUrlModal.dob).format('MM-DD-YYYY')}`}</td>
                            </tr>
                            <tr>
                                <td>Qualification : </td>
                                {
                                    ShareUrlModal.qualification === null && ShareUrlModal.institute === null
                                        ?
                                        <td>NA</td>
                                        :
                                        <td>{ShareUrlModal.qualification === null ? "NA" : `${ShareUrlModal.qualification}`} , {ShareUrlModal.institute === null ? "NA" : `${ShareUrlModal.institute}`}</td>
                                }
                            </tr>
                            <tr>
                                <td>City : </td>
                                <td>{ShareUrlModal.city === null ? "NA" : `${ShareUrlModal.city}`}</td>
                            </tr>
                            <tr>
                                <td>Address : </td>
                                {
                                    ShareUrlModal.address === null && ShareUrlModal.district === "PLEASE SELECT DISTRICT" && ShareUrlModal.state === "Please Select State" &&
                                        ShareUrlModal.country === "Please Select Country" && ShareUrlModal.pincode === 0
                                        ? <td>NA</td>
                                        :
                                        <td>{(ShareUrlModal.address === null) ? "NA" : `${ShareUrlModal.address}`} ,{ShareUrlModal.district === "PLEASE SELECT DISTRICT" ? "NA" : `${ShareUrlModal.district}`} , {ShareUrlModal.state === "Please Select State" ? "NA" : `${ShareUrlModal.state}`} , {ShareUrlModal.pincode} , {ShareUrlModal.country === "Please Select Country" ? "NA" : `${ShareUrlModal.country}`} </td>
                                }
                            </tr>
                            <tr>
                                <td>Email : </td>
                                <td>{ShareUrlModal.email}</td>
                            </tr>
                            <tr>
                                <td>Mobile : </td>
                                <td>{ShareUrlModal.mobile}</td>
                            </tr>
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

export default InstructorsData;
