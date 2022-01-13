import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputSwitch } from 'primereact/inputswitch';
import { connect } from 'react-redux'
import { utilRequest } from '../../redux/actions/UtilActions';
import { shopRequest,shopPUTRequest } from '../../redux/actions/ShopActions';
import { sellerGetRequest } from '../../redux/actions/SellerAction';
import { Row, Col, Card } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import DropdownComp from './DropDownIds';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import GMaps from '../registerNewSeller/GMAPS';
import { Dropdown } from 'primereact/dropdown';
import './Dropdown.css';
import { Calendar } from 'primereact/calendar';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { usersByUidRequest } from '../../redux/actions/UserAction';
import './addShop.css';
import { PickList } from 'primereact/picklist';
import { Chip } from 'primereact/chip';
import { MultiSelect } from 'primereact/multiselect';
import {ItemTagGetRequest} from "../../redux/actions/itemCategoryAction";
import jwt_decode from "jwt-decode";
interface Props {
    url: any,
    seller: any;
    getSellers: (d) => void;
    getPresignedUrl: (data) => void;
    addShop: (data) => void;
    users: any;
    putShops:(data)=>void;
    fetusersD: (d) => void;
    data:any;
    seModal:any;
    sidState:any;
    itemCats:any;
    fetchcats: (d) => void;
}
let ShopFormLayout: React.FunctionComponent<Props> = props => {
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    }
    const onTagChange = (e:any)=>{
        setTag(e.value)
    }
    const [tag,setTag] = useState<any>(props.data?props.data['tags']:null);
    const [cuisine, setCuisine] = useState<any>([])
    const toast: any = useRef(null);
    const [sellerId, setSellerID] = useState(props.data?props.data['seller_id']:"");
    const [shopName, setShopName] = useState(props.data?props.data['shop_name']:"");
    const [shopAddress, setShopAddress] = useState(props.data?props.data['address']:"");
    const [city, setCity] = useState(props.data?props.data['city']:"");
    const [pin, setPinCode] = useState(props.data?props.data['pin']:"");
    const [type, setType] = useState<any>(props.data?{"name":props.data['type']}:undefined);
    const [dtype, setDType] = useState<any>();
    const [country, setCountry] = useState(props.data?props.data['country']:"");
    const [region, setRegion] = useState(props.data?props.data['state']:"");
    const [openTime, setOpen] = useState<Date | Date[] | undefined | any>(props.data?props.data['timing']?new Date(`Thu Nov 25 2021 ${props.data['timing'].split("-")[0]} GMT+0530`):undefined:undefined);
    const [closeTime, setClose] = useState<Date | Date[] | undefined | any>(props.data?props.data['timing']?new Date(`Thu Nov 25 2021 ${props.data['timing'].split("-")[1]} GMT+0530`):undefined:undefined);
    const [description, setShopDescription] = useState(props.data?props.data['shop_description']:"");
    const [featured, setFeatured] = useState(props.data?props.data['featured']:false);
    const [logoUrl, setLogoUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [clogoUrl, setcLogoUrl] = useState(props.data?props.data['shop_logo']:"");
    const [cbannerUrl, setcBannerUrl] = useState(props.data?props.data['shop_banner']:"");
    const [photoUrl, setPhotoUrl] = useState<any>([]);
    const [cphotoUrl, setcPhotoUrl] = useState<any>(props.data?props.data['shop_photos']:[]);
    const [pC, setC] = useState("")
    const [moa, setMoa] = useState(0)
    const [lat, setLat] = useState<any>(props.data?props.data['geo_location']?props.data['geo_location']['coordinates'][0]:0:0)
    const [long, setLong] = useState<any>(props.data?props.data['geo_location']?props.data['geo_location']['coordinates'][1]:0:0)
    const addChips = (e: any) => {
        if (e.key === "Enter") {
            cuisine.push(e.target.value)
            let newc = cuisine
            setCuisine(newc)
            const cname = shopName
            setShopName(cname + " ")
        }

    }
    useEffect(() => {
        var sid = ""
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        if (token != ""){
            var decoded:any = jwt_decode(token!);
            sid = decoded["userid"]
            setSellerID(sid)
        }
        props.fetusersD(sid)
        if (props.users && props.users.data && props.users.data[0] && props.users.data[0].cuisine) {
            setSource(props.users.data[0].cuisine)
        }
    }, [sellerId]);
    useEffect(() => {
        if(props.data){
            return
        }else{
            const data = { status: "", stype: "" }
            props.getSellers(data)
        }
        props.fetchcats({"type":""});
    }, []);
    const onTypeChange = (e: any) => {
        setType(e.value)
    }
    const onDTypeChange = (e: any) => {
        setDType(e.value)
    }
    const onUpload = (e: any, c: string) => {
        if (props.url.preurl !== undefined) {
            if (pC === 'photos') {
                setPhotoUrl(props.url.preurl)
            }
            if (pC === 'logo') {
                setLogoUrl(props.url.preurl)
            }
            if (pC === 'banner') {
                setBannerUrl(props.url.preurl)
            }
        }
        setC(c)
        let nameList: any = []
        let objectUrls: any = []
        for (let i = 0; i < e.length; i++) {
            nameList.push(e[i].name)
            objectUrls.push(e[i])
        }
        const data = {
            "name": nameList,
            "objectUrl": objectUrls,
            "path": "shops"
        }
        props.getPresignedUrl(data)
        setTimeout(() => { toast['current'].show({ severity: 'success', summary: 'Success', detail: 'Image uploaded successfully.', life: 3000 }); }, 1200)
    }
    const onTemplateUpload = (e) => {
        onUpload(e.files, "photos")
    }
    const onTemplateLogoUpload = (e) => {
        onUpload(e.files, "logo")
    }
    const onTemplateBannerUpload = (e) => {
        onUpload(e.files, "banner")
    }
    const handleSubmit = () => {
        if (props.data){
            props.sidState(props.data['seller_id'])
            const body = {
                "address": shopAddress,
                "country": country,
                "state": region,
                "city": city,
                "pin": pin,
                "timing": openTime.toString().split(" ")[4] + "-" + closeTime.toString().split(" ")[4],
                "shop_name": shopName,
                "shop_photos": photoUrl==""?cphotoUrl:photoUrl,
                "shop_banner": bannerUrl==""?cbannerUrl:bannerUrl,
                "shop_logo": logoUrl==""?clogoUrl:logoUrl,
                "shop_description": description,
                "longitude": long,
                "latitude": lat,
                "type": type['name'],
                "tags":tag,
                "min_order_amount":moa,
                "featured": featured,
                "id":props.data['shop_id'],
                "sellerId":props.data['seller_id']
            }
            props.putShops(body)
            props.seModal(false)
            return
        }

        if (props.url === null || props.url.preurl === undefined || props.url.preurl === null || props.url.preurl === "") {
            toast['current'].show({ severity: 'error', summary: 'Error', detail: 'System error.', life: 3000 });
            return
        }
        if (props.url.preurl !== undefined) {
            if (pC === 'photos') {
                setPhotoUrl(props.url.preurl)
            }
            if (pC === 'logo') {
                setLogoUrl(props.url.preurl)
            }
            if (pC === 'banner') {
                setBannerUrl(props.url.preurl)
            }
        }
        var sid = ""
        if (sellerId==""){
            let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
            if (token != ""){
                var decoded:any = jwt_decode(token!);
                sid = decoded["userid"]
            }
        }else{
            sid = sellerId
        }
        const body = {
            "seller_id": sid,
            "address": shopAddress,
            "country": country,
            "state": region,
            "city": city,
            "pin": pin,
            "primary": false,
            "timing": openTime.toString().split(" ")[4] + "-" + closeTime.toString().split(" ")[4],
            "shop_name": shopName,
            "shop_photos": photoUrl,
            "shop_banner": bannerUrl,
            "shop_logo": logoUrl,
            "shop_description": description,
            "longitude": long,
            "latitude": lat,
            "type": type['name'],
            "featured": featured,
            "delivery_type": dtype.name,
            "tags":tag,
            "cuisine": [...cuisine, ...target]
        }
        props.addShop(body)
        setTimeout(() => { toast['current'].show({ severity: 'success', summary: 'Success', detail: 'Shop added successfully.', life: 3000 }); }, 1200)
    }
    const itemTemplate = (item) => {
        return (
            <h5 className="customFont2">{item}</h5>
        );
    }
    return (
        props.seller ?
            <div>
                <Toast ref={toast}></Toast>
                <Card>
                    <Card.Body style={{ padding: "33px 33px 33px 66px" }}>
                        {/* <Row style={{ float: 'right' }}>
                            <DropdownComp sv={props.data?props.data['sellerEmail']:null} sellers={props.data?[]:props.seller} setSellerID={setSellerID} />
                        </Row> */}
                        <Row className="mt67">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Shop name:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <InputText id="catname" type="text" placeholder="Shop name" className="inpComp" value={shopName} onChange={(e) => { setShopName(e.target.value) }} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Address:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <InputTextarea rows={2} className="inpComp" autoResize value={shopAddress} onChange={(e) => { setShopAddress(e.target.value) }} />
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={4} lg={4}>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={4}>
                                        <CountryDropdown classes="countryRegionCss" value={country} onChange={(e) => { setCountry(e) }} />
                                    </Col>
                                    <Col xs={4}>
                                        <RegionDropdown classes="countryRegionCss" country={country} value={region} onChange={(e) => { setRegion(e) }} />
                                    </Col>
                                    <Col xs={4}>
                                        <InputText type="text" placeholder="City" className="inpComp" value={city} onChange={(e) => { setCity(e.target.value) }} />
                                    </Col>
                                </Row>
                                <Row className="mt5">
                                    <Col xs={4}><InputText type="text" placeholder="Pin code" className="inpComp" value={pin} onChange={(e) => { setPinCode(e.target.value) }} /></Col>
                                    <Col xs={4}></Col>
                                    <Col xs={4}></Col>
                                </Row>
                                <Row className="mt5">
                                    <Col>
                                        <GMaps lat={lat} long={long} setLat={setLat} setLong={setLong} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <br />
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
                            <InputNumber className="customFields" value={moa} placeholder="Minimum order amount" onValueChange={(e) => setMoa(e.value)} mode="decimal" min={0}/>
                            </Col>
                        </Row>
                        {props.users && props.users.data && props.users.data.length > 0 && props.users.data[0].type && <Row>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Type:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <div className="dropdown-demo" >
                                    {console.log(props.users.data[0].type)}
                                    <Dropdown value={type} options={props.users.data[0].type} onChange={onTypeChange} optionLabel="name" placeholder={type?type['name']:"Select a Type"} className="inpComp" />
                                </div>
                            </Col>
                        </Row>}

                        {props.users && props.users.data && props.users.data.length > 0 && props.users.data[0].delivery_type && <Row>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Delivery Type:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <div className="dropdown-demo" >
                                    <Dropdown value={dtype} options={[{ "name": props.users.data[0].delivery_type }]} onChange={onDTypeChange} optionLabel="name" placeholder="Select a Delivery Type" className="inpComp" />
                                </div>
                            </Col>
                        </Row>}
                        {props.users && props.users.data && props.users.data.length > 0 && props.users.data[0].cuisine && <Row>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Cuisine:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <h3 className="customFont2">Select from the list:</h3>
                                <PickList source={props.users.data[0].cuisine} className="inpComp" target={target} itemTemplate={itemTemplate}
                                    sourceHeader="Available" targetHeader="Selected"
                                    sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }}
                                    onChange={onChange}></PickList>

                                <h3 className="customFont2 mt17">Add manually</h3>

                                <InputText type="text" placeholder="Cuisine" className="inpComp" onKeyDown={(e) => { addChips(e) }} />
                                {cuisine && cuisine.length > 0 && cuisine.map((items, index) => { return <Chip label={items} className="p-mb-2 mt5" removable /> })}
                            </Col>
                        </Row>}
                        <Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Opens at:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <Calendar id="time12" className="inpComp" value={openTime} onChange={(e) => {setOpen(e.value);console.log(e.value)}} timeOnly hourFormat="12" />
                            </Col>
                        </Row>
                        <Row >
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Closes at:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <Calendar id="time12" className="inpComp" value={closeTime} onChange={(e) => setClose(e.value)} timeOnly hourFormat="12" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Description:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <InputTextarea rows={3} className="inpComp" autoResize value={description} onChange={(e) => { setShopDescription(e.target.value) }} />
                            </Col>
                        </Row>
                        <Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Featured:</label>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <InputSwitch checked={featured} onChange={(e) => setFeatured(e.value)} />
                            </Col>
                        </Row>
                        <Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Shop logo:</label>
                            </Col>
                            <Col>
                                <FileUpload name="demo[]" customUpload={true} auto uploadHandler={onTemplateLogoUpload} onUpload={onTemplateLogoUpload} accept="image/*" maxFileSize={1000000}
                                    emptyTemplate={<p className="p-m-3" style={{ fontSize: "15px" }}>Drag and drop files to here to upload.</p>} />
                            </Col>
                        </Row>
                        {clogoUrl != "" ?<Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Current Shop logo:</label>
                            </Col>
                            <Col>
                            <img src={clogoUrl} style={{width:"150px"}} />
                            </Col>
                        </Row>:null}
                        <Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Shop banner:</label>
                            </Col>
                            <Col>
                                <FileUpload name="demo[]" customUpload={true} auto uploadHandler={onTemplateBannerUpload} onUpload={onTemplateBannerUpload} accept="image/*" maxFileSize={1000000}
                                    emptyTemplate={<p className="p-m-3" style={{ fontSize: "15px" }}>Drag and drop files to here to upload.</p>} />
                            </Col>
                        </Row>
                        {cbannerUrl != "" ?<Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Current Shop banner:</label>
                            </Col>
                            <Col>
                            <img src={cbannerUrl} style={{width:"150px"}} />
                            </Col>
                        </Row>:null}
                        <Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Shop images:</label>
                            </Col>
                            <Col>
                                <FileUpload name="demo[]" customUpload={true} uploadHandler={onTemplateUpload} onUpload={onTemplateUpload} multiple accept="image/*" maxFileSize={1000000}
                                    emptyTemplate={<p className="p-m-3" style={{ fontSize: "15px" }}>Drag and drop files to here to upload.</p>} />
    
                            </Col>
                        </Row>
                        {cphotoUrl.length>0 ?<Row className="mt17">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <label className="customLabel">Current Shop Photos:</label>
                            </Col>
                            <Col>
                            {cphotoUrl.map((data)=><img src={data} style={{width:"150px",marginRight:"7px"}} />)}
                            
                            </Col>
                        </Row>:null}
                        <Row style={{float:"right"}}>
                        <Button onClick={handleSubmit} className="shButton">Add</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </div> : <div></div>
    )
}
const mapStateToProps = (state: any) => ({
    url: state.util.preSignedUrl,
    seller: state.seller.data,
    users: state.users.users,
    itemCats: state.itemCat.data
})
const mapDispatchToProps = dispatch => ({
    getPresignedUrl: (data) => { dispatch(utilRequest(data)) },
    getSellers: (d) => { dispatch(sellerGetRequest(d)) },
    addShop: (data) => { dispatch(shopRequest(data)) },
    fetusersD: (d: any) => { dispatch(usersByUidRequest(d)) },
    putShops:(data:any)=>{dispatch(shopPUTRequest(data))},
    fetchcats: (d) => { dispatch(ItemTagGetRequest(d)) },
});
export default ShopFormLayout = connect(mapStateToProps, mapDispatchToProps)(ShopFormLayout)