import React, { useEffect } from 'react';
import Datas from '../data/free-course/free-course.json';
import { Container, Row, Col } from 'react-bootstrap';
import Timer from 'react-compound-timer';
import { Styles } from "./styles/freeCourse.js";
import UserService from '../services/UserService';

function FreeCourse() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    useEffect(() => {
        const form = document.getElementById("form3");
        const name = document.getElementById("name3");
        const email = document.getElementById("email3");
        const phone = document.getElementById("phone3");

        form.addEventListener("submit", formSubmit);

        function formSubmit(e) {
            e.preventDefault();

            const nameValue = name.value.trim();
            const emailValue = email.value.trim();
            const phoneValue = phone.value.trim();

            if (nameValue === "") {
                setError(name, "Name can't be blank");
            } else {
                setSuccess(name);
            }

            if (emailValue === "") {
                setError(email, "Email can't be blank");
            } else if (!isEmail(emailValue)) {
                setError(email, "Not a valid email");
            } else {
                setSuccess(email);
            }

            if (phoneValue === "") {
                setError(phone, "Phone number can't be blank");
            } else if (isNaN(phoneValue)) {
                setError(phone, "Not a valid phone number");
            } else {
                setSuccess(phone);
            }
        }

        function setError(input, message) {
            const formControl = input.parentElement;
            const errorMsg = formControl.querySelector(".input-msg3");
            formControl.className = "form-control text-left error";
            errorMsg.innerText = message;
        }

        function setSuccess(input) {
            const formControl = input.parentElement;
            formControl.className = "form-control success";
        }

        function isEmail(email) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
        }
    });

    return (
        <Styles>
            {/* Free Course */}
            <section className="free-course-area">
                <Container>
                    <Row>
                        <Col md="7">
                            <div className="course-text">
                                <h4>{Datas.secTitle}</h4>
                                <p>{Datas.subTitle}</p>
                            </div>
                            <div className="countdown-timer">
                                <Timer initialTime={10440 * 2970 * 980} direction="backward">
                                    <p><span><Timer.Days /></span>Days</p>
                                    <p><span><Timer.Hours /></span>Hours</p>
                                    <p><span><Timer.Minutes /></span>Minutes</p>
                                    <p><span><Timer.Seconds /></span>Seconds</p>
                                </Timer>
                            </div>
                        </Col>
                        <Col md="5">
                            <div className="register-form text-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.formBackground})` }}>
                                <div className="form-box">
                                    <h4 className="title">Sign Up Now</h4>
                                    <p className="desc">Get Free Courses</p>
                                    <form id="form3" className="form">
                                        <p className="form-control">
                                            <input type="text" minLength={3} maxLength={50} placeholder="Enter your Name" id="name3" />
                                            <span className="input-msg3"></span>
                                        </p>
                                        <p className="form-control">
                                            <input type="email" placeholder="Enter your Email" id="email3" />
                                            <span className="input-msg3"></span>
                                        </p>
                                        <p className="form-control">
                                            <input type="text" placeholder="Enter Phone NUmber" id="phone3" />
                                            <span className="input-msg3"></span>
                                        </p>
                                        <button>Send Request</button>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    );
}

export default FreeCourse
