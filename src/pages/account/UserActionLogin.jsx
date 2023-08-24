import UserService from "../../services/UserService";
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

export default function UserActionLogin() {

  useEffect(() => {
    UserService.generateToken();
   }, []);

  const[log, setLog] = useState(false);

  const [data, setData] = useState({
    browser: null,
    os: null,
    resolution: null,
    ip: null
  });
  

  const getCurrentBrowser = () => {
    let browserName;

    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) !== -1) {
      browserName = "Opera";
    } else if (navigator.userAgent.indexOf("Edg") !== -1) {
      browserName = "Edge";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      browserName = "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      browserName = "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      browserName = "Firefox";
    } else if (
      navigator.userAgent.indexOf("MSIE") !== -1 ||  !!document.documentMode === true) 
    {
      //IF IE > 10
      browserName = "IE";
    } else {
      browserName = "Unknown";
    }
    setData((prevState) => {
      return { ...prevState, browser: browserName };
    });
  };

  const getResolution = () => {
    const height = window.screen.availHeight;
    const width = window.screen.availWidth;

    const res = `${height} x ${width}`;
    setData((prevState) => {
      return { ...prevState, resolution: res };
    });
  };

//   const getIP = () => {
//     const apiKey = "211652bc97a479041548a4f46087ee1b1b7a66c43f5a0bfd5c77322f";
//     axios.get(`https://api.ipdata.co?api-key=${apiKey}`).then((res) => {
//       //console.log("IP : ", res);
//       setData((prevState) => {
//         return { ...prevState, ip: res.data.ip };
//       });
//     });
//   };

     const getIP = async () => {
            const res = await axios.get("https://geolocation-db.com/json/");
            ////console.log(res.data);
            setData((prevState) => {
              return { ...prevState, ip: res.data.IPv4 };
            });
  };

  const getCurrentOS = () => {
    var Name = "Not known";
    if (navigator.appVersion.indexOf("Win") !== -1) Name = "Windows OS";
    if (navigator.appVersion.indexOf("Mac") !== -1) Name = "MacOS";
    if (navigator.appVersion.indexOf("X11") !== -1) Name = "UNIX OS";
    if (navigator.appVersion.indexOf("Linux") !== -1) Name = "Linux OS";

    setData((prevState) => {
      return { ...prevState, os: Name };
    });
  };


  const getData = () => {
      getCurrentBrowser();
      getCurrentOS();
      getResolution();
      getIP();    
  };

    let browser = data.browser;
    let os = data.os;
    let resolution = data.resolution;
    let ip = data.ip;

     if(browser !== null && os !== null && resolution !== null && ip !== null){
      ////console.log(data);
      ////console.log(browser, os, resolution, ip);
     }
    
  useEffect(()=>{

    getData();
    ////console.log(browser, os, resolution, ip);

  //   if (UserService.isLoggedIn())
  // {
  //       let browser = data.browser;
  //       let os = data.os;
  //       let resolution = data.resolution;
  //       let ip = data.ip;
  //       let emailid = UserService.getUserid();
  //       let sessionId = UserService.getSessionId();
  //       //service.saveUserActionDetails(browserName, os, resolution, emailid, ipaddress, sessionId);
  //       ////console.log(browser, os, resolution, emailid, ip, sessionId);
  //       setLog(true);
  // }
  }, [])  
}

