import * as ActionTypes from '../ActionTypes';


const UtilReducer = (state = {
    isLoading: true,
    errMess: null,
    preSignedUrl: null
}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case ActionTypes.POST_PreSignedURL_SUCCESS:
            return { ...state, isLoading: false, errMess: null, preSignedUrl: action.payload };

        case ActionTypes.POST_PreSignedURL_REQUEST:
            return { ...state, isLoading: true, errMess: null, preSignedUrl:null }

        case ActionTypes.POST_PreSignedURL_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};
export default UtilReducer;

