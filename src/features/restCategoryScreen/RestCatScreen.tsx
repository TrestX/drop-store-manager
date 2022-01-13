import AddNewCat  from './AddNew';
import { Container,Row,Col } from 'react-bootstrap';
import { TabView, TabPanel } from 'primereact/tabview';
import DataTableSort from './SimpleTable';
import { BreadCrumb } from 'primereact/breadcrumb';
import AddNewTagCat  from './AddNewTag';
import DataTableSortTag from './TagTable';
const RestCatScreen = () => {
    const items = [
        {label:"Item Categories"},
      ];
      const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (        
        <>
    <Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
    <BreadCrumb model={items} home={home} />
            <Row style={{marginBottom:"10px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TabView className="p-tabview-50" style={{borderRadius:"5px"}}>
                     <TabPanel header={<img src="https://img.icons8.com/dotty/80/000000/category.png" width="25px"/>}>
                            <DataTableSort/>    
                        </TabPanel>
                        <TabPanel header={<i className="pi pi-plus-circle" style={{color:"#2d88ff",fontSize:"25px"}}></i>}>
                             <h5 style={{fontSize:"17px",fontWeight:700,margin:"7px 7px 14px 0px",fontFamily:"sans-serif"}}>Add new item category</h5>
                            <AddNewCat/>
                        </TabPanel>
                        <TabPanel header={<img src="https://img.icons8.com/fluency/48/000000/diversity.png" width="25px"/>}>
                             <h5 style={{fontSize:"17px",fontWeight:700,margin:"7px 7px 14px 0px",fontFamily:"sans-serif"}}>Add new tag</h5>
                             <DataTableSortTag/>
                        </TabPanel>
                        <TabPanel header={<i className="pi pi-plus-circle" style={{color:"green",fontSize:"25px"}}></i>}>
                             <h5 style={{fontSize:"17px",fontWeight:700,margin:"7px 7px 14px 0px",fontFamily:"sans-serif"}}>Add new tag</h5>
                             <AddNewTagCat/>
                        </TabPanel>
                            
                    </TabView>                   
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default RestCatScreen;