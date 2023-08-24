import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .coming-soon-page {
        .coming-soon-area {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height : 750px;
            position: relative;
            &:before {
                position: absolute;
                content: '';
                background: rgba(255, 255, 255, 0.98);
                opacity: 0.9;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            .cm-table {
                display: table;
                width: 100%;
                height: 100%;
                .cm-tablecell {
                    display: table-cell;
                    vertical-align: middle;
                    .cm-logo {
                        img {
                            margin-bottom : 20px;
                        }
                    }
                    .launching-text {
                        p {
                            font-size : 52px;
                            color    : ${colors.black1};
                            font-weight: 800;
                            margin-bottom : 40px;

                            @media(max-width: 767px) {
                                font-size : 36px;
                            }

                            @media(max-width: 575px) {
                                font-size : 30px;
                                font-weight: 600;
                                margin-bottom: 25px;
                            }
                        }
                    }
                    .countdown-timer {
                        margin-bottom: 45px;
                        p {
                            display: inline-block;
                            padding: 22px 0;
                            margin: 0 10px;
                            font-size: 14px;
                            color: #ffffff;
                            background-color: ${colors.black1};
                            width: 110px;
                            border-radius: 5px;
                            text-transform: capitalize;

                            span {
                                font-size     : 48px;
                                color         : ${colors.green};
                                font-weight: 600;
                                display       : block;
                                letter-spacing: 0;
                                margin-top    : -12px;
                                margin-bottom : -10px;

                                @media(max-width: 767px) {
                                    font-size : 36px;
                                    margin-top: -9px;
                                }

                                @media(max-width: 575px) {
                                    font-size : 28px;
                                    margin-bottom: -7px;
                                }
                            }

                            @media(max-width: 767px) {
                                padding: 18px 0;
                                font-size : 13px;
                                width: 90px;
                            }

                            @media(max-width: 575px) {
                                padding: 15px 0;
                                width: 80px;
                                margin: 0 5px;
                            }
                        }

                        @media(max-width: 575px) {
                            margin-bottom: 25px;
                        }
                    }

                    .email-subscrition {
                        margin-bottom : 50px;
                        p.sub-text {
                            font-size: 20px;
                            color: ${colors.text2};
                            font-weight: 500;
                            margin-bottom: 10px;
                        }

                        form.form {
                            width: 600px;
                            margin: auto;
                            position: relative;
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
                                    height          : 52px;
                                    background      : transparent;
                                    font-size       : 14px;
                                    padding         : 15px 20px;
                                    color           : ${colors.black1};
                                    border          : 2px solid ${colors.green};
                                    border-radius : 5px;

                                    &::placeholder {
                                        font-size : 14px;
                                        color     : ${colors.text1};
                                    }

                                    @media(max-width: 575px) {
                                        height : 43px;
                                        padding : 11px 15px;
                                    }
                                }

                                span {
                                    color      : ${colors.red};
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
                                    top        : 9px;
                                    right      : 120px;
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
                                    top        : 9px;
                                    right      : 120px;
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
                                background : ${colors.gr_bg};
                                width: 100px;
                                height: 40px;
                                position: absolute;
                                top: 6px;
                                right: 6px;
                                font-weight: 500;
                                border: none;
                                border-radius: 5px;
                                text-transform: uppercase;

                                &:hover {
                                    background: ${colors.gr_bg2};
                                }

                                @media(max-width: 575px) {
                                    height: 33px;
                                    top: 5px;
                                    right: 5px;
                                }
                            }

                            @media(max-width: 767px) {
                                width: 90%;
                            }
                        }

                        @media(max-width: 575px) {
                            margin-bottom : 40px;
                        }
                    }

                    .cm-social {
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
                            }
                        }
                    }
                }
            }

            @media(max-width: 767px) {
                height : 550px;
            }
        }
    }
`;