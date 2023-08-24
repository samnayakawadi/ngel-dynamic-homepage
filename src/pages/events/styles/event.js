import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .event-page {
        .event-page-area {
            padding : 70px 0;
            .event-box {
                margin-bottom : 30px;
                .event-img {
                    a {
                        img {
                            border-radius : 5px;
                        }
                    }

                    @media(max-width: 991px) {
                        display : none;
                    }
                }
                .event-content {
                    position: relative;
                    .content-box {
                        box-shadow: 0 0px 20px rgba(0, 0, 0, 0.08);
                        padding   : 20px;
                        background: #ffffff;
                        border-radius : 5px;
                        position: absolute;
                        top     : 22px;
                        left    : -9%;
                        z-index : 1;
                        .event-title{
                            h6 {
                                margin-bottom: 10px;
                                a {
                                    color      : ${colors.black1};
                                    font-weight: 600;

                                    &:hover {
                                        color: ${colors.green};
                                    }
                                }
                            }
                        }

                        .event-time-location {
                            margin-bottom : 10px;
                            ul {
                                li {
                                    font-size : 13px;
                                    color: ${colors.text3};
                                    i {
                                        font-size : 18px;
                                        color: ${colors.green};
                                        vertical-align: top;
                                    }
                                    &:first-child {
                                        margin-right : 20px;
                                    }
                                }
                            }
                        }

                        .event-desc {
                            p {
                                font-size : 13px;
                                color: ${colors.text2};
                                line-height : 20px;
                            }

                            @media(max-width: 767px) {
                                margin-bottom: 10px;
                            }
                        }

                        .event-date {
                            position: relative;
                            margin-bottom : 20px;
                            padding-top: 6px;
                            &:before {
                                position : absolute;
                                content : '';
                                background : ${colors.border1};
                                width : 1px;
                                height : 100px;
                                top : 0;
                                left : -30px;

                                @media(max-width: 767px) {
                                    content : none;
                                }
                            }
                            p {
                                font-size : 20px;
                                color: ${colors.green};
                                font-weight: 500;
                                text-transform : uppercase;

                                @media(max-width: 767px) {
                                    float: left;
                                    font-size: 18px;
                                    margin-right: 20px;
                                }
                            }

                            @media(max-width: 767px) {
                                margin-bottom: 0;
                                padding-top: 0;
                            }
                        }

                        .join-btn {
                            a {
                                font-size : 12px;
                                color: ${colors.black2};
                                border: 1px solid ${colors.border3};
                                font-weight : 500;
                                text-transform : uppercase;
                                padding: 9px 12px 7px;
                                border-radius: 5px;
                                &:hover {
                                    color: #ffffff;
                                    background: ${colors.gr_bg};
                                    border-color : ${colors.green};
                                }

                                @media(max-width: 767px) {
                                    float: left;
                                    padding: 5px 10px 3px;
                                }
                            }
                        }

                        @media(max-width: 991px) {
                            position: unset;
                        }
                    }
                }
            }

            ul.pagination-box {
                margin-top: 50px;
            }

            .course-sidebar {
                @media(max-width: 991px) {
                    display : none;
                }
            }

            @media(max-width: 767px) {
                padding : 40px 0 35px;
            }
        }
    }
`;