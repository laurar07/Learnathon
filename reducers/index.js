import { ADD_CARD } from '../actions'

function entries (state = {}, action) {
    switch(action.type) {
        case ADD_CARD:
            return {
                ...state,
                [action.deck] : state[action.deck].concat(action.entry)
            }
        default:
            return state
    }
}

export default entries