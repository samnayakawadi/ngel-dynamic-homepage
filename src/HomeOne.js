import React, { useEffect, useState, Component, useContext } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import IconBox from './components/IconBox';
import AboutUs from './components/AboutUs';
import CourseFilter from './components/CourseFilter';
import TestimonialSlider from './components/TestimonialSlider';
import FaqEvent from './components/FaqEvent';
import TeamSlider from './components/TeamSlider';
import HelpArea from './components/HelpArea';
import HomeBlog from './components/HomeBlog';
import CampusTour from './components/CampusTour';
import NewsletterForm from './components/NewsletterForm';
import Footer from './components/Footer';
import UserService from './services/UserService';
import service from './services/service';

import Setting from './components/common/Setting';
import FooterTwo from './components/FooterTwo';
import { GlobalContext } from './context/GlobalContext';
import { DynamicContext } from './context/DynamicContext';
import TextTypeHandlers from './dynamicHomePage/handlers/TextTypeHandlers';
import GlobalHandlers from './dynamicHomePage/handlers/GlobalHandlers';
import { ValidationContext } from './context/ValidationContext';
import LinkTypeHandlers from './dynamicHomePage/handlers/LinkTypeHandlers';
import FileTypeHandlers from './dynamicHomePage/handlers/FileTypeHandlers';
import ValidationHandlers from './dynamicHomePage/handlers/ValidationHandlers';
import TextTypeModal from '../src/dynamicHomePage/modals/TextTypeModal';
import LinkTypeModal from '../src/dynamicHomePage/modals/LinkTypemodal';
import FileTypeModal from '../src/dynamicHomePage/modals/FileTypeModal';
// import 'react-toastify/dist/ReactToastify.css';
import { HashLoader } from "react-spinners";
import logoImage from '../src/assets/images/logo.png'
import axios from 'axios';

function HomeOne(props) {

    const { setGlobalContextState, globalContextState } = useContext(GlobalContext)
    const { setDynamicContextState, dynamicContextState } = useContext(DynamicContext)
    const { validationState } = useContext(ValidationContext)

    const { textTypeHandlers } = TextTypeHandlers()
    const { linkTypeHandlers } = LinkTypeHandlers()
    const { fileTypeHandlers } = FileTypeHandlers()
    const { globalHandlers, loading, setLoading } = GlobalHandlers()
    const { validationHandlers } = ValidationHandlers()

    // console.log("dynamicContextState++++",dynamicContextState)


    useEffect(() => {
        UserService.generateToken();
        const arcane = props.match.params.arcane
        setGlobalContextState(prevState => { return { ...prevState, arcane } })
        sessionStorage.setItem("arcane", arcane)
    }, []);
    // componentDidMount() {
    //     let emailid = UserService.getUserid();
    //     let ipaddress = "0.0.0.0";
    //     let action = "Login";
    //     let os = navigator.platform;
    //     let height = window.innerHeight;
    //     let width = window.innerWidth;
    //     let resolution = height + ' * ' + width;
    //     let browserName = navigator.appCodeName;
    //     let result = 0;
    //     let siteid = "siteid";
    //     let sessionId = UserService.getSessionId();
    //     if (UserService.doLogin) {
    //         service.saveUserActionDetails(emailid, ipaddress, action, os, resolution, browserName, result, siteid, sessionId)
    //             .then(res => {
    //                 //console.log(res.data);
    //             })
    //     }if (UserService.doLogout){
    //         service.updateUserActionDetails(emailid, sessionId)
    //         .then(res=>{
    //             //console.log(res.data);
    //         })
    //     }
    // }

    const [Fetchloading, setFetchLoading] = useState(true);
    const languages = ['eng', 'hnd', 'tel'];
    // Function to fetch data for a specific language
    const fetchData = async (lang) => {
        try {
            const response = await axios.get(`${globalContextState.server.jsonDownload}/${lang}`);
            if (response.status === 200) {
                // console.log("response data : ", response.data);
                setDynamicContextState(prevState => { return { ...prevState, [lang]: response.data } });
            }
        } catch (error) {
            // console.error('Error fetching data:');
            setFetchLoading(false);
        }
    };
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                for (const lang of languages) {
                    await fetchData(lang);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return (

        <div className="main-wrapper" >
            {/*After click on edit button this model is pop-up as per type of text */}
            <TextTypeModal globalContextState={globalContextState} textTypeHandlers={textTypeHandlers} validationState={validationState} validationHandlers={validationHandlers} />
            <FileTypeModal globalContextState={globalContextState} fileTypeHandlers={fileTypeHandlers} validationState={validationState} validationHandlers={validationHandlers} />
            <LinkTypeModal globalContextState={globalContextState} linkTypeHandlers={linkTypeHandlers} validationState={validationState} validationHandlers={validationHandlers} />

            {/* Header */}
            < Header globalHandlers={globalHandlers} globalContextState={globalContextState} setGlobalContextState={setGlobalContextState} dynamicContextState={dynamicContextState} textTypeHandlers={textTypeHandlers} fileTypeHandlers={fileTypeHandlers} linkTypeHandlers={linkTypeHandlers} lang={globalContextState.lang} loading={loading} setLoading={setLoading} />

            {/* < Setting /> */}

            {/* Hero Slider */}
            < HeroSlider />

            {/* Icon Box globalHandlers={globalHandlers} globalContextState={globalContextState} setGlobalContextState={setGlobalContextState} dynamicContextState={dynamicContextState} textTypeHandlers={textTypeHandlers}  lang={globalContextState.lang} */}
            < IconBox />

            {/* About Area globalHandlers={globalHandlers} globalContextState={globalContextState} setGlobalContextState={setGlobalContextState} dynamicContextState={dynamicContextState} textTypeHandlers={textTypeHandlers}  lang={globalContextState.lang} */}
            < AboutUs />

            {/* Course Filter */}
            < CourseFilter />

            {/* Testimonial Slider */}
            < TestimonialSlider />

            {/* Faq & Event Area globalHandlers={globalHandlers} globalContextState={globalContextState} setGlobalContextState={setGlobalContextState} dynamicContextState={dynamicContextState} textTypeHandlers={textTypeHandlers} linkTypeHandlers={linkTypeHandlers} lang={globalContextState.lang}  */}
            < FaqEvent />

            {/* Team Slider */}
            {/* < TeamSlider /> */}

            {/* Help Area */}
            {/* < HelpArea /> */}

            {/* Blog Area */}
            {/* < HomeBlog /> */}

            {/* Campus Tour */}
            {/* < CampusTour /> */}

            {/* Newsletter Form */}
            {/* < NewsletterForm /> */}

            {/* Footer globalHandlers={globalHandlers} globalContextState={globalContextState} setGlobalContextState={setGlobalContextState} dynamicContextState={dynamicContextState} textTypeHandlers={textTypeHandlers}  lang={globalContextState.lang}*/}
            < FooterTwo />

        </div >
    );
}

export default HomeOne;

