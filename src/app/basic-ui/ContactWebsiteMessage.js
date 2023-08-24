import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import StickyMenu from '../../components/common/StickyMenu';
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
    //   },
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


function ContactWebsiteMessage() {

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

    // const [filterText, setFilterText] = React.useState("");
    // const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    //     false
    // );
    // const filteredItems = announcementDetails.filter(
    //     item =>
    //         JSON.stringify(item)
    //             .toLowerCase()
    //             .indexOf(filterText.toLowerCase()) !== -1
    // );

    // const subHeaderComponent = useMemo(() => {
    //     const handleClear = () => {
    //         if (filterText) {
    //             setResetPaginationToggle(!resetPaginationToggle);
    //             setFilterText("");
    //         }
    //     };

    //     return (
    //         <FilterDataTable
    //             onFilter={e => setFilterText(e.target.value)}
    //             onClear={handleClear}
    //             filterText={filterText}
    //         />
    //     );
    // }, [filterText, resetPaginationToggle]);


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
                                    {t('website_contact_messages')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('contact_messages')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('website_contact_messages')}</li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="card">
                                {/* <div className="card-body">
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
                                </div> */}
                            </div>
                        </div>
                        <SettingsPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div >
    );
}

export default ContactWebsiteMessage;