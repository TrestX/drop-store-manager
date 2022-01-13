import * as ActionTypes from '../ActionTypes'

export const itemPUTRequest = (data:any) => ({
    type: ActionTypes.PUT_Item_REQUEST,
    data
});

export const itemPUTError = (errmess) => ({
    type: ActionTypes.PUT_Item_FAILURE,
    payload: errmess
});

export const itemPUTSuccess = (users) => ({
    type: ActionTypes.PUT_Item_SUCCESS,
    payload: users
});

export const itemRequest = (data:any) => ({
    type: ActionTypes.POST_Item_REQUEST,
    data
});

export const itemError = (errmess) => ({
    type: ActionTypes.POST_Item_FAILURE,
    payload: errmess
});

export const itemSuccess = (items) => ({
    type: ActionTypes.POST_Item_SUCCESS,
    payload: items
});

export const itemGetRequest = (d:any) => ({
    type: ActionTypes.GET_Item_REQUEST,
    d
});

export const itemGetError = (errmess) => ({
    type: ActionTypes.GET_Item_FAILURE,
    payload: errmess
});

export const itemGETSuccess = (items) => ({
    type: ActionTypes.GET_Item_SUCCESS,
    payload: items
});