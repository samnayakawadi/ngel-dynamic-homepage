import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Styles } from '../styles/courseTag.js';
import UserService from '../../../services/UserService.js';

class CourseTag extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Course Tag */}
                <div className="course-tag">
                    <h5>Course Tag</h5>
                    <div className="tag-box">
                        <Link to={process.env.PUBLIC_URL + "/"}>HTML</Link>
                        <Link to={process.env.PUBLIC_URL + "/"}>CSS</Link>
                        <Link to={process.env.PUBLIC_URL + "/"}>Photoshop</Link>
                        <Link to={process.env.PUBLIC_URL + "/"}>Jquery</Link>
                        <Link to={process.env.PUBLIC_URL + "/"}>PHP</Link>
                        <Link to={process.env.PUBLIC_URL + "/"}>Wordpress</Link>
                        <Link to={process.env.PUBLIC_URL + "/"}>Bootstrap</Link>
                        <Link to={process.env.PUBLIC_URL + "/"}>Javascript</Link>
                    </div>
                </div>
            </Styles>
        )
    }
}

export default CourseTag
