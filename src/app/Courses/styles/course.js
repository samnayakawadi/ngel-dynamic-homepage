import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .container-fluid .row{
        //padding : 1.5rem;
        .card {
            margin-top : 20px;
            width: 190px;
            height : 300px
            border-radius: 5px;
            &:hover {
                box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
            }
        
            .card-body {
                padding: 1rem 0 !important;
            }
        
            .card-text {
                font-size: .9rem;
                padding: 0.4rem 1.9rem;
            }
        
            .overflow {
                overflow: hidden;
            }
            
            .card-img-top {
                transform: scale(1);
                transition: transform 0.5s ease;
                height : 150px;
                border : 1px solid white;
                border-radius: 5px;
                box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;   
            }
            
            .card-img-top:hover {
                transform: scale(1.8);
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
    
}

`;