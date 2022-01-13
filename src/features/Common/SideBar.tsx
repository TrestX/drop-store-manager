import {
  faAngleLeft,
  faAngleRight,
  faStore,
  faTachometerAlt,
  faTruck,
  faUsers,
  faUtensils,
  faUsersCog,
  faMailBulk,
  faCat,
  faSms,
  faHandshake,
  faMoneyBill,
  faWallet,
  faMoneyCheck,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
const SideBar = () => {
  const [coll, setColl] = useState(false);
  const [toggled, setToogled] = useState(false);
  return (
    <>
      <Button
        className="sideBarButton"
        onClick={() => {
          setColl(!coll);
          setToogled(!toggled);
        }}
        style={{ left: `${!coll ? "230px" : "230px"}` }}
      >
        <FontAwesomeIcon
          style={{ fontSize: "18px", marginTop: "2.5px" }}
          icon={coll ? faBars : faBars}
        />
      </Button>
      <ProSidebar
        collapsed={coll}
        collapsedWidth={"0px"}
        toggled={toggled}
        onToggle={() => {
          setToogled(!toggled);
        }}
        style={{
          overflow: "auto",
          minHeight: "150vh",
          height: "230vh",
          paddingRight: "20px",
          marginLeft: "0px",
          position: "fixed",
        }}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            { }
          </div>
        </SidebarHeader>
        <SidebarContent>
          <hr />
          <Menu iconShape="square" className="sideBarOverflow">
            <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink
                activeClassName="active"
                style={{ padding: "0px" }}
                to="/"
                exact
              >
                <MenuItem icon={<FontAwesomeIcon icon={faTachometerAlt} />}>
                  Dashboard
                </MenuItem>
              </NavLink>
            </MenuItem>
            <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/admin" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faUsersCog} />}>
                  Managers
                </MenuItem>
              </NavLink>
            </MenuItem>
            {/* <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/profile" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faUsersCog} />}>
                  Profile
                </MenuItem>
              </NavLink>
            </MenuItem> */}
                        {/* <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/itemCategory" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faMoneyCheck} />}>
                  Categories
                </MenuItem>
              </NavLink>
            </MenuItem> */}
              <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/shop" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faStore} />}>
                  Shop
                </MenuItem>
              </NavLink>
            </MenuItem>
            <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/order" exact>
                <MenuItem icon={<FontAwesomeIcon icon={faUtensils} />}>
                  Orders
                </MenuItem>
              </NavLink>
            </MenuItem>
            <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/transactions" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faMoneyBill} />}>
                  Transactions
                </MenuItem>
              </NavLink>
            </MenuItem>

            {/* <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/banner" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faMailBulk} />}>
                  Banners
                </MenuItem>
              </NavLink>
            </MenuItem> */}
            {/* <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/category" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faHandshake} />}>
                  Deals
                </MenuItem>
              </NavLink>
            </MenuItem> */}
            {/* <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/items" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faMoneyCheck} />}>
                  Items
                </MenuItem>
              </NavLink>
            </MenuItem> */}
            <MenuItem style={{ padding: "0px",margin:"-10px -30px -15px -17px" }}>
              <NavLink style={{ padding: "0px" }} to="/earnings" exact>
                {" "}
                <MenuItem icon={<FontAwesomeIcon icon={faMoneyCheck} />}>
                  Earnings
                </MenuItem>
              </NavLink>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: "center" }}></SidebarFooter>
      </ProSidebar>
      <div className={coll ? "collaspe2" : "expanded"}></div>
    </>
  );
};

export default SideBar;
