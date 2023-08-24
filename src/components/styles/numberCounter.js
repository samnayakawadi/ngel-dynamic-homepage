import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .counter-area {
        background-size    : cover;
        background-position: center;
        background-repeat  : no-repeat;
        padding            : 63px 0 70px;
        position           : relative;

        &:before {
            position  : absolute;
            content   : '';
            background: ${colors.bg1};
            opacity   : 0.98;
            width     : 100%;
            height    : 100%;
            top       : 0;
            left      : 0;
        }

        .sec-title {
            h4 {
                color        : #ffffff;
                line-height  : 35px;
                font-weight  : 600;
                max-width    : 550px;
                margin       : auto;
                margin-bottom: 43px;

                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }
        }

        .counter-box {
            position: relative;

            .counter-icon {
                border      : 1px dashed ${colors.green};
                border-right: none;
                width       : 95px;
                height      : 85px;
                border-radius : 5px;
                text-align : center;
                padding-top: 17px;
                position   : relative;

                i {
                    font-size: 52px;
                    color    : ${colors.green};

                    @media(max-width: 991px) {
                        font-size: 36px;
                        margin-left: -10px;
                    }

                    @media(max-width: 767px) {
                        margin-left: 0;
                    }
                }

                &::before {
                    position    : absolute;
                    content     : '';
                    border-right: 1px dashed ${colors.green};
                    width       : 1px;
                    height      : 12px;
                    top         : 2px;
                    right       : 0;

                    @media(max-width: 991px) {
                        height: 8px;
                    }
                }

                &::after {
                    position    : absolute;
                    content     : '';
                    border-right: 1px dashed ${colors.green};
                    width       : 1px;
                    height      : 12px;
                    bottom      : 2px;
                    right       : 0;

                    @media(max-width: 991px) {
                        height: 8px;
                    }
                }

                @media(max-width: 991px) {
                    width: 70px;
                    height: 70px;
                    padding-top: 17px;
                }
            }

            .counter-number {
                position: absolute;
                top     : 19px;
                left    : 34%;

                h4 {
                    color: #ffffff;

                    span {
                        letter-spacing: 3px;

                        @media(max-width: 575px) {
                            font-size: 20px;
                            letter-spacing: 1px;
                        }
                    }
                }

                p {
                    font-size  : 15px;
                    color      : ${colors.border3};
                    font-weight: 500;

                    @media(max-width: 991px) {
                        font-size: 12px;
                        font-weight: 400;
                        letter-spacing: 0;
                    }

                    @media(max-width: 575px) {
                        font-size: 11px;
                    }
                }

                @media(max-width: 1199px) {
                    left: 36%;
                }

                @media(max-width: 991px) {
                    left: 33%;
                    top: 10px;
                }

                @media(max-width: 575px) {
                    left: 65px;
                }
            }

            @media(max-width: 767px) {
                margin-bottom: 20px;
            }
        }

        @media(max-width: 767px) {
            padding: 30px 0 25px;
        }
    }
`;