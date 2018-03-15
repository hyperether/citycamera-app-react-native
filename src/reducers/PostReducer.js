import {
    POST_IMAGE_ADDED,
    POST_DESCRIPTION_ADDED,
    POST_LOCATION_ADDED,
    POST_SENT
} from '../actions/types'

const INITIAL_STATE = {
    image:'',
    description:'',
    location:'',
    sent: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_IMAGE_ADDED:
        console.log('image state: ', action.payload)
            return {...state, image: action.payload};

        case POST_DESCRIPTION_ADDED:
            return {...state, description: action.payload};
        
        case POST_LOCATION_ADDED:
            return {...state, location: action.payload};

        case POST_SENT:
            return {...state, sent: action.payload};
        
        default:
            return state;
    }
}