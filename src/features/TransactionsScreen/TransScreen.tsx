import React from 'react'
import {Row,Col, Container } from 'react-bootstrap';
import DataTableRowExpansion from './TableComp';
import { BreadCrumb } from 'primereact/breadcrumb';
const TransScreen = () => {
    const items = [
        {label: 'Transactions'},
    ];
    const items1 = [
        {label: 'Users',url: '/users'},
        {label: 'Transactions'},
    ];
    const items2 = [
        {label: 'Shops',url: '/shop'},
        {label: 'Transactions'},
    ];
    const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (        
        <>

<Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
            {window.location.href.split('/')[window.location.href.split('/').length-1] ==='transactions' && <BreadCrumb model={items} home={home} />}
        {window.location.href.split('/')[window.location.href.split('/').length-1] !=='transactions' && window.location.href.split('/')[window.location.href.split('/').length-1] ==='shop' && <BreadCrumb model={items2} home={home} />}
            <Row style={{marginBottom:"10px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <DataTableRowExpansion/>
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default TransScreen;