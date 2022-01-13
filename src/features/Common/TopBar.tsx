import React, { useState,useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Menubar } from 'primereact/menubar';
import SideBar from './SideBar';
import classNames from 'classnames';
import DropdownSelect from './Select';
import CardComp from './Card';
import { InputText } from 'primereact/inputtext';
import DataTableRowExpansion from '../UsersScreen/TableComp';
import {useHistory} from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import jwt_decode from "jwt-decode";

const TopBar = () => {
    const [sideBar, setSideBar] = useState(false)
    const [openProfile,setProfile] = useState(false)
    const [openSettings,setSettings] = useState(false)
    const [email, setEmail] = useState("")
    useEffect(()=>{
        var tok:any = sessionStorage.getItem("token")
        let decode:any = jwt_decode(tok)
        setEmail(decode['email'])
    },[])
    const history = useHistory();
    const options = [
        { name: 'Profile', code: 'Profile' },
        { name: 'Settings', code: 'Settings' },
        { name: 'Log out', code: 'Log out'}
    ]
    const start = <img src="assets/drop.png" style={{width:'50px',marginLeft:'50px'}}/>;
    const end =               <ul style={{display:'inline'}}>
                    {/* <li style={{display:'inline'}}>
                        <button className="p-link layout-topbar-button" onClick={()=>{setSettings(true)}} >
                            <i className="pi pi-cog"  style={{fontSize:'25px',color:'#fe385c'}}/>
                        </button>
                    </li> */}
                    <li style={{display:'inline',marginLeft:'25px'}}>
                        <button className="p-link layout-topbar-button" onClick={()=>{setProfile(true)}}>
                            <i className="pi pi-user" style={{fontSize:'25px',color:'#fe385c'}}/>
                        </button>
                    </li>
                    <li style={{display:'inline',marginLeft:'25px'}}>
                        <button className="p-link layout-topbar-button" onClick={()=>{sessionStorage.clear();window.location.href="/";window.location.reload()}}>
                            <i className="pi pi-sign-out"  style={{fontSize:'25px',color:'#fe385c'}}/>
                        </button>
                    </li>
                </ul>
    return (
        <div style={{ minWidth: "100%", margin: 0, padding: 0 }}>
            <div className="card" >
                <Menubar start={start} end={end} style={{ zIndex: 1011, position: "fixed", minWidth: "100%" }} />
            </div>
            <Dialog visible={openProfile} style={{ width: "450px" }} header="Admin Profile" modal  onHide={()=>{setProfile(false)}}>
                <div className="flex align-items-center justify-content-left">
                    <i className="pi pi-user mr-3" style={{ fontSize: "2rem" }} />
                        <h1 style={{fontSize: "1rem",fontWeight:600}}>Email:  <span style={{fontSize:"0.9rem",fontWeight:500}}>
                        {email}
                        </span>
                        </h1><br/>
                </div>
                <div className="flex align-items-center justify-content-left">
                <i className="pi pi-id-card mr-3" style={{ fontSize: "2rem" }} />
                        <h1 style={{fontSize: "1rem",fontWeight:600}}>Last login:  <span style={{fontSize:"0.9rem",fontWeight:500}}>
                            {new Date().getDate()}/{new Date().getMonth()+1}/{new Date().getFullYear()} at {new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}
                            
                        </span>
                        </h1>
                </div>
            </Dialog>
            <Dialog visible={openSettings} style={{ width: "450px" }} header="Admin Settings" modal  onHide={()=>{setSettings(false)}}>

                <div className="flex align-items-center justify-content-left">
                        <h1 style={{fontSize: "1rem",fontWeight:600}}>Current Password:<br/><br/><InputText id="settings" type="password" onChange={(e)=>{}} style={{marginLeft:"auto",marginRight:"auto",display:"flex",marginBottom:"12px",minWidth:"100%"}}/>
                        </h1>
                </div>
                <div className="flex align-items-center justify-content-left">
                        <h1 style={{fontSize: "1rem",fontWeight:600}}>New Password:<br/><br/><InputText id="settings" type="password" onChange={(e)=>{}} style={{marginLeft:"auto",marginRight:"auto",display:"flex",marginBottom:"12px",minWidth:"100%"}}/>
                        </h1>
                </div>
                <div className="flex align-items-center justify-content-left">
                        <h1 style={{fontSize: "1rem",fontWeight:600}}>Confirm Current Password:<br/><br/><InputText id="settings" type="password" onChange={(e)=>{}} style={{marginLeft:"auto",marginRight:"auto",display:"flex",marginBottom:"12px",minWidth:"100%"}}/>
                        </h1>
                </div>
                <div className="flex align-items-center justify-content-center">
                <Button label="Change Password" icon="pi pi-user" className="p-button-info"  style={{marginLeft:"auto",marginRight:"auto",display:"flex",marginBottom:"12px",width:"100%"}}/>
                </div>
                
            </Dialog>
        </div>
    );
}

export default TopBar;