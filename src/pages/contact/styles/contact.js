import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .contact-page {
        .contact-area {
            padding : 68px 0 0;
            .contact-box-title {
                h4 {
                    color: ${colors.black1};
                    font-weight: 600;
                    padding-bottom: 10px;
                    margin-bottom: 30px;
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

                    @media(max-width: 575px) {
                        font-size: 20px;
                    }
                }
            }

            .contact-icon-box {
                margin-bottom: 30px;
                i {
                    font-size : 32px;
                    color: ${colors.green};
                    width: 65px;
                    height: 65px;
                    border: 1px solid ${colors.border3};
                    text-align: center;
                    border-radius : 50%;
                    padding-top: 15px;
                    margin-top: 5px;
                    margin-right : 20px;

                    @media(max-width: 991px) {
                        font-size: 26px;
                        width: 50px;
                        height: 50px;
                        padding-top: 10px;
                        margin-right: 12px;
                    }
                }
                h5 {
                    color: ${colors.black2};
                    font-weight: 600;
                    margin-bottom: 8px;

                    @media(max-width: 991px) {
                        font-size: 16px;
                    }
                }
                p {
                    font-size : 14px;
                    color: ${colors.text3};

                    @media(max-width: 991px) {
                        font-size: 13px;
                    }
                }

                @media(max-width: 767px) {
                    margin-bottom: 20px;
                }
            }

            .contact-social {
                margin-top: 45px;
                ul.social {
                    li {
                        margin-right: 10px;
                        a {
                            text-align: center;
                            position  : relative;
                            height    : 20px;
                            display   : inline-block;

                            &:before {
                                content           : "";
                                position          : absolute;
                                border-width      : 10px 18px;
                                border-style      : solid;
                                border-top-color  : transparent;
                                border-right-color: transparent;
                                border-left-color : transparent;
                                top               : -20px;
                                left              : 0;
                                z-index           : 1;
                                transition : all 0.2s ease;
                            }

                            &:after {
                                content            : "";
                                position           : absolute;
                                border-width       : 10px 18px;
                                border-style       : solid;
                                border-right-color : transparent;
                                border-bottom-color: transparent;
                                border-left-color  : transparent;
                                bottom             : -20px;
                                left               : 0;
                                z-index            : 1;
                                transition : all 0.2s ease;
                            }

                            i {
                                font-size: 15px;
                                color    : #ffffff;
                                width    : 36px;
                                padding-top: 3px;
                            }

                            &:hover {
                                background-color: ${colors.green} !important;

                                &:before {
                                    border-bottom-color: ${colors.green} !important;
                                }

                                &:after {
                                    border-top-color: ${colors.green} !important;
                                }
                            }
                        }

                        &:nth-child(1) {
                            a {
                                background-color: #4267B2;

                                &:before {
                                    border-bottom-color: #4267B2;
                                }

                                &:after {
                                    border-top-color: #4267B2;
                                }
                            }
                        }

                        &:nth-child(2) {
                            a {
                                background-color: #1DA1F2;

                                &:before {
                                    border-bottom-color: #1DA1F2;
                                }

                                &:after {
                                    border-top-color: #1DA1F2;
                                }
                            }
                        }

                        &:nth-child(3) {
                            a {
                                background-color: #2867B2;

                                &:before {
                                    border-bottom-color: #2867B2;
                                }

                                &:after {
                                    border-top-color: #2867B2;
                                }
                            }
                        }

                        &:nth-child(4) {
                            a {
                                background-color: #DD1343;

                                &:before {
                                    border-bottom-color: #DD1343;
                                }

                                &:after {
                                    border-top-color: #DD1343;
                                }
                            }
                        }

                        &:nth-child(5) {
                            a {
                                background-color: #ea4c89;

                                &:before {
                                    border-bottom-color: #ea4c89;
                                }

                                &:after {
                                    border-top-color: #ea4c89;
                                }
                            }
                        }

                        &:last-child {
                            margin-right : 0;
                        }

                        @media(max-width: 991px) {
                            margin-right: 6px;
                        }
                    }
                }

                @media(max-width: 767px) {
                    margin-top: 30px;
                    margin-bottom: 40px;
                }
            }

            .contact-form {
                margin-bottom: 70px;
                .form-title {
                    h4 {
                        color: ${colors.black1};
                        font-weight: 600;
                        padding-bottom: 10px;
                        margin-bottom: 30px;
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

                        @media(max-width: 575px) {
                            font-size: 20px;
                        }
                    }
                }
                .form-box {
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
                                height          : 46px;
                                background-color: #ffffff;
                                font-size       : 14px;
                                padding         : 15px 20px;
                                color           : ${colors.black1};
                                border          : 1px solid ${colors.border3};
                                border-radius : 5px;

                                &::placeholder {
                                    font-size : 14px;
                                    color     : ${colors.text2};
                                }

                                &:focus {
                                    border-color : ${colors.green};
                                }

                                @media(max-width: 480px) {
                                    height: 38px;
                                }
                            }

                            textarea {
                                width           : 100%;
                                height          : 135px;
                                background-color: #ffffff;
                                font-size       : 14px;
                                padding         : 15px 20px;
                                color           : ${colors.black1};
                                border          : 1px solid ${colors.border3};
                                border-radius : 5px;

                                &::placeholder {
                                    font-size : 14px;
                                    color     : ${colors.text2};
                                }

                                &:focus {
                                    border-color : ${colors.green};
                                }

                                @media(max-width: 480px) {
                                    height: 120px;
                                }
                            }

                            span {
                                color      : ${colors.red};
                                font-weight: 300;
                                position   : absolute;
                                bottom     : -20px;
                                left       : 0;
                                visibility : hidden;
                            }
                        }

                        p.form-control.success {
                            input,
                            textarea {
                                border: 2px solid ${colors.green};
                            }

                            &::before {
                                position   : absolute;
                                content    : "\f058";
                                font-family: "Line Awesome Free";
                                font-size  : 24px;
                                color      : ${colors.green};
                                font-weight: 900;
                                top        : 5px;
                                right      : 10px;
                            }
                        }

                        p.form-control.error {
                            input,
                            textarea {
                                border: 2px solid ${colors.red};
                            }

                            &::before {
                                position   : absolute;
                                content    : "\f06a";
                                font-family: "Line Awesome Free";
                                font-size  : 24px;
                                color      : ${colors.red};
                                font-weight: 900;
                                top        : 5px;
                                right      : 10px;
                            }
                        }

                        p.form-control.error {
                            span {
                                visibility: visible;
                            }
                        }

                        button {
                            font-size  : 16px;
                            color      : #fff;
                            // background : ${colors.gr_bg};
                            width      : 100%;
                            height     : 48px;
                            font-weight: 500;
                            border     : none;
                            border-radius : 5px;
                            text-transform: uppercase;

                            &:hover {
                                // background: ${colors.gr_bg2};

                                i {
                                    color: #ffffff;
                                }
                            }

                            @media(max-width: 575px) {
                                font-size: 14px;
                            }

                            @media(max-width: 480px) {
                                height: 38px;
                            }
                        }
                    }
                }

                @media(max-width: 767px) {
                    margin-bottom: 40px;
                }
            }
            .google-map-area {
                width: 100%;
                height: 450px;

                @media(max-width: 767px) {
                    height: 370px;
                }

                @media(max-width: 480px) {
                    height: 320px;
                }
            }

            @media(max-width: 767px) {
                padding : 30px 0 0;
            }
        }
    }
`;