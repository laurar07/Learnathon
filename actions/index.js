export const ADD_CARD = 'ADD_CARD'

export function addCard (deck, entry) {
    return {
        type: ADD_CARD,
        deck,
        entry
    }
}