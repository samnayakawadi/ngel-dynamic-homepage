import styled from "styled-components";
import { colors } from './../../../components/common/element/elements.js';

export const Styles = styled.div`
    /* Course Price */
    .course-price {
        border : 1px solid ${colors.border1};
        padding: 15px 20px 20px;
        border-radius : 5px;
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
        
        ul.price-item {
            li.check-btn {
                border-top : 1px dashed ${colors.border3};
                padding: 10px 0;

                &:last-child {
                    border-bottom : 1px dashed ${colors.border3};
                }

                label {
                    font-size: 14px;
                    color: ${colors.text3};
                    display: block;
                    margin-bottom : 4px;
                    cursor: pointer;

                    input[type=checkbox] {
                        border : 2px solid ${colors.border3};
                        appearance: none;
                        width: 18px;
                        height: 18px;
                        cursor: pointer;
                        margin-right: 6px;
                        position: relative;
                        top: 4px;

                        &:focus {
                            outline: none;
                        }

                        &:checked {
                            background-color: ${colors.green};
                            background: ${colors.green} url("data:image/gif;base64,R0lGODlhCwAKAIABAP////3cnSH5BAEKAAEALAAAAAALAAoAAAIUjH+AC73WHIsw0UCjglraO20PNhYAOw==") 2px 2px no-repeat;
                            border-color : ${colors.green};
                        }
                    }

                    span {
                        float : right;
                        font-size: 12px;
                        color: ${colors.text2};
                        line-height: 27px;
                    }
                }
            }
        }

        @media(max-width: 1199px) {
            padding: 12px 15px 15px;
        }
    }
`;