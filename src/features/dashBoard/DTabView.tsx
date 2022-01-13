import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams

} from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import DataTableRowExpansion from '../UsersScreen/TableComp';
const DTabView = () => {
    return (        
        <>
                <div className="card" style={{borderRadius:"5px"}}>
                    <TabView className="p-tabview-50" style={{borderRadius:"5px"}}>
                        <TabPanel header="Recent Orders" leftIcon="pi pi-calendar">
                            <DataTableRowExpansion />
                        </TabPanel>
                        <TabPanel header="Top Selling Products" leftIcon="pi pi-user">   
                        </TabPanel>
                    </TabView>
                </div>

        </>
    );
}
export default DTabView;