import React, { useState, useEffect, useRef } from 'react';
import './DataTable.css';
import { connect } from 'react-redux'
import { ordersRequest,OrdersPUTRequest } from '../../redux/actions/OrderActions';
import { ProgressSpinner } from 'primereact/progressspinner';
import AcceptedCardComp from './AcceptedCardComp';
interface Props {
    orders: any;
    fetchorders: (d) => void;
    putorders:(data) => void;
  }

let OrderDeliveredCompCards: React.FunctionComponent<Props> = props => {

    const [showMap,setShowMap] = useState(false)
    useEffect(() => {
        const d={status:"Delivered",shopid:"",userid:"",deliveryId:""}
        props.fetchorders(d)
    }, [])
    const openMap=()=>{
        setShowMap(true)
    }
    const handleSubmit = (id:any,sta:any) => {
        const body = {
            "id":id,
            "status":sta
        }
        props.putorders(body)
    }
    return (
        props.orders ?
        (props.orders != undefined && props.orders != null && props.orders.length>0) && props.orders.map((item)=>{
            return <AcceptedCardComp item={item} handleSubmit={handleSubmit}/>
        })
        : <ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1" animationDuration=".5s"/>
    );
}

const mapStateToProps = (state: any) => ({
    orders: state.orders.orders
  })
const mapDispatchToProps = dispatch => ({
    fetchorders: (d:any) => { dispatch(ordersRequest(d)) },
    putorders:(data:any) =>{dispatch(OrdersPUTRequest(data))}
  });
export default OrderDeliveredCompCards = connect(mapStateToProps, mapDispatchToProps)(OrderDeliveredCompCards)