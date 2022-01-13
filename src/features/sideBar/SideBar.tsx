import { faDyalog, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCheckCircle, faStore, faTachometerAlt, faTruck, faUsers, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { url } from 'inspector';
import React, { useState } from 'react';
import { Button, Card, Form, Image, InputGroup, Modal, ModalBody, Nav, Row,Alert,Col } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { loggedIn as login } from '../../recoil/loggedin'
import axios from 'axios';
import { NavLink, useHistory,Router } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const SideBar = () => {
    return (
        <>

            {sessionStorage.getItem("token") !== null || sessionStorage.getItem("token") !== "" || sessionStorage.getItem("token") !== undefined ?
            <ProSidebar style={{width:"auto",minWidth:"0px"}}>
                  <SidebarHeader>
        <h1 style={{textAlign: "center",fontSize:"24px",fontWeight:540,margin:"20px"}}>Drop</h1>
  </SidebarHeader>
  <SidebarContent>
  <Menu iconShape="square">
              <MenuItem icon={<FontAwesomeIcon icon={faTachometerAlt}/>} ><NavLink to="/">Dashboard</NavLink></MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faUtensils}/>} ><NavLink to="/banners">Banners</NavLink></MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faUsers}/>} ><NavLink to="/users">Users</NavLink></MenuItem>
              <SubMenu title="Delivery" icon={<FontAwesomeIcon icon={faTruck}/>}>
                <MenuItem>Delivery Person</MenuItem>
                <MenuItem>Assign Order</MenuItem>
              </SubMenu>
              <SubMenu title="Shop" icon={<FontAwesomeIcon icon={faStore}/>}>
                <MenuItem>Shop Details</MenuItem>
              </SubMenu>
            </Menu>
  </SidebarContent>

          </ProSidebar>
             : <div style={{ height: "auto" }}></div>
            }
        </>
    );
}

export default SideBar;