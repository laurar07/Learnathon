import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput, Alert } from 'react-native'
import { 
    timeToString, 
    getDailyReminderValue, 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'
//import DateHeader from './DateHeader'
//import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, purple, gray } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
                <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends Component {
    state = {
        name: '',
    }
    submit = () => {
        const key = 'decks'
        const { name } = this.state
        const { 
            dispatch, 
            decks 
        } = this.props        

        const exists = decks && decks.filter((deck) => deck.name === name);
        if (name.length === 0 || !name.trim()) {
            this.showAlert(false, 'Please enter a valid name for the deck.')
        } else if (exists && exists.length > 0) {
            this.showAlert(false, 'There is already a deck with that name. Please choose a different name.')
        } else {
            dispatch(addDeck(name)) 

            this.setState(() => ({
                name: ''
            }))

            submitDeck({ key, name })

            this.showAlert(true, 'The new deck has been added successfully.');
        }
    }
    showAlert = (success, message) => {
        if (success) {
            Alert.alert(
                'Deck added',
                message,
                [
                    {text: 'OK', onPress: () => {}},
                ],
                    { cancelable: false }
            )
        } else {
            Alert.alert(
                'Failed to add deck',
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
                    <Text>
                        Enter the name of the deck
                    </Text>
                    <TextInput
                        style={{ height: 40, borderColor: gray, borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                    />
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
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
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
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
})

export default connect(mapStateToProps)(AddDeck)