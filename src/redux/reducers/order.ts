import * as ActionTypes from '../ActionTypes';

export const Orders = (state = {
    isLoading: true,
    errMess: null,
    orders: null,
}, action) => {
    switch (action.type) {
        case ActionTypes.GET_ORDERS_SUCCESS:
            return { ...state, isLoading: false, errMess: null, orders: action.payload };

        case ActionTypes.GET_ORDERS_REQUEST:
            return { ...state, isLoading: true, errMess: null, orders: null }

        case ActionTypes.GET_ORDERS_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.GET_A_ORDERS_SUCCESS:
            return { ...state, isLoading: false, errMess: null, orders: action.payload };
    
        case ActionTypes.GET_A_ORDERS_REQUEST:
            return { ...state, isLoading: true, errMess: null, orders: null }
    
        case ActionTypes.GET_A_ORDERS_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.PUT_ORDERS_SUCCESS:
            return { ...state, isLoading: false, errMess: null, orders: action.payload };
            
        case ActionTypes.PUT_ORDERS_REQUEST:
            return { ...state, isLoading: true, errMess: null, orders:null }
            
        case ActionTypes.PUT_ORDERS_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };
    
        default:
            return state;
    }
};