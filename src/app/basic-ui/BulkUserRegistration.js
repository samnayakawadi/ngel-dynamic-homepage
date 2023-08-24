import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import React, { useEffect, useState, useMemo } from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import { Button } from 'react-bootstrap';
import adminServices from '../../services/adminServices';
import UserService from '../../services/UserService';
import DataTable from "react-data-table-component";
import FilterDataTable from '../../pages/instructor/FilterDataTable';

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


function BulkUserRegistration() {
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

    let userId = UserService.getUserid();
    const [bulkUploaddData, setBulkUploadData] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(false);
    const [tableVisible, setTableVisible] = useState(false);
    const [getLoading, setLoading] = useState();
    const [getFileData, setFileData] = useState({
        fileName: '',
        fileData: ''
    })
    const bulkUploadFileHandler = (e) => {
        setSelectedFiles(true);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFileData({
                ...getFileData,
                fileData: file,
                fileName: file.name
            });

        }
        reader.readAsDataURL(file)

    }

    const uploadFileData = async () => {
        setLoading(true)
        try {
            ////console.log(getFileData);
            let result = await adminServices.bulkUserUpload(getFileData.fileData, userId);
            if (result.status == 200) {
                setLoading(false);
                setBulkUploadData(result.data);
                setTableVisible(true);
                setFileData({
                    ...getFileData,
                    fileData: '',
                    fileName: ''
                });
                document.getElementById("chooseFile").value = null
            } else {
                //console.log("fail to load data")
            }
            ////console.log(result.data)
        } catch (error) {
            //console.log(error);
            setLoading(false);
            setFileData({
                ...getFileData,
                fileData: '',
                fileName: ''
            });
            document.getElementById("chooseFile").value = null
        }

    }

    const columns = [
        {
            name: "Email Id",
            selector: row => row.emailId,
            sortable: true,
            wrap: true,
        },
        {
            name: "First Name",
            selector: row => row.firstName,
            sortable: true,
            wrap: true
        },
        {
            name: "Last Name",
            selector: row => row.lastName,
            sortable: true
        },
        {
            name: "Mobile No",
            selector: row => row.mobileNo,
            sortable: true,
            wrap: true
        },
        {
            name: "Remark",
            selector: row => row.remark,
            sortable: true,
            wrap: true
        },
        {
            name: "Status",
            selector: row => <span>{row.status == "Success" ? <span style={{ color: 'green' }}>{row.status}</span> : <span style={{ color: 'red' }}>{row.status}</span>}</span>,
            sortable: true
        }
    ];

    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const filteredItems = bulkUploaddData.filter(
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
                                    {t('bulk_user_registration')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('user_registration')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page"> {t('bulk_user_registration')}</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div class="container" style={{ marginLeft: '0px' }}>
                                            <div class="row">
                                                <div class="col-lg" style={{ marginLeft: '-10px' }}>
                                                    <h5><b>{t('instructions_for_bulk_user_registrations')} :</b></h5>
                                                    <br></br>
                                                    <ol style={{ marginLeft: '15px' }}>
                                                        <li>{t('bulk_description')}</li>
                                                        <li>{t('bulk_description2')}</li>
                                                    </ol>
                                                    <div class="input-group input-file">
                                                        <span class="input-group-addon">
                                                            <a class='btn btn-primary'>
                                                                {t('choose_file')}
                                                                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="chooseFile"
                                                                    onChange={(e) => bulkUploadFileHandler(e)} name="field_name"
                                                                    style={{ "position": "absolute", "zIndex": "2", "top": "0", "left": "0", "filter": "alpha(opacity=0)", "MsFilter": "\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"", "opacity": "0", "backgroundColor": "transparent", "color": "transparent" }} />
                                                            </a>
                                                        </span>
                                                        <span style={{
                                                            display: "inline",
                                                            marginTop: '10px',
                                                            marginLeft: '10px',
                                                            lineHeight: "1",
                                                            color: "black",
                                                            textAlign: "center",
                                                            whiteSpace: "nowrap",
                                                            verticalAlign: "baseline",
                                                            borderRadius: "0.25em",
                                                        }}>{getFileData.fileName}</span>
                                                    </div>
                                                    {getLoading ?
                                                        <div style={{ marginTop: '10px' }}>
                                                            <button class="btn btn-primary" type="button" disabled>
                                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                {t('loading')}
                                                            </button>
                                                        </div> :
                                                        <div style={{ marginTop: '10px' }}>
                                                            <Button disabled={!selectedFiles} onClick={() => uploadFileData()} variant="primary">{t('upload')}</Button>
                                                        </div>
                                                    }

                                                </div>
                                                <div class="col-lg text-right">
                                                    <Button href={process.env.PUBLIC_URL + `/assets/images/register.xlsx`}
                                                        target="_blank" variant="warning">{t('download_the_template')}</Button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {tableVisible ? <div className="col-lg-12 grid-margin stretch-card">
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
                            </div> : null}
                        </div>
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div >
    );
}

export default BulkUserRegistration;