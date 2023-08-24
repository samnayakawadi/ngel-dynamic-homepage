import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`

    .tab-section {
        background: ${colors.bg2};
        padding   : 70px 0 65px;

        .nav {
            background-color: #ffffff;
            border-radius : 5px;
            border  : 1px solid ${colors.border1};
            overflow: hidden;

            .nav-item {
                a.nav-link {
                    font-size    : 15px;
                    color        : ${colors.black1};
                    border-bottom: 1px solid ${colors.border1};
                    padding      : 18px 25px;

                    i {
                        color: ${colors.green};
                    }
                }

                a.nav-link.active {
                    background: ${colors.gr_bg};
                    color     : #ffffff;

                    i {
                        color: #ffffff;
                    }
                }

                &:last-child {
                    a.nav-link {
                        border-bottom: none;
                    }
                }
            }

            @media(max-width: 767px) {
                margin-bottom : 30px;
            }
        }

        .tab-content {
            .tab-pane {
                h4.tab-title {
                    color        : ${colors.black1};
                    font-weight  : 600;
                    margin-bottom: 25px;

                    @media(max-width: 575px) {
                        margin-bottom: 15px;
                        font-size: 20px;
                    }
                }

                p.tab-desc {
                    font-size    : 15px;
                    color        : ${colors.text2};
                    line-height  : 30px;
                    margin-bottom: 25px;

                    @media(max-width: 575px) {
                        font-size: 14px;
                    }
                }

                ul.check-list {
                    li {
                        font-size    : 15px;
                        color        : ${colors.text3};
                        margin-bottom: 20px;
                        line-height  : 25px;

                        i {
                            float : left;
                            color : ${colors.green};
                            border: 1px solid ${colors.border3};
                            width : 35px;
                            height: 35px;
                            border-radius : 50%;
                            text-align  : center;
                            padding-top : 9px;
                            margin-top  : 7px;
                            margin-right: 15px;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }

                        @media(max-width: 575px) {
                            font-size: 14px;
                        }
                    }
                }
            }
        }

        @media(max-width: 767px) {
            padding: 35px 0 30px;
        }
    }
`;