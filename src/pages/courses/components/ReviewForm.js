import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Styles1 } from '../styles/reviewForm.js';
import service from '../../../services/service'
import UserService from '../../../services/UserService.js';
import CourseDetails from '../CourseDetails.js';

function ReviewForm() {

    useEffect(() => {
        UserService.generateToken();
       }, []);
       
    const state = {
        rating: '',
        reviewText: '',
        learnerId: "294c0974-a82e-4923-b721-9223323cf7e3",
        itemId: 2,
        reviewStatus: 'Done',
        reviewType: 'Course Review'

    }

    const [getRate, setRate] = useState(state);
    useEffect(() => {
        const form = document.getElementById("form6");
        const desc = document.getElementById("desc6");


        form.addEventListener("submit", formSubmit);

        function formSubmit(e) {
            e.preventDefault();

            const descValue = desc.value.trim();


            if (descValue === "") {
                setError(desc, "Comment can't be blank");
            } else {
                setSuccess(desc);
            }


        }

        function setError(input, message) {
            const formControl = input.parentElement;
            const errorMsg = formControl.querySelector(".input-msg6");
            formControl.className = "form-control error";
            errorMsg.innerText = message;
        }

        function setSuccess(input) {
            const formControl = input.parentElement;
            formControl.className = "form-control success";
        }


    });


    const saverating = (e) => {
        if (getRate.rate === "") {
            // //console.log("Rating can't be blank")
        } else if (getRate.comment === "") {
            // //console.log("Review can't be blank")
        }
        else {

            let review = { rating: getRate.rating, reviewText: getRate.reviewText, learnerId: getRate.learnerId, itemId: getRate.itemId, reviewStatus: getRate.reviewStatus, reviewType: getRate.reviewType };
            // //console.log('Details =>' + JSON.stringify(review))
            service.createrating(review).then(response => {
            });
        }
    }


    return (

        <Styles1>
            <h5> Review Form</h5>
            <form id="form6" className="form review-comment-form">
                <Row>
                    <Col md="12">
                        <div className="star-rating">
                            <input type="radio" name="rating" value="5" onChange={e => setRate({ ...getRate, rating: e.target.value })} id="rate-5" />
                            <label htmlFor="rate-5" className="las la-star"></label>
                            <input type="radio" value="4" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-4" />
                            <label htmlFor="rate-4" className="las la-star"></label>
                            <input type="radio" value="3" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-3" />
                            <label htmlFor="rate-3" className="las la-star"></label>
                            <input type="radio" value="2" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-2" />
                            <label htmlFor="rate-2" className="las la-star"></label>
                            <input type="radio" value="1" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-1" />
                            <label htmlFor="rate-1" className="las la-star"></label>
                        </div>
                    </Col>
                    <Col md="12">
                        <p className="form-control">
                            <textarea name="reviewText" id="desc6" onChange={e => setRate({ ...getRate, reviewText: e.target.value })} placeholder="Enter your review"></textarea>
                            <span className="input-msg6"></span>
                        </p>
                    </Col>
                    <Col md="12">
                        <button onClick={saverating}>Submit Review</button>
                    </Col>
                </Row>
                <Row>
                </Row>
            </form>
        </Styles1>
    )

}

export default ReviewForm