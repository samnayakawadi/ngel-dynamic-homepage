import React, { Component } from 'react';
import Datas from '../../../data/course/popular.json';
import { Link } from 'react-router-dom';
import { Styles } from '../styles/popularCourse.js';
import UserService from '../../../services/UserService';

class PopularCourse extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Popular Course */}
                <div className="popular-course">
                    <h5>Popular Course</h5>
                    <div className="popular-items">
                        {
                            Datas.map((data, i) => (

                                <div className="item-box d-flex" key={i}>
                                    <div className="item-img">
                                        <Link to={process.env.PUBLIC_URL + data.courseLink}><img src={process.env.PUBLIC_URL + `/assets/images/${data.imgUrl}`} alt="" /></Link>
                                    </div>
                                    <div className="item-content">
                                        <p className="title"><Link to={process.env.PUBLIC_URL + data.courseLink}>{data.courseTitle}</Link></p>
                                        <ul className="list-unstyled list-inline rating">
                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                        </ul>
                                        <p className="price">{data.price}</p>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </Styles>
        )
    }
}

export default PopularCourse
