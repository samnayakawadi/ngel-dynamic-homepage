// import { useContext } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
import React from 'react';
import { useState, useEffect } from "react"

const GlobalModel = () => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        },3000);
    }, [])

}

export default GlobalModel