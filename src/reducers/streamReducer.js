import {
    FETCH_STREAMS, 
    FETCH_STREAM, 
    CREATE_STREAM, 
    EDIT_STREAM, 
    DELETE_STREAM
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload}; // [] in this scenario is key interpolation es2015 syntax
            case CREATE_STREAM:
                return {...state, [action.payload.id]: action.payload};
                case EDIT_STREAM:
                    return { ...state, [action.payload.id]: action.payload };
                    
        default: 
        return state; 
    }
}