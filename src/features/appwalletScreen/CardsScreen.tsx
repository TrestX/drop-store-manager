import React,{useEffect,useState} from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import CardComp from '../Common/Card';
import { connect } from 'react-redux';
import { apptransGetRequest } from '../../redux/actions/TTs';
import axios from 'axios';
import jwt_decode from "jwt-decode";
interface Props {
    fetchTTs:(d:any) => void;
    tts: any;
  }

let DCards: React.FunctionComponent<Props> = props => {
    const [so,setSo] = useState(0)
    const [uso,setUso] = useState(0)
    const [too,setTo] = useState(0)
    useEffect(() => {
        props.fetchTTs({})
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        var decoded:any = jwt_decode(token!);

        axios({
            method: 'get',
            url: `https://api.drop-deliveryapp.com/docker2/apptrans/seller?status=&entityId=${decoded['userid']}&orderid=&transactionId=`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
    
            },
        }).then((response) => {
            if (response.data) {
                    setTo(response.data.total)
                    setUso(response.data.unsettled)
                    setSo(response.data.settled)
                
            }
        });
    }, [])

    return (        
        <>
            <Row>
<Col  md={6} lg={4} style={{marginBottom:"20px"}}> 
            {props.tts ?
    <CardComp iconName={"pi-money-bill"} name={"Total Transactions"} data={10} redirect={""}/>
    : <CardComp iconName={"pi-money-bill"} name={"Total Transactions"} data={0} redirect={""}/>}
      </Col>
<Col  md={6} lg={4} style={{marginBottom:"20px"}}>                {props.tts ?
    <CardComp iconName={"pi-money-bill"} name={"Total Earnings"} data={too} redirect={""}/>
    : <CardComp iconName={"pi-money-bill"} name={"Total Earnings"} data={0} redirect={""}/>}
      </Col>
<Col  md={6} lg={4} style={{marginBottom:"20px"}}>                   {props.tts ?
    <CardComp iconName={"pi-money-bill"} name={"Unsettled Amount"} data={uso} redirect={""}/>
    : <CardComp iconName={"pi-money-bill"} name={"UnSettled Amount"} data={0} redirect={""}/>}
     </Col>
<Col  md={6} lg={4} style={{marginBottom:"20px"}}>                    {props.tts ?
    <CardComp iconName={"pi-money-bill"} name={"Settled Amount"} data={so} redirect={""}/>
    : <CardComp iconName={"pi-money-bill"} name={"Settled Amount"} data={0} redirect={""}/>}

</Col>

</Row>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    tts: state.tts.data,
  })
const mapDispatchToProps = dispatch => ({
    fetchTTs:(d:any) => {dispatch(apptransGetRequest(d))},
  });
export default DCards = connect(mapStateToProps, mapDispatchToProps)(DCards)
