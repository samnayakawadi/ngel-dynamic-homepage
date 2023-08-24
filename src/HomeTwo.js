import React, { Component, useContext } from 'react';
import HeaderTwo from './components/HeaderTwo';
import HeroImage from './components/HeroImage';
import ServiceBox from './components/ServiceBox';
import AboutUsTwo from './components/AboutUsTwo';
import CourseSlider from './components/CourseSlider';
import NumberCounter from './components/NumberCounter';
import FreeCourse from './components/FreeCourse';
import TeamSlider from './components/TeamSlider';
import TestimonialSlider from './components/TestimonialSlider';
import HomeBlog from './components/HomeBlog';
import ImageGallery from './components/ImageGallery';
import FooterTwo from './components/FooterTwo';
import UserService from './services/UserService';
import { GlobalContext } from './context/GlobalContext';
import { DynamicContext } from './context/DynamicContext';
import { ValidationContext } from './context/ValidationContext';
import FileTypeHandlers from './dynamicHomePage/handlers/FileTypeHandlers';
import GlobalHandlers from './dynamicHomePage/handlers/GlobalHandlers';
import ValidationHandlers from './dynamicHomePage/handlers/ValidationHandlers';
import FileTypeModal from './dynamicHomePage/modals/FileTypeModal';



export default class HomeTwo extends Component {

    constructor(props) {
        super(props);

        const { setGlobalContextState, globalContextState } = useContext(GlobalContext);
        const { setDynamicContextState, dynamicContextState } = useContext(DynamicContext);
        const { validationState } = useContext(ValidationContext);

        // const { textTypeHandlers } = TextTypeHandlers();
        // const { linkTypeHandlers } = LinkTypeHandlers();
        const { fileTypeHandlers } = FileTypeHandlers();
        const { globalHandlers, loading, setLoading } = GlobalHandlers();
        const { validationHandlers } = ValidationHandlers();

        this.state = {
            globalContextState,
            dynamicContextState,
            validationState,
            fileTypeHandlers,
            globalHandlers,
            validationHandlers,
            setGlobalContextState
        };
    }




    componentDidMount() {
        UserService.generateToken();
    }

    render() {
        return (
            <div className="main-wrapper">
                {/*After click on edit button this model is pop-up as per type of text */}
                {/* <TextTypeModal globalContextState={globalContextState} textTypeHandlers={textTypeHandlers} validationState={validationState} validationHandlers={validationHandlers} /> */}
                <FileTypeModal globalContextState={this.state.globalContextState} fileTypeHandlers={this.state.fileTypeHandlers} validationState={this.state.validationState} validationHandlers={this.state.validationHandlers} />
                {/* <LinkTypeModal globalContextState={globalContextState} linkTypeHandlers={linkTypeHandlers} validationState={validationState} validationHandlers={validationHandlers} /> */}

                {/* Header 2 */}
                <HeaderTwo fileTypeHandlers={this.state.fileTypeHandlers} dynamicContextState={this.state.dynamicContextState} globalContextState={this.state.globalContextState} globalHandlers={this.state.globalHandlers} setGlobalContextState={this.state.setGlobalContextState} lang={this.state.globalContextState.lang} />

                {/* Hero Image */}
                <HeroImage />

                {/* Service Box */}
                <ServiceBox />

                {/* About Us 2 */}
                <AboutUsTwo />

                {/* Course Slider */}
                <CourseSlider />

                {/* Counter Area */}
                <NumberCounter />

                {/* Free Course Area */}
                <FreeCourse />

                {/* Team Slider */}
                <TeamSlider />

                {/* Testimonial Slider */}
                <TestimonialSlider />

                {/* Blog Area */}
                <HomeBlog />

                {/* Image Gallery Area */}
                <ImageGallery />

                {/* Footer 2 */}
                <FooterTwo />

            </div>
        )
    }
}
