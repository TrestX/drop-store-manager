import * as ActionTypes from '../ActionTypes'

export const categoryPUTRequest = (data:any) => ({
    type: ActionTypes.PUT_Category_REQUEST,
    data
});

export const categoryPUTError = (errmess) => ({
    type: ActionTypes.PUT_Category_FAILURE,
    payload: errmess
});

export const categoryPUTSuccess = (users) => ({
    type: ActionTypes.PUT_Category_SUCCESS,
    payload: users
});

export const categoryRequest = (data:any) => ({
    type: ActionTypes.POST_Category_REQUEST,
    data
});

export const categoryError = (errmess) => ({
    type: ActionTypes.POST_Category_FAILURE,
    payload: errmess
});

export const categorySuccess = (users) => ({
    type: ActionTypes.POST_Category_SUCCESS,
    payload: users
});

export const categoryGetRequest = (d) => ({
    type: ActionTypes.GET_Category_REQUEST,
    d
});

export const categoryGetError = (errmess) => ({
    type: ActionTypes.GET_Category_FAILURE,
    payload: errmess
});

export const categoryGETSuccess = (users) => ({
    type: ActionTypes.GET_Category_SUCCESS,
    payload: users
});