import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputSwitch } from 'primereact/inputswitch';
import { connect } from 'react-redux'
import { utilRequest } from '../../redux/actions/UtilActions';
import {  shopGetRequest,shopRequest,shopPUTRequest } from '../../redux/actions/ShopActions';
import { sellerGetRequest } from '../../redux/actions/SellerAction';
import { Row, Col, Card } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import DropdownComp from './DropDownIds';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import './Dropdown.css';
import { itemGetRequest,itemRequest,itemPUTRequest} from '../../redux/actions/ItemAction';
import {ItemCatGetRequest} from "../../redux/actions/itemCategoryAction";
import jwt_decode from "jwt-decode";
import OptionLC from './optionLComp';
interface Props {
    url: any,
    seller: any;
    getSellers: (d) => void;
    getPresignedUrl: (data) => void;
    items:any;
    fetchShops: (dshop) => void;
    fetchItems:(d) => void;
    addItem:(data) => void;
    putitems: (d) => void;
    itemCats:any;
    fetchcats: (d) => void;
    shops: any;
}
let ItemLayout: React.FunctionComponent<Props> = props => {
    const [tag,setTag] = useState<any>(null);
    const toast: any = useRef(null);
    const [sellerId, setSellerID] = useState("");
    const [shopId, setShopID] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [photoUrl, setPhotoUrl] = useState<any>([]);
    const [itemname, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedFoodType, setSelectedFoodType] = useState(null);

    const [pC, setC] = useState("")

    useEffect(() => {
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        if (token != ""){
            var decoded:any = jwt_decode(token!);
            setSellerID(decoded["userid"]);
            var d={sellerId:decoded["userid"],type:"",status:""}
            props.fetchShops(d)
            props.fetchcats({type:""})
        }

    }, [sellerId]);
    useEffect(() => {
        props.fetchcats({"type":""});
    }, []);
    const onUpload = (e: any, c: string) => {
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
    const [addon,setAddon] = useState(false)

const [selectedAddons, setSelectedAddons] = useState(null);
const [selectedRestICat,setSelectedRestICat] = useState(null);
const [openAddons,setOpenAddons] = useState(false)
const [addOnsRow, setAddOnsRow] = useState()
const fooodCat = [
    'Veg', 'Non-Veg'
];
const [addOnPrice,setAddOnPrice] = useState("")
const [addOnNote,setAddOnNote] = useState("")
const [selectedItems,setSelectedItems] = useState<any>([])
const selectAddon = (nam) =>{
    selectedItems.push({"name":nam,"price":parseInt(addOnPrice),"note":addOnNote})
    setSelectedItems(selectedItems)
    setAddOnPrice("")
    setAddOnNote("")
}
const removeAddon = (nam) =>{
    var nl:any = []
    for (let i=0;i<selectedItems.length;i++){
        if (selectedItems[i]['name'] !== nam){
            nl.push(selectedItems[i])
        }
    }
    setSelectedItems(nl)
}
    const handleSubmit = () => {

        if(props.url ===null || props.url.preurl===undefined || props.url.preurl === null || props.url.preurl===""){
            toast['current'].show({severity:'error', summary: 'Error', detail:'System error.', life: 3000});
            return
        }
        const body = {
            "seller_id":sellerId,
            "shop_id":shopId,
            "category":selectedRestICat?selectedRestICat!['category_name']:"",
            "name":itemname,
            "description":description,
            "images":[props.url.preurl],
            "price":price,
            "type":selectedFoodType,
            "add_ons":selectedItems,
            "sizes":sl,
            "choices":cl
        }
        setAddon(false)
 
        props.addItem(body)
        setTimeout(() => {toast['current'].show({severity:'success', summary: 'Success', detail:'Item added successfully.', life: 3000});},1200)
    }
    const [sizes,setSizess] = useState(false)
const [choices,setChoices] = useState(false)

    const [sn,setSN]=useState('')
    const [sp,setSP] = useState(0)
    const [sl,setSL] = useState<any>([])
    const [values, setValues] = useState<any>([
        <>
          <Row style={{marginTop:"30px"}}>
            <Col xs={6} sm={6} md={4} lg={4}>
              <label className="customLabel"></label>
            </Col>
            <Col>
              <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
                  <label className="customLabel">Name</label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <InputText
                    className="customFields"
                    placeholder="Name"
                    onChange={(e)=>{setSN(e.target.value)}}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
          <Col xs={6} sm={6} md={4} lg={4}>
              <label className="customLabel"></label>
            </Col>
            <Col>
              <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
              <label className="customLabel">Price</label>
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <InputNumber
                inputId="minmax"
                className="customFields"
                placeholder="Price"
                mode="decimal"
                min={0}
                max={100000}
                onChange={(e)=>{setSP(e.value)}}
              />
            </Col>
              </Row>
            </Col>
    
          </Row>
        </>,
      ]);
    const addSize = () => {
        if (values.length>20){
          toast["current"].show({
              severity: "info",
              summary: "Info",
              detail: "Cannot add more than 20 sizes",
              life: 3000,
            });
            return
        }
    
        if (sn == '' || sp == 0){
          toast["current"].show({
              severity: "info",
              summary: "Info",
              detail: "Name and Price cannot be empty",
              life: 3000,
            });
            return 
        }else{
          const ndl = [...sl]
          ndl.push({"name":sn,"price":sp})
          const newArrayList:any = [];
          ndl.forEach(obj => {
              if (!newArrayList.some(o => o.range=== obj.range)) {
                newArrayList.push({...obj});
              }
            });
          setSL(newArrayList)
          setSN('')
          setSP(0)
        }
      const v = (
        <>
          <Row style={{marginTop:"30px"}}>
            <Col xs={6} sm={6} md={4} lg={4}>
              <label className="customLabel"></label>
            </Col>
            <Col>
              <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
                  <label className="customLabel">Name</label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <InputText
                    className="customFields"
                    placeholder="Name"
                    onChange={(e)=>{setSN(e.target.value)}}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
          <Col xs={6} sm={6} md={4} lg={4}>
              <label className="customLabel"></label>
            </Col>
            <Col>
              <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
              <label className="customLabel">Price</label>
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <InputNumber
                inputId="minmax"
                className="customFields"
                placeholder="Price"
                mode="decimal"
                min={0}
                max={100000}
                onChange={(e)=>{setSP(e.value)}}
              />
            </Col>
              </Row>
            </Col>
    
          </Row>
        </>
      );
    
      const newList = [...values];
      newList.push(v);
      setValues(newList);
    };
    
    const removeSize = () =>{
    
        if (values.length<2){
              return
          }
          setSN(sl[sl.length-1]['name'])
          setSP(sl[sl.length-1]['price'])
        const newList = [...values];
        newList.pop();
        setValues(newList);
    
      }
      const [n,setN]=useState('')
      const [cl,setCL] = useState<any>([])
      const [opts,setOpts] = useState<any>([])
      const [mtc,setMTC] = useState(false)
      const [valuesC, setValuesC] = useState<any>([
          <>
            <Row style={{marginTop:"30px"}}>
              <Col xs={6} sm={6} md={4} lg={4}>
                <label className="customLabel"></label>
              </Col>
              <Col>
                <Row>
                <Col xs={12} sm={12} md={3} lg={3}>
                    <label className="customLabel">Choice Name</label>
                  </Col>
                  <Col xs={12} sm={12} md={9} lg={9}>
                    <InputText
                      className="customFields"
                      placeholder="Name"
                      onChange={(e)=>{setN(e.target.value)}}
                    />
                  </Col>
                </Row>
                <Row>


                </Row>
              </Col>
            </Row>
            <OptionLC opts={setOpts}/>
          </>,
        ]);

      const addChoice = () => {
          if (valuesC.length>20){
            toast["current"].show({
                severity: "info",
                summary: "Info",
                detail: "Cannot add more than 20 choices",
                life: 3000,
              });
              return
          }
      
          if (n == ''){
            toast["current"].show({
                severity: "info",
                summary: "Info",
                detail: "Name cannot be empty",
                life: 3000,
              });
              return 
          }else{
            const ndl = [...cl]
            ndl.push({"name":n,"options":opts})
            const newArrayList:any = [];
            ndl.forEach(obj => {
                if (!newArrayList.some(o => o.range=== obj.range)) {
                  newArrayList.push({...obj});
                }
              });
            setCL(newArrayList)
            setN('')
          }
        const v = (
          <>
           <Row style={{marginTop:"30px"}}>
              <Col xs={6} sm={6} md={4} lg={4}>
                <label className="customLabel"></label>
              </Col>
              <Col>
                <Row>
                <Col xs={12} sm={12} md={3} lg={3}>
                    <label className="customLabel">Choice Name</label>
                  </Col>
                  <Col xs={12} sm={12} md={9} lg={9}>
                    <InputText
                      className="customFields"
                      placeholder="Name"
                      onChange={(e)=>{setN(e.target.value)}}
                    />
                  </Col>

                </Row>
                <Row>


                </Row>

              </Col>
            </Row>
           <OptionLC opts={setOpts}/>
          </>
        );
      
        const newList = [...valuesC];
        newList.push(v);
        setValuesC(newList);
      };
      
      const removeChoice = () =>{
      
          if (valuesC.length<2){
                return
            }
            setN(cl[cl.length-1]['name'])
          const newList = [...valuesC];
          newList.pop();
          setValuesC(newList);
      
        }
    return (
        props.shops ?
            <div>
                <Toast ref={toast}></Toast>
                <Card>
                    <Card.Body style={{ padding: "33px 33px 33px 66px" }}>
                        <Row style={{ float: 'right' }}>
                            <DropdownComp sv={null} sellers={props.shops} setSellerID={setShopID}/>
                        </Row>
                        <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"5px",marginLeft:"20px"}}>Adding Items:<span style={{color:"green"}}></span></h1>
                            {/* <Row style={{padding:"30px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Current Category: {currentCategg}</h1>
                            </Row> */}
                            <Row style={{padding:"30px"}}>
                            </Row>
                            <Row style={{padding:"30px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Category</h1>
                                <Dropdown value={selectedRestICat} options={props.itemCats?props.itemCats.data?props.itemCats.data.data:[]:[]} optionLabel="category_name" onChange={(e)=>{setSelectedRestICat(e.value)}} placeholder="Select an item category" style={{minWidth:"100%"}}/>
                            </Row>
                            <Row style={{padding:"30px",paddingTop:"0px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Name</h1>
                                <InputText value={itemname} type="text" placeholder="Name" className="customFields" onChange={(e)=>{setItemName(e.target.value)}}/>
                            </Row>
                            <Row style={{padding:"30px",paddingTop:"0px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Description</h1>
                                <InputText value={description} type="text" placeholder="Description" className="customFields" onChange={(e)=>{setDescription(e.target.value)}}/>
                            </Row>
                            <Row style={{padding:"30px",paddingTop:"0px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Price</h1>
                                <InputNumber value={price} placeholder="Price" className="customFields" onValueChange={(e)=>{setPrice(e.value)}}/>
                            </Row>
                            <Row style={{padding:"30px",paddingTop:"0px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Type</h1>
                                <Dropdown value={selectedFoodType} options={fooodCat} onChange={(e)=>{setSelectedFoodType(e.value)}} placeholder="Select a type" className="customFields"/>
                            </Row>

                            <Row style={{padding:"30px",paddingTop:"0px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Sizes</h1>
                                <InputSwitch checked={sizes} onChange={(e) => {setSizess(e.value);}} style={{marginLeft:"20px"}}/>
                            </Row>
                            { sizes && <>
                                <Row>
        <Col xs={12} sm={12} md={4} lg={4}>
          <label className="customLabel">Sizes:</label>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8}>
          <Button icon="pi pi-plus" className="p-button-rounded p-button-info p-button-outlined" onClick={addSize} />
          <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" onClick={removeSize} style={{marginLeft:"20px"}}/>
        </Col>
      </Row>
      {values.map((data) => {
        return data;
      })}
                                </>
                            }



<Row style={{padding:"30px",paddingTop:"0px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Choices</h1>
                                <InputSwitch checked={choices} onChange={(e) => {setChoices(e.value);}} style={{marginLeft:"20px"}}/>
                            </Row>
                            { choices && <>
                                <Row>
        <Col xs={12} sm={12} md={4} lg={4}>
          <label className="customLabel">Choices:</label>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8}>
          <Button icon="pi pi-plus" className="p-button-rounded p-button-info p-button-outlined" onClick={addChoice} />
          <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" onClick={removeChoice} style={{marginLeft:"20px"}}/>
        </Col>
      </Row>
      {valuesC.map((data) => {
        return data;
      })}
                                </>
                            }

                            <Row style={{padding:"30px",paddingTop:"0px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Add ons</h1>
                                <InputSwitch checked={addon} onChange={(e) => {setAddon(e.value);console.log(sellerId);props.fetchItems({sellerId:sellerId,shopId:""});}} style={{marginLeft:"20px"}}/>
                            </Row>

                            {addon && <>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Available addons</h1><br/>
                               {props.items? props.items.data?<div style={{maxHeight:"400px",overflow:"hidden auto"}}>
                                {props.items.data.map(res =>{ return <div ><Row style={{marginTop:"10px",marginBottom:"30px",marginLeft:"30px"}}> 
                                <Col>
                                    {res.name}<br/>
                                    <Button style={{float:"left",marginTop:"10px"}} onClick={()=>{selectAddon(res.name)}}>Add</Button>
                                </Col>
                                <Col>
                                    <InputText type="text" placeholder="Price" className="customFields" onChange={(e)=>{setAddOnPrice(e.target.value)}}/>
                                    <InputText type="text" placeholder="Note" className="customFields" style={{marginTop:"15px"}} onChange={(e)=>{setAddOnNote(e.target.value)}}/>
                                </Col>
                                </Row></div>})}       
                               </div>:<i className="pi pi-spin pi-spinner" style={{'fontSize': '2em',marginTop:"25px"}}></i>:<i className="pi pi-spin pi-spinner" style={{'fontSize': '2em',marginTop:"25px"}}></i>}
                            </>}
                            { addon && <>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px",marginTop:"20px"}}>Selected addons</h1><br/>
                                {selectedItems.map(res =>{ return <div ><Row style={{marginTop:"10px",marginBottom:"30px",marginLeft:"30px"}}> 
                                <Col>
                                    {res.name}<br/>
                                </Col>
                                <Col>
                                    <Button style={{float:"left",marginTop:"10px"}} onClick={()=>{removeAddon(res.name)}}>Remove</Button>
                                </Col>
                                </Row></div>})}  
                            </>
                            }
                            <Row style={{padding:"30px",paddingTop:"0px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Images</h1><br/>
                                <FileUpload style={{minWidth:"100%"}}name="demo[]" customUpload={true} uploadHandler={onTemplateUpload} onUpload={onTemplateUpload} multiple accept="image/*" maxFileSize={1000000}
                                emptyTemplate={<p className="p-m-3" style={{fontSize:"15px",width:"100%"}}>Drag and drop files to here to upload.</p>} />
                            </Row>
                            <Row style={{float:"right",marginRight:"20px"}}>
                                <Button onClick={handleSubmit} style={{float:"right"}}>Add</Button>
                            </Row>
                    </Card.Body>
                </Card>
            </div> : <div></div>
    )
}
const mapStateToProps = (state: any) => ({
    url: state.util.preSignedUrl,
    seller: state.seller.data,
    itemCats: state.itemCat.data,
    shops: state.shop.data,
    items: state.item.data,
    categories: state.category.data,
})
const mapDispatchToProps = dispatch => ({
    getPresignedUrl: (data) => { dispatch(utilRequest(data)) },
    getSellers: (d) => { dispatch(sellerGetRequest(d)) },
    addShop: (data) => { dispatch(shopRequest(data)) },
    fetchItems:(d:any) => {dispatch(itemGetRequest(d))},
    addItem:(data:any) => {dispatch(itemRequest(data))},
    putitems:(data:any) =>{dispatch(itemPUTRequest(data))},
    fetchcats: (d) => { dispatch(ItemCatGetRequest(d)) },
    fetchShops: (dshop) => { dispatch(shopGetRequest(dshop)) },
});
export default ItemLayout = connect(mapStateToProps, mapDispatchToProps)(ItemLayout)
