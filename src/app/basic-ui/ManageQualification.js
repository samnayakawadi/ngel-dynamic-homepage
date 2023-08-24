import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import StickyMenu from '../../components/common/StickyMenu';
import adminServices from '../../services/adminServices';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import UserService from '../../services/UserService';
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
            fontWeight: '900px',
        }
    },
    headCells: {
        style: {
            fontSize: '17px',
            fontWeight: '500px',
            //paddingLeft: '0 8px',
            //marginLeft: '10px',
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

export default function ManageQualification() {

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
        getAllQualification();
    }, [])


    const [qualification, setQualification] = useState();

    const getAllQualification = () => {
        adminServices.getAllQualification().then((resp) => {
            setQualification(resp.data);
        }).catch((err) => {
            //console.log(err);
        })
    }

    const [qualificationName, setQualificationName] = useState();

    const [getDeleteId, setDeleteId] = useState("");
    const [getEditId, setEditId] = useState("");

    const [deleteLoading, setDeleteLoading] = useState({
        isLoading: false
    })

    const [editLoading, setEditLoading] = useState({
        isLoading: false
    })


    const onClickDeleteButton = (id) => {

        setDeleteId(id);
        setDeleteLoading({ isLoading: true });
        adminServices.deleteQualification(id).then((resp) => {
            if(resp.data == "Failed"){
            swal(`${t('sorry')}`, `${t('cannot_be_deleted')}`, 'success')

            }
            else if(resp.status == 200){
                setDeleteLoading({ isLoading: false });
                ////console.log(resp.data);
                swal(`${t('success')}`, `${t('qualification_delete')}`, 'success')
                getAllQualification();
            }
        }).catch((err) => {
            setDeleteLoading({ isLoading: false });
            //console.log(err)
        })
    }

    const [id, setId] = useState();

    const onClickUpdateButton = () => {
        const check = validate();
        if (check) {
            const qualification = {
                qualId: id,
                qualification: qualificationName,
            }
            adminServices.UpdateQualification(qualification).then((resp) => {
                swal(`${t('success')}`, `${t('qualification_add')}`, 'success')
                getAllQualification();
                setAddModalShow(false);
            }).then((err) => {
                //console.log(err);
            })
        }
    }

    const onClickEditButton = (id) => {

        setEditId(id);
        setEditLoading({ isLoading: true });

        adminServices.getQualificationById(id).then((resp) => {
            setEditLoading({ isLoading: false });
            setQualificationName(resp.data.qualification)
            setId(id);
            setAddModalShow(true);
        }).then((err) => {
            setEditLoading({ isLoading: false });
            //console.log(err)
        })

    }


    const QualificationColumns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            wrap: true,
            width: "250px",

        },
        {
            name: "Qualification Name",
            selector: row => row.qualification,
            width: "260px",
            wrap: true,

        },
        {
            name: "Action",
            selector: row => <>
                <Button style={{ marginRight: "5px" }} onClick={() => { onClickEditButton(row.qualId) }}>
                    {editLoading.isLoading ? getEditId === row.qualId ? (<> {t('loading')}</>) : (<>  {t('edit')} </>) : (<> {t('edit')} </>)}
                </Button>       <Button className="btn btn-danger" onClick={() => { onClickDeleteButton(row.qualId) }}>
                    {deleteLoading.isLoading ? getDeleteId === row.qualId ? (<>{t('loading')}</>) : (<>  {t('delete')}  </>) : (<> {t('delete')}  </>)}
                </Button>
            </>,
            width: "250px",
            right: true,

        }
    ];

    const [addModalShow, setAddModalShow] = useState(false);
    const onClickAdd = () => {
        setId();
        setQualificationName();
        setAddModalShow(true);
    }

    const onChangeHandler = (e) => {
        setQualificationName(e.target.value)
    }

    const [qualificationNameErr, setqualificationNameErr] = useState()
    const validate = () => {
        var qualificationNameE = "";
        if (!qualificationName) {
            qualificationNameE = `${t('please_enter_qualification_name')}`
            setqualificationNameErr(qualificationNameE)
        }
        else if (qualificationName.length > 50) {
            qualificationNameE = t('text_less_than_50');
            setqualificationNameErr(qualificationNameE)
        }
        else if (qualificationName.length < 2) {
            qualificationNameE = t('text_greater_than_3');
            setqualificationNameErr(qualificationNameE)
        }
        else if (qualificationName.match(/^[A-Za-z ]+$/)) {
            qualificationNameE = "";
            setqualificationNameErr(qualificationNameE)
            return true;
        }
        else {
            qualificationNameE = t('do_not_use_special_charater');
            setqualificationNameErr(qualificationNameE)
            return false;
        }
    }

    const onClickAddQualificationButton = () => {
        const check = validate()
        if (check) {
            const qualificationAdd = {
                qualification: `${qualificationName}`
            }
            ////console.log(qualificationAdd)
            adminServices.addQualification(qualificationAdd).then((resp) => {
                ////console.log(resp.data);
                swal(`${t('success')}`, `${t('qualification_add')}`, 'success')
                getAllQualification();
                setAddModalShow(false)
            }).catch((err) => {
                //console.log(err)
            })
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
                        <div className="page-header">
                            <h3 className="page-title">{t('manage_qualification')}</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('registration_details')}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{t('manage_qualification')}</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <Col lg="12">
                                    <Row >
                                        <Col>
                                            <div>
                                                <br></br>
                                                <Card>
                                                    <div>
                                                        <div className="col-md-12 text-right w-100 p-0">
                                                            <Button className='btn' onClick={onClickAdd} style={{ width: "60px" }}> {t('add')} </Button>
                                                        </div>
                                                        <div className="row pb-5">
                                                            <div className="col-md-12 text-center mb-3">
                                                                <h4>{t('qualification_list')}</h4>
                                                            </div>
                                                        </div>
                                                        <div className='pt-3'>
                                                            <DataTable
                                                                columns={QualificationColumns}
                                                                data={qualification}
                                                                pagination
                                                                customStyles={customStyles}
                                                            />
                                                        </div>
                                                    </div>
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
            <Modal centered show={addModalShow} onHide={() => { setAddModalShow(false) }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>{t('add_qualification')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3 mt-3">
                        <label for="name">{t('name')} : *</label>
                        <input type="text" minLength={2} maxLength={50} class="form-control" placeholder={t('please_enter_qualification_name')} onChange={onChangeHandler} value={qualificationName} />
                        {
                            qualificationNameErr
                                ?
                                <div className="alert alert-danger mt-2">
                                    {qualificationNameErr}
                                </div>
                                :
                                <>
                                </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer >
                    {
                        id
                            ?
                            <Button variant="secondary" onClick={onClickUpdateButton}> {t('update_qualification')} </Button>
                            :
                            <Button variant="secondary" onClick={onClickAddQualificationButton}>{t('add_qualification')} </Button>
                    }
                    {/* <Button variant="secondary" onClick={onClickAddQualificationButton}> Add Qualification </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}
