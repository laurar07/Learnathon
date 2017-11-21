import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatListOfDecks, hasDeckName } from './_decks'

export function submitDeck({ name, cards }) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const decks = JSON.parse(results)['decks']
            if (!decks) {
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
                    ['decks'] : [{name, cards}]
                }))
            } else {
                const updatedDecks = decks.concat({name, cards})
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
                    ['decks'] : updatedDecks
                }))
            }
        })
}

export function submitCard(deckName, newCard) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const decks = JSON.parse(results)['decks']
            let deck = {}
            for (let i = 0; i < decks.length; i++) {
                if (decks[i].name === deckName) {
                    deck = decks[i]
                    break
                }
            }
            if (deck && deck.cards) {
                const updatedListOfCards = deck.cards.concat(newCard)
                const updatedDeck = {
                    'name': deck.name,
                    'cards': updatedListOfCards
                }
                const updatedDecks = decks.filter((deck) => deck.name !== deckName).concat(updatedDeck)
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
                    ['decks'] : updatedDecks
                }))
            }
        })
}

/*export function removeEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}*/

export function fetchListOfDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((data) => formatListOfDecks(data))
}

export function removeAllDecks () {
    AsyncStorage.removeItem(DECKS_STORAGE_KEY, (err) => {
    });
}