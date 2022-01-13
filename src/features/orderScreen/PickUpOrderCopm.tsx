import React, { useState, useEffect, useRef } from 'react';
import './DataTable.css';
import { connect } from 'react-redux'
import { ordersRequest } from '../../redux/actions/OrderActions';
import { ProgressSpinner } from 'primereact/progressspinner';
import PickUpCardComp from './ReadyForPickUp';
interface Props {
    orders: any;
    fetchorders: (d) => void;
  }

let PickUpOrderCompCards: React.FunctionComponent<Props> = props => {

    const [showMap,setShowMap] = useState(false)
    useEffect(() => {
        const d={status:"Ready",shopid:"",userid:"",deliveryId:""}
      props.fetchorders(d)
    }, [])
    const openMap=()=>{
        setShowMap(true)
    }
    const handleSubmit = ()=>{}
    return (
        props.orders ?
        (props.orders != undefined && props.orders != null && props.orders.length>0) && props.orders.map((item)=>{
            return <PickUpCardComp item={item} handleSubmit={handleSubmit}/>
        })
        : <ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1" animationDuration=".5s"/>
    );
}

const mapStateToProps = (state: any) => ({
    orders: state.orders.orders
  })
const mapDispatchToProps = dispatch => ({
    fetchorders: (d:any) => { dispatch(ordersRequest(d)) }
  });
export default PickUpOrderCompCards = connect(mapStateToProps, mapDispatchToProps)(PickUpOrderCompCards)
