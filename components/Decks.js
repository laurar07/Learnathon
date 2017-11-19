import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { purple } from '../utils/colors'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchListOfDecks } from '../utils/api'
import { white } from '../utils/colors'
import { AppLoading } from 'expo'

class Decks extends Component {
    state = {
        ready: false
    }
    componentDidMount() {
        const { dispatch } = this.props
        fetchListOfDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(({ decks }) => {})
            .then(() => this.setState(() => ({
                ready: true
            })))
    }
    renderEmptyDate = formattedDate => {
        return (
            <View style={styles.item}>
                <Text style={styles.noDataText}>
                    You didn't log any data on this day.
                </Text>
            </View>
        )
    }
    render() {
        const { decks } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <View>
                {decks && decks.map((deck) => (
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(
                            'DeckDetail',
                            { entryId: key }
                        )}>
                            <Text>{deck.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                {!decks && (
                    <View style={styles.item}>
                        <Text style={styles.noDataText}>
                            You don't have any decks.
                        </Text>
                    </View>
                )}
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
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
})

export default connect(mapStateToProps)(Decks)