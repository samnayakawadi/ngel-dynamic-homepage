import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js"

export const Styles = styled.div`
    .blog-classic-page {
        .blog-classic-area {
            padding : 70px 0;
            .blog-item {
                margin-bottom: 40px;
                &:last-child {
                    margin-bottom : 0;
                }

                .blog-img {
                    a {
                        img {
                            border-radius : 5px;
                            margin-bottom: 30px;
                        }
                    }
                }
                .blog-auth_date {
                    margin-bottom: 12px;
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

                        @media(max-width: 991px) {
                            margin-right: 10px;
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
                        }

                        @media(max-width: 991px) {
                            margin-right: 10px;
                        }
                    }

                    .post-category,
                    .post-comment {
                        @media(max-width: 767px) {
                            display : none;
                        }
                    }
                }

                .blog-title {
                    h5 {
                        a {
                            color: ${colors.black1};
                            line-height: 32px;
                            &:hover {
                                color: ${colors.green};
                            }

                            @media(max-width: 991px) {
                                font-size : 18px;
                            }

                            @media(max-width: 575px) {
                                font-size : 15px;
                            }
                        }
                    }
                }
            }

            ul.pagination-box {
                margin-top: 7px;

                @media(max-width: 575px) {
                    margin-bottom: 30px;
                }
            }

            @media(max-width: 767px) {
                padding : 35px 0 30px;
            }

            @media(max-width: 575px) {
                padding-bottom : 0;
            }
        }
    }

    .blog-grid-page {
        .blog-grid-area {
            padding : 70px 0;
            .blog-item {
                border: 1px solid ${colors.border1};
                border-radius: 5px;
                transition: all 0.2s ease;
                margin-bottom: 30px;

                .blog-img {
                    a {
                        img {
                            border-radius: 5px 5px 0 0;
                        }
                    }
                }
                .blog-content {
                    padding: 30px 25px 25px;
                    border-radius: 0 0 5px 5px;
                    .blog-auth_date {
                        margin-bottom: 12px;
                        .author-img {
                            margin-right : 20px;
                            a {
                                img {
                                    max-width: 35px;
                                    border-radius: 50%;
                                    margin-right: 8px;
                                    margin-top: -8px;
                                }
                            }
                            p {
                                a {
                                    font-size: 13px;
                                    color: ${colors.green};
                                    font-weight: 500;
                                    &:hover {
                                        color: ${colors.black1};
                                    }
                                }
                            }

                            @media(max-width: 767px) {
                                margin-right: 10px;
                            }
                        }

                        .post-date,
                        .post-category {
                            margin-right: 8px;
                            p {
                                font-size : 13px;
                                color: ${colors.text2};
                                font-weight: 500;
                                i {
                                    font-size : 20px;
                                    color: ${colors.green};
                                    vertical-align: top;
                                }
                            }
                        }

                        .post-category {
                            margin-right: 0;
                        }
                    }

                    .blog-title {
                        margin-bottom: 10px;
                        h6 {
                            a {
                                color: ${colors.black1};
                                line-height: 25px;
                                &:hover {
                                    color: ${colors.green};
                                }

                                @media(max-width: 767px) {
                                    font-size : 15px;
                                }
                            }
                        }
                    }

                    .blog-desc {
                        p {
                            font-size : 14px;
                            color : ${colors.text3};
                            line-height: 25px;
                        }
                    }
                }
                &:hover {
                    box-shadow: 0 12px 25px rgba(0,0,0,0.07);
                }
            }

            ul.pagination-box {
                margin-top: 20px;

                @media(max-width: 575px) {
                    margin-bottom: 30px;
                }
            }

            @media(max-width: 767px) {
                padding: 35px 0 30px;
            }

            @media(max-width: 575px) {
                padding-bottom : 0;
            }
        }
    }
`;