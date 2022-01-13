import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Card, Row, Col } from 'react-bootstrap';
import LineCharts from './Charts';
import { Divider } from 'primereact/divider';
import './DCardHover.css';
const CardComp = ({ iconName, name, data,redirect }: { iconName: any, name: any, data: any,redirect: any }) => {

    return (

            <Card className="dcardhover p-shadow-5" onClick={()=>{window.location.href=`/${redirect}`}}>
                <Card.Body >
                    <Row style={{ padding: "10px 7px 0px 12px" }}>
                        <Col md={9}>
                        <h1 style={{ fontSize: "16.5px", fontWeight: 469,paddingTop:'5px',textAlign:'left' }}>{data}</h1>

                        
                        </Col>
                        <Col md={3}>
                        <i className={"pi " + iconName} style={{ color: "#fe385c",fontSize:"25px",float:"right" }} />
                        </Col>

                    </Row>
<Row style={{ padding: "5px 7px 0px 12px" }}>

<h1 style={{  fontSize: "10px", fontWeight: 669, color: "grey" }}>{name}</h1>
</Row>
                </Card.Body>
            </Card>

    );
}
export default CardComp;