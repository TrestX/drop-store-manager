import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams

} from "react-router-dom";
import SignIn from '../signIn/SignIn';
import TopBar from '../Common/TopBar';
import Dashboard from '../dashBoard/Dashboard';
import BannerScreen from '../bannerScreen/BannerScreen';
import CategoryScreen from '../categoryScreen/CategoryScreen';
import OrderScreen from '../orderScreen/OrderScreen';
import SideBar from "../Common/SideBar";
import ShopScreen from '../shopScreen/ShopScreen';
import SellerRegScreen from '../registerNewSeller/SellerRegScreen';
import TransScreen from '../TransactionsScreen/TransScreen';
import RestCatScreen from "../restCategoryScreen/RestCatScreen";
import ProfileScreen from "../profileScreen/ProfileScreen";
import ItemScreen from "../itemScreen/ItemScreen";
import AppTransScreen from "../appwalletScreen/TransScreen";
import AdminSScreen from "../AdminSCAdd/AdminSScreen";
const Main = () => {
    return (
        <>
        { !sessionStorage.getItem("token") && <Router>
                        <Switch>
                            <Route exact path="/"><SignIn/></Route>
                            <Route exact path="/register"><SellerRegScreen/></Route>
                        </Switch>
                </Router>}
        { sessionStorage.getItem("token") && 
            <>
            <Row style={{ width: "100%", margin: "0px" }}>
                <TopBar />
            </Row>
            <Row style={{ maxWidth: "100%", margin: "0px", minHeight: "100%" ,padding:"0px" }} >
                <Router>
                    <div className="col-lg-12" style={{ maxWidth: "100%", margin: "0px", minHeight: "100%",padding:"0px" }}>
                    <div style={{ maxWidth: "100%", margin: "0px", minHeight: "100%",display: "flex",position: "relative",padding:"0px",overflow:"hidden" }}>
                        <SideBar/>
                        <Switch>
                            <Route exact path="/"><Dashboard/></Route>
                            <Route exact path="/dashboard"><Dashboard/></Route>
                            <Route exact path="/profile"><ProfileScreen/></Route>
                            <Route exact path="/items"><ItemScreen/></Route>
                            <Route exact path="/items/:sItem"><ItemScreen/></Route>
                            <Route exact path="/banner"><BannerScreen/></Route>
                            <Route exact path="/category"><CategoryScreen/></Route>
                            <Route exact path="/order"><OrderScreen/></Route>
                            <Route exact path="/shop"><ShopScreen/></Route>
                            <Route exact path="/shop/:sMail"><ShopScreen/></Route>
                            <Route exact path="/order/shop/:search"><OrderScreen/></Route>
                            <Route exact path="/order/delivery/:search"><OrderScreen/></Route>
                            <Route exact path="/order/user/:search"><OrderScreen/></Route>
                            <Route exact path ="/transactions"><TransScreen/></Route>
                            <Route exact path ="/transactions/:uid"><TransScreen/></Route>
                            <Route exact path ="/transactions/shop/:uid"><TransScreen/></Route>
                            <Route exact path ="/itemCategory"><RestCatScreen/></Route>
                            <Route exact path ="/earnings"><AppTransScreen/></Route>
                            <Route exact path = "/admin"><AdminSScreen/></Route>
                        </Switch>
                    </div>
                    </div>
                </Router>
            </Row>
            </>
}
        </>
    );
}
export default Main;