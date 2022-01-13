import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { categoryGetRequest,categoryPUTRequest } from '../../redux/actions/CategoryAction';
import { Button } from 'primereact/button';
import ProgressSpinnerComp from '../Common/ProgressSpinnerComp';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Row } from 'react-bootstrap';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import './CategoryTable.css';
import {catss,statuses,subDeals} from './CategoryConstants';

interface Props {
    categories: any;
    fetchcategories: (d) => void;
    putcategories: (data) => void;
  }
let CategoryTable: React.FunctionComponent<Props> = props => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedSD, setSelectedSD] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedCat, setSelectedCat] = useState(null);
    const dt:any = useRef(null);
    const [currentA,setCurrentA] = useState<any>()
    const [showRModal,setShowRModal] = useState(false);
    const menu:any = useRef(null);
    const items = [
        {
            label: 'Change status',
            icon: 'pi pi-user',
            command: () => {
                setShowRModal(true)
            }
        },
    ];
    useEffect(() => {
        const d = {type:""}
      props.fetchcategories(d)
    }, [])
    const changeStatus = (rowData:any,status:string) => { 
        const body = {
            "status":status,
            "id":rowData["category_id"]
        }
        props.putcategories(body)
        setShowRModal(false)
    }
    const onCatChange = (e) => {
        dt.current.filter(e.value, 'type', 'equals');
        setSelectedCat(e.value);
    }
    const onDealChange = (e) => {
        dt.current.filter(e.value, 'deal', 'equals');
        setSelectedSD(e.value);
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.presignedurl} width={150} height={100}  style={{objectFit:"contain",borderRadius:"10px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image cData" />;
    }
    const actionTemplate = (rowData) => {
        return <><Menu model={items} popup ref={menu} id="popup_menu" /><img src="https://img.icons8.com/fluency/27/000000/menu-2.png" onClick={(event) => {menu['current'].toggle(event);setCurrentA(rowData);}}/></>
    }
    const catItemTemplate = (option) => {
        return <span className="customFont">{option}</span>;
    }
    const statusTemplate = (rowData) => {
        return <>{rowData.status === "Active" && <> 
        <span className="activeStatus cData">Active</span></>}
        {rowData.status === "Not Active" && <> 
        <span className="notActiveStatus cData">Not Active</span></>}
    </>;
    }
    const shopTypeTemplate = (rowData) => {
        if (rowData["type"]!==undefined && rowData["type"] !== null){
            return <> 
            <span className="customFont cData">{rowData['type']}</span></>;
        }
        return <> 
        <span className="serverError cData">server error</span></>;
    }
    const dealTypeTemplate = (rowData) => {
        if (rowData["deal"]!==undefined && rowData["deal"] !== null){
            return <> 
            <span className="customFont cData">{rowData['deal']}</span></> ;
        }
        return <> 
        <span className="serverError cData">server error</span></>;
    }
    const onStatusChange = (e) => {
        dt.current.filter(e.value, 'status', 'equals');
        setSelectedStatus(e.value);
    }
    const reset = () => {
        setSelectedStatus(null);
        setGlobalFilter('');
        dt.current.reset();
    }
    const statusItemTemplate = (option) => {
        return <span className="customFont">{option}</span>;
    }
    const dealItemTemplate = (option) => {
        return <span className="customFont">{option}</span>;
    }
    const header = (
        <div className="table-header">
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <span className="p-input-icon-left" style={{float: 'right'}}>
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
            </span>
        </div>
    );
    const dealFilter = <Dropdown value={selectedSD} options={subDeals} onChange={onDealChange} itemTemplate={dealItemTemplate} placeholder="Select a Deal" className="p-column-filter filterWidth" showClear />;
    const statusFilter = <Dropdown value={selectedStatus} options={statuses} onChange={onStatusChange} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter filterWidth" showClear />;
    const catFilter = <Dropdown value={selectedCat} options={catss} onChange={onCatChange} itemTemplate={catItemTemplate} placeholder="Select a Category" className="p-column-filter filterWidth" showClear />;
    return (
        props.categories ?
        <div className="datatable-responsive">
            <div className="card tableCard" >
                <DataTable ref={dt} value={props.categories.data} className="p-datatable-responsive" globalFilter={globalFilter} header={header}  paginator rows={7}>
                    <Column field="type" header="Seller type" body={shopTypeTemplate} style={{textAlign:"center"}} filter filterElement={catFilter}/>
                    <Column field="deal" header="Deal" body={dealTypeTemplate} style={{textAlign:"center"}} filter />
                    <Column field="deal_type" header="Deal Type" style={{textAlign:"center",fontSize:"13px"}} filter filterElement={dealFilter}/>
                    <Column header="Image" body={imageBodyTemplate} style={{textAlign:"center"}}/>
                    <Column field="status" header="Status" body={statusTemplate} style={{textAlign:"center"}} filter filterElement={statusFilter}></Column>
                    <Column style={{width:'7em'}} body={actionTemplate}/>
                </DataTable>
            </div>    
            <Dialog header="Update account status" visible={showRModal} className="dialogSize" onHide={()=>{setShowRModal(false)}}>
                <Row >
                    <div className="dialogCss">
                        {currentA && currentA.status === "Active" && <><h1 className="customFont2">Current status: <span className="activeStatus">Active</span> <br/><br/><Dropdown value={currentA.status} options={statuses} onChange={()=>{changeStatus(currentA,"Not Active")}} style={{minWidth:"100%"}}/> </h1></>}
                        {currentA && currentA.status === "Not Active" && <h1 className="customFont2">Current status: <span className="notActiveStatus">Not Active</span> <br/><br/> <Dropdown value={currentA.status} options={statuses} onChange={()=>{changeStatus(currentA,"Active")}} style={{minWidth:"100%"}}/></h1>}
                    </div>
                </Row>
            </Dialog> 
        </div>:<ProgressSpinnerComp/>
    );
}

const mapStateToProps = (state: any) => ({
    categories: state.category.data
  })
const mapDispatchToProps = dispatch => ({
    fetchcategories: (d:any) => { dispatch(categoryGetRequest(d)) },
    putcategories: (data:any) => { dispatch(categoryPUTRequest(data)) }
  });
export default CategoryTable= connect(mapStateToProps, mapDispatchToProps)(CategoryTable)