import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .home-contact-area {
        background-size    : cover;
        background-position: center;
        background-repeat  : no-repeat;
        padding            : 65px 0 70px;
        position           : relative;

        &:before {
            position  : absolute;
            content   : "";
            background: ${colors.bg1};
            opacity   : 0.98;
            width     : 100%;
            height    : 100%;
            top       : 0;
            left      : 0;
        }

        .sec-title {
            h4 {
                color        : #ffffff;
                line-height  : 35px;
                font-weight  : 600;
                max-width    : 550px;
                margin       : auto;
                margin-bottom: 45px;

                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }
        }

        form.form {
            p.form-control {
                padding   : 0;
                width     : auto;
                height    : auto;
                background: transparent;
                border    : none;
                position  : relative;

                input {
                    width           : 100%;
                    height          : 50px;
                    background-color: rgba(255, 255, 255, 0.08);
                    font-size       : 15px;
                    padding         : 15px 20px;
                    color           : ${colors.border1};
                    border          : none;
                    border-radius : 5px;

                    &:focus {
                        background-color: #ffffff;
                        color           : ${colors.black1};

                        &::placeholder {
                            color: ${colors.black1};
                        }
                    }

                    &::placeholder {
                        font-size  : 15px;
                        font-style : italic;
                        color      : ${colors.border1};
                        font-weight: 300;
                    }
                }

                span {
                    color      : ${colors.border1};
                    font-weight: 300;
                    position   : absolute;
                    bottom     : -22px;
                    left       : 0;
                    visibility : hidden;
                }

                @media(max-width: 767px) {
                    margin-bottom: 30px;
                }
            }

            p.form-control.success {
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
                width     : 180px;
                height    : 50px;
                border    : none;
                border-radius : 5px;
                margin-top: 50px;

                &:hover {
                    background: ${colors.gr_bg2};
                }

                @media(max-width: 767px) {
                    margin-top: 5px;
                }
            }
        }

        @media(max-width: 767px) {
            padding: 30px 0 40px;
        }
    }
`;