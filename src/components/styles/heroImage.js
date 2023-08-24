import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .hero-image-area {
        background-size    : cover;
        background-position: center;
        background-repeat  : no-repeat;
        height             : 700px;
        position           : relative;

        &::before {
            position  : absolute;
            content   : "";
            background: ${colors.black1};
            opacity   : 0.6;
            width     : 100%;
            height    : 100%;
            top       : 0;
            left      : 0;
        }

        .round-shape {
            background-position: bottom;
            background-repeat  : no-repeat;
            background-size    : contain;
            position           : absolute;
            bottom             : 0;
            left               : 0;
            width              : 100%;
            height             : 100%;
        }

        .hero-table {
            display : table;
            width   : 100%;
            height  : 100%;
            position: relative;
            z-index : 2;

            .hero-tablecell {
                display       : table-cell;
                vertical-align: middle;

                .hero-box {

                    h1 {
                        font-size    : 46px;
                        color        : #ffffff;
                        max-width    : 700px;
                        margin       : auto;
                        margin-bottom: 20px;
                        font-weight  : 600;

                        @media(max-width: 767px) {
                            font-size: 26px;
                            font-weight: 500;
                            max-width: 100%;
                        }
                    }

                    p {
                        font-size    : 16px;
                        color        : ${colors.border3};
                        max-width    : 600px;
                        line-height  : 30px;
                        margin       : auto;
                        margin-bottom: 60px;

                        @media(max-width: 575px) {
                            font-size : 15px;
                            line-height : 25px;
                        }
                    }

                    .video-player {

                        button.play-button {
                            transform : translateX(0) translateY(-50%);
                            box-sizing: content-box;
                            display   : block;
                            width     : 32px;
                            height    : 44px;
                            margin    : auto;
                            border-radius : 50%;

                            i {
                                position   : relative;
                                font-size  : 40px;
                                color      : #ffffff;
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
                                background: ${colors.green};
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
                                background: ${colors.green};
                                border-radius : 50%;
                                transition : all 200ms;
                            }

                            &:hover {
                                i {
                                    color: #ffffff;
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
                    }
                }
            }
        }

        @media(max-width: 767px) {
            height : 450px;
        }

        @media(max-width: 575px) {
            height : 360px;
        }
    }
`;