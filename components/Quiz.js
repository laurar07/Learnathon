import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput, Easing } from 'react-native'
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
import { white, purple, gray, blue, red } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import FlipCard from "react-native-flip-card-view"

function CorrectBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, { backgroundColor: blue }]}
            onPress={onPress}>
                <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
    )
}

function IncorrectBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, { backgroundColor: red }]}
            onPress={onPress}>
                <Text style={styles.btnText}>Incorrect</Text>
        </TouchableOpacity>
    )
}

function incrementScore() {
    return (previousState, currentProps) => {
        return { 
            ...previousState, 
            score: previousState.score + 1 
        };
    };
}

class Quiz extends Component {
    state = {
        index: 0,
        score: 0,
        flipped: false
    }
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params      
        return {
            title: `${deck.name} Quiz`
        }
    } 
    flip = () => {
        this.setState({
            flipped: !this.state.flipped
        });
    }
    correct = () => {
        // Add a point
        this.setState(incrementScore(), () => this.nextQuestionOrEnd());        
    }
    incorrect = () => {
        this.nextQuestionOrEnd()
    }
    nextQuestionOrEnd = () => {
        const { deck } = this.props
        const { 
            index,
            score
        } = this.state
        // Navigate to the next question, if applicable
        // If no more questions, navigate to the end
        if (index < deck.cards.length - 1) {
            this.setState((state) => ({ 
                index: state.index + 1,
                flipped: false
            }));
        } else {
            this.props.navigation.navigate(
                'Results',
                { deck, score }
            )
        }
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
    renderFront = () => {
        return (
            <View>
                <Text style={[styles.questionAnswerText, {fontSize: 30, color: red}]}>
                    Show Answer
                </Text>
            </View>
        );
    }
    renderBack = () => {
        const { deck } = this.props 
        const { index } = this.state
        
        return (
            <View>
                <Text style={[styles.questionAnswerText, {fontSize: 50, color: blue}]}>
                    {deck.cards[index].answer}
                </Text>
            </View>
        );
    }
    render() {
        const { deck } = this.props
        const { index, flipped } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <Text style={[styles.questionAnswerText, {fontSize: 20}]}>
                        Question {index + 1} of {deck.cards.length}
                    </Text>
                </View>
                <View>
                    <Text style={[styles.questionAnswerText, {fontSize: 40}]}>
                        {deck.cards[index].question}
                    </Text>
                </View>
                {/*<TouchableOpacity style={styles.center} onPress={this.flip}>*/}
                    <FlipCard
                        velocity={0} // Velocity makes it move
                        tension={0} // Slow
                        friction={0} // Oscillate a lot
                        renderFront={this.renderFront()} 
                        renderBack={this.renderBack()}
                        isFlipped={flipped}/>
                {/*</TouchableOpacity>*/}
                <CorrectBtn onPress={this.correct} />
                <View style={styles.space}>
                </View>
                <IncorrectBtn onPress={this.incorrect} />
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
    btnText: {
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
    },
    space: {
        height: 20
    },
    questionAnswerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 20
    }
})

function mapStateToProps(state, { navigation }) {
    const { deck } = navigation.state.params
    return {
        deck
    }
}

export default connect(mapStateToProps)(Quiz)