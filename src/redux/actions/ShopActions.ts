import * as ActionTypes from '../ActionTypes'

export const shopPUTRequest = (data:any) => ({
    type: ActionTypes.PUT_Shop_REQUEST,
    data
});

export const shopPUTError = (errmess) => ({
    type: ActionTypes.PUT_Shop_FAILURE,
    payload: errmess
});

export const shopPUTSuccess = (users) => ({
    type: ActionTypes.PUT_Shop_SUCCESS,
    payload: users
});

export const shopRequest = (data:any) => ({
    type: ActionTypes.POST_Shop_REQUEST,
    data
});

export const shopError = (errmess) => ({
    type: ActionTypes.POST_Shop_FAILURE,
    payload: errmess
});

export const shopSuccess = (shops) => ({
    type: ActionTypes.POST_Shop_SUCCESS,
    payload: shops
});

export const shopGetRequest = (d) => ({
    type: ActionTypes.GET_Shop_REQUEST,
    d
});

export const shopGetError = (errmess) => ({
    type: ActionTypes.GET_Shop_FAILURE,
    payload: errmess
});

export const shopGETSuccess = (shops) => ({
    type: ActionTypes.GET_Shop_SUCCESS,
    payload: shops
});