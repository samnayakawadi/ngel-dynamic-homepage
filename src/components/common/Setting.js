import React, { useEffect } from 'react';
import { Styles } from "./styles/setting";
import UserService from '../../services/UserService';

function Setting() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    return (
        <Styles>
            <button type="text" className="setting-btn">
                <i className="las la-cog"></i>
            </button>
        </Styles>
    );
}

export default Setting