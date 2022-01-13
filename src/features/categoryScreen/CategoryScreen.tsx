import { TabView, TabPanel } from 'primereact/tabview';
import FormLayout from './CategoryForm';
import CategoryTable from './CategoryTable';
import {Container} from 'react-bootstrap';
import './CatecoreScree.css';
import { BreadCrumb } from 'primereact/breadcrumb';
const CategoryScreen = () => {
    const items = [
        {label:"Deals"},
      ];
      const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (        
        <>
        <Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
        <BreadCrumb model={items} home={home} />
                    <TabView className="p-tabview-50" style={{borderRadius:"5px",textDecoration:"none"}}>
                    {(sessionStorage.getItem("role")==="Admin" || sessionStorage.getItem("role")==="Admin Support")  &&   <TabPanel header={<img src="https://img.icons8.com/dusk/64/000000/price-tag.png" style={{width:'25px'}}/>}>
                            <CategoryTable/>
                        </TabPanel>}
                    {(sessionStorage.getItem("role")==="Admin") &&  <TabPanel header={<i className="pi pi-plus-circle" style={{color:"#2d88ff",fontSize:"25px"}}></i>}>
                            <h5 style={{fontSize:"17px",fontWeight:700,margin:"7px 7px 14px 0px",fontFamily:"sans-serif"}}>Add a new deal</h5>
                            <FormLayout/>
                        </TabPanel>}
                    </TabView>                   
        </Container>
        </>
    );
}
export default CategoryScreen;