import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Styles } from './styles/contact.js';
import { FaMapMarker } from 'react-icons/fa';
import UserService from '../../services/UserService.js';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const AnyReactComponent = () =>{
    return (
        <>
            <div>
                <h6 style={{fontWeight : 'bold', color : 'black'}}>Punjab Police Academy</h6>
                {/* <p style={{fontWeight : 'bold', color : 'black'}}>Phillaur, Jalandhar Punjab</p> */}
            </div>
        </>
    )
}

class GoogleMap extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    static defaultProps = {
        //31.011860158691416, 75.78966841223863
        // center: {
        //     lat: 17.24001066497887,
        //     lng: 78.47525729290439
        // },
        center: {
            lat: 31.011860158691416,
            lng: 75.78966841223863
        },
        zoom: 11
    };
    
    

    render() {
        return (
            <Styles>
                {/* Google Map */}
                <div className="google-map-area">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyATY4Rxc8jNvDpsK8ZetC7JyN4PFVYGCGM" }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}                        
                    >
                        <AnyReactComponent className="z-depth-1-half map-container" lat={31.011860158691416} lng={75.78966841223863} ></AnyReactComponent>

                    </GoogleMapReact>
                </div>
            </Styles>
        )
    }
}

export default GoogleMap