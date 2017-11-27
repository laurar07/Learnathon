// utils/_decks.js

export const DECKS_STORAGE_KEY = 'Learnathon:decks'

function getDecks(data) {
	const decks = data['decks']
	return decks
}

function setDummyData () {
	let dummyData = {}
	dummyData['decks'] = [
		{
			name: 'Spanish',
			cards: [
				{
					question: 'Hello',
					answer: 'Hola'
				},
				{
					question: 'How are you?',
					answer: '¿Cómo está?'
				},
				{
					question: 'It\'s nice to meet you',
					answer: 'Mucho gusto'
				},
				{
					question: 'Good morning',
					answer: 'Buen día'
				},
				{
					question: 'Good afternoon',
					answer: 'Buenas tardes'
				},
				{
					question: 'Good night',
					answer: 'Buenas noches'
				},
				{
					question: 'Goodbye',
					answer: 'Adiós'
				},
				{
					question: 'See you tomorrow',
					answer: 'Hasta mañana'
				},
				{
					question: 'See you soon',
					answer: 'Hasta pronto'
				}
			]
		},
		{
			name: 'French',
			cards: [
				{
					question: 'Hello',
					answer: 'Sallut'
				},
				{
					question: 'How are you?',
					answer: 'Comment allez vous'
				},
				{
					question: 'Good morning',
					answer: 'Bonjour'
				},
				{
					question: 'Good afternoon',
					answer: 'Bonne après-midi'
				},
				{
					question: 'Good evening',
					answer: 'Bon soir'
				},
				{
					question: 'Good night',
					answer: 'Bonne nuit'
				},
				{
					question: 'Goodbye',
					answer: 'Au revoir'
				}
			]
		},
		{
			name: 'German',
			cards: [
				{
					question: 'backpack',
					answer: 'der Rucksack'
				},
				{
					question: 'compass',
					answer: 'der Zirkel'
				},
				{
					question: 'books',
					answer: 'das Buch'
				},
				{
					question: 'glasses',
					answer: 'die Brille'
				},
				{
					question: 'clock',
					answer: 'die Uhr'
				},
				{
					question: 'scissors',
					answer: 'die Schere'
				},
				{
					question: 'glue',
					answer: 'der Klebstoff'
				},
				{
					question: 'pencil',
					answer: 'der Bleistift'
				}
			]
		},
		{
			name: 'ReactJS',
			cards: [
				{
					question: 'What is the Virtual DOM?',
					answer: 'A Javascript representation of the actual DOM'
				},
				{
					question: 'What does ReactDOM.render do?',
					answer: 'Renders a React component to a DOM node'
				},
				{
					question: 'What is state?',
					answer: 'The internal data store(object) of a component'
				},
				{
					question: 'How many elements does a react component return?',
					answer: '1 element'
				},
				{
					question: 'What is setState?',
					answer: 'A helper method for altering the state of a component'
				},
				{
					question: 'What are props?',
					answer: 'The data which is passed to the child component from the parent component'
				},
				{
					question: 'What does getDefaultProps do?',
					answer: 'Allows you to set default props for your component.'
				}
			]
		},
		{
			name: 'React Native',
			cards: [
				{
					question: 'What is TouchableHighlight?',
					answer: 'A wrapper for elements that respond to touch.'
				},
				{
					question: 'What is ScrollView?',
					answer: 'A wrapping component that gives you access to platform-specific ScrollView functionality.'
				},
				{
					question: 'What is AsyncStorage?',
					answer: 'A key-value store that is global to an application. used to persist data from an app.'
				},
				{
					question: 'For layout, what does React Native implement?',
					answer: 'Flexbox'
				},
				{
					question: 'What are the core components?',
					answer: 'Text, Image, View, TextInput, ListView'
				},
				{
					question: 'What is the most basic building block for a React Native app?',
					answer: 'View'
				},
				{
					question: 'What is the library to do animation and interaction patterns?',
					answer: 'Animated'
				},
				{
					question: 'What are the animated types?',
					answer: 'spring, decay, timing'
				},
				{
					question: 'What component allows you to manage the navigation in your app?',
					answer: 'Navigator'
				},
				{
					question: 'What is the API call to get user location?',
					answer: 'navigator.geolocation.getCurrentPosition(success, failure)'
				}
			]
		},
		{
			name: 'Redux',
			cards: [
				{
					question: 'What is Redux?',
					answer: 'A predictable state container for Javascript apps.'
				},
				{
					question: 'What is an action?',
					answer: 'A command to change a state.'
				},
				{
					question: 'What is a reducer?',
					answer: 'A function that returns a piece of the application\'s state.'
				},
				{
					question: 'What is Application State?',
					answer: 'A plain JS object controlled by reducer.'
				},
				{
					question: 'What is react-redux?',
					answer: 'A connector library between react and redux.'
				},
				{
					question: 'What does dispatch do?',
					answer: 'Sends all the actions to the reducers'
				},
				{
					question: 'What do you use to help with async actions in Redux?',
					answer: 'Middleware'
				},
				{
					question: 'What is the only way to change the app\'s state?',
					answer: 'By dispatching actions.'
				},
				{
					question: 'How do you create a single reducer out of many reducers?',
					answer: 'combineReducers'
				},
				{
					question: 'Which component subscribes to Redux store updates with connect()?',
					answer: 'mapStateToProps'
				}
			]
		},
	]
  
	return dummyData['decks']
}

export function formatListOfDecks (data) {
	return data === null 
		? setDummyData() 
		: getDecks(JSON.parse(data))
}