import FileUploadComp  from './FileUpload';
import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams

} from "react-router-dom";
import MLineCharts from '../Common/MultipleLineChart';
import TieredMenu from '../Common/TimeLine';
import { TabView, TabPanel } from 'primereact/tabview';
import DataTableSort from './SimpleTable';
import { BreadCrumb } from 'primereact/breadcrumb';
const BannerScreen = () => {
    const items = [
        {label:"Banners"},
      ];
      const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (        
        <>
    <Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
    <BreadCrumb model={items} home={home} />
            <Row style={{marginBottom:"10px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TabView className="p-tabview-50" style={{borderRadius:"5px"}}>
                     {(sessionStorage.getItem("role")==="Admin" || sessionStorage.getItem("role")==="Admin Support") &&  <TabPanel header={<img src="https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/000000/external-banner-chinese-new-year-photo3ideastudio-lineal-photo3ideastudio.png" style={{width:"25px"}}/>}>
                            <DataTableSort/>    
                        </TabPanel>}
                       {(sessionStorage.getItem("role")==="Admin")  && <TabPanel header={<i className="pi pi-plus-circle" style={{color:"#2d88ff",fontSize:"25px"}}></i>}>
                             <h5 style={{fontSize:"17px",fontWeight:700,margin:"7px 7px 14px 0px",fontFamily:"sans-serif"}}>Upload banner</h5>
                            <FileUploadComp/>
                        </TabPanel>}
                    </TabView>                   
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default BannerScreen;