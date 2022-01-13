import * as ActionTypes from '../ActionTypes';

const ShopReducer = (state = {
    isLoading: true,
    errMess: null,
    data: null
}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case ActionTypes.POST_Shop_SUCCESS:
            return { ...state, isLoading: false, errMess: null, data: action.payload };

        case ActionTypes.POST_Shop_REQUEST:
            return { ...state, isLoading: true, errMess: null, data:null }

        case ActionTypes.POST_Shop_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.GET_Shop_SUCCESS:
            return { ...state, isLoading: false, errMess: null, data: action.payload };
    
        case ActionTypes.GET_Shop_REQUEST:
            return { ...state, isLoading: true, errMess: null, data:[] }
    
        case ActionTypes.GET_Shop_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };
        
        case ActionTypes.PUT_Shop_SUCCESS:
            return { ...state, isLoading: false, errMess: null, data: action.payload };
        
        case ActionTypes.PUT_Shop_REQUEST:
            return { ...state, isLoading: true, errMess: null, data:null }
        
        case ActionTypes.PUT_Shop_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };
       
        default:
            return state;
    }
};
export default ShopReducer;

