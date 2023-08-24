import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .top-bar2 {
        height       : 40px;
        border-bottom: 1px solid ${colors.border1};

        .bar-left {
            margin-top: 8px;

            ul {
                li {
                    font-size   : 14px;
                    color       : ${colors.text2};
                    margin-right: 20px;
                    display     : inline-block;

                    i {
                        font-size     : 18px;
                        color         : ${colors.green};
                        vertical-align: text-bottom;
                        margin-right  : 5px;

                        @media(max-width: 1199px) {
                            margin-right : 2px;
                        }
                    }

                    @media(max-width: 1199px) {
                        margin-right : 8px;
                    }

                    @media(max-width: 991px) {
                        font-size : 13px;
                    }
                }
            }
        }

        .bar-right {
            margin-top: 6px;

            ul.bar-lang {
                margin-right: 30px;
                position    : relative;
                margin-top  : 3px;

                &::before {
                    position  : absolute;
                    content   : "";
                    background: ${colors.border1};
                    width     : 1px;
                    height    : 20px;
                    top       : 0;
                    right     : -15px;
                }

                li {
                    .dropdown {
                        button.dropdown-toggle {
                            font-size : 13px;
                            color     : ${colors.text2};
                            background: transparent;
                            border    : none;
                            padding   : 0;
                            box-shadow: none;

                            img {
                                margin-right: 5px;
                                max-width   : 21px;
                            }

                            i {
                                font-size  : 12px;
                                margin-left: 3px;
                            }

                            &::after {
                                display: none;
                            }

                            &:hover {
                                cursor: pointer;
                                color : ${colors.green};
                            }
                        }

                        ul.dropdown-menu {
                            padding         : 0;
                            margin          : 0;
                            border          : none;
                            background-color: #ffffff;
                            border-radius : 5px;
                            top       : 50% !important;
                            left      : -16px !important;
                            box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);

                            li {
                                display      : block;
                                border-bottom: 1px solid ${colors.border1};
                                padding      : 7px 15px;
                                color        : ${colors.text3};
                                cursor       : pointer;

                                img {
                                    max-width   : 21px;
                                    margin-right: 5px;
                                }

                                &:hover {
                                    color           : ${colors.black1};
                                    font-weight     : 500;
                                    background-color: transparent;
                                }

                                &:last-child {
                                    border-bottom: none;
                                }
                            }
                        }
                    }
                }
            }

            ul.bar-social {
                margin-right: 30px;
                position    : relative;

                &::before {
                    position  : absolute;
                    content   : '';
                    background: ${colors.border1};
                    width     : 1px;
                    height    : 20px;
                    top       : 3px;
                    right     : -15px;
                }

                li {
                    a {
                        font-size  : 13px;
                        color      : ${colors.green};
                        background : ${colors.border1};
                        display    : inline-block;
                        width      : 25px;
                        height     : 25px;
                        text-align : center;
                        padding-top: 3px;
                        border-radius : 5px;

                        &:hover {
                            background: ${colors.green};
                            color     : #ffffff;
                        }
                    }

                    &:last-child {
                        a {
                            margin-right: 0;
                        }
                    }
                }

                @media(max-width: 991px) {
                    display: none;
                }
            }

            ul.sidebar-button {
                li.side-box {
                    a.nav-link {
                        font-size  : 20px;
                        padding    : 0;
                        line-height: 28px;
                        i {
                            color : ${colors.green};
                        }
                    }
                }
            }
        }
        
        @media(max-width: 767px) {
            display: none;
        }
    }

    .logo-area2 {
        height     : 82px;
        padding-top: 20px;

        .logo {
            a {
                img {
                    @media(max-width: 991px) {
                        max-width: 100%;
                    }
                }
            }
        }

        div.menu-box {
            ul.nav.menu-nav {
                li.nav-item {
                    position: relative;

                    a.nav-link {
                        font-size     : 14px;
                        color         : ${colors.black1};
                        text-transform: uppercase;
                        font-weight   : 500;
                        padding       : 10px 10px 20px;

                        i {
                            font-size: 12px;
                        }

                        &:after {
                            content: none;
                        }

                        &:hover {
                            color: ${colors.green};
                        }

                        @media(max-width: 1199px) {
                            padding: 10px 2px 20px;
                            letter-spacing: 0;
                        }
                    }

                    ul.dropdown {
                        position  : absolute;
                        left      : 0;
                        top       : 100%;
                        min-width : 190px;
                        background: #fff;
                        border    : 1px solid ${colors.border1};
                        text-align: left;
                        padding   : 0;
                        border-radius : 5px;
                        transition : 0.2s ease;
                        opacity         : 0;
                        transform       : scaleY(0);
                        visibility      : hidden;
                        z-index         : 999;
                        transform-origin: center top 0;

                        li.nav-item {
                            position: relative;

                            a.nav-link {
                                font-size     : 13px;
                                color         : ${colors.text1};
                                padding       : 10px 20px;
                                text-transform: capitalize;
                                font-weight   : 400;
                                margin-right  : 0;
                                border-bottom : 1px solid ${colors.border1};

                                &:hover {
                                    color: ${colors.green};

                                    i {
                                        color: #fff;
                                    }
                                }

                                i {
                                    float     : right;
                                    margin-top: 4px;
                                }
                            }

                            &:last-child {
                                margin-left: 0;

                                a.nav-link {
                                    border-bottom: none;
                                }
                            }

                            ul.dropdown2 {
                                position  : absolute;
                                top       : 0;
                                left      : 100%;
                                min-width : 180px;
                                background: #fff;
                                border    : 1px solid ${colors.border1};
                                transition : 0.2s ease;
                                opacity         : 0;
                                transform       : scaleY(0);
                                visibility      : hidden;
                                z-index         : 999;
                                transform-origin: center top 0;
                            }

                            &:hover {
                                ul.dropdown2 {
                                    opacity   : 1;
                                    transform : scaleY(1);
                                    visibility: visible;
                                }
                            }
                        }
                    }

                    &:hover {
                        ul.dropdown {
                            opacity   : 1;
                            transform : scaleY(1);
                            visibility: visible;
                        }
                    }
                }
            }

            .search-box {
                margin-left: 18px;
                margin-top : 11px;

                a {
                    padding: 0;

                    i {
                        font-size: 18px;
                        color    : ${colors.green};
                    }
                }

                i.close-btn {
                    position : absolute;
                    top      : 25px;
                    right    : -12px;
                    font-size: 26px;
                    color    : ${colors.green};
                    cursor   : pointer;
                }

                @media(max-width: 1199px) {
                    margin-left : 5px;
                }
            }

            .apply-btn {
                margin-left: 70px;
                margin-top : -1px;

                a {
                    font-size     : 13px;
                    color         : #ffffff;
                    background    : ${colors.gr_bg};
                    display       : inline-block;
                    width         : 110px;
                    height        : 40px;
                    text-align    : center;
                    text-transform: uppercase;
                    font-weight   : 500;
                    padding       : 11px;
                    border-radius : 0 5px 5px 0;
                    position: relative;

                    i {
                        position : absolute;
                        font-size: 20px;
                        left     : -40px;
                        top      : 0;
                        padding  : 10px;
                        width    : 40px;
                        height   : 100%;
                        border-radius : 5px 0 0 5px;
                        background-color: ${colors.green2};
                    }

                    &:hover {
                        background: ${colors.gr_bg2};
                    }
                }

                @media(max-width: 991px) {
                    display : none;
                }
            }
        }

        @media(max-width: 767px) {
            display: none;
        }
    }
`;