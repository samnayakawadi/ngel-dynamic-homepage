import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .faq-page {
        .faq-area {
            padding : 70px 0 30px;
            .nav {
                margin-bottom : 55px;
                .nav-item {
                    margin: 0 10px;
                    a.nav-link {
                        font-size: 18px;
                        padding: 10px;
                        width: 110px;
                        font-weight: 500;
                        text-align: center;
                        color    : ${colors.black1};
                        border-radius: 5px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.09);

                        @media(max-width: 767px) {
                            font-size: 16px;
                            padding: 9px;
                            width: 92px;
                        }
                    }
                    a.nav-link.active {
                        background : ${colors.gr_bg};
                        color : #ffffff;
                    }

                    @media(max-width: 767px) {
                        margin: 0 5px;
                    }
                }

                @media(max-width: 575px) {
                    margin-bottom: 45px;
                }
            }

            .tab-content {
                .tab-pane {
                    .faq-item {
                        margin-bottom: 35px;
                        .faq-title {
                            margin-bottom: 13px;
                            .title-icon {
                                background: ${colors.green};
                                height: 20px;
                                text-align: center;
                                margin-right: 12px;
                                position: relative;
                                span {
                                    font-size: 20px;
                                    color: #ffffff;
                                    width: 36px;
                                    display: block;
                                    line-height: 18px;
                                    padding-left: 2px;

                                    @media(max-width: 575px) {
                                        font-size: 16px;
                                        width : 32px;
                                        padding-left: 0;
                                    }
                                }
                                &:before {
                                    content: "";
                                    position: absolute;
                                    border-width: 10px 18px;
                                    border-style: solid;
                                    border-top-color: transparent;
                                    border-right-color: transparent;
                                    border-bottom-color: ${colors.green};
                                    border-left-color: transparent;
                                    top: -20px;
                                    left: 0;
                                    z-index: 1;

                                    @media(max-width: 575px) {
                                        border-width: 8px 16px;
                                        top: -16px;
                                    }
                                }
                                &:after {
                                    content: "";
                                    position: absolute;
                                    border-width: 10px 18px;
                                    border-style: solid;
                                    border-top-color: ${colors.green};
                                    border-right-color: transparent;
                                    border-bottom-color: transparent;
                                    border-left-color: transparent;
                                    bottom: -20px;
                                    left: 0;
                                    z-index: 1;

                                    @media(max-width: 575px) {
                                        border-width: 8px 16px;
                                        bottom: -16px;
                                    }
                                }

                                @media(max-width: 575px) {
                                    height: 19px;
                                    margin-right: 10px;
                                }
                            }

                            .title-text {
                                p {
                                    font-size: 18px;
                                    color: ${colors.black1};
                                    font-weight: 500;
                                    line-height: 20px;

                                    @media(max-width: 575px) {
                                        font-size: 16px;
                                    }
                                }
                            }
                        }
                        .faq-desc {
                            p{
                                font-size: 15px;
                                color: ${colors.text2};
                                line-height: 28px;
                                padding-left: 48px;
                            }
                        }

                        @media(max-width: 575px) {
                            margin-bottom: 25px;
                        }
                    }
                }
            }

            @media(max-width: 767px) {
                padding : 30px 0 0;
            }
        }
    }
`;