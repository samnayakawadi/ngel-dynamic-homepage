import styled from "styled-components";
import { colors } from './../../../components/common/element/elements.js';

export const Styles = styled.div`
    /* Popular Course */
    .popular-course {
        border : 1px solid ${colors.border1};
        padding: 15px 20px 20px;
        border-radius : 5px;
        margin: 30px 0;
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
                font-size  : 17px;
            }
        }

        .popular-items {
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
                    p.title {
                        margin-bottom: 3px;
                        a {
                            font-size: 13px;
                            color: ${colors.black2};
                            font-weight: 500;
                            &:hover {
                                color : ${colors.green};
                            }
                        }
                    }

                    ul.rating {
                        margin-bottom: 3px;
                        li {
                            margin-right : 0;
                            i {
                                font-size: 14px;
                                color: ${colors.yellow};
                            }
                        }
                    }

                    p.price {
                        font-size : 15px;
                        color : ${colors.green};
                        font-weight : 500;
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