import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .event-faq-area {
        padding: 65px 0;

        .event-area {
            .sec-title {
                h4 {
                    color         : ${colors.black1};
                    font-weight   : 600;
                    text-transform: uppercase;
                    margin-bottom : 37px;

                    span {
                        color: ${colors.green};
                    }

                    @media(max-width: 575px) {
                        margin-bottom: 15px;
                        font-size: 20px;
                    }
                }
            }

            .event-box {
                margin-bottom: 35px;

                .event-date {
                    width : 70px;
                    height: 70px;
                    border-radius : 50%;
                    color       : #fff;
                    margin-top  : 8px;
                    margin-right: 30px;
                    position    : relative;

                    &::before {
                        content   : "";
                        position  : absolute;
                        width     : 70px;
                        height    : 70px;
                        background: ${colors.green};
                        top       : 0;
                        left      : 0;
                        border-radius : 50% 3px 50% 50%;
                        transform: rotate(45deg);
                        z-index  : -1;
                    }

                    p {
                        font-size  : 17px;
                        max-width  : 50px;
                        margin     : auto;
                        line-height: 20px;
                        padding-top: 13px;

                        @media(max-width: 991px) {
                            font-size: 15px;
                            max-width: 56px;
                            padding-left: 14px;
                        }
                    }
                }

                .event-details {
                    margin-top: 5px;

                    h6 {
                        a {
                            color        : ${colors.black1};
                            display      : inline-block;
                            font-weight  : 600;
                            margin-bottom: 10px;

                            &:hover {
                                color: ${colors.green};
                            }
                        }
                    }

                    ul {
                        margin-bottom: 5px;

                        li {
                            font-size  : 14px;
                            color      : ${colors.text3};
                            font-weight: 500;

                            i {
                                font-size   : 15px;
                                margin-right: 3px;
                                color       : ${colors.green};
                            }
                        }
                    }

                    p {
                        color      : ${colors.text3};
                        line-height: 22px;
                    }
                }

                &:last-child {
                    margin-bottom : 0;
                }

                @media(max-width: 991px) {
                    margin-bottom: 17px;
                }
            }

            @media(max-width: 767px) {
                margin-bottom: 30px;
            }

            @media(max-width: 575px) {
                margin-bottom: 10px;
            }
        }

        .faq-area {
            .sec-title {
                h4 {
                    color         : ${colors.black1};
                    font-weight   : 600;
                    text-transform: uppercase;
                    margin-bottom : 45px;

                    span {
                        color: ${colors.green};
                    }

                    @media(max-width: 575px) {
                        margin-bottom: 15px;
                        font-size: 20px;
                    }
                }
            }

            .faq-box {
                .faq-item {
                    margin-bottom: 22px;

                    button.accordion-button {
                        border       : none;
                        background   : transparent;
                        margin-bottom: 15px;
                        display      : block;
                        width        : 100%;
                        padding      : 0;
                        text-align   : left;
                        position     : relative;

                        div.accordion-icon {
                            background  : ${colors.green};
                            height      : 18px;
                            text-align  : center;
                            float       : left;
                            margin-right: 12px;
                            position    : relative;

                            i {
                                font-size   : 20px;
                                color       : #ffffff;
                                width       : 32px;
                                line-height : 18px;
                                padding-left: 2px
                            }

                            &::before {
                                content            : "";
                                position           : absolute;
                                border-width       : 8px 16px;
                                border-style       : solid;
                                border-top-color   : transparent;
                                border-right-color : transparent;
                                border-bottom-color: ${colors.green};
                                border-left-color  : transparent;
                                top                : -16px;
                                left               : 0;
                                z-index            : 1;
                            }

                            &::after {
                                content            : "";
                                position           : absolute;
                                border-width       : 8px 16px;
                                border-style       : solid;
                                border-top-color   : ${colors.green};
                                border-right-color : transparent;
                                border-bottom-color: transparent;
                                border-left-color  : transparent;
                                bottom             : -16px;
                                left               : 0;
                                z-index            : 1;
                            }
                        }

                        p {
                            font-size  : 16px;
                            color      : ${colors.black1};
                            font-weight: 500;
                            line-height: 18px;
                        }
                    }

                    .accordion-content {
                        max-height: 0;
                        overflow  : hidden;
                        transition: max-height 0.2s ease-in-out;

                        p {
                            font-size   : 14px;
                            color       : ${colors.text3};
                            line-height : 28px;
                            padding-left: 45px;
                        }
                    }

                    .accordion-content.show {
                        max-height: 100%;
                    }

                    &:last-child {
                        margin-bottom : 0;
                    }
                }
            }
        }

        @media(max-width: 767px) {
            padding: 30px 0;
        }
    }
`;