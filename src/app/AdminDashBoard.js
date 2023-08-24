import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StickyMenu from '../components/common/StickyMenu';
import './App.scss';
// import Buttons from './basic-ui/Buttons';
// import Dropdowns from './basic-ui/Dropdowns';
// import Typography from './basic-ui/Typography';
// import ChartJs from './charts/ChartJs';
import Dashboard from './dashboard/Dashboard';
// import Error404 from './error-pages/Error404';
// import Error500 from './error-pages/Error500';
// import BasicElements from './form-elements/BasicElements';
// import BlankPage from './general-pages/BlankPage';
// import Mdi from './icons/Mdi';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';
import SettingsPanel from './shared/SettingsPanel';
import Sidebar from './shared/Sidebar';
import UserService from '../services/UserService';
// import BasicTable from './tables/BasicTable';
// import LockScreen from './user-pages/Lockscreen';
// import Login from './user-pages/Login';
// import Register from './user-pages/Register';

function AdminDashBoard() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    return (
        <div>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Dashboard />
                            <SettingsPanel />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
            <StickyMenu />

        </div>
    );
}

export default AdminDashBoard;