import React, { useEffect, useState } from 'react'
import { Styles } from './styles/courseCategory.js'
import instructorService from '../../../../services/instructorService.js';
import UserService from '../../../../services/UserService.js';

function CourseCategory() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    const [getCategory, setCategory] = useState([]);
    useEffect(() => {
        instructorService.getAllCourseCategory()
            .then(res => {
                setCategory(res.data);
            }).catch(err => {
                //console.log(err);
            })
    }, [])

    return (
        <Styles>
            <div className="course-category">
                <h5>Course Category</h5>
                <ul className="category-item list-unstyled">
                    <select>
                        <option>Select</option>
                        {getCategory.map((data, i) => {
                            return (
                                <option>
                                    {data.categoryName}
                                </option>
                            )
                        })
                        }
                    </select>
                </ul>
            </div>
        </Styles>
    )
}
export default CourseCategory