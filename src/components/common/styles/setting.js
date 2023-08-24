import styled from "styled-components";
import { colors } from "../element/elements.js";

export const Styles = styled.div`
    button.setting-btn {
        background : ${colors.gr_bg};
        position: fixed;
        // bottom : 1px;
        right : 0px;
        width : 60px;
        height: 35px;
        border-radius : 5px;
        display : flex;
        align-items : center;
        justify-content : center;
        font-size : 28px;
        border : none;
        color : #ffffff;
        text-decoration : none;
        z-index : 1000;
        opacity: 0;
        pointer-events : none;
        transition : all 0.4s;
        opacity : 1;
        &:hover {
            background : ${colors.gr_bg2};
        }
    }

    
`;