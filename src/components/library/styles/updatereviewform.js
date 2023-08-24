import styled from "styled-components";
import { colors } from '../../../components/common/element/elements.js';

export const Styles1 = styled.div`
.star-rating{
    input {
        display: none;
    }
}
button {
    font-size : 15px;
    color     : #fff;
    background: ${colors.gr_bg};
    width     : 200px;
    height    : 50px;
    border    : none;
    font-weight: 500;
    border-radius : 5px;
    margin-top: 5px;

    &:hover {
        background: ${colors.gr_bg2};
    }
}
    
`;