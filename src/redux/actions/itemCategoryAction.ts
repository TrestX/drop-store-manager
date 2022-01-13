import * as ActionTypes from '../ActionTypes'

export const ItemCatRequest = (data:any) => ({
    type: ActionTypes.POST_ItemCat_REQUEST,
    data
});

export const ItemCatError = (errmess) => ({
    type: ActionTypes.POST_ItemCat_FAILURE,
    payload: errmess
});

export const ItemCatSuccess = (ItemCats) => ({
    type: ActionTypes.POST_ItemCat_SUCCESS,
    payload: ItemCats
});

export const ItemCatGetRequest = (d) => ({
    type: ActionTypes.GET_ItemCat_REQUEST,
    d
});

export const ItemCatGetError = (errmess) => ({
    type: ActionTypes.GET_ItemCat_FAILURE,
    payload: errmess
});

export const ItemCatGETSuccess = (ItemCats) => ({
    type: ActionTypes.GET_ItemCat_SUCCESS,
    payload: ItemCats
});

export const ItemCatDeleteRequest = (d) => ({
    type: ActionTypes.DELETE_ItemCat_REQUEST,
    d
});

export const ItemCatDeleteError = (errmess) => ({
    type: ActionTypes.DELETE_ItemCat_FAILURE,
    payload: errmess
});

export const ItemCatDeleteSuccess = (ItemCats) => ({
    type: ActionTypes.DELETE_ItemCat_SUCCESS,
    payload: ItemCats
});


export const ItemTagGetRequest = (d) => ({
    type: ActionTypes.GET_ItemTag_REQUEST,
    d
});

export const ItemTagGetError = (errmess) => ({
    type: ActionTypes.GET_ItemTag_FAILURE,
    payload: errmess
});

export const ItemTagGETSuccess = (ItemCats) => ({
    type: ActionTypes.GET_ItemTag_SUCCESS,
    payload: ItemCats
});

export const ItemTagDeleteRequest = (d) => ({
    type: ActionTypes.DELETE_ItemTag_REQUEST,
    d
});

export const ItemTagDeleteError = (errmess) => ({
    type: ActionTypes.DELETE_ItemTag_FAILURE,
    payload: errmess
});

export const ItemTagDeleteSuccess = (ItemCats) => ({
    type: ActionTypes.DELETE_ItemTag_SUCCESS,
    payload: ItemCats
});