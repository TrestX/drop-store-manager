import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card, Row, Col,Modal,ModalBody } from 'react-bootstrap';
import GMapComp from '../UsersScreen/GMaps';
import { ProgressBar } from 'primereact/progressbar';
const AcceptedCardComp = ({ item,handleSubmit }: { item: any,handleSubmit:any}) => {
    const [showMap,setShowMap] = useState(false)
    return (
<>
<Row style={{marginTop:"20px"}}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card >
                    <Card.Body>
                        <Row>
                            <Col xs={12} md={4} style={{padding:"20px"}}>
                            <img src={item['shopDetails']['shop_logo']} width={100} style={{borderRadius:"10px",objectFit:"contain"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item['shopDetails']['shop_logo']} className="product-image" />
                            <h1 style={{fontSize:"12px",fontWeight:660,marginTop:"10px",marginLeft:"7px"}}>{item['shopDetails']['shop_name']} - <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{item['shopDetails']['type']}</span></h1>
                            <h1 style={{fontSize:"12px",fontWeight:660,marginTop:"10px",marginLeft:"7px"}}>Start Timings: <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{item['shopDetails']['timing'].split("-")[0].substring(0,5)} am </span></h1>
                            <h1 style={{fontSize:"12px",fontWeight:660,marginTop:"10px",marginLeft:"7px"}}>End Timings: <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{item['shopDetails']['timing'].split("-")[1].substring(0,5)} pm</span></h1>
                            <h1 style={{fontSize:"12px",fontWeight:660,marginTop:"10px",marginLeft:"7px"}}>Address: <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{item['shopDetails'].address}, {item['shopDetails'].city}, {item['shopDetails'].state}, {item['shopDetails'].country} {item['shopDetails'].pin}  <i className="pi pi-map-marker" style={{color:"#1e5aff",fontSize:"14px",marginTop:"10px"}} onClick={()=>setShowMap(true)}></i></span></h1>
                            <hr/>
                            <Row>
                                <Col xs={12}>
                                    <h1 style={{fontSize:"15px",fontWeight:655,color:"black",marginLeft:"7px"}}>ID: <span style={{fontWeight:400,color:"grey"}}>{item["order_Id"].substring(0,10)+item["order_Id"].substring(item["order_Id"].length-4,item["order_Id"].length)} </span><i className="pi pi-print" style={{color:"#1e5aff",fontSize:"14px",marginRight:"20px",float:"right"}}></i></h1>
                                    <h1 style={{fontSize:"12px",fontWeight:655,color:"black",marginLeft:"7px"}}>Order description: <span style={{fontWeight:400,fontSize:"11px",color:"grey"}}>{item['orderDescription']}</span></h1>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs={12}>
                                <h1 style={{fontSize:"12px",fontWeight:660,marginLeft:"7px"}}>Customer name: <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{item['deliveryDetails']['name']}</span><i className="pi pi-phone" style={{color:"#1e5aff",fontSize:"14px",marginRight:"20px",float:"right"}}></i></h1>
                                </Col>
                            </Row>
                            
                            <hr/>
                            <Row>
                                <Col xs={12} md={6}>
                                    <i className="pi pi-check-circle" style={{color:"green",fontSize:"14px",marginTop:"10px"}}><span style={{fontSize:"11px",color:'green',margin:"-15px 0px 0px 5px",fontWeight:888,fontFamily:"sans-serif"}}>Placed</span></i>
                                    <div style={{height:"21px",borderLeft:"2px solid green",marginLeft:"5px"}}></div>
                                    <i className="pi pi-check-circle" style={{color:"green",fontSize:"14px",marginTop:"10px"}}><span style={{fontSize:"11px",color:'green',margin:"-15px 0px 0px 5px",fontWeight:888,fontFamily:"sans-serif"}}>Accepted</span></i> 
                                </Col>
                                <Col xs={12} md={6} style={{textAlign:"right"}}>
                                    <h1 style={{fontSize:"10px",marginTop:"10px",color:"grey"}}>{item['orderedAt'].split("T")[0]} {item['orderedAt'].split("T")[1].substring(0,8)}</h1>
                                    <div style={{height:"21px",marginLeft:"5px"}}></div>
                                    <h1 style={{fontSize:"10px",marginTop:"10px",color:"grey"}}>{item['accepted_at'].split("T")[0]} {item['accepted_at'].split("T")[1].substring(0,8)}</h1>
                                </Col>
                            </Row>
                            </Col>
                            <Col xs={12} md={4} style={{padding:"40px"}}>{console.log(item)}
                                {item['itemsOrdered'] && item['itemsOrdered'].length>0 && item['itemsOrdered'].map((item)=>{
                                    return <Row>
                                        <Col>
                                        <h1 style={{fontSize:"13px",fontWeight:555,color:"black",marginLeft:"11px"}}>
                                            <span style={{marginRight:"14px"}}>
                                                { item.type === 'Non-Veg' && <img src="https://www.pngkey.com/png/detail/245-2459071_non-veg-icon-non-veg-symbol-png.png" style={{width:"13px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" />} 
                                                { item.type === 'Veg' && <img src="https://tpng.net/download/0x0_261-2619381_veg-icon-png.png" style={{width:"13px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  className="product-image" />}
                                            </span> 
                                            <span style={{fontSize:"12px"}}>{item['name']} X {item['quantity']} </span>
                                            <span style={{float:"right"}}>
                                            {item['price']}
                                        </span> 
                                        </h1>
                                        </Col>
                                    </Row>
                                })}
                                <hr/>
                                <Row>
                                    <Col xs={4}>
                                        <h1 style={{fontSize:"12px",fontWeight:555,color:"black"}}>Total Bill </h1>
                                    </Col>
                                    <Col xs={8}>
                                        <h1 style={{fontSize:"13px",fontWeight:555,color:"black",float:"right",textTransform:"capitalize"}}>{item['paymentCurrency']} {item['paymentAmount']}</h1>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                {/*(item['orderStatus'] ==='Ordered' || item['orderStatus'] ==='Placed' || item['orderStatus'] ==='Accepted') &&
                                <Button style={{width:"100%",textAlign:"center",display:"block",margin:"0px auto 0px auto",border:"none",backgroundColor:"#1e5aff"}} onClick={()=>{handleSubmit(item["order_Id"],"Ready")}}>Order ready</Button>*/}
                                {item['orderStatus']==='Delivered' && <img src="https://img.icons8.com/color/96/000000/checked-truck.png" style={{width:"100px",marginRight:"auto",marginLeft:'auto',display:"block",marginTop:"17px"}}/>}
                                </Row>
                            </Col>
                            <Col xs={12} md={4} style={{padding:"20px"}}>
                                <Card>
                                    <Card.Body>
                                        <h1 style={{fontSize:"12px",fontWeight:777,color:"grey"}}>Delivery details</h1>
                                        <hr/>
                                        <h1 style={{fontSize:"12px",fontWeight:777}}>Customer name</h1>
                                        <h1 style={{fontSize:"11px",fontWeight:577,color:"grey"}}>{item['deliveryDetails']['name']}</h1>
                                        <h1 style={{fontSize:"12px",fontWeight:777}}>Customer address</h1>
                                        <h1 style={{fontSize:"11px",fontWeight:577,color:"grey"}}>{item['deliveryDetails']['address']['address']}</h1>
                                        <h1 style={{fontSize:"11px",fontWeight:577,color:"grey"}}>{item['deliveryDetails']['address']['city']}, {item['deliveryDetails']['address']['state']}, {item['deliveryDetails']['address']['country']}</h1>
                                        <i className="pi pi-map-marker" style={{color:"#1e5aff",fontSize:"18px",marginTop:"5px"}} onClick={()=>{setShowMap(true)}}></i>
                                        <h1 style={{fontSize:"11px",fontWeight:577,color:"grey",marginTop:"10px"}}>Delivers in <span><ProgressBar style={{height:"5px",marginTop:"7px",width:"70%"}} value={50}></ProgressBar></span></h1>
                                    </Card.Body>
                                </Card>
                                <i className="pi pi-question-circle" style={{color:"#1e5aff",fontSize:"14px",marginTop:"10px"}}> Help center</i>
                                
                            </Col> 
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Modal show={showMap} onHide={()=>setShowMap(false)} backdrop="static" size={'xl'} >
            <Modal.Header closeButton></Modal.Header>
        <ModalBody>
        <Row>
            <Card className="col-12 col-lg-12 ml-auto" style={{ border:"none",minWidth: "100%", marginTop: "0px", marginBottom: "0px" }}>
                <Card.Body>
                    <GMapComp latitude={item['deliveryDetails']['address']['geo_location']["coordinates"][0]} longitude={item['deliveryDetails']['address']['geo_location']["coordinates"][1]}/>
                </Card.Body>
            </Card >
        </Row>
        </ModalBody>
        </Modal>
        </>
    );
}
export default AcceptedCardComp;
