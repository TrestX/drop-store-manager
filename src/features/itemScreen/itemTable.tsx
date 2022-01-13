import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {Checkbox} from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { connect } from 'react-redux';
import { MultiSelect } from 'primereact/multiselect';
import { shopGetRequest,shopPUTRequest } from '../../redux/actions/ShopActions';
import { itemGetRequest,itemRequest,itemPUTRequest} from '../../redux/actions/ItemAction';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card,Modal,ModalBody, Row,Col } from 'react-bootstrap';
import { utilRequest } from '../../redux/actions/UtilActions';
import {InputSwitch} from 'primereact/inputswitch';
import { Dialog } from 'primereact/dialog';
import { Menu } from 'primereact/menu';
import {useHistory} from 'react-router-dom'
import { categoryGetRequest} from '../../redux/actions/CategoryAction';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import {ItemCatGetRequest} from "../../redux/actions/itemCategoryAction";
import axios from "axios";
import jwt_decode from "jwt-decode";
interface Props {
    items:any;
    fetchShops: (dshop) => void;
    fetchItems:(d) => void;
    addItem:(data) => void;
    putitems: (d) => void;
    itemCats:any;
    fetchcats: (d) => void;
    url:any,
    categories: any;
    fetchcategories: (d) => void;
    getPresignedUrl: (data) => void;
    sId:any;
}

let ItemComp: React.FunctionComponent<Props> = props => {
    const [expandedRows, setExpandedRows] = useState<any>({});
    const [category, setCategory] = useState("");
    const [itemname, setItemName] = useState("");
    const toast:any = useRef(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedFoodType, setSelectedFoodType] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt:any = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [showMap,setShowMap] = useState(false)
    const [rowData,setRowData] = useState<any>({})
    const [selectedDeal, setSelectedDeal] = useState<any>();
    const [showSModal,setShowSModal] = useState(false);
    const [showSIModal,setShowSIModal] = useState(false);
    const [showSIAModal,setShowSIAModal] = useState(false);
    const [showESModal,setShowESModal] = useState(false);
    const [showOldIMG,setShowOldIMG] = useState<any>();
    const [showEditTimingModal,setShowEditTimingModal] = useState(false);
    const [currentCategg,setcurrentCategg] = useState<any>();
    const [sId, setsId] = useState('');
    const [currentA,setCurrentA] = useState<any>()
    const history = useHistory();
    const [deleteModal,setDeleteModal] = useState(false);
    const fooodCat = [
        'Veg', 'Non-Veg'
    ];
    const statuses = [
        'Closed', 'Open'
    ];
    const types = [
        'Pharmacy', 'Grocery store', 'Restaurant'
    ];

    
    const menu:any = useRef(null);

    const menu1:any = useRef(null);
    const items1 = [
        {
            label: 'Available deals',
            icon: 'pi pi-money-bill',
            command: () => {
                const d = {type:""};
                props.fetchcategories(d);
                setShowSIModal(true);
            }
        },
        {
            label: 'Delete Item',
            icon: 'pi pi-trash',
            command: () => {
                setDeleteModal(true);
            }
        },
        // {
        //     label: 'Add Items',
        //     icon: 'pi pi-shopping-cart',
        //     command: () => {
        //         // props.fetchcats({"type":currentA['type']});
        //         setShowSIAModal(true);
        //     }
        // },
        {
            label: 'Edit item',
            icon: 'pi pi-pencil',
            command: () => {
                // props.fetchcats({"type":currentA['type']});
                setItemName(currentAI['name']);
                setDescription(currentAI['description']);
                setSelectedFoodType(currentAI['type']?currentAI['type'].replace(/\b\w/g, l => l.toUpperCase()):"");
                setPrice(currentAI['price']);
                setcurrentCategg(currentAI['category'])
                setShowOldIMG(currentAI['images']?currentAI['images'][0]:"")
                setShowSIAModal(true);
                if(currentAI['add_ons']){
                    setAddon(true)
                    setSelectedItems(currentAI['add_ons'])
                }
                
            }
        },
    ];
    const [sIdD,sellerIDD] = useState("")
    const [shpID,shopIDD] = useState("")
    useEffect(() => {
        const path = window.location.href.split('/')[window.location.href.split('/').length-1];
        let d = {sellerId:"",type:"",status:""}

        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        if (token != ""){
            var decoded:any = jwt_decode(token!);
            if (path !== 'items' && path != 'shop'){
                shopIDD(path)
                sellerIDD(decoded["userid"])
                props.fetchItems({sellerId:decoded["userid"],shopId:path})
            }else if (props.sId !=""){
                props.fetchItems({sellerId:decoded["userid"],shopId:props.sId})
            }else{
                props.fetchItems({sellerId:decoded["userid"],shopId:props.sId})
            }

        }

    


        // props.fetchcats({"type":currentA['type']})
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const [ratings,setRatings] = useState<any>([])
    useEffect(() => {
            const config:any = {
                method: 'get',
                url: 'https://api.drop-deliveryapp.com/docker3/ratingsReviews?entityId='+Object.keys(expandedRows)[0],
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
            }
    
            axios(config).then(res => {setRatings(res.data.data)});
        
    }, [expandedRows]); 
    const onStatusChange = (e) => {
        dt.current.filter(e.value, 'shop_status', 'equals');
        setSelectedStatus(e.value);
    }
    const onTypeChange = (e) => {
        dt.current.filter(e.value, 'type', 'equals');
        setSelectedType(e.value);
    }
    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{fontSize:"12.5px",fontWeight:660,textTransform:'capitalize'}}>{rowData['shop_name']}</span>

            </React.Fragment>
        );
    }
    const sellerEmailBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize'}}>{rowData['sellerEmail']}</span>
                
            </React.Fragment>
        );
    }
    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize'}}>{rowData.shop_status}</span>
            </React.Fragment>
        );
    }
    const typeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize'}}>{rowData.type}</span>
            </React.Fragment>
        );
    }
    const dealBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                { rowData.deal!== undefined && <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize'}}>{rowData.deal}</span>
                }
                { rowData.deal=== undefined && <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize',color:"#af2f2f"}}>No deal available</span>
                }
            </React.Fragment>
        );
    }
    const timingBodyTemplate = (rowData) => {
        const open = rowData.timing.split("-")[0].substring(0,5) + ' am'
        const close = rowData.timing.split('-')[1].substring(0,5) + ' pm'
        return (
            <React.Fragment>
                 <span style={{fontSize:"12.5px",fontWeight:600}}>{open} - {close}</span>
            </React.Fragment>
        );
    }
    const statusItemTemplate = (option) => {
        return <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize'}}>{option}</span>;
    }
    const typeItemTemplate = (option) => {
        return <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize'}}>{option}</span>;
    }
    const changeItemfeatureds = (rowData,status,so)=>{
        const body = {
            "featured":status,
            "featured_app":so,
            "id":rowData["item"],
            "shopid":currentA['shop_id']
        }
        props.putitems(body)
    }
    const changeItemfeaturedA = (rowData,status,so)=>{
        const body = {
            "featured":so,
            "featured_app":status,
            "id":rowData["item"]
        }
        props.putitems(body)
    }
    const featuredItemTemplate = (rowData) => {
        return <>{rowData.featured && <InputSwitch checked={rowData.featured} onChange={()=>{changeItemfeatureds(rowData,false,rowData.featured_app)}}/>}
            {!rowData.featured && <InputSwitch checked={rowData.featured} onChange={()=>{changeItemfeatureds(rowData,true,rowData.featured_app)}}/>}
        </>;
    }
    const featuredAppItemTemplate = (rowData) => {
        return <>{rowData.featured_app && <InputSwitch checked={rowData.featured_app}  onChange={()=>{changeItemfeaturedA(rowData,false,rowData.featured)}} disabled/>}
            {!rowData.featured_app && <InputSwitch checked={rowData.featured_app}  onChange={()=>{changeItemfeaturedA(rowData,true,rowData.featured)}} disabled/>}
        </>;
    }
    const onTemplateUpload = (e) => {
        onUpload(e.files)
    }
    const onCSVUpload = (e) => {
        onUpload(e.files)
        var reader = new FileReader();
        reader.onload = function(ee) {
        }
        reader.readAsText(e.files[0]);
        console.log(reader)
    }
    const onUpload = (e:any) => {
        let nameList:any=[]
        let objectUrls:any=[]
        for (let i=0;i<e.length;i++){
            nameList.push(e[i].name)
            objectUrls.push(e[i])
        }
        const data = {
            "name":nameList,
            "objectUrl":objectUrls,
            "path":"items"
        }
        props.getPresignedUrl(data)
        setTimeout(() => {toast['current'].show({severity:'success', summary: 'Success', detail:'Image uploaded successfully.', life: 3000});},1200)
    }
    const foodTypeBody = (rowData) => {
        if (rowData['type']==='Non-Veg'){
            return <img src="https://www.pngkey.com/png/detail/245-2459071_non-veg-icon-non-veg-symbol-png.png" width={27} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.logo} />;
        }else{
            return <img src="https://tpng.net/download/0x0_261-2619381_veg-icon-png.png" width={27} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.logo}/>;
        }
    }
    const deleteCatDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={()=>{setDeleteModal(false)}} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={()=>{ setTimeout(() => {toast['current'].show({severity:'success', summary: 'Success', detail:'Item deleted successfully.', life: 3000})},1500);   }} />
        </>
    );
    const reset = () => {
        setSelectedStatus(null);
        setGlobalFilter('');
        setSelectedDate(undefined);
        dt.current.reset();
    }
    const handleSubmit = () => {
        if(props.url ===null || props.url.preurl===undefined || props.url.preurl === null || props.url.preurl===""){
            toast['current'].show({severity:'error', summary: 'Error', detail:'System error.', life: 3000});
            return
        }
        const body = {
            "seller_id":currentA['seller_id'],
            "shop_id":currentA['shop_id'],
            "category":selectedRestICat?selectedRestICat!['category_name']:"",
            "name":itemname,
            "description":description,
            "images":[props.url.preurl],
            "price":price,
            "type":selectedFoodType,
            "add_ons":selectedItems
        }
        setAddon(false)
 
        props.addItem(body)
        setTimeout(() => {toast['current'].show({severity:'success', summary: 'Success', detail:'Item added successfully.', life: 3000});       setShowSIAModal(false)},1200)
    }
    const [selectedDate, setSelectedDate] = useState<any>();

    const formatDate = (date) => {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }
    const [fs,setFs] = useState("")
    const codeFilter = (value, filter) => {
        var date1:any = new Date(value!);
        var date2:any = new Date(filter.split(":")[0]);
        var date3:any = new Date(filter.split(":")[1]);
        console.log(filter.split(":")[0],filter.split(":")[1])
        console.log(date1.getTime(),date2.getTime(),date3.getTime())

        return date1.getTime()>date2.getTime() && date1.getTime()< date3.getTime();
    }
    const onDateChange = (e) => {
        if (e.value[1]!==null){
            let dat2 = formatDate(e.value[1])
            dt.current.filter(fs+":"+dat2, 'created_time', 'custom');
            setSelectedDate(e.value);
            return
        }
        if (e.value[0]!==null && e.value[1]===null){
            let dat2 = formatDate(e.value[0])
            setFs(dat2)
            setSelectedDate(e.value);
            return
        }
    }
    const [csvUpload,setCsvUpload] = useState(false)
    const importCSV = (e) => {
        setCsvUpload(true)
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e!.target!.result!;
            const data = (csv! as string).split('\n');
    
            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();
    
            const importedData = data.map(d => {
                d.split(',')
                if (d.split(',').length===5){
                    const body = {
                        "seller_id":sIdD,
                        "shop_id":shpID,
                        "category":d.split(',')[1],
                        "name":d.split(',')[0],
                        "description":d.split(',')[4],
                        "images":[''],
                        "price":parseInt(d.split(',')[2]),
                        "type":d.split(',')[3],
    
                    }
                    props.addItem(body)
                }
            });
            props.fetchItems({sellerId:sIdD,shopId:shpID})
            setCsvUpload(false)
            
        };
    
        reader.readAsText(file, 'UTF-8');
    }
    useEffect(() => {
        if (sIdD !=='' && shpID !=''){
            props.fetchItems({sellerId:sIdD,shopId:shpID})   
        }
     // props.fetchcats({"type":currentA['type']})
    }, [csvUpload]); // eslint-disable-line react-hooks/exhaustive-deps

    const header = (
        <div className="table-header" style={{justifyContent:'right'}}>
                            <Row style={{textAlign:"right",float:'right'}}>
                                <div style={{marginLeft:"auto",display:"inline"}}>
                                    <span><Button style={{marginRight:"130px"}} onClick={()=>{window.location.href = "assets/itemstemp.csv"}}>Download Template</Button></span>
                                    
                                    <span><FileUpload mode="basic" name="demo[]" auto accept=".csv" chooseLabel="Import" style={{marginTop:'-43px'}} uploadHandler={importCSV} customUpload={true} onUpload={importCSV} />
                                </span>
                                </div>
                            </Row>
        </div>
    );
    const statusFilter = <Dropdown value={selectedStatus} options={statuses} onChange={onStatusChange} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear style={{width:"127px"}}/>;
    const typeFilter = <Dropdown value={selectedType} options={types} onChange={onTypeChange} itemTemplate={typeItemTemplate} placeholder="Select a Type" className="p-column-filter" showClear style={{width:"127px"}}/>;
    const dateFilter = <Calendar readOnlyInput value={selectedDate} onChange={onDateChange} dateFormat="yy-mm-dd" selectionMode="range" className="p-column-filter" placeholder="Select Date" style={{width:"180px"}}/>;
    const dealOptionTemplate = (option: any) => {
        return (
            <div className="country-item">
                <div>{option.deal}</div>
            </div>
        );
    }
    const [dString,setDString] = useState("")
    const [currentAI,setCurrentAI] = useState<any>()
    const onItemDealChange = (e:any) =>{
        setSelectedDeal(e.value);
        let s = ""
        if (e.value && e.value.length >0){
            for (let i = 0;i<e.value.length;i++){
                s = s+ e.value[i].deal +", "
            }
        }
        setDString(s)
    }
    const onDealSubmit=()=>{
        const body = {
            "deal":dString,
            "id":currentAI["item"]
        }
        props.putitems(body)
        setSelectedDeal(undefined)
        setShowSIModal(false)
    }
const [addon,setAddon] = useState(false)
    const actionITemplate = (rowData) => {
        return <><Menu model={items1} popup ref={menu1} id="popup_menu" /><img src="https://img.icons8.com/fluency/27/000000/menu-2.png" onClick={(event) => {menu1['current'].toggle(event);setCurrentAI(rowData);}}/></>
}
const [selectedAddons, setSelectedAddons] = useState(null);
const [selectedRestICat,setSelectedRestICat] = useState(null);
const [openAddons,setOpenAddons] = useState(false)
const [addOnsRow, setAddOnsRow] = useState()
const addonBodyTemplate = (rowData)=>{
    return <React.Fragment>
        { rowData.add_ons!== undefined && <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize',cursor:'pointer',color:'#23a7ff'}} onClick={()=>{setOpenAddons(true);setAddOnsRow(rowData.add_ons)}}>View add ons</span>
        }
        { rowData.add_ons=== undefined && <span style={{fontSize:"12.5px",fontWeight:600,textTransform:'capitalize',color:"#af2f2f"}}>No add ons</span>
        }
    </React.Fragment>
}
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
const [openTime, setOpen] = useState<Date | Date[] | undefined | any>(undefined);
const [closeTime, setClose] = useState<Date | Date[] | undefined | any>(undefined);
const DateTemp = (rowData) => {
    return <h1 style={{fontSize:"12px",fontWeight:500,color:"grey",textTransform:"capitalize"}}>{rowData["created_time"].split("T")[0]}</h1> ;
}
    return (
        props.items?
        <div className="datatable-filter-demo">
                        <Toast ref={toast}></Toast>
                        
                    <div className="card" style={{border:"none"}}>
                                <DataTable value={props.items.data} style={{backgroundColor:"white"}} header={header} paginator rows={15}>
                                    <Column field="name" header="Name" style={{fontSize:"12.5px"}}/>
                                    <Column field="category" header="Category" style={{textAlign:"center",fontSize:"12.5px"}}/>
                                    <Column field="description" header="Description" style={{textAlign:"center",fontSize:"12.5px"}} />
                                    <Column field="featured" header="Featured on shop" style={{textAlign:"center",fontSize:"12.5px"}} body={featuredItemTemplate}/>
                                    <Column field="featured" header="Featured on app" style={{textAlign:"center",fontSize:"12.5px"}} body={featuredAppItemTemplate}/>
                                    <Column field="price" header="Price" style={{textAlign:"center",fontSize:"12.5px"}}/>
                                    <Column field="type" header="Type" body={foodTypeBody} style={{textAlign:"center",fontSize:"12.5px",width:"8rem"}}/>
                                    <Column field="addons" header="Add ons" body={addonBodyTemplate} style={{textAlign:"center",fontSize:"12.5px"}}/>
                                    <Column field="deal" header="Active Deal" body={dealBodyTemplate} style={{textAlign:"center",fontSize:"12.5px"}}/>
                                    <Column style={{width:"4em",fontSize:"12.5px"}} body={actionITemplate}/>
                                </DataTable>
            </div>
            <Dialog header="" visible={csvUpload} style={{ width: '30vw' }} onHide={()=>{setCsvUpload(false)}}>
                            <ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto",zIndex:9999999999}} strokeWidth="1" animationDuration=".5s"/>
                </Dialog>
        <Dialog header="Add on items" visible={openAddons} style={{ width: '90vw' }} onHide={()=>{setOpenAddons(false)}}>
            {addOnsRow?
                    <div className="card" style={{border:"none"}}>
                                <DataTable value={addOnsRow} style={{backgroundColor:"white"}} paginator rows={5}>
                                    <Column field="name" header="Name" style={{fontSize:"12.5px"}}/>
                                    <Column field="price" header="Price" style={{textAlign:"center",fontSize:"12.5px"}}/>
                                    <Column field="note" header="Note" style={{textAlign:"center",fontSize:"12.5px"}} />
                                </DataTable>
                    </div>:<ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1" animationDuration=".5s"/>}
  
        </Dialog>

        <Dialog header="Apply Deal" visible={showSIModal} style={{ width: '30vw' }} onHide={()=>{setShowSIModal(false)}}>
                            <Row style={{padding:"30px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555}}>Available Deals</h1>                       
                                {props.categories && props.categories.data && props.categories.data.length>0 && <MultiSelect value={selectedDeal} options={props.categories.data} onChange={onItemDealChange} optionLabel="deal" itemTemplate={dealOptionTemplate}  placeholder={currentAI['deal']} style={{minWidth:"100%",minHeight:"40px"}}/>}
                                <Button onClick={onDealSubmit} style={{marginTop:"15px",marginLeft:"auto"}}>Apply Deal</Button>
                            </Row>
        </Dialog>
        <Dialog header="Add Items" visible={showSIAModal} style={{ width: '70vw' }} onHide={()=>{setShowSIAModal(false)}}>
                        <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"5px",marginLeft:"20px"}}>Adding Items:<span style={{color:"green"}}></span></h1>
                            <Row style={{textAlign:"right"}}>
                                <div style={{marginLeft:"auto",display:"inline"}}>
                                    <span><Button style={{marginRight:"130px"}} onClick={()=>{window.location.href = "assets/itemstemp.csv"}}>Download Template</Button></span>
                                    <span><FileUpload style={{marginTop:"-41px"}} mode="basic" name="demo[]"  accept="text/csv" maxFileSize={1000000} customUpload={true} auto uploadHandler={onCSVUpload} onUpload={onCSVUpload} />
                                </span>
                                </div>
                            </Row>
                            {/* <Row style={{padding:"30px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Current Category: {currentCategg}</h1>
                            </Row> */}
                            <Row style={{padding:"30px"}}>
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Category</h1>
                                <Dropdown value={selectedRestICat} options={props.itemCats?props.itemCats.data?props.itemCats.data.data:[]:[]} optionLabel="category_name" onChange={(e)=>{setSelectedRestICat(e.value)}} placeholder="Select an item category" className="customFields"/>
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
                                <h1 style={{fontSize:"15.2px",fontWeight:555,marginBottom:"15px"}}>Add ons</h1>
                                <InputSwitch checked={addon} onChange={(e) => {setAddon(e.value);props.fetchItems({shopid:currentA['shop_id']});}} style={{marginLeft:"20px"}}/>
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
                            <Row>
                            <Row>
                            <img src={showOldIMG} width={150} height={100}  style={{borderRadius:"10px",marginLeft:"40px"}} onError={(e) => e.target['src']='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.logo} className="product-image" />
                            </Row>
                            </Row>
                            <Row style={{float:"right",marginRight:"20px"}}>
                                <Button onClick={handleSubmit} style={{float:"right"}}>Add</Button>
                            </Row>

        </Dialog>
        <Dialog header="Delete Item" visible={deleteModal} className="dialogSize" modal footer={deleteCatDialogFooter} onHide={()=>{setDeleteModal(false)}}>
                <Row >
                <div className="dialogCss">
                <span>
                                        Are you sure you want to delete <b>{currentA && currentA['item_name']}</b> item?
                                    </span>
                </div>
                </Row>
            </Dialog> 
        </div>:<ProgressSpinner style={{width: '200px', height: '270px',display:"block",margin:"60px auto 20px auto"}} strokeWidth="1" animationDuration=".5s"/>
    );
}

const mapStateToProps = (state: any) => ({
    url: state.util.preSignedUrl,
    shops: state.shop.data,
    items: state.item.data,
    categories: state.category.data,
    itemCats: state.itemCat.data
})
const mapDispatchToProps = dispatch => ({
    getPresignedUrl: (data) => { dispatch(utilRequest(data)) },
    fetchShops: (dshop) => { dispatch(shopGetRequest(dshop)) },
    fetchItems:(d:any) => {dispatch(itemGetRequest(d))},
    addItem:(data:any) => {dispatch(itemRequest(data))},
    putitems:(data:any) =>{dispatch(itemPUTRequest(data))},
    fetchcategories: (d:any) => { dispatch(categoryGetRequest(d)) },
    fetchcats: (d) => { dispatch(ItemCatGetRequest(d)) },   
});
export default ItemComp = connect(mapStateToProps, mapDispatchToProps)(ItemComp)

                 