import React from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { white, purple, black } from '../utils/colors'

function getGrade(deck, score) {
	const scorePercent = (score / deck.cards.length) * 100
	if (scorePercent === 100) {
		return 'Excellent!'
	} else if (scorePercent >= 90) {
		return 'Congratulations!'
	} else if (scorePercent >= 80) {
		return 'Well done!'
	} else if (scorePercent >= 70) {
		return 'Pretty good!'
	} else if (scorePercent >= 60) {
		return 'That\'s a good start!'
	} else {
		return 'Let\'s keep studying!'
	}
}

export default function Results ({ deck, score }) {
	return (
		<View style={styles.center}>
			<Text style={[styles.deckName, {fontSize: 40, color: purple}]}>
				{getGrade(deck, score)}
			</Text>
			<Text style={[styles.deckName, {fontSize: 30}]}>
                You scored {score} out of {deck.cards.length}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	item: {
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		}
	},
	space: {
		height: 20
	},
	iosBtn: {
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	androidBtn: {
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitBtnText: {
		color: black,
		fontSize: 22,
		textAlign: 'center'
	},
	center: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
		paddingBottom: 30
	},
	right: {
		justifyContent: 'center',
		alignSelf: 'flex-end'
	},
	deckName: {
		textAlign: 'center',
		fontWeight: 'bold',
		paddingTop: 20,
		paddingBottom: 20
	},
	deckCardCount: {
		textAlign: 'center'        
	}
})