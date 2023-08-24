import styled from "styled-components";
import { colors } from "../../common/element/elements.js";

export const Styles = styled.div`

    /* Course Grid */
    .course-grid-area {
        padding: 70px 0;
        .course-items {
            .course-item {
                border: 1px solid ${colors.border1};
                border-radius : 5px;
                transition : all 0.2s ease;
                overflow : hidden;
                margin-bottom: 30px;

                .course-image {
                    width              : 100%;
                    height             : 240px;
                    background-size    : cover;
                    background-position: center;
                    background-repeat  : no-repeat;
                    border-radius : 5px 5px 0 0;
                    position: relative;

                    .author-img {
                        position: absolute;
                        left    : 20px;
                        bottom  : 20px;

                        img {
                            max-width: 40px;
                            border-radius : 50%;
                            margin-right: 5px;
                        }

                        .title {
                            background: #ffffff;
                            padding   : 3px 8px;
                            border-radius : 5px;

                            p {
                                font-size    : 12px;
                                color        : ${colors.black1};
                                font-weight  : 500;
                                margin-bottom: -4px;
                            }

                            span {
                                font-size  : 11px;
                                color      : ${colors.text3};
                                font-weight: 500;
                            }
                        }

                    }
                    .column {
                        float: left;
                        width: 50%;
                      }

                    .course-price {
                        p {
                            font-size  : 16px;
                            color      : #ffffff;
                            background : ${colors.bg1};
                            position   : absolute;
                            right      : 20px;
                            bottom     : 20px;
                            padding    : 8px 10px;
                            font-weight: 500;
                            border-radius : 5px;
                        }
                    }

                    @media(max-width: 767px) {
                        height: 185px;
                    }
                }

                .course-content {
                    background: #fff;
                    padding   : 20px 25px;

                    h6.heading {
                        a {
                            color        : ${colors.black1};
                            font-weight  : 600;
                            display      : inline-block;
                            margin-bottom: 12px;

                            &:hover {
                                color: ${colors.green};
                            }
                        }
                    }

                    p.desc {
                        font-size     : 14px;
                        color         : ${colors.text3};
                        line-height   : 25px;
                        border-bottom : 1px solid ${colors.border1};
                        padding-bottom: 10px;
                        margin-bottom : 12px;
                    }

                    .course-face {

                        .duration,
                        .student {
                            p {
                                font-size: 13px;
                                color    : ${colors.text3};

                                i {
                                    font-size     : 16px;
                                    color         : ${colors.green};
                                    vertical-align: text-bottom;
                                    margin-right  : 3px;
                                }
                            }
                        }

                        .rating {
                            ul {
                                li {
                                    margin-right: 0;

                                    i {
                                        font-size: 14px;
                                        color    : ${colors.yellow};
                                    }

                                    &:last-child {
                                        font-size: 13px;
                                        color    : ${colors.text3};
                                    }
                                }
                            }
                        }
                    }
                }

                &:hover {
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.07);
                }
            }
        }

        @media(max-width: 767px) {
            padding: 40px 0 30px;
        }
    }

    /* Course List */
    .course-list-area {
        padding: 70px 0;
        .course-items2 {
            .course-item {
                border-radius : 5px;
                transition : all 0.2s ease;
                overflow : hidden;
                box-shadow: 0 8px 20px 5px rgba(0,0,0,0.07);
                margin-bottom: 30px;

                .course-image-box {
                    .course-image {
                        width              : 290px;
                        height             : 230px;
                        background-size    : cover;
                        background-position: center;
                        background-repeat  : no-repeat;
                        border-radius : 5px 5px 0 0;
                        position: relative;

                        .author-img {
                            position: absolute;
                            left    : 20px;
                            top  : 20px;

                            img {
                                max-width: 40px;
                                border-radius : 50%;
                                margin-right: 5px;
                            }

                            .title {
                                background: #ffffff;
                                padding   : 3px 8px;
                                border-radius : 5px;

                                p {
                                    font-size    : 12px;
                                    color        : ${colors.black1};
                                    font-weight  : 500;
                                    margin-bottom: -4px;
                                }

                                span {
                                    font-size  : 11px;
                                    color      : ${colors.text3};
                                    font-weight: 500;
                                }
                            }

                            @media(max-width: 991px) {
                                top  : unset;
                                bottom : 20px;
                            }
                        }

                        .course-price {
                            p {
                                font-size  : 16px;
                                color      : #ffffff;
                                background : ${colors.bg1};
                                position   : absolute;
                                right      : 20px;
                                top     : 20px;
                                padding    : 8px 10px;
                                font-weight: 500;
                                border-radius : 5px;

                                @media(max-width: 991px) {
                                    top  : unset;
                                    bottom : 20px;
                                }
                            }
                        }

                        @media(max-width: 991px) {
                            width: 100%;
                        }
                    }
                }

                .course-content {
                    background: #fff;
                    padding   : 20px 25px;

                    h6.heading {
                        padding-bottom: 12px;
                        margin-bottom: 20px;
                        position: relative;
                        &:before {
                            position: absolute;
                            content: "";
                            background: ${colors.green};
                            width: 50px;
                            height: 2px;
                            bottom: 0;
                            left: 0;
                        }

                        a {
                            color        : ${colors.black1};
                            font-weight  : 600;
                            display      : inline-block;

                            &:hover {
                                color: ${colors.green};
                            }
                        }
                    }

                    .rating {
                        margin-bottom: 6px;
                        ul {
                            li {
                                margin-right: 0;

                                i {
                                    font-size: 14px;
                                    color    : ${colors.yellow};
                                }

                                &:last-child {
                                    font-size: 13px;
                                    color    : ${colors.text3};
                                }
                            }
                        }
                    }

                    p.desc {
                        font-size     : 14px;
                        color         : ${colors.text3};
                        line-height   : 25px;
                        margin-bottom : 15px;
                    }

                    a.details-btn {
                        font-size : 13px;
                        color : ${colors.green};
                        border : 1px solid ${colors.border3};
                        padding: 7px 15px;
                        border-radius: 5px;
                        font-weight: 500;
                        &:hover {
                            color : #ffffff;
                            background : ${colors.gr_bg};
                            border-color : ${colors.green};
                        }
                    }
                }

                &:hover {
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
                }

                @media(max-width: 991px) {
                    display : block !important;
                }
            }
        }

        @media(max-width: 767px) {
            padding: 40px 0 30px;
        }
    }

    /* Course Details */
    .course-details-area {
        
        
        .course-details-top {
            padding : 70px 0px 0px 0px;
            // display : flex;
            // justify-content: space-between;
            // flex-wrap: wrap;                    
            .child1{
                .heading {
                    h4 {
                        color : ${colors.black1};
                        font-weight: 600;
                        line-height: 35px;
                        margin-bottom: 25px;
    
                        @media(max-width: 575px) {
                            font-size : 20px;
                        }
                    }
                }
                .course-top-overview {
                    margin-bottom : 25px;
                    .overviews {
                        .author {
                            margin-right : 20px;
                            padding-right : 20px;
                            margin-top: -3px;
                            border-right : 1px solid ${colors.border3};
                            img {
                                float : left;
                                max-width: 50px;
                                border-radius: 50%;
                                margin-right: 10px;
                            }
                            .author-name {
                                float : left;
                                margin-top: 3px;
                                h6 {
                                    color : ${colors.black2};
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    margin-bottom: 5px;
    
                                    @media(max-width: 767px) {
                                        font-size : 14px;
                                    }
                                }
                                p {
                                    font-size : 15px;
                                    color : ${colors.text3};
                                    font-weight: 500;
    
                                    @media(max-width: 767px) {
                                        font-size : 14px;
                                    }
                                }
                            }
                        }
    
                        .category {
                            margin-right : 20px;
                            padding-right : 20px;
                            border-right : 1px solid ${colors.border3};
                            h6 {
                                color : ${colors.black2};
                                font-weight: 600;
                                text-transform: uppercase;
                                margin-bottom: 5px;
    
                                @media(max-width: 767px) {
                                    font-size : 14px;
                                }
                            }
                            p {
                                font-size : 15px;
                                color : ${colors.text3};
                                font-weight: 500;
    
                                @media(max-width: 767px) {
                                    font-size : 14px;
                                }
                            }
                        }
    
                        .rating {
                            margin-right : 20px;
                            padding-right : 20px;
                            border-right : 1px solid ${colors.border3};
                            h6 {
                                color : ${colors.black2};
                                font-weight: 600;
                                text-transform: uppercase;
                                margin-bottom: 5px;
    
                                @media(max-width: 767px) {
                                    font-size : 14px;
                                }
                            }
                            ul {
                                li {
                                    margin-right: 1px;
                                    i {
                                        font-size: 16px;
                                        color: ${colors.yellow};
                                    }
                                    &:last-child {
                                        font-size : 15px;
                                        color : ${colors.text3};
                                        font-weight: 500;
                                       // margin-left: 5px;
    
                                        @media(max-width: 767px) {
                                            font-size : 14px;
                                        }
                                    }
                                }
                            }
                        }
    
                        .price {
                            h6 {
                                color : ${colors.black2};
                                font-weight: 600;
                                text-transform: uppercase;
                                margin-bottom: 5px;
    
                                @media(max-width: 767px) {
                                    font-size : 14px;
                                }
                            }
                            p {
                                font-size : 15px;
                                color : ${colors.text3};
                                font-weight: 500;
    
                                @media(max-width: 767px) {
                                    font-size : 14px;
                                }
                            }
                        }
                    }
                    
    
                    @media(max-width: 480px) {
                        display : none;
                    }
                }
                .course-details-banner {
                    margin-bottom: 40px;
                    img {
                        border-radius : 5px;
                    }
                }
                .single-details-sidbar {
                    .course-details-feature {
                        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                        border-radius: 5px;
                        padding: 15px 20px 20px;
                        h5.title {
                            color: ${colors.black1};
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
                                left: 0;
                            }
        
                            @media(max-width: 575px) {
                                font-size : 17px;
                            }
                        }
        
                        ul.feature-list {
                            margin-bottom: 20px;
                            li {
                                border-top: 1px dashed ${colors.border3};
                                padding: 12px 0;
                                font-size : 14px;
                                color : ${colors.black2};
                                font-weight: 500;
                                i {
                                    font-size : 20px;
                                    color: ${colors.green};
                                    vertical-align: top;
                                    margin-right : 2px;
                                }
                                span {
                                    float : right;
                                    font-size: 13px;
                                    color: ${colors.text3};
                                    font-weight: 400;
                                    line-height: 20px;
                                }
                                &:first-child {
                                    border-top : none;
                                    padding-top : 0;
                                }
                                &:last-child {
                                    padding-bottom : 0;
                                }
                            }
                        }
        
                        button.enroll-btn {
                            font-size: 16px;
                            color: #fff;
                            background: ${colors.gr_bg};
                            display: inline-block;
                            width: 100%;
                            height: 40px;
                            font-weight : 500;
                            border : none;
                            padding: 9px;
                            border-radius: 5px;
                            &:hover {
                                background: ${colors.gr_bg2};
                            }
        
                            @media(max-width: 575px) {
                                font-size : 14px;
                            }
                        }
        
                        @media(max-width: 1199px) {
                            padding: 12px 15px 15px;
                        }
        
        
                        .event-sidebar-timer {
                            margin-bottom: 25px;
                            p {
                                display: inline-block;
                                background: ${colors.gr_bg};
                                margin-right: 5px;
                                width: 68px;
                                height: 65px;
                                font-size: 20px;
                                color : #ffffff;
                                font-weight : 500;
                                border-radius: 5px;
                                padding-top: 6px;
                                span {
                                    display : block;
                                    font-size: 13px;
                                    font-weight: normal;
                                    text-transform: uppercase;
                                }
                                &:last-child {
                                    margin-right: 0;
                                }
        
                                @media(max-width: 1199px) {
                                    margin-right: 3px;
                                    width: 58px;
                                    height: 60px;
                                    font-size: 18px;
                                }
                            }
                        }
                    }
                }
            }
            
            .child2{
                
            }
            

            @media(max-width: 767px) {
                margin-bottom: 40px;
            }
        }
        
        .admin-course-view {
            .single-details-sidbar {
                .course-details-feature {
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                    border-radius: 5px;
                    padding: 15px 20px 20px;
                    h5.title {
                        color: ${colors.black1};
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
                            left: 0;
                        }
    
                        @media(max-width: 575px) {
                            font-size : 17px;
                        }
                    }
    
                    ul.feature-list {
                        margin-bottom: 20px;
                        li {
                            border-top: 1px dashed ${colors.border3};
                            padding: 12px 0;
                            font-size : 14px;
                            color : ${colors.black2};
                            font-weight: 500;
                            i {
                                font-size : 20px;
                                color: ${colors.green};
                                vertical-align: top;
                                margin-right : 2px;
                            }
                            span {
                                float : right;
                                font-size: 13px;
                                color: ${colors.text3};
                                font-weight: 400;
                                line-height: 20px;
                            }
                            &:first-child {
                                border-top : none;
                                padding-top : 0;
                            }
                            &:last-child {
                                padding-bottom : 0;
                            }
                        }
                    }
    
                    button.enroll-btn {
                        font-size: 16px;
                        color: #fff;
                        background: ${colors.gr_bg};
                        display: inline-block;
                        width: 100%;
                        height: 40px;
                        font-weight : 500;
                        border : none;
                        padding: 9px;
                        border-radius: 5px;
                        &:hover {
                            background: ${colors.gr_bg2};
                        }
    
                        @media(max-width: 575px) {
                            font-size : 14px;
                        }
                    }
    
                    @media(max-width: 1199px) {
                        padding: 12px 15px 15px;
                    }
    
    
                    .event-sidebar-timer {
                        margin-bottom: 25px;
                        p {
                            display: inline-block;
                            background: ${colors.gr_bg};
                            margin-right: 5px;
                            width: 68px;
                            height: 65px;
                            font-size: 20px;
                            color : #ffffff;
                            font-weight : 500;
                            border-radius: 5px;
                            padding-top: 6px;
                            span {
                                display : block;
                                font-size: 13px;
                                font-weight: normal;
                                text-transform: uppercase;
                            }
                            &:last-child {
                                margin-right: 0;
                            }
    
                            @media(max-width: 1199px) {
                                margin-right: 3px;
                                width: 58px;
                                height: 60px;
                                font-size: 18px;
                            }
                        }
                    }
                }
            }
        }

        .course-tab-list {

            @media(max-width: 1241px) and (min-width: 821px) {
                width : 880px;
            }
            @media(max-width: 1600px) and (min-width: 1240px) {
                width : 880px;
            }   
            
            .nav {
                display: inline-block;
                border-radius: 5px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                margin-bottom: 35px;
                width: 100%;
                .nav-item {
                    display: inline-block;
                    a.nav-link {
                        font-size: 13px;
                        color: ${colors.black2};
                        font-weight: 500;
                        text-transform : uppercase;
                        padding: 12px 30px 10px;
                        border-radius: 5px;

                        @media(max-width: 991px) {
                            padding: 12px 16px 9px;
                        }
                    }
                    a.nav-link.active {
                        background : ${colors.gr_bg};
                        color : #ffffff;
                    }
                }
            }
            .tab-content {

                border : 0;
                padding : 0;
                width:100%;
                .overview-tab {
                    h5 {
                        color: ${colors.black2};
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
                            left: 0;
                        }

                        @media(max-width: 575px) {
                            font-size : 17px;
                        }                            
                    }
                    p {
                        font-size: 15px;
                        color: ${colors.text2};
                        line-height: 25px;

                        @media(max-width: 575px) {
                            font-size : 14px;
                        }
                    }

                    .course-desc {
                        margin-bottom: 40px;
                    }

                    .course-feature {
                        margin-bottom: 40px;
                        ul {
                            margin-top: 20px;
                            li {
                                font-size : 14px;
                                color: ${colors.text3};
                                line-height : 25px;
                                margin-bottom : 10px;
                                i {
                                    font-size : 20px;
                                    color: ${colors.green};
                                    float: left;
                                    height: 40px;
                                    line-height: 27px;
                                    margin-right: 10px;
                                }
                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                        }
                    }
                    .course-learn {
                        margin-bottom: 40px;
                        ul {
                            margin-top: 20px;
                            li {
                                font-size: 14px;
                                color: ${colors.text3};
                                line-height: 25px;
                                margin-bottom: 15px;
                                i {
                                    float: left;
                                    color: ${colors.green};
                                    border: 1px solid ${colors.border3};
                                    width: 35px;
                                    height: 35px;
                                    border-radius: 50%;
                                    text-align: center;
                                    padding-top: 9px;
                                    margin-top: 8px;
                                    margin-right: 15px;
                                }
                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                        }
                    }
                    .course-share {
                        ul.social {
                            margin-top: 30px;
                            li {
                                a {
                                    text-align: center;
                                    position  : relative;
                                    height    : 18px;
                                    display   : inline-block;

                                    &:before {
                                        content           : "";
                                        position          : absolute;
                                        border-width      : 9px 17px;
                                        border-style      : solid;
                                        border-top-color  : transparent;
                                        border-right-color: transparent;
                                        border-left-color : transparent;
                                        top               : -18px;
                                        left              : 0;
                                        z-index           : 1;
                                        transition : all 0.2s ease;
                                    }

                                    &:after {
                                        content            : "";
                                        position           : absolute;
                                        border-width       : 9px 17px;
                                        border-style       : solid;
                                        border-right-color : transparent;
                                        border-bottom-color: transparent;
                                        border-left-color  : transparent;
                                        bottom             : -18px;
                                        left               : 0;
                                        z-index            : 1;
                                        transition : all 0.2s ease;
                                    }

                                    i {
                                        font-size: 14px;
                                        color    : #ffffff;
                                        width    : 34px;
                                    }

                                    &:hover {
                                        background-color: ${colors.green} !important;

                                        &:before {
                                            border-bottom-color: ${colors.green} !important;
                                        }

                                        &:after {
                                            border-top-color: ${colors.green} !important;
                                        }
                                    }
                                }

                                &:nth-child(1) {
                                    a {
                                        background-color: #4267B2;

                                        &:before {
                                            border-bottom-color: #4267B2;
                                        }

                                        &:after {
                                            border-top-color: #4267B2;
                                        }
                                    }
                                }

                                &:nth-child(2) {
                                    a {
                                        background-color: #1DA1F2;

                                        &:before {
                                            border-bottom-color: #1DA1F2;
                                        }

                                        &:after {
                                            border-top-color: #1DA1F2;
                                        }
                                    }
                                }

                                &:nth-child(3) {
                                    a {
                                        background-color: #2867B2;

                                        &:before {
                                            border-bottom-color: #2867B2;
                                        }

                                        &:after {
                                            border-top-color: #2867B2;
                                        }
                                    }
                                }

                                &:nth-child(4) {
                                    a {
                                        background-color: #DD1343;

                                        &:before {
                                            border-bottom-color: #DD1343;
                                        }

                                        &:after {
                                            border-top-color: #DD1343;
                                        }
                                    }
                                }

                                &:nth-child(5) {
                                    a {
                                        background-color: #ea4c89;

                                        &:before {
                                            border-bottom-color: #ea4c89;
                                        }

                                        &:after {
                                            border-top-color: #ea4c89;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .curriculum-tab {
                    .course-curriculum {
                        margin-bottom: 40px;
                        h5 {
                            color: ${colors.black2};
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
                                left: 0;
                            }

                            @media(max-width: 575px) {
                                font-size : 17px;
                            }  
                        }
                        p {
                            font-size: 15px;
                            color: ${colors.text2};
                            line-height: 25px;

                            @media(max-width: 575px) {
                                font-size : 14px;
                            }
                        }
                    }
                    .course-element {
                        h5 {
                            color: ${colors.black2};
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
                                left: 0;
                            }

                            @media(max-width: 575px) {
                                font-size : 17px;
                            }
                        }
                        .course-item {
                            margin-bottom: 10px;
                            button.course-button {
                                border: none;
                                background: transparent;
                                
                                display: block;
                                width: 100%;
                                text-align : left;
                                padding: 0;
                                font-size : 18px;
                                color: ${colors.black2};
                                font-weight: 500;
                                span {
                                    float: right;
                                    font-size: 14px;
                                    color: ${colors.text3};
                                    font-weight: 400;
                                }
                            }

                            .course-content {
                                max-height: 0;
                                overflow  : hidden;
                                transition: max-height 0.2s ease-in-out;
                                ul {
                                    li {
                                       /* border-bottom : 5px solid ${colors.border3}; */
                                        margin-left: 25px;
                                        padding: 10px 0;
                                        span.play-icon {
                                            font-size : 14px;
                                            color: ${colors.text3};
                                            margin-right: 20px;
                                            i {
                                                color: ${colors.green};
                                                border: 1px solid ${colors.green};
                                                font-size: 22px;
                                                width: 30px;
                                                height: 30px;
                                                border-radius: 50%;
                                                padding-left: 3px;
                                                text-align: center;
                                                line-height: 29px;
                                                vertical-align: middle;
                                                margin-right: 10px;
                                            }
                                        }
                                        span.lecture-title {
                                            font-size : 15px;
                                            color: ${colors.black2};

                                            @media(max-width: 575px) {
                                                font-size : 14px;
                                            }
                                        }
                                        span.lecture-duration {
                                            float: right;
                                            font-size: 14px;
                                            color: ${colors.text3};
                                            line-height: 28px;
                                            font-weight: 400;
                                        }
                                        span.content {
                                            float: center;
                                            font-size: 14px;
                                            color: ${colors.text3};
                                            line-height: 28px;
                                            font-weight: 400;
                                            
                                        }
                                        span.icons {
                                            float: left;
                                            font-size: 14px;
                                            color: ${colors.text3};
                                            line-height: 28px;
                                            font-weight: 400;
                                            
                                        }
                                    }
                                }
                            }

                            .course-content.show {
                                max-height: 100%;
                                
                            }

                            &:last-child {
                               
                            }
                        }
                    }
                }

                .instructor-tab {                    
                    h5 {
                        color: ${colors.black2};
                        font-weight: 600;
                        padding-bottom: 10px;
                        margin-bottom: 35px;
                        position: relative;
                        &:before {
                            position: absolute;
                            content: "";
                            background: ${colors.green};
                            width: 50px;
                            height: 2px;
                            bottom: 0;
                            left: 0;
                        }

                        @media(max-width: 575px) {
                            font-size : 17px;
                        }
                    }

                    .instructor-box{
                        margin: 5px 35px;
                        .instructor-item {
                            margin-bottom: 30px;
                            .instructor-img {
                                img {
                                    border-radius : 5px;
                                }
                            }
    
                            .instructor-content {
    
                                position: relative;
    
                                .instructor-box {
                                    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.08);
                                    padding   : 25px;
                                    background: #ffffff;
                                    border-radius : 5px;
                                    //position: absolute;
                                    position: relative;
                                    top     : 60px;
                                    left    : -11%;
                                    z-index : 1;
    
                                    .top-content {
                                        margin-bottom: 20px;    
                                        .instructor-name {
                                            h6 {
                                                color      : ${colors.black2};
                                                font-weight: 600;
                                                text-transform: uppercase;
                                                margin-bottom: 12px;
    
                                                @media(max-width: 575px) {
                                                    font-size : 14px;
                                                }
                                            }
                                            p {
                                                font-size  : 14px;
                                                color      : ${colors.text3};
                                                font-weight: 500;
                                            }
                                        }
                                        .instructor-social {
                                            margin-top: 25px;
                                            ul.social {
                                                li {
                                                    a {
                                                        text-align: center;
                                                        position  : relative;
    
                                                        &:before {
                                                            content           : "";
                                                            position          : absolute;
                                                            border-width      : 8px 14px;
                                                            border-style      : solid;
                                                            border-top-color  : transparent;
                                                            border-right-color: transparent;
                                                            border-left-color : transparent;
                                                            top               : -16px;
                                                            left              : 0;
                                                            z-index           : 1;
                                                            transition : all 0.2s ease;
                                                        }
    
                                                        &:after {
                                                            content            : "";
                                                            position           : absolute;
                                                            border-width       : 8px 14px;
                                                            border-style       : solid;
                                                            border-right-color : transparent;
                                                            border-bottom-color: transparent;
                                                            border-left-color  : transparent;
                                                            bottom             : -16px;
                                                            left               : 0;
                                                            z-index            : 1;
                                                            transition : all 0.2s ease;
                                                        }
    
                                                        i {
                                                            font-size: 13px;
                                                            color    : #ffffff;
                                                            width    : 28px;
                                                        }
    
                                                        &:hover {
                                                            background-color: ${colors.green} !important;
    
                                                            &:before {
                                                                border-bottom-color: ${colors.green} !important;
                                                            }
    
                                                            &:after {
                                                                border-top-color: ${colors.green} !important;
                                                            }
                                                        }
                                                    }
    
                                                    &:nth-child(1) {
                                                        a {
                                                            background-color: #4267B2;
    
                                                            &:before {
                                                                border-bottom-color: #4267B2;
                                                            }
    
                                                            &:after {
                                                                border-top-color: #4267B2;
                                                            }
                                                        }
                                                    }
    
                                                    &:nth-child(2) {
                                                        a {
                                                            background-color: #1DA1F2;
    
                                                            &:before {
                                                                border-bottom-color: #1DA1F2;
                                                            }
    
                                                            &:after {
                                                                border-top-color: #1DA1F2;
                                                            }
                                                        }
                                                    }
    
                                                    &:nth-child(3) {
                                                        a {
                                                            background-color: #2867B2;
    
                                                            &:before {
                                                                border-bottom-color: #2867B2;
                                                            }
    
                                                            &:after {
                                                                border-top-color: #2867B2;
                                                            }
                                                        }
                                                    }
    
                                                    &:nth-child(4) {
                                                        a {
                                                            background-color: #DD1343;
    
                                                            &:before {
                                                                border-bottom-color: #DD1343;
                                                            }
    
                                                            &:after {
                                                                border-top-color: #DD1343;
                                                            }
                                                        }
                                                    }
    
                                                    &:nth-child(5) {
                                                        a {
                                                            background-color: #00AFF0;
    
                                                            &:before {
                                                                border-bottom-color: #00AFF0;
                                                            }
    
                                                            &:after {
                                                                border-top-color: #00AFF0;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
    
                                    .instructor-desk {
                                        p {
                                            font-size : 15px;
                                            color      : ${colors.text2};
                                            line-height: 25px;
    
                                            @media(max-width: 575px) {
                                                font-size : 14px;
                                            }
                                        }
                                    }
                                }
                            }
    
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }

                    }

                    
                }

                .review-tab {
                    .review-comments {
                        margin-bottom: 40px;
                        h5 {
                            color: ${colors.black2};
                            font-weight: 600;
                            padding-bottom: 10px;
                            margin-bottom: 35px;
                            position: relative;
                            &:before {
                                position: absolute;
                                content: "";
                                background: ${colors.green};
                                width: 50px;
                                height: 2px;
                                bottom: 0;
                                left: 0;
                            }

                            @media(max-width: 575px) {
                                font-size : 17px;
                            }
                        }
                        .comment-box {
                            border-bottom: 1px solid ${colors.border1};
                            padding-bottom: 20px;
                            margin-bottom: 25px;
                            .comment-image {
                                img {
                                    max-width : 100px;
                                    border-radius : 5px;
                                    margin-right : 20px;
                                }
                            }
                            .comment-content {
                                padding: 15px;
                                border-bottom-color: #166f6f;
                                border: 1px solid;  
                                border-color: blanchedalmond;
                                border-radius: 10px;
                                .content-title {
                                    .comment-writer {
                                        h6 {
                                            color: ${colors.black2};
                                            font-weight: 600;
                                            margin-bottom : 10px;

                                            @media(max-width: 575px) {
                                                font-size : 14px;
                                            }
                                        }
                                        p {
                                            font-size : 12px;
                                            color: ${colors.text3};
                                            margin-bottom: 5px;
                                        }
                                        ul {
                                            margin-bottom: 8px;
                                            li {
                                                margin-right: 1px;
                                                i {
                                                    font-size: 16px;
                                                    color: ${colors.yellow};
                                                }
                                                &:last-child {
                                                    font-size: 13px;
                                                    color: ${colors.text2};
                                                    margin-left: 5px;
                                                }
                                            }
                                        }
                                    }
                                    .reply-btn {
                                        button {
                                            font-size : 14px;
                                            color: ${colors.green};
                                            background : transparent;
                                            border : 1px solid ${colors.border3};
                                            font-weight: 500;
                                            border-radius: 25px;
                                            padding: 4px 12px 3px;
                                            margin-top : 10px;
                                            
                                            i {
                                                font-size: 17px;
                                                vertical-align: text-top;
                                            }
                                            &:hover {
                                                color : #ffffff;
                                                background : ${colors.gr_bg};
                                                border-color : ${colors.green};
                                            }
                                        }
                                    }
                                }
                                .comment-desc {
                                    p {
                                        font-size: 14px;
                                        color: ${colors.text3};
                                        line-height: 25px;
                                    }
                                }
                            }
                            &:last-child {
                                border-bottom : none;
                                padding-bottom : 0;
                                margin-bottom : 0;
                            }
                        }
                    }

                    .review-form {
                        h5 {
                            color: ${colors.black2};
                            font-weight: 600;
                            padding-bottom: 10px;
                            margin-bottom: 25px;
                            position: relative;
                            &:before {
                                position: absolute;
                                content: "";
                                background: ${colors.green};
                                width: 50px;
                                height: 2px;
                                bottom: 0;
                                left: 0;
                            }

                            @media(max-width: 575px) {
                                font-size : 17px;
                            }
                        }
                    }
                    
                    .review-hideform{
                        display: hidden;
                    }
                }

                .library-tab{
                    .container-fluid .row{
                        padding : 1.5rem;
                        .card {
                            width: 17rem;
                            height : 20rem;
                            
                            @media(max-width: 575px) {
                                 width: 15rem;
                            } 
                            @media(max-width: 820px) and (min-width: 576px) {
                                width: 20rem;
                            }
                            @media(max-width: 1240px) and (min-width: 821px) {
                                width: 20rem;
                            }  

                            border-radius: 5px;
                            &:hover {
                                box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
                            }
                        
                            .card-body {
                                padding: 3rem 0 !important;
                            }
                        
                            .card-text {
                                font-size: .9rem;
                                //padding: 0.4rem 1.9rem;
                            }
                        
                            .overflow {
                                overflow: hidden;
                            }
                            
                            .card-img-top {
                                transform: scale(1);
                                transition: transform 0.5s ease;
                                height : 230px;
                                border : 1px solid white;
                                border-radius: 5px;
                                box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;   
                            }
                            
                            .card-img-top:hover {
                                transform: scale(1.8);
                            }
                        }
                    }
                }
                
            }
        }



        

        @media(max-width: 767px) {
            padding: 20px 0 5px;
        }
    }


    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        border-bottom: 16px solid #3498db;
        width: 120px;
        height: 120px;
        margin-top: -200px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
      }
      
      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }


      
      .badge {
        position: absolute;
        top: -10px;
        right: 5px;
        border-radius: 100%;
        background: #ff00008c;
        color: black;
        height:auto;
        width:auto;
      }

      .noti-text {
        display: block;
        cursor: pointer;
        font: 11px normal 'Lato', Helvetica, Arial, sans-serif;
        width: 100%;
        padding: 5%;
        line-height: 30px;
        background-color: #E9EFF2;
        border-bottom: 1px solid #ddd;
        margin-top:5px;
        &.has-read {
          background-color: #fff;
        }
      }
   
  
`;