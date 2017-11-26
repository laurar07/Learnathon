import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions'

function entries (state = {}, action) {
	switch(action.type) {
	case RECEIVE_DECKS:
		return {
			...state,
			['decks'] : action.decks
		}
	case ADD_CARD:
		let deckList2 = state['decks']        
		let newListOfCards = action.deck['cards'].concat(action.card)
		let updatedDeck = {
			'name': action.deck['name'],
			'cards': newListOfCards
		}
		return {
			...state,
			['decks'] : deckList2.filter((deck) => deck.name !== updatedDeck.name).concat(updatedDeck)
		}
	case ADD_DECK:
		let deckList = state['decks']
		let newDeck = {
			'name': action.name,
			'cards': []
		}
		return {
			...state,
			['decks'] : (!deckList || !Array.isArray(deckList) || deckList.length === 0) ? [newDeck] : deckList.concat(newDeck)
		}
	default:
		return state
	}
}

export default entries