import React, { useState, useEffect, useRef } from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';
import ShopCardComp from '../Common/ShopsCard';
import {SellersService } from '../service/SellersService';
import { shopGetRequest} from '../../redux/actions/ShopActions';
import { connect } from 'react-redux'
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import jwt_decode from "jwt-decode";
interface Props {
    shops: any;
    fetchShops: (dshop) => void;
  }

let SHCard: React.FunctionComponent<Props> = props => {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedType, setSelectedType] = useState("");
    useEffect(() => {
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        var decoded:any = jwt_decode(token!);
        let d = {sellerId:decoded["userid"],type:selectedType,status:selectedStatus}

        props.fetchShops(d)
    }, [selectedStatus,selectedType])

    const onStatusChange = (e) => {
        setSelectedStatus(e.value);

    }
    const onTypeChange = (e) => {
        setSelectedType(e.value);

    }
    const statuses = [
        'closed', 'open'
    ];
    const types = [
        'Pharmacy', 'Grocery store', 'Restaurant'
    ];
    const [data,setData] = useState(null)
    const sellerService = new SellersService();
    useEffect(() => {
    }, []);
    const reset = () => {
        setSelectedStatus("");
        setSelectedType("");
    }
    return (        
        <>
            <Row>
                <Col xs={12}>
                <Card style={{borderBottom: 'none'}}>
                    <Card.Header style={{backgroundColor:'white'}}>                    <Row>
                        <Col><Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} /></Col>
                        <Col ></Col>
                        <Col >
                            <Dropdown  value={selectedStatus} options={statuses} onChange={onStatusChange} placeholder="Select a Status" className="p-column-filter" />
                        </Col>
                        <Col >
                            <Dropdown value={selectedType} options={types} onChange={onTypeChange} placeholder="Select a Type" className="p-column-filter" />
                        </Col>
                    </Row>
                    </Card.Header>

                
                {props.shops ? props.shops.data !== undefined && 
                <ShopCardComp name={"Shops"} data={props.shops.data.slice(0, 5)} />
    : <h1 style={{fontSize:'13px',margin:"40px auto 0px auto", color:"#aa3d3d",textAlign:"center"}}>No shops found</h1>}
                {props.shops ? props.shops.data === undefined && 
                    <h1 style={{fontSize:'13px',margin:"40px auto 0px auto", color:"#aa3d3d",textAlign:"center"}}>No shops found</h1>
    : <h1 style={{fontSize:'13px',margin:"40px auto 0px auto", color:"#aa3d3d",textAlign:"center"}}>No shops found</h1>}   
                </Card>
                </Col>
            </Row>
        </>
    );
}
const mapStateToProps = (state: any) => ({
    shops: state.shop.data,
  })
const mapDispatchToProps = dispatch => ({
    fetchShops: (dshop) => { dispatch(shopGetRequest(dshop)) },
  });
export default SHCard = connect(mapStateToProps, mapDispatchToProps)(SHCard)