import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
.registration-page {
    .registration-area {
        padding : 70px 0;
        .registration-box {
            max-width : 500px;
            margin: auto;
            border: 1px solid ${colors.border1};
            box-shadow: 0 0px 20px rgba(0,0,0,0.08);
            padding: 25px 30px;
            border-radius: 5px;
            .registration-title {
                h3 {
                    color : ${colors.black2};
                    text-transform: uppercase;
                    font-weight: 600;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    position: relative;
                    &:before {
                        position: absolute;
                        content: "";
                        background: ${colors.green};
                        width: 50px;
                        height: 2px;
                        bottom: 0;
                        left: 50%;
                        margin-left: -25px;
                    }

                    @media(max-width: 575px) {
                        font-size : 20px;
                    }
                }
            }

            .progressDiv{
                margin : 0 0 150px 0;
            }

            .progressbar {
                margin: 50px 0 50px 0;
                counter-reset: step;
            }
            .progressbar li {
                list-style-type: none;
                width: 33%;
                float: left;
                font-size: 12px;
                position: relative;
                text-align: center;
                text-transform: uppercase;
                color: #7d7d7d;
            }
            .progressbar li:before {
                width: 15px;
                height: 15px;
                content: '';	
                line-height: 30px;
                border: 2px solid #7d7d7d;
                background-color: #7d7d7d;
                display: block;
                text-align: center;
                margin: 0 auto 10px auto;
                border-radius: 50%;
                transition: all .8s;
            }
            .progressbar li:after {
                width: 100%;
                height: 2px;
                content: '';
                position: absolute;
                background-color: #7d7d7d;
                top: 7px;
                left: -50%;
                z-index: -1;
                transition: all .8s;
            }
            .progressbar li:first-child:after {
                content: none;
            }
            .progressbar li.active:before {
                border-color: #55b776;
                background-color: #55b776;
                transition: all .8s;
            }
            .progressbar li.active:after {
                background-color: #55b776;
                transition: all .8s;
            }
            

            form.form {
                p.form-control {
                    padding      : 0;
                    width        : auto;
                    height       : auto;
                    background   : transparent;
                    border       : none;
                    margin-bottom: 28px;
                    position     : relative;

                    label {
                        font-size : 15px;
                        color : ${colors.text1};
                        font-weight : 500;

                        @media(max-width: 575px) {
                            font-size : 14px;
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
                        background-position-x: 98.5%;
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
                            height : 40px;
                        }
                    }

                    input {
                        width           : 100%;
                        height          : 48px;
                        background-color: #ffffff;
                        font-size       : 14px;
                        padding         : 15px 20px;
                        color           : ${colors.black1};
                        border          : 1px solid ${colors.border3};
                        border-radius : 5px;

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
                            height : 40px;
                        }
                    }

                    input[type="datetime-local"] {
                        padding: 10px;
                      }
                      
                      input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                        color: transparent;
                        background: none;
                        z-index: 1;
                      }
                      
                      input[type="datetime-local"]{
                      &::before {
                        color: transparent;
                        background: none;
                        display: block;
                        font-family: 'Font Awesome 5 Free';
                        content: '\f073';
                        /* This is the calendar icon in FontAwesome */
                        width: 15px;
                        height: 20px;
                        position: absolute;
                        top: 41px;
                        right: 20px;
                        color: ${colors.black1};
                      }

                    }

                    textarea {
                            width           : 100%;
                            height          : 135px;
                            background-color: #ffffff;
                            font-size       : 14px;
                            padding         : 15px 20px;
                            color           : ${colors.black1};
                            border          : 1px solid ${colors.border3};
                            border-radius : 5px;

                            &::placeholder {
                                font-size : 14px;
                                color     : ${colors.text2};
                            }

                            &:focus {
                                border-color : ${colors.green};
                            }

                            @media(max-width: 480px) {
                                height: 120px;
                            }
                        }

                    span {
                        color      : ${colors.red};
                        font-weight: 300;
                        position   : absolute;
                        bottom     : -20px;
                        left       : 0;
                        visibility : hidden;
                    }
                }

                p.form-control.success {
                    input,textarea {
                        border: 2px solid ${colors.green};
                    }

                    &::before {
                        position   : absolute;
                        content    : "\f058";
                        font-family: "Line Awesome Free";
                        font-size  : 24px;
                        color      : ${colors.green};
                        font-weight: 900;
                        top        : 75px;
                        right      : 15px;
                    }
                }

                p.form-control.error {
                    input,textarea {
                        border: 2px solid ${colors.red};
                    }

                    &::before {
                        position   : absolute;
                        content    : "\f06a";
                        font-family: "Line Awesome Free";
                        font-size  : 24px;
                        color      : ${colors.red};
                        font-weight: 900;
                        top        : 75px;
                        right      : 15px;
                    }
                }

                p.form-control.error {
                    span {
                        visibility: visible;
                    }
                }

                button {
                    font-size  : 16px;
                    color      : #fff;
                   // background : ${colors.gr_bg};
                    width      : 100%;
                    height     : 48px;
                    font-weight: 500;
                    border     : none;
                    border-radius : 5px;
                    text-transform: uppercase;
                    margin-bottom : 20px;

                    &:hover {
                      //  background: ${colors.gr_bg2};

                        i {
                            color: #ffffff;
                        }
                    }

                    @media(max-width: 575px) {
                        font-size : 15px;
                        height     : 40px;
                    }
                }
            }

            .have_account-btn {
                p {
                    font-size : 14px;
                    color     : ${colors.text3};
                    a {
                        font-size : 14px;
                        color : ${colors.green};
                        font-weight : 500;
                        &:hover {
                            text-decoration : underline;
                        }
                    }
                }
            }
        }

        @media(max-width: 767px) {
            padding: 30px 0;
        }
    }
}
`;