import React,{useState} from 'react'
import {Row,Col, Container } from 'react-bootstrap';
import DCards from './CardsScreen';
import { BreadCrumb } from 'primereact/breadcrumb';
import { TabView, TabPanel } from 'primereact/tabview';
import SellerTableComp from "./BalanceForSellers";
import { Dropdown } from 'primereact/dropdown';
const AppTransScreen = () => {
    const items = [
        {label: 'App wallet'},
    ];
    const home = { icon: 'pi pi-home', url: '/dashboard' }
    const [activeIndex,setActiveIndex] = useState(0)
    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const cities = [
        { name: 'Today'},
        { name: 'This Month'},
        { name: 'Last 6 Month'}
    ];
    const onCityChange = (e: { value: any}) => {
        setSelectedCity1(e.value);
    }
    return (        
        <>

<Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
            <BreadCrumb model={items} home={home} />
            <div className="card" style={{float:"right"}}>
            <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select Time" />

            </div>
            <br/>
            <br/>
            <Row style={{marginBottom:"10px"}}><Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <DCards/>
            </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <TabView activeIndex={activeIndex} className="p-tabview-50" style={{borderRadius:"5px",textDecoration:"none"}} onTabChange={(e) => setActiveIndex(e.index)}>   
                    <TabPanel header="Sellers transactions">
                        <SellerTableComp time={selectedCity1}/>
                    </TabPanel>
                    
                </TabView>

                </Col>
            </Row>
        </Container>
        </>
    );
}
export default AppTransScreen;

