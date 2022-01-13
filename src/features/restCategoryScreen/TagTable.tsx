import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Row} from 'react-bootstrap';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { statuses, catss} from "./restCatContants";
import {ItemTagGetRequest,ItemTagDeleteRequest} from "../../redux/actions/itemCategoryAction";
import ProgressSpinnerComp from '../Common/ProgressSpinnerComp';
import "./SimpleTable.css";
interface Props {
    itemCats:any;
    deletecat:(d) =>void;
    fetchcats: (d) => void;
  }
let DataTableSortTag: React.FunctionComponent<Props> = props => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt:any = useRef(null);
    const [currentA,setCurrentA] = useState<any>()
    const [showRModal,setShowRModal] = useState(false);
    const [showDelModal,setShowDelModal] = useState(false);
    const menu:any = useRef(null);
    const items = [
        {
            label: 'Change status',
            icon: 'pi pi-user',
            command: () => {
                setShowRModal(true)
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-user',
            command: () => {
                setShowDelModal(true);
            }
        },
    ];
    useEffect(() => {
        props.fetchcats({"type":""});
    }, [])
    const onStatusChange = (e) => {
        dt.current.filter(e.value, 'status', 'equals');
        setSelectedStatus(e.value);
    }
    const onCatChange = (e) => {
        dt.current.filter(e.value, 'shop_type', 'equals');
        setSelectedCat(e.value);
    }
    const reset = () => {
        setSelectedStatus(null);
        setGlobalFilter('');
        dt.current.reset();
    }

    const statusItemTemplate = (option) => {
        return <span className="customFont1">{option}</span>;
    }
    const catItemTemplate = (option) => {
        return <span className="customFont1">{option}</span>;
    }
    const actionTemplate = (rowData) => {
        return <><Menu model={items} popup ref={menu} id="popup_menu" /><img src="https://img.icons8.com/fluency/27/000000/menu-2.png" onClick={(event) => {menu['current'].toggle(event);setCurrentA(rowData);}}/></>
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
    const statusFilter = <Dropdown value={selectedStatus} options={statuses} onChange={onStatusChange} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter filterWidth" showClear />;
    const catFilter = <Dropdown value={selectedCat} options={catss} onChange={onCatChange} itemTemplate={catItemTemplate} placeholder="Select a Category" className="p-column-filter filterWidth" showClear />;

    const changeStatus = (rowData:any,status:string) => { 
        const body = {
            "status":status,
            "id":rowData["banner_id"]
        }
        setShowRModal(false)
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.presignedurl} width={180} height={100} style={{objectFit:"fill",borderRadius:"10px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image}/>;
    }
    const statusTemplate = (rowData) => {
        return <>{rowData.status === "Active" && <>
        <span className="activeStatus cData">Active</span></>}
        {rowData.status === "Not Active" && <>
        <span className="notActiveStatus cData">Not Active</span></>}
    </>;
    }
    const nameTemplate = (rowData) => {
        if (rowData["tag_name"]!==undefined && rowData["tag_name"] !== null){
            return <>
            <span className="customFont2 cData">{rowData['tag_name']}</span>
            </> ;
        }
        return <>
        <span className="serverError cData">server error</span>
        </>;
    }
    const catTemplate = (rowData) => {
        if (rowData["shop_type"]!==undefined && rowData["shop_type"] !== null){
            return <>
            <span className="customFont2 cData">{rowData['shop_type']}</span>
            </> ;
        }
        return <>
        <span className="serverError cData">server error</span>
        </>;
    }
    const deleteCatDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={()=>{setShowDelModal(false)}} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={()=>{props.deletecat({id:currentA['category_id']})}} />
        </>
    );
    return (
        props.itemCats ?
        <div className="datatable-responsive">
            <div className="card tableCard" >
                <DataTable ref={dt} value={props.itemCats.data?props.itemCats.data.data:[]} className="p-datatable-responsive" globalFilter={globalFilter} header={header} paginator rows={7}>
                    <Column field="tag_name" header="Name" body={nameTemplate} sortable></Column>
                    <Column field="shop_type" header="Shop Type" body={catTemplate} sortable filter filterElement={catFilter}></Column>
                    <Column field="status" header="Status" body={statusTemplate} style={{textAlign:"center"}} filter filterElement={statusFilter}></Column>
                </DataTable>
            </div>   
            <Dialog header="Update account status" visible={showRModal} className="dialogSize" onHide={()=>{setShowRModal(false)}}>
                <Row >
                <div className="dialogCss">
                        {currentA && currentA.status === "Active" && <><h1 className="dialogText">Current status: <span className="activeStatus">Active</span> <br/><br/><Dropdown value={currentA.status} options={statuses} onChange={()=>{changeStatus(currentA,"Not Active")}} style={{minWidth:"100%"}}/> </h1></>}
                        {currentA && currentA.status === "Not Active" && <h1 className="dialogText">Current status: <span className="notActiveStatus">Not Active</span> <br/><br/> <Dropdown value={currentA.status} options={statuses} onChange={()=>{changeStatus(currentA,"Active")}} style={{minWidth:"100%"}}/></h1>}
                </div>
                </Row>
            </Dialog> 

            <Dialog header="Delete category" visible={showDelModal} className="dialogSize" modal footer={deleteCatDialogFooter} onHide={()=>{setShowDelModal(false)}}>
                <Row >
                <div className="dialogCss">
                <span>
                                        Are you sure you want to delete <b>{currentA && currentA['tag_name']}</b> tag?
                                    </span>
                </div>
                </Row>
            </Dialog> 
        </div>:<ProgressSpinnerComp/>
    );
}
const mapStateToProps = (state: any) => ({
    itemCats: state.itemCat.data
  })
const mapDispatchToProps = dispatch => ({
    fetchcats: (d) => { dispatch(ItemTagGetRequest(d)) },
    deletecat:(d)=>{dispatch(ItemTagDeleteRequest(d))}
  });
export default DataTableSortTag = connect(mapStateToProps, mapDispatchToProps)(DataTableSortTag)