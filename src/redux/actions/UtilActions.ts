import * as ActionTypes from '../ActionTypes'
export const utilRequest = (data:any) => ({
    type: ActionTypes.POST_PreSignedURL_REQUEST,
    data
});

export const utilError = (errmess) => ({
    type: ActionTypes.POST_PreSignedURL_FAILURE,
    payload: errmess
});

export const utilSuccess = (users) => ({
    type: ActionTypes.POST_PreSignedURL_SUCCESS,
    payload: users
});