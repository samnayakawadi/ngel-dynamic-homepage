import React, { Component } from 'react';
import Datas from '../../data/404/error.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/pageNotFound.js';
import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import service from '../../services/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserService from '../../services/UserService';
import { colors } from "../../components/common/element/elements.js";
import learnerService from '../../services/learnerService';

function CertificateVerificatonpage(props) {

    const styleReciptTable = {
        background:"#f6f6f6", 
        padding:"10px",
        fontSize:"14px",
        fontWeight: 'bold'
    }
    const styleReciptTableEven = {
        background:"#ffffff", 
        padding:"10px",
        fontSize:"14px",
        fontWeight: 'bold'
    }

    useEffect(() => {
        UserService.generateToken();
       }, []);

    const { search } = useLocation();
    const parameters = new URLSearchParams(search);
    const certificateid = parameters.get('certificateid');
    const [getCertificateStatus, setCertificateStatus] = useState(false);
    const [getCertificateNo, setCertificateNo] = useState();
    const [getCertificateCreationDate, setCertificateCreationDate] = useState();
    const [getCertificateHashCode, setCertificateHashCode] = useState();
    const [sgtCertificateText, setCertificateText] = useState("");

        ////console.log(props);
        ////console.log(token);

        const [getCertificateLoading, setCertificateLoading] = useState({
            isLoading: false
        })


    useEffect(()=>{
        setCertificateLoading({ isLoading: true });
        learnerService.certificateVerification(certificateid)
        .then((res)=>{

            //console.log("Response "+ res.data.certificateId);

            if(res.data.certificateId !== undefined)
            {
                 setCertificateStatus(true);
                 setCertificateNo(res.data.certificateId);
                 setCertificateCreationDate(res.data.creationDate);
                 setCertificateHashCode(res.data.certificateHash);
                 setCertificateText("Valid Certificate");
                setCertificateLoading({ isLoading: false });
            }
            else if(res.data.certificateId === undefined){

                setCertificateText("Invalid Certificate");
                 setCertificateStatus(false);
                setCertificateLoading({ isLoading: false });
            }
            else{
                setCertificateText("Invalid Certificate");
                setCertificateStatus(false);
               setCertificateLoading({ isLoading: false });
            }
        })
        .catch((err)=>{
            //console.log(err);
             setCertificateLoading({ isLoading: false });
            
        })
    }, [certificateid])

        return (
            <div className="main-wrapper course-details-page" style={{background:"rgba(24, 43, 73, 1)"}}>
                <br></br>
            {/* Header 2 */}
            <div style={{background: "white"}}>
            < HeaderTwo />
            </div>
            <Styles>
                <section className="course-details-area">
                <Container >
                <div>
                <Card style={{borderRadius:"10px", padding:"20px", boxShadow:"3px 4px 3px 3px #0f1e36", marginBottom:"30px", marginTop:"40px"}}>
                    <div>
                    <div style={{textAlign:"center"}}>
                    {getCertificateStatus ? (<i class="fa fa-check fa-5x" aria-hidden="true" 
                    style={{color:"white", background: `${colors.gr_bg}`,borderRadius:"60px", padding:"25px", margin:"20px",boxShadow:"1px 2px 1px #808080"}}></i>
                    )
                    : 
                    (<i class="fa fa-times fa-5x" aria-hidden="true" 
                    style={{color:"white", background: "#8a0000" ,borderRadius:"90px", padding:"20px",paddingTop:"14px", paddingBottom:"14px", margin:"20px",boxShadow:"1px 2px 1px #808080"}}></i>
                    )}
                    </div>
                    <div style={{textAlign:"center", paddingTop:"20px"}}  id="divToPrint">
                    <div>
                    <h4 style={getCertificateStatus? {color:"green",fontWeight: 'bold'}:{color:"black",fontWeight: 'bold'}}>Certificate Information</h4>
                    </div>
                    <div style={{display: 'inline-block', textAlign:"left", width:"80%"}}>
                        <div style={{margin:"40px"}}>
                        
                        {getCertificateStatus && <Row >
                            <Col sm={6} style={styleReciptTable}>Certificate Number :</Col>
                            <Col sm={6} style={styleReciptTable}>{getCertificateNo}</Col>
                        </Row>}
                        <Row >
                            <Col sm={6} style={getCertificateStatus? styleReciptTableEven: styleReciptTable}>Certificate Status :</Col>
                            <Col sm={6} style={getCertificateStatus? styleReciptTableEven : styleReciptTable}>{sgtCertificateText}</Col>
                        </Row>
                        {getCertificateStatus &&<Row >
                            <Col sm={6} style={styleReciptTable}>Certificate Creation Date :</Col>
                            <Col sm={6} style={styleReciptTable}>{getCertificateCreationDate}</Col>
                        </Row>}
                        {getCertificateStatus &&<Row>
                            <Col sm={6} style={styleReciptTableEven}>Certificate HashCode :</Col>
                            <Col sm={6} style={styleReciptTableEven}>{getCertificateHashCode}</Col>
                        </Row>}
                       
                        </div>
                        
                    </div>
                    </div>
                    </div>
                    {/* <div style={{textAlign:"center"}}>
                    <button onClick={printDocument} style={{color:"white", background: `${colors.gr_bg}`, padding:"10px", margin:"5px",borderRadius:"5px", border:"0px"}}>Download</button>
                    <button onClick={() =>{redirectToCourse(courseId, tenantId)}} style={{color:"white", background:"#808080", padding:"10px", margin:"5px",borderRadius:"5px", border:"0px"}}>Cancel</button>
                    </div> */}
                
                </Card>
                </div>
                 </Container>
                 </section>        
         </Styles>
         <br></br>
     </div>
        )
    
}

export default CertificateVerificatonpage