/*===========================================
Template Name: Edulyn - React Education Template
Author: Md Tahmidur Rahman
Author URL: http://snazzytheme.com/
Version: 1.0
==============================================*/

import { createGlobalStyle } from "styled-components";
import { colors, fonts } from "../element/elements.js";

export const GlobalStyle = createGlobalStyle`
    html {
        color      : ${colors.bg1};
        font-size  : 13px;
        line-height: 1.4;
    }

    ::-moz-selection {
        background : #b3d4fc;
        text-shadow: none;
    }

    ::selection {
        background : #b3d4fc;
        text-shadow: none;
    }

    hr {
        display   : block;
        height    : 1px;
        border    : 0;
        border-top: 1px solid ${colors.border3};
        margin    : 1em 0;
        padding   : 0;
    }

    audio,
    canvas,
    iframe,
    img,
    svg,
    video {
        vertical-align: middle;
    }

    fieldset {
        border : 0;
        margin : 0;
        padding: 0;
    }

    textarea {
        resize: vertical;
    }

    body {
        font-size     : 13px;
        background    : #ffffff;
        color         : ${colors.text1};
        letter-spacing: 0.3px;
        font-family   : ${fonts.roboto};
    }

    h1,
    h1 a {
        font-size: 40px;
    }

    h2,
    h2 a {
        font-size: 32px;
    }

    h3,
    h3 a {
        font-size: 28px;
    }

    h4,
    h4 a {
        font-size: 24px;
    }

    h5,
    h5 a {
        font-size: 20px;
    }

    h6,
    h6 a {
        font-size: 16px;
    }

    h1,
    h1 a,
    h2,
    h2 a,
    h3,
    h3 a,
    h4,
    h4 a,
    h5,
    h5 a,
    h6,
    h6 a {
        font-family: ${fonts.poppins};
        margin     : 0;
    }

    a,
    button,
    li,
    p {
        font-size     : 13px;
        font-family   : ${fonts.roboto};
        margin        : 0;
        letter-spacing: 0.3px;
    }

    ul {
        padding: 0;
        margin : 0;
    }

    a,
    a:active,
    a:focus,
    a:hover,
    button:focus,
    button:hover {
        text-decoration: none;
        outline        : none;
    }

    a,
    button {
        transition: all 0.2s ease;
    }

    input:focus,
    textarea:focus {
        outline: none;
    }

    .padding-fix {
        padding-left : 0;
        padding-right: 0;
    }

    .padding-fix-r {
        padding-right: 0;
    }

    .padding-fix-l {
        padding-left: 0;
    }

    .margin-fix {
        margin-left : 0;
        margin-right: 0;
    }
`;