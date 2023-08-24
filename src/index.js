import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from "./serviceWorker";
import HttpService from "./services/HttpService";
import StoreService from "./services/StoreService";
import UserService from "./services/UserService";
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { useEffect } from "react";
import '../src/assets/fonts/Raavi.ttf';
import 'react-toastify/dist/ReactToastify.css';

// For Testing
// import * as themes from './theme/schema.json';
// import { setToLS } from './theme/utils/storage';

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'hi', 'te', 'mr','pu'],
        fallbackLng: 'en',
        debug: false,
        // Options for language detector
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            caches: ['cookie'],
        },
        // react: { useSuspense: false },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json',
        },
    })

// setToLS('all-themes', themes.default);

const { history, store } = StoreService.setup();
//ReactDOM.render(<App />, document.getElementById("root"));
const renderApp = () => ReactDOM.render(<App {...{ store, history }} />, document.getElementById("root"));

UserService.initKeycloak(renderApp);
HttpService.configure();
serviceWorker.unregister();