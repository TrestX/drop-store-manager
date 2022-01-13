import * as ActionTypes from '../ActionTypes'

export const addressGetRequest = (d) => ({
    type: ActionTypes.GET_Address_REQUEST,
    d
});

export const addressGetError = (errmess) => ({
    type: ActionTypes.GET_Address_FAILURE,
    payload: errmess
});

export const addressGETSuccess = (address) => ({
    type: ActionTypes.GET_Address_SUCCESS,
    payload: address
});