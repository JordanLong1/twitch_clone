import streams from '../apis/Streams'
import createBrowserHistory from '../history'

import {
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
     FETCH_STREAMS, 
     FETCH_STREAM, 
     DELETE_STREAM, 
     EDIT_STREAM
} from './types'

export const signIn = (userId) => {
    return {
        type: SIGN_IN, payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const {userId} = getState().auth; // we use getState() here to give us access to the stores state so we can pluck out the userId from it
       const response = await streams.post('/streams', {...formValues, userId}); // post request with axios. 
       // now when we post a new stream we are going to posting all of our form values ^ and the userId added onto it as well
        dispatch({ type: CREATE_STREAM, payload: response.data})
        // Do some programmtic navigation to get the user back to the root route below:
        createBrowserHistory.push('/')

    }
}
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams'); 

    dispatch({ type: FETCH_STREAMS, payload: response.data})
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data})
}

export const editStream = (id, formvalues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formvalues) // we use form values cause we need to specify what it is we are updating

    dispatch({ type: EDIT_STREAM, payload: response.data});
    createBrowserHistory.push('/')
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`); 

    dispatch({ type: DELETE_STREAM, payload: id}); 
}