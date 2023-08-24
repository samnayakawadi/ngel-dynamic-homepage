import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { Styles } from '../styles/reply';
import { useHistory } from 'react-router-dom';
//import Ratingservice from '../components/RatingService.js'
import { getDefaultNormalizer } from '@testing-library/react';
import service from '../../../services/service';
import UpdateReplyform from './UpdateReplyform';
import CourseDetails from '../../courses/CourseDetails';
import UserService from '../../../services/UserService';



function ReplyForm({rrId},props) {

  useEffect(() => {
    UserService.generateToken();
   }, []);

////console.log("replykey:::"+replyKey);
  

  const [getReplytext,setreplytext]= useState(0);
  const [getModalState, setModalState] = useState({
    show: false
})

const handleModal2 = () => {

  //alert("check for reply close");
  setModalState({ show: false })
}

  const state = {
    repliedBy:'Gauthami',
    replyText:'',
    reviewId:'',
    replyError:'',
    

  }
  

  const[getreply,setReply]=useState(state);


 
  const styleObj={
    color: "#ffa500"
  }

  let replirid= JSON.stringify(rrId);

  // //console.log("replyrid::::"+replirid);

  const validate=()=>{

    
    let replyError='';
   
   

    if(!getreply.replyText){
      
      replyError="Reply cannot be blank";
    }
   
   
    if (replyError ) {
      setReply({ ...getreply, replyError});
      return false;
  }

   

    return  true;
  }

 


  const getreplyText=(e)=>{
    const isvalid=validate();
     

     if(isvalid){
      //alert("reply reviewId:::"+{rrId});
    
      let reply={repliedBy:getreply.repliedBy,replyText:getreply.replyText,reviewId:rrId.rrId}
      // //console.log("replyText1111 =>" + JSON.stringify(getreply.replyText))
      // //console.log("replytext2222:::"+getreply.replyText);

     
      if(getreply.replyText===""){
        // //console.log("reply is balnk");

      }
      service.createreply(reply).then(response => {
        // //console.log('res =>'+response);
        setReply(response.data)
       
      })

    }
    
  }


  


  // //console.log("Reply form");

  



  return (
    <div>
      <h5 style={styleObj}>Submit Reply</h5>
     <p>
        <textarea name="replyText" id="desc7" onChange={e => setReply({ ...getreply, replyText: e.target.value })}  placeholder="Enter your review"></textarea>
        <span className="input-msg6"></span>
      </p>
      <div>
              <p style ={{fontSize:12,color:"red"}}>
                {getreply.replyError}
                </p> 
                </div>
      <Button variant="primary" onClick={()=>getreplyText(getreply.replyText)} centered show={getModalState.show} onHide={() => handleModal2()}>
                            Submit
                </Button>

         
    </div>
    


  )
}

export default ReplyForm