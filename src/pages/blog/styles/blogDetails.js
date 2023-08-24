import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js"

export const Styles = styled.div`
    .blog-details-page {
        .blog-details-area {
            padding : 70px 0;
            .blog-details-box {
                .blog-details-banner {
                    img {
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
                }

                .heading {
                    h4 {
                        color : ${colors.black1};
                        font-weight: 600;
                        line-height: 35px;
                        margin-bottom: 25px;

                        @media(max-width: 575px) {
                            font-size: 20px;
                        }
                    }
                }

                .blog-auth_date {
                    margin-bottom: 15px;
                    .author-img {
                        margin-right : 20px;
                        a {
                            img {
                                max-width: 40px;
                                border-radius: 50%;
                                margin-right: 10px;
                                margin-top: -9px;
                            }
                        }
                        p {
                            a {
                                font-size: 14px;
                                color: ${colors.green};
                                font-weight: 500;
                                &:hover {
                                    color: ${colors.black1};
                                }
                            }
                        }
                    }

                    .post-date,
                    .post-category,
                    .post-comment {
                        margin-right: 20px;
                        p {
                            font-size : 14px;
                            color: ${colors.text2};
                            font-weight: 500;
                            i {
                                font-size : 20px;
                                color: ${colors.green};
                                vertical-align: top;
                            }

                            a {
                                font-size : 14px;
                                color: ${colors.text2};
                                font-weight: 500;
                                &:hover {
                                    color: ${colors.green};
                                }
                            }
                        }

                        @media(max-width: 767px) {
                            margin-right: 8px;
                        }
                    }

                    .post-category,
                    .post-comment {
                        @media(max-width: 767px) {
                            display: none;
                        }
                    }
                }

                .blog-details-desc {
                    margin-bottom: 45px;
                    p {
                        font-size: 15px;
                        color: ${colors.text2};
                        line-height: 25px;
                        span {
                            background : ${colors.border1};
                            color: ${colors.black2};
                            display : block;
                            margin: 35px 0;
                            padding: 22px 28px;
                            border-radius: 5px;
                            position: relative;
                            i {
                                position: absolute;
                                top: -20px;
                                left: 50%;
                                margin-left: -20px;
                                font-size : 30px;
                                color : #ffffff;
                                background : ${colors.gr_bg};
                                width: 42px;
                                height: 42px;
                                text-align: center;
                                border-radius: 50%;
                                padding-top: 7px;
                            }
                        }
                    }
                    ul {
                        margin-top : 30px;
                        li {
                            font-size: 14px;
                            color: ${colors.text3};
                            line-height: 25px;
                            margin-bottom: 15px;
                            i {
                                float: left;
                                color: ${colors.green};
                                border: 1px solid ${colors.border3};
                                width: 35px;
                                height: 35px;
                                border-radius: 50%;
                                text-align: center;
                                padding-top: 9px;
                                margin-top: 8px;
                                margin-right: 15px;
                            }
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }

                .blog-tag_share {
                    margin-bottom: 45px;
                    .blog-tag {
                        ul.tags {
                            li {
                                color : ${colors.text3};
                                a {
                                    font-size: 14px;
                                    color: ${colors.text2};
                                    &:hover {
                                        color: ${colors.green};
                                    }
                                }
                                &:first-child {
                                    font-size: 15px;
                                    color: ${colors.black1};
                                    font-weight: 500;
                                }
                            }
                        }

                        @media(max-width: 767px) {
                            margin-bottom: 20px;
                        }
                    }
                    .blog-share {
                        ul.social {
                            li {
                                a {
                                    text-align: center;
                                    position  : relative;
                                    height    : 18px;
                                    display   : inline-block;

                                    &:before {
                                        content           : "";
                                        position          : absolute;
                                        border-width      : 9px 17px;
                                        border-style      : solid;
                                        border-top-color  : transparent;
                                        border-right-color: transparent;
                                        border-left-color : transparent;
                                        top               : -18px;
                                        left              : 0;
                                        z-index           : 1;
                                        transition : all 0.2s ease;
                                    }

                                    &:after {
                                        content            : "";
                                        position           : absolute;
                                        border-width       : 9px 17px;
                                        border-style       : solid;
                                        border-right-color : transparent;
                                        border-bottom-color: transparent;
                                        border-left-color  : transparent;
                                        bottom             : -18px;
                                        left               : 0;
                                        z-index            : 1;
                                        transition : all 0.2s ease;
                                    }

                                    i {
                                        font-size: 14px;
                                        color    : #ffffff;
                                        width    : 34px;
                                    }

                                    &:hover {
                                        background-color: ${colors.green} !important;

                                        &:before {
                                            border-bottom-color: ${colors.green} !important;
                                        }

                                        &:after {
                                            border-top-color: ${colors.green} !important;
                                        }
                                    }
                                }

                                &:nth-child(1) {
                                    font-size: 15px;
                                    color: ${colors.black1};
                                    font-weight: 500;
                                }

                                &:nth-child(2) {
                                    a {
                                        background-color: #4267B2;

                                        &:before {
                                            border-bottom-color: #4267B2;
                                        }

                                        &:after {
                                            border-top-color: #4267B2;
                                        }
                                    }
                                }

                                &:nth-child(3) {
                                    a {
                                        background-color: #1DA1F2;

                                        &:before {
                                            border-bottom-color: #1DA1F2;
                                        }

                                        &:after {
                                            border-top-color: #1DA1F2;
                                        }
                                    }
                                }

                                &:nth-child(4) {
                                    a {
                                        background-color: #2867B2;

                                        &:before {
                                            border-bottom-color: #2867B2;
                                        }

                                        &:after {
                                            border-top-color: #2867B2;
                                        }
                                    }
                                }

                                &:nth-child(5) {
                                    a {
                                        background-color: #DD1343;

                                        &:before {
                                            border-bottom-color: #DD1343;
                                        }

                                        &:after {
                                            border-top-color: #DD1343;
                                        }
                                    }
                                }

                                &:nth-child(6) {
                                    a {
                                        background-color: #ea4c89;

                                        &:before {
                                            border-bottom-color: #ea4c89;
                                        }

                                        &:after {
                                            border-top-color: #ea4c89;
                                        }
                                    }
                                }
                            }
                        }

                        @media(max-width: 767px) {
                            margin-bottom: 20px;
                        }
                    }

                    @media(max-width: 767px) {
                        margin-bottom: 30px;
                        display: unset !Important;
                    }
                }

                .blog-comments {
                    margin-bottom: 45px;
                    h5 {
                        color: ${colors.black2};
                        font-weight: 600;
                        padding-bottom: 10px;
                        margin-bottom: 35px;
                        position: relative;
                        &:before {
                            position: absolute;
                            content: "";
                            background: ${colors.green};
                            width: 50px;
                            height: 2px;
                            bottom: 0;
                            left: 0;
                        }
                    }
                    .comment-box {
                        border-bottom: 1px solid ${colors.border1};
                        padding-bottom: 20px;
                        margin-bottom: 25px;
                        .comment-image {
                            img {
                                max-width : 80px;
                                border-radius : 5px;
                                margin-right : 20px;
                            }
                        }
                        .comment-content {
                            .content-title {
                                .comment-writer {
                                    h6 {
                                        color: ${colors.black2};
                                        font-weight: 600;
                                        margin-bottom : 10px;
                                    }
                                    p {
                                        font-size : 12px;
                                        color: ${colors.text3};
                                        margin-bottom: 5px;
                                    }
                                }
                                .reply-btn {
                                    button {
                                        font-size : 14px;
                                        color: ${colors.green};
                                        background : transparent;
                                        border : 1px solid ${colors.border3};
                                        font-weight: 500;
                                        border-radius: 25px;
                                        padding: 4px 12px 3px;
                                        margin-top : 3px;
                                        i {
                                            font-size: 17px;
                                            vertical-align: text-top;
                                        }
                                        &:hover {
                                            color : #ffffff;
                                            background : ${colors.gr_bg};
                                            border-color : ${colors.green};
                                        }
                                    }
                                }
                            }
                            .comment-desc {
                                p {
                                    font-size: 14px;
                                    color: ${colors.text2};
                                    line-height: 25px;
                                }
                            }
                        }
                        &:last-child {
                            border-bottom : none;
                            padding-bottom : 0;
                            margin-bottom : 0;
                        }
                    }
                }

                .blog-comment-form {
                    form {
                        @media(max-width: 575px) {
                            margin-bottom: 30px;
                        }
                    }
                }
            }

            @media(max-width: 767px) {
                padding: 35px 0;
            }

            @media(max-width: 575px) {
                padding-bottom: 0;
            }
        }
    }
`;