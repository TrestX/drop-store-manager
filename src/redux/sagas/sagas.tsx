import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { getUserError, getUsersSuccess,getUserByUidError, getUsersByUidSuccess } from "../actions/UserAction";
import { getOrdersError, getOrdersSuccess, OrdersPUTSuccess,OrdersPUTError,getAOrdersSuccess,aOrdersRequest,getAOrdersError  } from "../actions/OrderActions";
import * as ActionTypes from '../ActionTypes';
import { utilSuccess, utilError } from "../actions/UtilActions";
import { bannerSuccess, bannerError,bannerGETSuccess,bannerPUTSuccess } from "../actions/BannerAction";
import { categorySuccess, categoryError,categoryGETSuccess, categoryPUTSuccess } from "../actions/CategoryAction";
import { itemSuccess, itemError, itemGETSuccess,itemPUTSuccess,itemPUTError,itemGetError} from "../actions/ItemAction";
import { shopSuccess, shopError, shopGETSuccess,shopPUTSuccess,shopPUTError,shopGetError} from "../actions/ShopActions";
import { sellerSuccess, sellerError, sellerGETSuccess, sellerPUTSuccess, sellerPUTError, sellerGetError} from "../actions/SellerAction";
import { addressGETSuccess, addressGetError} from "../actions/AddressAction";
import { paymentsGetSuccess,paymentsGetError} from "../actions/PaymentsAction";
import {appwalletSGetSuccess,appwalletSGetError} from "../actions/AppWalletCustom";
import { apptransGetSuccess,apptransGetError} from "../actions/TTs";
import { sellerShopTGetSuccess,sellerShopTGetError} from "../actions/SellerShopsTAction";
import jwt_decode from "jwt-decode";
import { ItemCatSuccess,ItemTagGetRequest,ItemTagGetError,ItemTagGETSuccess,ItemTagDeleteRequest,ItemTagDeleteError,ItemTagDeleteSuccess, ItemCatError, ItemCatGETSuccess,ItemCatGetError,ItemCatDeleteSuccess,ItemCatDeleteError} from "../actions/itemCategoryAction";
// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {

    yield takeEvery(ActionTypes.GET_SellerShopsT_REQUEST, getSellerShopTrans);
    function* getSellerShopTrans(d:any) {
        try {
            const response = yield call(fetchsellerShops,d);
            const acct = {data:response.data};
            yield put(sellerShopTGetSuccess(acct));
    
        } catch (error) {
            yield put(sellerShopTGetError(error));
        }
    }
    function fetchsellerShops(d:any) {
        let token = sessionStorage.getItem("token")
        let urll = `https://api.drop-deliveryapp.com/docker2/apptrans/admin/seller/shops?sellerId=${d.d.sellerid}&from=${d.d.fr}`
        return axios({
            method: 'get',
            url: urll,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    yield takeEvery(ActionTypes.GET_ItemTag_REQUEST, itemTagGetSuccess);
    yield takeEvery(ActionTypes.DELETE_ItemTag_REQUEST, itemTagDeleteSuccess);

    function* itemTagDeleteSuccess(d:any) {
        try {
            const response = yield call(delitemTags,d);
            const acct = {data:response.data};
            const response1 = yield call(fetchitemTags,{d:{"type":""}});
            const acct1 = {data:response1.data};
            yield put(ItemCatGETSuccess(acct1));
    
        } catch (error) {
            yield put(ItemCatDeleteError(error));
        }
    }

    function delitemTags(d:any) {
        let token = sessionStorage.getItem("token")
        let urll = `https://api.drop-deliveryapp.com/docker3/itemcategory/itemtags/${d.d.id}`
        return axios({
            method: 'delete',
            url: urll,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    function* itemTagGetSuccess(d:any) {
        try {
            const response = yield call(fetchitemTags,d);
            const acct = {data:response.data};
            yield put(ItemCatGETSuccess(acct));
    
        } catch (error) {
            yield put(ItemCatGetError(error));
        }
    }
    function fetchitemTags(d:any) {
        let token = sessionStorage.getItem("token")
        let urll = `https://api.drop-deliveryapp.com/docker3/itemcategory/itemtags/admin?limit=100&shoptype=${d.d.type}`
        return axios({
            method: 'get',
            url: urll,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }


    yield takeEvery(ActionTypes.GET_ItemCat_REQUEST, itemCatGetSuccess);
    yield takeEvery(ActionTypes.DELETE_ItemCat_REQUEST, itemCatDeleteSuccess);
    yield takeEvery(ActionTypes.POST_ItemCat_REQUEST, itemCatSuccess);

        function* itemCatDeleteSuccess(d:any) {
        try {
            const response = yield call(delitemCats,d);
            const acct = {data:response.data};
            const response1 = yield call(fetchitemCats,{d:{"type":""}});
            const acct1 = {data:response1.data};
            yield put(ItemCatGETSuccess(acct1));
    
        } catch (error) {
            yield put(ItemCatDeleteError(error));
        }
    }

    function delitemCats(d:any) {
        let token = sessionStorage.getItem("token")
        let urll = `https://api.drop-deliveryapp.com/docker3/itemcategory/${d.d.id}`
        return axios({
            method: 'delete',
            url: urll,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    function* itemCatGetSuccess(d:any) {
        try {
            const response = yield call(fetchitemCats,d);
            const acct = {data:response.data};
            yield put(ItemCatGETSuccess(acct));
    
        } catch (error) {
            yield put(ItemCatGetError(error));
        }
    }
    function fetchitemCats(d:any) {
        let token = sessionStorage.getItem("token")
        let urll = `https://api.drop-deliveryapp.com/docker3/itemcategory?limit=100&shoptype=${d.d.type}`
        return axios({
            method: 'get',
            url: urll,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }
    function* itemCatSuccess(data:any) {
        try {
            const response = yield call(addItemCat,data);
            const op = {data:"success"};
            yield put(ItemCatSuccess(op));
    
        } catch (error) {
            yield put(ItemCatError(error));
        }
    }
    function addItemCat(data:any) {
        let token = sessionStorage.getItem("token")
        return axios({
            method: 'post',
            url: 'https://api.drop-deliveryapp.com/docker3/itemcategory',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
    
            },
            data:data.data
        });
    }
    yield takeEvery(ActionTypes.GET_SAppWallet_REQUEST, apptransSelGetSaga);
    function* apptransSelGetSaga(d:any) {
        try {
            const response = yield call(fetchAppSelTrans,d);
            const acct = {data:response.data};
            yield put(appwalletSGetSuccess(acct));
    
        } catch (error) {
            yield put(appwalletSGetError(error));
        }
    }
    function fetchAppSelTrans(d:any) {
        console.log(d)
        let token = sessionStorage.getItem("token")
        return axios({
            method: 'get',
            url: `https://api.drop-deliveryapp.com/docker2/apptrans/admin/seller?from=${d.d.fr}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }


    yield takeEvery(ActionTypes.GET_TotalTransactions_REQUEST, apptransGetSaga);
    function* apptransGetSaga(d:any) {
        try {
            const response = yield call(fetchAppTTrans,d);
            const acct = {data:response.data.data};
            yield put(apptransGetSuccess(acct));
    
        } catch (error) {
            yield put(apptransGetError(error));
        }
    }
    function fetchAppTTrans(d:any) {
        let token = sessionStorage.getItem("token")
        return axios({
            method: 'get',
            url: `https://api.drop-deliveryapp.com/docker2/apptrans/totaltrans`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    yield takeEvery(ActionTypes.GET_USERSBYUSERID_REQUEST, userIdGetSaga);
    yield takeEvery(ActionTypes.GET_Payments_REQUEST, paymentsGetSaga);
    yield takeEvery(ActionTypes.GET_Address_REQUEST, addressGetSaga);
    yield takeEvery(ActionTypes.GET_USERS_REQUEST, userSaga);
    yield takeEvery(ActionTypes.GET_ORDERS_REQUEST, orderSaga);
    yield takeEvery(ActionTypes.GET_A_ORDERS_REQUEST, aOrderSaga);
    yield takeEvery(ActionTypes.PUT_ORDERS_REQUEST, orderPutSaga);
    yield takeEvery(ActionTypes.POST_PreSignedURL_REQUEST,utilSaga);
    yield takeEvery(ActionTypes.POST_Banner_REQUEST,bannerSaga);
    yield takeEvery(ActionTypes.GET_Banner_REQUEST,bannerGetSaga);
    yield takeEvery(ActionTypes.PUT_Banner_REQUEST,bannerPutSaga);
    yield takeEvery(ActionTypes.POST_Category_REQUEST,categorySaga);
    yield takeEvery(ActionTypes.GET_Category_REQUEST,categoryGetSaga);
    yield takeEvery(ActionTypes.PUT_Category_REQUEST,categoryPutSaga);
    yield takeEvery(ActionTypes.POST_Shop_REQUEST,shopSaga);
    yield takeEvery(ActionTypes.GET_Shop_REQUEST,shopGetSaga);
    yield takeEvery(ActionTypes.PUT_Shop_REQUEST,shopPutSaga);
    yield takeEvery(ActionTypes.POST_Item_REQUEST,itemSaga);
    yield takeEvery(ActionTypes.GET_Item_REQUEST,itemGetSaga);
    yield takeEvery(ActionTypes.PUT_Item_REQUEST,itemPutSaga);
    yield takeEvery(ActionTypes.POST_Sellers_REQUEST,sellerSaga);
    yield takeEvery(ActionTypes.GET_Sellers_REQUEST,sellerGetSaga);
    yield takeEvery(ActionTypes.PUT_Sellers_REQUEST,sellerPutSaga);
}

function* paymentsGetSaga(d:any) {
    try {
        const response = yield call(fetchpayments,d);
        const acct = {data:response.data.data};
        yield put(paymentsGetSuccess(acct));

    } catch (error) {
        yield put(paymentsGetError(error));
    }
}
function fetchpayments(data) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: `https://api.drop-deliveryapp.com/docker4/payments/admin/payments?status=${data.d.status}&user=${data.d.id}&seller=${data.d.sellerId}&shop=${data.d.shopId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    } )
}

function* userIdGetSaga(d:any) {
    try {
        const response = yield call(fetchuserId,d);
        const acct = {data:response.data.data};
        yield put(getUsersByUidSuccess(acct));

    } catch (error) {
        yield put(getUserByUidError(error));
    }
}
function fetchuserId(data) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: `https://api.drop-deliveryapp.com/docker1/user/list/${data.d},`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    });
}

function* addressGetSaga(d:any) {
    try {
        const response = yield call(fetchAddresses,d);
        const categories = {data:response.data.data};
        yield put(addressGETSuccess(categories));

    } catch (error) {
        yield put(addressGetError(error));
    }
}

function fetchAddresses(d:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: 'https://api.drop-deliveryapp.com/docker1/address/admin/address?userId='+d.d.user_id,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    });
}

// function that makes the api request and returns a Promise for response
function fetchUsers() {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: `https://api.drop-deliveryapp.com/docker1/user/admin/all/profile?accountType=USER`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    });
}

function fetchBanners() {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: 'https://api.drop-deliveryapp.com/docker2/banner/admin/banner',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    });
}

function fetchCategory(d) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: 'https://api.drop-deliveryapp.com/docker2/category?type='+d.d.type,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    });
}

function fetchOrdersN(d:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: `https://api.drop-deliveryapp.com/docker4/order/admin/orders/all?shopID=${d.d.shopid}&status=${d.d.status}&userId=${d.d.userid}&deliveryId=${d.d.deliveryId}&limit=100&sellerID=${d.d.sid}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    })
}


function getPreSignedUrl(data:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'post',
        url: 'https://api.drop-deliveryapp.com/docker1/user/util/presignedurl',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data
    });
}


function uploadBanner(data:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'post',
        url: 'https://api.drop-deliveryapp.com/docker2/banner',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data
    });
}

function updateBanner(data:any) {
    let token = sessionStorage.getItem("token")
    console.log(data)
    return axios({
        method: 'put',
        url: 'https://api.drop-deliveryapp.com/docker2/banner/'+data.data.id,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data
    });
}


function uploadCategory(data:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'post',
        url: 'https://api.drop-deliveryapp.com/docker2/category',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}

function updateCategory(data:any) {
    let token = sessionStorage.getItem("token")
    console.log(data)
    return axios({
        method: 'put',
        url: 'https://api.drop-deliveryapp.com/docker2/category/'+data.data.id,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}


function fetchSellers(d:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: `https://api.drop-deliveryapp.com/docker1/user/admin/all/profile?accountType=Seller&status=${d.data.status}&sellertype=${d.data.stype}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    });
}
function* sellerGetSaga(data:any) {
    try {
        const response = yield call(fetchSellers,data);
        const categories = {data:response.data.data};

        // dispatch a success action to the store with the new dog
        yield put(sellerGETSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(sellerGetError(error));
    }
}

function addShop(data:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'post',
        url: 'https://api.drop-deliveryapp.com/docker1/shop/admin/shop',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}

function updateShop(data:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'put',
        url: 'https://api.drop-deliveryapp.com/docker1/shop/'+data.data.id,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}

function fetchShops(d) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: `https://api.drop-deliveryapp.com/docker1/shop/admin/shop?sellerId=${d.d.sellerId}&type=${d.d.type}&status=${d.d.status}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    });
}
function* shopGetSaga(d:any) {
    try {
        const response = yield call(fetchShops,d);
        const categories = {data:response.data.data};

        // dispatch a success action to the store with the new dog
        yield put(shopGETSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(shopGetError(error));
    }
}
// worker saga: makes the api call when watcher saga sees the action

function* shopSaga(data:any) {
    try {
        const response = yield call(addShop,data);
        const op = {data:"success"};
        yield put(shopSuccess(op));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(shopError(error));
    }
}
function* shopPutSaga(data:any) {
    try {
        const response = yield call(updateShop,data);
        const op = {data:"success"};
        let d = {d:{sellerId:"",type:"",status:""}}
        if(window.location.href.split('/')[window.location.href.split('/').length-1]==="seller"){
            d = {d:{sellerId:data['data']['sellerId'],type:"",status:""}}
        }
        let token:any = sessionStorage.getItem("token")?sessionStorage.getItem("token")!:""
        if (token != ""){
            var decoded:any = jwt_decode(token!);
            d={d:{sellerId:decoded["userid"],type:"",status:""}}
        }
        const response1 = yield call(fetchShops,d);
        const categories = {data:response1.data.data};
        // dispatch a success action to the store with the new dog
        yield put(shopPUTSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(shopPUTError(error));
    }
}


///////////////////////////////////////////////////////////

function* categoryGetSaga(d:any) {
    try {
        const response = yield call(fetchCategory,d);
        const categories = {data:response.data.data};

        // dispatch a success action to the store with the new dog
        yield put(categoryGETSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(getUserError(error));
    }
}
// worker saga: makes the api call when watcher saga sees the action

function* categorySaga(data:any) {
    try {
        const response = yield call(uploadCategory,data);
        const op = {data:"success"};
        yield put(categorySuccess(op));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(bannerError(error));
    }
}
function* categoryPutSaga(data:any) {
    try {
        const response = yield call(updateCategory,data);
        const op = {data:"success"};
        const d = {type:""}
        const response1 = yield call(fetchCategory,d);
        const categories = {data:response1.data.data};
        // dispatch a success action to the store with the new dog
        yield put(categoryPUTSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(bannerError(error));
    }
}

function* bannerGetSaga() {
    try {
        const response = yield call(fetchBanners);
        const banners = {data:response.data.data};

        // dispatch a success action to the store with the new dog
        yield put(bannerGETSuccess(banners));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(getUserError(error));
    }
}
// worker saga: makes the api call when watcher saga sees the action

function* bannerSaga(data:any) {
    try {
        const response = yield call(uploadBanner,data);
        const op = {data:"success"};
        yield put(bannerSuccess(op));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(bannerError(error));
    }
}
function* bannerPutSaga(data:any) {
    try {
        const response = yield call(updateBanner,data);
        const op = {data:"success"};
        const response1 = yield call(fetchBanners);
        const banners = {data:response1.data.data};
        yield put(bannerPUTSuccess(banners));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(bannerError(error));
    }
}

function* userSaga() {
    try {
        const response = yield call(fetchUsers);
        const users = {data:response.data.data};

        // dispatch a success action to the store with the new dog
        yield put(getUsersSuccess(users));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(getUserError(error));
    }
}

function* utilSaga(data:any) {
    try {
        const response = yield call(getPreSignedUrl,data);
        let preSignedUrl = {data:"success",preurl:response.data.preSignedUrl};
        //let buf = Buffer.from(e[0].dataURL.replace(/^data:image\/\w+;base64,/, ""),'base64')
        const config = {
            headers: {
                'Content-Type' : "image/jpeg",
                'Access-Control-Allow-Origin': '*',
            }
        }
        if (response.data.preSignedUrl.length>1){
            for (let i=0;i<response.data.preSignedUrl.length;i++){
                axios.put(response.data.preSignedUrl[i],data.data.objectUrl,config)
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                }); 
            }
        }else{
            preSignedUrl = {data:"success",preurl:response.data.preSignedUrl[0]}
            axios.put(response.data.preSignedUrl[0],data.data.objectUrl)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        // dispatch a success action to the store with the new dog
        yield put(utilSuccess(preSignedUrl));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(utilError(error));
    }
}

function* orderSaga(d:any) {
    try {
        console.log(d)
        const response = yield call(fetchOrdersN,d);
        const orders = response.data.data;

        // dispatch a success action to the store with the new dog
        yield put(getOrdersSuccess(orders));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(getOrdersError(error));
    }
}

function* aOrderSaga(d:any) {
    try {
        const response = yield call(fetchOrdersN,d);
        const orders = response.data.data;

        // dispatch a success action to the store with the new dog
        yield put(getAOrdersSuccess(orders));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(getAOrdersError(error));
    }
}

function updateOrders(data:any) {
    let token = sessionStorage.getItem("token")
    console.log(data)
    return axios({
        method: 'put',
        url: 'https://api.drop-deliveryapp.com/docker4/order/'+data.data.id,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}

function* orderPutSaga(data:any) {
    try {
        const response = yield call(updateOrders,data);
        const op = {data:"success"};
        const d={status:"Ordered",shopid:"",userid:"",deliveryId:""}
        const response1 = yield call(fetchOrdersN,d);
        const categories = {data:response1.data.data};
        // dispatch a success action to the store with the new dog
        yield put(OrdersPUTSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(OrdersPUTError(error));
    }
}


function addSeller(data:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'post',
        url: 'https://api.drop-deliveryapp.com/docker1/user/seller/register',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}

function updateSeller(data:any) {
    let token = sessionStorage.getItem("token")
    console.log(data)
    return axios({
        method: 'put',
        url: 'https://api.drop-deliveryapp.com/docker1/user/profile/'+data.data.id,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}

function* sellerSaga(data:any) {
    try {
        const response = yield call(addSeller,data);
        const op = {data:"success"};
        yield put(sellerSuccess(op));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(sellerError(error));
    }
}
function* sellerPutSaga(data:any) {
    try {
        const response = yield call(updateSeller,data);
        const op = {data:"success"};
        const d = {d:{status:"",stype:""}}
        const response1 = yield call(fetchSellers,d);
        const categories = {data:response1.data.data};
        // dispatch a success action to the store with the new dog
        yield put(sellerPUTSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(sellerPUTError(error));
    }
}




function addItem(data:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'post',
        url: 'https://api.drop-deliveryapp.com/docker3/item',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}

function updateItem(data:any) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'put',
        url: 'https://api.drop-deliveryapp.com/docker3/item/'+data.data.id,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        data:data.data
    });
}

function* itemSaga(data:any) {
    try {
        const response = yield call(addItem,data);
        const op = {data:"success"};
        yield put(itemSuccess(op));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(itemError(error));
    }
}
function* itemPutSaga(data:any) {
    try {
        const response = yield call(updateItem,data);
        const op = {data:"success",shopId:"",sellerId:""};
        const response1 = yield call(fetchItems,{d:{data:"success",shopId:"",sellerId:""}});
        const categories = {data:response1.data.data};
        // dispatch a success action to the store with the new dog
        yield put(itemPUTSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(itemPUTError(error));
    }
}

function fetchItems(d) {
    let token = sessionStorage.getItem("token")
    return axios({
        method: 'get',
        url: `https://api.drop-deliveryapp.com/docker3/item?shopID=${d.d.shopId}&sellerId=${d.d.sellerId}&limit=100`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
    });
}
function* itemGetSaga(d:any) {
    try {
        const response = yield call(fetchItems,d);
        const categories = {data:response.data.data};

        // dispatch a success action to the store with the new dog
        yield put(itemGETSuccess(categories));

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put(itemGetError(error));
    }
}