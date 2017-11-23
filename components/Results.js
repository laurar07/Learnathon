import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput } from 'react-native'
import { 
    getDailyReminderValue, 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, purple, gray, black } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function DeckDetailViewBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? 
                [styles.iosBtn, { backgroundColor: white, borderWidth: 2, borderColor: black }] : 
                [styles.androidBtn, { backgroundColor: white, borderWidth: 2, borderColor: black }]}
            onPress={onPress}>
                <Text style={[styles.submitBtnText, { color: black }]}>Back to Deck</Text>
        </TouchableOpacity>
    )
}

function StartQuizBtn ({ onPress, deck }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? 
                [styles.iosBtn, { backgroundColor: purple, borderWidth: 2, borderColor: black }] : 
                [styles.androidBtn, { backgroundColor: purple, borderWidth: 2, borderColor: black }]}
            disabled={(deck && deck.cards && deck.cards.length > 0) ? false : true}
            onPress={onPress}>
                <Text style={[styles.submitBtnText, { color: white }]}>Restart Quiz</Text>
        </TouchableOpacity>
    )
}

class Results extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params      
        return {
            title: `${deck.name} Quiz Complete`
        }
    } 
    startQuiz = () => {
        const { deck } = this.props

        this.props.navigation.navigate(
            'Quiz',
            { deck }
        )

        clearLocalNotification()
            .then(setLocalNotification())
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.deck != this.props.deck) {
            this.props.navigation.setParams({ deck: nextProps.deck });
        }
    }
    getGrade = () => {
        const { 
            deck,
            score
        } = this.props
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
            return "That's a good start!"
        } else {
            return "Let's keep studying!"
        }
    }
    render() {
        const { 
            deck,
            score
        } = this.props 
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={[styles.deckName, {fontSize: 40, color: purple}]}>
                        {this.getGrade()}
                    </Text>
                    <Text style={[styles.deckName, {fontSize: 20}]}>
                        You scored {score} out of {deck.cards.length}
                    </Text>
                </View>
                <View style={[{flex: 1}]}>
                </View>
                <StartQuizBtn onPress={this.startQuiz} deck={deck}/>
                <View style={styles.space}>
                </View>
                <DeckDetailViewBtn onPress={() => this.props.navigation.navigate(
                    'DeckDetail',
                    { deck }
                )}/>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
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

function mapStateToProps(state, { navigation }) {
    const { 
        deck,
        score
    } = navigation.state.params
    return {
        deck,
        score
    }
}

export default connect(mapStateToProps)(Results)