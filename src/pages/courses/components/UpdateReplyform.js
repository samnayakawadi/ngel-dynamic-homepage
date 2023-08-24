import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { Styles } from '../styles/reply';
import { useHistory } from 'react-router-dom';
//import Ratingservice from '../components/RatingService.js'
import { getDefaultNormalizer } from '@testing-library/react';
import service from '../../../services/service';
import UserService from '../../../services/UserService';


function UpdateReplyForm(rrId, replydata) {

  useEffect(() => {
    UserService.generateToken();
   }, []);

  const [getModalState, setModalState] = useState({
    show: false
  })

  const handleModal2 = () => {

    //alert("check for reply close");
    setModalState({ show: false })
  }

  const state = {
    repliedBy: 'Gauthami',
    replyText: '',
    reviewId: '',
    replyError: '',

  }

  const [getreply, setReply] = useState(state);
  const styleObj = {
    color: "#ffa500"
  }

  let replirid = JSON.stringify(rrId);
  const validate = () => {
    let replyError = '';
    if (!getreply.rating) {
      replyError = "Reply cannot be blank";
    }

    if (replyError) {
      setReply({ ...getreply, replyError });
      return false;
    }

    return true;
  }

  const updatereply = (e) => {
    const isvalid = validate();
    if (isvalid) {
      //alert("reply reviewId:::"+{rrId});

      let reply = { repliedBy: getreply.repliedBy, replyText: getreply.replyText, reviewId: rrId.rrId }
      ////console.log("replyText =>" + JSON.stringify(reply))
      if (getreply.replyText === "") {
        ////console.log("reply is balnk");

      }
      service.createreply(reply).then(response => {
        ////console.log('res =>' + response);
      })

    }

  }

  return (
    <div>
      <h5 style={styleObj}>Submit Reply</h5>
      <p>
        <textarea name="replyText" id="desc7" default={replydata} onChange={e => setReply({ ...getreply, replyText: e.target.value })} placeholder="Enter your review"></textarea>
        <span className="input-msg6"></span>
      </p>
      <div>
        <p style={{ fontSize: 12, color: "red" }}>
          {getreply.replyError}
        </p>
      </div>
      <Button variant="primary" onClick={updatereply} centered show={getModalState.show} onHide={() => handleModal2()}>
        Submit
      </Button>
    </div>

  )
}

export default UpdateReplyForm