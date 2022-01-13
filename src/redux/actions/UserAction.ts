import * as ActionTypes from '../ActionTypes'
export const usersRequest = () => ({
    type: ActionTypes.GET_USERS_REQUEST,
});

export const getUserError = (errmess) => ({
    type: ActionTypes.GET_USERS_FAILURE,
    payload: errmess
});

export const getUsersSuccess = (users) => ({
    type: ActionTypes.GET_USERS_SUCCESS,
    payload: users
});
export const usersByUidRequest = (d) => ({
    type: ActionTypes.GET_USERSBYUSERID_REQUEST,
    d
});

export const getUserByUidError = (errmess) => ({
    type: ActionTypes.GET_USERSBYUSERID_FAILURE,
    payload: errmess
});

export const getUsersByUidSuccess = (users) => ({
    type: ActionTypes.GET_USERSBYUSERID_SUCCESS,
    payload: users
});