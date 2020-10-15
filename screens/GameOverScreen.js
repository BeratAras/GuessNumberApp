import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function GameOverScreen() {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Game Over!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color: 'red'
    }
});