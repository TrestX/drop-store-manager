import { TabView, TabPanel } from 'primereact/tabview';
import FormLayout from './AdminForm';
import {Container} from 'react-bootstrap';
import AcctTable from './AdminTable';
import { BreadCrumb } from 'primereact/breadcrumb';
const AdminSScreen = () => {
    const items = [
        {label:"Managers"},
      ];
      const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (        
        <>
        <Container fluid style={{marginTop:"80px",maxWidth:"80%"}}>
        <BreadCrumb model={items} home={home} />
        {(sessionStorage.getItem("role")==="Admin") && <TabView className="p-tabview-50" style={{borderRadius:"5px",textDecoration:"none"}}>
                        <TabPanel header={<img src="https://img.icons8.com/office/40/000000/select-users.png" style={{width:"25px"}}/>}>

                        <AcctTable/>
                        </TabPanel>
                        <TabPanel header={<i className="pi pi-plus-circle" style={{color:"#fe385c",fontSize:"25px"}}></i>}>
                            <FormLayout/>  
                        </TabPanel>
                    </TabView> }    

        </Container>
        </>
    );
}
export default AdminSScreen;