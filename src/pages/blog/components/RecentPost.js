import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Datas from '../../../data/blog/recent-post.json';
import { Styles } from '../styles/recentPost.js';
import UserService from '../../../services/UserService';

class RecentPost extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Recent Post */}
                <div className="recent-blog">
                    <h5>Recent Post</h5>
                    <div className="blog-items">
                        {
                            Datas.map((data, i) => (

                                <div className="item-box d-flex" key={i}>
                                    <div className="item-img">
                                        <Link to={data.blogLink}><img src={process.env.PUBLIC_URL + `/assets/images/${data.imgUrl}`} alt="" /></Link>
                                    </div>
                                    <div className="item-content">
                                        <p className="title"><Link to={process.env.PUBLIC_URL + data.blogLink}>{data.blogTitle}</Link></p>
                                        <span className="date">{data.blogDate}</span>
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

export default RecentPost
