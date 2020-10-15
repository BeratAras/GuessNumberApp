import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

function generateRandonBetween(min,max,exclude){
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude){
        return generateRandonBetween(min, max, exclude);
    }else {
        return rndNum;
    }
}

export default function GameScreen(props) {
    const [currentGuess, setCurrentGuess] = 
    useState(generateRandonBetween(1, 100, props.userChoice));
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    
    const [rounds, setRounds] = useState(0);

    function nextGuessHandler(direction){
        if((direction === 'down' && currentGuess < props.userChoice) || (direction === 'up' && currentGuess > props.userChoice)){
            Alert.alert("Don't Lie!", "You know that this is wrong...", [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }

        if(direction === 'down'){
            currentHigh.current = currentGuess;
        }else if(direction === 'up'){
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandonBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currentRounds => currentRounds + 1);
    }

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === props.userChoice){
            props.onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver]);

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="UP" onPress={nextGuessHandler.bind(this, 'up')} />
                </View>
                <View style={styles.button}>
                    <Button title="DOWN" onPress={nextGuessHandler.bind(this, 'down')} />
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    button: {
        width: 100
    }
});
