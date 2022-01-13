import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { sellerGetRequest } from '../../redux/actions/SellerAction';
import { sellerShopTGetRequest } from '../../redux/actions/SellerShopsTAction';
import { appwalletSGetRequest } from '../../redux/actions/AppWalletCustom';
import { Row,Col } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import { Toast } from "primereact/toast";
import CardComp from '../Common/Card';
import ProgressSpinnerComp from '../Common/ProgressSpinnerComp';
import "./tableres.css";
import axios from  'axios';
import jwt_decode from "jwt-decode";
interface Props {
    time:any;
    seller: any;
    fetchseller: (d) => void;
    sellerLoading:any;
    custssaw:any;
    sellershopsT:any;
    fetchCustS:(d:any)=>void;
    fetchsellershopst:(d:any)=>void;
  }

let SellerTableComp: React.FunctionComponent<Props> = props => {
    const [expandedRows, setExpandedRows] = useState<any>({});
    const toast: any = useRef(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const history = useHistory();
    const isMounted = useRef(false);
    useEffect(() => {
            let d = {sellerid:""}
            let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
            if (token != ""){
                var decoded:any = jwt_decode(token!);
                d={sellerid:decoded["userid"]}
            }
            props.fetchsellershopst(d)
            // props.fetchSTTs({status:"",entityid:Object.keys(expandedRows)[0],orderid:"",transid:""})

    }, []);
    useEffect(() => {
        if (isMounted.current) {
            let d = {sellerid:""}
            let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
            if (token != ""){
                var decoded:any = jwt_decode(token!);
                d={sellerid:decoded["userid"]}
            }
            props.fetchsellershopst(d)
            // props.fetchSTTs({status:"",entityid:Object.keys(expandedRows)[0],orderid:"",transid:""})
        }
    }, [expandedRows]);
    const dt:any = useRef(null);
    useEffect(() => {
        isMounted.current = true;
        var from=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-0"+(new Date().getDate()-1).toString()+"T00:00:00.000Z"
        if (props.time && props.time["name"] === "Today"){
            from = new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-0"+(new Date().getDate()-1).toString()+"T00:00:00.000Z"
        }   
        if (props.time && props.time["name"] === "This Month"){
            from =  new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+"01T00:00:00.000Z"
        }
        if (props.time && props.time["name"] === "Last 6 Month"){
            from = new Date().getFullYear().toString()+"-"+(new Date().getMonth()-6).toString()+"-"+"01T00:00:00.000Z"
        }
        const d = {status:"",stype:"",fr:from}
        props.fetchCustS(d)
    }, []);
    useEffect(() => {
        isMounted.current = true;
        var from=""
        if (props.time && props.time["name"] === "Today"){
            from = new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-0"+(new Date().getDate()-1).toString()+"T00:00:00.000Z"
        }   
        if (props.time && props.time["name"] === "This Month"){
            from =  new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+"01T00:00:00.000Z"
        }
        if (props.time && props.time["name"] === "Last 6 Month"){
            from = new Date().getFullYear().toString()+"-"+(new Date().getMonth()-6).toString()+"-"+"01T00:00:00.000Z"
        }
        const d = {status:"",stype:"",fr:from}
        props.fetchCustS(d)
    }, [props.time]);
    const onTypeChange = (e) => {
        setSelectedType(e.value);
        if (e.value ==='None'){
            const d = {status:"",stype:""}
            props.fetchseller(d)
        }else{
        const d = {status:"",stype:e.value}
        props.fetchseller(d)
        }

    }

    const types = [
        'Pharmacy', 'Grocery store', 'Restaurant', 'None'
    ];
    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 <span className="customFont1 cData">{rowData['name']}</span>
            </React.Fragment>
        );
    }
    const emailBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 <span className="customFont1 cData">{rowData['email']}</span>
            </React.Fragment>
        );
    }
    const phoneBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 <span className="customFont1 cData">{rowData['phone_number']}</span>
            </React.Fragment>
        );
    }

    const stypeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData && rowData['type'] && rowData['type'].length === 0 && <span className="shopType cData">No shop type selected</span>}
                {rowData && rowData['type'] && rowData['type'].length === 1 && <span className="shopType cData">{rowData['type'][0]['name']}</span>}
                {rowData && rowData['type'] && rowData['type'].length === 2 && <span className="shopType cData">{rowData['type'][0]['name']}, {rowData['type'][1]['name']}</span>}
                {rowData && rowData['type'] && rowData['type'].length === 3 && <span className="shopType cData">{rowData['type'][0]['name']}, {rowData['type'][1]['name']}, {rowData['type'][2]['name']}</span>}
            </React.Fragment>
        );
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData['profile_photo']} width={150} height={100}  style={{borderRadius:"10px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" />;
    }
    const reset = () => {
        setSelectedType(null);
        setGlobalFilter('');
        dt.current.reset();
    }

    const ShopName = (rowData) => {
        return <> 
        <span className="cData" style={{fontSize:"11px",fontWeight:650,color:"grey",textTransform:"capitalize"}}>{rowData["shop_name"]}</span>
        </>
    }
    const ShopType = (rowData) => {
        return <> 
        <span className="cData" style={{fontSize:"11px",fontWeight:650,color:"grey",textTransform:"capitalize"}}>{rowData["shop_type"]}</span>
        </>
    }
    const UsAmt = (rowData) => {
        return <> 
        <span className="cData" style={{fontSize:"11px",fontWeight:650,color:"#b74343",textTransform:"capitalize"}}>{rowData["unsettled_amount"]?rowData["unsettled_amount"]:"0"}</span>
        </>
    }
    const pAmt = (rowData) => {
        return <> 
        <span className="cData" style={{fontSize:"11px",fontWeight:650,color:"green",textTransform:"capitalize"}}>{rowData["settled_amount"]?rowData["settled_amount"]:"0"}</span>
        </>
    }
    const tAmt = (rowData) => {
        return <> 
        <span className="cData" style={{fontSize:"11px",fontWeight:650,color:"grey",textTransform:"capitalize"}}>{rowData["total_amount"]?rowData["total_amount"]:"0"}</span>
        </>
    }

    const btnAmt = (rowData) => {
        return <> 
<img src="https://img.icons8.com/office/30/000000/money--v1.png" onClick={()=>{history.push("/transactions/shop/"+rowData["entity_id"])}}/>
        </>
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                    <DataTable value={props.sellershopsT?.data.data}
                        emptyMessage={<p style={{color:"#c02929",textAlign:"center"}}>No records found</p>} dataKey="settelment_id" paginator rows={7}>
                    <Column header="Shop Logo" body={imageBodyTemplate} style={{textAlign:"center"}}/>
                    <Column field="shop_name" header="Shop Name" body={ShopName}/>
                    <Column field="shop_type" header="Shop type" body={ShopType}/>
                    <Column field="unsettled_amount" header="Unsettled amount" style={{fontSize:"12px",textAlign:"center"}} body={UsAmt}/>
                    <Column field="settled_amount" header="Paid amount" style={{fontSize:"12px",textAlign:"center"}} body={pAmt}/>
                    <Column field="total_amount" header="Total amount" style={{fontSize:"12px",textAlign:"center"}} body={tAmt}/>
                    </DataTable>

            </div>
        );
    }
    const header = (
        <div className="table-header">
            <div>
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            </div>
            <span className="p-input-icon-left">
            
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search"  style={{marginRight:"15px"}}/>
            </span>
        </div>
    );
       const typeFilter =  <Dropdown value={selectedType} options={types} onChange={onTypeChange} placeholder="Select a Type" className="p-column-filter" style={{maxWidth:"120px"}}/>
    return (
        <>
              <Toast ref={toast}></Toast>
        {props.sellershopsT?
        <div className="datatable-filter-demo datatable-responsive">
            {/* <div className="card">
                <DataTable ref={dt} value={props.custssaw?props.custssaw.data?props.custssaw.data?props.custssaw.data.data:[]:[]:[]} paginator rows={10} 
                    header={header} className="p-datatable-customers p-datatable-responsive"
                    globalFilter={globalFilter} emptyMessage="No seller found." expandedRows={expandedRows} dataKey="entity_id" onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}>
                    <Column expander style={{ width: '3em' }} />
                    <Column header="Profile photo" body={imageBodyTemplate} style={{textAlign:"center"}}/>
                    <Column field="email" header="Email id" body={emailBodyTemplate}/>
                    <Column field="name" header="Name" body={nameBodyTemplate}/>
                    <Column field="phone_number" header="Phone number" body={phoneBodyTemplate}/>
                    <Column field="type" header="Shop types" body={stypeBodyTemplate} filter filterElement={typeFilter}/>
                    {/* <Column field="settlement_percentage" header="Settlement percentage" style={{fontSize:"12px",textAlign:"center"}} body={SP}/> */}
                    {/* <Column field="drop_amount" header="Drop earnings" style={{fontSize:"12px",textAlign:"center",fontWeight:"bold"}}/>
                    <Column field="unsettled_amount" header="Unsettled earnings" style={{fontSize:"12px",textAlign:"center"}} body={UsAmt}/>
                    <Column field="settled_amount" header="Paid earnings" style={{fontSize:"12px",textAlign:"center"}} body={pAmt}/>
                    <Column field="total_amount" header="Total earnings" style={{fontSize:"12px",textAlign:"center"}} body={tAmt}/>
                </DataTable> */}
            {/* </div> */}
            <div className="orders-subtable">
                    <DataTable value={props.sellershopsT?.data.data}
                        emptyMessage={<p style={{color:"#c02929",textAlign:"center"}}>No records found</p>} dataKey="settelment_id" paginator rows={7}>
                    <Column header="Shop Logo" body={imageBodyTemplate} style={{textAlign:"center"}}/>
                    <Column field="shop_name" header="Shop Name" body={ShopName}/>
                    <Column field="shop_type" header="Shop type" body={ShopType}/>
                    <Column field="unsettled_amount" header="Unsettled amount" style={{fontSize:"12px",textAlign:"center"}} body={UsAmt}/>
                    <Column field="settled_amount" header="Settled amount" style={{fontSize:"12px",textAlign:"center"}} body={pAmt}/>
                    <Column field="total_amount" header="Total amount" style={{fontSize:"12px",textAlign:"center"}} body={tAmt}/>
                    <Column style={{width:"7rem"}} body={btnAmt}/>
                    </DataTable>

            </div>
        </div>:<ProgressSpinnerComp/>
}

</>
    );
}
const mapStateToProps = (state: any) => ({
    seller: state.seller.data,
    sellerLoading: state.seller.isLoading,
    custssaw:state.appwalletCustom.data,
    sellershopsT:state.sellerShop.data,
  })
const mapDispatchToProps = dispatch => ({
    fetchseller: (d:any) => { dispatch(sellerGetRequest(d)) },
    fetchsellershopst:(d:any) => { dispatch(sellerShopTGetRequest(d))},
    fetchCustS:(d:any) => {dispatch(appwalletSGetRequest(d))},
  });
export default SellerTableComp = connect(mapStateToProps, mapDispatchToProps)(SellerTableComp)

                 