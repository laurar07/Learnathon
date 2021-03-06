export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

export function addCard (deck, card) {
	return {
		type: ADD_CARD,
		deck,
		card
	}
}

export function addDeck (name) {
	return {
		type: ADD_DECK,
		name,
	}
}

export function deleteDeck (name) {
	return {
		type: DELETE_DECK,
		name,
	}
}