import * as ActionTypes from '../ActionTypes'

export const sellerShopTGetRequest = (d:any) => ({
    type: ActionTypes.GET_SellerShopsT_REQUEST,
    d
});

export const sellerShopTGetError = (errmess) => ({
    type: ActionTypes.GET_SellerShopsT_FAILURE,
    payload: errmess
});

export const sellerShopTGetSuccess = (appEarnings) => ({
    type: ActionTypes.GET_SellerShopsT_SUCCESS,
    payload: appEarnings
});
