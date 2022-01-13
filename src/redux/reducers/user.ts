import * as ActionTypes from '../ActionTypes';


const UsersReducer = (state = {
    isLoading: true,
    errMess: null,
    users: null
}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case ActionTypes.GET_USERS_SUCCESS:
            return { ...state, isLoading: false, errMess: null, users: action.payload };

        case ActionTypes.GET_USERS_REQUEST:
            return { ...state, isLoading: true, errMess: null, users:{data:[]} }

        case ActionTypes.GET_USERS_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };
        case ActionTypes.GET_USERSBYUSERID_SUCCESS:
            return { ...state, isLoading: false, errMess: null, users: action.payload };
    
        case ActionTypes.GET_USERSBYUSERID_REQUEST:
            return { ...state, isLoading: true, errMess: null, users:{data:[]} }
    
        case ActionTypes.GET_USERSBYUSERID_FAILURE:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
};
export default UsersReducer;