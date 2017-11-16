import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput } from 'react-native'
import { 
    timeToString, 
    getDailyReminderValue, 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'
//import DateHeader from './DateHeader'
//import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'
//import { submitCard } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
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

class DeckDetail extends Component {
    state = {
        question: '',
        answer: ''
    }
    submit = () => {
        const entry = this.state
        const deck = this.props

        this.props.dispatch(addCard({
            deck,
            [key] : entry
        }))

        this.setState(() => ({
            question: '',
            answer: ''
        }))

        this.toHome()

        //submitCard({ deck, entry })

        clearLocalNotification()
            .then(setLocalNotification())
    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddCard'
        }))
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>
                        Enter the question
                    </Text>
                    <TextInput
                        style={{ height: 40, borderColor: gray, borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ question })}
                        value={this.state.question}
                    />
                    <Text>
                        Enter the answer
                    </Text>
                    <TextInput
                        style={{ height: 40, borderColor: gray, borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ answer })}
                        value={this.state.answer}
                    />
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

function mapStateToProps ({ deck }) {

    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckDetail)