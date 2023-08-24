import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .about-us {
        padding: 78px 0 85px;

        .about-image {
            position: relative;

            img.main-img {
                width        : 90%;
                border-radius: 5px;

                @media(max-width: 767px) {
                    display : none;
                }
            }

            img.pattern-img {
                position: absolute;
                top     : 100%;
                left    : 0;

                @media(max-width: 1199px) {
                    max-width : 100%;
                }

                @media(max-width: 767px) {
                    display : none;
                }
            }

            .video-player {
                position           : absolute;
                bottom             : -83px;
                right              : 0;
                width              : 205px;
                height             : 255px;
                background-size    : cover;
                background-position: center;
                background-repeat  : no-repeat;
                border-radius      : 5px;

                &::before {
                    position        : absolute;
                    content         : '';
                    background-color: rgba(0, 0, 0, 0.2);
                    width           : 100%;
                    height          : 100%;
                    top             : 0;
                    left            : 0;
                    border-radius : 5px;
                }

                button.play-button {
                    position  : absolute;
                    z-index   : 10;
                    top       : 50%;
                    left      : 50%;
                    transform : translateX(-50%) translateY(-50%);
                    box-sizing: content-box;
                    display   : block;
                    width     : 32px;
                    height    : 44px;
                    border-radius : 50%;

                    i {
                        position   : relative;
                        font-size  : 40px;
                        color      : ${colors.bg1};
                        z-index    : 11;
                        padding-top: 2px;
                        margin-left: -2px;
                    }

                    &::before {
                        content   : "";
                        position  : absolute;
                        z-index   : 0;
                        left      : 50%;
                        top       : 50%;
                        transform : translateX(-50%) translateY(-50%);
                        display   : block;
                        width     : 70px;
                        height    : 70px;
                        background: #ffffff;
                        border-radius : 50%;
                        animation: pulse-border 1500ms ease-out infinite;
                    }

                    &:after {
                        content   : "";
                        position  : absolute;
                        z-index   : 1;
                        left      : 50%;
                        top       : 50%;
                        transform : translateX(-50%) translateY(-50%);
                        display   : block;
                        width     : 70px;
                        height    : 70px;
                        background: #ffffff;
                        border-radius : 50%;
                        transition : all 200ms;
                    }

                    &:hover {
                        i {
                            color: ${colors.green};
                        }
                    }

                    @keyframes pulse-border {
                        0% {
                            transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
                            opacity  : 1;
                        }

                        100% {
                            transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
                            opacity  : 0;
                        }
                    }
                }

                @media(max-width: 991px) {
                    bottom: -70%;
                }

                @media(max-width: 767px) {
                    position: unset;
                    width: 100%;
                    height: 250px;
                    margin-bottom: 30px;
                }
            }
        }

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
                line-height  : 25px;
                margin-bottom: 40px;

                span {
                    display   : block;
                    margin-top: 20px;
                }

                @media(max-width: 575px) {
                    margin-bottom : 20px;
                }
            }

            .counter-box {
                h3 {
                    margin-bottom: 10px;

                    span {
                        font-weight: 600;
                    }

                    i {
                        font-size     : 20px;
                        vertical-align: middle;
                    }
                }

                p {
                    font-size  : 14px;
                    color      : ${colors.text3};
                    font-weight: 500;
                }

                @media(max-width: 575px) {
                    display : none;
                }
            }

            .counter-box.box1 {
                h3 {
                    color: ${colors.red};
                }
            }

            .counter-box.box2 {
                h3 {
                    color: ${colors.purple};
                }
            }

            .counter-box.box3 {
                h3 {
                    color: ${colors.blue};
                }
            }

            a.readmore-btn {
                font-size : 14px;
                color     : #fff;
                background: ${colors.gr_bg};
                display   : inline-block;
                width     : 145px;
                height    : 40px;
                text-align: center;
                padding   : 11px;
                border-radius : 5px;
                margin-top: 40px;

                &:hover {
                    background: ${colors.gr_bg2};
                }

                @media(max-width: 575px) {
                    margin-top : 0;
                }
            }
        }

        @media(max-width: 767px) {
            padding: 30px 0 40px;
        }
    }
`;