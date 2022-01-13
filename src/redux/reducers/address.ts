import * as ActionTypes from '../ActionTypes';

const AddressReducer = (state = {
    isLoading: true,
    errMess: null,
    data: null
}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case ActionTypes.GET_Address_SUCCESS:
            return { ...state, isLoading: false, errMess: null, data: action.payload };
    
        case ActionTypes.GET_Address_REQUEST:
            return { ...state, isLoading: true, errMess: null, data:[] }
    
        case ActionTypes.GET_Address_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};
export default AddressReducer;