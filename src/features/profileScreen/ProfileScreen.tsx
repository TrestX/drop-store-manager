import { Container,Row,Col } from 'react-bootstrap';
import React, { useState,useRef,useEffect } from 'react';
import { Card } from 'primereact/card';
import SellerFormLayout from '../registerNewSeller/AddSellerPerson';
import axios from 'axios';
import jwt_decode from "jwt-decode";
const ProfileScreen = () => {
    const [data,setData] = useState(null);
    const [tempS,setTempS] = useState(false);
    useEffect(() => {
        setTempS(false);
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        var decoded:any = jwt_decode(token!);
        axios({
            method: 'get',
            url: `https://api.drop-deliveryapp.com/docker1/user/list/${decoded['userid']},`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
    
            },
        }).then((response) => {
            if (response.data) {
                if (response.data.data){
                    setData(response.data.data[0])
                }
                console.log(response.data.data[0])
            }
            setTempS(true);
            
        });
    }, []);

    return (        
        <>
    {data != null ?<Container fluid style={{marginTop:"80px"}}>
            <Row style={{marginBottom:"10px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div style={{maxWidth:"60vw",display:"block",marginLeft:"auto",marginRight:"auto",border:"none"}}>
                        <SellerFormLayout data={data} seModal={null}/>
                    </div>                 
                </Col>
            </Row>
        </Container>:null}
        </>
    );
}
export default ProfileScreen;