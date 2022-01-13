import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './DataTable.css';
import { connect } from 'react-redux'
import { ordersRequest,OrdersPUTRequest } from '../../redux/actions/OrderActions';
import { ProgressSpinner } from 'primereact/progressspinner';
import NewOCardComp from './NewOrderCardComp';
import AcceptedCardComp from './AcceptedCardComp';
import PickUpCardComp from './ReadyForPickUp';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { Card, Row, Col,Modal,ModalBody } from 'react-bootstrap';
import DropdownComp from './DropDownIds';
import jwt_decode from "jwt-decode";
interface Props {
    orders: any;
    loading:any;
    fetchorders: (d) => void;
    putorders:(data) => void;
  }

let DataTableRowExpansion: React.FunctionComponent<Props> = props => {
    const [expandedRows, setExpandedRows] = useState<any>({});
    const isMounted = useRef(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedShopT, setSelectedShopT] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt:any = useRef(null);
    const menu:any = useRef(null);
    const menu1:any = useRef(null);
    const toast:any = useRef(null);
    const [currentOId,setCurrentOId] = useState("")
    const [currentO,setCurrentO] = useState<any>()
    const [showOModal, setShowOModal] = useState(false);
    const [showDModal,setShowDModal] = useState(false);
    const [deliveryId,setDeliveryId] = useState("");
    const items = [
                {
                    label: 'Update status',
                    icon: 'pi pi-user-edit',
                    command: () => {
                        setShowOModal(true);
                    }
                },
                {
                    label: 'Assign delivery person',
                    icon: 'pi pi-user',
                    command: () => {
                        setShowDModal(true)
                    }
                },
    ];
    const items1 = [
        {
            label: 'Assign delivery person',
            icon: 'pi pi-user',
            command: () => {
                setShowDModal(true)
            }
        },
];
    const statuses = [
        'Delivered', 'Accepted','Ordered','Ready'
    ];
    const shopT = [
        'Pharmacy', 'Grocery Store','Restaurant',
    ];
    useEffect(() => {
      const path = window.location.href.split('/')[window.location.href.split('/').length-1];
      const ppath = window.location.href.split('/')[window.location.href.split('/').length-2];
      let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
      var decoded:any = jwt_decode(token!);
      let d={status:"",shopid:"",userid:"",deliveryId:"",sid:decoded["userid"]}
      if (path !== 'order'){
            if (ppath === 'shop'){
                d={status:"",shopid:path,userid:"",deliveryId:"",sid:decoded["userid"]}
            } 
      }
      isMounted.current = true;
      props.fetchorders(d)
    }, [])

    useEffect(()=>{
        if (showDModal && currentO){
        }
    },[showDModal])
    const shortId = (rowData) => {
        return <h1 style={{fontSize:"12px",fontWeight:500}}>{rowData["order_Id"].substring(0,4)+rowData["order_Id"].substring(rowData["order_Id"].length-4,rowData["order_Id"].length)}</h1> ;
    }
    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5 style={{fontSize:"15.px",fontWeight:466,color:"#237abc",marginBottom:"15px"}}>Order details</h5>
                { data.orderStatus === 'Ordered' && <NewOCardComp item={data} handleSubmit={handleSubmit}/>}
                { data.orderStatus === 'Accepted' && <AcceptedCardComp item={data} handleSubmit={handleSubmit}/>}
                { data.orderStatus === 'Ready' && <PickUpCardComp item={data} handleSubmit={handleSubmit}/>}
                { data.orderStatus === 'Delivered' && <AcceptedCardComp item={data} handleSubmit={handleSubmit}/>}
            </div>
        );
    }
    const customerNameTemplate = (rowData) => {
        if (rowData["deliveryDetails"]!==undefined && rowData["deliveryDetails"] !== null){
            return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize"}}>{rowData["deliveryDetails"]['name']}</h1> ;
        }
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"#bf1a1a"}}>server error</h1>;
    }
    const shopNameTemplate = (rowData) => {
        if (rowData['shopDetails']!==undefined && rowData['shopDetails'] !== null){
            return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize"}}>{rowData['shopDetails']['shop_name']}</h1> ;
        }
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"#bf1a1a"}}>server error</h1>;
    }
    const shopTypeTemplate = (rowData) => {
        if (rowData['shopDetails']!==undefined && rowData['shopDetails'] !== null){
            return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize"}}>{rowData['shopDetails']['type']}</h1> ;
        }
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"#bf1a1a"}}>server error</h1>;
    }

    const orderedONTemplate = (rowData) => {
        if (rowData['orderedAt']!==undefined && rowData['orderedAt'] !== null){
            return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize"}}>{rowData['orderedAt'].split("T")[0]}-{rowData['orderedAt'].split("T")[1].substring(0,8)}</h1> ;
        }
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"#bf1a1a"}}>server error</h1>;
    }
    const deliveryNameTemplate = (rowData) => {
        if (rowData['deliveryDetails']!==undefined && rowData['deliveryDetails'] !== null){
            if (rowData['deliveryDetails']['deliveryPerson'] !==undefined && rowData['deliveryDetails']['deliveryPerson'] !== null){
                return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize"}}>{rowData['deliveryDetails']['deliveryPerson']}</h1>;
            }
            return <h1 style={{fontSize:"12px",fontWeight:500,color:"#bf1a1a"}}>no delivery person assigned</h1>;
        }
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"#bf1a1a"}}>server error</h1>;
    }
    const paymentTemplate = (rowData) => {
        if (rowData['paymentCurrency']!==undefined && rowData['paymentCurrency'] !== null && rowData['paymentAmount']!==undefined && rowData['paymentAmount'] !== null){
            return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize"}}>{rowData['paymentCurrency']} {rowData['paymentAmount']}</h1> ;
        }
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"#bf1a1a"}}>server error</h1>;
    }
    const handleSubmit = (id:any,sta:any) => {
        const body = {
            "id":id,
            "status":sta
        }
        props.putorders(body)
    }
    const orderStatusTemplate = (rowData) => {
        if (rowData['orderStatus']!==undefined && rowData['orderStatus'] !== null){
            if (rowData['orderStatus'] === "Delivered"){
                return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"green"}}>{rowData['orderStatus']} </h1> ;
            }
            if (rowData['orderStatus'] === "Ready"){
                return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#e2ca14"}}>{rowData['orderStatus']} </h1> ;
            }
            if (rowData['orderStatus'] === "Accepted"){
                return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"skyblue"}}>{rowData['orderStatus']} </h1> ;
            }
            if (rowData['orderStatus'] === "Ordered"){
                return <h1 style={{fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"grey"}}>{rowData['orderStatus']} </h1> ;
            }    
        }
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"#bf1a1a"}}>server error</h1>;
    }
    const onStatusChange = (e) => {
        dt.current.filter(e.value, 'orderStatus', 'equals');
        setSelectedStatus(e.value);
    }
    const onShopChangeT = (e) => {
        dt.current.filter(e.value, 'shopDetails.type', 'equals');
        setSelectedShopT(e.value);
    }
    const reset = () => {
        setSelectedStatus(null);
        setSelectedShopT(null);
        setSelectedDate(undefined);
        setGlobalFilter('');
        dt.current.reset();
    }

    const statusItemTemplate = (option) => {
        return <span style={{fontSize:"14px",fontWeight:600,textTransform:'capitalize'}}>{option}</span>;
    }
    const shopTemplateT = (option) => {
        return <span style={{fontSize:"14px",fontWeight:600,textTransform:'capitalize'}}>{option}</span>;
    }
    const actionTemplate = (rowData) => {
        if (rowData['orderStatus']=="Delivered"){
            return <></>
        }
        if (rowData['orderStatus']=="Ready"){
            return <><Menu model={items} popup ref={menu} id="popup_menu" /><img src="https://img.icons8.com/fluency/27/000000/menu-2.png" onClick={(event) => {menu['current'].toggle(event);setCurrentOId(rowData['order_Id']);setCurrentO(rowData);}}/></>
        }
        if (rowData['orderStatus']=="Ordered"){
            return <><Menu model={items} popup ref={menu} id="popup_menu" /><img src="https://img.icons8.com/fluency/27/000000/menu-2.png" onClick={(event) => {menu['current'].toggle(event);setCurrentOId(rowData['order_Id']);setCurrentO(rowData);}}/></>
        }
        if (rowData['orderStatus']=="Accepted"){
            return <><Menu model={items} popup ref={menu} id="popup_menu" /><img src="https://img.icons8.com/fluency/27/000000/menu-2.png" onClick={(event) => {menu['current'].toggle(event);setCurrentOId(rowData['order_Id']);setCurrentO(rowData);}}/></>
        }
    }
    const [selectedDate, setSelectedDate] = useState<any>([new Date(new Date().getFullYear(), new Date().getMonth(), 1),new Date()]);

    const formatDate = (date) => {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }
    const [fs,setFs] = useState("")
    const codeFilter = (value, filter) => {
        var date1:any = new Date(value!);
        var date2:any = new Date(filter.split(":")[0]);
        var date3:any = new Date(filter.split(":")[1]);

        return date1.getTime()>date2.getTime() && date1.getTime()< date3.getTime();
    }
    const onDateChangeUseeffect = (e) => {
            let dat2 = formatDate(e[0])
            let dat1 = formatDate(e[1])
            dt.current.filter(dat2+":"+dat1, 'orderedAt', 'custom');
    }
    const onDateChange = (e) => {
        if (e.value[1]!==null){
            let dat2 = formatDate(e.value[1])
            dt.current.filter(fs+":"+dat2, 'orderedAt', 'custom');
            setSelectedDate(e.value);
            return
        }
        if (e.value[0]!==null && e.value[1]===null){
            let dat2 = formatDate(e.value[0])
            setFs(dat2)
            setSelectedDate(e.value);
            return
        }
    }

    const statusFilter = <Dropdown value={selectedStatus} options={statuses} onChange={onStatusChange} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear style={{width:"127px"}}/>;
    const shopTFilter = <Dropdown value={selectedShopT} options={shopT} onChange={onShopChangeT} itemTemplate={shopTemplateT} placeholder="Select a Shop Type" className="p-column-filter" showClear style={{width:"127px"}}/>;
    const dateFilter = <Calendar readOnlyInput value={selectedDate} onChange={onDateChange} dateFormat="yy-mm-dd" selectionMode="range" className="p-column-filter" placeholder="Select Date" style={{display: 'none'}}/>;
    const header = (
        <div className="table-header">
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <span className="p-input-icon-left" style={{float: 'right'}}>
            
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search"  style={{marginRight:"15px"}}/>
                <Calendar readOnlyInput value={selectedDate} onChange={onDateChange} dateFormat="yy-mm-dd" showIcon  selectionMode="range" className="p-column-filter" placeholder="Select Date" style={{marginRight:"5px",width:"257px",marginBottom:"5px",marginTop:"5px",marginLeft:"auto",fontSize:"12px !important"}}/>
            </span>
        </div>
    );
    useEffect(() => {
        if (!props.loading){
            if (dt !==null && dt.current !=null){
                console.log(dt.current.filter())
                onDateChangeUseeffect([new Date(new Date().getFullYear(), new Date().getMonth(), 1),new Date()])
                console.log("here")
            }
        }
    }, []);
    return (
        <>
        <Toast ref={toast}></Toast>
        {!props.loading ?
        <div className="datatable-rowexpansion-demo">
            <div className="card">
                <DataTable ref={dt} value={props.orders} expandedRows={expandedRows}  globalFilter={globalFilter}  onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate} emptyMessage={<p style={{color:"#c02929",textAlign:"center"}}>No records found</p>} dataKey="order_Id" header={header}>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="order_Id" header="Order id" sortable body={shortId} style={{fontSize:"12px"}}/>
                    <Column field="deliveryDetails.name" header="Customer name" body={customerNameTemplate} style={{fontSize:"12px"}}/>
                    <Column field="shopDetails.shop_name" header="Shop name" body={shopNameTemplate} style={{fontSize:"12px"}}/>
                    <Column field="shopDetails.type" header="Shop Type" body={shopTypeTemplate} style={{fontSize:"12px"}} filter filterElement={shopTFilter} />
                    <Column field="orderedAt" header="Ordered on" body={orderedONTemplate} style={{fontSize:"12px"}} filter filterElement={dateFilter} filterFunction={codeFilter}/>
                    <Column field="deliveryDetails.deliveryPerson" header="Delivery person" body={deliveryNameTemplate} style={{fontSize:"12px"}}/>
                    <Column field="paymentAmount" header="Payment amount" sortable body={paymentTemplate} style={{fontSize:"12px"}}/>
                    <Column field="orderStatus" header="Order status" body={orderStatusTemplate} filter filterElement={statusFilter} style={{fontSize:"12px"}}/>
                    {window.location.href.split('/')[window.location.href.split('/').length-1]!=='chat' && <Column style={{width:'7em',fontSize:"12px"}} body={actionTemplate}/>}
                </DataTable>
            </div>

            <Modal show={showOModal} onHide={()=>{setShowOModal(false)}} backdrop="static" size={'sm'}>
            <Modal.Header closeButton style={{border:"none",fontSize:"16.7px",fontWeight:700,marginLeft:"7px"}}>Update order status</Modal.Header>
                <ModalBody>
                    <Row>
                        {currentO &&<h1 style={{fontSize:"14px",fontWeight:500,padding:"10px 30px 15px 30px"}}>Change order status for order: {currentO['order_Id']}</h1>}
                    </Row>
                    <Row >
                                <Col xs={12} md={6}>
                                    <Button style={{width:"100%",fontSize:"15px",textAlign:"center",display:"block",margin:"0px auto 0px auto",border:"none",backgroundColor:"#c63d3d"}} onClick={()=>{handleSubmit(currentOId,"Rejected")}}>Reject</Button>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Button style={{width:"100%",fontSize:"15px",textAlign:"center",display:"block",margin:"0px auto 0px auto",border:"none",backgroundColor:"#1e5aff"}} onClick={()=>{handleSubmit(currentOId,"Accepted")}}>Accept</Button>
                                </Col>
                        </Row>
                </ModalBody>
            </Modal>
            <Modal show={showDModal} onHide={()=>{setShowDModal(false)}} backdrop="static" size={'lg'}>
            <Modal.Header closeButton style={{border:"none",fontSize:"16.7px",fontWeight:700,marginLeft:"7px"}}>Assign delivery</Modal.Header>
                <ModalBody>
                            <Row style={{marginTop:"35px"}}>
                                {currentO && (currentO['orderStatus']==='Ready' || currentO['orderStatus']==='Accepted' || currentO['orderStatus']==='Ordered') &&  <>
                                <h1 style={{fontSize:"14px",fontWeight:670,color:"green",marginLeft:"20px"}}>Assign delivery personal for the order</h1>
                                <div style={{marginLeft:"20px"}}><DropdownComp sellers={[]} setSellerID={setDeliveryId}/></div>
                                </>}
                                </Row>
                                <Row style={{margin:"30px",float:"right"}}>
                                <Button style={{marginLeft:"20px"}}>Assign</Button>
                            </Row>
                </ModalBody>
            </Modal>
        </div>: <ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1"  animationDuration=".5s"/>
}</>
    );
}

const mapStateToProps = (state: any) => ({
    orders: state.orders.orders,
    loading: state.orders.isLoading,
  })
const mapDispatchToProps = dispatch => ({
    fetchorders: (d:any) => { dispatch(ordersRequest(d)) },
    putorders:(data:any) =>{dispatch(OrdersPUTRequest(data))},
  });
export default DataTableRowExpansion = connect(mapStateToProps, mapDispatchToProps)(DataTableRowExpansion)
