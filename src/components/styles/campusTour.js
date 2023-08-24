import styled from "styled-components";
import { colors } from "../common/element/elements.js";

export const Styles = styled.div`
    .campus-tour {
        background: ${colors.bg2};
        padding   : 63px 0 60px;

        .sec-title {
            h4 {
                color        : ${colors.black1};
                line-height  : 35px;
                font-weight  : 600;
                max-width    : 550px;
                margin       : auto;
                margin-bottom: 48px;

                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }
        }

        .tour-box {
            border-radius : 5px;
            overflow     : hidden;
            position     : relative;
            margin-bottom: 30px;

            img {
                border-radius : 5px;
                transition : all 0.3s ease;

                &:hover {
                    transform: scale(1.1);
                }

                @media(max-width: 767px) {
                    width : 100%;
                }
            }

            img.__react_modal_image__medium_img {
                border-radius : 0;
            }
        }
        @media(max-width: 767px) {
            padding: 30px 0 25px;
        }
    }
`;