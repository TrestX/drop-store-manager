import React, { useState,useRef } from 'react';
import {Button} from 'primereact/button';
import { connect } from 'react-redux'
import { categoryRequest } from '../../redux/actions/CategoryAction';
import { Row,Col } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import {types,subDealsTypes} from './CategoryConstants';
import {InputText} from 'primereact/inputtext';
import "./categoryForm.css";
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
interface Props {
    addCategoryDetails: (data) => void
}
let FormLayout: React.FunctionComponent<Props> = props => {
    const toast:any = useRef(null);
    const [type,setType] = useState<any>();
    const onTypeChange = (e:any)=>{
        setType(e.value)
    }
    const [deal,setDeal] = useState<any>();
    const onDealChange = (e:any)=>{
        setDeal(e.value)
    }
    const [subdeal,setsubDeal] = useState<any>();
    const onSubDealChange = (e:any)=>{
        setsubDeal(e.value)
    }
    const handleSubmit = () => {
        const body = {
            "type":type['name'],
            "deal":deal,
            "deal_type":subdeal["name"],
            "status":"Active"
        }
        props.addCategoryDetails(body)
        setTimeout(() => {toast['current'].show({severity:'success', summary: 'Success', detail:'Deal added successfully.', life: 3000});},2000)
    }
    const fileUploadRef:any = useRef(null);
    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });
        setTotalSize(_totalSize);
    }
    const onTemplateRemove = (callback) => {
        setTotalSize(0);
        callback();
    }
    const onTemplateClear = () => {
        setTotalSize(0);
    }
    const [totalSize, setTotalSize] = useState(0);
    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef["current"].formatSize(totalSize) : '0 B';
        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} className="fileSizeProgressBar"></ProgressBar>
            </div>
        );
    }
    const itemTemplate = (file, props) => {
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3" style={{marginLeft:"23px"}}>
                        {file.name}
                        <small style={{marginLeft:"13px"}}>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto fileClearButton" onClick={() => onTemplateRemove(props.onRemove)} />
            </div>
        )
    }
    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5 dragandDropIcon" ></i>
                <span  className="p-my-5 dragandDrop" >Drag and Drop Image Here</span>
            </div>
        )
    }
    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};
    return (
        <div className="customPadding">
                <Toast ref={toast}></Toast>
                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
              <label className="customLabel">Seller Type:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
              <Dropdown value={type} options={types} onChange={onTypeChange} optionLabel="name" placeholder="Select a Type" className="dropDown" style={{minWidth:"100%"}}/>
              </Col> 
            </Row>  
            { type &&  
            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
                <label className="customLabel">Deals:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <Dropdown value={subdeal} options={subDealsTypes} onChange={onSubDealChange} optionLabel="name" placeholder="Select a deal type" className="dropDown" style={{minWidth:"100%"}}/>
              </Col> 
              <Col xs={12} sm={12} md={4} lg={4}>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <InputText  type="text" placeholder="Deal Name" className="customFields" onChange={(e)=>{setDeal(e.target.value)}}/>
              </Col> 
            </Row> }            
            <Row>
            <Col xs={12} sm={12} md={12} lg={12} style={{marginTop:"20px"}}>
            <div className="card">
                    <FileUpload ref={fileUploadRef} name="demo[]" customUpload={true} uploadHandler={onTemplateUpload} accept="image/*" maxFileSize={1000000}
                        onUpload={onTemplateUpload} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                </div>
                </Col>
            </Row>
            <Row style={{marginTop:"20px"}}>
                <Col>
                    <Button onClick={handleSubmit} className="catButton">Add</Button>
                </Col>
            </Row>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
})
const mapDispatchToProps = dispatch => ({
    addCategoryDetails: (data) => { dispatch(categoryRequest(data))}
});
export default FormLayout = connect(mapStateToProps, mapDispatchToProps)(FormLayout)  