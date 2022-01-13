import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { bannerGetRequest,bannerPUTRequest } from '../../redux/actions/BannerAction';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Row} from 'react-bootstrap';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { statuses, catss} from "./bannerContants";
import ProgressSpinnerComp from '../Common/ProgressSpinnerComp';
import "./SimpleTable.css";
interface Props {
    banners: any;
    fetchbanners: () => void;
    putbanners: (data) => void;
  }
let DataTableSort: React.FunctionComponent<Props> = props => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
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
      props.fetchbanners()
    }, [])
    const onStatusChange = (e) => {
        dt.current.filter(e.value, 'status', 'equals');
        setSelectedStatus(e.value);
    }
    const onCatChange = (e) => {
        dt.current.filter(e.value, 'category', 'equals');
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
        props.putbanners(body)
        setShowRModal(false)
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.presignedurl} width={150} height={100} style={{objectFit:"contain",borderRadius:"10px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image cData" />;
    }
    const statusTemplate = (rowData) => {
        return <>{rowData.status === "Active" && <>
        <span className="activeStatus cData">Active</span></>}
        {rowData.status === "Not Active" && <>
        <span className="notActiveStatus cData">Not Active</span></>}
    </>;
    }
    const nameTemplate = (rowData) => {
        if (rowData["name"]!==undefined && rowData["name"] !== null){
            return <>
            <span className="customFont2 cData">{rowData['name']}</span>
            </> ;
        }
        return <>
        <span className="serverError cData">server error</span>
        </>;
    }
    const catTemplate = (rowData) => {
        if (rowData["category"]!==undefined && rowData["category"] !== null){
            return <>
            <span className="customFont2 cData">{rowData['category']}</span>
            </> ;
        }
        return <>
        <span className="serverError cData">server error</span>
        </>;
    }
    const shopNameTemplate = (rowData) => {
        if (rowData["shop"]!==undefined && rowData["shop"] !== null && rowData['shop']!==""){
            return <> 
            <span className="customFont2 cData">{rowData['shop']}</span>
            </> ;
        }
        if (rowData["category"]!==undefined && rowData["category"] !== null && rowData['category']==='General'){
            return <>
        <span className="customFont2 cData">Banner for App</span>
        </> ;
        }
        return <>
        <span className="serverError cData">shop name doesnot exist</span>
        </>;
    }
    const dimensionTemplate = (rowData) => {
        if (rowData["dimensions"]!==undefined && rowData["dimensions"] !== null && rowData['dimensions']!==""){
            return <> 
            <span className="customFont2 cData">{rowData['dimensions']}</span>
            </> ;
        }
        return <> 
        <span className="serverError cData">server error</span>
        </>;
    }
    return (
        props.banners ?
        <div className="datatable-responsive">
            <div className="card tableCard" >
                <DataTable ref={dt} value={props.banners.data} className="p-datatable-responsive" globalFilter={globalFilter} header={header} paginator rows={7}>
                    <Column field="name" header="Name" body={nameTemplate} sortable></Column>
                    <Column field="category" header="Page" body={catTemplate} sortable filter filterElement={catFilter}></Column>
                    <Column field="shop_name" header="Shop name" body={shopNameTemplate} sortable></Column>
                    <Column header="Image" body={imageBodyTemplate} style={{textAlign:"center"}}/>
                    <Column field="dimensions" header="Dimensions" body={dimensionTemplate} sortable></Column>
                    <Column field="status" header="Status" body={statusTemplate} style={{textAlign:"center"}} filter filterElement={statusFilter}></Column>
                    <Column style={{width:'7em'}} body={actionTemplate}/>
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
        </div>:<ProgressSpinnerComp/>
    );
}
const mapStateToProps = (state: any) => ({
    banners: state.banner.data
  })
const mapDispatchToProps = dispatch => ({
    fetchbanners: () => { dispatch(bannerGetRequest()) },
    putbanners: (data:any) => { dispatch(bannerPUTRequest(data)) }
  });
export default DataTableSort = connect(mapStateToProps, mapDispatchToProps)(DataTableSort)