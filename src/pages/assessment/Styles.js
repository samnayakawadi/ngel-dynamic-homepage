import styled from "styled-components";
export const Styles = styled.div`


.container{
  width: 100%;
  margin: auto;
  overflow: hidden;
  height: 400px;
  overflow-y: auto;
}

.container ul{
  padding: 0px;
  margin: 0px;
}


.container ul li{
  float:left;
  list-style: none;
  width:50px;
  height:50px;
  padding: 15px 0px 0px 20px;
  background: white;
  margin :0px 0px 10px 40px; 
  border:1px solid black;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: larger;
  font-weight: 900;
}
.container ul li:hover{
  opacity: 0.8;
}

.container ul li .bottom{
  width: 100%;
  height:50px;
  line-height: 50px;
  background: blue;    
  text-align: center;
  color:white;
  font-size: 20px;
 
}

@media screen and (max-width:1250px){
  .container ul li{
      width:40%;
      margin-left: 40px;
       
  }
 
 .container{
  width: 100%;
  margin: auto;
  overflow: hidden;
  height: 250px;
  overflow-y: auto;
}

.container ul{
  padding: 0px;
  margin: 0px;
}


.container ul li{
  float:left;
  list-style: none;
  width:40px;
  height:40px;
  background: white;
  margin :0px 0px 10px 40px; 
  padding : 6px 0px 0px 10px;
  border:1px solid black;
  box-sizing: border-box;
  border-radius: 5px;
}
.container ul li:hover{
  opacity: 0.8;
}

.container ul li .bottom{
  width: 100%;
  height:50px;
  line-height: 50px;
  background: blue;    
  text-align: center;
  color:white;
  font-size: 20px;
 
}

@media screen and (max-width:1250px){
  .container ul li{
      width:40%;
      margin-left: 40px;
       
  }

input[type="radio"]:checked  + li {
  background-color: red;
}

  `;