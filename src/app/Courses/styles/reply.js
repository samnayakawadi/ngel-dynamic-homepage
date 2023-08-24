import styled from "styled-components";
import { colors } from "../../../components/common/element/elements.js";

export const Styles = styled.div`
    .campus-tour {
        background: ${colors.bg2};
        padding   : 63px 0 60px;

        .primary{
          color:orange;
        }

        .form-popup {
            display: none;
            position: fixed;
            bottom: 0;
            right: 15px;
            border: 3px solid #f1f1f1;
            z-index: 9;
          }

          .hidden{
            visibility: hidden;
          }

          .open-button {
            background-color: #555;
            color: white;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
            opacity: 0.8;
            position: fixed;
            bottom: 23px;
            right: 28px;
            width: 280px;
          }
          .form-container {
            max-width: 300px;
            padding: 10px;
            background-color: white;
          }
          .form-container input[type=text], .form-container input[type=password] {
            width: 100%;
            padding: 15px;
            margin: 5px 0 22px 0;
            border: none;
            background: #f1f1f1;
          }
          .form-container input[type=text]:focus, .form-container input[type=password]:focus {
            background-color: #ddd;
            outline: none;
          }
          .form-container .btn {
            background-color: #4CAF50;
            color: white;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
            width: 100%;
            margin-bottom:10px;
            opacity: 0.8;
          }
          .form-container .cancel {
            background-color: red;
          }
          .form-container .btn:hover, .open-button:hover {
            opacity: 1;
          }
          .center {
            margin: auto;
            width: 60%;
            padding: 20px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        
        .hideform {
            display: none;
        }

       
        @media(max-width: 767px) {
            padding: 30px 0 25px;
        }
    }
`;