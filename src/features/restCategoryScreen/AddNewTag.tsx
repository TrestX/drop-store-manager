import React, { useRef, useState,useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { connect } from 'react-redux'
import { utilRequest } from '../../redux/actions/UtilActions';
import {ItemCatRequest} from "../../redux/actions/itemCategoryAction";
import { Row,Col } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import { shopGetRequest } from '../../redux/actions/ShopActions';
import {category} from './restCatContants';
import "./AddNew.css";
    interface Props {
        addItemCat:(data) => void;
    }
    let AddNewTagCat: React.FunctionComponent<Props> = props => {
        const toast:any = useRef(null);
        const [name, setName] = useState("");
        const [cattype,setCatType] = useState<any>();
        const onCatTypeChange = (e:any)=>{
            setCatType(e.value)
        }
        const handleSubmit = () => {
            const body={
                "tag_name":name,
                "status":"Active",
                "category_name":"",
                "shop_type":cattype['name'],
            }
            props.addItemCat(body)
            setTimeout(() => {toast['current'].show({severity: 'success', summary: 'Success', detail: 'Tag added successfully', life: 3000});},2000)
        }
        return (
            <div>
                <Toast ref={toast}></Toast>
                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
                <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
              <label className="customLabel" >Tag name:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <InputText  type="text" placeholder="Tag name" className="customFields" onChange={(e)=>{setName(e.target.value)}}/>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
              <label className="customLabel">Shop Type:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
              <Dropdown value={cattype} options={category} onChange={onCatTypeChange} optionLabel="name" placeholder="Select a shop type" className="customFields"/>
              </Col> 
            </Row> 
            <Row>
                <Button onClick={handleSubmit} className="bButton">Add</Button>
            </Row>
                
            </div>
        )
    }
    const mapStateToProps = (state: any) => ({
        shops: state.shop.data,
    })
    const mapDispatchToProps = dispatch => ({
        fetchShops: (d) => { dispatch(shopGetRequest(d)) },
        addItemCat: (data) => { dispatch(ItemCatRequest(data))}
    });
export default AddNewTagCat= connect(mapStateToProps, mapDispatchToProps)(AddNewTagCat)


