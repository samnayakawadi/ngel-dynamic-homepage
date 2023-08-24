import styled from "styled-components";
import { colors } from './../../../../../components/common/element/elements.js';

export const Styles = styled.div`
    /* Course Category */
    .course-category {
        // border : 1px solid ${colors.border1};
        // padding: 15px 20px 20px;
        // border-radius : 5px;
        margin-bottom : 30px;
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
        

        select {
            width           : 100%;
            height          : 48px;
            font-size       : 14px;
            padding         : 15px 20px;
            color           : ${colors.black1};
            border          : 1px solid ${colors.border3};
            border-radius   : 5px;
            font-family     : montserrat;
            cursor          : pointer;
            line-height     : 1.1;
            -webkit-appearance: none;
            -moz-appearance: none;
            background: transparent;
            background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            background-repeat: no-repeat;
            background-position-x: 96%;
            background-position-y: 11px;


            &::placeholder {
                font-size : 14px;
                font-style: italic;
                color     : ${colors.text3};

                @media(max-width: 575px) {
                    font-size : 13px;
                }
            }

            &:focus {
                border-color : ${colors.green};
            }

            @media(max-width: 575px) {
                height : 45px;
            }
        }

        option {
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

        ul.category-item {
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