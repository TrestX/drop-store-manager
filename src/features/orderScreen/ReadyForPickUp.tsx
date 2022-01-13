import React, { useRef, useState,useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card, Row, Col,Modal,ModalBody } from 'react-bootstrap';
import GMapComp from '../UsersScreen/GMaps';
import { ProgressBar } from 'primereact/progressbar';
import { connect } from 'react-redux';
import DropdownComp from './DropDownIds';
interface Props {
        item:any;
        handleSubmit:any;
      }
    
let PickUpOrderCompCards: React.FunctionComponent<Props> = props => {
    const [showMap,setShowMap] = useState(false)
    const toast:any = useRef(null);
    const [deliveryId,setDeliveryId] = useState("")
   useEffect(() => {
        const d={lat:props.item['shopDetails']['geo_location']['coordinates'][0],long:props.item['shopDetails']['geo_location']['coordinates'][0]}
    }, [])
    const showToast =() =>{
        toast['current'].show({severity: 'success', summary: 'Success', detail: 'Delivery person assigned', life: 3000});
    }
    return (
<>
<Toast ref={toast}></Toast>
<Row style={{marginTop:"20px"}}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card >
                    <Card.Body>
                        <Row>
                            <Col xs={12} md={4} style={{padding:"20px"}}>
                            <img src={props.item['shopDetails']['shop_logo']} width={100} style={{borderRadius:"10px",objectFit:"contain"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={props.item['shopDetails']['shop_logo']} className="product-image" />
                            <h1 style={{fontSize:"12px",fontWeight:660,marginTop:"10px",marginLeft:"7px"}}>{props.item['shopDetails']['shop_name']} - <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{props.item['shopDetails']['type']}</span></h1>
                            <h1 style={{fontSize:"12px",fontWeight:660,marginTop:"10px",marginLeft:"7px"}}>Start Timings: <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{props.item['shopDetails']['timing'].split("-")[0].substring(0,5)} am </span></h1>
                            <h1 style={{fontSize:"12px",fontWeight:660,marginTop:"10px",marginLeft:"7px"}}>End Timings: <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{props.item['shopDetails']['timing'].split("-")[1].substring(0,5)} pm</span></h1>
                            <h1 style={{fontSize:"12px",fontWeight:660,marginTop:"10px",marginLeft:"7px"}}>Address: <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{props.item['shopDetails'].address}, {props.item['shopDetails'].city}, {props.item['shopDetails'].state}, {props.item['shopDetails'].country} {props.item['shopDetails'].pin}  <i className="pi pi-map-marker" style={{color:"#1e5aff",fontSize:"14px",marginTop:"10px"}} onClick={()=>setShowMap(true)}></i></span></h1>
                            <hr/>
                            <Row>

                                <Col xs={12}>
                                    <h1 style={{fontSize:"15px",fontWeight:655,color:"black",marginLeft:"7px"}}>ID: <span style={{fontWeight:400,color:"grey"}}>{props.item["order_Id"].substring(0,10)+props.item["order_Id"].substring(props.item["order_Id"].length-4,props.item["order_Id"].length)} </span><i className="pi pi-print" style={{color:"#1e5aff",fontSize:"14px",marginRight:"20px",float:"right"}}></i></h1>
                                    <h1 style={{fontSize:"12px",fontWeight:655,color:"black",marginLeft:"7px"}}>Order description: <span style={{fontWeight:400,fontSize:"11px",color:"grey"}}>{props.item['orderDescription']}</span></h1>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs={12}>
                                <h1 style={{fontSize:"12px",fontWeight:660,marginLeft:"7px"}}>Customer name: <span style={{fontSize:"12px",fontWeight:455,color:"grey"}}>{props.item['deliveryDetails']['name']}</span><i className="pi pi-phone" style={{color:"#1e5aff",fontSize:"14px",marginRight:"20px",float:"right"}}></i></h1>
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
                                    <h1 style={{fontSize:"10px",marginTop:"10px",color:"grey"}}>{props.item['orderedAt'].split("T")[0]} {props.item['orderedAt'].split("T")[1].substring(0,8)}</h1>
                                    <div style={{height:"21px",marginLeft:"5px"}}></div>
                                    <h1 style={{fontSize:"10px",marginTop:"10px",color:"grey"}}>{props.item['accepted_at'].split("T")[0]} {props.item['accepted_at'].split("T")[1].substring(0,8)}</h1>
                                </Col>
                            </Row>
                            </Col>
                            <Col xs={12} md={4} style={{padding:"40px"}}>
                                {props.item['itemsOrdered'] && props.item['itemsOrdered'].length>0 && props.item['itemsOrdered'].map((item)=>{
                                    return <Row>
                                        <Col>
                                        <h1 style={{fontSize:"13px",fontWeight:555,color:"black",marginLeft:"11px"}}>
                                            <span style={{marginRight:"14px"}}>
                                                { item.type === 'non-veg' && <img src="https://www.pngkey.com/png/detail/245-2459071_non-veg-icon-non-veg-symbol-png.png" style={{width:"13px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" />} 
                                                { item.type === 'veg' && <img src="https://tpng.net/download/0x0_261-2619381_veg-icon-png.png" style={{width:"13px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  className="product-image" />}
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
                                        <h1 style={{fontSize:"13px",fontWeight:555,color:"black",float:"right",textTransform:"capitalize"}}>{props.item['paymentCurrency']} {props.item['paymentAmount']}</h1>
                                    </Col>
                                </Row>
                                <hr/>
                                {/*<Row style={{marginTop:"35px"}}>
                                {props.item['orderStatus']==='Ready' &&  <>
                                <h1 style={{fontSize:"14px",fontWeight:670,color:"green",marginLeft:"20px"}}>Order is ready for pickup assign a delivery personal</h1>
                                <div style={{marginLeft:"20px"}}><DropdownComp sellers={props.delivery} setSellerID={setDeliveryId}/></div>
                                </>}
                                </Row>
                                <Row style={{marginTop:"30px"}}>
                                <Button style={{marginLeft:"20px"}} onClick={showToast}>Assign</Button>
                            </Row>*/}
                            </Col>
                            <Col xs={12} md={4} style={{padding:"20px"}}>
                                <Card>
                                    <Card.Body>
                                        <h1 style={{fontSize:"12px",fontWeight:777,color:"grey"}}>Delivery details</h1>
                                        <hr/>
                                        <h1 style={{fontSize:"12px",fontWeight:777}}>Customer name</h1>
                                        <h1 style={{fontSize:"11px",fontWeight:577,color:"grey"}}>{props.item['deliveryDetails']['name']}</h1>
                                        <h1 style={{fontSize:"12px",fontWeight:777}}>Customer address</h1>
                                        <h1 style={{fontSize:"11px",fontWeight:577,color:"grey"}}>{props.item['deliveryDetails']['address']['address']}</h1>
                                        <h1 style={{fontSize:"11px",fontWeight:577,color:"grey"}}>{props.item['deliveryDetails']['address']['city']}, {props.item['deliveryDetails']['address']['state']}, {props.item['deliveryDetails']['address']['country']}</h1>
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
                    <GMapComp latitude={props.item['deliveryDetails']['address']['geo_location']["coordinates"][0]} longitude={props.item['deliveryDetails']['address']['geo_location']["coordinates"][1]}/>
                </Card.Body>
            </Card >
        </Row>
        </ModalBody>
        </Modal>
        </>
    );
}
const mapStateToProps = (state: any) => ({
  })
const mapDispatchToProps = dispatch => ({
  });
export default PickUpOrderCompCards = connect(mapStateToProps, mapDispatchToProps)(PickUpOrderCompCards)