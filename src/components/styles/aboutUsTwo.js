import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .about-us2 {
        background: ${colors.bg2};
        padding   : 70px 0;

        .about-content {
            h4.about-title {
                color        : ${colors.black1};
                line-height  : 35px;
                font-weight  : 600;
                margin-bottom: 25px;

                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }

            p.about-para {
                font-size    : 15px;
                color        : ${colors.text3};
                line-height  : 28px;
                margin-bottom: 30px;

                @media(max-width: 991px) {
                    font-size    : 14px;
                }
            }

            .cta-box {
                margin-bottom: 15px;

                .cta-icon {
                    margin-right: 15px;

                    i {
                        font-size: 20px;
                        color    : ${colors.green};
                        width    : 35px;
                        height   : 35px;
                        border   : 1px solid ${colors.green};
                        border-radius : 50%;
                        padding-top: 7px;
                    }
                }

                .cta-content {
                    h6 {
                        color        : ${colors.black1};
                        margin-top   : 5px;
                        margin-bottom: 5px;
                    }

                    p {
                        font-size  : 14px;
                        color      : ${colors.text3};
                        line-height: 25px;

                        @media(max-width: 991px) {
                            font-size    : 13px;
                        }
                    }
                }
            }
        }

        .about-image {
            position: relative;
            height  : 100%;

            img.main-img1 {
                position : absolute;
                bottom   : 0;
                left     : 0;
                max-width: 68%;
                border-radius : 5px;
                box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);

                @media(max-width: 991px) {
                    bottom: 42%;
                }
            }

            img.main-img2 {
                max-width: 50%;
                border-radius : 5px;
                float     : right;
                box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);

                @media(max-width: 991px) {
                    max-width: 65%;
                }
            }

            p.exp-box {
                font-size    : 14px;
                color        : #ffffff;
                background   : ${colors.gr_bg};
                position     : absolute;
                bottom       : 15%;
                right        : 20%;
                margin-bottom: -30px;
                margin-right : -20px;
                width        : 120px;
                height       : 120px;
                z-index      : 1;
                border-radius : 50%;
                text-align : center;
                font-weight: 500;
                padding-top: 24px;

                span {
                    display      : block;
                    font-size    : 30px;
                    font-weight  : 800;
                    margin-bottom: -5px;

                    i {
                        font-size     : 15px;
                        vertical-align: middle;
                    }
                }

                @media(max-width: 991px) {
                    bottom: 48%;
                    right: 11%;
                }
            }

            @media(max-width: 767px) {
                display : none;
            }
        }

        @media(max-width: 767px) {
            padding : 30px 0 20px;
        }
    }
`;