import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .team-member-area {
        background: ${colors.bg2};
        padding   : 63px 0;

        .sec-title {
            h4 {
                color        : ${colors.black1};
                line-height  : 35px;
                font-weight  : 600;
                max-width    : 550px;
                margin       : auto;
                margin-bottom: 50px;

                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }
        }

        .team-slider {
            position: relative;

            .team-item {
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
                    padding: 15px 0;

                    h5 {
                        color        : ${colors.black1};
                        font-weight  : 600;
                        margin-bottom: 5px;
                    }

                    p {
                        font-size    : 14px;
                        color        : ${colors.text3};
                        font-weight  : 500;
                        margin-bottom: 5px;
                    }

                    ul {
                        li {
                            a {
                                i {
                                    font-size: 14px;
                                    color    : #ffffff;
                                    width    : 33px;
                                    height   : 33px;
                                    border-radius : 50%;
                                    padding-top: 10px;
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

            .slider-dot {
                margin-top: 25px !important;

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
            }
        }

        @media(max-width: 767px) {
            padding: 25px 0;
        }
    }
`;