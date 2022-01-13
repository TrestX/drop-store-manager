import React from 'react'
import {Row,Col,Container } from 'react-bootstrap';
import DataTableRowExpansion from './TableComp';
import { BreadCrumb } from 'primereact/breadcrumb';
const UserScreen = () => {
    const items = [
        {label: 'Users'},
    ];

    const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (        
        <>
        <Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
            <BreadCrumb model={items} home={home} />
            <Row style={{marginBottom:"10px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <DataTableRowExpansion/>
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default UserScreen;