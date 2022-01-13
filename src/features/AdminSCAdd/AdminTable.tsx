import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Card, Row, Col,Modal,ModalBody } from 'react-bootstrap';
import { Menu } from 'primereact/menu';
import './Admin.css';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
interface Props {
  }
let AcctTable: React.FunctionComponent<Props> = props => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt:any = useRef(null);
    const statuses = [
        'Active', 'Not Active'
    ];
    const roles = [
        'Admin', 'Admin Support','Customer Support'
    ];
    const [currentA,setCurrentA] = useState<any>()
    const [showRModal, setShowRModal] = useState(false);
    const [showSModal,setShowSModal] = useState(false);
    const [accts,setAccts] = useState([])
    const menu:any = useRef(null);
    const items = [
        // {
        //     label: 'Change role',
        //     icon: 'pi pi-user-edit',
        //     command: () => {
        //         setShowSModal(true);
        //     }
        // },
        {
            label: 'Change status',
            icon: 'pi pi-user',
            command: () => {
                setShowRModal(true)
            }
        },
    ];
    useEffect(() => {
        let token = sessionStorage.getItem("token")
        axios({
            method: 'get',
            url: 'https://api.drop-deliveryapp.com/docker2/admin/accts/sellers',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.data) {
                setAccts(response.data.data)
                console.log(response.data.data)
            }
        });
    }, [showRModal,showSModal])
    const changeStatus = (rowData:any,status:string) => { 
        const body = {
            "status":status,
            "id":rowData["user_id"]
        }
        let token = sessionStorage.getItem("token")
        axios({
            method: 'put',
            url: 'https://api.drop-deliveryapp.com/docker2/admin/acct/'+rowData["user_id"],
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data:body
        }).then((response) => {
            if (response.data) {
                setShowRModal(false)
            }
        });
 

    }
    const changeRole = (rowData:any,role:any) => { 
        const body = {
            "role":role.value,
            "id":rowData["user_id"]
        }
        let token = sessionStorage.getItem("token")
        axios({
            method: 'put',
            url: 'https://api.drop-deliveryapp.com/docker2/admin/acct/'+rowData["user_id"],
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data:body
        }).then((response) => {
            if (response.data) {
                setShowSModal(false)
            }
        });
 
    }
    const statusTemplate = (rowData) => {
        return <>{rowData.status === "Active" && <h1 style={{fontSize:"13.6px",fontWeight:600,color:"green"}}>Active</h1>}
            {rowData.status === "Not Active" && <h1 style={{fontSize:"13.6px",fontWeight:600,color:"#aa0d0d"}}>Not Active</h1>}
        </>;
    }

    const nameTemplate = (rowData) => {
        if (rowData["name"]!==undefined && rowData["name"] !== null){
            return <h1 style={{fontSize:"13.6px",fontWeight:600,textTransform:"capitalize"}}>{rowData['name']}</h1> ;
        }
        return <h1 style={{fontSize:"13.6px",fontWeight:600,color:"#bf1a1a"}}>server error</h1>;
    }
    const emailTemplate = (rowData) =>{
        return <h1 style={{ fontSize: "13.1px",fontWeight:650,textTransform:"capitalize",color:"#595959"}}>{rowData.email}</h1>
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
    const roleTemplate = (rowData) => {
        const s = rowData.role
        return (
            <React.Fragment>
                <h1 style={{fontSize:"13.6px",fontWeight:600,textTransform:"capitalize"}}>{rowData['role'].split(",").map((data)=><h1 style={{fontSize:"13.6px",fontWeight:600,textTransform:"capitalize"}}>{data}</h1>)}</h1>
                {/* <Dropdown value={s} options={roles} onChange={(e)=>{changeRole(rowData,e)}} className="p-column-filter" style={{minWidth:"100%"}}/> */}
            </React.Fragment>
        );
    }
    const statusItemTemplate = (option) => {
        return <span style={{fontSize:"14px",fontWeight:600,textTransform:'capitalize'}}>{option}</span>;
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
    const statusFilter = <Dropdown value={selectedStatus} options={statuses} onChange={onStatusChange} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear style={{width:"127px"}}/>;
    const actionTemplate = (rowData) => {
            return <><Menu model={items} popup ref={menu} id="popup_menu" /><img src="https://img.icons8.com/fluency/27/000000/menu-2.png" onClick={(event) => {menu['current'].toggle(event);setCurrentA(rowData);}}/></>
    }
    return (
        <>
        {accts?
        <div>
            <div className="card" style={{backgroundColor:"white",border:"none"}}>
                <h5 style={{padding:"22px 22px 20px 22px",fontSize:"19px",fontWeight:555}}>Accounts</h5>
                <DataTable ref={dt} value={accts} globalFilter={globalFilter} header={header} style={{padding:"0px 11px 11px 11px",backgroundColor:"white"}} paginator rows={7}>
                    <Column field="name" header="Name" body={nameTemplate}></Column>
                    <Column field="email" header="Email" body={emailTemplate}/>
                    <Column header="Shops" body={roleTemplate} style={{textAlign:"center"}}/>
                    <Column field="status" header="Status" body={statusTemplate} style={{textAlign:"center"}} filter filterElement={statusFilter}></Column>
                    <Column style={{width:'7em'}} body={actionTemplate}/>
                </DataTable>
            </div>    
            <Dialog header="Update account status" visible={showRModal} style={{ width: '20vw' }} onHide={()=>{setShowRModal(false)}}>
            <Row style={{padding:"30px"}}>
                    {currentA && currentA.status === "Active" && <><h1 style={{fontSize:"15px",fontWeight:600}}>Current status: <span style={{fontSize:"13.6px",fontWeight:600,color:"green"}}>Active</span> <br/><br/><Dropdown value={currentA.status} options={statuses} onChange={()=>{changeStatus(currentA,"Not Active")}} style={{minWidth:"100%"}}/> </h1></>}
            {currentA && currentA.status === "Not Active" && <h1 style={{fontSize:"15px",fontWeight:600}}>Current status: <span style={{fontSize:"13.6px",fontWeight:600,color:"#aa0d0d"}}>Not Active</span> <br/><br/> <Dropdown value={currentA.status} options={statuses} onChange={()=>{changeStatus(currentA,"Active")}} style={{minWidth:"100%"}}/></h1>}
                        </Row>
                </Dialog>
            {/* <Modal show={showRModal} onHide={()=>{setShowRModal(false)}} backdrop="static" size={'sm'}>
            <Modal.Header closeButton style={{border:"none",fontSize:"16.7px",fontWeight:700,marginLeft:"7px"}}>Update account status</Modal.Header>
                <ModalBody>
                    <Row style={{padding:"30px"}}>
                    {currentA && currentA.status === "Active" && <h1 style={{fontSize:"15px",fontWeight:600}}>Current status: <Button label="Active" className="p-button-raised p-button-success" onClick={()=>{changeStatus(currentA,"Not Active")}} style={{marginTop:"15px"}}/></h1>}
            {currentA && currentA.status === "Not Active" && <h1 style={{fontSize:"15px",fontWeight:600}}>Current status:  <Button label="Deactive" className="p-button-raised p-button-danger" onClick={()=>{changeStatus(currentA,"Active")}} style={{marginTop:"15px"}}/></h1>}
                        </Row>
                </ModalBody>
            </Modal> */}
                        <Dialog header="Change role" visible={showSModal} style={{ width: '30vw' }} onHide={()=>{setShowSModal(false)}}>
                            <Row style={{padding:"30px"}}>
                                {currentA && <Dropdown value={currentA.role} options={roles} onChange={(e)=>{changeRole(currentA,e)}} style={{minWidth:"100%"}}/>}
                            </Row>
                </Dialog>
            {/* <Modal show={showSModal} onHide={()=>{setShowSModal(false)}} backdrop="static" size={'lg'}>
                <Modal.Header closeButton style={{border:"none",fontSize:"16.7px",fontWeight:700,marginLeft:"7px"}}>Change role</Modal.Header>
                <ModalBody>
                    <Row style={{padding:"30px"}}>
                        {currentA && <Dropdown value={currentA.role} options={roles} onChange={(e)=>{changeRole(currentA,e)}} style={{minWidth:"100%"}}/>}
                    </Row>
                </ModalBody>
            </Modal> */}
        </div>:<ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1" animationDuration=".5s"/>}
        </>
    );
}

const mapStateToProps = (state: any) => ({
  })
const mapDispatchToProps = dispatch => ({
  });
export default AcctTable= connect(mapStateToProps, mapDispatchToProps)(AcctTable)