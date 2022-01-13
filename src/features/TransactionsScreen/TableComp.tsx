import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../UsersScreen/DataTable.css';
import { Card, Row,Modal, ModalBody,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { usersRequest,usersByUidRequest } from '../../redux/actions/UserAction';
import { paymentsGetRequest } from '../../redux/actions/PaymentsAction';
import { addressGetRequest } from '../../redux/actions/AddressAction';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import {useHistory} from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import jwt_decode from "jwt-decode";
import { Calendar } from 'primereact/calendar';
interface Props {
    payments:any;
    users:any;
    fetchpayments:(d)=>void;
    fetusersD: (d) => void;
  }

let DataTableRowExpansion: React.FunctionComponent<Props> = props => {
    const [expandedRows, setExpandedRows] = useState<any>({});
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const isMounted = useRef(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt:any = useRef(null);
    const history = useHistory();
    const reset = () => {
        setSelectedStatus(null);
        setSelectedMethod(null);
        setSelectedCurrency(null);
        setSelectedDate(undefined);
        setGlobalFilter('');
        dt.current.reset();
    }
    useEffect(() => {
      isMounted.current = true;
      const path = window.location.href.split('/')[window.location.href.split('/').length-1];
      let d = {uId:""}
      if (path !== 'transactions'){
          if(path != 'shop'){
            const d = {status:"",id:path,sellerId:"",shopId:""}
            props.fetchpayments(d)
          }else{
            const d = {status:"",id:"",sellerId:"",shopId:path}
            props.fetchpayments(d)  
          }

      }else{
          if (sessionStorage.getItem("token")){
                var decoded:any = jwt_decode(sessionStorage.getItem("token")!);
                const d = {status:"",id:"",sellerId:decoded["userid"],shopId:""}
                props.fetchpayments(d)
          }else{
            const d = {status:"",id:"",sellerId:"",shopId:""}
            props.fetchpayments(d)
          }
      }

    }, [])
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    useEffect(() => {
        if (isMounted.current && props.payments && props.payments.data) {
            for (let i = 0;i<props.payments.data.length;i++){
                if (props.payments.data[i]['payment_id']===Object.keys(expandedRows)[0]){
                    props.fetusersD(props.payments.data[i]['user_id']);
                    break
                }
            }
        }
    }, [expandedRows]);
    const [showModal, setShowModal] = useState(false);
    const [rowData, setRowData] = useState({});
    const closeModal = () => {
        setShowModal(false)
    }
    const toast:any = useRef(null);
    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                                
                <Row>

<Col md={4} lg={4}>
<h5 style={{fontSize:"14px",fontWeight:600}}>User details</h5>
                          {props.users && props.users.data && props.users.data.length>0 && <>
          <Card style={{boxShadow:"0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",borderRadius:"10px",minWidth:"100%",marginBottom:'20px'}}>
          <Row style={{padding:"12px",paddingBottom:"28px"}}>
            <Col md={4} lg={4}>
              <img src={props.users.data[0]['profile_photo']} style={{height:100,borderRadius:"10px",backgroundColor:'grey'}}/>
            </Col>
            <Col md={8} lg={8}>
              <h1 style={{fontSize:"12.2px",fontWeight:555}}>Name: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{props.users.data[0]['name']}</span></h1>
              <h1 style={{fontSize:"12.2px",fontWeight:555}}>Email:  <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{props.users.data[0]['email']}</span></h1>
              <h1 style={{fontSize:"12.2px",fontWeight:555}}>Date of birth:  <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{props.users.data[0]['dob']}</span></h1>
              <h1 style={{fontSize:"12.2px",fontWeight:555}}>Gender:<span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{props.users.data[0]['gender']}</span></h1>
              <h1 style={{fontSize:"12.2px",fontWeight:555}}>Wallet: <span style={{fontSize:"12.6px",fontWeight:566,color:'green'}}>{props.users.data[0]['wallet']} credits</span></h1>
            
            </Col>

          </Row>
          </Card>
          </>
            }
            </Col>
            <Col md={4} lg={4}>
            <Row>
            <h5 style={{fontSize:"14px",fontWeight:600}}>Billing address</h5>
                        <Card style={{boxShadow:"0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",borderRadius:"10px",minWidth:"95%",marginBottom:'20px'}}>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <i className="pi pi-home" style={{color:"#2d88ff",fontSize:"80px"}}></i>  
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Address: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['shipping_details']['address']['address']}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>City: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['shipping_details']['address'].city}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>State: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['shipping_details']['address'].state}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Country: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['shipping_details']['address'].country}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Pin: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['shipping_details']['address'].pin}</span></h1>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>


                                </Row>
            </Col>
            <Col md={4} lg={4} >
            <Row>
            <h5 style={{fontSize:"14px",fontWeight:600}}>Shop details</h5>
                       { data['seller_details'] && <Card style={{boxShadow:"0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",borderRadius:"10px",minWidth:"95%",marginBottom:'20px'}}>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={12} sm={12} md={8}>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Shop name: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['seller_details']['shop_name']?data['seller_details']['shop_name']:""}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Current deal: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['seller_details']['deal']?data['seller_details']['deal']:""}</span></h1>
                                                
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Shop Address: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['seller_details']['address']?data['seller_details']['address']:""}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Seller name: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['seller_details']['name']?data['seller_details']['seller_name']:""}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Seller Account number: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['seller_details']['account_number']?data['seller_details']['account_number']:""}</span></h1>
                                                <h1 style={{fontSize:"12.2px",fontWeight:555}}>Seller IFSC code: <span style={{fontSize:"12.5px",fontWeight:455,color:"grey"}}>{data['seller_details']['ifsc']?data['seller_details']['ifsc']:""}</span></h1>

                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>}

                                { !data['seller_details'] && <><h1 style={{fontSize:"12.2px",fontWeight:555,color:"#af3b3b",marginTop:"50px"}}><br/>Unable to get seller details</h1></>}
                                </Row>
            </Col>
            </Row>
            </div>
        );
    }
    const Status = (rowData) =>{
        if (rowData.status && rowData.status.toLowerCase() ==="in process"){
            return <h1 style={{ fontSize: "12px",fontWeight:500,textTransform:"capitalize",color:"#1f58ca"}}>{rowData.status}</h1>
        }
        if (rowData.status && rowData.status.toLowerCase() ==="completed"){
            return <h1 style={{ fontSize: "12px",fontWeight:500,textTransform:"capitalize",color:"green"}}>{rowData.status}</h1>
        }
    }
    const Coupon = (rowData) =>{
        return <h1 style={{ fontSize: "12px",fontWeight:500,textTransform:"capitalize",color:"#595959"}}>{rowData.coupon_code?rowData.coupon_code:<h1 style={{ fontSize: "13.1px",fontWeight:500,textTransform:"capitalize",color:"#d15c5c"}}>No coupon applied</h1>}</h1>
    }


    const shortId = (rowData) => {
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"grey"}}>{rowData["user_id"].substring(0,4)+rowData["user_id"].substring(rowData["user_id"].length-4,rowData["user_id"].length)}</h1> ;
    }
    const Amount = (rowData) => {
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"grey"}}>{rowData["amount"]}</h1> ;
    }
    const Currency = (rowData) => {
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"grey",textTransform:"capitalize"}}>{rowData["currency"]}</h1> ;
    }
    const Method = (rowData) => {
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"grey",textTransform:"capitalize"}}>{rowData["payment_method"]}</h1> ;
    }
    const Desc = (rowData) => {
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"grey",textTransform:"capitalize"}}>{rowData["description"]}</h1> ;
    }
    const DateTemp = (rowData) => {
        return <h1 style={{fontSize:"12px",fontWeight:500,color:"grey",textTransform:"capitalize"}}>{rowData["added_time"].split("T")[0]}</h1> ;
    }

    const onStatusChange = (e) => {
        dt.current.filter(e.value, 'status', 'equals');
        setSelectedStatus(e.value);
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
    const onDateChange = (e) => {
        if (e.value[1]!==null){
            let dat2 = formatDate(e.value[1])
            dt.current.filter(fs+":"+dat2, 'added_time', 'custom');
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
    const onCurrencyChange = (e) => {
        dt.current.filter(e.value, 'currency', 'equals');
        setSelectedCurrency(e.value);
    }
    const onMethodChange = (e) => {
        dt.current.filter(e.value, 'payment_method', 'equals');
        setSelectedMethod(e.value);
    }

    const statuses = [
        'In Process', 'Completed', 'Canceled'
    ];
    const paymentm = [
        'Card', 'Cash'
    ];
    const currency = [
        'USD', 'Euro','GBP', 'INR'
    ];

    const statusFilter = <Dropdown value={selectedStatus} options={statuses} onChange={onStatusChange} placeholder="Select a status" className="p-column-filter" showClear style={{width:"127px"}}/>;
    const methodFilter = <Dropdown value={selectedMethod} options={paymentm} onChange={onMethodChange} placeholder="Select a payment method" className="p-column-filter" showClear style={{width:"127px"}}/>;
    const currencyFilter = <Dropdown value={selectedCurrency} options={currency} onChange={onCurrencyChange} placeholder="Select a currency" className="p-column-filter" showClear style={{width:"127px"}}/>;
    const dealBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                { rowData.deal!== undefined && <span style={{fontSize:"12px",fontWeight:500,textTransform:'capitalize'}}>{rowData.deal}</span>
                }
                { rowData.deal=== undefined && <span style={{fontSize:"12px",fontWeight:500,textTransform:'capitalize',color:"#af2f2f"}}>No deal applied.</span>
                }
            </React.Fragment>
        );
    }
    const dateFilter = <Calendar readOnlyInput value={selectedDate} onChange={onDateChange} dateFormat="yy-mm-dd" selectionMode="range" className="p-column-filter" placeholder="Select Date" style={{display:"none"}}/>;
    const header = (
        <div className="table-header-container" style={{color:"#237abc"}}>
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} style={{marginLeft:"10px"}}/>
            <span className="p-input-icon-left" style={{float:"right"}}>
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
                <Calendar readOnlyInput value={selectedDate} onChange={onDateChange} dateFormat="yy-mm-dd" showIcon  selectionMode="range" className="p-column-filter" placeholder="Select Date" style={{marginRight:"5px",width:"257px",marginBottom:"5px",marginTop:"5px",marginLeft:"5px",fontSize:"12px !important"}}/>
            </span>

        </div>
    );
    return (<>
        <Toast ref={toast}></Toast>
        {props.payments ?
        <div className="datatable-rowexpansion-demo datatable-responsive">
            <div className="card">
                <DataTable ref={dt} value={props.payments.data} className="p-datatable-responsive" expandedRows={expandedRows} onRowToggle={(e) => {setExpandedRows(e.data)}}
                    rowExpansionTemplate={rowExpansionTemplate} emptyMessage={<p style={{color:"#c02929",textAlign:"center"}}>No records found</p>} dataKey="payment_id" header={header}>
                    <Column style={{width:'3em'}} expander/>
                    <Column field="user_id" header="User Id" body={shortId} style={{fontSize:"12px"}}/>
                    <Column field="amount" header="Amount" sortable body={Amount} style={{fontSize:"12px"}}/>
                    <Column field="currency" header="Currency" body={Currency} filter filterElement={currencyFilter} style={{fontSize:"12px"}}/>
                    <Column field="payment_method" header="Payment Method" body={Method} filter filterElement={methodFilter} style={{fontSize:"12px"}}/>
                    <Column field="description" header="Payment Description" body={Desc} style={{fontSize:"12px"}}/>
                    <Column field="status" header="Payment Status" body={Status} filter filterElement={statusFilter} style={{fontSize:"12px"}}/>
                    <Column field="coupon_code" header="Coupon Applied" body={Coupon} style={{fontSize:"12px"}}/>
                    <Column field="deal" header="Deal" body={dealBodyTemplate} style={{fontSize:"12px"}}/>
                    <Column field="added_time" header="Date" body={DateTemp} style={{fontSize:"12px"}} filter filterElement={dateFilter} filterFunction={codeFilter}/>
                </DataTable>
            </div>
    </div>: <ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1" animationDuration=".5s"/>
}</>
 
    );
}

const mapStateToProps = (state: any) => ({
    payments: state.payments.data,
    users: state.users.users,
  })
const mapDispatchToProps = dispatch => ({
    fetchUsers: () => { dispatch(usersRequest()) },
    fetchpayments:(d:any) => {dispatch(paymentsGetRequest(d))},
    fetchAddress:(d:any) => {dispatch(addressGetRequest(d))},
    fetusersD:(d:any) => {dispatch(usersByUidRequest(d))},
  });
export default DataTableRowExpansion = connect(mapStateToProps, mapDispatchToProps)(DataTableRowExpansion)
