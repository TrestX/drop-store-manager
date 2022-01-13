import React, { useState } from 'react';
import { Button, Card, Form, Image, InputGroup, Modal, ModalBody, Nav, Row,Alert,Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
const SignIn = () => {
    const [reqEmail, setReqEmail] = useState(false)
    const [done, setDone] = useState(false)
    const [color, setColor] = useState('')
    const [msg, setMsg] = useState('')
    const history = useHistory();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value
        let user = {
            "email": email,
            "password": password
        }
        var config: any = {
            method: 'post',
            url: 'https://api.drop-deliveryapp.com/docker1/user/login',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: user
        }
        axios(config)
            .then((response) => {
                if (response.data.token) {
                    sessionStorage.setItem("token", response.data["token"])
                    sessionStorage.setItem("role","Admin")
                    window.location.href = '/dashboard'
                }
                
            })
            .catch((error) => {
                var config: any = {
                    method: 'post',
                    url: 'https://api.drop-deliveryapp.com/docker2/admin/acct/login',
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    data: user
                }
                    axios(config)
                        .then((response) => {
                            if (response.data.token) {
                                sessionStorage.setItem("token", response.data["token"])
                                var decoded:any = jwt_decode(response.data["token"]);
                                sessionStorage.setItem("role",decoded['role'])
                                window.location.href = '/dashboard'
                            }
                            
                        })
                        .catch((error) => {
                            setColor("danger")
                            setDone(true)
                            setMsg("invalid credentials")
                            setTimeout(() => {setDone(false)}, 1500);
                        })
            })

    }

    const checkEmail = (e: any) => {
        e.preventDefault();
        setReqEmail(false);
        let email = e.target.value;
        var re = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(!re.test(email)) {
            setReqEmail(true);
            return
        }
    }
      
    return (
        <>

            {sessionStorage.getItem("token") === null || sessionStorage.getItem("token") === "" ?
                <Row style={{marginTop:"79px",textAlign:"center"}}>
                    <Col xs={4}></Col>
                    <Col xs={4}>
                    <Card style={{ maxWidth: "28.125rem", marginTop: "30px", marginBottom: "30px" }}>
                        <Card.Body>
                        {done && <Alert variant={color} onClose={() => setDone(false)} dismissible>
        <Alert.Heading>{msg}</Alert.Heading>
      </Alert>}
                            <h3 style={{ fontWeight: 740,fontSize:"32px",margin:"5px 15px 15px 5px" }}>
                                Seller Login
                            </h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Control type="email" name="email" placeholder="username" style={{ marginTop: "30px", backgroundColor: "#F6F6F6", borderRadius: "25px" }} onChange={(e) => checkEmail(e)}/>
                                {reqEmail &&   
                    <Alert variant="danger" style={{paddingTop:"7px",paddingBottom:"7px",borderRadius: "5px"}}>
                        invalid email id
                    </Alert>
                }
                                <Form.Control type="password" name="password" placeholder="password" style={{ marginTop: "15px", backgroundColor: "#F6F6F6", borderRadius: "25px" }} />
                                <InputGroup style={{ marginTop: "15px" }}>

                                    <Nav.Link style={{ padding: "0px", marginLeft: "auto",fontSize:"15px",color:"#fe385c" }} href="/register">register a new seller?</Nav.Link>
                                </InputGroup>
                                <Button style={{ fontSize: "18x", marginTop: "25px", borderRadius: "25px", width: "100%", padding: "0.5rem 1.25rem",backgroundColor:"#fe385c",borderColor:"transparent" }} type="submit">
                                    Login
                                </Button>
                                
                            </Form>
 
                    </Card.Body>
                    </Card >
                    </Col>
                    <Col xs={4}></Col>
                </Row> : <div style={{ height: "500px" }}></div>
            }
        </>
    );
}

export default SignIn;