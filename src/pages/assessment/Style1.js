import styled from "styled-components";
export const Style1 = styled.div`

.question{
    background: #75ba48;
    padding: 20px;
    color: #fff;
    border-bottom-right-radius: 55px;
    border-top-left-radius: 55px;
    font-weight: bold;
}

#qid{
    margin-right: 22px;
    background-color: #ffffff;
    color: #aaaaaa;
}
.container ul{
  list-style: none;
  margin: 0;
  padding: 0;
}


ul li{
  color: black;
  display: block;
  position: relative;
  float: left;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #111111;
}

ul li input[type=radio]{
  position: absolute;
  visibility: hidden;
}

ul li input[type=checkbox]{
  position: absolute;
  visibility: hidden;
}

ul li label{
  display: block;
  position: relative;
  font-weight: 300;
  font-size: 1.35em;
  padding: 25px 25px 25px 80px;
  margin: 10px auto;
  height: 30px;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
}



ul li .check{
  display: block;
  position: absolute;
  border: 5px solid #AAAAAA;
  border-radius: 100%;
  height: 30px;
  width: 30px;
  top: 30px;
  left: 20px;
    z-index: 5;
    transition: border .25s linear;
    -webkit-transition: border .25s linear;
}


ul li .check::before {
  display: block;
    position: absolute;
    content: '';
    border-radius: 100%;
    height: 14px;
    width: 14px;
    top: 3px;
    left: 3px;
  margin: auto;
    transition: background 0.25s linear;
    -webkit-transition: background 0.25s linear;
}

input[type=radio]:checked ~ .check {
  border: 5px solid #00FF00;
}

input[type=radio]:checked ~ .check::before{
  background: #00FF00;/*attr('data-background');*/
}

input[type=radio]:checked ~ label{
  color: #00FF00;
}

ul li .checker{
  display: block;
  position: absolute;
  border: 5px solid #AAAAAA;
  height: 30px;
  width: 30px;
  top: 30px;
  left: 20px;
    z-index: 5;
    transition: border .25s linear;
    -webkit-transition: border .25s linear;
}


ul li .checker::before {
  display: block;
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    top: 3px;
    left: 3px;
  margin: auto;
    transition: background 0.25s linear;
    -webkit-transition: background 0.25s linear;
}

input[type=checkbox]:checked ~ .checker {
  border: 5px solid #00FF00;
}

input[type=checkbox]:checked ~ .checker::before{
  background: #00FF00;/*attr('data-background');*/
}

input[type=checkbox]:checked ~ label{
  color: #00FF00;
}



  `;