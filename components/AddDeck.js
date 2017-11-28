import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput, Alert } from 'react-native'
import { submitDeck, fetchDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
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

class AddDeck extends Component {
	state = {
        name: '',
    }
    submit = () => {
        const { name } = this.state
        const { 
            dispatch, 
            decks 
        } = this.props        

        const exists = decks && Array.isArray(decks) && decks.filter((deck) => deck.name === name);
        if (name.length === 0 || !name.trim()) {
            this.showAlert(false, 'Please enter a valid name for the deck.')
        } else if (exists && exists.length > 0) {
            this.showAlert(false, 'There is already a deck with that name. Please choose a different name.')
        } else {
            submitDeck({
                name,
                cards: []
            })
            .then(() => dispatch(addDeck(name)))
            .then(() =>
                this.setState(() => ({
                    name: ''
                }))
            )
            .then(() => fetchDeck(name).then(
                (deck) => this.showAlert(true, 'The new deck has been added successfully.', deck))
            )
        }
    }
    showAlert = (success, message, deck) => {
        if (success) {
            Alert.alert(
                'Deck added',
                message,
                [
                    {
                        text: 'OK', 
                        onPress: () => this.props.navigation.navigate(
                            'DeckDetail',
                            { deck }
                        )
                    },
                ],
                    { cancelable: false }
            )
        } else {
            Alert.alert(
                'Failed to add deck',
                message,
                [
                    {
                        text: 'OK', 
                        onPress: () => {}
                    },
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
                        Enter the name of a deck to add
					</Text>
					<TextInput
						style={{ height: 40, borderColor: gray, borderWidth: 1 }}
						onChangeText={(text) => this.setState({ name: text })}
						value={this.state.name}
					/>
				</View>
				<View style={[{flex: 1}]}>
				</View>
				<SubmitBtn onPress={this.submit}/>
			</View>
		)
	}
}

function mapStateToProps ({ decks }) {
	return {
		decks
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
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

export default connect(mapStateToProps)(AddDeck)