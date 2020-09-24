import _ from 'lodash'
import {
    FETCH_STREAMS, 
    FETCH_STREAM, 
    CREATE_STREAM, 
    EDIT_STREAM, 
    DELETE_STREAM
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')} // creating a new object, taking all the current records inside of our state object and adding them in
            // then calling mapKeys and take the list of streams from the api and going to create an object out of it using mapKeys with the key of 'id'
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload}; // [] in this scenario is key interpolation es2015 syntax
            case CREATE_STREAM:
                return {...state, [action.payload.id]: action.payload};
                case EDIT_STREAM:
                    return { ...state, [action.payload.id]: action.payload };
            case DELETE_STREAM:
                return _.omit(state, action.payload) // we dont need to pass in id here because the payload is the id in the action creator
                // omit is not going to mutate state
        default: 
        return state; 
    }
}