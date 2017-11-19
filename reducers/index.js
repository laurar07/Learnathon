import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions'

function entries (state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deck] : state[action.deck].concat(action.entry)
            }
        case ADD_DECK:
            return {
                ...state,
                [action.name] : {}
            }
        default:
            return state
    }
}

export default entries