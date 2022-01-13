import React, { useEffect } from 'react'
import {Container } from 'react-bootstrap';
import { TabView, TabPanel } from 'primereact/tabview';
import ItemComp from './itemTable';
import ItemLayout from './addItems';
import { BreadCrumb } from 'primereact/breadcrumb';
const ItemScreen = () => {
    const items = [
        {label: 'Items'},
    ];
    const items1 = [
        {label: `${sessionStorage.getItem("shopName")?sessionStorage.getItem("shopName"):""}`,url: '/shop'},
        {label: 'Items'},
    ];
    const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (        
        <>
        <Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
        {window.location.href.split('/')[window.location.href.split('/').length-1]!=='items' && <BreadCrumb model={items1} home={home} />}
        {window.location.href.split('/')[window.location.href.split('/').length-1]==='items' && <BreadCrumb model={items} home={home} />}
            <TabView className="p-tabview-50" style={{borderRadius:"5px",textDecoration:"none"}}>
                {(sessionStorage.getItem("role")==="Admin" || sessionStorage.getItem("role")==="Admin Support")  && <TabPanel header={<img src="https://img.icons8.com/cotton/25/000000/market--v1.png" style={{width:"25px"}}/>}>
                    <ItemComp sId={""}/> 
                </TabPanel>}
                {sessionStorage.getItem("role")==="Admin" && <TabPanel header={<i className="pi pi-plus-circle" style={{color:"#fe385c",fontSize:"25px"}}></i>}>
                <ItemLayout/>
                </TabPanel>}
            </TabView>      
        </Container>
        </>
    );
}
export default ItemScreen;