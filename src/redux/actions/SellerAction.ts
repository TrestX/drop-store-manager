import * as ActionTypes from '../ActionTypes'
export const sellerPUTRequest = (data:any) => ({
    type: ActionTypes.PUT_Sellers_REQUEST,
    data
});

export const sellerPUTError = (errmess) => ({
    type: ActionTypes.PUT_Sellers_FAILURE,
    payload: errmess
});

export const sellerPUTSuccess = (users) => ({
    type: ActionTypes.PUT_Sellers_SUCCESS,
    payload: users
});

export const sellerRequest = (data:any) => ({
    type: ActionTypes.POST_Sellers_REQUEST,
    data
});

export const sellerError = (errmess) => ({
    type: ActionTypes.POST_Sellers_FAILURE,
    payload: errmess
});

export const sellerSuccess = (sellers) => ({
    type: ActionTypes.POST_Sellers_SUCCESS,
    payload: sellers
});

export const sellerGetRequest = (data:any) => ({
    type: ActionTypes.GET_Sellers_REQUEST,
    data
});

export const sellerGetError = (errmess) => ({
    type: ActionTypes.GET_Sellers_FAILURE,
    payload: errmess
});

export const sellerGETSuccess = (sellers) => ({
    type: ActionTypes.GET_Sellers_SUCCESS,
    payload: sellers
});