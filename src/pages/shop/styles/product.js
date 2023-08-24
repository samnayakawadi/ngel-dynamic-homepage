import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .product-page {
        .product-area {
            padding : 70px 0;
            .product-box {
                border: 1px solid ${colors.border1};
                border-radius: 5px;
                transition: all 0.2s ease;
                margin-bottom: 30px;
                .product-img {
                    position: relative;
                    overflow : hidden;
                    img {
                        transform: scale(1);
                        transition: 0.3s ease;
                    }
                    span {
                        position: absolute;
                        content : '';
                        background : ${colors.gr_bg};
                        width: 55px;
                        height: 55px;
                        text-align: center;
                        left: 15px;
                        top: 15px;
                        font-size: 18px;
                        color: #fff;
                        font-weight: 600;
                        padding-top: 15px;
                        border-radius: 50%;
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
                        width: 120px;
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
                        width: 120px;
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
                            left: 35%;
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
                            right : 35%;
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

                .product-content {
                    padding : 15px 0;
                    .pro-title {
                        margin-bottom: 6px;
                        h5 {
                            a {
                                color : ${colors.black1};
                                font-weight: 600;
                                &:hover {
                                    color : ${colors.green};
                                }
                            }
                        }
                    }
                    .pro-rating {
                        margin-bottom: 6px;
                        ul {
                            li {
                                margin-right: 1px;
                                i {
                                    font-size: 15px;
                                    color: ${colors.yellow};
                                }
                                &:last-child {
                                    margin-right: 0;
                                }
                            }
                        }
                    }

                    .pro-price {
                        p {
                            font-size : 16px;
                            color: ${colors.green};
                            font-weight: 500;
                        }
                    }
                }

                &:hover {
                    box-shadow: 0 12px 25px rgba(0,0,0,0.07);
                }
            }

            @media(max-width: 767px) {
                padding : 35px 0 30px;
            }

            @media(max-width: 575px) {
                padding-bottom : 0;
            }
        }
    }
`;