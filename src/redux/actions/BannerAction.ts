import * as ActionTypes from '../ActionTypes'

export const bannerPUTRequest = (data:any) => ({
    type: ActionTypes.PUT_Banner_REQUEST,
    data
});

export const bannerPUTError = (errmess) => ({
    type: ActionTypes.PUT_Banner_FAILURE,
    payload: errmess
});

export const bannerPUTSuccess = (users) => ({
    type: ActionTypes.PUT_Banner_SUCCESS,
    payload: users
});

export const bannerRequest = (data:any) => ({
    type: ActionTypes.POST_Banner_REQUEST,
    data
});

export const bannerError = (errmess) => ({
    type: ActionTypes.POST_Banner_FAILURE,
    payload: errmess
});

export const bannerSuccess = (users) => ({
    type: ActionTypes.POST_Banner_SUCCESS,
    payload: users
});

export const bannerGetRequest = () => ({
    type: ActionTypes.GET_Banner_REQUEST,

});

export const bannerGetError = (errmess) => ({
    type: ActionTypes.GET_Banner_FAILURE,
    payload: errmess
});

export const bannerGETSuccess = (users) => ({
    type: ActionTypes.GET_Banner_SUCCESS,
    payload: users
});