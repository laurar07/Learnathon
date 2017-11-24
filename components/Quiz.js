import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput, Animated, PlatformIOS } from 'react-native'
import { 
    getDailyReminderValue, 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, purple, gray, blue, red, black } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import Results from './Results'

function TopBtn ({ onPress, quizComplete }) {
    const btnText = quizComplete ? 'Restart Quiz' : 'Correct'
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                !quizComplete 
                ? { backgroundColor: blue }
                : { backgroundColor: purple, borderWidth: 2, borderColor: black }]}
            onPress={onPress}>
                <Text style={
                    !quizComplete
                    ? styles.btnText
                    : [styles.submitBtnText, { color: white }]}>{btnText}</Text>
        </TouchableOpacity>
    )
}

function BottomBtn ({ onPress, quizComplete }) {
    const btnText = quizComplete ? 'Back to Deck' : 'Incorrect'
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, 
            !quizComplete 
            ? { backgroundColor: red }
            : { backgroundColor: white, borderWidth: 2, borderColor: black }]}
            onPress={onPress}>
                <Text style={
                    !quizComplete
                    ? styles.btnText
                    : [styles.submitBtnText, { color: black }]}>{btnText}</Text>
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
        // Navigate to the next question, if applicable
        if (!this.quizComplete()) {
            this.setState((state) => ({ 
                index: state.index + 1,
                flipped: false
            }));
        }
    }
    resetNavigation = (navAction) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate(navAction),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }
    restartQuiz = () => {
        this.setState({
            index: 0,
            score: 0,
            flipped: false
        })
    }
    navigateToDeck = () => {
        const { deck } = this.props
        this.resetNavigation({
            routeName: 'DeckDetail',
            params: { deck },
        })
    }
    renderFront = () => {
        return (
            <View>
                <Text style={[styles.questionAnswerText, {fontSize: 40, color: red}]}>
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
                <Text style={[styles.questionAnswerText, {fontSize: 40, color: blue}]}>
                    {deck.cards[index].answer}
                </Text>
            </View>
        );
    }
    toHome = () => {
        this.resetNavigation({
            routeName: 'Home',
            params: {},
            action: NavigationActions.navigate({ routeName: 'Decks'})
        })
    }
    quizComplete = () => {
        const { deck } = this.props
        const { index } = this.state
        return (index >= deck.cards.length); 
    }
    render() {
        const { deck } = this.props
        const { index, score, flipped } = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.right} onPress={this.toHome}>
                    {Platform.OS === 'ios' 
                    ?   <Ionicons name='ios-close' size={50} color={black}/>
                    :   <MaterialIcons name='close' size={50} color={black}/>}
                </TouchableOpacity>
                {!this.quizComplete() && (
                    <View style={styles.center}>
                        <Text style={[styles.numberQuestionText, {fontSize: 20}]}>
                            Question {index + 1} of {deck.cards.length}
                        </Text>
                        <Text style={[styles.questionAnswerText, {fontSize: 40}]}>
                            {deck.cards[index].question}
                        </Text>
                        <TouchableOpacity onPress={this.flip}>
                            <Animated.View style={{transform: [{rotateX: '360deg'}]}}>
                                {flipped && this.renderBack()}
                                {!flipped && this.renderFront()}
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                )}
                {this.quizComplete() && (
                    <Results
                        deck={deck}
                        score={score} />
                )}
                   <View>
                        <TopBtn onPress={!this.quizComplete() 
                            ? this.correct 
                            : this.restartQuiz} 
                                quizComplete={this.quizComplete()} />
                        <View style={styles.space}>
                        </View>
                        <BottomBtn onPress={!this.quizComplete() 
                            ? this.incorrect
                            : this.navigateToDeck}
                                quizComplete={this.quizComplete()} />
                    </View>
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
    col: {
        flex: 1,
        flexDirection: 'column',
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
        marginRight: 30,
        paddingBottom: 30
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginLeft: 30,
        marginRight: 30
    },
    right: {
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    space: {
        height: 20
    },
    questionAnswerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 20
    },
    numberQuestionText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    submitBtnText: {
        color: black,
        fontSize: 22,
        textAlign: 'center'
    },
    animatedText: {
        color: purple,
        fontSize: 120,
        textAlign: 'center',
    },
})

function mapStateToProps(state, { navigation }) {
    const { deck } = navigation.state.params
    return {
        deck
    }
}

export default connect(mapStateToProps)(Quiz)