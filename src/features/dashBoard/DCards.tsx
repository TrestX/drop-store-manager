import React,{useEffect,useState} from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import CardComp from '../Common/Card';
import { connect } from 'react-redux'
import { ordersRequest } from '../../redux/actions/OrderActions';
import { usersRequest } from '../../redux/actions/UserAction';
import { apptransGetRequest } from '../../redux/actions/TTs';
import { shopGetRequest} from '../../redux/actions/ShopActions';
import jwt_decode from "jwt-decode";
import axios from 'axios';
interface Props {
    orders: any;
    fetchorders: (d) => void;
    ordersLoading:any;
    shops: any;
    fetchShops: (dshop) => void;
    fetchTTs:(d:any) => void;
    tts: any;
  }

let DCards: React.FunctionComponent<Props> = props => {
    const [no,setNo] = useState(0)
    const [co,setCo] = useState(0)
    const [doo,setDo] = useState(0)
    useEffect(() => {
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        var decoded:any = jwt_decode(token!);
        let d = {sellerId:decoded["userid"],type:"",status:""}
        let od={status:"",shopid:"",userid:"",deliveryId:"",sid:decoded["userid"]}
        props.fetchorders(od);
        props.fetchShops(d);
        props.fetchTTs({});
        axios({
            method: 'get',
            url: `https://api.drop-deliveryapp.com/docker4/order/admin/orders/all?shopID=&status=Ordered&userId=&deliveryId=&limit=100&sellerID=${decoded["userid"]}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
    
            },
        }).then((response) => {
            if (response.data) {
                if (response.data.data){
                    setNo(response.data.data.length)
                }
                console.log(response.data.data[0])
            }
        });
        axios({
            method: 'get',
            url: `https://api.drop-deliveryapp.com/docker4/order/admin/orders/all?shopID=&status=Delivered&userId=&deliveryId=&limit=100&sellerID=${decoded["userid"]}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
    
            },
        }).then((response) => {
            if (response.data) {
                if (response.data.data){
                    setDo(response.data.data.length)
                }
            }
        });
        axios({
            method: 'get',
            url: `https://api.drop-deliveryapp.com/docker4/order/admin/orders/all?shopID=&status=Accepted&userId=&deliveryId=&limit=100&sellerID=${decoded["userid"]}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
    
            },
        }).then((response) => {
            if (response.data) {
                if (response.data.data){
                    setCo(response.data.data.length)
                }
            }
        });
    }, [])

    return (        
        <>
            <Row>
                <Col md={2} style={{marginBottom:"20px"}}>
            {props.shops ?
            
    <CardComp iconName={"pi-shopping-cart"} name={"Total shops"} data={props.shops.data!==undefined?props.shops.data.length:0} redirect={'shops'} />
    : <CardComp iconName={"pi-shopping-cart"} name={"Total shops"} data={0} redirect={'shops'}/>}
    </Col>
<Col  md={2} style={{marginBottom:"20px"}}>                    {<CardComp iconName={"pi-dollar"} name={"Total orders"} data={props.orders?props.orders.length:0} redirect={'order'} />
}
</Col>
<Col  md={2} style={{marginBottom:"20px"}}>                    {<CardComp iconName={"pi-dollar"} name={"New orders"} data={no} redirect={'order'} />
}
</Col>
<Col  md={2} style={{marginBottom:"20px"}}>                    {<CardComp iconName={"pi-dollar"} name={"Delivered orders"} data={doo} redirect={'order'} />
}
</Col>
<Col  md={2} style={{marginBottom:"20px"}}>                    {<CardComp iconName={"pi-dollar"} name={"Current orders"} data={co} redirect={'order'} />
    }
</Col>
<Col  md={2} style={{marginBottom:"20px"}}>           {props.tts ?
    <CardComp iconName={"pi-money-bill"} name={"Total Transactions Amount"} data={props.tts.data} redirect={''} />
    : <CardComp iconName={"pi-money-bill"} name={"Total Transactions Amount"} data={0} redirect={''}/>}
</Col>
            </Row>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    orders: state.orders.orders,
    ordersLoading: state.orders.isLoading,
    shops: state.shop.data,
    tts: state.tts.data,
  })
const mapDispatchToProps = dispatch => ({
    fetchorders: (d:any) => { dispatch(ordersRequest(d)) },
    fetchTTs:(d:any) => {dispatch(apptransGetRequest(d))},
    fetchShops: (dshop) => { dispatch(shopGetRequest(dshop)) },
  });
export default DCards = connect(mapStateToProps, mapDispatchToProps)(DCards)