import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, black } from '../utils/colors'

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

function StartQuizBtn ({ onPress, deck }) {
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
    startQuiz = () => {
        const { deck } = this.props   
        
        if (deck && deck.cards && deck.cards.length > 0) {
            this.props.navigation.navigate(
                'Quiz',
                { deck }
            )
        } else {
            Alert.alert(
                'No cards in deck',
                'Please add cards to start a quiz',
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
        const { deck, dispatch } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.deckName}>{deck.name}</Text>
                    <Text style={styles.deckCardCount}>{deck.cards ? deck.cards.length : 0} cards</Text>
                </View>
                <View style={[{flex: 1}]}>
                </View>
                <AddCardBtn onPress={() => this.props.navigation.navigate(
                            'AddCard',
                            { deck }
                        )}/>
                <View style={styles.space}>
                </View>
                <StartQuizBtn onPress={this.startQuiz} deck={deck}/>
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
    deckName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        paddingTop: 20,
        paddingBottom: 20
    },
    deckCardCount: {
        textAlign: 'center',
        fontSize: 25       
    }
})

function mapStateToProps(state, { navigation }) {
    const { deck } = navigation.state.params
    const currDeck = state['decks'].filter((d) => d.name === deck.name)[0]
    return {
        deck: currDeck
    }
}

export default connect(mapStateToProps)(DeckDetail)