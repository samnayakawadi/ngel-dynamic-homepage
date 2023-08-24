import React, { useEffect, useMemo, useState } from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';
import { Button, Card, Container, Row } from 'react-bootstrap';
import service from '../../services/service';
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
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


function EventHandling() {

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
        getAllEvent();
    }, [])

    const [eventFieldData, setEventFieldData] = useState({
        eventId: '',
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
    })
    const [eventFieldError, setEventFieldError] = useState({
        titleError: '',
        descriptionError: '',
        dateError: '',
        timeError: '',
        locationError: '',
    })

    const onResetEventFieldError = () => {
        setEventFieldError({
            ...eventFieldError,
            titleError: '',
            descriptionError: '',
            dateError: '',
            timeError: '',
            locationError: '',
        })
    }

    const eventValidation = () => {
        var titleErr = ''
        var descriptionErr = ''
        var dateErr = ''
        var timeErr = ''
        var locationErr = ''

        if (!eventFieldData.title) {
            titleErr = `${t('title_required')}`
        } else if (eventFieldData.title.match(/[A-Za-z0-9&., ]+$/)) {
            titleErr = '';
        } else if (eventFieldData.title.length < 2) {
            titleErr = t('min_2_char_required');
        } else if (eventFieldData.title.length > 100) {
            titleErr = t('max_100_char_required');
        } else {
            titleErr = t('alpha_digit_space_allowed');
        }


        if (!eventFieldData.description) {
            descriptionErr = `${t('description_required')}`
        } else if (eventFieldData.description.match(/[A-Za-z0-9&., ]+$/)) {
            descriptionErr = '';
        } else if (eventFieldData.description.length < 5) {
            descriptionErr = t('min_5_char_error');
        } else if (eventFieldData.description.length > 500) {
            descriptionErr = t('max_500_character');
        } else {
            descriptionErr = t('alpha_digit_space_allowed');
        }


        if (!eventFieldData.date) {
            dateErr = `${t('date_field_required')}`
        }
        if (!eventFieldData.time) {
            timeErr = `${t('timming_field_required')}`
        }
        if (!eventFieldData.location) {
            locationErr = `${t('location_field_required')}`
        } else if (eventFieldData.location.match(/^[A-Za-z0-9&., ]+$/)) {
            descriptionErr = '';
        } else if (eventFieldData.location.length < 2) {
            descriptionErr = t('text_min_2_char');
        } else if (eventFieldData.location.length > 150) {
            descriptionErr = t('text_min_150_char');
        } else {
            descriptionErr = t('alpha_digit_space_allowed');
        }


        if (titleErr || descriptionErr || dateErr || timeErr || locationErr) {
            setEventFieldError({
                ...eventFieldError,
                titleError: titleErr,
                descriptionError: descriptionErr,
                dateError: dateErr,
                timeError: timeErr,
                locationError: locationErr,
            })
            return false;
        }

        return true;
    }


    const [eventList, setEventList] = useState([]);
    const getAllEvent = () => {
        service.getAllEventList().then((resp) => {
            setEventList(resp.data);
            ////console.log(resp.data)
        }).catch((err) => {
            //console.log(err);
        })
    }

    const customStyles = {
        title: {
            style: {
                fontColor: 'red',
                fontWeight: '900',
            }
        },

        rows: {
            style: {
                minHeight: '72px'
            },
        },

        headCells: {
            style: {

                widthRight: '8px',
                widthLeft: '8px',
                // paddingLeft: '8px', // override the cell padding for head cells
                // paddingRight: '8px',
                fontSize: '17px',
                // fontWeight: '500',
                // textTransform: 'uppercase',
                // paddingLeft: '0 8px',
                // marginLeft: '10px',
            },
        },
        cells: {
            style: {
                widthRight: '8px',
                widthLeft: '8px',
                // paddingLeft: '8px', // override the cell padding for data cells
                // paddingRight: '8px',
                fontSize: '15px',
                // paddingLeft: '0 8px',
                // marginLeft: '10px'
            },
        },
    };

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const filteredEventList = eventList.filter(
        item =>
            item.title
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
    const columnViewEventList = [
        {
            name: "Title",
            selector: row => row.title,
            wrap: true,

        },
        {
            name: "Description",
            selector: row => row.description,
            wrap: true,

        },
        {
            name: "Date",
            selector: (row) => <>
                {/* <p>{row.eventDate}</p><br /> */}
                <p>{row.eventDate}</p><br />
                <p>{row.time}</p><br />
            </>,
            wrap: true,

        },
        {
            name: "Location",
            selector: row => row.title,
            wrap: true,

        },
        {
            name: "Action",
            cell: row => <>
                <button className='btn btn-primary' style={{ marginRight: '5px' }} onClick={() => { onClickEditEvent(row.eventId, row.title, row.description, row.location, row.eventDate, row.time) }} ><i class="fas fa-edit"></i> </button>
                <button className='btn btn-danger' onClick={() => { onClickDeleteEvent(row.eventId) }} ><i class="fas fa-trash"></i> </button>
            </>

        }
    ]

    const onChangeHandler = (event) => {
        setEventFieldData({
            ...eventFieldData,
            [event.target.name]: event.target.value
        })
    }

    const onClickAddUpdateButton = (e) => {

        if (!eventFieldData.eventId) {
            ////console.log("NO EVENT ID ------")
            const validate = eventValidation();
            if (validate) {
                var date = new Date(eventFieldData.date).getDate();
                var date1 = date < 10 ? '0' + date : date;
                var month = (new Date(eventFieldData.date).getMonth()) + 1;
                var year = new Date(eventFieldData.date).getFullYear();
                const eventData = {
                    description: eventFieldData.description,
                    eventDate: `${date1}-${month}-${year}`,
                    eventId: 0,
                    location: eventFieldData.location,
                    time: eventFieldData.time,
                    title: eventFieldData.title,
                }
                service.addEvent(eventData).then((resp) => {
                    if (resp.status == 201) {
                        swal(`${t('success')}`, `${t('event_added')}`, 'success');
                        getAllEvent();
                        onClickReset();
                        onResetEventFieldError();
                    }
                })
            }
        }

        else {
            const validate = eventValidation();
            if (validate) {
                var date = new Date(eventFieldData.date).getDate();
                var date1 = date < 10 ? '0' + date : date;
                var month = (new Date(eventFieldData.date).getMonth()) + 1;
                var year = new Date(eventFieldData.date).getFullYear();
                var time = eventFieldData.time.split(':')
                // var hour = new Date(eventFieldData.time).getHours();
                // var minute = new Date(eventFieldData.time).getMinutes();
                // var min1 = minute <10 ? '0'+minute : minute
                // var hr1 = hour < 10 ? '0'+hour : hour;
                const eventData = {
                    description: eventFieldData.description,
                    eventDate: `${date1}-${month}-${year}`,
                    eventId: eventFieldData.eventId,
                    location: eventFieldData.location,
                    time: eventFieldData.time,
                    title: eventFieldData.title,
                }
                ////console.log(eventData);
                service.updateEvent(eventData).then((resp) => {
                    if (resp.status == 200) {
                        swal(`${t('success')}`, `${t('event_update')}`, 'success');
                        getAllEvent();
                        setEventFieldData({
                            ...eventFieldData,
                            eventId: '',
                            title: '',
                            description: '',
                            date: '',
                            time: '',
                            location: '',
                        })
                        onResetEventFieldError();
                    }
                })
                // service.updateEvent(eventData.description, eventData.eventDate, eventData.eventId, eventData.location, eventData.time, eventData.title).then((resp) => {
                //     if (resp.status == 204) {
                //         swal('Success', 'Event Added Successfully', 'success');
                //         getAllEvent();
                //         resetId();
                //         onClickReset();
                //         onResetEventFieldError();
                //     }
                // })
            }


        }



    }

    const onClickEditEvent = (id, title, description, location, date, time) => {
        ////console.log(id);
        const dateSplit = date.split('-');
        ////console.log(dateSplit);
        setEventFieldData({
            ...eventFieldData,
            eventId: id,
            title: title,
            description: description,
            location: location,
            date: `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`,
            time: time,
        })
    }


    const onClickReset = () => {
        setEventFieldData({
            ...eventFieldData,
            title: '',
            date: '',
            time: '',
            location: '',
            description: ''

        })
        onResetEventFieldError();
    }

    const onClickDeleteEvent = (eventId) => {
        service.deleteEvent(eventId).then((resp) => {
            if (resp.status == 200) {
                swal(`${t('deleted')}`, `${t('event_deleted')}`, 'success');
                getAllEvent();
            }
        }).catch((err) => {
            //console.log(err);
        })
    }



    return (
        <>
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
                                        {t('events')}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <Container>
                                            <form autoComplete="off">
                                                <div className="form-group">
                                                    <label className="mb-0">{t('event_title')}<span className="text-danger">*</span></label>
                                                    <input name="title" type="text" minLength={2} maxLength={100} className="form-control" value={eventFieldData.title} onChange={onChangeHandler} placeholder={t('enter_event_title')} />
                                                    {
                                                        eventFieldError.titleError
                                                            ?
                                                            <>
                                                                <div className="alert alert-danger mt-2">{eventFieldError.titleError}</div>
                                                            </>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                </div>

                                                <div className='row justify-content-between' style={{ margin: '0px' }}>
                                                    <div >
                                                        <div className="form-group">
                                                            <label className="mb-0">{t('event_date')}<span className="text-danger">*</span></label>
                                                            <input name="date" type="date" className="form-control" value={eventFieldData.date} onChange={onChangeHandler} />
                                                            {
                                                                eventFieldError.dateError
                                                                    ?
                                                                    <>
                                                                        <div className="alert alert-danger mt-2">{eventFieldError.dateError}</div>
                                                                    </>
                                                                    :
                                                                    <>
                                                                    </>
                                                            }
                                                        </div>

                                                    </div>
                                                    <div >
                                                        <div className="form-group">
                                                            <label className="mb-0">{t('event_time')}<span className="text-danger">*</span></label>
                                                            <input name="time" type="time" className="form-control"
                                                                value={eventFieldData.time} onChange={onChangeHandler} />
                                                            {
                                                                eventFieldError.timeError
                                                                    ?
                                                                    <>
                                                                        <div className="alert alert-danger mt-2">{eventFieldError.timeError}</div>
                                                                    </>
                                                                    :
                                                                    <>
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="mb-0">{t('location')}<span className="text-danger">*</span></label>
                                                        <input name="location" type="text" minLength={2} maxLength={150} className="form-control" placeholder={t('location_ph')} value={eventFieldData.location} onChange={onChangeHandler} />
                                                        {
                                                            eventFieldError.locationError
                                                                ?
                                                                <>
                                                                    <div className="alert alert-danger mt-2">{eventFieldError.locationError}</div>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-0">{t('description')}<span className="text-danger">*</span></label>
                                                    <input name="description" type="text" minLength={5} maxLength={500} className="form-control" placeholder={t('description_ph')} value={eventFieldData.description} onChange={onChangeHandler} />
                                                    {
                                                        eventFieldError.descriptionError
                                                            ?
                                                            <>
                                                                <div className="alert alert-danger mt-2">{eventFieldError.descriptionError}</div>
                                                            </>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                </div>
                                            </form>
                                            {
                                                eventFieldData.eventId
                                                    ?
                                                    <>
                                                        <Button style={{ marginRight: '10px' }} onClick={() => { onClickAddUpdateButton() }}> {t('update')} </Button>
                                                        <Button onClick={() => {
                                                            setEventFieldData({
                                                                ...eventFieldData,
                                                                eventId: '',
                                                                title: '',
                                                                description: '',
                                                                date: '',
                                                                time: '',
                                                                location: '',
                                                            })
                                                            onResetEventFieldError();
                                                        }}> {t('cancel')} </Button>
                                                    </>
                                                    :
                                                    <>
                                                        <Button style={{ marginRight: '10px' }} onClick={() => { onClickAddUpdateButton() }}> {t('add')} </Button>
                                                        <Button onClick={() => {
                                                            onClickReset();
                                                        }}> {t('reset')} </Button>
                                                    </>
                                            }
                                        </Container>
                                        <br />
                                        <br />
                                        <div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <DataTable
                                                        columns={columnViewEventList}
                                                        data={filteredEventList}
                                                        defaultSortField="Name"
                                                        defaultSortAsc={true}
                                                        striped
                                                        pagination
                                                        highlightOnHover
                                                        customStyles={customStyles}
                                                        subHeader
                                                        subHeaderComponent={subHeaderComponent}
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="300px"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <SettingsPanel />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>


        </>
    );
}

export default EventHandling;


