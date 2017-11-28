import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput, Alert } from 'react-native'
import { submitCard } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, purple, gray } from '../utils/colors'

function SubmitBtn ({ onPress }) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			onPress={onPress}>
			<Text style={styles.submitBtnText}>Add</Text>
		</TouchableOpacity>
	)
}

class AddCard extends Component {
	state = {
        question: '',
        answer: ''
    }
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params      
        return {
            title: `${deck.name} - Add Card`
        }
    } 
    submit = () => {
        const { 
            question,
            answer
        } = this.state
        const { 
            deck,
            dispatch 
        } = this.props        

        if (question.length === 0 || !question.trim() || answer.length === 0 || !answer.trim()) {
            this.showAlert(false, 'Please enter a valid question and answer to add to the deck.')
        } else {
            submitCard(
                deck.name,
                { question, answer }
            )
            .then(() => dispatch(addCard(deck, {question, answer})))
            .then(() =>
                this.setState(() => ({
                    question: '',
                    answer: ''
                }))
            )
            .then(() => this.showAlert(true, 'The new card has been added successfully.'))
        }
    }
    showAlert = (success, message) => {
        if (success) {
            Alert.alert(
                'Card added',
                message,
                [
                    {text: 'OK', onPress: () => {}},
                ],
                    { cancelable: false }
            )
        } else {
            Alert.alert(
                'Failed to add card',
                message,
                [
                    {text: 'OK', onPress: () => {}},
                ],
                    { cancelable: false }
            )
        }
    }
	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.deckName}>
                        Enter the question to add
					</Text>
					<TextInput
						style={{ height: 40, borderColor: gray, borderWidth: 1 }}
						onChangeText={(text) => this.setState({ question: text })}
						value={this.state.question}
					/>
					<View style={styles.space}>
					</View>
					<Text style={styles.deckName}>
                        Enter the correct answer
					</Text>
					<TextInput
						style={{ height: 40, borderColor: gray, borderWidth: 1 }}
						onChangeText={(text) => this.setState({ answer: text })}
						value={this.state.answer}
					/>
				</View>
				<View style={[{flex: 1}]}>
				</View>
				<SubmitBtn onPress={this.submit}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	space: {
		height: 80
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	androidSubmitBtn: {
		backgroundColor: purple,
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
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	deckName: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20
	}
})

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params
	const currDeck = state['decks'].filter((d) => d.name === deck.name)[0]
	return {
		deck: currDeck
	}
}

export default connect(mapStateToProps)(AddCard)