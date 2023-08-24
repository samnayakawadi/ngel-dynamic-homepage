import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .cart-page {
        .cart-area {
            padding : 70px 0;
            .product-list {
                table.table.table-bordered {
                    border: 1px solid ${colors.border3};
                    margin-bottom: 0;
                    thead {
                        tr {
                            th {
                                border: none;
                                padding: 20px 10px;
                                font-size: 15px;
                                color: ${colors.black1};
                            }
                        }
                    }
                    tbody {
                        tr {
                            td {
                                border: none;
                                border-top: 1px solid ${colors.border3};
                                padding: 25px 10px;
                                color: ${colors.text2};
                                vertical-align: middle;
                            }
                            td.product-remove {
                                padding: 15px 25px;
                                text-align: center;
                                i {
                                    font-size : 20px;
                                    color: ${colors.text3};
                                    &:hover {
                                        color: ${colors.red};
                                    }
                                }
                            }
                            td.product-thumbnail {
                                img {
                                    width: 75px;
                                    height: auto;
                                    border-radius: 5px;
                                }
                            }
                            td.product-title {
                                a {
                                    font-size : 14px;
                                    color: ${colors.black1};
                                    font-weight : 500;
                                    &:hover {
                                        color: ${colors.green};
                                    }
                                }
                            }
                            td.product-price {
                                span {
                                    font-size : 14px;
                                    color: ${colors.black1};
                                }
                            }
                            td.product-quantity {
                                input.form-control {
                                    padding: 10px;
                                    height: 38px;
                                    width: 58px;
                                    font-size: 14px;
                                    border-color: ${colors.border1};
                                    color: ${colors.text2};
                                    border-radius: 5px;
                                    &:focus {
                                        box-shadow : none;
                                        border-color: ${colors.green};
                                    }
                                }
                            }
                            td.product-subtotal {
                                span {
                                    font-size : 14px;
                                    color: ${colors.black1};
                                }
                            }
                        }
                    }
                }

                .actions {
                    display: flex;
                    border: 1px solid ${colors.border3};
                    border-top: none;
                    padding: 20px 25px;
                    flex-wrap: wrap;
                    .coupon {
                        form {
                            input {
                                width: 200px;
                                height: 45px;
                                border: 1px solid ${colors.border1};
                                font-size: 14px;
                                color: ${colors.black1};
                                padding-left: 15px;
                                margin-right: 10px;
                                &::placeholder {
                                    font-size  : 14px;
                                    font-style : italic;
                                    color      : ${colors.text2};
                                }
                                &:focus {
                                    box-shadow : none;
                                    border-color: ${colors.green};
                                }
                            }
                            button {
                                font-size: 14px;
                                color: #ffffff;
                                background: ${colors.gr_bg};
                                width: 120px;
                                height: 45px;
                                border: none;
                                border-radius: 5px;
                                &:hover {
                                    background: ${colors.gr_bg2};
                                }
                            }
                        }
                    }
                    .update-cart {
                        a.update-btn {
                            display: inline-block;
                            font-size: 14px;
                            color: #ffffff;
                            background: ${colors.gr_bg};
                            width: 120px;
                            height: 45px;
                            text-align : center;
                            padding-top: 12px;
                            border-radius: 5px;
                            &:hover {
                                background: ${colors.gr_bg2};
                            }
                        }
                    }
                }

                @media(max-width: 991px) {
                    margin-bottom : 30px;
                }
            }

            .cart-summary {
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                border-radius: 5px;
                padding: 25px 35px 35px;
                .cs-title {
                    h5 {
                        color: ${colors.black1};
                        font-weight: 600;
                        padding-bottom : 10px;
                        margin-bottom: 20px;
                        position: relative;
                        &:before {
                            position: absolute;
                            content: "";
                            background: ${colors.green};
                            width: 50px;
                            height: 2px;
                            bottom: 0;
                            left: 42%;
                        }
                    }
                }

                .cs-content {
                    ul {
                        border-bottom: 1px solid ${colors.text2};
                        padding-bottom: 10px;
                        margin-bottom: 10px;
                        li {
                            font-size: 14px;
                            color: ${colors.black2};
                            font-weight: 500;
                            margin-bottom: 10px;
                            span {
                                float : right;
                                font-weight: 400;
                            }
                            &:nth-child(4) {
                                color: ${colors.red};
                            }
                            &:last-child {
                                margin-bottom : 0;
                            }
                        }
                    }
                    p.cart-total {
                        font-size: 15px;
                        color: ${colors.black1};
                        font-weight: 500;
                        margin-bottom: 35px;
                        span {
                            float : right;
                        }

                        @media(max-width: 991px) {
                            margin-bottom: 18px;
                        }
                    }
                    button.checkout-btn {
                        font-size: 16px;
                        color: #ffffff;
                        background: ${colors.gr_bg};
                        display: inline-block;
                        width: 100%;
                        height: 45px;
                        border: none;
                        border-radius: 5px;
                        &:hover {
                            background: ${colors.gr_bg2};
                        }
                    }
                }
            }

            @media(max-width: 767px) {
                padding: 35px 0;
            }
        }
    }
`;