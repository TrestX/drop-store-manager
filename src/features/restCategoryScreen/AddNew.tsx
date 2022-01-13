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
        url:any,
        getPresignedUrl: (data) => void;
        addItemCat:(data) => void;
    }
    let AddNewCat: React.FunctionComponent<Props> = props => {
        const [totalSize, setTotalSize] = useState(0);
        const toast:any = useRef(null);
        const [name, setName] = useState("");
        const [cattype,setCatType] = useState<any>();
        const onCatTypeChange = (e:any)=>{
            setCatType(e.value)
        }
        const fileUploadRef:any = useRef(null);
        const onUpload = async (e:any) => {
            const data = {
                "name":[e[0].name],
                "objectUrl":e[0],
                "path":"category"
            }
            props.getPresignedUrl(data)
        }
        const handleSubmit = () => {
            if(props.url ===null || props.url.preurl===undefined || props.url.preurl === null || props.url.preurl===""){
                toast['current'].show({severity:'error', summary: 'Error', detail:'System error.', life: 3000});
                return
            }
            const body={
                "category_name":name,
                "status":"Active",
                "presignedurl":props.url.preurl,
                "shop_type":cattype['name'],
            }
            props.addItemCat(body)
            setTimeout(() => {toast['current'].show({severity: 'success', summary: 'Success', detail: 'Category added successfully', life: 3000});},2000)
        }

        const onTemplateUpload = (e) => {
            let _totalSize = 0;
            e.files.forEach(file => {
                _totalSize += (file.size || 0);
            });
            setTotalSize(_totalSize);
            onUpload(e.files)
        }
        const onTemplateRemove = (callback) => {
            setTotalSize(0);
            callback();
            setIWidth("")
            setIHeight("")
        }
        const onTemplateClear = () => {
            setTotalSize(0);
            setIWidth("")
            setIHeight("")
        }
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
        const [selectedShop, setSelectedShop] = useState<any>(null);
        const [iWidth,setIWidth] = useState("")
        const [iHeight,setIHeight] = useState("")
        const imgDim = (file:any) =>{
            let img = new Image()
            img.src = window.URL.createObjectURL(file)
            img.onload = () => {
                setIWidth(img.width.toString())
                setIHeight(img.height.toString())
            }
        }
        const itemTemplate = (file, props) => {
            imgDim(file)
            return (
                <div className="p-d-flex p-ai-center p-flex-wrap">
                    <div className="p-d-flex p-ai-center" style={{width: '40%'}}>
                        <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                        <span className="p-d-flex p-dir-col p-text-left p-ml-3" style={{marginLeft:"23px"}}>
                            {file.name}
                            <small style={{marginLeft:"13px"}}>{new Date().toLocaleDateString()}</small>
                        </span>
                        {iWidth !=="" && <h5 className="bannerDimension">New Dimensions: 900 X 600</h5>}
                            {iWidth !=="" && <h5 className="bannerDimension">Original Dimensions: {iWidth} X {iHeight}</h5>}

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
            <div>
                <Toast ref={toast}></Toast>
                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
                <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
              <label className="customLabel" >Category name:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <InputText  type="text" placeholder="Category name" className="customFields" onChange={(e)=>{setName(e.target.value)}}/>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
              <label className="customLabel">Shop Type:</label>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
              <Dropdown value={cattype} options={category} onChange={onCatTypeChange} optionLabel="name" placeholder="Select a shop type" className="customFields"/>
              </Col> 
            </Row> 
                <div className="card">
                    <FileUpload ref={fileUploadRef} name="demo[]" customUpload={true} uploadHandler={onTemplateUpload} accept="image/*" maxFileSize={1000000}
                        onUpload={onTemplateUpload} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                </div>
                <Row>
                <Button onClick={handleSubmit} className="bButton">Add</Button>
                </Row>
                
            </div>
        )
    }
    const mapStateToProps = (state: any) => ({
        url: state.util.preSignedUrl,
        shops: state.shop.data,
    })
    const mapDispatchToProps = dispatch => ({
        fetchShops: (d) => { dispatch(shopGetRequest(d)) },
        getPresignedUrl: (data) => { dispatch(utilRequest(data)) },
        addItemCat: (data) => { dispatch(ItemCatRequest(data))}
    });
export default AddNewCat= connect(mapStateToProps, mapDispatchToProps)(AddNewCat)


