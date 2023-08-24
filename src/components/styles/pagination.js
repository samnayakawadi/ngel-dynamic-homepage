import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`

    /* Pagination */
    ul.pagination-box {
        margin-top: 20px;
        li {
            margin-right : 15px;
            a {
                font-size: 16px;
                color: ${colors.green};
                width: 38px;
                height: 38px;
                border: 1px solid ${colors.border3};
                background-color: #fff;
                display: block;
                padding-top: 7px;
                border-radius: 50%;
                i {

                }
                &:hover {
                    background-color: ${colors.green};
                    color: #ffffff;
                    border-color : ${colors.green};
                }

                @media(max-width: 575px) {
                    font-size: 14px;
                    width: 30px;
                    height: 30px;
                    padding-top: 4px;
                }
            }
            &:last-child {
                margin-right : 0;
            }
        }
        li.active {
            a {
                background-color: ${colors.green};
                color: #fff;
                border-color : ${colors.green};
            }
        }

        @media(max-width: 767px) {
            margin-top: 5px;
        }
    }
`;