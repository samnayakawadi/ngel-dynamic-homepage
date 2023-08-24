import React from "react"
import { useEffect } from "react"
import UserService from "../../services/UserService"
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory();

    useEffect(() => {
        history.push("/")
        if (UserService.isLoggedIn()) {
            // history.push("/")
            logoutHandler()
        }
    }, [])

    const logoutHandler = () => {
        UserService.doLogout()
    }

    return (
        <div>
            {/* LOGOUTTTT */}
        </div>
    )
}

export default Logout