import styled from "styled-components";
import { colors } from "../element/elements.js";

export const Styles = styled.div`
    a.nav-search {
        padding: 18px 0 0 10px;

        i {
            font-size: 20px;
            color    : ${colors.border1};
        }
    }

    .search-wrap {
        position        : fixed;
        top             : 0;
        left            : 0;
        width           : 100%;
        height          : 100%;
        z-index         : 1000;
        background-color: rgba(255, 255, 255, 0.96);
        transform       : scale(1, 0);
        transform-origin: bottom center;
        transition : transform 0.7s ease;

        .search-overlay {
            width           : 100%;
            height          : 100%;
            background-color: rgba(255, 255, 255, 0.96);
            position        : absolute;
            top             : 0;
            left            : 0;
            right           : 0;
            bottom          : 0;
            z-index         : 999;
            opacity         : 0.7;
        }

        .search-inner {
            position       : absolute;
            width          : 100%;
            height         : 100%;
            display        : flex;
            justify-content: center;
            align-items    : center;

            span.search-form {
                position  : relative;
                z-index   : 9991;
                width     : 50%;
                margin-top: -80px;
                position  : relative;

                input {
                    width        : 100%;
                    height       : 65px;
                    border       : none;
                    border-bottom: 2px solid ${colors.border3};
                    font-size    : 26px;
                    padding      : 0 10px 0 10px;
                    margin-bottom: 0;
                    color        : ${colors.black2};
                    position     : relative;
                    box-shadow   : none;
                    border-radius: 0;
                    outline      : none;
                    background   : transparent;

                    @include input-placeholder {
                        font-style : italic;
                        color      : ${colors.black1};
                        font-weight: 300;
                    }
                }

                .search-btn {
                    position : absolute;
                    
                    top      : 25px;
                    right    : 50px;
                    font-size: 26px;
                    color    : ${colors.green};
                    cursor   : pointer;
                }

                .close-btn {
                    position : absolute;
                    top      : 25px;
                    right    : -12px;
                    font-size: 26px;
                    color    : ${colors.green};
                    cursor   : pointer;
                }
            }
        }
    }

    .search-wrap.active {
        transform-origin: top center;
        transform       : scale(1, 1);
    }
`;