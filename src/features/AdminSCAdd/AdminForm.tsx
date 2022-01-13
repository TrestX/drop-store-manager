import React, { useState,useRef,useEffect } from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { connect } from 'react-redux'
// import { adminSuppRequest } from '../../redux/actions/AdminSuppAction';
import { Row,Col } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { shopGetRequest,} from '../../redux/actions/ShopActions';
import axios from 'axios';
import jwt_decode from "jwt-decode";
interface Props {
    shops: any;
    fetchShops: (dshop) => void;
    // addAdminSuppRequestDetails: (data) => void
}
let FormLayout: React.FunctionComponent<Props> = props => {
    const toast:any = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [shops,setShops] = useState<any>();

    useEffect(() => {
        let d = {sellerId:"",type:"",status:""}
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        if (token != ""){
            var decoded:any = jwt_decode(token!);
            d={sellerId:decoded["userid"],type:"",status:""}
        }
        props.fetchShops(d)
    }, []);
    const [dString,setDString] = useState("")
    const handleSubmit = () => {
        const body = {
            "name":name,
            "role":dString,
            "email":email,
            "password":pass,
            "type":"Seller"
        }
        let token = sessionStorage.getItem("token")
        axios({
            method: 'post',
            url: 'https://api.drop-deliveryapp.com/docker2/admin/acct',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data:body
        }).then((response) => {
            if (response.data) {
                setTimeout(() => {toast['current'].show({severity:'success', summary: 'Success', detail:'Account added successfully.', life: 3000});},1200);
            }
        });
        
    }
    const onItemDealChange = (e:any) =>{
        setShops(e.value);
        let s = ""
        if (e.value && e.value.length >0){
            for (let i = 0;i<e.value.length;i++){
                if(i===0){
                    s = s+ e.value[i].shop_name
                }else{
                    s= s+", "+ e.value[i].shop_name
                }
                
            }
        }
        setDString(s)
    }
    const dealOptionTemplate = (option: any) => {
        return (
            <div className="country-item">
                <div>{option.shop_name}</div>
            </div>
        );
    }
    return (
        <div>
            <Toast ref={toast}></Toast>
            <h1 style={{fontSize:"17px",fontWeight:600,margin:"30px 0px 30px 0px"}}> Add a new support account</h1>
            <Row>
                <Col xs={12} sm={12} md={4} lg={4}>
              <label style={{fontSize:"15px",fontWeight:466,marginTop:"7px",marginBottom:"35px"}}>Name:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <InputText id="catname" type="text" placeholder="Name" style={{width:"100%"}} onChange={(e)=>{setName(e.target.value)}}/>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
              <label style={{fontSize:"15px",fontWeight:466,marginTop:"7px",marginBottom:"35px"}}>Email id:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <InputText id="catname" type="text" placeholder="Email" style={{width:"100%"}} onChange={(e)=>{setEmail(e.target.value)}}/>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
              <label style={{fontSize:"15px",fontWeight:466,marginTop:"7px",marginBottom:"35px"}}>Password:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <InputText id="catname" type="password" placeholder="Password" style={{width:"100%"}} onChange={(e)=>{setPass(e.target.value)}}/>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
              <label style={{fontSize:"15px",fontWeight:466,marginTop:"7px",marginBottom:"35px"}}>Shops:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
              {props.shops?<MultiSelect value={shops} options={props.shops.data?props.shops.data:[]}  onChange={onItemDealChange} optionLabel="shop_name" itemTemplate={dealOptionTemplate}  placeholder="Select shops" style={{minWidth:"100%",minHeight:"40px"}}/>:null}
              {/* <Dropdown value={type} options={cities} onChange={onTypeChange} optionLabel="name" placeholder="Select a Role" style={{width:"100%"}}/> */}
              </Col> 
            </Row>                    
            <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              </Col>
                <Col xs={12} sm={12} md={8} lg={8}>
                    <Button onClick={handleSubmit} style={{float:"right",color:"#2c8aec",minWidth:"140px",textAlign:"center",backgroundColor:"transparent",borderRadius:"25px",margin:"20px auto 0px auto"}}>Add</Button>
                </Col>
            </Row>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    shops: state.shop.data,
})
const mapDispatchToProps = dispatch => ({
    fetchShops: (dshop) => { dispatch(shopGetRequest(dshop)) },
    // addAdminSuppRequestDetails: (data) => { dispatch(adminSuppRequest(data))}
});
export default FormLayout = connect(mapStateToProps, mapDispatchToProps)(FormLayout)

         