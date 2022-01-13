import * as ActionTypes from '../ActionTypes'

export const apptransGetRequest = (d:any) => ({
    type: ActionTypes.GET_TotalTransactions_REQUEST,
    d
});

export const apptransGetError = (errmess) => ({
    type: ActionTypes.GET_TotalTransactions_FAILURE,
    payload: errmess
});

export const apptransGetSuccess = (appEarnings) => ({
    type: ActionTypes.GET_TotalTransactions_SUCCESS,
    payload: appEarnings
});
