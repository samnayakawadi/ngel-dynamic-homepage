import React, {useEffect} from "react";
import { Styles } from './styles/courseCategory.js';
import UserService from "../../../../services/UserService.js";

function CoursePrice() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    return (
        <Styles>
            <div className="course-category">
                <h5>Course Price</h5>
                <ul className="category-item list-unstyled">
                    <select>
                        <option>All</option>
                        <option>Free</option>
                        <option>Paid</option>
                    </select>
                </ul>
            </div>
        </Styles>
    )
}
export default CoursePrice
