import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams

} from "react-router-dom";
import DataTableSort from '../bannerScreen/SimpleTable';
const DTable = () => {
    return (        
        <>
        <Row>
            <Col xs={12}>
                <DataTableSort/>
            </Col>
        </Row>
        </>
    );
}
export default DTable;