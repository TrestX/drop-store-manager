import * as ActionTypes from '../ActionTypes'
export const ordersRequest = (d:any) => ({
    type: ActionTypes.GET_ORDERS_REQUEST,
    d
});

export const getOrdersError = (errmess) => ({
    type: ActionTypes.GET_ORDERS_FAILURE,
    payload: errmess
});

export const getOrdersSuccess = (users) => ({
    type: ActionTypes.GET_ORDERS_SUCCESS,
    payload: users
});

export const aOrdersRequest = (d:any) => ({
    type: ActionTypes.GET_A_ORDERS_REQUEST,
    d
});

export const getAOrdersError = (errmess) => ({
    type: ActionTypes.GET_A_ORDERS_FAILURE,
    payload: errmess
});

export const getAOrdersSuccess = (users) => ({
    type: ActionTypes.GET_A_ORDERS_SUCCESS,
    payload: users
});

export const OrdersPUTRequest = (data:any) => ({
    type: ActionTypes.PUT_ORDERS_REQUEST,
    data
});

export const OrdersPUTError = (errmess) => ({
    type: ActionTypes.PUT_ORDERS_FAILURE,
    payload: errmess
});

export const OrdersPUTSuccess = (users) => ({
    type: ActionTypes.PUT_ORDERS_SUCCESS,
    payload: users
});