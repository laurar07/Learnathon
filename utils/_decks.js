// utils/_decks.js

import { AsyncStorage } from 'react-native'
//import { getMetricMetaInfo, timeToString } from './helpers'

export const DECKS_STORAGE_KEY = 'Learnathon:decks'

function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

function getDecks(data) {
  const decks = data['decks'];
  return decks;
}

export function formatListOfDecks (data) {
    return data === null ? 
      {} : 
      getDecks(JSON.parse(data))
}