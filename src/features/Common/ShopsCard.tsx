import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Card, Row, Col } from 'react-bootstrap';
import { Tag } from 'primereact/tag';
import {useHistory} from 'react-router-dom';
import './ShopCard.css'
const ShopCardComp = ({name,data}:{name:any,data:any}) => {
    const history = useHistory();
    return (
            <Card.Body style={{minWidth:"100%",marginBottom:"50px",minHeight:"467px",maxHeight:"467px",overflow:"auto"}}>
                <h1 style={{marginLeft:"0px",fontSize:"21px",fontWeight:669,color:"black",marginBottom:"20px"}}>{name}</h1>
                
                    { data !== null && data.length>0 && data.map((item)=>{
                        return <>
                        <Row style={{padding:"7px 12px 7px 12px"}} className="rowonhover" onClick={()=>{history.push('/shop/'+item['seller_id'])}}>
                            <Col xs={5} >
                                <Row>
                                    <img width={49} height={49} src={item['shop_logo']} style={{borderRadius:"10px"}}/>
                                    <h1 style={{fontSize:"15.5px",fontWeight:469,margin:"10px 0px 0px 10px"}}>{item['shop_name']}</h1><br/>
                                </Row>
                                    <h1 style={{fontSize:"11.5px",fontWeight:369,margin:"-20px 0px 0px 45px",color:"grey"}}>{item["sellerEmail"]}</h1>
                            </Col>
                            <Col xs={7}>
                                <Tag style={{margin:"5px 5px 0px 5px",whiteSpace: "nowrap",float:"right",fontSize:"9px",textOverflow:"ellipsis",overflow:"hidden",width:"69px",maxWidth:"69px",textTransform:"capitalize"}} severity="warning" value={item.shop_status}></Tag>
                                <Tag style={{margin:"5px 5px 0px 5px",whiteSpace: "nowrap",float:"right",fontSize:"9px",textOverflow:"ellipsis",overflow:"hidden",width:"69px",maxWidth:"69px"}} severity="success" value={item.type}></Tag>
                                <Tag style={{margin:"5px 5px 0px 5px",whiteSpace: "nowrap",float:"right",fontSize:"9px",textOverflow:"ellipsis",overflow:"hidden",width:"103px",maxWidth:"103px"}} severity="info" value={`${item.timing.split("-")[0].substring(0,5)} am - ${item.timing.split('-')[1].substring(0,5)} pm`}></Tag>
                            </Col> 
                        </Row>
                        <hr/>
                        </>
                    })}

            </Card.Body>
    );
}
export default ShopCardComp;