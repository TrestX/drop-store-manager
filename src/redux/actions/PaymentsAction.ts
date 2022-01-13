import * as ActionTypes from '../ActionTypes'

export const paymentsGetRequest = (d:any) => ({
    type: ActionTypes.GET_Payments_REQUEST,
    d
});

export const paymentsGetError = (errmess) => ({
    type: ActionTypes.GET_Payments_FAILURE,
    payload: errmess
});

export const paymentsGetSuccess = (payments) => ({
    type: ActionTypes.GET_Payments_SUCCESS,
    payload: payments
});