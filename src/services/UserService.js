import Keycloak from "keycloak-js";
import axios from 'axios';
import HttpService from "./HttpService";
import { useEffect, useState } from "react";
import service from "./service";
import UserActionLogin from "../pages/account/UserActionLogin";

const _kc = new Keycloak('/keycloak.json');


/////////////////////////

// export const UserAction = () =>{

  const data = {
    browser: null,
    os: null,
    resolution: null,
    ip: null
  };

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
    // setData((prevState) => {
    //   return { ...prevState, browser: browserName };
    // });
    data.browser = browserName;
  };

  const getResolution = () => {
    const height = window.screen.availHeight;
    const width = window.screen.availWidth;

    const res = `${height} x ${width}`;
    // setData((prevState) => {
    //   return { ...prevState, resolution: res };
    // });
    data.resolution = res;
  };

  const getIP = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    ////console.log(res.data);
    // setData((prevState) => {
    //   return { ...prevState, ip: res.data.IPv4 };
    // });
    data.ip = res.data.IPv4;
    ////console.log(data.ip);
};

  const getCurrentOS = () => {
    var Name = "Not known";
    if (navigator.appVersion.indexOf("Win") !== -1) Name = "Windows OS";
    if (navigator.appVersion.indexOf("Mac") !== -1) Name = "MacOS";
    if (navigator.appVersion.indexOf("X11") !== -1) Name = "UNIX OS";
    if (navigator.appVersion.indexOf("Linux") !== -1) Name = "Linux OS";
    
    // setData((prevState) => {
    // return { ...prevState, os: Name };
    // });
    
    data.os = Name;
  };


    const getData = async() => {
      getCurrentBrowser();
      getCurrentOS();
      getResolution();
      await getIP();
      let userId = UserService.getUserid();
      let sessionId = UserService.getSessionId();
      //let ip = data.ip; 
      // call service over here
      service.saveUserActionDetails(data.browser, data.os, data.resolution, userId, data.ip, sessionId)
     
      ////console.log(data);
      ////console.log(ip);
      ////console.log(userId, sessionId);      
    };

////////////////////////


/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    onLoad: 'check-sso',
    //onLoad: 'login-required', /* user want to login is requied in onLoad to open a kayclock login page */
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    responseMode: 'fragment',
    flow: 'standard',
    pkceMethod: 'S256',
    
  })

    .then((authenticated) => {
      // if (authenticated) {
      if (authenticated === true) {
        let emailid = UserService.getUserid();
        let ipaddress = "0.0.0.0";
        let action = "Login";
        let os = "";
        ////console.log(os);
        //let ip = UserAction.ip;
        ////console.log(ip);
        let height = window.innerHeight;
        let width = window.innerWidth;
        let resolution = height + ' * ' + width;
        //UserService.getData();
        let browserName = navigator.appCodeName;
        let result = "true";
        let siteid = 1;
        let sessionId = UserService.getSessionId();
        var params = new URLSearchParams();
       
        getData();
      }
      onAuthenticatedCallback();
      // } else {
      //   doLogin();
      // }
    })
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.name;
const getUserid = () => _kc.tokenParsed?.sub;
const getEmail = () => _kc.tokenParsed?.email;
const getSessionId = () => _kc.tokenParsed?.session_state;
const instRole = () => _kc.tokenParsed?.resource_access.reactclient.roles[0];
const learnerRole = () => _kc.tokenParsed?.realm_access.roles[3];
const USER_API = "http://10.244.3.218:8084/um_api/";

const generateToken = () =>{
  if (UserService.getToken() !== undefined) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${UserService.getToken()}`;
  }
}

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role) || _kc.hasResourceRole(role));

/* According to condition check your role has role and resource role */
// const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role) || _kc.hasResourceRole(role));
 

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  getUserid,
  hasRole,
  getEmail,
  getSessionId,
  instRole,
  learnerRole,
  generateToken,
  USER_API
};

export default UserService;
