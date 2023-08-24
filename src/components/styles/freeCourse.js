import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .free-course-area {
        padding: 70px 0;

        .course-text {
            padding-right: 50px;
            margin-top   : 40px;

            h4 {
                color        : ${colors.black1};
                line-height  : 35px;
                font-weight  : 600;
                margin-bottom: 25px;

                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }

            p {
                font-size    : 15px;
                color        : ${colors.text3};
                line-height  : 28px;
                margin-bottom: 45px;

                @media(max-width: 575px) {
                    font-size: 14px;
                    margin-bottom: 20px;
                }
            }

            @media(max-width: 767px) {
                margin-top   : 0;
            }
        }

        .countdown-timer {
            p {
                display       : inline-block;
                border-right  : 1px solid ${colors.border1};
                padding       : 0 25px;
                font-size     : 14px;
                color         : ${colors.text2};
                font-weight   : 500;
                text-transform: capitalize;

                span {
                    font-size     : 48px;
                    color         : ${colors.green};
                    display       : block;
                    letter-spacing: 0;
                    margin-top    : -12px;
                    margin-bottom : -10px;

                    @media(max-width: 991px) {
                        font-size     : 32px;
                    }
                }

                &:first-child {
                    border-left: 1px solid ${colors.border1};
                }

                @media(max-width: 991px) {
                    padding       : 0 20px;
                }
            }

            @media(max-width: 767px) {
                margin-bottom   : 40px;
            }
        }

        .register-form {
            background-size    : cover;
            background-position: center;
            background-repeat  : no-repeat;
            position           : relative;
            border-radius : 5px;
            overflow: hidden;

            &::before {
                position  : absolute;
                content   : "";
                background: ${colors.green2};
                opacity   : 0.93;
                width     : 100%;
                height    : 100%;
                top       : 0;
                left      : 0;
            }

            .form-box {
                padding : 30px 40px 40px;
                position: relative;
                z-index : 111;

                h4.title {
                    color         : #ffffff;
                    text-transform: uppercase;
                    font-weight   : 500;
                    margin-bottom : 6px;

                    @media(max-width: 575px) {
                        font-size: 20px;
                    }
                }

                p.desc {
                    font-size    : 14px;
                    color        : #ffffff;
                    margin-bottom: 20px;

                    @media(max-width: 575px) {
                        font-size: 13px;
                    }
                }

                form.form {
                    p.form-control {
                        padding      : 0;
                        width        : auto;
                        height       : auto;
                        background   : transparent;
                        border       : none;
                        margin-bottom: 28px;
                        position     : relative;

                        input {
                            width           : 100%;
                            height          : 48px;
                            background-color: #ffffff;
                            font-size       : 14px;
                            padding         : 15px 20px;
                            color           : ${colors.black1};
                            border          : none;
                            border-radius : 5px;

                            &::placeholder {
                                font-size : 14px;
                                font-style: italic;
                                color     : ${colors.bg1};
                            }
                        }

                        span {
                            color      : #ffffff;
                            font-weight: 300;
                            position   : absolute;
                            bottom     : -20px;
                            left       : 0;
                            visibility : hidden;
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
                        font-size  : 14px;
                        color      : #fff;
                        background : ${colors.black1};
                        width      : 100%;
                        height     : 48px;
                        font-weight: 500;
                        border     : none;
                        border-radius : 5px;
                        text-transform: uppercase;

                        &:hover {
                            background: ${colors.green};

                            i {
                                color: #ffffff;
                            }
                        }
                    }
                }

                @media(max-width: 575px) {
                    padding: 20px 25px 25px;
                }
            }
        }

        @media(max-width: 767px) {
            padding: 30px 0 40px;
        }
    }
`;