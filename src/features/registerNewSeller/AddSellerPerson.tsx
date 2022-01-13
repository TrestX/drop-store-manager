import React, { useState,useRef,useEffect } from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { connect } from 'react-redux'
import { utilRequest } from '../../redux/actions/UtilActions';
import { sellerRequest,sellerGetRequest,sellerPUTRequest } from '../../redux/actions/SellerAction';
import { Row,Col,Card } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import GMaps from './GMAPS';
import { addressGetRequest } from '../../redux/actions/AddressAction';
import { Dropdown } from 'primereact/dropdown';
import './Dropdown.css';
import { InputNumber } from 'primereact/inputnumber';
import './addSeller.css';
import { MultiSelect } from 'primereact/multiselect';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { genderss,stypes,dtOptions} from './sellerConstants';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { usersByUidRequest } from '../../redux/actions/UserAction';
import { SelectButton } from 'primereact/selectbutton';
import {ItemTagGetRequest} from "../../redux/actions/itemCategoryAction";

interface Props {
    url:any,
    getPresignedUrl: (data) => void,
    seModal:any;
    addSeller: (data) => void,
    seller: any;
    fetchseller: (d) => void;
    sellerLoading:any;
    users: any;
    putseller:(data)=>void;
    fetusersD: (d) => void;
    fetchAddress:(d)=>void;
    address:any;
    addressLoading:any;
    data:any;
    itemCats:any;
    fetchcats: (d) => void;
}
let SellerFormLayout: React.FunctionComponent<Props> = props => {
    const toast:any = useRef(null);
    const [emailId,setEmailID] = useState(props.data?props.data['email']:"");
    const [password,setPassword] = useState("");
    const [name, setName] = useState(props.data?props.data['name']:"");
    const [bname, setBName] = useState(props.data?props.data['bankName']:"");
    const [ifsc, setIFSC] = useState(props.data?props.data['ifsc']:"");
    const [anumb, setANumb] = useState(props.data?props.data['account_number']:"");
    const [address, setAddress] = useState("");
    const [phone,setPhone] = useState(props.data?props.data['phone_number']:"");
    const [dob,setDOB] = useState(props.data?props.data['dob']:"");
    const [type,setType] = useState<any>(props.data?props.data['type']:null);
    const [city, setCity] = useState("");
    const [pin, setPinCode] = useState("");
    const [gender,setGender] = useState<any>(props.data?{"name":props.data['gender']}:null);
    const [country, setCountry] = useState('');
    const [region,setRegion] = useState('');
    const [profileUrl,setProfileUrl] = useState("");
    const [nationalIdUrl,setNationalIdUrl] = useState("");
    const [pictureIdUrl,setPictureIdUrl] = useState("");
    const [certificateUrl,setCertificateUrl] = useState("");

    const [cprofileUrl,setcProfileUrl] = useState(props.data?props.data['profile_photo']:"");
    const [cnationalIdUrl,setcNationalIdUrl] = useState(props.data?props.data['national_id']:"");
    const [cpictureIdUrl,setcPictureIdUrl] = useState(props.data?props.data['picture_id']:"");
    const [ccertificateUrl,setcCertificateUrl] = useState(props.data?props.data['certificate_of_incorporation']:"");

    const [pC,setC] = useState("")
    const [lat,setLat]= useState<any>()
    const [moa,setMoa] = useState(0)
    const [long,setLong] = useState<any>()
    const [cuisine,setCuisine] = useState<any>(props.data?props.data['cuisine']:[])
    const [dvalue, setDValue] = useState(props.data?props.data['delivery_type']:null);
    const onGenderChange = (e:any)=>{
        setGender(e.value)
    }
    const onTypeChange = (e:any)=>{
        setType(e.value)
    }
    const onTagChange = (e:any)=>{
        setTag(e.value)
    }
    const [tag,setTag] = useState<any>(props.data?props.data['tags']:null);
    useEffect(() => {
        console.log(props.data);
        if (props.data){
            const d = {user_id:props.data['user_id']}
            props.fetchAddress(d)
            if (props.address && props.address.data ){
                setAddress(props.address.data[0]['address'])
                setCountry(props.address.data[0]['country'])
                setCity(props.address.data[0]['city'])
                setRegion(props.address.data[0]['state'])
                setPinCode(props.address.data[0]['pin'])
                setLat(props.address.data[0]['geo_location']!['coordinates'][0])
                setLong(props.address.data[0]['geo_location']!['coordinates'][1])
            }
        }
    }, []);

    const onUpload = (e:any,c:string) => {
        if (props.url !== null && props.url.preurl !== undefined){
            if(pC==='profile'){
                setProfileUrl(props.url.preurl)
            }
            if(pC==='national'){
                setNationalIdUrl(props.url.preurl)
            }
            if(pC==='picture'){
                setPictureIdUrl(props.url.preurl)
            }
            if(pC==='certificate'){
                setCertificateUrl(props.url.preurl)
            }
        }
        setC(c)
        let nameList:any=[]
        let objectUrls:any=[]
        for (let i=0;i<e.length;i++){
            nameList.push(e[i].name)
            objectUrls.push(e[i])
        }
        const data = {
            "name":nameList,
            "objectUrl":objectUrls,
            "path":"seller"
        }
        props.getPresignedUrl(data)
        setTimeout(() => {toast['current'].show({severity:'success', summary: 'Success', detail:'Image uploaded successfully.', life: 3000});},1200)
    }
    const onTemplateProfilePhotoUpload = (e) => {
        onUpload(e.files,"profile")
    }
    const onTemplateNationalIDUpload = (e) => {
        onUpload(e.files,"national")
    }
    const onTemplatePictureIDUpload = (e) => {
        onUpload(e.files,"picture")
    }
    const onTemplateCertificateOfIncorporationUpload = (e) => {
        onUpload(e.files,"certificate")
    }
    const addChips = (e:any) => {
        if (e.key === "Enter"){
            cuisine.push(e.target.value)
            let newc = cuisine
            setCuisine(newc)
            const cname = name
            setName(cname+" ")
        }

    }
    const handleSubmit = () => {

        if (props.data){
            const body = {
                "gender":gender.name,
                "dob":dob, 
                "name":name.trim(), 
                "id":props.data["user_id"]
            }
            props.putseller(body)
            toast['current'].show({severity:'success', summary: 'Seller info updated successfully', detail:'Seller update success', life: 3000});
            return
        }        
        if(props.url ===null || props.url.preurl===undefined || props.url.preurl === null || props.url.preurl===""){
            toast['current'].show({severity:'error', summary: 'Error', detail:'System error.', life: 3000});
            return
        }
        if (props.url.preurl !== undefined){
            if(pC==='profile'){
                setProfileUrl(props.url.preurl)
            }
            if(pC==='national'){
                setNationalIdUrl(props.url.preurl)
            }
            if(pC==='picture'){
                setPictureIdUrl(props.url.preurl)
            }
            if(pC==='certificate'){
                setCertificateUrl(props.url.preurl)
            }
        }
        var tags = ""
        if (tag && tag.length>0){
            for (let i=0;i<tag.length;i++){
                if (i==0){
                    tags = tags+tag["tag_name"]+","
                }
                tags = tags+","+tag["tag_name"]
                
            }
        }
        const body = {
            "email":emailId,
            "password":password,
            "gender":gender.name,
            "dob":dob, 
            "name":name.trim(), 
            "phone_number":phone,
            "profile_photo":profileUrl,
            "bankName":bname,
            "account_number":anumb,
            "ifsc":ifsc,
            "address":{
                "address":address, 
                "country":country,
                "state":region,
                "city":city,
                "pin":pin,
                "primary":true,
                "longitude":long,
                "latitude":lat
            },
            "type":type,
            "picture_id":pictureIdUrl,
            "national_id":nationalIdUrl,
            "certificate_of_incorporation":certificateUrl,
            "tags":tags,
            "min_order_amt":moa,
            "delivery_type":dvalue

        }
        props.addSeller(body)
        setEmailID("");
        setPassword("");
        setName("");
        setBName("");
        setIFSC("");
        setANumb("");
        setAddress("");
        setPhone("");
        setDOB("");
        setType(null);
        setCity("");
        setPinCode("");
        setGender(null);
        setCountry('');
        setRegion('');
        setProfileUrl("");
        setNationalIdUrl("");
        setPictureIdUrl("");
        setCertificateUrl("");
        setTimeout(() => {toast['current'].show({severity:'success', summary: 'Success', detail:'Seller registered successfully.', life: 3000});},1200)
    }
    return (
        <div>
            <Toast ref={toast}></Toast>
            <Card>
                <Card.Body style={{padding:"33px 33px 33px 66px"}}>

                <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel" >Contact person name:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <InputText  value={name} type="text" placeholder="name" className="inpComp" onChange={(e)=>{setName(e.target.value)}}/>
                        </Col>                 
                    </Row>
                    <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                        <label className="customLabel">Contact person gender:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                        <div className="dropdown-demo" >
                            <Dropdown value={gender} options={genderss} onChange={onGenderChange} optionLabel="name" placeholder="select a gender" className="inpComp"/>
                        </div>
                        </Col>                 
                    </Row> 
                    <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">Contact person date of birth:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <InputMask mask="99/99/9999"  value={dob} placeholder="mm/dd/yyyy" slotChar="mm/dd/yyyy" className="inpComp" onChange={(e)=>{setDOB(e.target.value)}}></InputMask>
                        </Col>                 
                    </Row> 
                    <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">Contact person phone number:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <InputMask mask="(999) 999-9999" value={phone} placeholder="(999) 999-9999" className="inpComp" onChange={(e)=>{setPhone(e.target.value)}}></InputMask>
                        </Col>                 
                    </Row>  
                    <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">Company name:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                        <InputText  type="text" placeholder="Name" className="inpComp" />
                        </Col>                 
                    </Row>  
                    <Row>
                        <Col xs={12} sm={12} md={4} lg={4}>
                        <label className="customLabel">Type:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                        <MultiSelect value={type} options={stypes} onChange={onTypeChange} optionLabel="name" placeholder="select type" display="chip" style={{minWidth:"100%"}}/>
                        </Col>                 
                    </Row> 

                    <Row>
                        <Col xs={12} sm={12} md={4} lg={4}>
                        <label className="customLabel">Tags:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            {props.itemCats && props.itemCats.data && props.itemCats.data.data && <MultiSelect value={tag} options={props.itemCats.data.data} onChange={onTagChange} optionLabel="tag_name" placeholder="Select Tag" display="chip" style={{minWidth:"100%"}}/>     }    
                        </Col>                 
                    </Row> 
                    <Row>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Minimum order amount:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                            <InputNumber className="customFields" value={moa} placeholder="minimum order amount" onValueChange={(e) => setMoa(e.value)} mode="decimal" min={0}/>
                            </Col>
                        </Row>
                    <Row className="mt5">
                        <Col xs={12} sm={12} md={4} lg={4}>
                        <label className="customLabel">Delivery type:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                        <SelectButton value={dvalue} options={dtOptions} onChange={(e) => setDValue(e.value)} optionLabel="name" />   
                        </Col>                 
                    </Row> 
                    <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">Email id:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <InputText value={emailId} type="text" placeholder="email id" className="inpComp" onChange={(e)=>{setEmailID(e.target.value)}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">Password:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <Password  placeholder="password" className="inpComp" onChange={(e)=>{setPassword(e.target.value)}} toggleMask />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={4} lg={4}>
                        <label className="customLabel">Address:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <InputTextarea rows={2} value={address} className="inpComp" autoResize onChange={(e)=>{setAddress(e.target.value)}}/>
                            <br/>
                        </Col>                
                    </Row>
                    <Row>
                    <Col xs={12} sm={12} md={4} lg={4}>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={4}>
                                    <CountryDropdown classes="countryRegionCss"  value={country} onChange={(e)=>{setCountry(e)}} />
                                </Col>
                                <Col xs={4}>
                                    <RegionDropdown classes="countryRegionCss"  country={country} value={region} onChange={(e)=>{setRegion(e)}}/>
                                </Col>
                                <Col xs={4}>
                                    <InputText  type="text" placeholder="city" value={city} className="inpComp" onChange={(e)=>{setCity(e.target.value)}}/>
                                </Col>
                            </Row>    
                            <Row className="mt5">
                                <Col xs={4}><InputText  type="text" placeholder="pin code" value={pin} className="inpComp" onChange={(e)=>{setPinCode(e.target.value)}}/></Col>
                                <Col xs={4}></Col>
                                <Col xs={4}></Col>
                            </Row>  
                            <Row className="mt5">
                                <Col>
                                    <GMaps lat={lat} long={long} setLat={setLat} setLong = {setLong}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
 <br/>
 <br/>
                    <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel" >Bank name:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <InputText  type="text" placeholder="bank name" value={bname} className="inpComp" onChange={(e)=>{setBName(e.target.value)}}/>
                        </Col>                 
                    </Row>
                    <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel" >IFSC code:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <InputText  type="text" placeholder="ifsc code" value={ifsc} className="inpComp" onChange={(e)=>{setIFSC(e.target.value)}}/>
                        </Col>                 
                    </Row>
                    <Row >
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel" >Account number:</label>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <InputText  type="text" placeholder="account number" value={anumb} className="inpComp" onChange={(e)=>{setANumb(e.target.value)}}/>
                        </Col>                 
                    </Row>
                   <Row className="mt17">
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">Profile photo:</label>
                        </Col>  
                        <Col>
                            <FileUpload name="demo[]" customUpload={true} auto uploadHandler={onTemplateProfilePhotoUpload} onUpload={onTemplateProfilePhotoUpload} accept="image/*" maxFileSize={1000000}
                                emptyTemplate={<p className="p-m-3" style={{fontSize:"15px"}}>Drag and drop files to here to upload.</p>} />
                        </Col>
                    </Row>    
                    {cprofileUrl!="" ?<Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Current Profile Photo:</label>
                            </Col>
                            <Col>
                            <img src={cprofileUrl} style={{width:"150px",marginRight:"7px"}} />
                            
                            </Col>
                        </Row>:null}             
                    <Row className="mt17">
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">Photo id:</label>
                        </Col>  
                        <Col>
                            <FileUpload name="demo[]" customUpload={true} auto uploadHandler={onTemplatePictureIDUpload} onUpload={onTemplatePictureIDUpload} accept="image/*" maxFileSize={1000000}
                                emptyTemplate={<p className="p-m-3" style={{fontSize:"15px"}}>Drag and drop files to here to upload.</p>} />
                        </Col>
                    </Row>
                    {cpictureIdUrl !="" ?<Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Current Picture Id:</label>
                            </Col>
                            <Col>
                            <img src={cpictureIdUrl} style={{width:"150px",marginRight:"7px"}} />
                            
                            </Col>
                        </Row>:null}

                    <Row className="mt17">
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">Certificate of incorporation:</label>
                        </Col>  
                        <Col>
                            <FileUpload name="demo[]" customUpload={true} auto uploadHandler={onTemplateCertificateOfIncorporationUpload} onUpload={onTemplateCertificateOfIncorporationUpload} accept="image/*" maxFileSize={1000000}
                                emptyTemplate={<p className="p-m-3" style={{fontSize:"15px"}}>Drag and drop files to here to upload.</p>} />
                        </Col>
                    </Row>    
                    {ccertificateUrl != "" ?<Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Current Certificate of incorporation:</label>
                            </Col>
                            <Col>
                            <img src={ccertificateUrl} style={{width:"150px"}} />
                            </Col>
                        </Row>:null}

                    <Row className="mt17">
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <label className="customLabel">National id:</label>
                        </Col>  
                        <Col>
                            <FileUpload name="demo[]" customUpload={true} auto uploadHandler={onTemplateNationalIDUpload} onUpload={onTemplateNationalIDUpload} accept="image/*" maxFileSize={1000000}
                                emptyTemplate={<p className="p-m-3" style={{fontSize:"15px"}}>Drag and drop files to here to upload.</p>} />
                        </Col>
                    </Row>    
                    {cnationalIdUrl != "" ?<Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Current National Id:</label>
                            </Col>
                            <Col>
                            <img src={cnationalIdUrl} style={{width:"150px"}} />
                            </Col>
                        </Row>:null}

                        <Row style={{float:"right"}}>
                        {sessionStorage.getItem("token")?<Button onClick={handleSubmit} className="sButton">Update</Button>:<Button onClick={handleSubmit} className="sButton">Register</Button>}
                        </Row>
                </Card.Body>
            </Card>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    url: state.util.preSignedUrl,
    seller: state.seller.data,
    sellerLoading: state.seller.isLoading,
    users: state.users.users,
    address: state.address.data,
    addressLoading: state.address.isLoading,
    itemCats: state.itemCat.data
})
const mapDispatchToProps = dispatch => ({
    getPresignedUrl: (data) => { dispatch(utilRequest(data)) },
    addSeller: (data) => { dispatch(sellerRequest(data))},
    fetchseller: (d:any) => { dispatch(sellerGetRequest(d)) },
    fetchAddress:(d:any) => {dispatch(addressGetRequest(d))},
    fetusersD:(d:any) => {dispatch(usersByUidRequest(d))},
    putseller:(data:any)=>{dispatch(sellerPUTRequest(data))},
    fetchcats: (d) => { dispatch(ItemTagGetRequest(d)) },
});
export default SellerFormLayout = connect(mapStateToProps, mapDispatchToProps)(SellerFormLayout)