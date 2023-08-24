
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


export default function ManageCadre() {

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
        getAllCadre();
    }, [])


    const [cadre, setCadre] = useState();

    const getAllCadre = () => {
        adminServices.getAllCadre().then((resp) => {
            setCadre(resp.data);
        }).catch((err) => {
            //console.log(err);
        })
    }

    const [cadreName, setCadreName] = useState();

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
        adminServices.deleteCadre(id).then((resp) => {
            if (resp.data === "Failed") {
                swal(`${t('sorry')}`, `${t('cannot_be_deleted')}`, 'error')
            }
            else if (resp.status == 200) {
                setDeleteLoading({ isLoading: false });
                swal(`${t('success')}`, `${t('cadre_delete')}`, 'success')
                getAllCadre();
            }
            ////console.log(resp.data);
        }).catch((err) => {
            setDeleteLoading({ isLoading: false });
            //console.log(err)
        })
    }

    const [id, setId] = useState();

    const onClickUpdateButton = () => {
        const check = validate();
        if (check) {
            const cadre = {
                cadreId: id,
                cadre: cadreName,
            }
            adminServices.UpdateCadre(cadre).then((resp) => {
                swal(`${t('success')}`, `${t('cadre_add')}`, 'success')
                getAllCadre();
                setAddModalShow(false);
            }).then((err) => {
                //console.log(err);
            })
        }
    }

    const onClickEditButton = (id) => {

        setEditId(id);
        setEditLoading({ isLoading: true });
        adminServices.getCadreById(id).then((resp) => {
            setEditLoading({ isLoading: false });
            setCadreName(resp.data.cadre)
            setId(id);
            setAddModalShow(true);
        }).then((err) => {
            setEditLoading({ isLoading: false });
            //console.log(err)
        })

    }


    const CadreColumns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            wrap: true,
            width: "250px",

        },
        {
            name: "Cadre Name",
            selector: row => row.cadre,
            width: "260px",
            wrap: true,

        },
        {
            name: "Action",
            selector: row => <>
                <Button style={{ marginRight: "5px" }} onClick={() => { onClickEditButton(row.cadreId) }}>
                    {editLoading.isLoading ? getEditId === row.cadreId ? (<>{t('loading')}</>) : (<>  {t('edit')} </>) : (<> {t('edit')} </>)}
                </Button>    <Button className="btn btn-danger" onClick={() => { onClickDeleteButton(row.cadreId) }}>
                    {deleteLoading.isLoading ? getDeleteId === row.cadreId ? (<>{t('loading')}</>) : (<>  {t('delete')}  </>) : (<> {t('delete')}  </>)}
                </Button>
            </>,
            width: "250px",
            right: true,
        }
    ];

    const [addModalShow, setAddModalShow] = useState(false);
    const onClickAdd = () => {
        setId();
        setCadreName();
        setAddModalShow(true);
    }

    const onChangeHandler = (e) => {
        setCadreName(e.target.value)
    }

    const [cadreNameErr, setcadreNameErr] = useState()
    const validate = () => {
        var cadreNameE = "";
        if (!cadreName) {
            cadreNameE = `${t('enter_cadre_name')}`;
            setcadreNameErr(cadreNameE);
        } else if (cadreName.length > 75) {
            cadreNameE = t('text_less_than_12');
            setcadreNameErr(cadreNameE);
        }
        else if (cadreName.length < 2) {
            cadreNameE = t('text_greater_than_3');
            setcadreNameErr(cadreNameE);
        }
        else if (cadreName.match(/^[A-Za-z ]+$/)) {
            cadreNameE = "";
            setcadreNameErr(cadreNameE);
            return true;

        }
        else {
            cadreNameE = t('do_not_use_special_charater');
            setcadreNameErr(cadreNameE);
        }

        return false;
    }

    const onClickAddCadreButton = () => {
        const check = validate()
        if (check) {
            const cadreAdd = {
                cadre: `${cadreName}`
            }
            ////console.log(cadreAdd)
            adminServices.addCadre(cadreAdd).then((resp) => {
                ////console.log(resp.data);
                swal(`${t('success')}`, `${t('cadre_add')}`, 'success')
                getAllCadre();
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
                            <h3 className="page-title">{t('cadre')}</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('registration_details')}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{t('cadre')}</li>
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
                                                                <h4>{t('cadre_list')}</h4>
                                                            </div>
                                                        </div>
                                                        <div className='pt-3'>
                                                            <DataTable
                                                                columns={CadreColumns}
                                                                data={cadre}
                                                                pagination
                                                                customStyles={customStyles}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* <div>
                                                        <div>
                                                            <h4 style={{ textAlign: 'center', }}>{t('cadre_list')}</h4>
                                                        </div>
                                                        <div style={{ float: "right", marginRight: "20px" }}>
                                                            <Button onClick={onClickAdd} style={{ width: "80px" }}> {t('add')} </Button>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <DataTable
                                                        columns={CadreColumns}
                                                        data={cadre}
                                                        pagination
                                                        customStyles={customStyles}
                                                    /> */}
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
                    <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>{t('add_cadre')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3 mt-3">
                        <label for="name">{t('name_s')} : *</label>
                        <input type="text" minLength={2} maxLength={75} class="form-control" placeholder={t('enter_cadre_name')} onChange={onChangeHandler} value={cadreName} />
                        {
                            cadreNameErr
                                ?
                                <div className="alert alert-danger mt-2">
                                    {cadreNameErr}
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
                            <Button variant="secondary" onClick={onClickUpdateButton}> {t('update_cadre')} </Button>
                            :
                            <Button variant="secondary" onClick={onClickAddCadreButton}> {t('add_cadre')}</Button>
                    }
                    {/* <Button variant="secondary" onClick={onClickAddCadreButton}> Add Cadre </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}


