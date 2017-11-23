import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput, Animated } from 'react-native'
import { 
    getDailyReminderValue, 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, purple, gray, blue, red } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

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
            this.resetNavigationToResults()
        }
    }
    resetNavigationToResults = () => {
        const { deck } = this.props
        const { score } = this.state
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ 
                    routeName: 'Results',
                    params: { deck, score }
                }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
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
                <TouchableOpacity style={styles.center} onPress={this.flip}>
                    <Animated.View style={{transform: [{rotateX: '360deg'}]}}>
                        {flipped && this.renderBack()}
                        {!flipped && this.renderFront()}
                    </Animated.View>
                </TouchableOpacity>
                {/*<View style={styles.col}>*/}
                    <CorrectBtn onPress={this.correct} />
                    <View style={styles.space}>
                    </View>
                    <IncorrectBtn onPress={this.incorrect} />
                {/*</View>*/}
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