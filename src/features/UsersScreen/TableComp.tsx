import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import './DataTable.css';
import { Card, Row,Modal, ModalBody,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { usersRequest } from '../../redux/actions/UserAction';
import { addressGetRequest } from '../../redux/actions/AddressAction';
import { ProgressSpinner } from 'primereact/progressspinner';
import GMapComp from './GMaps';
import { Toast } from 'primereact/toast';
import {useHistory} from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
interface Props {
    users: any;
    fetchUsers: () => void;
    fetchAddress:(d)=>void;
    address:any;
    addressLoading:any
  }

let DataTableRowExpansion: React.FunctionComponent<Props> = props => {
    const [expandedRows, setExpandedRows] = useState<any>({});

    const isMounted = useRef(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt:any = useRef(null);
    const history = useHistory();

    const reset = () => {
        setGlobalFilter('');
        dt.current.reset();
    }
    

    useEffect(() => {
      isMounted.current = true;
      props.fetchUsers()
    }, [])
    useEffect(() => {
        if (isMounted.current) {
            const d = {user_id:Object.keys(expandedRows)[0]}
            props.fetchAddress(d)
        }
    }, [expandedRows]);
    const [rowData, setRowData] = useState({});
    const [currentWalletId,setcurrentWalletId]=useState("")
    const [amt,setAmt]=useState("")
    const [desc,setDesc]=useState("")
    const toast:any = useRef(null)
    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
            <h5 style={{fontSize:"14.7px",fontWeight:666,color:"#237abc",marginBottom:"15px"}}>Communication address:</h5>
            { props.address !== null && props.address.data === null && <h1 style={{fontSize:"14.7px",fontWeight:666,color:"#c02929",marginBottom:"15px"}}> No communication address available.</h1>}
            {!props.addressLoading ?
                                    props.address !== null && props.address.data !== null && props.address.data.length>0 && props.address.data.map((item)=>{
                                        return <>
                                        <Row>
                                        <Col>
                                        <Card style={{boxShadow:"0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",borderRadius:"10px",minWidth:"100%",marginBottom:'20px'}}>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <i className="pi pi-home" style={{color:"#2d88ff",fontSize:"80px"}}></i>  
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Address: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{item.address}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>City: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{item.city}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>State: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{item.state}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Country: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{item.country}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Pin: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{item.pin}</span></h1>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                </Col>
                                <Col>

                                            <GMapComp latitude={item['geo_location']['coordinates'][0]} longitude={item['geo_location']['coordinates'][1]}/>       
                                </Col>
                                </Row>
                                        </>
                                    }):<ProgressSpinner style={{width: '100px', height: '145px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1" animationDuration=".5s"/>}
        </div>
        );
    }
    const paymentATemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"grey"}}>{rowData.payment_amount}</h1>
    }
    const paymentMTemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"grey"}}>{rowData.payment_method}</h1>
    }
    const statusTemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"grey"}}>{rowData.status}</h1>
    }
    const nameTemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#595959"}}>{rowData.name}</h1>
    }
    const emailTemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#595959"}}>{rowData.email}</h1>
    }
    const genderTemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#595959"}}>{rowData.gender}</h1>
    }
    const dobTemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#595959"}}>{rowData.dob}</h1>
    }
    const accountTypeTemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#595959"}}>{rowData.account_type}</h1>
    }
    const walletAmtTemplate = (rowData) =>{
        if(rowData.type==="Add"){
            return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"green"}}>+ {rowData.amount} <span style={{color:"#595959"}}>credits</span></h1>
        }

        if(rowData.type==="Subtract"){
            return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#c11111"}}>- {rowData.amount} <span style={{color:"#595959"}}>credits</span></h1>
        }
    }
    const walletDescTemplate = (rowData) =>{
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#595959"}}>{rowData.description}</h1>
    }
    const walletTypeTemplate = (rowData) =>{
        if(rowData.type==="Add"){
        return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"green"}}>Credits added to wallet</h1>
        }
        if(rowData.type==="Subtract"){
            return <h1 style={{ fontSize:"12px",fontWeight:500,textTransform:"capitalize",color:"#c11111"}}>Credits deducted from wallet </h1>
        }
    }

    const orderTemplate = (rowData) =>{
         
        return <img src="https://img.icons8.com/external-inipagistudio-lineal-color-inipagistudio/25/000000/external-cart-retail-store-inipagistudio-lineal-color-inipagistudio.png" style={{width:"25px"}} onClick={()=>{history.push('/order/user/'+rowData['user_id'])}}/>
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.profile_photo} width={150} height={100} style={{borderRadius:"10px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.profile_photo} className="product-image" />;
    }
    const menu:any = useRef(null);
    const [showDelModal,setShowDelModal] = useState(false)
    const items = [
        {
            label: 'View Transactions',
            icon: 'pi pi-user',
            command: () => {
                history.push('/transactions/'+currentA['user_id'])
            }
        },
        {
            label: 'Deactivate account',
            icon: 'pi pi-times',
            command: () => {
                setShowDelModal(true)
            }
        },
    ];
    const [currentA,setCurrentA] = useState<any>()
    const actionTemplate = (rowData) => {
        return <><Menu model={items} popup ref={menu} id="popup_menu" /><img src="https://img.icons8.com/fluency/27/000000/menu-2.png" onClick={(event) => {menu['current'].toggle(event);setCurrentA(rowData);}}/></>
}
    const header = (
        <div className="table-header-container" style={{color:"#237abc"}}>
            <i className="pi pi-users" style={{color:"#237abc",fontSize:"25px"}}/> Users
        </div>
    );
    const wHeader = (
        <div className="table-header">
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <span className="p-input-icon-left" style={{float: 'right'}}>
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
            </span>
        </div>
    );
    const deleteCatDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={()=>{setShowDelModal(false)}} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() =>{toast['current'].show({severity:'warn', summary: 'Success', detail:'Account deactivated successfully', life: 3000})}}/>
        </>
    );
    return (<>
        <Toast ref={toast}></Toast>
        {props.users ?
        <div className="datatable-rowexpansion-demo">
                        
            <div className="card">
                <DataTable value={props.users.data} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate} emptyMessage={<p style={{color:"#c02929",textAlign:"center"}}>No records found</p>} dataKey="user_id" header={header}>
                    <Column style={{width:'3em'}} expander />
                    <Column header="Profile Photo" body={imageBodyTemplate} style={{textAlign:"center",fontSize:"12px"}}/>
                    <Column field="name" header="Name" body={nameTemplate} sortable style={{fontSize:"12px"}}/>
                    <Column field="email" header="Email" body={emailTemplate} style={{fontSize:"12px"}}/>
                    <Column field="gender" header="Gender"  body={genderTemplate} style={{fontSize:"12px"}}/>
                    <Column field="dob" header="Date of birth" sortable body={dobTemplate} style={{fontSize:"12px"}}/>
                    <Column style={{width:'5em'}} body={orderTemplate}/>
                    <Column style={{width:'5em'}} body={actionTemplate}/>
                </DataTable>
            </div>
            {/* <Modal show={showModal} onHide={closeModal} backdrop="static" size={'xl'}>
            <Modal.Header closeButton style={{border:"none"}}><h6 style={{ fontSize: "24.5px", marginTop: "7px",fontWeight:600,marginLeft:"10px" }}>Order details</h6></Modal.Header>
            <ModalBody>
            <Row>
                <Card className="col-12 col-lg-12 ml-auto" style={{ border:"none",minWidth: "100%", marginTop: "0px", marginBottom: "0px" }}>
                    <Card.Body>
                            {rowData && <>
                            <Row>
                                <Col md={6}>
                                <h1 style={{ fontSize: "14.5px", marginTop: "7px",fontWeight:750,marginLeft:"0px" }}>Order id : <span style={{ fontSize: "14px", marginTop: "7px",fontWeight:450,marginLeft:"0px",color:"grey" }}>{rowData['id']}</span></h1>
                                <h1 style={{ fontSize: "14.5px", marginTop: "7px",fontWeight:750,marginLeft:"0px" }}>Order amount : <span style={{ fontSize: "14px", marginTop: "7px",fontWeight:450,marginLeft:"0px",color:"grey" }}>{rowData['payment_amount']}</span></h1>
                                <h1 style={{ fontSize: "14.5px", marginTop: "7px",fontWeight:750,marginLeft:"0px" }}>Payment method : <span style={{ fontSize: "14px", marginTop: "7px",fontWeight:450,marginLeft:"0px",color:"grey" }}>{rowData['payment_method']}</span></h1>
                                <h1 style={{ fontSize: "14.5px", marginTop: "7px",fontWeight:750,marginLeft:"0px" }}>Customer address: <span style={{ fontSize: "14px", marginTop: "7px",fontWeight:450,marginLeft:"0px",color:"grey" }}>{rowData['delivery_address']}</span></h1>
                                </Col>
                                <Col md={6}>
                                {rowData['delivery_geo_location'] !==undefined && <GMapComp latitude={rowData['delivery_geo_location']["coordinates"][0]} longitude={rowData['delivery_geo_location']["coordinates"][1]}/>}
                                </Col>
                            </Row>
                        <h1 style={{ fontSize: "14.5px", marginTop: "7px",fontWeight:750,marginLeft:"0px",padding:"10px 5px 10px 5px",backgroundColor:"green" }}> Description: </h1>
                        <DataTable value={rowData['items_orderd']} style={{padding:"0px 11px 11px 11px",backgroundColor:"white"}} paginator rows={5}>
                            <Column field="item_name" header="Name" style={{textAlign:"center"}}/>
                            <Column field="quantity" header="Quantity" sortable style={{textAlign:"center"}}></Column>
                        </DataTable>
                        </>}
                    </Card.Body>
                </Card >
            </Row>
            </ModalBody>
        </Modal> */}
        <Dialog header="Deactivate account" visible={showDelModal} className="dialogSize" modal footer={deleteCatDialogFooter} onHide={()=>{setShowDelModal(false)}}>
                <Row >
                <div className="dialogCss">
                <span>
                                        Are you sure you want to deactivate <b>{currentA && currentA['name']}'s</b> account?
                                    </span>
                </div>
                </Row>
            </Dialog> 
        </div>: <ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1" animationDuration=".5s"/>
}</>
 
    );
}

const mapStateToProps = (state: any) => ({
    users: state.users.users,
    address: state.address.data,
    addressLoading: state.address.isLoading
  })
const mapDispatchToProps = dispatch => ({
    fetchUsers: () => { dispatch(usersRequest()) },
    fetchAddress:(d:any) => {dispatch(addressGetRequest(d))},
  });
export default DataTableRowExpansion = connect(mapStateToProps, mapDispatchToProps)(DataTableRowExpansion)
