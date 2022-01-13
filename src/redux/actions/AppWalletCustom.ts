import * as ActionTypes from '../ActionTypes'

export const appwalletSGetRequest = (d:any) => ({
    type: ActionTypes.GET_SAppWallet_REQUEST,
    d
});

export const appwalletSGetError = (errmess) => ({
    type: ActionTypes.GET_SAppWallet_FAILURE,
    payload: errmess
});

export const appwalletSGetSuccess = (appwallet) => ({
    type: ActionTypes.GET_SAppWallet_SUCCESS,
    payload: appwallet
});
