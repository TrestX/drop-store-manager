import React, { useState, useEffect, useRef } from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';
import TopCardComp from '../Common/TopCard';
import {SellersService } from '../service/SellersService';
import { sellerGetRequest} from '../../redux/actions/SellerAction';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
interface Props {
    seller: any;
    fetchseller: (d) => void;
  }

let DTCard: React.FunctionComponent<Props> = props => {
    useEffect(() => {
        //sellerService.getTopSellers().then(data => setData(data));
        const d = {status:"",stype:""}
        props.fetchseller(d)
    }, [])
    const [data,setData] = useState(null)
    const sellerService = new SellersService();
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const onStatusChange = (e) => {
        setSelectedStatus(e.value);
        const d = {status:e.value,stype:""}
        props.fetchseller(d)
    }
    const onTypeChange = (e) => {
        setSelectedType(e.value);
        const d = {status:"",stype:e.value}
        props.fetchseller(d)

    }
    const statuses = [
        'Paused', 'Approved', 'Rejected', 'Created'
    ];
    const types = [
        'Pharmacy', 'Grocery store', 'Restaurant'
    ];
    const reset = () => {
        setSelectedStatus(null);
        setSelectedType(null);
    }
    return (        
        <>
            <Row>
                <Col xs={12}>
                <Card style={{borderBottom: 'none',padding:"7px"}}>
                    <Row>
                        <Col><Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} /></Col>
                        <Col ></Col>
                        <Col >
                            <Dropdown  value={selectedStatus} options={statuses} onChange={onStatusChange} placeholder="Select a Status" className="p-column-filter" />
                        </Col>
                        <Col >
                            <Dropdown value={selectedType} options={types} onChange={onTypeChange} placeholder="Select a Type" className="p-column-filter" />
                        </Col>
                    </Row>
                </Card>
                {props.seller ? props.seller.data !== undefined && props.seller.data.reverse() &&
                <TopCardComp name={"Sellers"} data={props.seller.data.reverse().slice(0,4).reverse()} />
                :<h1 style={{fontSize:'13px',margin:"40px auto 0px auto", color:"#aa3d3d",textAlign:"center"}}>No sellers found</h1>}
                                {props.seller ? props.seller.data === undefined && 
                    <h1 style={{fontSize:'13px',margin:"40px auto 0px auto", color:"#aa3d3d",textAlign:"center"}}>No sellers found</h1>
                :<h1 style={{fontSize:'13px',margin:"40px auto 0px auto", color:"#aa3d3d",textAlign:"center"}}>No sellers found</h1>} 
                </Col>
            </Row>
        </>
    );
}
const mapStateToProps = (state: any) => ({
    seller: state.seller.data,
  })
const mapDispatchToProps = dispatch => ({
    fetchseller: (d) => { dispatch(sellerGetRequest(d)) },
  });
export default DTCard = connect(mapStateToProps, mapDispatchToProps)(DTCard)