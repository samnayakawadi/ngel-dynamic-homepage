import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    footer.footer2 {
        background-size    : cover;
        background-position: center;
        background-repeat  : no-repeat;
        position           : relative;
        padding            : 70px 0 80px;

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

        .footer-logo-info {
            img {
                max-width : 100%;
                margin-bottom: 30px;

                @media(max-width: 767px) {
                    margin-bottom: 18px;
                }
            }

            p {
                font-size    : 14px;
                color        : ${colors.text3};
                line-height  : 28px;
                margin-bottom: 20px;

                @media(max-width: 991px) {
                    line-height: 25px;
                    margin-bottom: 12px;
                }
            }

            ul {
                li {
                    color        : ${colors.text3};
                    margin-bottom: 12px;

                    i {
                        font-size     : 18px;
                        color         : ${colors.green};
                        width         : 35px;
                        vertical-align: top;

                        @media(max-width: 991px) {
                            width : 20px;
                        }
                    }

                    &:last-child {
                        margin-bottom : 0;
                    }
                }
            }

            @media(max-width: 767px) {
                margin-bottom: 30px;
            }
        }

        .f-links {
            padding-left: 25px;

            h5 {
                color         : ${colors.border1};
                text-transform: uppercase;
                margin-top    : 8px;
                margin-bottom : 35px;

                @media(max-width: 991px) {
                    font-size: 18px;
                    margin-bottom: 29px;
                }

                @media(max-width: 767px) {
                    margin-bottom: 10px;
                }
            }

            ul {
                li {
                    a {
                        font-size  : 14px;
                        color      : ${colors.text3};
                        line-height: 39px;

                        i {
                            font-size   : 12px;
                            color       : ${colors.green};
                            margin-right: 10px;

                            @media(max-width: 991px) {
                                margin-right: 5px;
                            }
                        }

                        &:hover {
                            color: ${colors.green};
                        }
                    }
                }
            }

            @media(max-width: 991px) {
                padding-left : 0;
            }

            @media(max-width: 767px) {
                margin-bottom: 30px;
            }
        }

        .f-post {
            h5 {
                color         : ${colors.border1};
                text-transform: uppercase;
                margin-top    : 8px;
                margin-bottom : 42px;

                @media(max-width: 991px) {
                    font-size: 18px;
                    margin-bottom: 39px;
                }

                @media(max-width: 767px) {
                    margin-bottom: 10px;
                }
            }

            .post-box {
                margin-bottom: 22px;

                .po-icon {
                    i {
                        font-size   : 26px;
                        color       : ${colors.green};
                        line-height : 30px;
                        margin-right: 10px;
                    }
                }

                .po-content {
                    a {
                        font-size    : 14px;
                        color        : ${colors.text3};
                        display      : inline-block;
                        margin-bottom: 3px;

                        &:hover {
                            color: ${colors.green};
                        }
                    }

                    span {
                        display: block;
                        color  : ${colors.text2};
                    }
                }

                &:last-child {
                    margin-bottom: 0;
                }

                @media(max-width: 991px) {
                    margin-bottom: 10px;
                }
            }

            @media(max-width: 767px) {
                margin-bottom: 30px;
            }
        }

        .f-newsletter {
            h5 {
                color         : ${colors.border1};
                text-transform: uppercase;
                margin-top    : 8px;
                margin-bottom : 38px;

                @media(max-width: 991px) {
                    font-size: 18px;
                    margin-bottom: 37px;
                }

                @media(max-width: 767px) {
                    margin-bottom: 10px;
                }
            }

            p {
                font-size    : 14px;
                color        : ${colors.text3};
                line-height  : 25px;
                margin-bottom: 22px;
            }

            form.form {
                p.form-control {
                    padding      : 0;
                    width        : auto;
                    height       : auto;
                    background   : transparent;
                    border       : none;
                    margin-bottom: 25px;
                    position     : relative;

                    input {
                        width       : 100%;
                        height      : 40px;
                        border      : 1px solid ${colors.text2};
                        background  : transparent;
                        color       : ${colors.border1};
                        padding-left: 15px;
                        border-radius : 5px;

                        &::placeholder {
                            font-style: italic;
                            color     : ${colors.text3};
                        }
                    }

                    span {
                        font-size: 13px;
                        color      : ${colors.green};
                        font-weight: 300;
                        position   : absolute;
                        bottom     : -22px;
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
                    font-size  : 15px;
                    color      : ${colors.border1};
                    background : ${colors.gr_bg};
                    width      : 100%;
                    height     : 40px;
                    font-weight: 500;
                    border     : none;
                    border-radius : 5px;

                    &:hover {
                        background: ${colors.gr_bg2};
                    }
                }
            }
        }

        .copytext-area {
            border-top : 1px solid ${colors.black2};
            padding-top: 45px;
            margin-top : 40px;

            p {
                font-size    : 14px;
                color        : ${colors.text3};
                margin-bottom: 25px;

                i {
                    color : ${colors.green};
                    margin: 0 2px;
                }

                a {
                    color: ${colors.green};

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            ul.social {
                li {
                    a {
                        text-align: center;
                        position  : relative;
                        height    : 18px;
                        display   : inline-block;

                        &:before {
                            content           : "";
                            position          : absolute;
                            border-width      : 9px 17px;
                            border-style      : solid;
                            border-top-color  : transparent;
                            border-right-color: transparent;
                            border-left-color : transparent;
                            top               : -18px;
                            left              : 0;
                            z-index           : 1;
                            transition : all 0.2s ease;
                        }

                        &:after {
                            content            : "";
                            position           : absolute;
                            border-width       : 9px 17px;
                            border-style       : solid;
                            border-right-color : transparent;
                            border-bottom-color: transparent;
                            border-left-color  : transparent;
                            bottom             : -18px;
                            left               : 0;
                            z-index            : 1;
                            transition : all 0.2s ease;
                        }

                        i {
                            font-size: 14px;
                            color    : #ffffff;
                            width    : 34px;
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
                }
            }
        }

        @media(max-width: 767px) {
            padding: 50px 0;
        }
    }
`;