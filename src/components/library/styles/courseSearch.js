import styled from "styled-components";
import { colors } from './../../../components/common/element/elements.js';

export const Styles = styled.div`
    /* Course Search */
    .course-search {
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
                font-size  : 17px;
            }
        }
        form {
            position: relative;
            input {
                width : 100%;
                height: 45px;
                border: 1px solid ${colors.border3};
                color : ${colors.black1};
                padding-left: 15px;
                &:focus {
                    border-color : ${colors.green};
                }
                &::placeholder {
                    font-size  : 14px;
                    font-style : italic;
                    color      : ${colors.black2};
                    font-weight: 400;
                }
            }
            button {
                position: absolute;
                width: 45px;
                height: 100%;
                top: 0;
                right: 0;
                background: transparent;
                padding: 0;
                border: none;
                font-size: 20px;
                color: ${colors.green};
            }
        }

        @media(max-width: 1199px) {
            padding: 12px 15px 15px;
        }
    }
`;