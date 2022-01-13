import * as ActionTypes from '../ActionTypes';

const TotalTransactionsReducer = (state = {
    isLoading: true,
    errMess: null,
    data: null
}, action: { type: any; payload: any; }) => {
    switch (action.type) {

        case ActionTypes.GET_TotalTransactions_SUCCESS:
            return { ...state, isLoading: false, errMess: null, data: action.payload };
    
        case ActionTypes.GET_TotalTransactions_REQUEST:
            return { ...state, isLoading: true, errMess: null, data:null }
    
        case ActionTypes.GET_TotalTransactions_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};
export default TotalTransactionsReducer;