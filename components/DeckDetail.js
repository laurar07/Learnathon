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
import { white, purple, gray, black } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function AddCardBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? 
                [styles.iosBtn, { backgroundColor: white, borderWidth: 2, borderColor: black }] : 
                [styles.androidBtn, { backgroundColor: white, borderWidth: 2, borderColor: black }]}
            onPress={onPress}>
                <Text style={[styles.submitBtnText, { color: black }]}>Add Card</Text>
        </TouchableOpacity>
    )
}

function StartQuizBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? 
                [styles.iosBtn, { backgroundColor: purple, borderWidth: 2, borderColor: black }] : 
                [styles.androidBtn, { backgroundColor: purple, borderWidth: 2, borderColor: black }]}
            onPress={onPress}>
                <Text style={[styles.submitBtnText, { color: white }]}>Start Quiz</Text>
        </TouchableOpacity>
    )
}

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params      
        return {
            title: deck.name
        }
    } 
    addCard = () => {
        /*const entry = this.state
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
            .then(setLocalNotification())*/
    }
    startQuiz = () => {

        // TODO: Start quiz

        clearLocalNotification()
            .then(setLocalNotification())
    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddCard'
        }))
    }
    render() {
        const { deck } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.deckName}>{deck.name}</Text>
                    <Text style={styles.deckCardCount}>{deck.cards ? deck.cards.length : 0} cards</Text>
                </View>
                <View style={[{flex: 1}]}>
                </View>
                <AddCardBtn onPress={this.addCard}/>
                <View style={styles.space}>
                </View>
                <StartQuizBtn onPress={this.startQuiz}/>
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
        alignSelf: 'flex-end',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    deckName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    deckCardCount: {
        textAlign: 'center'        
    }
})

function mapStateToProps(state, { navigation }) {
    const { deck } = navigation.state.params
    return {
        deck
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    const { deck } = navigation.state.params
    return {
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps)(DeckDetail)