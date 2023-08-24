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
import { Button, Modal } from 'react-bootstrap';
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

function LearnerListToApprove() {

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
    useEffect(() => {
        LearnersDatas();
    }, [getLearnerDataStatus])

    const LearnersDatas = async () => {
        try {
            let result = await adminServices.getAllRequestForLearner()
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

    const [rowEmail, setRowEmail] = useState("")

    const onShowRejectModel = () => {
        setRejectCondition({
            show: true
        })
    }

    const [getApproveEmail, setApproveEmail] = useState("");
    const [getRejectEmail, setRejectEmail] = useState("");


    const ApproveAsLearner = async (email) => {

        setApproveEmail(email);
        setApproveLoading({ isLoading: true });
        // Previously there is an 'email' in Parameter
        // let data = { "rolename": "instructor", "username": email };
        const formData = new FormData();
        formData.append("email", email);
        service.assignLearnerRole(formData).then((resp) => {
            if (resp.data == "Success") {
                swal(`${t('success')}`, `${t('learner_approved')}`, "success");
                setApproveLoading({ isLoading: false });
                setlearnerDataStatus(true);
            }
        }).catch((e) => {
            swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
            //console.log(e)
            setApproveLoading({ isLoading: false });
        })

        // try {
        //     ////console.log(email);
        //     const formData = new FormData();
        //     formData.append("email", email);
        //     let result = await service.assignLearnerRole(formData);
        //     //Previously there is an 'data' in Parameter 
        //     // //console.log(learnerId);
        //     ////console.log(result.data);
        //     if (result.data == "Success") {
        //         await swal(`${t('success')}`, `${t('learner_approved')}`, "success");
        //         // InstructorRequestDatas();
        //         setApproveLoading({ isLoading: false });
        //         setlearnerDataStatus(true);
        //     }
        // } catch (e) {
        //     swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "error")
        //     //console.log(e)
        //     setApproveLoading({ isLoading: false });
        // }
    }



    const [rejectCondition, setRejectCondition] = useState({
        show: false
    })

    const onClickReject = async (email) => {
        setRejectEmail(email);
        setRejectLoading({ isLoading: true });
        onShowRejectModel();
        setRowEmail(email);
    }

    const columns = [
        {
            name: "Learner",
            cell: (row) => <img src={um_api + `getprofilepicforadminverification/${row.profilepicpath}`} style={{ width: '42px', height: '42px', borderRadius: '100%', boxShadow: "5px 10px 20px 1px rgba(0, 0, 0, 0.253)" }} />,
            sortable: true,
            width: "100px",
        },
        // {
        //     name: "S.No",
        //     selector: (row, index) => index + 1,
        //     //width: '100px',
        //     sortable: true,
        // },
        {
            name: "Name",
            selector: row => `${row.firstName} ${row.lastName}`,
            sortable: true,
            wrap: true,
            //width: '150px',
        },
        {
            name: "Email",
            selector: row => row.email,
            wrap: true,
            sortable: true,
        },
        // {
        //     name: "Mobile",
        //     selector: row => row.mobile,
        //     sortable: true,
        // },
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
            name: "Documents",
            //selector: row => row.gpfno,
            sortable: true,
            cell: (row) => <div>
                <div className="d-inline-block">
                    <button
                        onClick={() => viewPhoto(row.profilepicpath, row.email)}
                        type="button" class="btn btn-info m-2" disabled={PhotoLoading.isLoading ? "true" : ""}>
                        {PhotoLoading.isLoading ? PhotoEmail === row.email ? (<><i class="fa fa-spinner fa-spin" style={{ fontSize: '24px' }}></i></>) : (<><i class="fas fa-image fa-2x"></i></>) : (<><i class="fas fa-image fa-2x"></i></>)}
                    </button>
                    <button
                        onClick={() => viewID(row.idproofpicpath, row.email)}
                        type="button" class="btn btn-info m-2" disabled={IDLoading.isLoading ? "true" : ""}>
                        {IDLoading.isLoading ? IDEmail === row.email ? (<><i class="fa fa-spinner fa-spin" style={{ fontSize: '24px' }}></i></>) : (<><i class="fas fa-id-card fa-2x"></i></>) : (<><i class="fas fa-id-card fa-2x"></i></>)}
                    </button>
                </div>

            </div>

        },
        {
            name: "Action",
            sortable: true,
            wrap: true,
            width: '300px',
            cell: (row) => <div>
                <div className="d-inline-block">
                    <button onClick={() => shareUrlModalShow(row.firstName, row.lastName, row.email, row.mobile, row.beltno, row.cadre,
                        row.designation, row.gpfno, row.placeofposting, row.eduQualification, row.dob, row.address,
                        row.idproofpicpath, row.profilepicpath)} style={{ marginRight: "6px" }}
                        type="button" class="btn btn-info" disabled={infoLoading.isLoading ? "true" : ""}>
                        {infoLoading.isLoading ? ShareUrlModal.email === row.email ? (<>{t('loading')}</>) : (<><i class="fa fa-info-circle"></i>  {t('info')}</>) : (<><i class="fa fa-info-circle"></i>  {t('info')}</>)}
                    </button>
                    {/* in parameter of ApproveAsInstructor previously there is " row.email " */}
                    <button onClick={() => ApproveAsLearner(row.email)} type="button" class="btn m-2" style={{ background: "green", color: "white" }} disabled={approveLoading.isLoading ? "true" : ""}>
                        {approveLoading.isLoading ? getApproveEmail === row.email ? (<>{t('loading')}</>) : (<> <i class="fa fa-thumbs-up"></i>  {t('approve')}</>) : (<> <i class="fa fa-thumbs-up"></i>  {t('approve')}</>)}
                    </button>
                    {/* {//console.log(row.districtName)} */}

                    <button type="button" onClick={() => onClickReject(row.email)} class="btn btn-danger m-2" disabled={rejectLoading.isLoading ? "true" : ""}>
                        {rejectLoading.isLoading ? getRejectEmail === row.email ? (<>{t('loading')}</>) : (<><i class="fa fa-thumbs-down">  {t('reject')}</i></>) : (<><i class="fa fa-thumbs-down">  {t('reject')}</i></>)}
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

    const [ShareUrlModal, setShareUrlModal] = useState({
        show: false
    });

    const [infoLoading, setInfoLoading] = useState({
        isLoading: false
    })


    const shareUrlModalHide = () => {
        setShareUrlModal({ show: false });
        setInfoLoading({ isLoading: false });
    }
    const shareUrlModalShow = (firstName, lastName, email, mobile, beltno, cadre, designation, gpfno, placeofposting, eduQualification, dob, address,
        idproofpicpath, profilepicpath) => {
        setInfoLoading({ isLoading: true });
        setShareUrlModal({
            show: true,
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            beltno: beltno,
            cadre: cadre,
            designation: designation,
            gpfno: gpfno,
            placeofposting: placeofposting,
            eduQualification: eduQualification,
            address: address,
            dob: dob,
            idproofpicpath: idproofpicpath,
            profilepicpath: profilepicpath
        });
    }

    const [getViewID, setViewID] = useState({
        show: false
    });
    const [getViewPhoto, setViewPhoto] = useState({
        show: false
    });
    const [IDLoading, setIDLoading] = useState({
        isLoading: false
    })
    const [PhotoLoading, setPhotoLoading] = useState({
        isLoading: false
    })

    const [PhotoEmail, setPhotoEmail] = useState();
    const [IDEmail, setIDEmail] = useState();

    const IDCardHide = () => {
        setViewID({ show: false });
        setIDLoading({ isLoading: false });
        //setInfoLoading({ isLoading: false });
    }
    const ProfilePicHide = () => {
        setViewPhoto({ show: false });
        setPhotoLoading({ isLoading: false });
        //setInfoLoading({ isLoading: false });
    }
    const viewPhoto = (profilepicpath, email) => {
        setPhotoEmail(email);
        setPhotoLoading({ isLoading: true });
        setViewPhoto({
            show: true,
            profilepicpath: profilepicpath,
        });
    }
    const viewID = (idproofpicpath, email) => {
        setIDEmail(email);
        setIDLoading({ isLoading: true });
        setViewID({
            show: true,
            idproofpicpath: idproofpicpath,
        });
    }
    const onHideRejectModel = () => {
        setRejectCondition({
            show: false
        })
        setRejectRemark("");

    }
    const onSetRejectRemark = (event) => {
        setRejectRemark(event.target.value)
    }

    const [rejectRemark, setRejectRemark] = useState("");

    const onSubmitRejectRemark = async (event) => {
        event.preventDefault();

        try {
            ////console.log(rowEmail);
            const formData = new FormData();
            formData.append("email", rowEmail);
            let result = await service.rejectLearnerRole(formData);
            //Previously there is an 'data' in Parameter 
            // //console.log(learnerId);
            ////console.log(result.data);
            if (result.data == "success") {
                await swal(`${t('success')}`, `${t('learner_rejected_successfully')}`, "success");
                // InstructorRequestDatas();
                setRejectLoading({ isLoading: false });
                setlearnerDataStatus(true);
                onHideRejectModel();
            }
        } catch (e) {
            swal(`${t('error')}`, `${t('something_wrong_try_again')}`, "success");
            //console.log(e)
            setRejectLoading({ isLoading: false });
            onHideRejectModel();
        }
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
                                    {t('request_for_learners')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('learners')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('view_learner')}</li>
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
            <Modal centered show={ShareUrlModal.show} onHide={() => shareUrlModalHide()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('user_details')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table table-borderless">
                        <tbody>
                            {/* <tr>
                                <td sm={4}></td>
                                
                                <td sm={4}>
                                    {<>
                                    <img src={um_api + `getidforadminverification/${ShareUrlModal.profilepicpath}`} style={{ width: '120px', height: '120px', borderRadius: '10px', boxShadow: "2px 5px 10px 1px rgba(0, 0, 0, 0.253)", border:"0px" }} />
                                    </>}
                                </td>
                                <td sm={4}></td>
                            </tr> */}
                            <tr>
                                <td>Name : </td>
                                <td>{ShareUrlModal.firstName} {ShareUrlModal.lastName}</td>
                            </tr>
                            <tr>
                                <td>Date Of Birth : </td>
                                <td>{ShareUrlModal.dob === null ? "NA" : `${moment(ShareUrlModal.dob).format('MM-DD-YYYY')}`}</td>
                            </tr>
                            <tr>
                                <td>Qualification : </td>
                                {
                                    ShareUrlModal.eduQualification === null
                                        ?
                                        <td>NA</td>
                                        :
                                        <td>{ShareUrlModal.eduQualification} </td>
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
                            <tr>
                                <td>Regiment/Belt Number : </td>
                                <td>{ShareUrlModal.beltno}</td>
                            </tr>
                            <tr>
                                <td>GPF/CPF Number : </td>
                                <td>{ShareUrlModal.gpfno}</td>
                            </tr>
                            <tr>
                                <td>Designation:  : </td>
                                <td>{ShareUrlModal.designation}</td>
                            </tr>
                            <tr>
                                <td>Cadre: </td>
                                <td>{ShareUrlModal.cadre}</td>
                            </tr>
                            <tr>
                                <td>Place of Posting: </td>
                                <td>{ShareUrlModal.placeofposting}</td>
                            </tr>
                            <tr>
                                {/* <td>Address : </td>
                                {
                                    ShareUrlModal.address === null && ShareUrlModal.district === "PLEASE SELECT DISTRICT" && ShareUrlModal.state === "Please Select State" &&
                                    ShareUrlModal.country === "Please Select Country" && ShareUrlModal.pincode === 0 
                                    ?<td>NA</td>
                                    :
                                    <td>{(ShareUrlModal.address === null) ? "NA" : `${ShareUrlModal.address}`} ,{ShareUrlModal.district === "PLEASE SELECT DISTRICT" ? "NA" : `${ShareUrlModal.district}`} , {ShareUrlModal.state === "Please Select State" ? "NA" : `${ShareUrlModal.state}`} , {ShareUrlModal.pincode} , {ShareUrlModal.country === "Please Select Country" ? "NA" : `${ShareUrlModal.country}`} </td>
                                }     */}
                                {/* <td>Address : </td>
                                <td>{(ShareUrlModal.address === null) ? "NA" : `${ShareUrlModal.address}`} </td>                             */}
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

            <Modal centered show={getViewID.show} onHide={() => IDCardHide()} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('id_card')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{ textAlign: "center" }}>
                        {getViewID.idproofpicpath && (
                            <img
                                className="img-fluid rounded"
                                src={um_api + `getidforadminverification/${getViewID.idproofpicpath}`}
                                style={{ maxWidth: '100%' }}
                            />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "right" }}>
                    <Button variant="secondary" onClick={() => IDCardHide()}>
                        {t('cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal centered show={getViewPhoto.show} onHide={() => ProfilePicHide()} backdrop="static" size="md">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                        {t('photo')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{ textAlign: "center" }}>
                        {getViewPhoto.profilepicpath && (
                            <img
                                className="img-fluid rounded"
                                src={um_api + `getprofilepicforadminverification/${getViewPhoto.profilepicpath}`}
                                style={{ maxWidth: '100%' }}
                            />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "right" }}>
                    <Button variant="secondary" onClick={() => ProfilePicHide()}>
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

export default LearnerListToApprove;