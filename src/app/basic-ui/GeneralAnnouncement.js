import React from 'react';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import StickyMenu from '../../components/common/StickyMenu';
import { useState, useEffect, useMemo } from 'react';
import service from '../../services/service';
import DataTable from "react-data-table-component";
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import UserService from '../../services/UserService';
import swal from 'sweetalert';
import { Row, Col, Button } from 'react-bootstrap';
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

function GeneralAnnouncement() {
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

    let UserId = UserService.getUserid();

    const [announcementDetails, setAnnouncementDetails] = useState([]);
    const [announcementDiv, setAddAnnouncementDiv] = useState(false);
    useEffect(() => {
        AnnouncementData();
    }, [])

    const AnnouncementData = async () => {
        try {
            let result = await service.getAllGeneralAnnouncementListByAuthor(UserId);
            setAnnouncementDetails(result.data);
        } catch (error) {
            //console.log(error);
        }
    }

    const convertDate = (dateFormat) => {
        let timestamp = Date.parse(dateFormat);
        let date = new Date(timestamp);
        let d = date.toLocaleString('en-IN', { hour12: false, timeZone: 'IST' });
        return d;
    }

    const dateConvertToTformate = (value) => {
        var date = new Date(value);
        var str = '';
        var year, month, day, hour, min, sec;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        day = date.getDate();
        day = day < 10 ? '0' + day : day;
        hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        min = date.getMinutes();
        min = min < 10 ? '0' + min : min;
        sec = date.getSeconds();
        sec = sec < 10 ? '0' + sec : sec;

        str += year + '-' + month + '-' + day;
        str += 'T' + hour + ':' + min + ':' + sec;
        return str;
    }

    const deleteAnnouncement = (id) => {
        swal({
            title: `${t('swal_title')}`,
            text: `${t('swal_text')}`,
            icon: "warning",
            buttons: [
                t('no_cancel'),
                t('yes_delete')
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                service.deleteAnnouncement(id)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('delete')}`, `${t('general_announcement_deleted')}`, "success");
                            AnnouncementData();
                            reset();
                            setAddAnnouncementDiv(false);
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        });
    }

    const editAnnouncement = (id, title, titledesc, publishFrom, publishUpto) => {
        setAddAnnouncementDiv(true)
        let data = {
            id: id,
            title: title,
            titledesc: titledesc,
            publishfrom: dateConvertToTformate(publishFrom),
            publishupto: dateConvertToTformate(publishUpto),
        }
        setAnnouncementData(data)
    }

    const columns = [
        {
            name: "Title",
            selector: row => row.title,
            sortable: true,
            wrap: true,
        },
        {
            name: "Title Description",
            selector: row => row.body,
            sortable: true,
            wrap: true,
        },
        {
            name: "Publish From",
            // selector: row => convertDate(row.publihFrom),
            selector: row => moment(row.publihFrom).format('DD-MM-yyyy'),
            // selector: row => moment(convertDate(row.publihFrom)).format('MM-DD-YYYY'),
            sortable: true,
            wrap: true
        },
        {
            name: "Publish Upto",
            // selector: row => convertDate(row.publishUpto),
            selector: row => moment(row.publishUpto).format('DD-MM-yyyy'),
            sortable: true,
            wrap: true
        },
        {
            name: "Action",
            sortable: true,
            wrap: true,
            cell: (row) => <div>
                <button className='btn btn-primary m-3' onClick={() => editAnnouncement(row.id, row.title, row.body, row.publihFrom, row.publishUpto)}><i class="fas fa-edit"></i> </button>
                <button className='btn btn-danger' onClick={() => deleteAnnouncement(row.id)}><i class="fas fa-trash"></i> </button>
            </div>
        }
    ];

    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const filteredItems = announcementDetails.filter(
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

    const initialState = {
        title: '',
        titleError: '',
        titledesc: '',
        titledescError: '',
        publishfrom: '',
        publishfromError: '',
        publishupto: '',
        publishuptoError: '',
    }
    const [announcementData, setAnnouncementData] = useState(initialState)

    const formVlaidate = () => {
        let titleError = '';
        let titledescError = '';
        let publishfromError = '';
        let publishuptoError = '';

        if (!announcementData.title) {
            titleError = t('title_is_required_field');
        } else if (announcementData.title.match(/^[A-Za-z0-9 ]+$/)) {
            titleError = '';
        } else if (announcementData.title.length > 100) {
            titleError = t('title_must_100_char');
        } else {
            titleError = t('alpha_digit_space_allowed');
        }


        if (!announcementData.titledesc) {
            titledescError = t('title_description_required_field');
        } else if (announcementData.titledesc.match(/[A-Za-z0-9&., ]+$/)) {
            titledescError = '';
        } else if (announcementData.titledesc.length > 500) {
            titledescError = t('max_500_character');
        } else {
            titledescError = t('alpha_digit_space_allowed');
        }


        if (!announcementData.publishfrom) {
            publishfromError = t('this_is_required_field');
        }
        if (!announcementData.publishupto) {
            publishuptoError = t('this_is_required_field');
        }
        if (titleError || titledescError || publishfromError || publishuptoError) {
            setAnnouncementData({ ...announcementData, titleError, titledescError, publishfromError, publishuptoError });
            return false;
        }
        return true;
    }

    const reset = () => {
        setAnnouncementData({
            title: "",
            titledesc: "",
            publishfrom: "",
            publishupto: ''
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isValidate = formVlaidate();
        if (announcementData.id) {
            if (isValidate) {
                let data = {
                    "title": announcementData.title, "body": announcementData.titledesc, "publihFrom": announcementData.publishfrom,
                    "publishUpto": announcementData.publishupto, "courseId": "", "createdAt": new Date().toISOString(), "createdBy": UserId,
                    "readStatus": "string", "type": 1, "id": announcementData.id
                };
                ////console.log(data);
                service.updateAnnouncement(announcementData.id, data)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('updated')}`, `${t('general_announcement_updated_sucessfully')}`, "success");
                            AnnouncementData();
                            setAddAnnouncementDiv(false);
                        } else {
                            //console.log("something is wrong")
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
        } else {
            if (isValidate) {
                let data = {
                    "title": announcementData.title, "body": announcementData.titledesc, "publihFrom": announcementData.publishfrom,
                    "publishUpto": announcementData.publishupto, "courseId": "", "createdAt": new Date().toISOString(), "createdBy": UserId,
                    "readStatus": "string", "type": 1
                };
                ////console.log(data);
                service.createAnnouncement(data)
                    .then(async res => {
                        if (res.status === 200) {
                            await swal(`${t('created')}`, `${t('general_announcement_created_sucessfully')}`, "success");
                            AnnouncementData();
                            setAddAnnouncementDiv(false);
                        } else {
                            //console.log("something is wrong")
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }
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
                                    {t('announcement')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}> {t('announcement')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('general_announcement')}</li>
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
                                <div className="d-flex justify-content-center">
                                    <Button onClick={() => [reset(), setAddAnnouncementDiv(true)]}>{t('add_announcement')}</Button>
                                </div>
                            </div>
                        </div>
                        {announcementDiv ?
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card shadow-sm border-0  ">
                                    <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>{announcementData.id ? t('update_announcement') : t('add_announcement')}</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                                            <div className="form-group">
                                                <label className="mb-0">{t('tittle')}<span className="text-danger">*</span></label>
                                                <input name="title" type="text" minLength={5} maxLength={100} value={announcementData.title} className="form-control" placeholder={t('enter_title')} onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                                                />
                                                {announcementData.titleError
                                                    ? <div className="alert alert-danger mt-2">{announcementData.titleError}</div>
                                                    : ''
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label className="mb-0">{t('description')}<span className="text-danger">*</span></label>
                                                <textarea name="titledesc" type="text" minLength={5} maxLength={500} value={announcementData.titledesc} className="form-control" placeholder={t('enter_title_desc')} onChange={(e) => setAnnouncementData({ ...announcementData, titledesc: e.target.value })}
                                                />
                                                {announcementData.titledescError
                                                    ? <div className="alert alert-danger mt-2">{announcementData.titledescError}</div>
                                                    : ''
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label className="mb-0">{t('publish_from')}<span className="text-danger">*</span></label>
                                                <input name="publishfrom" type="datetime-local" value={announcementData.publishfrom} className="form-control" placeholder={t('enter_date')} onChange={(e) => setAnnouncementData({ ...announcementData, publishfrom: e.target.value })}
                                                />
                                                {announcementData.publishfromError
                                                    ? <div className="alert alert-danger mt-2">{t('date_required_field')}</div>
                                                    : ''
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label className="mb-0">{t('publish_upto')}<span className="text-danger">*</span></label>
                                                <input name="publishupto" type="datetime-local" min={announcementData.publishfrom} value={announcementData.publishupto} className="form-control" placeholder={t('enter_date')} onChange={(e) => setAnnouncementData({ ...announcementData, publishupto: e.target.value })}
                                                />
                                                {announcementData.publishuptoError
                                                    ? <div className="alert alert-danger mt-2">{t('date_required_field')}</div>
                                                    : ''
                                                }
                                            </div>
                                            <div>
                                                <Button type="submit" className="btn btn-primary pull-left w-10 mr-2">{announcementData.id ? t('update') : t('add')}</Button>
                                                {announcementData.id ? '' :
                                                    < Button type="reset" onClick={() => reset()} className="btn btn-primary w-10">{t('reset')}</Button>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            : ''}

                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div >
    );
}

export default GeneralAnnouncement;
