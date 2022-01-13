import * as ActionTypes from '../ActionTypes';

const BannerReducer = (state = {
    isLoading: true,
    errMess: null,
    data: null
}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case ActionTypes.POST_Banner_SUCCESS:
            return { ...state, isLoading: false, errMess: null, data: action.payload };

        case ActionTypes.POST_Banner_REQUEST:
            return { ...state, isLoading: true, errMess: null, data:null }

        case ActionTypes.POST_Banner_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.GET_Banner_SUCCESS:
            return { ...state, isLoading: false, errMess: null, data: action.payload };
    
        case ActionTypes.GET_Banner_REQUEST:
            return { ...state, isLoading: true, errMess: null, data:[] }
    
        case ActionTypes.GET_Banner_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };
        
        case ActionTypes.PUT_Banner_SUCCESS:
            return { ...state, isLoading: false, errMess: null, data: action.payload };
        
        case ActionTypes.PUT_Banner_REQUEST:
            return { ...state, isLoading: true, errMess: null, data:null }
        
        case ActionTypes.PUT_Banner_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };
       
        default:
            return state;
    }
};
export default BannerReducer;

