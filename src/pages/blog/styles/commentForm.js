import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .blog-comment-form {
        h5 {
            color: ${colors.black2};
            font-weight: 600;
            padding-bottom: 10px;
            margin-bottom: 25px;
            position: relative;
            &:before {
                position: absolute;
                content: "";
                background: ${colors.green};
                width: 50px;
                height: 2px;
                bottom: 0;
                left: 0;
            }
        }

        form.form {
            .star-rating {
                display: inline-block;
                margin-bottom: 15px;

                input {
                    display: none;
                }

                label {
                    font-size: 30px;
                    color: ${colors.text4};
                    margin-right: 5px;
                    float: right;
                    transition: all 0.1s ease;
                    cursor: pointer;
                }

                input:checked ~ label,
                input:not(:checked) ~ label:hover,
                input:not(:checked) ~ label:hover ~ label{
                    color: ${colors.yellow};
                }
            }

            p.form-control {
                padding   : 0;
                width     : auto;
                height    : auto;
                background: transparent;
                border    : none;
                margin-bottom : 30px;
                position  : relative;

                textarea {
                    width           : 100%;
                    height          : 150px;
                    background      : transparent;
                    border          : 1px solid ${colors.border3};
                    font-size       : 15px;
                    padding         : 15px 20px;
                    color           : ${colors.black2};
                    border-radius   : 5px;

                    &:focus {
                        border-color: ${colors.green};
                    }

                    &::placeholder {
                        font-size  : 15px;
                        color      : ${colors.text2};
                    }
                }

                input {
                    width           : 100%;
                    height          : 50px;
                    background      : transparent;
                    border          : 1px solid ${colors.border3};
                    font-size       : 15px;
                    padding         : 15px 20px;
                    color           : ${colors.black2};
                    border-radius   : 5px;

                    &:focus {
                        border-color: ${colors.green};
                    }

                    &::placeholder {
                        font-size  : 15px;
                        color      : ${colors.text2};
                    }
                }

                span {
                    color      : ${colors.red};
                    font-weight: 500;
                    position   : absolute;
                    bottom     : -22px;
                    left       : 0;
                    visibility : hidden;
                }
            }

            p.form-control.success {
                textarea,
                input {
                    border: 2px solid ${colors.green};
                }

                &::before {
                    position   : absolute;
                    content    : "\f058";
                    font-family: "Line Awesome Free";
                    font-size  : 24px;
                    color      : ${colors.green};
                    font-weight: 900;
                    top        : 8px;
                    right      : 10px;
                }
            }

            p.form-control.error {
                textarea,
                input {
                    border: 2px solid ${colors.red};
                }

                &::before {
                    position   : absolute;
                    content    : "\f06a";
                    font-family: "Line Awesome Free";
                    font-size  : 24px;
                    color      : ${colors.red};
                    font-weight: 900;
                    top        : 8px;
                    right      : 10px;
                }
            }

            p.form-control.error {
                span {
                    visibility: visible;
                }
            }

            button {
                font-size : 15px;
                color     : #fff;
                background: ${colors.gr_bg};
                width     : 200px;
                height    : 50px;
                border    : none;
                font-weight: 500;
                border-radius : 5px;
                margin-top: 5px;

                &:hover {
                    background: ${colors.gr_bg2};
                }
            }
        }
    }
`;