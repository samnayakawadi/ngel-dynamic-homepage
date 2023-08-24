import React, { useEffect, useState, useMemo } from 'react';
import StickyMenu from '../../components/common/StickyMenu';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import SettingsPanel from '../shared/SettingsPanel';
import Sidebar from '../shared/Sidebar';
import DataTable from "react-data-table-component";
import FilterDataTable from '../../pages/instructor/FilterDataTable';
import adminServices from '../../services/adminServices';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
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

function Testimonials() {

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

    const [getTestimonialData, setTestimonialData] = useState([]);
    useEffect(() => {
        TestimonialData();
    }, [])

    const TestimonialData = async () => {
        try {
            let result = await adminServices.getAllTestimonial();
            setTestimonialData(result.data);
        } catch (error) {
            //console.log(error);
        }
    }

    const [approveLoading, setApproveLoading] = useState({
        isLoading: false
    })

    const [rejectLoading, setRejectLoading] = useState({
        isLoading: false
    })

    const [getApproveId, setApproveId] = useState("");
    const [getRejectId, setRejectId] = useState("");

    const approveTestmonial = async (testId) => {

        setApproveId(testId);

        setApproveLoading({ isLoading: true });

        try {
            let result = await adminServices.approveTestimonials(testId);
            if (result.status == 200) {
                setApproveLoading({ isLoading: false });
                await swal(`${t('success')}`, `${t('approved')}`, "success")
                TestimonialData();
            }
        } catch (error) {
            setApproveLoading({ isLoading: false });
            //console.log(error);
        }
    }

    const rejectTestimonials = async (testId) => {

        setRejectId(testId);
        setRejectLoading({ isLoading: true });
        try {
            let result = await adminServices.rejectTestimonials(testId);
            if (result.status == 200) {
                setRejectLoading({ isLoading: false });
                await swal(`${t('success')}`, `${t('rejected')}`, "success")
                TestimonialData();
            }
        } catch (error) {
            setRejectLoading({ isLoading: false });
            //console.log(error);
        }
    }
    const columns = [
        {
            name: "S.No",
            selector: row => row.testiId,
            sortable: true,
            width: "80px"
        },
        {
            name: "Title",
            selector: row => row.testiTitle,
            sortable: true,
            wrap: true,
        },
        {
            name: "Description",
            selector: row => row.testiDesc,
            sortable: true,
            wrap: true
        },
        {
            name: "Action",
            sortable: true,
            wrap: true,
            cell: (row) => <div>
                <span className="d-inline-block">
                    {row.testiStatus == "Submitted" ?
                        <div>
                            <Button className='mr-2 mb-2' variant="light"> <i class="fa fa-paper-plane" style={{ color: 'orange' }}></i></Button>  
                            <Button className='mr-2 mb-2' onClick={() => approveTestmonial(row.testiId)} style={{ backgroundColor: 'green', borderColor: "green" }}>
                                {approveLoading.isLoading ? getApproveId === row.testiId ? (<>{t('loading')}</>) : (<> <i class="fa fa-thumbs-up"></i>  {t('approve')}</>) : (<> <i class="fa fa-thumbs-up"></i>  {t('approve')}</>)}
                            </Button>
                            <Button className='mb-2' onClick={() => rejectTestimonials(row.testiId)} variant="danger">
                                {rejectLoading.isLoading ? getRejectId === row.testiId ? (<>{t('loading')}</>) : (<><i class="fa fa-thumbs-down">  {t('reject')}</i></>) : (<><i class="fa fa-thumbs-down">  {t('reject')}</i></>)}
                            </Button>
                        </div>
                        : null}
                    {row.testiStatus == "Approved" ?
                        <div>
                            <Button className='mr-2 mb-2' variant="light"> <i class="fa fa-check" style={{ color: 'green' }}></i>
                            </Button>
                            <Button className='mb-2' onClick={() => rejectTestimonials(row.testiId)} variant="danger">
                                {rejectLoading.isLoading ? getRejectId === row.testiId ? (<>{t('loading')}</>) : (<><i class="fa fa-thumbs-down">  {t('reject')}</i></>) : (<><i class="fa fa-thumbs-down">  {t('reject')}</i></>)}
                            </Button>
                        </div>
                        : null}
                    {
                        row.testiStatus == "Reject" ?
                            <div>
                                <Button className='mr-2 mb-2' variant="light"><i class="fa fa-times" style={{ color: 'red' }}></i>
                                </Button>
                                <Button className='mb-2' style={{ backgroundColor: 'green', borderColor: "green" }} onClick={() => approveTestmonial(row.testiId)} >
                                    {approveLoading.isLoading ? getApproveId === row.testiId ? (<>{t('loading')}</>) : (<> <i class="fa fa-thumbs-up"></i>  {t('approve')}</>) : (<> <i class="fa fa-thumbs-up"></i>  {t('approve')}</>)}
                                </Button>
                            </div>
                            : null
                    }
                </span>
            </div>
        }
    ];

    /* Table content Filter and Search */
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const filteredItems = getTestimonialData.filter(
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
                                    {t('testimonials')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('testimonials')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('view_testimonials')}</li>
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

export default Testimonials;