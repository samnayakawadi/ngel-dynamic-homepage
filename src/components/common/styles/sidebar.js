import styled from "styled-components";
import { colors } from "../element/elements.js";

export const Styles = styled.div`
    a.nav-sidebar {
        padding: 18px 0 0 10px;

        i {
            font-size: 20px;
            color    : ${colors.border1};
        }
    }
    
    .sidebar {
        background-color: #ffffff;
        padding         : 40px;
        height          : 100%;
        width           : 400px;
        position        : fixed;
        top             : 0;
        right           : -470px;
        overflow-y      : auto;
        z-index         : 9999;
        transition : all 400ms cubic-bezier(0.785, 0.135, 0.15, 0.86);

        .side-logo {
            margin-bottom: 40px;

            a {
                i {
                    font-size: 18px;
                    color    : ${colors.green};
                    border   : 1px solid ${colors.border1};
                    padding  : 6px;
                    border-radius : 50%;

                    &:hover {
                        background  : ${colors.green};
                        color       : #ffffff;
                        border-color: ${colors.green};
                    }
                }
            }
        }

        .side-content {
            h5 {
                color         : ${colors.green};
                text-transform: uppercase;
                font-weight   : 500;
                margin-bottom : 18px;
                position      : relative;

                &::before {
                    position  : absolute;
                    content   : "";
                    background: ${colors.border1};
                    width     : 60%;
                   // height    : 1px;
                    top       : 11px;
                    right     : 0;
                }
            }

            p {
                font-size    : 15px;
                color        : ${colors.text2};
                line-height  : 25px;
                margin-bottom: 30px;
            }
        }

        .side-post {
            margin-bottom: 40px;

            h5 {
                color         : ${colors.green};
                text-transform: uppercase;
                font-weight   : 500;
                margin-bottom : 25px;
                position      : relative;

                &::before {
                    position  : absolute;
                    content   : "";
                    background: ${colors.border1};
                    width     : 50%;
                    height    : 1px;
                    top       : 11px;
                    right     : 0;
                }
            }

            .post-box {
                margin-bottom: 15px;

                .post-img {
                    img {
                        max-width: 90px;
                        border-radius : 5px;
                        margin-right: 15px;
                    }
                }

                .post-title {
                    p {
                        font-size    : 13px;
                        color        : ${colors.black2};
                        font-weight  : 500;
                        margin-bottom: 6px;
                    }

                    span {
                        font-size: 12px;
                        color    : ${colors.text3};
                    }
                }
            }
        }

        .side-gallery {
            margin-bottom: 32px;

            h5 {
                color         : ${colors.green};
                text-transform: uppercase;
                font-weight   : 500;
                margin-bottom : 25px;
                position      : relative;

                &::before {
                    position  : absolute;
                    content   : "";
                    background: ${colors.border1};
                    width     : 65%;
                    height    : 1px;
                    top       : 11px;
                    right     : 0;
                }
            }

            img {
                max-width: 96px;
                border-radius : 5px;
                margin-right : 5px;
                margin-bottom: 6px;
            }
        }

        .side-contact {
            margin-bottom: 20px;

            h5 {
                color         : ${colors.green};
                text-transform: uppercase;
                font-weight   : 500;
                margin-bottom : 15px;
                position      : relative;

                &::before {
                    position  : absolute;
                    content   : "";
                    background: ${colors.border1};
                    width     : 50%;
                    height    : 1px;
                    top       : 11px;
                    right     : 0;
                }
            }

            ul {
                li {
                    font-size    : 14px;
                    color        : ${colors.text2};
                    margin-bottom: 12px;

                    i {
                        font-size     : 18px;
                        color         : ${colors.green};
                        margin-top    : 1px;
                        margin-right  : 6px;
                        vertical-align: text-bottom;
                        float         : left;
                        height        : 30px;
                    }
                }
            }
        }

        .side-social {
            ul {
                li {
                    a {
                        font-size  : 13px;
                        color      : ${colors.green};
                        display    : inline-block;
                        border     : 1px solid ${colors.border1};
                        width      : 30px;
                        height     : 30px;
                        text-align : center;
                        padding-top: 5px;
                        border-radius : 50%;

                        &:hover {
                            background  : ${colors.green};
                            border-color: ${colors.green};
                            color       : #fff;
                        }
                    }
                }
            }
        }
    }

    .sidebar.opened {
        right: 0 !important;
    }

    .sidebar-overlay {
        position        : fixed;
        left            : 0;
        top             : 0;
        height          : 100%;
        width           : 100%;
        display         : block;
        background-color: rgba(0, 0, 0, 0.8);
        z-index         : 1111;
        visibility      : hidden;
        opacity         : 0;
        transition      : 0.3s ease;
    }

    .sidebar-overlay.visible {
        visibility: visible;
        opacity   : 1;
    }
`;