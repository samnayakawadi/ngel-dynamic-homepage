import React from 'react';
import { Link } from 'react-router-dom';
import { Styles } from "./styles/pagination.js";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
        // //console.log(pageNumbers);
    }
    return (
        <Styles>
            {/* Pagination */}
            <ul className="pagination-box list-unstyled list-inline">
                {/* <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-double-left"></i></Link></li>
                <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/"}>1</Link></li>
                <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/"}>2</Link></li>
                <li className="active list-inline-item"><Link to={process.env.PUBLIC_URL + "/"}>3</Link></li>
                <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/"}>...</Link></li>
                <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/"}>13</Link></li>
                <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-double-right"></i></Link></li> */}
                {pageNumbers.map(number => (
                    <li key={number} className='list-inline-item'>
                        <a onClick={() => paginate(number)} href='#' className="active list-inline-item">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </Styles>
    )
}

export default Pagination
