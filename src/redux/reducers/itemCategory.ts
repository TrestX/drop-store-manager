import * as ActionTypes from "../ActionTypes";

const ItemCategoryReducer = (
  state = {
    isLoading: true,
    errMess: null,
    data: null,
  },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ActionTypes.POST_ItemCat_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        data: action.payload,
      };

    case ActionTypes.POST_ItemCat_REQUEST:
      return { ...state, isLoading: true, errMess: null, data: null };

    case ActionTypes.POST_ItemCat_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.GET_ItemCat_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        data: action.payload,
      };

    case ActionTypes.GET_ItemCat_REQUEST:
      return { ...state, isLoading: true, errMess: null, data: [] };

    case ActionTypes.GET_ItemCat_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.DELETE_ItemCat_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        data: action.payload,
      };

    case ActionTypes.DELETE_ItemCat_REQUEST:
      return { ...state, isLoading: true, errMess: null, data: null };

    case ActionTypes.DELETE_ItemCat_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload };
    case ActionTypes.GET_ItemTag_SUCCESS:
        return {
          ...state,
          isLoading: false,
          errMess: null,
          data: action.payload,
        };
  
    case ActionTypes.GET_ItemTag_REQUEST:
        return { ...state, isLoading: true, errMess: null, data: [] };
  
    case ActionTypes.GET_ItemTag_FAILURE:
        return { ...state, isLoading: false, errMess: action.payload };
  
    case ActionTypes.DELETE_ItemTag_SUCCESS:
        return {
          ...state,
          isLoading: false,
          errMess: null,
          data: action.payload,
        };
  
    case ActionTypes.DELETE_ItemTag_REQUEST:
        return { ...state, isLoading: true, errMess: null, data: null };
  
    case ActionTypes.DELETE_ItemTag_FAILURE:
        return { ...state, isLoading: false, errMess: action.payload };
        
    default:
      return state;
  }
};
export default ItemCategoryReducer;
