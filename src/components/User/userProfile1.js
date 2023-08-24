import React, { useEffect, useState } from 'react';
import service from '../../services/service';
import Header from '../Header';
import { Styles } from '../../pages/account/styles/account';
import { BreadcrumbBox } from '../common/Breadcrumb';
import { Button, Card, Form, Container, Row, Col, } from "react-bootstrap";
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated'

const UserProfile = (props) => {

    useEffect(() => {
        UserService.generateToken();
       }, []);


    const [getUserDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        instituteName: '',
        eduQualification: '',
        address: '',
        city: '',
        pincode: '',
        countryId: '',
        stateId: '',
        districtId: "",
        updateBy: props.match.params.updateBy,
        learnerUsername: props.match.params.learnerUsername,

    })

    let id = props.match.params.id;
    useEffect(() => {
        service.getUserById(id)
            .then(res => {
                ////console.log(res);
                setUserDetails(res.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    // const [headerState, setHeaderState] = useState({
    //     id: props.match.params.id,
    //     img: um_api +"getprofilepic/"
    // });


    const [getCountry, setCountry] = useState([]);
    useEffect(() => {
        service.getCountry()
            .then(res => {
                ////console.log(res);
                setCountry(res.data);

            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    const [getStates, setStates] = useState([]);
    useEffect(() => {
        service.getState()
            .then(res => {
                ////console.log(res);
                setStates(res.data);

            })
            .catch(err => {
                //console.log(err);
            })
    }, [])


    const [getdistrict, setdistrict] = useState([]);
    const getDistricts = (stateId) => {
        service.getDistrict(stateId)
            .then(res => {
                ////console.log(res);
                setdistrict(res.data);

            })
            .catch(err => {
                //console.log(err);
            })
    }

    const [getState, setState] = useState([]);
    const handleSelectChange = (event) => {
        ////console.log('event', event);
        setState({
            result: event.target.value
        })

        getUserDetails.stateMaster.stateId = event.target.value
        
        setUserDetails({ ...getUserDetails, stateMaster:  getUserDetails.stateMaster })
        getDistricts(event.target.value);
        ////console.log('RESULT :::  ', event.target.value)
    }

    const [getDistrict, setDistricts] = useState([]);
    const handleDistrict = (event) => {
        getUserDetails.districtMaster.districtId = event.target.value
        setDistricts({
            result: event.target.value
        })
        ////console.log('val => ', event.target.value)
        setUserDetails({ ...getUserDetails, districtMaster: getUserDetails.districtMaster })
    }

    const [getcountry, setcountry] = useState([]);
    const handle = (event) => {
        setcountry({
            result: event.target.value
        })
        ////console.log('country => ', event.target.value)
        setUserDetails({ ...getUserDetails, countryId: event.target.value })
    }

    const update = (e) => {
        let update = {
            email: getUserDetails.email, firstName: getUserDetails.firstName, lastName: getUserDetails.lastName, mobile: getUserDetails.mobile, gender: getUserDetails.gender, dob: getUserDetails.dob,
            instituteName: getUserDetails.instituteName, eduQualification: getUserDetails.eduQualification, address: getUserDetails.address, city: getUserDetails.city, pincode: getUserDetails.pincode,
            countryId: getUserDetails.countryMaster.countryId+"", stateId: getUserDetails.stateMaster.stateId+"", districtId: getUserDetails.districtMaster.districtId+"", updateBy: getUserDetails.learnerUsername, learnerUsername: getUserDetails.learnerUsername,
            
        };
        ////console.log('update User =>',update)
        service.updateUser(getUserDetails).then(response => {
            ////console.log("res =>", response);
        });
    }

    useEffect(() => {
        ////console.log('getUserDetails : ', getUserDetails)
    }, [getUserDetails])

    return (

        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">
                {/* Header */}
                <Header />
                {/* Breadcroumb */}
                <BreadcrumbBox title="Update Profile" />

                <Container fluid style={{ marginTop: 40 }}>

                    <Row>
                        <Col md="2"></Col>
                        <Col md="8">
                            <RenderOnAuthenticated>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Edit Profile</Card.Title>
                                    </Card.Header>
                                    <Card.Body>

                                        <Form>
                                            <Row>
                                                <Col className="pr-1" md="4">
                                                    <Form.Group>
                                                        <label>Email</label>
                                                        <Form.Control name="email"
                                                            defaultValue={getUserDetails.email}
                                                            onChange={onchange}
                                                            disabled placeholder="Email"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                    <Form.Group>
                                                        <label>First Name</label>
                                                        <Form.Control name="firstName" defaultValue={getUserDetails.firstName} onChange={e => setUserDetails({ ...getUserDetails, firstName: e.target.value })} placeholder="First Name" type="text" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label>Last Name</label>
                                                        <Form.Control name="lastName" defaultValue={getUserDetails.lastName} onChange={e => setUserDetails({ ...getUserDetails, lastName: e.target.value })} placeholder="Last Name" type="text"    ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="4">
                                                    <Form.Group>
                                                        <label>Gender </label>
                                                        <Form.Control name="gender" defaultValue={getUserDetails.gender} onChange={e => setUserDetails({ ...getUserDetails, gender: e.target.value })} placeholder="Gender" type="text" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                    <Form.Group>
                                                        <label>Date of Birth</label>
                                                        <Form.Control name="dob" defaultValue={getUserDetails.dob} placeholder="Date of Birth" onChange={e => setUserDetails({ ...getUserDetails, dob: e.target.value })} type="date" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label>Mobile</label>
                                                        <Form.Control name="mobile" defaultValue={getUserDetails.mobile} onChange={e => setUserDetails({ ...getUserDetails, mobile: e.target.value })} placeholder="Mobile number" type="number" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <Form.Group>
                                                        <label>Qualification</label>
                                                        <Form.Control defaultValue={getUserDetails.eduQualification} onChange={e => setUserDetails({ ...getUserDetails, eduQualification: e.target.value })} placeholder="Qualification" type="text" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group>
                                                        <label>Institute Name</label>
                                                        <Form.Control defaultValue={getUserDetails.instituteName} onChange={e => setUserDetails({ ...getUserDetails, instituteName: e.target.value })} placeholder="Institute Name" type="text" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="4">
                                                    <Form.Group>
                                                        <label>Address</label>
                                                        <Form.Control defaultValue={getUserDetails.address} onChange={e => setUserDetails({ ...getUserDetails, address: e.target.value })} placeholder="City" type="text" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                    <Form.Group>
                                                        <label>City</label>
                                                        <Form.Control defaultValue={getUserDetails.city} onChange={e => setUserDetails({ ...getUserDetails, city: e.target.value })} placeholder="Country" type="text" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label>Postal Code</label>
                                                        <Form.Control defaultValue={getUserDetails.pincode} onChange={e => setUserDetails({ ...getUserDetails, pincode: e.target.value })} placeholder="ZIP Code" type="number" ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="4">
                                                    <Form.Group>
                                                        <label>Country</label>
                                                        <Form.Control onChange={handle} as="select" placeholder="Country" >
                                                            <option value={getUserDetails.countryMaster ? getUserDetails.countryMaster.countryId ? getUserDetails.countryMaster.countryId : null : null}>{getUserDetails.countryMaster ? getUserDetails.countryMaster.countryName ? getUserDetails.countryMaster.countryName : null : null}</option>
                                                            {getCountry.map((country, index) => {
                                                                return (
                                                                    <option name="countryId" onChange={e => setUserDetails({ ...getUserDetails, countryId: e.target.value })} value={country.countryId}>{country.countryName}</option>
                                                                );
                                                            })}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                    <Form.Group>
                                                        <label>State</label>
                                                        <Form.Control onChange={handleSelectChange} as="select" placeholder="State" >
                                                            <option value={getUserDetails.stateMaster ? getUserDetails.stateMaster.stateId ? getUserDetails.stateMaster.stateId : null : null}>{getUserDetails.stateMaster ? getUserDetails.stateMaster.stateName ? getUserDetails.stateMaster.stateName : null : null}</option>
                                                            {getStates.map((states, index) => {
                                                                return (
                                                                    <option name="stateId" onChange={e => setUserDetails({ ...getUserDetails, stateId: e.target.value })} value={states.stateId}>{states.stateName}</option>
                                                                );
                                                            })}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="4" >
                                                    <Form.Group >
                                                        <label>District</label>
                                                        <Form.Control onChange={handleDistrict} as="select" placeholder="District" >
                                                            {/* <option>{getUserDetails.districtMaster ? getUserDetails.districtMaster.districtName ? getUserDetails.districtMaster.districtName : null : null}</option> */}
                                                            <option>Select Your District....</option>
                                                            {getdistrict.map((district, index) => {
                                                                return (

                                                                    <option name="districtId" onChange={e => setUserDetails({ ...getUserDetails, districtId: e.target.value })} value={district.districtId} >{district.districtName}</option>
                                                                );
                                                            })

                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{ display: 'none' }}>
                                                <Col className="pr-1" md="4">
                                                    <Form.Group>
                                                        <label>Details Updated By:</label>
                                                        <Form.Control disabled value={getUserDetails.learnerUsername} placeholder="Details Updated By" >
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                    <Form.Group>
                                                        <label>LearnerUserName:</label>
                                                        <Form.Control disabled value={getUserDetails.learnerUsername} placeholder="Details Updated By" >
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button className="btn-fill pull-right" onClick={update} variant="info"> Update Profile</Button>
                                            <div className="clearfix"></div>
                                        </Form>

                                    </Card.Body>
                                </Card>
                            </RenderOnAuthenticated>
                        </Col>
                        {/* <Col md="4">
                        <Card className="card-user">
                            <Card.Body>
                                <div className="author text-center">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar border-gray" style={{ width: 150, height: 150, backgroundColor: "white", borderRadius: 150 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }}
                                            src={`${headerState.img}${headerState.id}`}
                                        ></img>
                                        <h5 className="title">{getProfileState.firstName} {getProfileState.lastName}</h5>
                                    </a>
                                    <p className="description text-left" >Email: {getProfileState.email}</p>
                                    {/* <p className="description text-left">Address :{getProfileState.address}, {getProfileState.city}, {getProfileState.pincode}, {getProfileState.districtMaster ? getProfileState.districtMaster.districtName ? getProfileState.districtMaster.districtName : null : null}, {getProfileState.stateMaster ? getProfileState.stateMaster.stateName ? getProfileState.stateMaster.stateName : null : null}, {getProfileState.countryMaster ? getProfileState.countryMaster.countryName ? getProfileState.countryMaster.countryName : null : null}</p> */}
                        {/* <p className="description text-left" >Mobile: +91{getProfileState.mobile}</p>
                                    <p className="description text-left" >Date of Birth: {getProfileState.dob}</p> */}
                        {/* </div> */}
                        {/* </Card.Body> */}
                        {/* <hr style={{backgroundColor:"black"}}></hr>
                            <div  className="button-container mr-auto ml-auto"> */}

                        {/* </div> */}
                        {/* </Card> */}
                        {/* </Col> */}
                    </Row>
                </Container>
            </div>
        </Styles>

    );

}

export default UserProfile;