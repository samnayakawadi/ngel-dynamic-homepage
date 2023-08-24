import styled from "styled-components";
import { colors } from "../../../../components/common/element/elements.js";

export const Styles = styled.div`

    /* Course Grid */
    .course-grid-area {
        padding: 70px 0;
        .course-items {
            .course-item {
                border: 1px solid ;
                border-radius : 5px;
                transition : all 0.2s ease;
                overflow : hidden;
                margin-bottom: 30px;

                .course-image {
                    width              : 100%;
                    height             : 240px;
                    background-size    : cover;
                    background-position: center;
                    background-repeat  : no-repeat;
                    border-radius : 5px 5px 0 0;
                    position: relative;

                    .author-img {
                        position: absolute;
                        left    : 20px;
                        bottom  : 20px;
                        overflow : hidden;
                    
                        img {
                            max-width: 40px;
                            border-radius : 50%;
                            margin-right: 5px;
                            transform: scale(1);
                            transition: 0.3s ease;
                        }

                        .title {
                            background: #ffffff;
                            padding   : 3px 8px;
                            border-radius : 5px;

                            p {
                                font-size    : 12px;
                                color        : ${colors.black1};
                                font-weight  : 500;
                                margin-bottom: -4px;
                            }

                            span {
                                font-size  : 11px;
                                color      : ${colors.text3};
                                font-weight: 500;
                            }
                        }

                    }
                    .column {
                        float: left;
                        width: 50%;
                      }

                    .course-price {
                        p {
                            font-size  : 16px;
                            color      : #ffffff;
                            background : ${colors.bg1};
                            position   : absolute;
                            right      : 20px;
                            bottom     : 20px;
                            padding    : 8px 10px;
                            font-weight: 500;
                            border-radius : 5px;
                        }
                    }

                    @media(max-width: 767px) {
                        height: 185px;
                    }

                    .layer-box {
                        position: absolute;
                        background: rgba(255, 255, 255, 0.8);
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        visibility: hidden;
                        opacity: 0;
                        z-index: -1;
                        transition: 0.3s ease;
                    }
                    a.add_cart {
                        position: absolute;
                        font-size : 15px;
                        top : 33%;
                        left : 100%;
                        z-index : 1;
                        background: transparent;
                        border : 2px solid ${colors.green};
                        font-size: 13px;
                        color: ${colors.green};
                        font-weight: 600;
                        text-transform: uppercase;
                        width: 80px;
                        height: 38px;
                        border-radius: 5px;
                        padding-top: 8px;
                        text-align: center;
                        transition: 0.2s ease;
                        &:hover {
                            background: ${colors.gr_bg};
                            color : #ffffff;
                        }

                        @media(max-width: 1199px) {
                            top: 30%;
                        }

                        @media(max-width: 767px) {
                            top: 35%;
                        }
                    }
                    a.item_view {
                        position: absolute;
                        font-size : 15px;
                        bottom : 33%;
                        right : 100%;
                        z-index : 1;
                        background: transparent;
                        border : 2px solid ${colors.black1};
                        font-size: 13px;
                        color: ${colors.black1};
                        font-weight: 600;
                        text-transform: uppercase;
                        width: 80px;
                        height: 38px;
                        border-radius: 5px;
                        padding-top: 8px;
                        text-align: center;
                        transition: 0.2s ease;
                        &:hover {
                            background: ${colors.black1};
                            color : #ffffff;
                        }

                        @media(max-width: 1199px) {
                            bottom: 30%;
                        }

                        @media(max-width: 767px) {
                            bottom: 35%;
                        }
                    }
                    &:hover {
                        img {
                            transform: scale(1.1);
                        }
                        .layer-box {
                            visibility: visible;
                            z-index: 1;
                            opacity: 1;
                        }
                        a.add_cart {
                            left: 47%;
                            margin-left: -22px;

                            @media(max-width: 1199px) {
                                left: 32%;
                                margin-left: -22px;
                            }

                            @media(max-width: 767px) {
                                left: 50%;
                                margin-left: -60px;
                            }
                        }
                        a.item_view {
                            right : 43%;
                            margin-right: -22px;

                            @media(max-width: 1199px) {
                                right: 32%;
                                margin-right: -24px;
                            }

                            @media(max-width: 767px) {
                                right: 50%;
                                margin-right: -60px;
                            }
                        }
                    }
                }

                .course-content {
                    background: #fff;
                    padding   : 20px 25px;

                    h6.heading {
                        a {
                            color        : ${colors.black1};
                            font-weight  : 600;
                            display      : inline-block;
                            margin-bottom: 12px;

                            &:hover {
                                color: ${colors.green};
                            }
                        }
                    }

                    p.desc {
                        font-size     : 14px;
                        color         : ${colors.text3};
                        line-height   : 25px;
                        border-bottom : 1px solid ${colors.border1};
                        padding-bottom: 10px;
                        margin-bottom : 12px;
                    }

                    .course-face {

                        .duration,
                        .student {
                            p {
                                font-size: 13px;
                                color    : ${colors.text3};

                                i {
                                    font-size     : 16px;
                                    color         : ${colors.green};
                                    vertical-align: text-bottom;
                                    margin-right  : 3px;
                                }
                            }
                        }
                        .course-date {
                            p {
                                font-size: 14px;
                                color    : ${colors.text3};
                                i {
                                    font-size     : 16px;
                                    color         : ${colors.green};
                                    vertical-align: text-bottom;
                                    margin-right  : 3px;
                                }
                            }
                        }

                        .course-date1 {
                            p {
                                font-size: 14px;
                                color    : ${colors.text3};
                                line-height   : 25px;
                                border-bottom : 1px solid ${colors.border1};
                                padding-bottom: 10px;
                                i {
                                    font-size     : 16px;
                                    color         : ${colors.green};
                                    vertical-align: text-bottom;
                                    margin-right  : 3px;
                                }
                            }
                        }

                        .rating {
                            ul {
                                li {
                                    margin-right: 0;

                                    i {
                                        font-size: 14px;
                                        color    : ${colors.yellow};
                                    }

                                    &:last-child {
                                        font-size: 13px;
                                        color    : ${colors.text3};
                                    }
                                }
                            }
                        }
                    }
                }

                &:hover {
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.07);
                }
            }
        }

        @media(max-width: 767px) {
            padding: 40px 0 30px;
        }
    }
`;