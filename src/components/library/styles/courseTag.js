import styled from "styled-components";
import { colors } from './../../../components/common/element/elements.js';

export const Styles = styled.div`
    /* Course Tag */
    .course-tag {
        border : 1px solid ${colors.border1};
        padding: 15px 20px 12px;
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
        .tag-box {
            a {
                font-size: 13px;
                color : ${colors.text1};
                border: 1px solid ${colors.border3};
                padding: 6px 8px 5px;
                margin: 0 8px 10px 0;
                display: inline-block;
                border-radius: 5px;
                &:hover {
                    color : #ffffff;
                    background : ${colors.gr_bg};
                    border-color : ${colors.green};
                }
            }
        }

        @media(max-width: 1199px) {
            padding: 12px 15px 6px;
        }

        @media(max-width: 575px) {
            margin-bottom : 30px;
        }
    }
`;