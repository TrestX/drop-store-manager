import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Card, Row, Col } from 'react-bootstrap';
import { Tag } from 'primereact/tag';
import {useHistory} from 'react-router-dom';
import './ShopCard.css'

const TopCardComp = ({name,data}:{name:any,data:any}) => {
    const history = useHistory();
    return (
        <Card  style={{minWidth:"100%",marginBottom:"50px",minHeight:"467px",maxHeight:"467px",overflow:"auto"}}>
            <Card.Body style={{minWidth:"100%"}}>
                <h1 style={{marginLeft:"0px",fontSize:"21px",fontWeight:669,color:"black",marginBottom:"20px"}}>Top {name}</h1>
                
                    { data !== null && data.length>0 && data.map((item)=>{
                        return <>
                        <Row className="rowonhover" style={{padding:"8px 12px 10px 12px"}} onClick={()=>{history.push('/seller/'+item['user_id'])}}> 
                            <Col xs={5} >
                                <Row>
                                    <img width={49} height={49} src={item['profile_photo']} style={{borderRadius:"10px"}}/>
                                    <h1 style={{fontSize:"15.5px",fontWeight:469,margin:"10px 0px 0px 10px"}}>{item['name']}</h1><br/>
                                </Row>
                                    <h1 style={{fontSize:"11.5px",fontWeight:369,margin:"-20px 0px 0px 45px",color:"grey"}}>{item["email"]}</h1>
                            </Col>
                            <Col xs={7}>
                                <Tag style={{margin:"5px 5px 0px 5px",whiteSpace: "nowrap",float:"right",fontSize:"9px",textOverflow:"ellipsis",overflow:"hidden",width:"69px",maxWidth:"69px",textTransform:"capitalize"}} severity="warning" value={item.status}></Tag>
                                <Tag style={{margin:"5px 5px 0px 5px",whiteSpace: "nowrap",float:"right",fontSize:"9px",textOverflow:"ellipsis",overflow:"hidden",width:"69px",maxWidth:"69px"}} severity="success" value={item.phone_number}></Tag>
                                <Tag style={{margin:"5px 5px 0px 5px",whiteSpace: "nowrap",float:"right",fontSize:"9px",textOverflow:"ellipsis",overflow:"hidden",width:"69px",maxWidth:"69px"}} severity="info" value={2}></Tag>
                            </Col> 
                        </Row>
                        <hr/>
                        </>
                    })}

            </Card.Body>
        </Card>
    );
}
export default TopCardComp;