import styled from "styled-components";
import { colors } from './../../../components/common/element/elements.js';

export const Styles = styled.div`
    .product-qty {
        margin-bottom : 20px;
        ul {
            li {
                &:nth-child(1) {
                    font-size : 14px;
                    color: ${colors.text2};
                    vertical-align: middle;
                    margin-right: 10px;
                }
                &:nth-child(2) {
                    display: inline-block;
                    border: 1px solid ${colors.border3};
                    padding: 0 5px;
                    border-radius: 5px;
                    input#minus {
                        width: 25px;
                        height: 32px;
                        padding: 3px 10px;
                        background: #ffffff;
                        border: none;
                        cursor: pointer;
                    }
                    input#count {
                        width: 35px;
                        height: 32px;
                        text-align: center;
                        background-color: transparent;
                        border: none;
                        border-left: 1px solid ${colors.border3};
                        border-right: 1px solid ${colors.border3};
                        font-weight: 500;
                    }
                    input#plus {
                        width: 25px;
                        height: 32px;
                        padding: 3px 10px;
                        background: #ffffff;
                        border: none;
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;