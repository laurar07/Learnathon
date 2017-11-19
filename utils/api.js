import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatListOfDecks } from './_decks'

export function submitDeck({ key, deckName }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key] : deckName,
    }))
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
        .then(formatListOfDecks)
}