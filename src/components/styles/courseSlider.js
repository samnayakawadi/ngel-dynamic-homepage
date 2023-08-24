import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .course-slider-area {
        padding: 63px 0;

        .sec-title {
            h4 {
                color        : ${colors.black1};
                line-height  : 35px;
                font-weight  : 600;
                max-width    : 550px;
                margin       : auto;
                margin-bottom: 42px;
                
                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }
        }

        .course-slider {
            position: relative;

            .course-item {
                border: 1px solid ${colors.border1};
                border-radius : 5px;
                transition : all 0.2s ease;
                margin-bottom: 30px;

                .course-image {
                    width              : 100%;
                    height             : 220px;
                    background-size    : cover;
                    background-position: center;
                    background-repeat  : no-repeat;
                    border-radius : 5px 5px 0 0;
                    position: relative;

                    .author-img {
                        position: absolute;
                        left    : 20px;
                        bottom  : 20px;

                        img {
                            max-width: 40px;
                            border-radius : 50%;
                            margin-right: 5px;
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
                }

                .course-content {
                    background: #fff;
                    padding   : 20px 25px;
                    border-radius : 0 0 5px 5px;

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

            .slider-dot {
                margin-top: 18px !important;

                .swiper-pagination-bullet {
                    width     : 22px;
                    height    : 9px;
                    background: ${colors.text4};
                    display   : inline-block;
                    margin    : 3px;
                    opacity   : 1 !important;
                    border-radius : 5px;
                }

                .swiper-pagination-bullet.swiper-pagination-bullet-active {
                    background: ${colors.green};
                }

                @media(max-width: 575px) {
                    margin-top: 0 !important;
                }
            }
        }

        @media(max-width: 767px) {
            padding : 30px 0;
        }
    }
`;