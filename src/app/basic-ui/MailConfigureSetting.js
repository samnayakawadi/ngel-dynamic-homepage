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

function MailConfigureSetting() {

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

    const [getEmailConfigDiv, setEmailConfigDiv] = useState(false);

    const initialState = {
        subject: '',
        composemail: '',
        subjectError: '',
        composeEmailError: ''
    }
    const [emailConfigData, setemailConfigData] = useState(initialState)

    const formVlaidate = () => {
        let subjectError = '';
        let composeEmailError = '';
        if (!emailConfigData.subject) {
            subjectError = `${t('subject_is_required_field')}`;
        } else if (emailConfigData.subject.match(/\w+/g).length > 100) {
            subjectError = `${t('subject_word_greater_then_hundread')}`;
        }
        if (!emailConfigData.composemail) {
            composeEmailError = `${t('compose_mail_required')}`;
        } else if (emailConfigData.composemail.match(/\w+/g).length > 500) {
            composeEmailError = `${t('compose_mail_word_greater_than_five_hundread')}`;
        }

        if (subjectError || composeEmailError) {
            setemailConfigData({ ...emailConfigData, subjectError, composeEmailError, });
            return false;
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isValidate = formVlaidate();
        if (isValidate) {
            alert("hii")
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
                                    {t('setting')}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>{t('mail_setting')}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{t('mail_setting_config')}</li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="card">
                                <div class="card-header text-center" style={{ backgroundColor: '#00AA9E', color: 'white' }}>
                                    {t('mail_setting')}
                                </div>
                                <div class="card-body">
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        {getEmailConfigDiv ?
                                            <div class="card border-success mb-3">
                                                <div class="card-body text-success">

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">{t('subject')} :</label>
                                                        <input type="text" name='subject' value={emailConfigData.subject} onChange={(e) => setemailConfigData({ ...emailConfigData, subject: e.target.value })}
                                                            class="form-control" aria-describedby="subject" placeholder={t('subject')} />
                                                        {emailConfigData.subjectError
                                                            ? <div className="alert alert-danger mt-2">{emailConfigData.subjectError}</div>
                                                            : ''
                                                        }
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleInputPassword1">{t('mail')} :</label>
                                                        <textarea name="composemail" type="text" minLength={5} maxLength={1500} value={emailConfigData.composemail} onChange={(e) => setemailConfigData({ ...emailConfigData, composemail: e.target.value })}
                                                            className="form-control" placeholder="Compose Mail" />
                                                        {emailConfigData.composeEmailError
                                                            ? <div className="alert alert-danger mt-2">{emailConfigData.composeEmailError}</div>
                                                            : ''
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            : ''}
                                        <Row>
                                            <Col>
                                                <button onSubmit={(e) => handleSubmit(e)} class="btn btn-primary col-12"><i class="fa fa-paper-plane" ></i> {t('submit')}</button>
                                            </Col>
                                        </Row>
                                    </form>
                                    <Row>
                                        <Col className='mt-3'>
                                            <button class="btn btn-success col-12" onClick={() => setEmailConfigDiv(true)} ><i class="fa fa-plus" ></i> {t('add_more_mail')}</button>
                                        </Col>
                                    </Row>
                                </div>
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

export default MailConfigureSetting;