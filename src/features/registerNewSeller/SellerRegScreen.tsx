import { Container,Row,Col } from 'react-bootstrap';
import { Card } from 'primereact/card';
import SellerFormLayout from '../registerNewSeller/AddSellerPerson';
const SellerRegScreen = () => {
    return (        
        <>
    <Container fluid style={{marginTop:"80px"}}>
            <Row style={{marginBottom:"10px"}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Card style={{maxWidth:"60vw",display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"27px",fontSize:"23px",fontWeight:600,fontFamily:"sans-serif"}}>Register a new seller<br/><span style={{fontSize:"13.4px"}}>Already have an account? <a href="/">Sign in</a></span></Card>
                    <div style={{maxWidth:"60vw",display:"block",marginLeft:"auto",marginRight:"auto",border:"none"}}>
                        <SellerFormLayout data={null} seModal={null}/>
                    </div>                 
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default SellerRegScreen;