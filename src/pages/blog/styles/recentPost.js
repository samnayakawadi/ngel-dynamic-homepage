import styled from "styled-components";
import { colors } from './../../../components/common/element/elements.js';

export const Styles = styled.div`
    /* Recent Blog */
    .recent-blog {
        border : 1px solid ${colors.border1};
        padding: 15px 20px 20px;
        border-radius : 5px;
        margin-bottom: 30px;
        h5 {
            color : ${colors.black1};
            font-weight : 600;
            padding-bottom: 10px;
            margin-bottom: 20px;
            position : relative;
            &:before {
                position : absolute;
                content : "";
                background : ${colors.green};
                width : 50px;
                height: 2px;
                bottom : 0;
                left : 0;
            }

            @media(max-width: 575px) {
                font-size : 17px;
            }
        }

        .blog-items {
            .item-box {
                margin-bottom: 15px;
                .item-img {
                    a {
                        img {
                            max-width: 85px;
                            border-radius: 5px;
                            margin-right: 15px;

                            @media(max-width: 1199px) {
                                max-width: 60px;
                                margin-right: 12px;
                            }
                        }
                    }
                }

                .item-content {
                    padding-top: 5px;
                    p.title {
                        margin-bottom: 8px;
                        a {
                            font-size: 14px;
                            color: ${colors.black2};
                            font-weight: 500;
                            &:hover {
                                color : ${colors.green};
                            }

                            @media(max-width: 1199px) {
                                font-size: 13px;
                            }
                        }

                        @media(max-width: 1199px) {
                            margin-bottom: 0;
                        }
                    }

                    span.date {
                        font-size : 12px;
                        color : ${colors.text3};
                        font-weight: 500;
                        font-style: italic;
                    }

                    @media(max-width: 1199px) {
                        padding-top: 0;
                    }
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        @media(max-width: 1199px) {
            padding: 12px 15px 15px;
        }
    }
`;