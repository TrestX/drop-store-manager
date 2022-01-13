import React, { useState, useEffect, useRef } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import ShopCardComp from '../Common/ShopsCard';
import {SellersService } from '../service/SellersService';
import { shopGetRequest} from '../../redux/actions/ShopActions';
import { connect } from 'react-redux';
import GMapComp from './Map';
import jwt_decode from "jwt-decode";
import { ordersRequest,OrdersPUTRequest } from '../../redux/actions/OrderActions';
interface Props {
    shops: any;
    fetchShops: (dshop) => void;
    orders: any;
    loading:any;
    fetchorders: (d) => void;
  }

let SMCard: React.FunctionComponent<Props> = props => {
    useEffect(() => {
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        var decoded:any = jwt_decode(token!);
        let d = {sellerId:decoded["userid"],type:"",status:""}
        let od={status:"",shopid:"",userid:"",deliveryId:"",sid:decoded["userid"]}
        props.fetchorders(od);
        props.fetchShops(d)
    }, [])
    const [data,setData] = useState(null)
    const sellerService = new SellersService();
    useEffect(() => {
    }, []);
    return (        
        !props.loading ?
            <Row>
                <Col xs={12}>
                {props.shops ? props.shops.data !== undefined && 
                <GMapComp list={props.shops.data} l2={props.orders}/>
                    : <></>}
                    
                </Col>
            </Row>:<div></div>
    );
}
const mapStateToProps = (state: any) => ({
    shops: state.shop.data,
    orders: state.orders.orders,
    loading: state.orders.isLoading,
  })
const mapDispatchToProps = dispatch => ({
    fetchShops: (dshop) => { dispatch(shopGetRequest(dshop)) },
    fetchorders: (d:any) => { dispatch(ordersRequest(d)) },
  });
export default SMCard = connect(mapStateToProps, mapDispatchToProps)(SMCard)