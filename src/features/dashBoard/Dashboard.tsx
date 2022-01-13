import { Row,Col,Container } from 'react-bootstrap';
import DCards from './DCards';
import DTCard from './DTCard';
import SHCard from './SHCard';
import MLineCharts from '../Common/MultipleLineChart';
import TieredMenu from '../Common/TimeLine';
import SMCard from './LocList';
import { Calendar } from 'primereact/calendar';
import { BreadCrumb } from 'primereact/breadcrumb';
import {useState} from 'react';
const Dashboard = () => {
    const items = [
    ];
    const home = { icon: 'pi pi-home', url: '/dashboard' }

    return (        
        <>
        <Container fluid style={{marginTop:"80px",padding:"20px",maxWidth:"90%",objectFit:"contain",display:"block"}}>
        {/* <BreadCrumb home={home} /> */}
            <DCards/>
            <Row style={{marginBottom:"20px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <SMCard/>
                </Col>
            </Row>
            <Row style={{marginBottom:"20px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={6}>

                    <MLineCharts label1={"New Orders"} label2={"Completed Orders"} data1={[65, 59, 80, 81, 56, 55, 40]} data2={[28, 48, 40, 19, 86, 27, 90]} color1={'rgb(148, 209, 252,0.2)'}  color2={'rgb(239, 144, 19, 0.2)'}/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                    <MLineCharts label1={"Total Earnings"} label2={"Earning this month"} data1={[115, 29, 110, 44, 56, 55, 90]} data2={[218, 148, 140, 19, 86, 27, 190]} color1={'rgb(242, 101, 101,0.2)'}  color2={'rgb(249, 174, 219, 0.2)'}/>
                </Col>
            </Row>
            <Row style={{marginBottom:"10px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SHCard/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                    
                    
                </Col>
            </Row>

            
        </Container>
        </>
    );
}
export default Dashboard;