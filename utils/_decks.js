// utils/_decks.js

export const DECKS_STORAGE_KEY = 'Learnathon:decks'

function getDecks(data) {
	const decks = data['decks']
	return decks
}

export function formatListOfDecks (data) {
	return data === null ? 
		{} : 
		getDecks(JSON.parse(data))
}