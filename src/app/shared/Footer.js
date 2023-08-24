import React, { Component } from 'react';
import UserService from '../../services/UserService';

class Footer extends Component {

  componentDidMount() {
    UserService.generateToken();
   }

  render() {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between py-2">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © {new Date().getFullYear()} | Designed & Developed by C-DAC Hyderabad</span>
          {/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Free <a href="https://www.bootstrapdash.com/react-admin-templates/" target="_blank" rel="noopener noreferrer"> react admin </a> templates from BootstrapDash.com.  </span> */}
        </div>
      </footer>
    );
  }
}

export default Footer;