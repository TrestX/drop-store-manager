import React, { useEffect, useState,useRef } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BTable from 'react-bootstrap/Table';
import { Button, Card, Form, Image, InputGroup, Modal, ModalBody, Nav, Row, Alert, Col } from 'react-bootstrap';
import { useTable } from 'react-table'
import { setEnvironmentData } from 'worker_threads';
import { usersRequest } from '../../redux/actions/UserAction';
interface Props {
  users: any;
  fetchUsers: () => void;
}

  
const DataTableRowExpansion = () => {
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState<any>({});
  const isMounted = useRef(false);
  //const productService = new ProductService();

  useEffect(() => {
      if (isMounted.current) {
      }
  }, [expandedRows]);

  useEffect(() => {
      isMounted.current = true;
      //productService.getProducts().then(data => setProducts(data));
  }, []);
}
let UserTable: React.FunctionComponent<Props> = props => {
  useEffect(() => {
    props.fetchUsers()
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'UserID',
        accessor: 'user_id',
      },
      {
        Header: 'User Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Account Type',
        accessor: 'account_type',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  )
  return (
    props.users ?
      <Row style={{ backgroundColor: "white", minHeight: "100%", marginTop: '100px' }}>
        <Col xs={12} md={12} lg={12} sm={12}>
          <Card style={{ border: "none", minHeight: "100%" }}>
            <Card.Body style={{ overflow: "auto" }}>
              {props.users.users.map(item => <div>{item.email}</div>)}
            </Card.Body>
          </Card>
        </Col>

      </Row> : null
  )
}
const mapStateToProps = (state: any) => ({
  users: state.users.users
})
const mapDispatchToProps = dispatch => ({
  fetchUsers: () => { dispatch(usersRequest()) }
});
export default UserTable = connect(mapStateToProps, mapDispatchToProps)(UserTable)
