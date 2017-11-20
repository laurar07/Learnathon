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
            let deckList = state['decks']
            let newDeck = {
                'name': action.name,
                'cards': []
            }
            return {
                ...state,
                ['decks'] : deckList === undefined ? [newDeck] : deckList.concat(newDeck)
            }
        default:
            return state
    }
}

export default entries