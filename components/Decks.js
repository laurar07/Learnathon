import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchListOfDecks, removeAllDecks } from '../utils/api'
import { white } from '../utils/colors'
import { AppLoading } from 'expo'

class Decks extends Component {
    state = {
        ready: false
    }
    componentDidMount() {
        const { dispatch } = this.props

        // removeAllDecks()
        fetchListOfDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(({ decks }) => {})
            .then(() => this.setState(() => ({
                ready: true
            })))
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.item} key={item.name}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'DeckDetail',
                    { deck: item }
                )}>
                    <Text style={styles.deckName}>{item.name}</Text>
                    <Text style={styles.deckCardCount}>{item.cards ? item.cards.length : 0} cards</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { decks, dispatch } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <View style={styles.container}>
                {decks && Array.isArray(decks) && decks.length > 0 && (
                    <FlatList
                        data={decks}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index} />
                )}
                {(!decks || !Array.isArray(decks) || decks.length === 0) && (
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
    container: {
        flex: 1
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
    deckName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    deckCardCount: {
        textAlign: 'center'        
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
})

export default connect(mapStateToProps)(Decks)