import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Styles } from '../styles/commentForm.js';
import UserService from '../../../services/UserService.js';

function CommentForm() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    useEffect(() => {
        const form = document.getElementById("comment_form");
        const desc = document.getElementById("comment_form-desc");
        const name = document.getElementById("comment_form-name");
        const email = document.getElementById("comment_form-email");

        form.addEventListener("submit", formSubmit);

        function formSubmit(e) {
            e.preventDefault();

            const descValue = desc.value.trim();
            const nameValue = name.value.trim();
            const emailValue = email.value.trim();

            if (descValue === "") {
                setError(desc, "Comment can't be blank");
            } else {
                setSuccess(desc);
            }

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
        }

        function setError(input, message) {
            const formControl = input.parentElement;
            const errorMsg = formControl.querySelector(".comment_form-input-msg");
            formControl.className = "form-control error";
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
            {/* Comment Form */}
            <div className="blog-comment-form">
                <h5>Leave a message here</h5>
                <form id="comment_form" className="form">
                    <Row>
                        <Col md="12">
                            <p className="form-control">
                                <textarea name="comment" id="comment_form-desc" placeholder="Enter your comment"></textarea>
                                <span className="comment_form-input-msg"></span>
                            </p>
                        </Col>
                        <Col md="6">
                            <p className="form-control">
                                <input type="name" placeholder="Enter your name" id="comment_form-name" />
                                <span className="comment_form-input-msg"></span>
                            </p>
                        </Col>
                        <Col md="6">
                            <p className="form-control">
                                <input type="email" placeholder="Enter your email" id="comment_form-email" />
                                <span className="comment_form-input-msg"></span>
                            </p>
                        </Col>
                        <Col md="12">
                            <button>Post Comment</button>
                        </Col>
                    </Row>
                </form>
            </div>
        </Styles>
    )
}

export default CommentForm