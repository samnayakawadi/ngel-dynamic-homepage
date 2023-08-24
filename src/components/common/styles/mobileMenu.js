import styled from "styled-components";
import { colors } from "../element/elements.js";

export const Styles = styled.div`
.mobile-menu-area {
    background : ${colors.bg1};
    display: none;
    .mb-topbar {
        border-bottom: 1px solid ${colors.black2};
        .topbar-item {
            p {
                font-size: 13px;
                color: ${colors.text4};
                padding: 8px 0;
                i {
                    font-size: 16px;
                    color: ${colors.green};
                    vertical-align: text-top;
                    margin-right: 5px;
                }
            }
            ul {
                padding: 8px 0;
                li {
                    a {
                        font-size : 13px;
                        color : ${colors.green};
                        font-weight : 500;
                        text-transform : uppercase;
                        &:hover {
                            color : #ffffff;
                        }
                    }
                    &:nth-child(2) {
                        color : ${colors.text3};
                    }
                }
            }
        }
    }

    .mb-logo-area {
        padding : 18px 0;
        .mb-logo-box {
            .hm-button {
                margin-top: 8px;
                margin-right: 35px;
                position: relative;
                &:before {
                    position: absolute;
                    content : "";
                    background : ${colors.text1};
                    width: 1px;
                    height: 25px;
                    top: -4px;
                    right: -16px;
                }
                a#mb-sidebar-btn {
                    i {
                        font-size : 20px;
                        color : ${colors.green};
                    }
                }

                @media(max-width: 480px) {
                    margin-top: 6px;
                    margin-right: 8px;
                    &:before {
                        content : none;
                    }
                }
            }
            .mb-logo {
                a {
                    img {
                        max-width: 150px;
                        @media(max-width: 480px) {
                            max-width : 120px;
                        }
                    }
                }
            }
        }

        .mb-search-box {
            form {
                width: 170px;
                position: relative;
                input {
                    width: 100%;
                    height: 35px;
                    border: 1px solid ${colors.text2};
                    background: transparent;
                    color : #ffffff;
                    border-radius: 5px;
                    padding-left: 15px;
                    &::placeholder {
                        font-size : 14px;
                        color : ${colors.text3};
                    }
                    &:focus {
                        border-color : ${colors.green};
                    }

                    @media(max-width: 480px) {
                        max-width : 280px;
                    }

                    @media(max-width: 320px) {
                        display : none;
                    }
                }
                button {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 40px;
                    background: transparent;
                    border: none;
                    font-size: 16px;
                    color: ${colors.green};
                    i {

                    }

                    @media(max-width: 320px) {
                        display : none;
                    }
                }

                @media(max-width: 480px) {
                    max-width : 130px;
                }
            }
        }
    }

    @media(max-width: 767px) {
        display : block;
    }
}

.mb-sidebar {
    background: #ffffff;
    height: 100%;
    width: 320px;
    position: fixed;
    top : 0;
    left: -320px;
    overflow-y: auto;
    z-index: 9999;
    transition: all 400ms cubic-bezier(0.785,0.135,0.15,0.86);
    display: none;
    .mb-sidebar-heading {
        background: ${colors.gr_bg};
        padding: 25px;
        h5 {
            color: #ffffff;
            text-transform: uppercase;
        }
        a#close-mb-sidebar {
            i {
                font-size : 22px;
                color : #ffffff;
            }
        }
    }
    .mb-sidebar-menu {
        padding: 25px;
        .mb-menu-item {
            border-top: 1px solid ${colors.border1};
            &:last-child {
                border-bottom: 1px solid ${colors.border1};
            }
            button.mb-menu-button {
                border       : none;
                background   : transparent;
                display      : block;
                width        : 100%;
                padding      : 10px 0;
                text-align   : left;

                p {
                    font-size  : 14px;
                    color      : ${colors.black1};
                    text-transform: uppercase;
                    i {
                        font-size: 13px;
                        float: right;
                        border: 1px solid ${colors.border3};
                        border-radius: 25px;
                        padding: 3px;
                    }
                    &:hover {
                        color      : ${colors.green};
                        i {
                            border-color : ${colors.green};
                        }
                    }
                }
            }

            .mb-menu-content {
                max-height: 0;
                overflow  : hidden;
                transition: max-height 0.2s ease-in-out;

                ul {
                    li {
                        border-top: 1px solid ${colors.border1};
                        a {
                            font-size  : 13px;
                            color      : ${colors.black2};
                            display    : block;
                            padding    : 10px 0;
                            padding-left: 15px;
                            &:hover {
                                color      : ${colors.green};
                            }
                        }
                    }
                }
            }

            .mb-menu-content.show {
                max-height: 100%;
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
    }

    @media(max-width: 767px) {
        display : block;
    }

    @media(max-width: 480px) {
        max-width: 275px;
    }
}

.mb-sidebar.opened {
    left: 0 !important;
}

.mb-sidebar-overlay {
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

.mb-sidebar-overlay.visible {
    visibility: visible;
    opacity   : 1;
}



`;