import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .error-page {
        .error-area {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            padding: 80px 0 120px;
            position: relative;
            &:before {
                position: absolute;
                content: '';
                background: rgba(255, 255, 255, 0.92);
                opacity: 0.9;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            .error-box {
                h1 {
                    font-size : 192px;
                    color    : ${colors.black1};
                    font-weight: 600;
                    span {
                        color    : ${colors.green};
                    }

                    @media(max-width: 575px) {
                        font-size : 120px;
                    }
                }
                h3 {
                    color    : ${colors.black2};
                    font-weight : 600;
                    margin-bottom: 20px;

                    @media(max-width: 575px) {
                        font-size : 22px;
                    }
                }
                p {
                    font-size : 17px;
                    color : ${colors.text1};
                    font-weight: 500;
                    margin-bottom: 40px;
                }
                a {
                    font-size: 18px;
                    background : ${colors.gr_bg};
                    color : #ffffff;
                    padding: 12px 30px;
                    font-weight: 500;
                    border-radius: 5px;
                    display : inline-block;
                    i {
                        margin-right: 6px;
                    }
                    &:hover {
                        background : ${colors.gr_bg2};
                    }

                    @media(max-width: 575px) {
                        font-size: 15px;
                        padding: 10px 20px;
                    }
                }
            }

            @media(max-width: 767px) {
                padding: 30px 0 75px;
            }

            @media(max-width: 575px) {
                padding: 30px 0 55px;
            }
        }
    }
`;