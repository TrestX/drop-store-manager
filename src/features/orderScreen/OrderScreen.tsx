import React from 'react'
import {Row,Col, Button,Container } from 'react-bootstrap';
import DataTableRowExpansion from './TableComp';
import OrderCompCards from './OrderCompCards';
import { TabView, TabPanel } from 'primereact/tabview';
import NewOrderCompCards from './NewOrderCompCard';
import PickUpOrderCompCards from './PickUpOrderCopm';
import OrderDeliveredCompCards from './OrderDelivered';
import { BreadCrumb } from 'primereact/breadcrumb';
const OrderScreen = () => {
    const items = [
        {label: 'Orders'},
    ];
    const items1 = [
        {label: 'Shops',url: '/shop'},
        {label: 'Orders'},
    ];
    const items2 = [
        {label: 'Users',url: '/users'},
        {label: 'Orders'},
    ];
    const items3 = [
        {label: 'Delivery',url: '/delivery'},
        {label: 'Orders'},
    ];
    const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (        
        <>
        <Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
        {window.location.href.split('/')[window.location.href.split('/').length-1]==='order' && <BreadCrumb model={items} home={home} />}
        {window.location.href.split('/')[window.location.href.split('/').length-1]!=='order' && window.location.href.split('/')[window.location.href.split('/').length-2] ==='shop' && <BreadCrumb model={items1} home={home} />}
        {window.location.href.split('/')[window.location.href.split('/').length-1]!=='order' && window.location.href.split('/')[window.location.href.split('/').length-2] ==='delivery' && <BreadCrumb model={items3} home={home} />}
        {window.location.href.split('/')[window.location.href.split('/').length-1]!=='order' && window.location.href.split('/')[window.location.href.split('/').length-2] ==='user' && <BreadCrumb model={items2} home={home} />}
            {/*<Row style={{marginBottom:"10px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row>
                    <Button style={{backgroundColor:"transparent",borderColor:"grey",color:"#c9361c",margin:"10px 20px 20px 20px"}}>New orders</Button>
                    <Button style={{backgroundColor:"transparent",borderColor:"grey",color:"#c9361c",margin:"10px 20px 20px 0px"}}>Preparing</Button>
                    </Row>
                    <OrderCompCards/>
                    <NewOrderCompCards/>
                </Col>
    </Row>*/}
                        <DataTableRowExpansion/>
   
        </Container>
        </>
    );
}
export default OrderScreen;