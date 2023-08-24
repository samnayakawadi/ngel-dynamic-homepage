import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .event-details-page {
        .event-details-area {
            padding : 70px 0;
            .event-details-content {
                .heading {
                    h4 {
                        color : ${colors.black1};
                        font-weight: 600;
                        line-height: 35px;
                        margin-bottom: 10px;

                        @media(max-width: 767px) {
                            font-size : 20px;
                        }
                    }
                }
                .event-icon {
                    margin-bottom: 20px;
                    ul {
                        li {
                            font-size : 14px;
                            color : ${colors.black2};
                            margin-right: 20px;
                            i {
                                font-size : 20px;
                                color : ${colors.green};
                                vertical-align: top;
                            }
                            &:last-child {
                                margin-right : 0;
                            }

                            @media(max-width: 991px) {
                                margin-right: 5px;
                            }
                        }
                    }
                }
                .event-details-banner {
                    img {
                        border-radius: 5px;
                        margin-bottom: 30px;
                    }
                }

                .event-details-overview {
                    margin-bottom: 35px;
                    h5 {
                        color: ${colors.black2};
                        font-weight: 600;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
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

                        @media(max-width: 767px) {
                            font-size : 17px;
                        }
                    }
                    p {
                        font-size: 15px;
                        color: ${colors.text2};
                        line-height: 25px;
                        span {
                            background : ${colors.border1};
                            color: ${colors.black2};
                            display : block;
                            margin: 35px 0;
                            padding: 22px 28px;
                            border-radius: 5px;
                            position: relative;
                            i {
                                position: absolute;
                                top: -20px;
                                left: 50%;
                                margin-left: -20px;
                                font-size : 30px;
                                color : #ffffff;
                                background : ${colors.gr_bg};
                                width: 42px;
                                height: 42px;
                                text-align: center;
                                border-radius: 50%;
                                padding-top: 7px;
                            }
                        }
                    }
                    ul {
                        margin-top : 30px;
                        li {
                            font-size: 14px;
                            color: ${colors.text3};
                            line-height: 25px;
                            margin-bottom: 15px;
                            i {
                                float: left;
                                color: ${colors.green};
                                border: 1px solid ${colors.border3};
                                width: 35px;
                                height: 35px;
                                border-radius: 50%;
                                text-align: center;
                                padding-top: 9px;
                                margin-top: 8px;
                                margin-right: 15px;
                            }
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }

                .event-details-speaker {
                    margin-bottom: 28px;
                    h5 {
                        color: ${colors.black2};
                        font-weight: 600;
                        padding-bottom: 10px;
                        margin-bottom: 35px;
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

                        @media(max-width: 767px) {
                            font-size : 17px;
                        }
                    }
                    .event-speaker-item {
                        position     : relative;
                        margin-bottom: 55px;

                        img {
                            border-radius : 5px;
                        }

                        .img-content {
                            background: #ffffff;
                            box-shadow: 0 10px 18px rgba(0, 0, 0, 0.07);
                            position  : absolute;
                            bottom    : -30px;
                            left      : 10%;
                            width     : 80%;
                            z-index   : 1;
                            border-radius : 5px;
                            padding: 14px 0;

                            h6 {
                                color        : ${colors.black1};
                                font-weight  : 600;
                                margin-bottom: 15px;
                            }

                            ul {
                                li {
                                    a {
                                        i {
                                            font-size: 13px;
                                            color    : #ffffff;
                                            width    : 30px;
                                            height   : 30px;
                                            border-radius : 50%;
                                            padding-top: 9px;
                                            transition : all 0.2s ease;

                                            &:hover {
                                                background-color: ${colors.green} !important;
                                            }
                                        }

                                        i.fa-facebook-f {
                                            background-color: #4267B2;
                                        }

                                        i.fa-twitter {
                                            background-color: #1DA1F2;
                                        }

                                        i.fa-youtube {
                                            background-color: #DD1343;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .pre-nxt-event {
                    border : 1px solid ${colors.border1};
                    border-left: 0;
                    border-right: 0;
                    padding: 20px 0;
                    .next-prev-item {
                        img {
                            max-width : 110px;
                            border-radius : 5px;

                            @media(max-width: 991px) {
                                max-width: 55px;
                            }
                        }
                        p {
                            margin-bottom: 8px;
                            a {
                                font-size : 14px;
                                color : ${colors.black2};
                                font-weight : 500;
                                &:hover {
                                    color : ${colors.green};
                                    text-decoration : underline;
                                }

                                @media(max-width: 991px) {
                                    font-size : 13px;
                                }
                            }
                        }
                        span {
                            color : ${colors.text3};
                        }

                        .prev-img {
                            img {
                                margin-right : 15px;

                                @media(max-width: 991px) {
                                    margin-right: 6px;
                                }
                            }
                        }

                        .next-img {
                            img {
                                margin-left : 15px;

                                @media(max-width: 991px) {
                                    margin-left: 6px;
                                }
                            }
                        }
                    }

                    @media(max-width: 767px) {
                        margin-bottom: 40px;
                    }
                }
            }

            .event-details-sidebar {
                .event-sidebar-info {
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                    border-radius: 5px;
                    padding: 20px 20px 20px;
                    .event-sidebar-timer {
                        margin-bottom: 25px;
                        p {
                            display: inline-block;
                            background: ${colors.gr_bg};
                            margin-right: 5px;
                            width: 68px;
                            height: 65px;
                            font-size: 20px;
                            color : #ffffff;
                            font-weight : 500;
                            border-radius: 5px;
                            padding-top: 6px;
                            span {
                                display : block;
                                font-size: 13px;
                                font-weight: normal;
                                text-transform: uppercase;
                            }
                            &:last-child {
                                margin-right: 0;
                            }

                            @media(max-width: 1199px) {
                                margin-right: 3px;
                                width: 58px;
                                height: 60px;
                                font-size: 18px;
                            }
                        }
                    }

                    ul.event-info-list {
                        margin-bottom: 20px;
                        li {
                            border-top: 1px dashed ${colors.border3};
                            padding: 12px 0;
                            font-size : 14px;
                            color : ${colors.black2};
                            font-weight: 500;
                            span {
                                float : right;
                                font-size: 13px;
                                color: ${colors.text3};
                                font-weight: 400;
                                line-height: 20px;

                                @media(max-width: 1199px) {
                                    font-size: 12px;
                                }
                            }
                            &:first-child {
                                border-top : none;
                                padding-top : 0;
                            }
                            &:last-child {
                                padding-bottom : 0;
                            }
                        }
                    }

                    button.buy-btn {
                        font-size: 16px;
                        color: #fff;
                        background: ${colors.gr_bg};
                        display: inline-block;
                        width: 100%;
                        height: 40px;
                        font-weight : 500;
                        border : none;
                        padding: 9px;
                        border-radius: 5px;
                        &:hover {
                            background: ${colors.gr_bg2};
                        }
                    }

                    @media(max-width: 1199px) {
                        padding: 15px;
                    }
                }
            }

            @media(max-width: 767px) {
                padding: 20px 0 30px;
            }
        }
    }
`;