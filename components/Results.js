import React from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { purple, black, blue } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

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
			<Text style={[styles.resultsText, styles.gradeText]}>
				{getGrade(deck, score)}
			</Text>
			<View>
				{Platform.OS === 'ios' 
					?   <Ionicons name='ios-thumbs-up' size={50} color={black}/>
					:   <FontAwesome name='thumbs-up' size={50} color={black}/>}
			</View>
			<Text style={[styles.resultsText, styles.scoreText, { paddingTop: 30 }]}>
				You scored 
			</Text>
			<Text style={[styles.resultsText, styles.scoreText]}>
				{score} out of {deck.cards.length}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
		paddingBottom: 30
	},
	resultsText: {
		textAlign: 'center',
		fontWeight: 'bold'
	},
	gradeText: {
		fontSize: 40, 
		color: purple, 
		paddingTop: 20,
		paddingBottom: 20
	},
	scoreText: {
		fontSize: 30, 
		color: blue
	}
})