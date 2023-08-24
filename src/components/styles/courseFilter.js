import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .course-filter {
        background: ${colors.bg2};
        padding   : 62px 0 70px;

        .sec-title {
            h4 {
                color        : ${colors.black1};
                line-height  : 35px;
                font-weight  : 600;
                max-width    : 600px;
                margin       : auto;
                margin-bottom: 42px;

                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }
        }

        .filter-btns {
            ul.filter-btn-list {
                background-color: #ffffff;
                display         : inline-block;
                border-radius : 5px;
                box-shadow   : 0 12px 25px rgba(0, 0, 0, 0.07);
                margin-bottom: 52px;

                li {
                    font-size    : 14px;
                    color        : ${colors.black2};
                    font-weight  : 500;
                    padding      : 10px 20px;
                    cursor       : pointer;
                    border-radius: 5px;

                    @media(max-width: 767px) {
                        font-size: 13px;
                        padding: 8px 12px;
                    }
                }

                li.active {
                    background: ${colors.gr_bg};
                    color     : #ffffff;
                }

                @media(max-width: 575px) {
                    margin-bottom: 35px;
                }
            }
        }

        .filter-items {
            .course-item {
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
        }

        .viewall-btn {
            a {
                font-size     : 15px;
                color         : #fff;
                background    : ${colors.gr_bg};
                display       : inline-block;
                width         : 200px;
                height        : 48px;
                text-transform: uppercase;
                font-weight   : 500;
                text-align    : center;
                padding       : 14px;
                border-radius : 5px;
                margin-top: 20px;

                &:hover {
                    background: ${colors.gr_bg2};
                }

                @media(max-width: 575px) {
                    font-size: 13px;
                    width: 170px;
                    height: 42px;
                    padding: 12px;
                    margin-top: 10px;
                }
            }
        }

        @media(max-width: 767px) {
            padding: 25px 0 40px;
        }
    }
`;