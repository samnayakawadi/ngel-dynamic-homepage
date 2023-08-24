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
import axios from 'axios';
import service from '../../services/service';
import swal from 'sweetalert';
import { Button, Modal } from 'react-bootstrap';
import { Route, useHistory, useLocation } from 'react-router';
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
            // paddingLeft: '0 8px',
            // marginLeft: '10px',
        },
    },
    cells: {
        style: {
            fontSize: '15px',

        },
    },
};

function RequestForInstructor() {

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
        InstructorRequestDatas();
    }, [])


    const InstructorRequestDatas = async () => {
        try {
            let result = await adminServices.getAllInstructorRequest();
            setlearnerData(result.data);
            ////console.log(result.data);
            // let fetchUsersInfoRemote = Promise.all(result.data.map(async (data, index) => {
            //     try {
            //         let response = await axios.get( um_api + `learner/byId?userid=${data.userId}`);
            //         return response.data;
            //     }
            //     catch (error) {
            //         return;
            //     }
            // }));
            // fetchUsersInfoRemote.then(data => setlearnerData(data));
        } catch (e) {
            //console.log(e)
        }
    }


    const [approveLoading, setApproveLoading] = useState({
        isLoading: false
    })


    const [getApproveEmail, setApproveEmail] = useState("");
    const [getRejectEmail, setRejectEmail] = useState("");

    const ApproveAsInstructor = async (learnerId) => {   // Previously there is an 'email' in Parameter
        // let data = { "rolename": "instructor", "username": email };
        setApproveEmail(learnerId);

        setApproveLoading({ isLoading: true });
        try {
            let result = await service.assignInstructorRole(learnerId)
            //Previously there is an 'data' in Parameter 
            // //console.log(learnerId);
            // //console.log(result.data);
            if (result.data == "Success") {
                await swal(`${t('success')}`, `${t('instructor_approved')}`, "success");
                InstructorRequestDatas();
                setApproveLoading({ isLoading: false });
            }
        } catch (e) {
            swal(`${t('error')}`, `${t('something_went_wrong_try_later')}`, "error")
            //console.log(e)
            setApproveLoading({ isLoading: false });
        }
    }

    // const deleteRequestInstructor = async (learnerId) => {
    //     try {
    //         let result = await service.deleteRequestInstructor(learnerId)
    //         if (result.data == "Success") {
    //             InstructorRequestDatas();
    //         }
    //     } catch (e) {
    //         //console.log(e)
    //     }
    // }

    ///////////////////   REJECT API CALL   and Functionality  //////////////////////////////////
    const [rejectRemark, setRejectRemark] = useState("");
    const [rejectCondition, setRejectCondition] = useState({
        show: false
    })

    const [rejectLoading, setRejectLoading] = useState({
        isLoading: false
    })
    const [rowid, setRowId] = useState("")
    const onHideRejectModel = () => {
        setRejectLoading({ isLoading: false });
        setRejectCondition({
            show: false
        })
        setRejectRemark("");

    }
    const onClickReject = (ID) => {
        setRejectEmail(ID);
        setRejectLoading({ isLoading: true });
        onShowRejectModel();
        setRowId(ID);

    }
    const onShowRejectModel = () => {
        setRejectCondition({
            show: true
        })
    }
    const onSetRejectRemark = (event) => {
        setRejectRemark(event.target.value)
    }

    const onSubmitRejectRemark = async (event) => {
        event.preventDefault();
        try {
            const resp = await adminServices.putRejectInstructorRequestURL(rowid, rejectRemark);
            if (resp.data === "Success") {
                swal(`${t('success')}`, `${t('instructor_request_rejected')}`, "success")
                setRejectRemark("");
                onHideRejectModel();
                InstructorRequestDatas();
                setRejectLoading({ isLoading: false });
            }
        }
        catch (error) {
            swal(`${t('error')}`, `${t('something_went_wrong_try_later')}`, "error")
            setRejectRemark("");
            onHideRejectModel();
            setRejectLoading({ isLoading: false });
        }

    }

    ////////////////       REJECT API CALL   and Functionality END /////////////////////////    

    const [infoLoading, setInfoLoading] = useState({
        isLoading: false
    })

    const [ShareUrlModal, setShareUrlModal] = useState({
        show: false
    });
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
            name: "Learner",
            cell: (row) => <img src={um_api + `getprofilepic/${row.learnerUsername}`} style={{ width: '42px', height: '42px', borderRadius: '100%', boxShadow: "5px 10px 20px 1px rgba(0, 0, 0, 0.253)" }} />,
            width: "150px"
        },
        {
            name: "Name",
            selector: row => `${row.firstName} ${row.lastName}`,
            // selector: row => <div><a href='#' style={{color : "black"}} onClick={() => shareUrlModalShow(row.firstName, row.lastName, row.email, row.mobile)}><h6 >{`${row.firstName} ${row.lastName}`}</h6 ></a></div>,
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
            wrap: true
        },
        {
            name: "Action",
            wrap: true,
            cell: (row) => <div>
                <div className="d-inline-block">
                    <button onClick={() => shareUrlModalShow(row.firstName, row.lastName, row.email, row.mobile, row.gender, row.address, row.city, row.districtName, row.stateName, row.pincode, row.countryName, row.eduQualification, row.instituteName, row.dob)}
                        type="button" class="btn btn-info" disabled={infoLoading.isLoading ? "true" : ""} style={{ marginRight: "6px" }}>
                        {infoLoading.isLoading ? ShareUrlModal.email === row.email ? (<>{t('loading')}</>) : (<><i class="fa fa-info-circle"></i>{t('info')}</>) : (<><i class="fa fa-info-circle"></i>  {t('info')}</>)}
                    </button>
                    {/* in parameter of ApproveAsInstructor previously there is " row.email " */}
                    <button onClick={() => ApproveAsInstructor(row.learnerUsername)} type="button" class="btn btn-primary m-2" style={{ background: "green", color: "white", borderColor: "green" }} disabled={approveLoading.isLoading ? "true" : ""}>
                        {approveLoading.isLoading ? getApproveEmail === row.email ? (<>{t('loading')}</>) : (<> <i class="fa fa-thumbs-up"></i>  {t('approve')}</>) : (<> <i class="fa fa-thumbs-up"></i>  {t('approve')}</>)}
                    </button>
                    {/* {//console.log(row.districtName)} */}

                    <button type="button" onClick={() => onClickReject(row.learnerUsername)} class="btn btn-danger m-2" disabled={rejectLoading.isLoading ? "true" : ""}>
                        {rejectLoading.isLoading ? getRejectEmail === row.email ? (<>{t('loading')}</>) : (<><i class="fa fa-thumbs-down">  {t('reject')}</i></>) : (<><i class="fa fa-thumbs-down">  {t('reject')}</i></>)}
                    </button>
                </div>
            </div >
        }
    ];

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
                                    {t('view_users')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('view_users')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('request_for_instructor')}</li>
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
            {/* ShareUrl model code start here*/}
            {/* <Modal centered show={ShareUrlModal.show} onHide={() => shareUrlModalHide()} >
                <Modal.Body style={{ padding: "0px" }}>
                    dfh
                </Modal.Body>
            </Modal> */}

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
                                <td>{ShareUrlModal.mobile === 0 ? "NA" : `${ShareUrlModal.mobile}`}</td>
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

            <Modal centered show={rejectCondition.show} onHide={() => onHideRejectModel()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('why_u_want_to_reject_instructor_request')}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={onSubmitRejectRemark}>
                    <Modal.Body>

                        {/* <h6>REMARK</h6>
                        <br></br> */}
                        {/* <input type='text' class="form-control" aria-label="With textarea"></input> */}
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">{t('remarks')}</span>
                            </div>
                            <textarea class="form-control" aria-label="With textarea" value={rejectRemark} onChange={onSetRejectRemark} ></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "right" }}>
                        <Button type='submit' variant="success">
                            {t('submit')}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>

    );
}

export default RequestForInstructor;